import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import HowItWorks from "./pages/HowItWorks";
import StartSelling from "./pages/StartSelling";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Bazar from "./pages/Bazar";
import ListProduct from "./pages/ListProduct";
import FindSellers from "./pages/FindSellers";
import MatchOnboard from "./pages/MatchOnboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/start-selling" element={<StartSelling />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bazar" element={<Bazar />} />
            <Route path="/list-product" element={<ListProduct />} />
            <Route path="/find-sellers" element={<FindSellers />} />
            <Route path="/match-onboard" element={<MatchOnboard />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
