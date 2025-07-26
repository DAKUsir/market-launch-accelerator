import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthForm } from "@/components/auth/AuthForm";

export default function Auth() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left side - Branding */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  {mode === 'signin' ? 'Welcome Back to' : 'Join'} 
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-primary">
                    Bazario
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  {mode === 'signin' 
                    ? 'Access your distribution network and continue growing your business across India.'
                    : 'Connect with thousands of sellers and scale your product distribution nationwide.'
                  }
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Access to 10,000+ verified sellers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-secondary rounded-full"></div>
                  <span className="text-foreground">Coverage across 500+ cities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-accent rounded-full"></div>
                  <span className="text-foreground">Automated commission tracking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Real-time analytics dashboard</span>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="bg-muted/30 rounded-lg p-6 border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">2,500+</div>
                    <div className="text-sm text-muted-foreground">Startups</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">₹100Cr+</div>
                    <div className="text-sm text-muted-foreground">Distributed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Auth Form */}
            <div className="animate-fade-in-scale">
              <AuthForm mode={mode} onToggleMode={toggleMode} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}