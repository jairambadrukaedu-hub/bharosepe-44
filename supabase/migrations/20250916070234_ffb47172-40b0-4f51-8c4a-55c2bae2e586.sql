-- Create disputes table to store detailed dispute information
CREATE TABLE public.disputes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) ON DELETE CASCADE,
  contract_id UUID REFERENCES public.contracts(id) ON DELETE SET NULL,
  disputing_party_id UUID NOT NULL REFERENCES auth.users(id),
  dispute_reason TEXT NOT NULL,
  description TEXT NOT NULL,
  evidence_files JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'escalated')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT
);

-- Enable RLS
ALTER TABLE public.disputes ENABLE ROW LEVEL SECURITY;

-- Create policies for disputes
CREATE POLICY "Dispute participants can view disputes" 
ON public.disputes 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.transactions t 
    WHERE t.id = disputes.transaction_id 
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);

CREATE POLICY "Authenticated users can create disputes for their transactions" 
ON public.disputes 
FOR INSERT 
WITH CHECK (
  auth.uid() = disputing_party_id 
  AND EXISTS (
    SELECT 1 FROM public.transactions t 
    WHERE t.id = disputes.transaction_id 
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);

CREATE POLICY "Support can update any dispute" 
ON public.disputes 
FOR UPDATE 
USING (true);

-- Create storage bucket for dispute evidence
INSERT INTO storage.buckets (id, name, public) VALUES ('dispute-evidence', 'dispute-evidence', false);

-- Create storage policies for dispute evidence
CREATE POLICY "Users can upload evidence for their disputes" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'dispute-evidence' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view evidence for disputes they're part of" 
ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'dispute-evidence' 
  AND EXISTS (
    SELECT 1 FROM public.disputes d
    JOIN public.transactions t ON d.transaction_id = t.id
    WHERE d.disputing_party_id::text = (storage.foldername(name))[1]
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_disputes_updated_at
BEFORE UPDATE ON public.disputes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();