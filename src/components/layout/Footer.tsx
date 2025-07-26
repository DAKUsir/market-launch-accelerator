import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-foreground">Bazario</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Connecting startups with local sellers across India to accelerate product distribution and create income opportunities.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <div className="space-y-2">
              <Link to="/features" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link to="/pricing" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/how-it-works" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link to="/success-stories" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Success Stories
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                API Reference
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">hello@bazario.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Bangalore, Karnataka<br />India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Bazario. All rights reserved. Built for Bharat's growth.
          </p>
        </div>
      </div>
    </footer>
  );
}