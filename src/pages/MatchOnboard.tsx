import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, CheckCircle, XCircle, Clock, MessageSquare, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface Application {
  id: string;
  status: string;
  application_message: string | null;
  applied_at: string;
  reviewed_at: string | null;
  campaigns: {
    id: string;
    title: string;
    commission_rate: number;
    sales_materials: any;
  } | null;
  profiles: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
    city: string | null;
    state: string | null;
    bio: string | null;
  } | null;
}

interface Campaign {
  id: string;
  title: string;
  commission_rate: number;
  applications_count: number;
  approved_count: number;
  pending_count: number;
}

export default function MatchOnboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchApplications();
      fetchCampaignStats();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("seller_applications")
        .select(`
          *,
          campaigns!inner (
            id,
            title,
            commission_rate,
            sales_materials,
            user_id
          ),
          profiles (
            full_name,
            email,
            phone,
            city,
            state,
            bio
          )
        `)
        .eq("campaigns.user_id", user?.id)
        .order("applied_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "Failed to load applications. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaignStats = async () => {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select(`
          id,
          title,
          commission_rate,
          seller_applications (
            id,
            status
          )
        `)
        .eq("user_id", user?.id);

      if (error) throw error;

      const stats = (data || []).map(campaign => ({
        id: campaign.id,
        title: campaign.title,
        commission_rate: campaign.commission_rate,
        applications_count: campaign.seller_applications.length,
        approved_count: campaign.seller_applications.filter((app: any) => app.status === "approved").length,
        pending_count: campaign.seller_applications.filter((app: any) => app.status === "pending").length,
      }));

      setCampaigns(stats);
    } catch (error) {
      console.error("Error fetching campaign stats:", error);
    }
  };

  const handleApplicationAction = async (applicationId: string, action: "approve" | "reject") => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from("seller_applications")
        .update({
          status: action === "approve" ? "approved" : "rejected",
          reviewed_at: new Date().toISOString()
        })
        .eq("id", applicationId);

      if (error) throw error;

      toast({
        title: `Application ${action === "approve" ? "Approved" : "Rejected"}`,
        description: `The seller application has been ${action === "approve" ? "approved" : "rejected"}.`,
      });

      fetchApplications();
      fetchCampaignStats();
      setSelectedApplication(null);
    } catch (error) {
      console.error(`Error ${action}ing application:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action} application. Please try again.`,
        variant: "destructive"
      });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    }
  };

  const pendingApplications = applications.filter(app => app.status === "pending");
  const reviewedApplications = applications.filter(app => app.status !== "pending");

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-8">Please Sign In</h1>
            <p className="text-xl text-muted-foreground mb-8">
              You need to be signed in to manage seller applications.
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
              Match &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                Onboard
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Review seller applications, select the best candidates, and onboard them to your campaigns.
            </p>
          </section>

          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="shadow-elegant">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{campaign.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {campaign.commission_rate}% Commission
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Applications:</span>
                      <Badge variant="outline">{campaign.applications_count}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pending:</span>
                      <Badge variant="secondary">{campaign.pending_count}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Approved:</span>
                      <Badge className="bg-green-100 text-green-800">{campaign.approved_count}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pending" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Pending Applications ({pendingApplications.length})
              </TabsTrigger>
              <TabsTrigger value="reviewed" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Reviewed Applications ({reviewedApplications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading applications...</p>
                </div>
              ) : pendingApplications.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">No pending applications</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      New seller applications will appear here for review.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingApplications.map((application) => (
                    <Card key={application.id} className="hover:shadow-elegant transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="line-clamp-1">{application.profiles?.full_name || "Anonymous"}</span>
                          {getStatusBadge(application.status)}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Campaign: {application.campaigns?.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Applied: {new Date(application.applied_at).toLocaleDateString()}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm">
                            <strong>Email:</strong> {application.profiles?.email || "Not provided"}
                          </p>
                          <p className="text-sm">
                            <strong>Location:</strong> {application.profiles?.city && application.profiles?.state 
                              ? `${application.profiles.city}, ${application.profiles.state}` 
                              : "Not provided"}
                          </p>
                          {application.profiles?.phone && (
                            <p className="text-sm">
                              <strong>Phone:</strong> {application.profiles.phone}
                            </p>
                          )}
                        </div>

                        {application.application_message && (
                          <div className="bg-muted/50 p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1">Application Message:</p>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {application.application_message}
                            </p>
                          </div>
                        )}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Review Application
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Review Seller Application</DialogTitle>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Seller Details</h4>
                                    <div className="space-y-1 text-sm">
                                      <p><strong>Name:</strong> {selectedApplication.profiles?.full_name || "Not provided"}</p>
                                      <p><strong>Email:</strong> {selectedApplication.profiles?.email || "Not provided"}</p>
                                      <p><strong>Phone:</strong> {selectedApplication.profiles?.phone || "Not provided"}</p>
                                      <p><strong>Location:</strong> {selectedApplication.profiles?.city && selectedApplication.profiles?.state 
                                        ? `${selectedApplication.profiles.city}, ${selectedApplication.profiles.state}` 
                                        : "Not provided"}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Campaign Details</h4>
                                    <div className="space-y-1 text-sm">
                                      <p><strong>Product:</strong> {selectedApplication.campaigns?.title}</p>
                                      <p><strong>Commission:</strong> {selectedApplication.campaigns?.commission_rate}%</p>
                                      <p><strong>Applied:</strong> {new Date(selectedApplication.applied_at).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                </div>

                                {selectedApplication.profiles?.bio && (
                                  <div>
                                    <h4 className="font-medium mb-2">Seller Bio</h4>
                                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                      {selectedApplication.profiles.bio}
                                    </p>
                                  </div>
                                )}

                                {selectedApplication.application_message && (
                                  <div>
                                    <h4 className="font-medium mb-2">Application Message</h4>
                                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                                      {selectedApplication.application_message}
                                    </p>
                                  </div>
                                )}

                                {selectedApplication.campaigns?.sales_materials && (
                                  <div>
                                    <h4 className="font-medium mb-2">Training Materials Available</h4>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <Star className="h-4 w-4 mr-2 text-primary" />
                                      Ready to provide training materials upon approval
                                    </div>
                                  </div>
                                )}

                                <div className="flex gap-2 pt-4 border-t">
                                  <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => setSelectedApplication(null)}
                                  >
                                    Close
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    className="flex-1"
                                    onClick={() => handleApplicationAction(selectedApplication.id, "reject")}
                                    disabled={actionLoading}
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button 
                                    variant="hero" 
                                    className="flex-1"
                                    onClick={() => handleApplicationAction(selectedApplication.id, "approve")}
                                    disabled={actionLoading}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviewed" className="space-y-4">
              {reviewedApplications.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">No reviewed applications yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Applications you approve or reject will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reviewedApplications.map((application) => (
                    <Card key={application.id} className="hover:shadow-elegant transition-all duration-300">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between text-base">
                          <span className="line-clamp-1">{application.profiles?.full_name || "Anonymous"}</span>
                          {getStatusBadge(application.status)}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {application.campaigns?.title}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1 text-sm">
                          <p>Applied: {new Date(application.applied_at).toLocaleDateString()}</p>
                          {application.reviewed_at && (
                            <p>Reviewed: {new Date(application.reviewed_at).toLocaleDateString()}</p>
                          )}
                          <p className="text-muted-foreground">
                            {application.profiles?.city && application.profiles?.state 
                              ? `${application.profiles.city}, ${application.profiles.state}` 
                              : "Location not provided"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}