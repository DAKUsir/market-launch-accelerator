import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Upload, MapPin, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu"
];

const AGE_GROUPS = ["18-25", "26-35", "36-45", "46-55", "55+"];
const INCOME_LEVELS = ["Below 2L", "2-5L", "5-10L", "10-20L", "20L+"];

export default function ListProduct() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    commission_rate: "",
    commission_type: "percentage",
    target_regions: [] as string[],
    target_demographics: {
      age_groups: [] as string[],
      income_levels: [] as string[],
      interests: ""
    },
    product_images: [] as string[],
    sales_materials: {
      brochures: "",
      videos: "",
      training_docs: ""
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("campaigns")
        .insert({
          title: formData.title,
          description: formData.description,
          commission_rate: parseFloat(formData.commission_rate),
          commission_type: formData.commission_type,
          target_regions: formData.target_regions,
          target_demographics: formData.target_demographics,
          product_images: formData.product_images,
          sales_materials: formData.sales_materials,
          status: "active",
          user_id: user.id
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your product campaign has been listed successfully.",
      });

      navigate("/bazar");
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: "Failed to create campaign. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addTargetRegion = (region: string) => {
    if (!formData.target_regions.includes(region)) {
      setFormData({
        ...formData,
        target_regions: [...formData.target_regions, region]
      });
    }
  };

  const removeTargetRegion = (region: string) => {
    setFormData({
      ...formData,
      target_regions: formData.target_regions.filter(r => r !== region)
    });
  };

  const addAgeGroup = (ageGroup: string) => {
    if (!formData.target_demographics.age_groups.includes(ageGroup)) {
      setFormData({
        ...formData,
        target_demographics: {
          ...formData.target_demographics,
          age_groups: [...formData.target_demographics.age_groups, ageGroup]
        }
      });
    }
  };

  const addIncomeLevel = (incomeLevel: string) => {
    if (!formData.target_demographics.income_levels.includes(incomeLevel)) {
      setFormData({
        ...formData,
        target_demographics: {
          ...formData.target_demographics,
          income_levels: [...formData.target_demographics.income_levels, incomeLevel]
        }
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-8">Please Sign In</h1>
            <p className="text-xl text-muted-foreground mb-8">
              You need to be signed in to list products.
            </p>
            <Button onClick={() => navigate("/auth")} variant="hero" size="lg">
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-6">
          <section className="text-center py-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              List Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-primary">
                Product
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Create a campaign to reach thousands of sellers across India and grow your distribution network.
            </p>
          </section>

          <Card className="max-w-4xl mx-auto shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Create Product Campaign
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Product Name</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commission_rate">Commission Rate (%)</Label>
                      <Input
                        id="commission_rate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={formData.commission_rate}
                        onChange={(e) => setFormData({ ...formData, commission_rate: e.target.value })}
                        placeholder="e.g., 15"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Product Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your product, its benefits, and selling points"
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Targeting */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Geographic Targeting
                  </h3>
                  <div className="space-y-2">
                    <Label>Target States/Regions</Label>
                    <Select onValueChange={addTargetRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select states to target" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.target_regions.map((region) => (
                        <span
                          key={region}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-primary/20"
                          onClick={() => removeTargetRegion(region)}
                        >
                          {region} ×
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Demographics */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Demographic Targeting
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Age Groups</Label>
                      <Select onValueChange={addAgeGroup}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select age groups" />
                        </SelectTrigger>
                        <SelectContent>
                          {AGE_GROUPS.map((age) => (
                            <SelectItem key={age} value={age}>
                              {age}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2">
                        {formData.target_demographics.age_groups.map((age) => (
                          <span key={age} className="bg-secondary/10 text-secondary px-2 py-1 rounded text-sm">
                            {age}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Income Levels</Label>
                      <Select onValueChange={addIncomeLevel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select income levels" />
                        </SelectTrigger>
                        <SelectContent>
                          {INCOME_LEVELS.map((income) => (
                            <SelectItem key={income} value={income}>
                              {income}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2">
                        {formData.target_demographics.income_levels.map((income) => (
                          <span key={income} className="bg-secondary/10 text-secondary px-2 py-1 rounded text-sm">
                            {income}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interests">Target Interests</Label>
                    <Input
                      id="interests"
                      value={formData.target_demographics.interests}
                      onChange={(e) => setFormData({
                        ...formData,
                        target_demographics: {
                          ...formData.target_demographics,
                          interests: e.target.value
                        }
                      })}
                      placeholder="e.g., fitness, technology, eco-friendly products"
                    />
                  </div>
                </div>

                {/* Sales Materials */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Sales Materials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brochures">Brochures URL</Label>
                      <Input
                        id="brochures"
                        type="url"
                        value={formData.sales_materials.brochures}
                        onChange={(e) => setFormData({
                          ...formData,
                          sales_materials: {
                            ...formData.sales_materials,
                            brochures: e.target.value
                          }
                        })}
                        placeholder="Link to product brochures"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="videos">Training Videos URL</Label>
                      <Input
                        id="videos"
                        type="url"
                        value={formData.sales_materials.videos}
                        onChange={(e) => setFormData({
                          ...formData,
                          sales_materials: {
                            ...formData.sales_materials,
                            videos: e.target.value
                          }
                        })}
                        placeholder="Link to training videos"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="training_docs">Training Documents URL</Label>
                      <Input
                        id="training_docs"
                        type="url"
                        value={formData.sales_materials.training_docs}
                        onChange={(e) => setFormData({
                          ...formData,
                          sales_materials: {
                            ...formData.sales_materials,
                            training_docs: e.target.value
                          }
                        })}
                        placeholder="Link to training materials"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/bazar")}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    className="flex-1"
                    disabled={loading}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    {loading ? "Creating..." : "List Product"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}