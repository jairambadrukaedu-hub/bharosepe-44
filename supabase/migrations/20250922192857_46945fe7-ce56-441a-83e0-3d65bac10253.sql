-- Add fields for contract revision functionality
ALTER TABLE public.contracts 
ADD COLUMN parent_contract_id uuid,
ADD COLUMN revision_number integer DEFAULT 1,
ADD COLUMN is_active boolean DEFAULT true;

-- Add foreign key for parent contract relationship
ALTER TABLE public.contracts 
ADD CONSTRAINT fk_parent_contract 
FOREIGN KEY (parent_contract_id) REFERENCES public.contracts(id);

-- Add index for better query performance
CREATE INDEX idx_contracts_parent_id ON public.contracts(parent_contract_id);
CREATE INDEX idx_contracts_active ON public.contracts(is_active) WHERE is_active = true;

-- Add check constraint to ensure revision numbers are positive
ALTER TABLE public.contracts 
ADD CONSTRAINT chk_revision_number_positive 
CHECK (revision_number > 0);

-- Create function to handle contract revision
CREATE OR REPLACE FUNCTION handle_contract_revision()
RETURNS TRIGGER AS $$
BEGIN
  -- If this is a revision (has parent_contract_id), mark all previous versions as inactive
  IF NEW.parent_contract_id IS NOT NULL THEN
    UPDATE public.contracts 
    SET is_active = false 
    WHERE (id = NEW.parent_contract_id OR parent_contract_id = NEW.parent_contract_id)
    AND id != NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for contract revision handling
CREATE TRIGGER trigger_handle_contract_revision
  AFTER INSERT ON public.contracts
  FOR EACH ROW
  EXECUTE FUNCTION handle_contract_revision();