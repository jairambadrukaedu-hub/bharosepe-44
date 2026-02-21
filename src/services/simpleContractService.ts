/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SIMPLE CONTRACT SERVICE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Handles simplified contract generation with minimal essential fields.
 * Used for quick contract creation without full form submission.
 */

import { supabase } from '@/integrations/supabase/client';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

export type ContractType = 'goods' | 'services';

export interface SimpleContractParty {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface SimpleContractData {
  // Basic transaction info
  contractType: ContractType;
  industryId: string;
  title: string; // Product/Service name
  description: string;
  
  // Party details
  seller: SimpleContractParty;
  buyer: SimpleContractParty;
  
  // Pricing & terms
  price: number;
  currency?: string; // Default: INR
  paymentTerms: string; // e.g., "Full payment upfront", "50% on order, 50% on delivery"
  deliveryDate?: string; // YYYY-MM-DD format
  
  // Additional details
  conditions?: string; // Product condition for goods, service scope for services
  warranty?: string; // Warranty details if applicable
  additionalTerms?: string; // Any custom terms
  
  // Metadata
  createdAt?: string;
  updatedAt?: string;
}

export interface GeneratedSimpleContract {
  id: string;
  contractHTML: string;
  contractText: string;
  contractData: SimpleContractData;
  status: 'draft' | 'signed' | 'executed';
  createdAt: string;
  signedAt?: string;
  sellerSignature?: string;
  buyerSignature?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SIMPLE CONTRACT TEMPLATES
// ═══════════════════════════════════════════════════════════════════════════════

const SIMPLE_GOODS_CONTRACT_TEMPLATE = (data: SimpleContractData): string => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 20px;">
    
    <h1 style="text-align: center; text-decoration: underline;">GOODS PURCHASE AGREEMENT</h1>
    
    <p style="text-align: center; color: #666;">Date: ${new Date().toLocaleDateString('en-IN')}</p>
    
    <hr style="border: 1px solid #ddd; margin: 20px 0;">
    
    <!-- GOODS DESCRIPTION -->
    <h2>1. DESCRIPTION OF GOODS</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Item Name</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">${data.title}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Description</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">${data.description}</td>
      </tr>
      <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Condition</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">${data.conditions || 'As described'}</td>
      </tr>
    </table>
    
    <!-- PRICE & PAYMENT -->
    <h2>2. PRICE & PAYMENT TERMS</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Total Price</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">₹ ${data.price.toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Currency</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">${data.currency || 'INR (Indian Rupees)'}</td>
      </tr>
      <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Payment Terms</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">${data.paymentTerms}</td>
      </tr>
    </table>
    
    <!-- DELIVERY -->
    <h2>3. DELIVERY DETAILS</h2>
    
    <p>
      <strong>Delivery Address:</strong><br>
      ${data.seller.address || 'Not specified'}
    </p>
    
    <p>
      <strong>Delivery Date:</strong> ${data.deliveryDate || 'as per mutual agreement'}
    </p>
    
    <!-- WARRANTY -->
    ${
      data.warranty
        ? `
      <h2>4. WARRANTY & GUARANTEES</h2>
      <p>${data.warranty}</p>
      `
        : ''
    }
    
    <!-- INSPECTION & ACCEPTANCE -->
    <h2>${data.warranty ? '5' : '4'}. INSPECTION & ACCEPTANCE</h2>
    
    <ul>
      <li>The Buyer has the right to inspect the goods before accepting the delivery.</li>
      <li>Goods must match the description and condition as specified in Section 1.</li>
      <li>Any defects or discrepancies must be reported within 48 hours of delivery.</li>
      <li>The Seller shall provide remedies for defective goods (repair, replacement, or refund).</li>
    </ul>
    
    <!-- DISPUTE RESOLUTION -->
    <h2>${data.warranty ? '6' : '5'}. DISPUTE RESOLUTION</h2>
    
    <p>
      In case of any dispute regarding this agreement:
    </p>
    <ol>
      <li>Both parties shall attempt to resolve the issue through mutual discussion.</li>
      <li>If unresolved, disputes may be escalated to local mediation or arbitration.</li>
      <li>This agreement shall be governed by the laws of India.</li>
    </ol>
    
    <!-- ADDITIONAL TERMS -->
    ${
      data.additionalTerms
        ? `
      <h2>${data.warranty ? '7' : '6'}. ADDITIONAL TERMS & CONDITIONS</h2>
      <p>${data.additionalTerms}</p>
      `
        : ''
    }
    
    <!-- SIGNATURES -->
    <h2>${data.warranty && data.additionalTerms ? '8' : data.warranty || data.additionalTerms ? '7' : '6'}. SIGNATURES</h2>
    
    <table style="width: 100%; margin-top: 40px;">
      <tr>
        <td style="width: 50%; text-align: center; border-top: 1px solid #000; padding-top: 20px;">
          <strong>SELLER</strong><br>
          <br>
          Date: ___________<br>
          Signature: ___________
        </td>
        <td style="width: 50%; text-align: center; border-top: 1px solid #000; padding-top: 20px;">
          <strong>BUYER</strong><br>
          <br>
          Date: ___________<br>
          Signature: ___________
        </td>
      </tr>
    </table>
    
    <p style="text-align: center; margin-top: 40px; color: #999; font-size: 12px;">
      Generated on ${new Date().toLocaleString('en-IN')} | This is a legally binding agreement
    </p>
    
  </div>
`;

const SIMPLE_SERVICES_CONTRACT_TEMPLATE = (data: SimpleContractData): string => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 20px;">
    
    <h1 style="text-align: center; text-decoration: underline;">SERVICE AGREEMENT</h1>
    
    <p style="text-align: center; color: #666;">Date: ${new Date().toLocaleDateString('en-IN')}</p>
    
    <hr style="border: 1px solid #ddd; margin: 20px 0;">
    
    <!-- SERVICE DESCRIPTION -->
    <h2>1. SCOPE OF SERVICES</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Service Name</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">${data.title}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Service Description</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">${data.description}</td>
      </tr>
      <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Service Scope & Deliverables</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">${data.conditions || 'As per mutual agreement'}</td>
      </tr>
    </table>
    
    <!-- PRICING & PAYMENT -->
    <h2>2. PRICING & PAYMENT TERMS</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Service Fee</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">₹ ${data.price.toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Currency</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">${data.currency || 'INR (Indian Rupees)'}</td>
      </tr>
      <tr style="background: #f0f0f0;">
        <td style="border: 1px solid #ddd; padding: 10px;"><strong>Payment Terms</strong></td>
        <td style="border: 1px solid #ddd; padding: 10px;">${data.paymentTerms}</td>
      </tr>
    </table>
    
    <!-- SERVICE DELIVERY & TIMELINE -->
    <h2>3. SERVICE DELIVERY & TIMELINE</h2>
    
    <p>
      The service shall be completed on or before <strong>${data.deliveryDate || 'as per mutual agreement'}</strong>.
    </p>
    
    ${
      data.seller.address
        ? `
      <p>
        <strong>Service Location/Address:</strong><br>
        ${data.seller.address}
      </p>
      `
        : ''
    }
    
    <!-- QUALITY & WARRANTY -->
    ${
      data.warranty
        ? `
      <h2>4. QUALITY ASSURANCE & GUARANTEES</h2>
      <p>${data.warranty}</p>
      `
        : ''
    }
    
    <!-- ACCEPTANCE & SIGN-OFF -->
    <h2>${data.warranty ? '5' : '4'}. ACCEPTANCE & SIGN-OFF</h2>
    
    <ul>
      <li>The Client has the right to review the deliverables before final acceptance.</li>
      <li>Deliverables must match the scope and quality as specified in Section 1.</li>
      <li>Any issues or revisions must be communicated within 5 business days of delivery.</li>
      <li>The Service Provider shall address reasonable revision requests at no additional cost.</li>
    </ul>
    
    <!-- TERMINATION & CANCELLATION -->
    <h2>${data.warranty ? '6' : '5'}. TERMINATION & CANCELLATION</h2>
    
    <p>
      Either party may terminate this agreement with written notice:
    </p>
    <ul>
      <li><strong>Before Start Date:</strong> Full refund of payment</li>
      <li><strong>During Service:</strong> Pro-rata refund based on work completed</li>
      <li><strong>After Completion:</strong> No refund (service provided)</li>
    </ul>
    
    <!-- DISPUTE RESOLUTION -->
    <h2>${data.warranty ? '7' : '6'}. DISPUTE RESOLUTION</h2>
    
    <p>
      In case of any dispute regarding this agreement:
    </p>
    <ol>
      <li>Both parties shall attempt to resolve the issue through mutual discussion.</li>
      <li>If unresolved, disputes may be escalated to local mediation or arbitration.</li>
      <li>This agreement shall be governed by the laws of India.</li>
    </ol>
    
    <!-- ADDITIONAL TERMS -->
    ${
      data.additionalTerms
        ? `
      <h2>${data.warranty ? '8' : '7'}. ADDITIONAL TERMS & CONDITIONS</h2>
      <p>${data.additionalTerms}</p>
      `
        : ''
    }
    
    <!-- SIGNATURES -->
    <h2>${data.warranty && data.additionalTerms ? '9' : data.warranty || data.additionalTerms ? '8' : '7'}. SIGNATURES</h2>
    
    <table style="width: 100%; margin-top: 40px;">
      <tr>
        <td style="width: 50%; text-align: center; border-top: 1px solid #000; padding-top: 20px;">
          <strong>SERVICE PROVIDER</strong><br>
          <br>
          Date: ___________<br>
          Signature: ___________
        </td>
        <td style="width: 50%; text-align: center; border-top: 1px solid #000; padding-top: 20px;">
          <strong>CLIENT</strong><br>
          <br>
          Date: ___________<br>
          Signature: ___________
        </td>
      </tr>
    </table>
    
    <p style="text-align: center; margin-top: 40px; color: #999; font-size: 12px;">
      Generated on ${new Date().toLocaleString('en-IN')} | This is a legally binding agreement
    </p>
    
  </div>
`;

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generate a simple contract HTML based on contract type
 */
export const generateSimpleContractHTML = (data: SimpleContractData): string => {
  if (data.contractType === 'goods') {
    return SIMPLE_GOODS_CONTRACT_TEMPLATE(data);
  } else {
    return SIMPLE_SERVICES_CONTRACT_TEMPLATE(data);
  }
};

/**
 * Create simple contract text version (for storage/export)
 */
export const generateSimpleContractText = (data: SimpleContractData): string => {
  const type = data.contractType === 'goods' ? 'GOODS PURCHASE AGREEMENT' : 'SERVICE AGREEMENT';
  
  return `
${type}
Date: ${new Date().toLocaleDateString('en-IN')}

1. ${data.contractType === 'goods' ? 'DESCRIPTION OF GOODS' : 'SCOPE OF SERVICES'}

Item/Service Name: ${data.title}
Description: ${data.description}
${data.contractType === 'goods' ? 'Condition' : 'Service Scope'}: ${data.conditions || 'As per mutual agreement'}

2. PRICING & PAYMENT

Total ${data.contractType === 'goods' ? 'Price' : 'Fee'}: ₹ ${data.price.toLocaleString('en-IN')}
Currency: ${data.currency || 'INR'}
Payment Terms: ${data.paymentTerms}

3. ${data.contractType === 'goods' ? 'DELIVERY' : 'SERVICE DELIVERY'}

Delivery/Completion Date: ${data.deliveryDate || 'As per mutual agreement'}
${data.seller.address ? `Service/Delivery Address: ${data.seller.address}` : ''}

${data.warranty ? `4. WARRANTY\n${data.warranty}\n` : ''}

${
  data.contractType === 'goods'
    ? `${data.warranty ? '5' : '4'}. INSPECTION & ACCEPTANCE
- Buyer has the right to inspect goods before accepting delivery
- Goods must match the description and condition specified
- Defects must be reported within 48 hours of delivery
- Seller shall provide remedies for defective goods`
    : `${data.warranty ? '5' : '4'}. ACCEPTANCE & SIGN-OFF
- Client has the right to review deliverables before final acceptance
- Deliverables must match the scope and quality specified
- Issues must be reported within 5 business days of delivery
- Service Provider shall address reasonable revisions at no additional cost`
}

${data.warranty ? `${data.contractType === 'goods' ? '6' : '6'}. DISPUTE RESOLUTION` : `${data.contractType === 'goods' ? '5' : '5'}. DISPUTE RESOLUTION`}

In case of any dispute:
1. Both parties shall attempt to resolve through mutual discussion
2. If unresolved, disputes may be escalated to local mediation or arbitration
3. This agreement is governed by the laws of India

${data.additionalTerms ? `${data.warranty ? data.contractType === 'goods' ? '7' : '7' : data.contractType === 'goods' ? '6' : '6'}. ADDITIONAL TERMS\n${data.additionalTerms}\n` : ''}

SIGNATURES

${data.contractType === 'goods' ? 'SELLER' : 'SERVICE PROVIDER'}:
Date: ___________
Signature: ___________

${data.contractType === 'goods' ? 'BUYER' : 'CLIENT'}:
Date: ___________
Signature: ___________

Generated on ${new Date().toLocaleString('en-IN')} | This is a legally binding agreement
  `.trim();
};

/**
 * Save simple contract to database
 */
export const saveSimpleContract = async (
  data: SimpleContractData,
  contractHTML: string,
  contractText: string
): Promise<GeneratedSimpleContract | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const contractId = `simple_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const { data: savedData, error } = await supabase
      .from('simple_contracts')
      .insert([
        {
          id: contractId,
          user_id: user.id,
          contract_type: data.contractType,
          industry_id: data.industryId,
          contract_title: data.title,
          contract_html: contractHTML,
          contract_text: contractText,
          contract_data: data,
          status: 'draft',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error saving simple contract:', error);
      return null;
    }

    return {
      id: savedData.id,
      contractHTML: savedData.contract_html,
      contractText: savedData.contract_text,
      contractData: savedData.contract_data,
      status: savedData.status,
      createdAt: savedData.created_at,
    };
  } catch (error) {
    console.error('Exception in saveSimpleContract:', error);
    return null;
  }
};

/**
 * Get simple contract by ID
 */
export const getSimpleContractById = async (contractId: string): Promise<GeneratedSimpleContract | null> => {
  try {
    const { data, error } = await supabase
      .from('simple_contracts')
      .select('*')
      .eq('id', contractId)
      .single();

    if (error) {
      console.error('Error fetching simple contract:', error);
      return null;
    }

    return {
      id: data.id,
      contractHTML: data.contract_html,
      contractText: data.contract_text,
      contractData: data.contract_data,
      status: data.status,
      createdAt: data.created_at,
      signedAt: data.signed_at,
    };
  } catch (error) {
    console.error('Exception in getSimpleContractById:', error);
    return null;
  }
};

/**
 * Get all simple contracts for current user
 */
export const getUserSimpleContracts = async (contractType?: ContractType): Promise<GeneratedSimpleContract[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    let query = supabase
      .from('simple_contracts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (contractType) {
      query = query.eq('contract_type', contractType);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching user simple contracts:', error);
      return [];
    }

    return data.map((contract) => ({
      id: contract.id,
      contractHTML: contract.contract_html,
      contractText: contract.contract_text,
      contractData: contract.contract_data,
      status: contract.status,
      createdAt: contract.created_at,
      signedAt: contract.signed_at,
    }));
  } catch (error) {
    console.error('Exception in getUserSimpleContracts:', error);
    return [];
  }
};

/**
 * Update contract status
 */
export const updateSimpleContractStatus = async (
  contractId: string,
  status: 'draft' | 'signed' | 'executed'
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('simple_contracts')
      .update({
        status,
        ...(status === 'signed' && { signed_at: new Date().toISOString() }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', contractId);

    if (error) {
      console.error('Error updating contract status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Exception in updateSimpleContractStatus:', error);
    return false;
  }
};

/**
 * Delete simple contract
 */
export const deleteSimpleContract = async (contractId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('simple_contracts')
      .delete()
      .eq('id', contractId);

    if (error) {
      console.error('Error deleting simple contract:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Exception in deleteSimpleContract:', error);
    return false;
  }
};

export default {
  generateSimpleContractHTML,
  generateSimpleContractText,
  saveSimpleContract,
  getSimpleContractById,
  getUserSimpleContracts,
  updateSimpleContractStatus,
  deleteSimpleContract,
};
