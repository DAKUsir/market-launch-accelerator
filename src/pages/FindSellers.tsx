import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Users, DollarSign, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface Campaign {
  id: string;
  title: string;
  description: string;
  commission_rate: number;
  commission_type: string;
  target_regions: string[];
  target_demographics: any;
  product_images: string[];
  sales_materials: any;
  status: string;
  created_at: string;
  profiles: {
    company_name: string | null;
    full_name: string | null;
  } | null;
}

export default function FindSellers() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [applicationMessage, setApplicationMessage] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select(`
          *,
          profiles (
            company_name,
            full_name
          )
        `)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      toast({
        title: "Error",
        description: "Failed to load campaigns. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user || !selectedCampaign) {
      navigate("/auth");
      return;
    }

    setApplying(true);
    try {
      // Check if already applied
      const { data: existingApplication } = await supabase
        .from("seller_applications")
        .select("id")
        .eq("campaign_id", selectedCampaign.id)
        .eq("seller_id", user.id)
        .single();

      if (existingApplication) {
        toast({
          title: "Already Applied",
          description: "You have already applied to this campaign.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from("seller_applications")
        .insert({
          campaign_id: selectedCampaign.id,
          seller_id: user.id,
          application_message: applicationMessage,
          status: "pending"
        });

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "Your application has been submitted successfully.",
      });

      setSelectedCampaign(null);
      setApplicationMessage("");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setApplying(false);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || 
                         (campaign.target_regions && campaign.target_regions.includes(selectedRegion));
    return matchesSearch && matchesRegion;
  });

  const allRegions = Array.from(new Set(
    campaigns.flatMap(c => c.target_regions || [])
  )).sort();

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-8">Please Sign In</h1>
            <p className="text-xl text-muted-foreground mb-8">
              You need to be signed in to browse and apply for campaigns.
            </p>
            <Button onClick={() => navigate("/auth")} variant="hero" size="lg">
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <section className="text-center py-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Find{" "}
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                Campaigns
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse available product campaigns and apply to become a seller. Earn commissions by promoting amazing products.
            </p>
          </section>

          {/* Search and Filters */}
          <Card className="mb-8 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Regions</SelectItem>
                    {allRegions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading campaigns...</p>
            </div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No campaigns found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span className="line-clamp-2">{campaign.title}</span>
                      <Badge variant="default" className="ml-2">
                        {campaign.commission_rate}% Commission
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      by {campaign.profiles?.company_name || campaign.profiles?.full_name || "Anonymous"}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {campaign.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <DollarSign className="h-4 w-4 mr-2 text-primary" />
                        <span>{campaign.commission_rate}% commission per sale</span>
                      </div>
                      
                      {campaign.target_regions && campaign.target_regions.length > 0 && (
                        <div className="flex items-start text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-primary mt-0.5" />
                          <div className="flex flex-wrap gap-1">
                            {campaign.target_regions.slice(0, 3).map((region) => (
                              <Badge key={region} variant="outline" className="text-xs">
                                {region}
                              </Badge>
                            ))}
                            {campaign.target_regions.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{campaign.target_regions.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {campaign.target_demographics?.age_groups && (
                        <div className="flex items-start text-sm">
                          <Users className="h-4 w-4 mr-2 text-primary mt-0.5" />
                          <div className="flex flex-wrap gap-1">
                            {campaign.target_demographics.age_groups.slice(0, 2).map((age: string) => (
                              <Badge key={age} variant="secondary" className="text-xs">
                                {age}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {campaign.sales_materials && (
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 mr-2 text-primary" />
                          <span>Training materials provided</span>
                        </div>
                      )}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="hero" 
                          className="w-full"
                          onClick={() => setSelectedCampaign(campaign)}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Apply to Sell
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Apply to Campaign</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">{selectedCampaign?.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Commission: {selectedCampaign?.commission_rate}%
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="application-message">Application Message</Label>
                            <Textarea
                              id="application-message"
                              placeholder="Tell the company why you'd be a great seller for their product..."
                              value={applicationMessage}
                              onChange={(e) => setApplicationMessage(e.target.value)}
                              rows={4}
                            />
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => setSelectedCampaign(null)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="hero" 
                              className="flex-1"
                              onClick={handleApply}
                              disabled={applying}
                            >
                              {applying ? "Submitting..." : "Submit Application"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}