import { supabase } from '@/integrations/supabase/client';

export interface ContractTemplate {
  id: string;
  type: 'master_goods' | 'master_services';
  category: 'goods' | 'services';
  version: number;
  title: string;
  content: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContractAnnexure {
  id: string;
  master_template_id: string;
  industry_id: string;
  annexure_code: string;
  title: string;
  description?: string;
  content: string;
  required_fields?: Record<string, any>;
  evidence_requirements?: Record<string, any>;
  inspection_window_hours?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FieldMapping {
  id: string;
  annexure_id: string;
  field_name: string;
  field_type: 'AUTO-FETCHED' | 'SELLER-INPUT' | 'BUYER-INPUT' | 'PLATFORM-DEFAULT';
  source?: string;
  data_type?: string;
  is_mandatory: boolean;
  placeholder_text?: string;
}

export interface GeneratedContract {
  id: string;
  transaction_id: string;
  master_template_id: string;
  annexure_id?: string;
  seller_id?: string;
  buyer_id?: string;
  contract_content: string;
  contract_summary?: string;
  status: 'draft' | 'accepted' | 'executed' | 'disputed' | 'completed';
  seller_accepted_at?: string;
  buyer_accepted_at?: string;
  accepted_metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch master contract template by type
 */
export const getMasterTemplate = async (type: 'master_goods' | 'master_services'): Promise<ContractTemplate | null> => {
  try {
    console.log(`📋 Fetching master template: ${type}`);
    
    const { data, error } = await supabase
      .from('contract_templates')
      .select('*')
      .eq('type', type)
      .eq('is_active', true)
      .order('version', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('❌ Error fetching master template:', error);
      return null;
    }

    console.log('✅ Master template fetched:', data.title);
    return data;
  } catch (err) {
    console.error('❌ Exception in getMasterTemplate:', err);
    return null;
  }
};

/**
 * Fetch annexure by industry_id and master_template_id
 */
export const getAnnexureByIndustry = async (
  master_template_id: string,
  industry_id: string
): Promise<ContractAnnexure | null> => {
  try {
    console.log(`📎 Fetching annexure: ${industry_id} for master ${master_template_id}`);
    
    const { data, error } = await supabase
      .from('contract_annexures')
      .select('*')
      .eq('master_template_id', master_template_id)
      .eq('industry_id', industry_id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('❌ Error fetching annexure:', error);
      return null;
    }

    console.log('✅ Annexure fetched:', data.title);
    return data;
  } catch (err) {
    console.error('❌ Exception in getAnnexureByIndustry:', err);
    return null;
  }
};

/**
 * Fetch all annexures for a master template
 */
export const getAllAnnexures = async (master_template_id: string): Promise<ContractAnnexure[]> => {
  try {
    console.log(`📚 Fetching all annexures for master ${master_template_id}`);
    
    const { data, error } = await supabase
      .from('contract_annexures')
      .select('*')
      .eq('master_template_id', master_template_id)
      .eq('is_active', true)
      .order('annexure_code', { ascending: true });

    if (error) {
      console.error('❌ Error fetching annexures:', error);
      return [];
    }

    console.log(`✅ Fetched ${data.length} annexures`);
    return data;
  } catch (err) {
    console.error('❌ Exception in getAllAnnexures:', err);
    return [];
  }
};

/**
 * Fetch field mappings for an annexure
 */
export const getFieldMappings = async (annexure_id: string): Promise<FieldMapping[]> => {
  try {
    const { data, error } = await supabase
      .from('contract_field_mappings')
      .select('*')
      .eq('annexure_id', annexure_id)
      .order('field_name', { ascending: true });

    if (error) {
      console.error('❌ Error fetching field mappings:', error);
      return [];
    }

    return data;
  } catch (err) {
    console.error('❌ Exception in getFieldMappings:', err);
    return [];
  }
};

/**
 * Save generated contract to database for audit trail
 */
export const saveGeneratedContract = async (
  contractData: Omit<GeneratedContract, 'id' | 'created_at' | 'updated_at'>
): Promise<GeneratedContract | null> => {
  try {
    console.log('💾 Saving generated contract for transaction:', contractData.transaction_id);
    
    const { data, error } = await supabase
      .from('generated_contracts')
      .insert([contractData])
      .select()
      .single();

    if (error) {
      console.error('❌ Error saving contract:', error);
      return null;
    }

    console.log('✅ Contract saved with ID:', data.id);
    return data;
  } catch (err) {
    console.error('❌ Exception in saveGeneratedContract:', err);
    return null;
  }
};

/**
 * Fetch generated contract by transaction ID
 */
export const getGeneratedContract = async (transaction_id: string): Promise<GeneratedContract | null> => {
  try {
    const { data, error } = await supabase
      .from('generated_contracts')
      .select('*')
      .eq('transaction_id', transaction_id)
      .single();

    if (error) {
      console.error('❌ Error fetching generated contract:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('❌ Exception in getGeneratedContract:', err);
    return null;
  }
};

/**
 * Update contract acceptance status
 */
export const updateContractAcceptance = async (
  contract_id: string,
  party: 'seller' | 'buyer',
  metadata?: Record<string, any>
): Promise<boolean> => {
  try {
    const updateData: Record<string, any> = {
      [`${party}_accepted_at`]: new Date().toISOString(),
      [`accepted_metadata`]: metadata || {}
    };

    const { error } = await supabase
      .from('generated_contracts')
      .update(updateData)
      .eq('id', contract_id);

    if (error) {
      console.error(`❌ Error updating ${party} acceptance:`, error);
      return false;
    }

    console.log(`✅ ${party} acceptance recorded for contract ${contract_id}`);
    return true;
  } catch (err) {
    console.error('❌ Exception in updateContractAcceptance:', err);
    return false;
  }
};

/**
 * Get combined Master + Annexure content
 */
export const getCombinedContractContent = async (
  master_template: ContractTemplate,
  annexure: ContractAnnexure
): Promise<string> => {
  console.log(`📄 Combining Master (${master_template.id}) + Annexure (${annexure.id})`);
  
  const combinedContent = `
${master_template.content}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${annexure.content}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

  return combinedContent;
};

/**
 * Populate contract placeholders with actual data
 */
export const populateContractPlaceholders = (
  content: string,
  replacements: Record<string, any>
): string => {
  let populatedContent = content;

  Object.entries(replacements).forEach(([key, value]) => {
    const pattern = new RegExp(`{{${key}}}`, 'g');
    populatedContent = populatedContent.replace(pattern, String(value || ''));
  });

  return populatedContent;
};
