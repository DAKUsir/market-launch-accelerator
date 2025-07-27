-- Create campaigns table for startup product listings
CREATE TABLE public.campaigns (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  product_images text[],
  commission_rate decimal(5,2) NOT NULL DEFAULT 0.00,
  commission_type text NOT NULL DEFAULT 'percentage' CHECK (commission_type IN ('percentage', 'fixed')),
  target_regions text[],
  target_demographics jsonb,
  sales_materials jsonb,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create seller applications table
CREATE TABLE public.seller_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id uuid NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  seller_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  application_message text,
  applied_at timestamp with time zone NOT NULL DEFAULT now(),
  reviewed_at timestamp with time zone,
  UNIQUE(campaign_id, seller_id)
);

-- Create sales table for tracking actual sales
CREATE TABLE public.sales (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id uuid NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  seller_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount decimal(10,2) NOT NULL,
  commission_amount decimal(10,2) NOT NULL,
  customer_details jsonb,
  sale_date timestamp with time zone NOT NULL DEFAULT now(),
  payout_status text NOT NULL DEFAULT 'pending' CHECK (payout_status IN ('pending', 'processing', 'paid', 'failed')),
  payout_date timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales ENABLE ROW LEVEL SECURITY;

-- RLS policies for campaigns
CREATE POLICY "Users can view active campaigns" ON public.campaigns
  FOR SELECT USING (status = 'active' OR user_id = auth.uid());

CREATE POLICY "Users can create their own campaigns" ON public.campaigns
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns" ON public.campaigns
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns" ON public.campaigns
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for seller applications
CREATE POLICY "Users can view their own applications" ON public.seller_applications
  FOR SELECT USING (
    seller_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.campaigns WHERE campaigns.id = campaign_id AND campaigns.user_id = auth.uid())
  );

CREATE POLICY "Sellers can create applications" ON public.seller_applications
  FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Campaign owners can update applications" ON public.seller_applications
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.campaigns WHERE campaigns.id = campaign_id AND campaigns.user_id = auth.uid())
  );

-- RLS policies for sales
CREATE POLICY "Users can view their own sales" ON public.sales
  FOR SELECT USING (
    seller_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM public.campaigns WHERE campaigns.id = campaign_id AND campaigns.user_id = auth.uid())
  );

CREATE POLICY "Sellers can create sales" ON public.sales
  FOR INSERT WITH CHECK (auth.uid() = seller_id);

-- Add triggers for updated_at
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX idx_campaigns_user_id ON public.campaigns(user_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_seller_applications_campaign_id ON public.seller_applications(campaign_id);
CREATE INDEX idx_seller_applications_seller_id ON public.seller_applications(seller_id);
CREATE INDEX idx_sales_campaign_id ON public.sales(campaign_id);
CREATE INDEX idx_sales_seller_id ON public.sales(seller_id);