import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Package, 
  Plus, 
  Image as ImageIcon, 
  DollarSign, 
  MapPin, 
  Users, 
  Send,
  Edit,
  Search,
  Filter,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Campaign {
  id: string;
  user_id: string;
  title: string;
  description: string;
  product_images: string[];
  commission_rate: number;
  commission_type: string;
  target_regions: string[];
  target_demographics: any;
  sales_materials: any;
  status: string;
  profiles?: {
    full_name: string;
    company_name: string;
  };
}

export default function Bazar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          profiles(company_name, full_name)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
      setFilteredCampaigns(data || []);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      toast({
        title: "Error",
        description: "Failed to load campaigns",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (campaignId: string) => {
    if (!user) {
      navigate("/auth");
      toast({
        title: "Please Sign In",
        description: "You need to sign in to apply to sell.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('seller_applications')
        .insert([
          {
            campaign_id: campaignId,
            seller_id: user.id,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully!",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit application",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (campaignId: string) => {
    navigate("/list-product", { state: { campaignId } });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterCampaigns(term, selectedRegion);
  };

  const handleRegionFilter = (region: string) => {
    setSelectedRegion(region);
    filterCampaigns(searchTerm, region);
  };

  const filterCampaigns = (search: string, region: string) => {
    let filtered = campaigns;
    
    if (search) {
      filtered = filtered.filter(campaign => 
        campaign.title.toLowerCase().includes(search.toLowerCase()) ||
        campaign.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (region) {
      filtered = filtered.filter(campaign => 
        campaign.target_regions?.includes(region)
      );
    }
    
    setFilteredCampaigns(filtered);
  };

  const allRegions = [...new Set(campaigns.flatMap(c => c.target_regions || []))];

  useEffect(() => {
    filterCampaigns(searchTerm, selectedRegion);
  }, [campaigns]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Hero Section */}
          <section className="text-center py-16 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Discover and Distribute with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                Bazario
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your complete marketplace for product distribution. List products, find sellers, and manage campaigns.
            </p>
            
            {/* Three Main Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <Card className="hover:shadow-elegant transition-all duration-300 cursor-pointer" onClick={() => navigate("/list-product")}>
                <CardContent className="p-6 text-center">
                  <Plus className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">List Your Product</h3>
                  <p className="text-muted-foreground">Create campaigns and reach thousands of sellers across India</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-elegant transition-all duration-300 cursor-pointer" onClick={() => navigate("/find-sellers")}>
                <CardContent className="p-6 text-center">
                  <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Find Campaigns</h3>
                  <p className="text-muted-foreground">Browse available products and apply to become a seller</p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-elegant transition-all duration-300 cursor-pointer" onClick={() => navigate("/match-onboard")}>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Match & Onboard</h3>
                  <p className="text-muted-foreground">Review applications and onboard the best sellers</p>
                </CardContent>
              </Card>
            </div>
          </section>


          {/* Search and Filter */}
          <section className="py-8">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedRegion}
                  onChange={(e) => handleRegionFilter(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Regions</option>
                  {allRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Explore Products {searchTerm && `for "${searchTerm}"`}
            </h2>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading campaigns...</p>
              </div>
            ) : filteredCampaigns.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {campaigns.length === 0 ? "No active campaigns available." : "No campaigns match your search criteria."}
                </p>
                {campaigns.length > 0 && (
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedRegion("");
                      setFilteredCampaigns(campaigns);
                    }}
                    className="text-primary hover:underline mt-2"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="hover:shadow-elegant transition-all duration-300 animate-fade-in">
                    <CardContent className="p-6">
                      {campaign.product_images && campaign.product_images.length > 0 ? (
                        <img
                          src={campaign.product_images[0]}
                          alt={campaign.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      ) : (
                        <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                          <Package className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{campaign.title}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-muted-foreground">New</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{campaign.description}</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm flex items-center">
                          <DollarSign className="h-4 w-4 mr-1 text-primary" />
                          Commission: {campaign.commission_rate}% ({campaign.commission_type})
                        </p>
                        <p className="text-sm flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-primary" />
                          {campaign.target_regions?.join(', ') || 'All regions'}
                        </p>
                        <p className="text-sm flex items-center">
                          <Users className="h-4 w-4 mr-1 text-primary" />
                          {campaign.target_demographics?.age_groups?.join(', ') || 'All demographics'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          By: {campaign.profiles?.company_name || campaign.profiles?.full_name || 'Anonymous'}
                        </p>
                      </div>
                      {user && user.id !== campaign.user_id && (
                        <Button
                          variant="hero"
                          className="w-full mb-2"
                          onClick={() => handleApply(campaign.id)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Apply to Sell
                        </Button>
                      )}
                      {user && user.id === campaign.user_id && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => handleEdit(campaign.id)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Campaign
                        </Button>
                      )}
                      {!user && (
                        <Button
                          variant="hero"
                          className="w-full"
                          onClick={() => navigate("/auth")}
                        >
                          Sign In to Apply
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Scale & Succeed CTA */}
          <section className="text-center py-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Scale Your Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Monitor performance, track sales, and expand your network with our analytics tools.
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate(user ? "/dashboard" : "/auth")}
            >
              {user ? "View Analytics" : "Get Started"}
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}