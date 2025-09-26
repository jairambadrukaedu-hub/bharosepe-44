-- Create dispute_proposals table
CREATE TABLE public.dispute_proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dispute_id UUID NOT NULL,
  proposed_by UUID NOT NULL,
  proposal_type TEXT NOT NULL CHECK (proposal_type IN ('release_full', 'release_partial', 'refund_full', 'refund_partial')),
  amount NUMERIC,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  responded_by UUID,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.dispute_proposals ENABLE ROW LEVEL SECURITY;

-- Create policies for dispute_proposals
CREATE POLICY "Dispute participants can view proposals"
ON public.dispute_proposals
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM disputes d
    JOIN transactions t ON d.transaction_id = t.id
    WHERE d.id = dispute_proposals.dispute_id
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);

CREATE POLICY "Dispute participants can create proposals"
ON public.dispute_proposals
FOR INSERT
WITH CHECK (
  auth.uid() = proposed_by
  AND EXISTS (
    SELECT 1 FROM disputes d
    JOIN transactions t ON d.transaction_id = t.id
    WHERE d.id = dispute_proposals.dispute_id
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);

CREATE POLICY "Dispute participants can respond to proposals"
ON public.dispute_proposals
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM disputes d
    JOIN transactions t ON d.transaction_id = t.id
    WHERE d.id = dispute_proposals.dispute_id
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_dispute_proposals_updated_at
BEFORE UPDATE ON public.dispute_proposals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();