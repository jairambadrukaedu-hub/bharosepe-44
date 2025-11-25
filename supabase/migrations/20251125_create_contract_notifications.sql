-- Create contract_notifications table for tracking sent contracts
CREATE TABLE IF NOT EXISTS contract_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id VARCHAR(255) NOT NULL,
  transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_email VARCHAR(255),
  status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('sent', 'viewed', 'accepted', 'rejected')),
  contract_content TEXT,
  contract_summary TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  viewed_at TIMESTAMP WITH TIME ZONE,
  responded_at TIMESTAMP WITH TIME ZONE,
  response_status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_contract_notifications_transaction_id ON contract_notifications(transaction_id);
CREATE INDEX idx_contract_notifications_sender_id ON contract_notifications(sender_id);
CREATE INDEX idx_contract_notifications_recipient_id ON contract_notifications(recipient_id);
CREATE INDEX idx_contract_notifications_contract_id ON contract_notifications(contract_id);
CREATE INDEX idx_contract_notifications_status ON contract_notifications(status);

-- Enable RLS (Row Level Security)
ALTER TABLE contract_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view notifications they sent or received
CREATE POLICY "Users can view their contract notifications"
  ON contract_notifications
  FOR SELECT
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

-- RLS Policy: Users can insert notifications (when they send contracts)
CREATE POLICY "Users can send contract notifications"
  ON contract_notifications
  FOR INSERT
  WITH CHECK (sender_id = auth.uid());

-- RLS Policy: Users can update notifications they received
CREATE POLICY "Users can update received notifications"
  ON contract_notifications
  FOR UPDATE
  USING (recipient_id = auth.uid());
