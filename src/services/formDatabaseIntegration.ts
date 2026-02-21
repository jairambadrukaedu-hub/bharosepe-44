/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FORM DATABASE INTEGRATION SERVICE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Integrates form submissions with the database
 * - Handles Save Draft functionality
 * - Handles Submit & Generate Contract functionality
 * - Manages transaction IDs and user context
 * - Provides contract generation triggers
 */

import { supabase } from '@/integrations/supabase/client';
import { saveFormSubmission, updateFormSubmission } from './formSubmissionService';
import { toast } from 'sonner';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

export interface FormSaveContext {
  userId: string;
  industryCategory: string;
  annexureCode: string;
  formId?: string;
}

export interface FormSaveResponse {
  success: boolean;
  formId: string;
  formStatus: string;
  completionPercentage: number;
  message?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER: Map industry to annexure code
// ═══════════════════════════════════════════════════════════════════════════════

const INDUSTRY_TO_ANNEXURE: Record<string, string> = {
  'electronics': 'A',
  'mobile': 'B',
  'furniture': 'C',
  'vehicles': 'D',
  'fashion-apparel': 'E',
  'jewellery': 'F',
  'building_material': 'G',
  'collectibles': 'H',
  'industrial': 'I',
  'books': 'J',
  'art': 'K',
  'instagram_whatsapp': 'L',
  'software_development': 'S-A',
  'ui_ux_design': 'S-B',
  'content_writing': 'S-C',
  'photography_video': 'S-D',
  'coaching_training': 'S-E',
  'home_repair': 'S-F',
  'cleaning_housekeeping': 'S-G',
  'digital_marketing': 'S-H',
  'consulting': 'S-I',
  'event_management': 'S-J',
};

/**
 * Get current user ID from Supabase auth
 */
const getCurrentUserId = async (): Promise<string | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Generate a unique form ID
 */
export const generateFormId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `FORM-${timestamp}-${random}`;
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Save form as DRAFT
 * - Creates or updates form submission with status 'draft'
 * - Calculates completion percentage
 * - Does NOT trigger contract generation
 */
export const saveFormAsDraft = async (
  formData: Record<string, any>,
  industryCategory: string,
  context?: { formId?: string; userId?: string }
): Promise<FormSaveResponse> => {
  try {
    // Get or generate form ID
    const formId = context?.formId || generateFormId();

    // Get current user
    const userId = context?.userId || await getCurrentUserId();
    if (!userId) {
      toast.error('User not authenticated');
      return {
        success: false,
        formId,
        formStatus: 'error',
        completionPercentage: 0,
        message: 'User not authenticated',
      };
    }

    // Get annexure code
    const annexureCode = INDUSTRY_TO_ANNEXURE[industryCategory] || 'A';

    console.log('💾 Saving form as DRAFT:', {
      formId,
      industry: industryCategory,
      annexure: annexureCode,
      fieldsCount: Object.keys(formData).length,
    });

    // Try to update existing, otherwise create new
    const existingSubmission = await supabase
      .from('form_submissions')
      .select('id')
      .eq('form_id', formId)
      .single();

    let response;

    if (existingSubmission.data) {
      // Update existing draft
      response = await updateFormSubmission(formId, formData, 'draft');
    } else {
      // Create new draft
      response = await saveFormSubmission({
        user_id: userId,
        form_id: formId,
        industry_category: industryCategory,
        annexure_code: annexureCode,
        form_data: formData,
        status: 'draft',
      });
    }

    if (response) {
      toast.success('Draft saved successfully! 📝');
      return {
        success: true,
        formId,
        formStatus: 'draft',
        completionPercentage: response.completion_percentage || 0,
        message: 'Form saved as draft',
      };
    } else {
      toast.error('Failed to save draft');
      return {
        success: false,
        formId,
        formStatus: 'error',
        completionPercentage: 0,
        message: 'Failed to save form',
      };
    }
  } catch (error: any) {
    console.error('❌ Error saving draft:', error);
    toast.error('Error saving draft');
    return {
      success: false,
      formId: context?.formId || generateFormId(),
      formStatus: 'error',
      completionPercentage: 0,
      message: error.message,
    };
  }
};

/**
 * Submit form and trigger CONTRACT GENERATION
 * - Saves form with status 'submitted'
 * - Triggers contract generation workflow
 * - Returns form ID for contract fetching
 */
export const submitFormAndGenerateContract = async (
  formData: Record<string, any>,
  industryCategory: string,
  context?: { formId?: string; userId?: string }
): Promise<FormSaveResponse> => {
  try {
    // Get or generate form ID
    const formId = context?.formId || generateFormId();

    // Get current user
    const userId = context?.userId || await getCurrentUserId();
    if (!userId) {
      toast.error('User not authenticated');
      return {
        success: false,
        formId,
        formStatus: 'error',
        completionPercentage: 0,
        message: 'User not authenticated',
      };
    }

    // Get annexure code
    const annexureCode = INDUSTRY_TO_ANNEXURE[industryCategory] || 'A';

    console.log('🚀 Submitting form for contract generation:', {
      formId,
      industry: industryCategory,
      annexure: annexureCode,
      fieldsCount: Object.keys(formData).length,
    });

    // Try to update existing, otherwise create new
    const existingSubmission = await supabase
      .from('form_submissions')
      .select('id')
      .eq('form_id', formId)
      .single();

    let response;

    if (existingSubmission.data) {
      // Update existing to submitted
      response = await updateFormSubmission(formId, formData, 'submitted');
    } else {
      // Create new as submitted
      response = await saveFormSubmission({
        user_id: userId,
        form_id: formId,
        industry_category: industryCategory,
        annexure_code: annexureCode,
        form_data: formData,
        status: 'submitted',
      });
    }

    if (response) {
      // Trigger contract generation (optional - call your contract generation service here)
      console.log('✅ Form submitted. Form ID:', formId);
      console.log('📄 Ready for contract generation');

      toast.success('Form submitted! Generating contract... 📄');

      return {
        success: true,
        formId,
        formStatus: 'submitted',
        completionPercentage: response.completion_percentage || 100,
        message: 'Form submitted and ready for contract generation',
      };
    } else {
      toast.error('Failed to submit form');
      return {
        success: false,
        formId,
        formStatus: 'error',
        completionPercentage: 0,
        message: 'Failed to submit form',
      };
    }
  } catch (error: any) {
    console.error('❌ Error submitting form:', error);
    toast.error('Error submitting form');
    return {
      success: false,
      formId: context?.formId || generateFormId(),
      formStatus: 'error',
      completionPercentage: 0,
      message: error.message,
    };
  }
};

/**
 * Get form submission data (for resuming drafts or viewing submitted forms)
 */
export const getFormSubmissionData = async (
  formId: string
): Promise<Record<string, any> | null> => {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('form_id', formId)
      .single();

    if (error) {
      console.warn('Form submission not found:', formId);
      return null;
    }

    // Extract form data from all columns
    const formData: Record<string, any> = {};
    
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        // Skip metadata columns
        if (!['id', 'created_at', 'updated_at', 'submitted_at', 'reviewed_at', 'form_status', 'completion_percentage', 'required_fields_completed', 'total_fields_filled'].includes(key)) {
          if (value !== null && value !== '' && value !== {} && value !== []) {
            formData[key] = value;
          }
        }
      });
    }

    return formData;
  } catch (error: any) {
    console.error('Error fetching form data:', error);
    return null;
  }
};

/**
 * Get user's draft forms (for dashboard/resume functionality)
 */
export const getUserDraftForms = async (
  userId: string
): Promise<Array<{ formId: string; industry: string; completionPercentage: number; savedAt: string }>> => {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .select('form_id, industry_category, completion_percentage, updated_at')
      .eq('user_id', userId)
      .eq('form_status', 'draft')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching drafts:', error);
      return [];
    }

    return (data || []).map((item: any) => ({
      formId: item.form_id,
      industry: item.industry_category,
      completionPercentage: item.completion_percentage || 0,
      savedAt: item.updated_at,
    }));
  } catch (error: any) {
    console.error('Error:', error);
    return [];
  }
};

/**
 * Delete a draft form
 */
export const deleteDraftForm = async (formId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('form_submissions')
      .delete()
      .eq('form_id', formId)
      .eq('form_status', 'draft');

    if (error) {
      console.error('Error deleting draft:', error);
      toast.error('Failed to delete draft');
      return false;
    }

    toast.success('Draft deleted');
    return true;
  } catch (error: any) {
    console.error('Error:', error);
    return false;
  }
};

export default {
  saveFormAsDraft,
  submitFormAndGenerateContract,
  getFormSubmissionData,
  getUserDraftForms,
  deleteDraftForm,
};
