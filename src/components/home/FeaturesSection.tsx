import { 
  MapPin, 
  Users, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  CreditCard,
  BarChart3,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import dashboardImage from "@/assets/dashboard-preview.jpg";

export function FeaturesSection() {
  const features = [
    {
      icon: MapPin,
      title: "Geo-Targeting",
      description: "Find sellers by city, pin code, or GPS radius. Perfect local match every time.",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Seller Network",
      description: "Access 10,000+ verified sellers from kirana stores to beauty salons.",
      color: "text-green-500"
    },
    {
      icon: TrendingUp,
      title: "Sales Enablement", 
      description: "Built-in training materials, pitch decks, and product demonstrations.",
      color: "text-purple-500"
    },
    {
      icon: CreditCard,
      title: "Auto Payments",
      description: "Automated commission tracking and instant payouts via Razorpay.",
      color: "text-orange-500"
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track performance, sales, and ROI with comprehensive dashboards.",
      color: "text-indigo-500"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rating system and feedback loops ensure high-quality partnerships.",
      color: "text-red-500"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Powerful Features for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-primary">
              Maximum Impact
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every tool you need to build, manage, and scale your distribution network 
            is built right into Bazario.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className={`${feature.color} bg-current/10 p-4 rounded-lg inline-flex`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-3xl font-bold text-foreground">
              Intuitive Dashboard
              <br />
              <span className="text-primary">Real Results</span>
            </h3>
            <p className="text-lg text-muted-foreground">
              Monitor your distribution network in real-time. Track sales, manage commissions, 
              and optimize performance with our comprehensive analytics platform.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <span className="text-foreground">Mobile-first design for on-the-go management</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-secondary" />
                <span className="text-foreground">Multi-language support for diverse markets</span>
              </div>
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-5 w-5 text-accent" />
                <span className="text-foreground">Advanced reporting and insights</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-scale">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={dashboardImage}
                alt="Bazario Dashboard"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent"></div>
            </div>
            
            {/* Floating Metrics */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-lg animate-pulse-glow">
              <div className="text-sm font-semibold text-foreground">Conversion Rate</div>
              <div className="text-2xl font-bold text-secondary">23.8%</div>
              <div className="text-xs text-green-500">↑ 12% this month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}