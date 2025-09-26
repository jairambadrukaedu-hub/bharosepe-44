-- Create escalations table to store escalation requests
CREATE TABLE public.escalations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID NOT NULL,
  escalated_by UUID NOT NULL,
  escalation_reason TEXT NOT NULL,
  escalation_notes TEXT,
  evidence_files JSONB DEFAULT '[]'::jsonb,
  dispute_data JSONB NOT NULL, -- Store all dispute context (messages, proposals, etc.)
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
  assigned_to UUID NULL, -- Customer care agent
  resolution_notes TEXT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE NULL
);

-- Enable RLS for escalations table
ALTER TABLE public.escalations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for escalations
CREATE POLICY "Transaction participants can view escalations"
ON public.escalations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM transactions t
    WHERE t.id = escalations.transaction_id 
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);

CREATE POLICY "Transaction participants can create escalations"
ON public.escalations
FOR INSERT
WITH CHECK (
  auth.uid() = escalated_by 
  AND EXISTS (
    SELECT 1 FROM transactions t
    WHERE t.id = escalations.transaction_id 
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);

CREATE POLICY "Support staff can view and manage all escalations"
ON public.escalations
FOR ALL
USING (true); -- Customer care staff should have full access

-- Add trigger for updating updated_at timestamp
CREATE TRIGGER update_escalations_updated_at
BEFORE UPDATE ON public.escalations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for escalation evidence if it doesn't exist
INSERT INTO storage.buckets (id, name, public) VALUES ('escalation-evidence', 'escalation-evidence', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for escalation evidence
CREATE POLICY "Users can view their escalation evidence"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'escalation-evidence' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can upload their escalation evidence"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'escalation-evidence' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Support can view all escalation evidence"
ON storage.objects
FOR SELECT
USING (bucket_id = 'escalation-evidence');