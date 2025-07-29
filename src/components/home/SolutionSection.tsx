import { CheckCircle, Zap, Target, Globe, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import sellersImage from "@/assets/sellers-network.jpg";

export function SolutionSection() {
  const solutions = [
    {
      icon: Zap,
      title: "Instant Market Access",
      description: "Go from product launch to nationwide distribution in 24 hours, not months.",
      benefit: "10x faster"
    },
    {
      icon: Users,
      title: "Growing Network",
      description: "Join our expanding network of verified sellers across India.",
      benefit: "Growing daily"
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "AI-powered geo-targeting connects you with the right sellers for your audience.",
      benefit: "95% match rate"
    },
    {
      icon: DollarSign,
      title: "Performance-Based",
      description: "Pay only for results with automated commission tracking and instant payouts.",
      benefit: "Zero upfront cost"
    }
  ];

  const features = [
    "Two-sided marketplace connecting startups and sellers",
    "Geo-targeting by city, pin code, or GPS radius",
    "Built-in sales enablement and training materials",
    "Automated commission tracking and payments",
    "Real-time analytics and performance monitoring",
    "Quality ratings and feedback system"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Meet Bazario
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-primary">
              The Distribution Revolution
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've built the missing link between innovative startups and eager local sellers. 
            One platform that solves distribution for both sides.
          </p>
        </div>

        {/* Main Solution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <solution.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {solution.title}
                      </h3>
                      <span className="text-sm font-medium text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                        {solution.benefit}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {solution.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="w-full sm:w-auto">
              Start Building Your Network
            </Button>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in-scale">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={sellersImage}
                alt="Local Sellers Network"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute top-4 left-4 bg-card border border-border rounded-lg p-3 shadow-lg animate-pulse-glow">
              <div className="text-xs font-semibold text-foreground">Marketplace</div>
              <div className="text-lg font-bold text-primary">Active</div>
              <div className="text-xs text-muted-foreground">Join now</div>
            </div>
          </div>
        </div>

        {/* Features Checklist */}
        <Card className="bg-gradient-hero border-primary/20 animate-fade-in-scale">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Everything You Need in One Platform
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}