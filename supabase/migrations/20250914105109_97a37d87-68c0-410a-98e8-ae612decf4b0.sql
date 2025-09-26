-- Create notifications table for contract notifications
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('contract_received', 'contract_accepted', 'contract_rejected', 'contract_updated')),
  title text NOT NULL,
  message text NOT NULL,
  contract_id uuid REFERENCES public.contracts(id) ON DELETE CASCADE,
  transaction_id uuid REFERENCES public.transactions(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  read boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON public.notifications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON public.notifications
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON public.notifications
  FOR INSERT
  WITH CHECK (true);

-- Add recipient fields to contracts table
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS recipient_id uuid REFERENCES auth.users(id);
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS response_message text;
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS responded_at timestamp with time zone;

-- Update contract status to include more states
ALTER TABLE public.contracts DROP CONSTRAINT IF EXISTS contracts_status_check;
ALTER TABLE public.contracts ADD CONSTRAINT contracts_status_check 
  CHECK (status IN ('draft', 'sent', 'pending', 'accepted', 'rejected', 'active', 'completed'));

-- Create RLS policy for recipients to view contracts sent to them
CREATE POLICY "Recipients can view contracts sent to them"
  ON public.contracts
  FOR SELECT
  USING (auth.uid() = recipient_id);

-- Create RLS policy for recipients to update contracts sent to them (accept/reject)
CREATE POLICY "Recipients can respond to contracts sent to them"
  ON public.contracts
  FOR UPDATE
  USING (auth.uid() = recipient_id);

-- Create trigger for updating notifications timestamps
CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for notifications
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;