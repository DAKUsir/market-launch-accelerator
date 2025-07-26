import { AlertCircle, Clock, TrendingDown, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ProblemSection() {
  const problems = [
    {
      icon: TrendingDown,
      title: "80% Startup Failure Rate",
      description: "Most startups fail not because of bad products, but due to lack of effective distribution channels.",
      stat: "8 out of 10",
      color: "text-red-500"
    },
    {
      icon: Clock,
      title: "Months to Market",
      description: "Cold-calling distributors and setting up logistics takes weeks or months, delaying crucial market entry.",
      stat: "3-6 months",
      color: "text-orange-500"
    },
    {
      icon: Users,
      title: "Untapped Local Talent",
      description: "Kirana owners, beauty salons, and field agents have sales potential but lack opportunities to monetize it.",
      stat: "10M+ sellers",
      color: "text-yellow-500"
    },
    {
      icon: AlertCircle,
      title: "No Distribution = No Success",
      description: "Great products die in warehouses because founders can't reach customers effectively and quickly.",
      stat: "₹100Cr lost",
      color: "text-red-600"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            The Distribution Crisis
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Killing Indian Startups
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            While innovation thrives, distribution remains the biggest bottleneck. 
            Brilliant products never reach customers because traditional distribution is broken.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {problems.map((problem, index) => (
            <Card 
              key={index} 
              className="border-l-4 border-l-red-500 hover:shadow-elegant transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`${problem.color} bg-current/10 p-3 rounded-lg`}>
                    <problem.icon className={`h-6 w-6 ${problem.color}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">
                        {problem.title}
                      </h3>
                      <span className={`text-2xl font-bold ${problem.color}`}>
                        {problem.stat}
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Statement */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-8 text-center border border-red-500/20 animate-fade-in-scale">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            The Cost of Poor Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-red-500">₹500Cr+</div>
              <div className="text-sm text-muted-foreground">Funding wasted annually</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500">50,000+</div>
              <div className="text-sm text-muted-foreground">Jobs never created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">1M+</div>
              <div className="text-sm text-muted-foreground">Dreams shattered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}