import { 
  Upload, 
  Users, 
  Handshake, 
  TrendingUp, 
  ArrowRight,
  CheckCircle,
  Play,
  Target,
  MapPin,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "List Your Product",
      description: "Upload your product details, set commission rates, define target regions, and add sales materials.",
      details: [
        "Product description and images",
        "Commission structure and margins", 
        "Target demographics and geography",
        "Training materials and pitch decks"
      ],
      color: "text-blue-500"
    },
    {
      number: "02", 
      icon: Users,
      title: "Sellers Apply",
      description: "Local sellers, resellers, and agents browse your campaign and apply to join your distribution network.",
      details: [
        "Kirana store owners and retailers",
        "Beauty salon and service providers",
        "Freelance sales agents",
        "Field marketing professionals"
      ],
      color: "text-green-500"
    },
    {
      number: "03",
      icon: Handshake,
      title: "Match & Onboard", 
      description: "Review applications, select the best sellers, and onboard them with training and sales materials.",
      details: [
        "AI-powered seller matching",
        "Automated background verification",
        "Digital onboarding process",
        "Sales training and certification"
      ],
      color: "text-purple-500"
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "Scale & Succeed",
      description: "Monitor performance, track sales, manage commissions, and scale your network nationwide.",
      details: [
        "Real-time sales tracking",
        "Automated commission payouts",
        "Performance analytics",
        "Network expansion tools"
      ],
      color: "text-orange-500"
    }
  ];

  const sellerTypes = [
    {
      icon: Target,
      title: "Kirana Store Owners",
      description: "Local grocery stores with established customer relationships",
      benefits: "Direct customer access, trusted local presence"
    },
    {
      icon: MapPin,
      title: "Beauty & Wellness",
      description: "Salons, spas, and wellness centers with regular clientele",
      benefits: "High-touch customer interaction, lifestyle products"
    },
    {
      icon: Users,
      title: "Field Agents",
      description: "Experienced sales professionals and freelancers",
      benefits: "Professional sales skills, wider territory coverage"
    },
    {
      icon: DollarSign,
      title: "Reseller Network",
      description: "Existing distributors looking for new products",
      benefits: "Established distribution channels, bulk sales"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
              How Bazario
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                Transforms Distribution
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From product upload to nationwide sales in 4 simple steps. 
              See how we're revolutionizing startup distribution across India.
            </p>
            <Button variant="hero" size="lg" className="group">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo Video
            </Button>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={`space-y-6 animate-slide-up ${
                  index % 2 === 1 ? 'lg:col-start-2' : ''
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`${step.color} bg-current/10 p-4 rounded-lg`}>
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <div className="text-4xl font-bold text-muted-foreground/30">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground">
                    {step.description}
                  </p>
                  
                  <div className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                        <span className="text-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className={`relative animate-fade-in-scale ${
                  index % 2 === 1 ? 'lg:col-start-1' : ''
                }`}>
                  <Card className="p-8 bg-gradient-hero border-border/50">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                        <step.icon className={`h-24 w-24 ${step.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                      <ArrowRight className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Types */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Your Distribution
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-secondary">
                Network Partners
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with diverse seller types across India, each bringing unique strengths 
              to amplify your product reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sellerTypes.map((type, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 p-3 rounded-lg">
                      <type.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        {type.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {type.description}
                      </p>
                      <div className="text-sm font-medium text-secondary">
                        Benefits: {type.benefits}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to Build Your
              <br />
              Distribution Empire?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join the startups who are already scaling nationwide with Bazario's 
              distribution network. Your success story starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="group">
                Start Free Trial
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}