-- Create transactions table for storing contracts
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'paid', 'in-progress', 'confirmed', 'completed', 'disputed')),
  buyer_id UUID NOT NULL,
  seller_id UUID NOT NULL,
  buyer_phone TEXT,
  seller_phone TEXT,
  delivery_date DATE,
  dispute_details TEXT,
  has_evidence BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for transactions
CREATE POLICY "Users can view their own transactions as buyer" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() = buyer_id);

CREATE POLICY "Users can view their own transactions as seller" 
ON public.transactions 
FOR SELECT 
USING (auth.uid() = seller_id);

CREATE POLICY "Users can create transactions as buyer" 
ON public.transactions 
FOR INSERT 
WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Users can update their own transactions as buyer" 
ON public.transactions 
FOR UPDATE 
USING (auth.uid() = buyer_id);

CREATE POLICY "Users can update their own transactions as seller" 
ON public.transactions 
FOR UPDATE 
USING (auth.uid() = seller_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON public.transactions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create contracts table for storing agreement details
CREATE TABLE public.contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  contract_content TEXT NOT NULL,
  terms TEXT,
  created_by UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for contracts
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

-- Create policies for contracts
CREATE POLICY "Users can view contracts for their transactions" 
ON public.contracts 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.transactions t 
    WHERE t.id = transaction_id AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);

CREATE POLICY "Users can create contracts for their transactions" 
ON public.contracts 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update contracts they created" 
ON public.contracts 
FOR UPDATE 
USING (auth.uid() = created_by);

-- Add trigger for contracts timestamp updates
CREATE TRIGGER update_contracts_updated_at
BEFORE UPDATE ON public.contracts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();