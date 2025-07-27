import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Package, 
  Plus, 
  Image as ImageIcon, 
  DollarSign, 
  MapPin, 
  Users, 
  Send,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Mock product data
const mockProducts = [
  {
    id: "1",
    user_id: "startup1",
    name: "Eco-Friendly Water Bottle",
    description: "A sustainable, BPA-free water bottle for eco-conscious consumers.",
    image_url: "https://via.placeholder.com/300x200?text=Water+Bottle",
    commission_rate: 15,
    target_demographics: "Urban youth, 18-35",
    target_geography: "Mumbai, Delhi",
    training_materials: "https://example.com/training.pdf"
  },
  {
    id: "2",
    user_id: "startup2",
    name: "Organic Skincare Cream",
    description: "Natural skincare cream made with organic ingredients.",
    image_url: "https://via.placeholder.com/300x200?text=Skincare+Cream",
    commission_rate: 20,
    target_demographics: "Women, 25-45",
    target_geography: "Bangalore, Chennai",
    training_materials: "https://example.com/skincare-guide.pdf"
  },
  {
    id: "3",
    user_id: "startup1",
    name: "Smart Fitness Tracker",
    description: "Track your fitness goals with our advanced wearable device.",
    image_url: "https://via.placeholder.com/300x200?text=Fitness+Tracker",
    commission_rate: 18,
    target_demographics: "Fitness enthusiasts, 20-40",
    target_geography: "Nationwide",
    training_materials: ""
  }
];

export default function Bazar() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    commission_rate: "",
    target_demographics: "",
    target_geography: "",
    training_materials: ""
  });

  // Handle form submission (mock)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth");
      toast({
        title: "Please Sign In",
        description: "You need to sign in to list a product.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Product listed successfully! (Prototype)",
    });
    setFormData({
      name: "",
      description: "",
      image_url: "",
      commission_rate: "",
      target_demographics: "",
      target_geography: "",
      training_materials: ""
    });
    setShowForm(false);
  };

  // Handle seller application (mock)
  const handleApply = (productId: string) => {
    if (!user) {
      navigate("/auth");
      toast({
        title: "Please Sign In",
        description: "You need to sign in to apply to sell.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Application Submitted",
      description: `You applied to sell product ID ${productId}! (Prototype)`,
    });
    navigate("/dashboard", { state: { productId } });
  };

  // Handle edit product (mock)
  const handleEdit = (productId: string) => {
    toast({
      title: "Edit Initiated",
      description: `Editing product ID ${productId}! (Prototype)`,
    });
    navigate("/dashboard", { state: { productId } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Hero Section */}
          <section className="text-center py-16 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Discover and Distribute with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                Bazario
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Browse products to sell or list your own to reach thousands of sellers across India.
            </p>
            {user && (
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => setShowForm(!showForm)}
                className="animate-fade-in-scale"
              >
                <Plus className="h-4 w-4 mr-2" />
                {showForm ? "Cancel" : "List a Product"}
              </Button>
            )}
            {!user && (
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="animate-fade-in-scale"
              >
                <Plus className="h-4 w-4 mr-2" />
                Sign In to List Products
              </Button>
            )}
          </section>

          {/* Product Listing Form */}
          {user && showForm && (
            <section className="py-8 animate-fade-in-scale">
              <Card className="max-w-2xl mx-auto shadow-elegant">
                <CardHeader>
                  <CardTitle>List Your Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your product"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="Enter image URL"
                        type="url"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commission_rate">Commission Rate (%)</Label>
                      <Input
                        id="commission_rate"
                        value={formData.commission_rate}
                        onChange={(e) => setFormData({ ...formData, commission_rate: e.target.value })}
                        placeholder="e.g., 15"
                        type="number"
                        min="0"
                        max="100"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target_demographics">Target Demographics</Label>
                      <Input
                        id="target_demographics"
                        value={formData.target_demographics}
                        onChange={(e) => setFormData({ ...formData, target_demographics: e.target.value })}
                        placeholder="e.g., Urban youth, 18-35"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target_geography">Target Geography</Label>
                      <Input
                        id="target_geography"
                        value={formData.target_geography}
                        onChange={(e) => setFormData({ ...formData, target_geography: e.target.value })}
                        placeholder="e.g., Mumbai, Delhi"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="training_materials">Training Materials URL</Label>
                      <Input
                        id="training_materials"
                        value={formData.training_materials}
                        onChange={(e) => setFormData({ ...formData, training_materials: e.target.value })}
                        placeholder="Enter training materials URL"
                        type="url"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="hero"
                      className="w-full"
                    >
                      List Product
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Products Grid */}
          <section className="py-8">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Explore Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-elegant transition-all duration-300 animate-fade-in">
                  <CardContent className="p-6">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-primary" />
                        Commission: {product.commission_rate}%
                      </p>
                      <p className="text-sm flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-primary" />
                        {product.target_geography}
                      </p>
                      <p className="text-sm flex items-center">
                        <Users className="h-4 w-4 mr-1 text-primary" />
                        {product.target_demographics}
                      </p>
                      {product.training_materials && (
                        <p className="text-sm flex items-center">
                          <ImageIcon className="h-4 w-4 mr-1 text-primary" />
                          <a href={product.training_materials} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Training Materials
                          </a>
                        </p>
                      )}
                    </div>
                    {user && (
                      <Button
                        variant="hero"
                        className="w-full mb-2"
                        onClick={() => handleApply(product.id)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Apply to Sell
                      </Button>
                    )}
                    {user && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleEdit(product.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Product
                      </Button>
                    )}
                    {!user && (
                      <Button
                        variant="hero"
                        className="w-full"
                        onClick={() => navigate("/auth")}
                      >
                        Sign In to Apply
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Scale & Succeed CTA */}
          <section className="text-center py-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Scale Your Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Monitor performance, track sales, and expand your network with our analytics tools.
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate(user ? "/dashboard" : "/auth")}
            >
              {user ? "View Analytics" : "Get Started"}
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}