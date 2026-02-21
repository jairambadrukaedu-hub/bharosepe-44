import { supabase } from '@/integrations/supabase/client';

export interface FormDataEntry {
  id: string;
  form_data: any;
  product_name: string;
  sale_price: number;
  industry: string;
  annexure_code: string;
  created_at: string;
}

export interface ContractParty {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  role: 'buyer' | 'seller';
}

export interface ContractGenerationRequest {
  formDataId: string;
  buyer: ContractParty;
  seller: ContractParty;
  masterContractTemplateId?: string;
}

class ContractGenerationService {
  
  /**
   * Step 1: Get all saved form data for the current user
   */
  async getUserFormData(industry?: string, annexure?: string): Promise<FormDataEntry[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      let query = supabase
        .from('form_submissions')
        .select('*')
        .eq('user_id', user.id)
        .eq('form_status', 'completed')
        .order('created_at', { ascending: false });

      if (industry) {
        query = query.eq('industry_category', industry);
      }
      
      if (annexure) {
        query = query.eq('annexure_code', annexure);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching form data:', error);
        throw error;
      }

      // Transform to match FormDataEntry interface
      return (data || []).map(item => ({
        id: item.id.toString(),
        form_data: {
          // Combine all JSONB fields for complete form data
          ...item.technical_specs,
          ...item.identification_data,
          ...item.condition_data,
          ...item.functionality_data,
          ...item.measurements,
          ...item.material_data,
          ...item.accessories_data,
          ...item.warranty_legal_data,
          ...item.category_specific_data,
          // Include basic fields
          product_name: item.product_name,
          brand: item.brand,
          model: item.model,
          description: item.description,
          price: item.price,
        },
        product_name: item.product_name || 'Unknown Product',
        sale_price: item.price || 0,
        industry: item.industry_category,
        annexure_code: item.annexure_code,
        created_at: item.created_at,
      }));
    } catch (error) {
      console.error('Error in getUserFormData:', error);
      throw error;
    }
  }

  /**
   * Step 2: Get user's contacts (potential buyers/sellers)
   */
  async getUserContacts(): Promise<ContractParty[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // This would typically come from a contacts table
      // For now, we'll return the user as a potential party
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profile) return [];

      return [{
        id: profile.id,
        full_name: profile.full_name || profile.email || 'Unknown User',
        email: profile.email || user.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        role: 'seller' // Default role
      }];
    } catch (error) {
      console.error('Error in getUserContacts:', error);
      return [];
    }
  }

  /**
   * Step 3: Get master contract template based on industry
   */
  async getMasterContractTemplate(industry: string, annexure?: string) {
    try {
      let query = supabase
        .from('contract_templates')
        .select('*')
        .eq('category', industry)
        .eq('is_active', true);

      if (annexure) {
        query = query.eq('annexure_code', annexure);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching contract template:', error);
        throw error;
      }

      return data?.[0] || null;
    } catch (error) {
      console.error('Error in getMasterContractTemplate:', error);
      return null;
    }
  }

  /**
   * Step 4: Generate contract by combining template + form data
   */
  async generateContract(request: ContractGenerationRequest): Promise<string> {
    try {
      // Get the saved form data
      const { data: formDataEntry, error: formError } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('id', parseInt(request.formDataId))
        .single();

      if (formError || !formDataEntry) {
        throw new Error('Form data not found');
      }

      // Get the master contract template
      const template = await this.getMasterContractTemplate(
        formDataEntry.industry_category, 
        formDataEntry.annexure_code
      );

      if (!template) {
        throw new Error(`No template found for ${formDataEntry.industry_category} annexure ${formDataEntry.annexure_code}`);
      }

      // Combine all form data from JSONB fields
      const completeFormData = {
        ...formDataEntry.technical_specs,
        ...formDataEntry.identification_data,
        ...formDataEntry.condition_data,
        ...formDataEntry.functionality_data,
        ...formDataEntry.measurements,
        ...formDataEntry.material_data,
        ...formDataEntry.accessories_data,
        ...formDataEntry.warranty_legal_data,
        ...formDataEntry.category_specific_data,
        // Include basic fields
        product_name: formDataEntry.product_name,
        brand: formDataEntry.brand,
        model: formDataEntry.model,
        description: formDataEntry.description,
        price: formDataEntry.price,
        delivery_mode: formDataEntry.delivery_mode,
      };

      // Generate contract by merging template with form data
      const contractContent = this.mergeTemplateWithFormData(
        template.template_content,
        completeFormData,
        request.buyer,
        request.seller
      );

      // Create the contract in database
      const contractId = await this.createContractFromFormData(
        request.formDataId,
        request.buyer.id,
        request.seller.id
      );

      // Update the contract with generated content
      await supabase
        .from('contracts')
        .update({
          contract_content: contractContent,
          terms: `Generated contract for ${formDataEntry.industry} product using annexure ${formDataEntry.annexure_code}`
        })
        .eq('id', contractId);

      return contractContent;
    } catch (error) {
      console.error('Error in generateContract:', error);
      throw error;
    }
  }

  /**
   * Merge template placeholders with actual form data
   */
  private mergeTemplateWithFormData(
    template: string, 
    formData: any, 
    buyer: ContractParty, 
    seller: ContractParty
  ): string {
    let contract = template;

    // Replace buyer information
    contract = contract.replace(/\{buyer\.name\}/g, buyer.full_name);
    contract = contract.replace(/\{buyer\.email\}/g, buyer.email);
    contract = contract.replace(/\{buyer\.phone\}/g, buyer.phone);
    contract = contract.replace(/\{buyer\.address\}/g, buyer.address);

    // Replace seller information
    contract = contract.replace(/\{seller\.name\}/g, seller.full_name);
    contract = contract.replace(/\{seller\.email\}/g, seller.email);
    contract = contract.replace(/\{seller\.phone\}/g, seller.phone);
    contract = contract.replace(/\{seller\.address\}/g, seller.address);

    // Replace form data fields
    Object.keys(formData).forEach(key => {
      const placeholder = new RegExp(`\\{${key}\\}`, 'g');
      contract = contract.replace(placeholder, formData[key] || '');
    });

    // Add current date
    contract = contract.replace(/\{current_date\}/g, new Date().toLocaleDateString());

    return contract;
  }

  /**
   * Create contract using the stored procedure
   */
  private async createContractFromFormData(
    formDataId: string,
    buyerId: string,
    sellerId: string
  ): Promise<string> {
    const { data, error } = await supabase
      .rpc('create_contract_from_form_data', {
        p_form_data_id: formDataId,
        p_buyer_id: buyerId,
        p_seller_id: sellerId
      });

    if (error) {
      console.error('Error creating contract:', error);
      throw error;
    }

    return data;
  }

  /**
   * Get all contracts for the current user
   */
  async getUserContracts(): Promise<any[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          transactions:transaction_id (*)
        `)
        .or(`transactions.buyer_id.eq.${user.id},transactions.seller_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contracts:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserContracts:', error);
      return [];
    }
  }
}

export const contractGenerationService = new ContractGenerationService();
export { ContractGenerationService };