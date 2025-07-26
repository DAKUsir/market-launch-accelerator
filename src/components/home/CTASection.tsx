import { ArrowRight, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
          {/* Social Proof */}
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-muted-foreground">4.9/5 rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">2,500+ startups</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <span className="text-muted-foreground">₹100Cr+ distributed</span>
            </div>
          </div>

          {/* Main CTA */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground">
              Ready to Scale Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                Distribution?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful startups who chose Bazario to accelerate their 
              go-to-market strategy and create nationwide impact.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="group px-8 py-4 text-lg">
              Start Your Free Trial
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">24 Hours</div>
                <div className="text-sm text-muted-foreground">Average setup time</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-secondary/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-secondary mb-2">No Setup Fee</div>
                <div className="text-sm text-muted-foreground">Pay only for results</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-accent/20">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-2">30 Days</div>
                <div className="text-sm text-muted-foreground">Money-back guarantee</div>
              </CardContent>
            </Card>
          </div>

          {/* Final Message */}
          <div className="bg-card/30 border border-border rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Join the Distribution Revolution
            </h3>
            <p className="text-muted-foreground">
              Don't let poor distribution kill your startup. Be part of the Bharat-first 
              network that's changing how products reach customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}