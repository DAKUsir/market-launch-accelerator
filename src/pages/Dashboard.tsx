import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  MapPin, 
  DollarSign,
  Bell,
  Plus,
  Filter,
  Download,
  LogOut // Added LogOut icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  user_type: string;
  company_name?: string;
  city?: string;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        navigate('/auth');
      }
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchProfile();
    }
  }, [user, loading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
        await fetchDashboardData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchDashboardData = async (profileData: Profile) => {
    const isStartup = profileData.user_type === 'startup';
    
    try {
      if (isStartup) {
        // Fetch startup stats
        const [campaignsRes, applicationsRes, salesRes] = await Promise.all([
          supabase.from('campaigns').select('*').eq('user_id', user!.id),
          supabase.from('seller_applications').select('*, campaigns!inner(user_id)').eq('campaigns.user_id', user!.id),
          supabase.from('sales').select('*, campaigns!inner(user_id)').eq('campaigns.user_id', user!.id)
        ]);

        const activeCampaigns = campaignsRes.data?.filter(c => c.status === 'active').length || 0;
        const totalSellers = new Set(applicationsRes.data?.filter(a => a.status === 'approved').map(a => a.seller_id)).size;
        const totalSales = salesRes.data?.reduce((sum, sale) => sum + parseFloat(sale.amount.toString()), 0) || 0;
        const citiesCovered = new Set(applicationsRes.data?.map(a => a.seller_id)).size;

        setStats([
          { title: "Active Campaigns", value: activeCampaigns.toString(), icon: BarChart3, color: "text-blue-500" },
          { title: "Partner Sellers", value: totalSellers.toString(), icon: Users, color: "text-green-500" },
          { title: "Total Sales", value: `₹${(totalSales / 1000).toFixed(1)}K`, icon: DollarSign, color: "text-purple-500" },
          { title: "Cities Covered", value: citiesCovered.toString(), icon: MapPin, color: "text-orange-500" },
        ]);

        setRecentActivity(applicationsRes.data?.slice(-4).map(app => ({
          type: 'application',
          message: 'New seller applied to campaign',
          description: `Application for campaign`,
          time: '2 hours ago'
        })) || []);
      } else {
        // Fetch seller stats
        const [applicationsRes, salesRes] = await Promise.all([
          supabase.from('seller_applications').select('*, campaigns(*)').eq('seller_id', user!.id),
          supabase.from('sales').select('*').eq('seller_id', user!.id)
        ]);

        const activeProducts = applicationsRes.data?.filter(a => a.status === 'approved').length || 0;
        const totalEarnings = salesRes.data?.reduce((sum, sale) => sum + parseFloat(sale.commission_amount.toString()), 0) || 0;
        const thisMonth = salesRes.data?.filter(sale => new Date(sale.sale_date).getMonth() === new Date().getMonth())
          .reduce((sum, sale) => sum + parseFloat(sale.commission_amount.toString()), 0) || 0;

        setStats([
          { title: "Active Products", value: activeProducts.toString(), icon: BarChart3, color: "text-blue-500" },
          { title: "Total Earnings", value: `₹${totalEarnings.toFixed(0)}`, icon: DollarSign, color: "text-green-500" },
          { title: "This Month", value: `₹${thisMonth.toFixed(0)}`, icon: TrendingUp, color: "text-purple-500" },
          { title: "Commission Rate", value: "18%", icon: BarChart3, color: "text-orange-500" },
        ]);

        setRecentActivity(salesRes.data?.slice(-4).map(sale => ({
          type: 'sale',
          message: 'Product sale completed',
          description: `₹${sale.commission_amount} commission earned`,
          time: '1 hour ago'
        })) || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const isStartup = profile?.user_type === 'startup';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {profile?.full_name || 'User'}!
              </h1>
              <p className="text-muted-foreground">
                {isStartup 
                  ? 'Monitor your distribution network and track campaign performance'
                  : 'Manage your partnerships and track your earnings'
                }
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => navigate(isStartup ? '/list-product' : '/find-sellers')}
              >
                <Plus className="h-4 w-4 mr-2" />
                {isStartup ? 'New Campaign' : 'Browse Products'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 animate-fade-in" 
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`${stat.color} bg-current/10 p-3 rounded-lg`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="animate-slide-up">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>
                    {isStartup ? 'Recent Campaign Activity' : 'Recent Sales Activity'}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {activity.message}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {activity.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No recent activity</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {isStartup ? 'Create your first campaign to get started' : 'Apply to campaigns to start earning'}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Profile Info */}
            <div className="space-y-6">
              {/* Profile Card */}
              <Card className="animate-fade-in-scale">
                <CardHeader>
                  <CardTitle>Profile Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">
                        {profile?.full_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{profile?.company_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {isStartup ? 'Startup Founder' : 'Local Seller'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="text-sm text-foreground">{profile?.city || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Account:</span>
                      <span className="text-sm text-foreground capitalize">{profile?.user_type}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="animate-fade-in-scale">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isStartup ? (
                    <>
                      <Button variant="hero" className="w-full justify-start" onClick={() => navigate('/list-product')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Campaign
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/match-onboard')}>
                        <Users className="h-4 w-4 mr-2" />
                        Manage Sellers
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/bazar')}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Marketplace
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="hero" className="w-full justify-start" onClick={() => navigate('/find-sellers')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Browse Products
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/dashboard')}>
                        <DollarSign className="h-4 w-4 mr-2" />
                        View Earnings
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/bazar')}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Visit Marketplace
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}