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
  Edit
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
  const [loading, setLoading] = useState(true);

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


          {/* Products Grid */}
          <section className="py-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Explore Products
            </h2>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading campaigns...</p>
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active campaigns available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
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
                      <h3 className="text-xl font-semibold text-foreground">{campaign.title}</h3>
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