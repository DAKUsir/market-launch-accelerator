import { ArrowRight, Play, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-network.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20">
                <Target className="h-4 w-4 mr-2" />
                Solving 80% startup failure rate
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                From Startup to
                <span className="text-transparent bg-clip-text bg-gradient-primary"> Market Leader</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect with thousands of local sellers, resellers, and sales agents across India. 
                Turn your innovative product into nationwide success from day one.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1+</div>
                <div className="text-sm text-muted-foreground">Active Sellers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">2+</div>
                <div className="text-sm text-muted-foreground">Products Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">100%</div>
                <div className="text-sm text-muted-foreground">Platform Uptime</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Start Selling Today
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-gradient-primary border-2 border-background flex items-center justify-center"
                  >
                    <Users className="h-4 w-4 text-primary-foreground" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Growing marketplace for <span className="font-semibold text-foreground">startups & sellers</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-scale">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={heroImage}
                alt="Bazario Network Visualization"
                className="w-full h-auto animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-4 shadow-lg animate-pulse-glow">
              <div className="text-sm font-semibold text-foreground">Platform Ready</div>
              <div className="text-2xl font-bold text-primary">Live</div>
              <div className="text-xs text-muted-foreground">Marketplace</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-lg p-4 shadow-lg animate-pulse-glow">
              <div className="text-sm font-semibold text-foreground">Active Campaigns</div>
              <div className="text-2xl font-bold text-secondary">2</div>
              <div className="text-xs text-muted-foreground">Running now</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}