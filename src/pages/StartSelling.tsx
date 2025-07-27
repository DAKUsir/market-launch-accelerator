import { useState } from "react";
import { 
  Upload, 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Star, 
  MapPin, 
  DollarSign,
  ArrowRight,
  Camera,
  FileText,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function StartSelling() {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: "List Your Product",
      description: "Upload your product details, set commission rates, define target regions, and add sales materials.",
      icon: Upload,
      features: [
        "Product description and images",
        "Commission structure and margins", 
        "Target demographics and geography",
        "Training materials and pitch decks"
      ]
    },
    {
      number: 2,
      title: "Sellers Apply",
      description: "Local sellers, resellers, and agents browse your campaign and apply to join your distribution network.",
      icon: Users,
      features: [
        "Kirana store owners and retailers",
        "Beauty salon and service providers",
        "Freelance sales agents",
        "Field marketing professionals"
      ]
    },
    {
      number: 3,
      title: "Match & Onboard",
      description: "Review applications, select the best sellers, and onboard them with training and sales materials.",
      icon: Target,
      features: [
        "AI-powered seller matching",
        "Automated background verification",
        "Digital onboarding process",
        "Sales training and certification"
      ]
    },
    {
      number: 4,
      title: "Scale & Succeed",
      description: "Monitor performance, track sales, manage commissions, and scale your network nationwide.",
      icon: TrendingUp,
      features: [
        "Real-time sales tracking",
        "Automated commission payouts",
        "Performance analytics",
        "Network expansion tools"
      ]
    }
  ];

  const sellerTypes = [
    {
      title: "Kirana Store Owners",
      description: "Local grocery stores with loyal customer base",
      icon: MapPin,
      count: "12,000+"
    },
    {
      title: "Beauty & Salon Partners",
      description: "Salons and beauty service providers",
      icon: Star,
      count: "5,500+"
    },
    {
      title: "Field Sales Agents",
      description: "Professional sales agents and representatives",
      icon: Users,
      count: "8,200+"
    },
    {
      title: "Online Resellers",
      description: "E-commerce sellers and social media marketers",
      icon: BarChart3,
      count: "3,100+"
    }
  ];

  const benefits = [
    {
      title: "Fast Market Entry",
      description: "Launch in new cities within 48 hours",
      icon: TrendingUp
    },
    {
      title: "Zero Upfront Cost",
      description: "Pay only when you make sales",
      icon: DollarSign
    },
    {
      title: "Nationwide Reach",
      description: "Access 500+ cities across India",
      icon: MapPin
    },
    {
      title: "Verified Sellers",
      description: "All sellers are background verified",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight animate-fade-in">
              Start Selling Today
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Launch your product across India's largest distribution network in just 4 simple steps
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {user ? (
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/auth">Get Started Free</Link>
                </Button>
              )}
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From product listing to nationwide sales in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <Card 
                key={step.number} 
                className={`cursor-pointer transition-all duration-300 animate-slide-up ${
                  activeStep === step.number ? 'ring-2 ring-primary shadow-elegant' : 'hover:shadow-elegant'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveStep(step.number)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {step.number.toString().padStart(2, '0')}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Network */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Seller Network
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with verified sellers across multiple categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sellerTypes.map((type, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 animate-fade-in" 
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="h-16 w-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <type.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{type.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                  <div className="text-2xl font-bold text-primary">{type.count}</div>
                  <div className="text-sm text-muted-foreground">verified sellers</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Bazario?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for startups who want to scale fast without the traditional distribution hassles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="h-16 w-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Scale Your Startup?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 1000+ startups already using Bazario to reach customers nationwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button variant="secondary" size="lg" asChild>
                <Link to="/dashboard">
                  Create Campaign <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button variant="secondary" size="lg" asChild>
                <Link to="/auth">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}