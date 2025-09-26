-- Create dispute_messages table for real-time dispute chat
CREATE TABLE public.dispute_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dispute_id UUID NOT NULL,
  sender_id UUID NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'file', 'image')),
  file_url TEXT,
  file_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.dispute_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for dispute participants to view messages
CREATE POLICY "Dispute participants can view messages" 
ON public.dispute_messages 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM disputes d
  JOIN transactions t ON d.transaction_id = t.id
  WHERE d.id = dispute_messages.dispute_id 
  AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
));

-- Create policy for dispute participants to send messages
CREATE POLICY "Dispute participants can send messages" 
ON public.dispute_messages 
FOR INSERT 
WITH CHECK (
  auth.uid() = sender_id 
  AND EXISTS (
    SELECT 1 FROM disputes d
    JOIN transactions t ON d.transaction_id = t.id
    WHERE d.id = dispute_messages.dispute_id 
    AND (t.buyer_id = auth.uid() OR t.seller_id = auth.uid())
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_dispute_messages_updated_at
BEFORE UPDATE ON public.dispute_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for dispute chat attachments
INSERT INTO storage.buckets (id, name, public) 
VALUES ('dispute-chat', 'dispute-chat', false)
ON CONFLICT (id) DO NOTHING;

-- Create policies for dispute chat file uploads
CREATE POLICY "Dispute participants can upload chat files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'dispute-chat' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Dispute participants can view chat files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'dispute-chat');

-- Enable realtime for dispute messages
ALTER TABLE public.dispute_messages REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.dispute_messages;