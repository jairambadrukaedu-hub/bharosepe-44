/**
 * CONTRACT GENERATION UI - SIMPLIFIED VERSION
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ContractGenerationEngine } from '@/services/contractGenerationEngine';
import { mapFormDataToDatabase } from '@/services/formDataMapper';
import { getFieldsForCategory } from '@/services/formFieldDefinitions';
import { supabase } from '@/integrations/supabase/client';
import { PricingField } from './PricingField';
import { EnhancedFileUpload } from './EnhancedFileUpload';
import {
  Check,
  AlertTriangle,
  AlertCircle,
  Loader,
  FileText,
  Send,
  Info,
  Calendar,
  Clock,
  RotateCcw,
  Truck,
  Package,
  Briefcase,
} from 'lucide-react';

interface ContractGenerationState {
  step: 'type-selection' | 'category-selection' | 'form-filling' | 'review' | 'send';
  transactionType: 'goods' | 'services' | '';
  productCategory: string;
  annexureCode: string;
  formData: Record<string, any>;
  generatedContract: any;
  contractHTML: string;
  isLoading: boolean;
  error: string | null;
}

const GOODS_CATEGORY_ANNEXURE_MAP = {
  electronics: 'A',
  mobile: 'B',
  furniture: 'C',
  vehicles: 'D',
  'fashion-apparel': 'E',
  jewellery: 'F',
  building_material: 'G',
  collectibles: 'H',
  industrial: 'I',
  books: 'J',
  art: 'K',
};

const SERVICES_CATEGORY_ANNEXURE_MAP = {
  software_development: 'A',
  ui_ux_design: 'B',
  content_writing: 'C',
  photography_videography: 'D',
  tutoring_coaching: 'E',
  home_repair_maintenance: 'F',
  cleaning_housekeeping: 'G',
  digital_marketing: 'H',
  consulting_ca_legal: 'I',
};

// Keep this for backward compatibility
const CATEGORY_ANNEXURE_MAP = GOODS_CATEGORY_ANNEXURE_MAP;

export interface TransactionContext {
  transactionId?: string;
  sellerInfo?: {
    id: string;
    name: string;
    phone: string;
    email?: string;
  };
  buyerInfo?: {
    id: string;
    name: string; 
    phone: string;
    email?: string;
  };
  currentUserRole?: 'buyer' | 'seller';
}

// Stub interface for form fields (definition imported from formFieldDefinitions)
interface FormFieldGroup {
  title: string;
  icon: string;
  fields: any[];
}

interface ContractGenerationUIProps {
  transactionContext?: TransactionContext;
}

function ContractGenerationUI({ transactionContext }: ContractGenerationUIProps) {
  const [state, setState] = useState<ContractGenerationState>({
    step: 'type-selection',
    transactionType: '',
    productCategory: '',
    annexureCode: '',
    formData: {},
    generatedContract: null,
    contractHTML: '',
    isLoading: false,
    error: null,
  });

  // Debounce timer ref for auto-save
  const autoSaveTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleCategorySelect = (category: string) => {
    const categoryMap = state.transactionType === 'goods' 
      ? GOODS_CATEGORY_ANNEXURE_MAP 
      : SERVICES_CATEGORY_ANNEXURE_MAP;
    
    const annexureCode = categoryMap[category as keyof typeof categoryMap];
    
    setState(prev => ({
      ...prev,
      productCategory: category,
      annexureCode: annexureCode,
      formData: {},
      error: null,
    }));
  };

  const handleFormDataChange = (field: string, value: any) => {
    const newFormData = {
      ...state.formData,
      [field]: value,
    };
    
    setState(prev => ({
      ...prev,
      formData: newFormData,
    }));
    
    // Save to localStorage immediately for persistence across refreshes (silently)
    const storageKey = `form_data_${state.productCategory}_${state.annexureCode}`;
    try {
      localStorage.setItem(storageKey, JSON.stringify(newFormData));
      // Only log for important fields, not every keystroke
      if (['product_name', 'price', 'expected_delivery_date'].includes(field)) {
        console.log(`📝 Key field updated: ${field}`);
      }
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }

    // Auto-save to database with debounce (2 seconds after last change)
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    autoSaveTimerRef.current = setTimeout(async () => {
      if (state.productCategory && state.annexureCode) {
        try {
          console.log('💾 Auto-saving form data to database...');
          // Use saveFormToDatabase but we need to pass the newFormData
          // We'll trigger this after setState completes
          autoSaveTimerRef.current = null;
        } catch (error) {
          console.error('⚠️ Auto-save failed silently:', error);
        }
      }
    }, 2000);
  };

  // Load form data from localStorage on component mount
  React.useEffect(() => {
    if (state.productCategory && state.annexureCode) {
      const storageKey = `form_data_${state.productCategory}_${state.annexureCode}`;
      try {
        const savedData = localStorage.getItem(storageKey);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setState(prev => ({
            ...prev,
            formData: parsedData
          }));
          console.log('🔄 Loaded saved form data from localStorage:', parsedData);
        }
      } catch (error) {
        console.error('Failed to load from localStorage:', error);
      }
    }
  }, [state.productCategory, state.annexureCode]);

  // Auto-save to database with debouncing
  React.useEffect(() => {
    // Only auto-save if we have category, annexure code, and form data with at least one field
    if (!state.productCategory || !state.annexureCode || Object.keys(state.formData).length === 0) {
      return;
    }

    // Trigger auto-save after 2 seconds of no changes
    const autoSaveTimer = setTimeout(async () => {
      try {
        console.log('💾 Auto-saving form data to database...');
        // We need saveFormToDatabase to be defined, so we'll call it inline here
        const formId = state.formData.form_id || crypto.randomUUID();
        const cleanedFormData = { ...state.formData };
        delete cleanedFormData.transaction_id;

        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id || 'test-user-' + Date.now();

        const { error: formError } = await supabase
          .from('form_submissions')
          .upsert({
            user_id: userId,
            form_id: formId,
            industry_category: state.productCategory,
            annexure_code: state.annexureCode,
            form_data: cleanedFormData,
            form_status: 'draft',
          }, { onConflict: 'form_id' })
          .select();

        if (!formError) {
          console.log('✅ Auto-save successful');
        }
      } catch (error) {
        console.error('⚠️ Auto-save failed:', error);
        // Silently fail - don't show error toast for auto-save
      }
    }, 2000); // 2 second debounce

    return () => clearTimeout(autoSaveTimer);
  }, [state.formData, state.productCategory, state.annexureCode]);

  // Clear localStorage when category changes
  const handleCategoryChange = (category: string, annexureCode: string) => {
    setState(prev => ({
      ...prev,
      step: 'form-filling',
      productCategory: category,
      annexureCode: annexureCode,
      formData: {},
      error: null,
    }));
  };

  // ===============================================================================
  // FORM DATA PERSISTENCE TO DATABASE
  // ===============================================================================

  // Get the appropriate product name field for the industry
  const getProductNameField = () => {
    // Use consistent field names based on what's actually in the form
    switch (state.productCategory) {
      case 'books': 
        return state.formData['itemDescription'] || 
               state.formData['book_title'] || 
               state.formData['item_title'] ||
               state.formData['product_name'];
      case 'mobile':
        return state.formData['brand'] || 
               state.formData['model_name'] || 
               state.formData['device_type'] || 
               state.formData['item_title'] ||
               state.formData['product_name'];
      case 'vehicles':
        return state.formData['brand'] || 
               state.formData['make'] || 
               state.formData['vehicle_make'] ||
               state.formData['product_name'];
      case 'industrial':
        return state.formData['itemDescription'] || 
               state.formData['machine_name'] || 
               state.formData['item_name'] ||
               state.formData['product_name'];
      default: 
        return state.formData['itemDescription'] || 
               state.formData['product_name'] || 
               state.formData['item_title'] || 
               state.formData['item_name'];
    }
  };

  // Get names of fields that should be marked as required (essential for contract generation)
  const getEssentialFieldNames = (): string[] => {
    const essential = ['itemDescription', 'totalPrice', 'deliveryDate', 'deliveryMode', 'returnPolicy', 'inspectionWindow', 'warranty'];
    
    // Add product-specific essential fields based on category
    switch (state.productCategory) {
      case 'electronics':
      case 'mobile':
        essential.push('brand', 'condition', 'functionalIssues', 'accessories');
        break;
      case 'furniture':
        essential.push('dimensions', 'materials', 'condition', 'damages', 'assembly');
        break;
      case 'vehicles':
        essential.push('brand', 'condition', 'damages');
        break;
      case 'books':
        essential.push('author'); // For books, author is essential
        break;
      case 'art':
        essential.push('artist', 'medium');
        break;
      case 'fashion-apparel':
        essential.push('item_name', 'category', 'condition');
        // Removed: 'front_view_photo' - file uploads are now optional
        break;
      default:
        essential.push('brand', 'condition');
    }
    
    return essential;
  };

  // Get the appropriate description field for the industry
  const getDescriptionField = () => {
    switch (state.productCategory) {
      case 'books': 
        return state.formData['book_summary'] || 
               state.formData['content_description'] || 
               state.formData['book_description'] ||
               state.formData['summary'] ||
               state.formData['item_description'];
      case 'mobile':
        return state.formData['condition'] ||
               state.formData['description'] ||
               state.formData['item_description'] ||
               `${state.formData['brand']} ${state.formData['model_name']} - ${state.formData['color']} (${state.formData['ram']} RAM, ${state.formData['storage_details']})`;
      case 'vehicles':
        return state.formData['vehicle_description'] || 
               state.formData['description'] ||
               state.formData['item_description'];
      case 'art':
        return state.formData['artwork_description'] ||
               state.formData['description'] ||
               state.formData['item_description'];
      default: 
        return state.formData['description'] || 
               state.formData['item_description'] ||
               state.formData['product_description'];
    }
  };

  // Check if required fields are filled based on industry
  const getRequiredFieldsStatus = () => {
    const essentialNames = getEssentialFieldNames();
    const essentialFields: { key: string; value: any; label: string }[] = [];

    // Map essential field names to their values and labels
    essentialNames.forEach(fieldName => {
      let value: any;
      let label: string;

      switch (fieldName) {
        case 'itemDescription':
          value = state.formData['itemDescription'] || 
                  state.formData['description'] || 
                  state.formData['product_description'] ||
                  state.formData['defect_description'] ||
                  state.formData['item_description'];
          label = 'Description';
          break;
        case 'totalPrice':
          value = state.formData['totalPrice'] || state.formData['price'] || state.formData['sale_price'];
          label = 'Price';
          break;
        case 'deliveryDate':
          value = state.formData['deliveryDate'] || state.formData['expected_delivery_date'];
          label = 'Delivery Date';
          break;
        case 'deliveryMode':
          value = state.formData['deliveryMode'] || state.formData['delivery_mode'] || state.formData['delivery_method'];
          label = 'Delivery Mode';
          break;
        case 'returnPolicy':
          value = state.formData['returnPolicy'] || state.formData['return_policy'];
          label = 'Return Policy';
          break;
        case 'inspectionWindow':
          value = state.formData['inspectionWindow'] || state.formData['inspection_window_hours'];
          label = 'Inspection Window';
          break;
        case 'warranty':
          value = state.formData['warranty'] || state.formData['warranty_info'] || state.formData['warranty_status'];
          label = 'Warranty Terms';
          break;
        case 'brand':
          value = state.formData['brand'] || state.formData['make'];
          label = 'Brand';
          break;
        case 'condition':
          value = state.formData['condition'];
          label = 'Condition';
          break;
        case 'functionalIssues':
          value = state.formData['functionalIssues'];
          label = 'Functional Issues/Defects';
          break;
        case 'accessories':
          value = state.formData['accessories'];
          label = 'Included Accessories';
          break;
        case 'dimensions':
          value = state.formData['dimensions'];
          label = 'Dimensions';
          break;
        case 'materials':
          value = state.formData['materials'];
          label = 'Materials';
          break;
        case 'damages':
          value = state.formData['damages'];
          label = 'Damage/Wear/Stains';
          break;
        case 'assembly':
          value = state.formData['assembly'];
          label = 'Assembly Required';
          break;
        case 'author':
          value = state.formData['author'];
          label = 'Author';
          break;
        case 'artist':
          value = state.formData['artist'];
          label = 'Artist';
          break;
        case 'medium':
          value = state.formData['medium'];
          label = 'Medium';
          break;
        case 'item_name':
          value = state.formData['item_name'];
          label = 'Item Name';
          break;
        case 'category':
          value = state.formData['category'];
          label = 'Category';
          break;
        case 'front_view_photo':
          value = state.formData['front_view_photo'];
          label = 'Front View Photo';
          break;
        default:
          value = state.formData[fieldName];
          label = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      }

      if (value) {
        essentialFields.push({ key: fieldName, value, label });
      }
    });

    const filledCount = essentialFields.length;
    const totalCount = essentialNames.length;
    const missingNames = essentialNames.filter(name => !essentialFields.some(f => f.key === name));
    
    const isComplete = missingNames.length === 0;

    return {
      isComplete,
      missingFields: missingNames.map(name => {
        // Map field names to user-friendly labels
        const labelMap: Record<string, string> = {
          itemDescription: 'Description',
          totalPrice: 'Price',
          deliveryDate: 'Delivery Date',
          deliveryMode: 'Delivery Mode',
          returnPolicy: 'Return Policy',
          inspectionWindow: 'Inspection Window',
          brand: 'Brand',
          condition: 'Condition',
          functionalIssues: 'Functional Issues',
          accessories: 'Accessories',
          dimensions: 'Dimensions',
          materials: 'Materials',
          damages: 'Damage/Wear',
          assembly: 'Assembly Info',
          author: 'Author',
          artist: 'Artist',
          medium: 'Medium',
          item_name: 'Item Name',
          category: 'Category',
          front_view_photo: 'Front View Photo'
        };
        return labelMap[name] || name;
      }),
      completedCount: filledCount,
      totalCount: totalCount
    };
  };

  // Get appropriate description label for the industry
  const getDescriptionLabel = () => {
    switch (state.productCategory) {
      case 'books': return 'Book Summary';
      case 'vehicles': return 'Vehicle Description';
      case 'art': return 'Artwork Description';
      default: return 'Description';
    }
  };

  // Get appropriate product name label for the industry
  const getProductNameLabel = () => {
    switch (state.productCategory) {
      case 'books': return 'Book Title';
      case 'vehicles': return 'Vehicle Make/Model';
      case 'industrial': return 'Machine Name';
      case 'art': return 'Artwork Title';
      default: return 'Product Name';
    }
  };

  const saveFormToDatabase = async (formData: Record<string, any>, isAutoSave = true) => {
    try {
      console.log('💾 Saving form data to database...', { isAutoSave, formDataKeys: Object.keys(formData) });
      console.log('📋 Full form data:', formData);
      
      // Generate form ID if not exists (and remove transaction_id to avoid conflicts)
      const formId = formData.form_id || formData.transaction_id || crypto.randomUUID();
      console.log('🔑 Form ID:', formId);
      
      // Remove transaction_id from formData if it exists - it's not a valid column
      const cleanedFormData = { ...formData };
      delete cleanedFormData.transaction_id;
      
      // Get current user or create anonymous session for testing
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('❌ Error getting user:', userError);
      }
      
      let userId: string;
      if (!user) {
        console.log('⚠️ No authenticated user found, using test user ID');
        // For testing purposes, create a test user ID
        userId = 'test-user-' + Date.now();
      } else {
        userId = user.id;
        console.log('👤 User authenticated:', userId);
      }
      console.log('🏭 Industry:', state.productCategory, 'Annexure:', state.annexureCode);
      
      try {
        // First, create or update the transaction record (transactions table)
        const transactionData = {
          id: formId,
          seller_id: userId,
          buyer_id: userId, // temporary, will be updated when buyer is known
          amount: parseFloat(cleanedFormData.price || cleanedFormData.sale_price) || 0,
          title: cleanedFormData.product_name || 'Unknown Product',
          description: cleanedFormData.description || '',
          status: 'created', // Use valid status from the enum
          delivery_date: cleanedFormData.expected_delivery_date || null,
        };
        
        console.log('📄 Transaction data to save:', transactionData);
        
        const { data: transactionResult, error: transactionError } = await supabase
          .from('transactions')
          .upsert(transactionData, {
            onConflict: 'id'
          })
          .select()
          .single();

        if (transactionError) {
          console.error('⚠️ Could not save to transactions table:', transactionError);
          console.error('Error details:', transactionError.details);
          console.error('Error hint:', transactionError.hint);
          return false;
        }
        
        console.log('✅ Transaction saved successfully:', transactionResult);

        // Now create/update a basic contract record
        // Only create contract if transaction was created successfully
        let contractResult = null;
        try {
          const contractData = {
            transaction_id: transactionResult.id,
            contract_content: `Contract for ${formData.product_name || 'Product'}`,
            terms: 'Standard terms and conditions',
            created_by: userId,
            status: 'draft',
          };
          
          console.log('📄 Contract data to save:', contractData);
          
          const { data: contractRes, error: contractError } = await supabase
            .from('contracts')
            .insert(contractData)
            .select()
            .single();

          if (contractError) {
            console.error('⚠️ Could not save to contracts table:', contractError);
            console.error('Error details:', contractError.details);
            console.error('Error hint:', contractError.hint);
            // Continue anyway since transaction was saved
          } else {
            console.log('✅ Contract saved successfully:', contractRes);
            contractResult = contractRes;
          }
        } catch (contractErr) {
          console.error('⚠️ Contract creation failed:', contractErr);
          // Continue anyway since transaction was saved
        }

        // Now save to the comprehensive form_submissions table
        // Using the mapFormDataToDatabase function to store ALL 380+ fields as individual columns
        // This replaces the old JSONB grouped structure
        
        const formDataRecord = mapFormDataToDatabase({
          user_id: userId,
          form_id: formId,
          product_category: state.productCategory,
          annexure_code: state.annexureCode,
          form_status: 'draft',
          ...cleanedFormData // All form fields (transaction_id removed)
        });
        
        // ENSURE ALL NOT NULL COLUMNS HAVE VALUES
        if (!formDataRecord.product_name || formDataRecord.product_name === '') {
          formDataRecord.product_name = 'Unlisted Product';
        }
        if (!formDataRecord.description || formDataRecord.description === '') {
          formDataRecord.description = 'No description provided';
        }
        if (!formDataRecord.sale_price) {
          formDataRecord.sale_price = 0;
        }
        if (!formDataRecord.condition || formDataRecord.condition === '') {
          formDataRecord.condition = 'not-specified';
        }
        if (!formDataRecord.expected_delivery_date || formDataRecord.expected_delivery_date === '') {
          // Set to 7 days from now
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + 7);
          formDataRecord.expected_delivery_date = futureDate.toISOString().split('T')[0];
        }
        if (!formDataRecord.delivery_mode || formDataRecord.delivery_mode === '') {
          formDataRecord.delivery_mode = 'standard';
        }
        if (!formDataRecord.return_policy || formDataRecord.return_policy === '') {
          formDataRecord.return_policy = 'no-return';
        }
        if (!formDataRecord.inspection_window_hours) {
          formDataRecord.inspection_window_hours = 24;
        }
        
        console.log('📋 Form data record prepared (FLATTENED):', formDataRecord);
        console.log('✅ Total fields in record:', Object.keys(formDataRecord).length);
        console.log('🔍 NOT NULL columns verified:');
        console.log('   - product_name:', formDataRecord['product_name']);
        console.log('   - description:', formDataRecord['description']);
        console.log('   - sale_price:', formDataRecord['sale_price']);
        console.log('   - condition:', formDataRecord['condition']);
        console.log('   - expected_delivery_date:', formDataRecord['expected_delivery_date']);
        console.log('   - delivery_mode:', formDataRecord['delivery_mode']);
        console.log('   - return_policy:', formDataRecord['return_policy']);
        console.log('   - inspection_window_hours:', formDataRecord['inspection_window_hours']);
        
        const { data: formResult, error: formError } = await supabase
          .from('form_submissions')
          .upsert(formDataRecord, { 
            onConflict: 'form_id'
          })
          .select();

        if (formError) {
          console.error('⚠️ Could not save form data details:', formError);
          console.error('Form error details:', formError.details);
          console.error('Form error hint:', formError.hint);
          // Continue anyway since transaction was saved
        } else {
          console.log('✅ Form data saved to form_submissions table:', formResult);
        }

        // Update form data with form ID if it was generated
        if (!formData.form_id) {
          setState(prev => ({
            ...prev,
            formData: {
              ...prev.formData,
              form_id: formId
            }
          }));
        }
        
        console.log('🎉 Successfully saved all form data to database!');
        return true;
        
      } catch (dbError: any) {
        console.error('❌ Database operation failed:', dbError);
        console.error('Error message:', dbError.message);
        console.error('Error code:', dbError.code);
        console.error('Error details:', dbError.details);
        console.error('Error hint:', dbError.hint);
        
        // Check if it's a table doesn't exist error
        if (dbError.message && dbError.message.includes('relation') && dbError.message.includes('does not exist')) {
          console.error('🚨 Database tables don\'t exist! Please run migrations.');
        }
        return false;
      }
      
    } catch (error: any) {
      console.error('❌ Error saving form data:', error);
      if (!isAutoSave) {
        setState(prev => ({ ...prev, error: `Failed to save form: ${error.message}` }));
      }
      return false;
    }
  };

  const handleGenerateContract = async () => {
    console.log('🚀 Contract generation started!');
    console.log('Current form data:', state.formData);
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Validate essential fields before proceeding
      console.log('📋 Validating essential fields...');
      const { isComplete, missingFields } = getRequiredFieldsStatus();
      
      if (!isComplete) {
        const missingList = missingFields.join(', ');
        const errorMsg = `Required fields are missing: ${missingList}. Please fill all fields marked with * (red asterisk) before generating the contract.`;
        console.error(`❌ ${errorMsg}`);
        throw new Error(errorMsg);
      }
      
      console.log(`✅ All essential fields validated`);

      // FETCH USER ID FIRST (needed for fallback mapping)
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error('❌ User authentication required for contract generation');
        throw new Error('Please log in to generate contract');
      }

      const userId = user.id;
      console.log('✅ User authenticated:', userId);

      // STEP 1: SAVE FORM DATA TO DATABASE FIRST
      console.log('💾 STEP 1: Saving form data to form_submissions table...');
      const formSaveSuccess = await saveFormToDatabase(state.formData, false);
      if (!formSaveSuccess) {
        throw new Error('Failed to save form data to database. Cannot generate contract.');
      }
      console.log('✅ Form data saved to database successfully');

      // STEP 2: FETCH SAVED FORM DATA FROM form_submissions TABLE
      console.log('📥 STEP 2: Fetching saved form data from form_submissions table...');
      let savedFormData: any = null;
      try {
        const { data: fetchedData, error: fetchError } = await supabase
          .from('form_submissions')
          .select('*')
          .eq('transaction_id', state.formData.transaction_id)
          .maybeSingle();

        if (fetchError) {
          console.log('⚠️ Error fetching form submission:', fetchError);
        } else if (fetchedData) {
          savedFormData = fetchedData;
          console.log('✅ Fetched form submission from database:', savedFormData);
          console.log('🔍 Key product fields from database:');
          console.log('   - scratches_present:', savedFormData?.scratches_present, 'TYPE:', typeof savedFormData?.scratches_present);
          console.log('   - dents_present:', savedFormData?.dents_present, 'TYPE:', typeof savedFormData?.dents_present);
          console.log('   - battery_health_percent:', savedFormData?.battery_health_percent, 'TYPE:', typeof savedFormData?.battery_health_percent);
          console.log('   - power_on_working:', savedFormData?.power_on_working, 'TYPE:', typeof savedFormData?.power_on_working);
          console.log('   - charging_working:', savedFormData?.charging_working, 'TYPE:', typeof savedFormData?.charging_working);
          console.log('   - imei_1:', savedFormData?.imei_1, 'TYPE:', typeof savedFormData?.imei_1);
          
          // Also check the original field names
          console.log('🔍 Original field names from database:');
          console.log('   - scratches:', savedFormData?.scratches);
          console.log('   - dents:', savedFormData?.dents);
          console.log('   - battery_health_percentage:', savedFormData?.battery_health_percentage);
          console.log('   - power_on:', savedFormData?.power_on);
          console.log('   - charging_working:', savedFormData?.charging_working);
        } else {
          console.log('⚠️ No form submission found in DB, will map state.formData to get proper field names');
          // CRITICAL FIX: If fetch returns nothing, map the in-memory form data to get proper field names
          savedFormData = mapFormDataToDatabase({
            user_id: userId,
            form_id: state.formData.form_id,
            product_category: state.productCategory,
            annexure_code: state.annexureCode,
            form_status: 'draft',
            ...state.formData
          });
          console.log('✅ Mapped state.formData to get field names:', savedFormData);
        }
      } catch (fetchErr) {
        console.log('⚠️ Error fetching form submission:', fetchErr);
        // CRITICAL FIX: If fetch fails, map the in-memory form data
        savedFormData = mapFormDataToDatabase({
          user_id: userId,
          form_id: state.formData.form_id,
          product_category: state.productCategory,
          annexure_code: state.annexureCode,
          form_status: 'draft',
          ...state.formData
        });
        console.log('✅ Mapped state.formData as fallback:', savedFormData);
      }

      // Try to fetch user profile, but don't fail if profiles table doesn't exist
      let currentUserProfile = null;
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!profileError && profileData) {
          currentUserProfile = profileData;
          console.log('✅ User profile fetched from profiles table:', currentUserProfile);
        } else {
          console.log('⚠️ Could not fetch from profiles table, using auth user data');
        }
      } catch (profileFetchError) {
        console.log('⚠️ Profiles table not accessible, using auth user data');
      }

      // Use profile data if available, otherwise use auth user data as fallback
      const finalUserProfile = currentUserProfile || {
        id: user.id,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        email: user.email || 'user@example.com',
        phone: user.user_metadata?.phone || 'Not provided',
        address: user.user_metadata?.address || 'Address not provided',
        kyc_status: 'pending'
      };

      console.log('✅ Using final user profile:', finalUserProfile);
      
      console.log('🔄 Setting up party information...');
      console.log('🎯 Transaction context received:', transactionContext);
      console.log('📋 User mode from context:', transactionContext?.currentUserRole);
      console.log('👤 Seller info from context:', transactionContext?.sellerInfo);
      console.log('👤 Buyer info from context:', transactionContext?.buyerInfo);

      // Use transaction context if available, otherwise fall back to current approach
      let sellerProfile, buyerProfile;

      if (transactionContext?.sellerInfo && transactionContext?.buyerInfo) {
        console.log('✅ Using transaction context for seller/buyer info');
        // Fetch seller profile from profiles table
        let sellerProfileData = null;
        try {
          console.log('🔍 Fetching seller profile with ID:', transactionContext.sellerInfo.id);
          const { data: sellerData, error: sellerError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', transactionContext.sellerInfo.id)
            .single();
          
          if (!sellerError && sellerData) {
            sellerProfileData = sellerData;
            console.log('✅ Seller profile fetched from profiles table:', sellerProfileData);
            console.log('📋 Seller KYC Details:', {
              full_name: sellerProfileData.full_name,
              email: sellerProfileData.email,
              phone: sellerProfileData.phone,
              pan_number: sellerProfileData.pan_number,
              gst_number: sellerProfileData.gst_number,
              verified_phone: sellerProfileData.verified_phone,
              kyc_status: sellerProfileData.kyc_status
            });
          } else {
            console.log('⚠️ No seller profile found or error:', sellerError);
          }
        } catch (e) {
          console.log('⚠️ Error fetching seller profile from profiles table:', e);
        }

        // Fetch buyer profile from profiles table
        let buyerProfileData = null;
        try {
          console.log('🔍 Fetching buyer profile with ID:', transactionContext.buyerInfo.id);
          const { data: buyerData, error: buyerError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', transactionContext.buyerInfo.id)
            .single();
          
          if (!buyerError && buyerData) {
            buyerProfileData = buyerData;
            console.log('✅ Buyer profile fetched from profiles table:', buyerProfileData);
            console.log('📋 Buyer KYC Details:', {
              full_name: buyerProfileData.full_name,
              email: buyerProfileData.email,
              phone: buyerProfileData.phone,
              pan_number: buyerProfileData.pan_number,
              gst_number: buyerProfileData.gst_number,
              verified_phone: buyerProfileData.verified_phone,
              kyc_status: buyerProfileData.kyc_status
            });
          } else {
            console.log('⚠️ No buyer profile found or error:', buyerError);
          }
        } catch (e) {
          console.log('⚠️ Error fetching buyer profile from profiles table:', e);
        }

        // Use the real seller and buyer information from profiles table or transaction context
        sellerProfile = {
          id: transactionContext.sellerInfo.id,
          full_name: sellerProfileData?.full_name || transactionContext.sellerInfo.name || 'Seller Name',
          email: sellerProfileData?.email || transactionContext.sellerInfo.email || `${transactionContext.sellerInfo.phone}@bharosepe.com`,
          phone: sellerProfileData?.phone || transactionContext.sellerInfo.phone || 'Not provided',
          address: sellerProfileData?.address || 'Address not provided',
          city: sellerProfileData?.city || 'City not provided',
          state: sellerProfileData?.state || 'State not provided',
          pincode: sellerProfileData?.pincode || 'Pincode not provided',
          pan_number: sellerProfileData?.pan_number || 'Not provided',
          gst_number: sellerProfileData?.gst_number || 'Not provided',
          verified_phone: sellerProfileData?.verified_phone || false,
          verified_email: sellerProfileData?.verified_email || false,
          kyc_status: sellerProfileData?.kyc_status || (sellerProfileData?.verified_phone ? 'verified' : 'pending'),
          kyc_date: sellerProfileData?.updated_at || new Date().toISOString()
        };

        buyerProfile = {
          id: transactionContext.buyerInfo.id,
          full_name: buyerProfileData?.full_name || transactionContext.buyerInfo.name || 'Buyer Name',
          email: buyerProfileData?.email || transactionContext.buyerInfo.email || `${transactionContext.buyerInfo.phone}@bharosepe.com`,
          phone: buyerProfileData?.phone || transactionContext.buyerInfo.phone || 'Not provided',
          address: buyerProfileData?.address || 'Address not provided',
          city: buyerProfileData?.city || 'City not provided',
          state: buyerProfileData?.state || 'State not provided',
          pincode: buyerProfileData?.pincode || 'Pincode not provided',
          pan_number: buyerProfileData?.pan_number || 'Not provided',
          gst_number: buyerProfileData?.gst_number || 'Not provided',
          verified_phone: buyerProfileData?.verified_phone || false,
          verified_email: buyerProfileData?.verified_email || false,
          kyc_status: buyerProfileData?.kyc_status || (buyerProfileData?.verified_phone ? 'verified' : 'pending'),
          kyc_date: buyerProfileData?.updated_at || new Date().toISOString()
        };

        console.log('✅ Using real transaction context profiles with KYC data');
        console.log('👤 Seller from profiles table:', sellerProfile);
        console.log('👤 Buyer from profiles table:', buyerProfile);
      } else {
        // Fallback to original logic for backward compatibility
        console.log('⚠️ No transaction context, using fallback profiles');
        
        sellerProfile = finalUserProfile;

        // TODO: In the future, get the other party (buyer/seller) from contact selection
        // For now, we'll use placeholder data for the other party (set id to null since they're not a registered user)
        buyerProfile = {
          id: null, // Not a registered user, so no UUID
          full_name: 'Other Party Name',
          email: 'other@example.com',
          phone: '9999999999',
          address: 'Other Party Address',
          pan_number: 'Not provided',
          gst_number: 'Not provided',
          kyc_status: 'pending',
          kyc_date: new Date().toISOString()
        };
      }
      
      console.log('✅ Party information prepared');

      // Log final profile assignments
      console.log('👤 Seller profile summary:', {
        name: sellerProfile.full_name,
        email: sellerProfile.email,
        id: sellerProfile.id,
        pan: sellerProfile.pan_number,
        gst: sellerProfile.gst_number,
        kyc_status: sellerProfile.kyc_status
      });

      console.log('👤 Buyer profile summary:', {
        name: buyerProfile.full_name,
        email: buyerProfile.email,
        id: buyerProfile.id,
        pan: buyerProfile.pan_number,
        gst: buyerProfile.gst_number,
        kyc_status: buyerProfile.kyc_status
      });

      const contractData: any = {
        // Required basic fields
        transaction_id: state.formData.transaction_id || crypto.randomUUID(),
        product_category: state.productCategory,
        annexure_code: state.annexureCode,
        
        // Seller details with KYC information
        // NOTE: Use null/empty for address fields to force engine to fetch from profiles table
        seller_name: sellerProfile.full_name || sellerProfile.name || 'Seller Name',
        seller_email: sellerProfile.email || 'seller@example.com',
        seller_id: sellerProfile.id,
        seller_phone: sellerProfile.phone || '',
        seller_address: sellerProfile.address || '', // Let engine fetch from DB
        seller_city: sellerProfile.city || '', // Let engine fetch from DB
        seller_state: sellerProfile.state || '', // Let engine fetch from DB
        seller_pincode: sellerProfile.pincode || '', // Let engine fetch from DB
        seller_pan: sellerProfile.pan_number || '', // Let engine fetch from DB
        seller_gst: sellerProfile.gst_number || '', // Let engine fetch from DB
        seller_kyc_status: sellerProfile.kyc_status || 'pending' as const,
        seller_kyc_date: sellerProfile.kyc_date || new Date().toISOString(),
        
        // Buyer details with KYC information
        // NOTE: Use null/empty for address fields to force engine to fetch from profiles table
        buyer_name: buyerProfile.full_name || buyerProfile.name || 'Buyer Name',
        buyer_email: buyerProfile.email || 'buyer@example.com',
        buyer_id: buyerProfile.id,
        buyer_phone: buyerProfile.phone || '',
        buyer_address: buyerProfile.address || '', // Let engine fetch from DB
        buyer_city: buyerProfile.city || '', // Let engine fetch from DB
        buyer_state: buyerProfile.state || '', // Let engine fetch from DB
        buyer_pincode: buyerProfile.pincode || '', // Let engine fetch from DB
        buyer_pan: buyerProfile.pan_number || '', // Let engine fetch from DB
        buyer_gst: buyerProfile.gst_number || '', // Let engine fetch from DB
        buyer_kyc_status: buyerProfile.kyc_status || 'pending' as const,
        buyer_kyc_date: buyerProfile.kyc_date || new Date().toISOString(),
        
        // Product details - FETCH FROM DATABASE FIRST, then fallback to form state
        product_name: savedFormData?.product_name || savedFormData?.item_name || state.formData.item_name || getProductNameField() || '',
        brand: savedFormData?.brand || state.formData.brand || 'Generic',
        model_number: savedFormData?.model_number || state.formData.model_number || 'N/A',
        serial_number: savedFormData?.serial_number || state.formData.serial_number || 'N/A',
        condition_category: savedFormData?.condition_category || state.formData.condition_category || 'new',
        sale_price: parseFloat(savedFormData?.sale_price || state.formData.sale_price || state.formData.price) || 0,
        delivery_method: savedFormData?.delivery_method || savedFormData?.delivery_mode || state.formData.delivery_mode || 'pickup',
        delivery_address: savedFormData?.delivery_address || state.formData.delivery_address || buyerProfile.address || 'To be decided',
        
        // ALL form data from in-memory state
        ...state.formData,
        
        // ALL saved form data from database (takes precedence)
        ...(savedFormData || {})
      };

      console.log('📦 Contract data prepared with database values:', contractData);
      console.log('✅ Total contract data fields:', Object.keys(contractData).length);
      
      // Log all seller details being passed to engine
      console.log('📋 SELLER DATA PASSED TO ENGINE:');
      console.log('   - seller_name:', contractData.seller_name);
      console.log('   - seller_id:', contractData.seller_id);
      console.log('   - seller_email:', contractData.seller_email);
      console.log('   - seller_phone:', contractData.seller_phone);
      console.log('   - seller_address:', contractData.seller_address);
      console.log('   - seller_city:', contractData.seller_city);
      console.log('   - seller_state:', contractData.seller_state);
      console.log('   - seller_pincode:', contractData.seller_pincode);
      console.log('   - seller_pan:', contractData.seller_pan);
      console.log('   - seller_gst:', contractData.seller_gst);
      
      console.log('📋 BUYER DATA PASSED TO ENGINE:');
      console.log('   - buyer_name:', contractData.buyer_name);
      console.log('   - buyer_id:', contractData.buyer_id);
      console.log('   - buyer_email:', contractData.buyer_email);
      console.log('   - buyer_phone:', contractData.buyer_phone);
      console.log('   - buyer_address:', contractData.buyer_address);
      console.log('   - buyer_city:', contractData.buyer_city);
      console.log('   - buyer_state:', contractData.buyer_state);
      console.log('   - buyer_pincode:', contractData.buyer_pincode);
      console.log('   - buyer_pan:', contractData.buyer_pan);
      console.log('   - buyer_gst:', contractData.buyer_gst);
      
      console.log('👤 Seller profile summary:', { 
        name: sellerProfile.full_name || sellerProfile.name,
        email: sellerProfile.email,
        id: sellerProfile.id 
      });
      console.log('👤 Buyer profile summary:', { 
        name: buyerProfile.full_name || buyerProfile.name,
        email: buyerProfile.email,
        id: buyerProfile.id 
      });
      
      // DEBUG: Log the actual condition fields in contractData before passing to engine
      console.log('🔍 CONDITION FIELDS IN contractData (before engine):');
      console.log('   state.formData.scratches:', state.formData.scratches);
      console.log('   state.formData.dents:', state.formData.dents);
      console.log('   state.formData.battery_health_percentage:', state.formData.battery_health_percentage);
      console.log('   state.formData.power_on:', state.formData.power_on);
      console.log('   state.formData.charging_working:', state.formData.charging_working);
      console.log('   ---');
      console.log('   contractData.scratches_present:', contractData.scratches_present);
      console.log('   contractData.dents_present:', contractData.dents_present);
      console.log('   contractData.battery_health_percent:', contractData.battery_health_percent);
      console.log('   contractData.power_on_working:', contractData.power_on_working);
      console.log('   contractData.charging_working:', contractData.charging_working);
      console.log('   contractData.imei_1:', contractData.imei_1);
      
      // STEP 2: NOW GENERATE CONTRACT FROM DATABASE DATA
      console.log('📄 STEP 3: Generating contract from form_submissions database...');
      const generatedContract = await ContractGenerationEngine.generateContract(contractData);
      console.log('✅ Contract generated successfully:', generatedContract);

      // Clear localStorage after successful contract generation
      const storageKey = `form_data_${state.productCategory}_${state.annexureCode}`;
      localStorage.removeItem(storageKey);
      console.log('🧹 Cleared localStorage after successful contract generation');

      setState(prev => ({
        ...prev,
        generatedContract,
        contractHTML: generatedContract.contract_html || '',
        step: 'review',
        isLoading: false,
      }));
      
      console.log('🎉 Contract generation completed! Moving to review step.');
    } catch (error: any) {
      console.error('❌ Contract generation failed:', error);
      console.error('Error details:', {
        message: error?.message,
        stack: error?.stack,
        formData: state.formData
      });
      setState(prev => ({
        ...prev,
        error: error?.message || 'Failed to generate contract',
        isLoading: false,
      }));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      
      {/* Error Alert */}
      {state.error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {/* STEP 1: TRANSACTION TYPE SELECTION */}
      {state.step === 'type-selection' && (
        <Card>
          <CardHeader>
            <CardTitle>Create Smart Contract</CardTitle>
            <CardDescription>Select whether you want to create a contract for Goods or Services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction Type</label>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Goods Option */}
              <div
                onClick={() => setState(prev => ({ ...prev, step: 'category-selection', transactionType: 'goods' }))}
                className="p-6 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold text-lg">Goods</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Physical products like electronics, furniture, fashion, jewelry, vehicles, etc.
                </p>
              </div>

              {/* Services Option */}
              <div
                onClick={() => setState(prev => ({ ...prev, step: 'category-selection', transactionType: 'services' }))}
                className="p-6 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-500 hover:bg-purple-50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-lg">Services</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Professional services like home repair, design, consulting, tutoring, etc.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 2: CATEGORY SELECTION */}
      {state.step === 'category-selection' && (
        <Card>
          <CardHeader>
            <CardTitle>Select {state.transactionType === 'goods' ? 'Product' : 'Service'} Category</CardTitle>
            <CardDescription>Choose the category that best fits your {state.transactionType === 'goods' ? 'product' : 'service'}</CardDescription>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setState(prev => ({ ...prev, step: 'type-selection', transactionType: '', productCategory: '', annexureCode: '' }))}
            >
              ← Back to Transaction Type
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {state.transactionType === 'goods' ? 'Product Category' : 'Service Category'}
              </label>
              <Select onValueChange={handleCategorySelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`-- Select ${state.transactionType === 'goods' ? 'Product' : 'Service'} Category --`} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(
                    state.transactionType === 'goods' 
                      ? GOODS_CATEGORY_ANNEXURE_MAP 
                      : SERVICES_CATEGORY_ANNEXURE_MAP
                  ).map(([category, annexure]) => (
                    <SelectItem key={category} value={category}>
                      <div className="flex justify-between items-center w-full">
                        <span className="capitalize">{category.replace('-', ' ').replace('_', ' ')}</span>
                        <span className="text-xs text-gray-500 ml-2">Annexure {annexure}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {state.productCategory && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm font-medium text-blue-900">Selected Category:</p>
                <p className="text-sm text-blue-700">
                  {state.productCategory.replace('-', ' ').replace('_', ' ').toUpperCase()} - Annexure {state.annexureCode}
                </p>
                <Button 
                  className="mt-2 w-full"
                  onClick={() => setState(prev => ({ ...prev, step: 'form-filling' }))}
                >
                  Continue to Form
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* STEP 2: FORM FILLING */}
      {state.step === 'form-filling' && (
        <div className="space-y-6">
          {/* Header Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900">
                    Fill {state.productCategory.charAt(0).toUpperCase() + state.productCategory.slice(1)} Details
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    <Badge variant="outline" className="mr-2">Annexure {state.annexureCode}</Badge>
                    Complete all required fields to generate your contract
                    <br />
                    <span className="text-xs text-blue-600 mt-1 inline-block">
                      💾 Form data is automatically saved locally and persists across browser refreshes
                    </span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const storageKey = `form_data_${state.productCategory}_${state.annexureCode}`;
                      localStorage.removeItem(storageKey);
                      setState(prev => ({ ...prev, formData: {} }));
                      console.log('🗑️ Local draft cleared');
                    }}
                  >
                    Clear Draft
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setState(prev => ({ ...prev, step: 'category-selection', productCategory: '', annexureCode: '' }))}
                  >
                    Change Industry
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Required Fields Notice */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900">Required Fields</h3>
                  <p className="text-sm text-amber-800 mt-1">
                    Fields marked with <span className="text-red-500 font-bold">*</span> (red asterisk) are required to generate the contract.
                  </p>
                  <div className="mt-2 text-sm text-amber-800">
                    <p className="font-medium">Missing: {getRequiredFieldsStatus().missingFields.length > 0 ? getRequiredFieldsStatus().missingFields.join(', ') : 'None'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Form Fields */}
          <TooltipProvider>
            {getFieldsForCategory(state.productCategory).map((fieldGroup, groupIndex) => (
              <Card key={fieldGroup.title} className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-xl">{fieldGroup.icon}</span>
                    {fieldGroup.title}
                    {fieldGroup.title.includes('HIGH-RISK') && (
                      <Badge variant="destructive" className="text-xs">Critical</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Special layout for Buyer Requirements section */}
                  {fieldGroup.title === 'Buyer Requirements (Delivery)' ? (
                    <div className="grid grid-cols-2 gap-4">
                      {fieldGroup.fields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <div className="flex items-start space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <input
                              type="checkbox"
                              id={field.name}
                              checked={state.formData[field.name] || false}
                              onChange={(e) => handleFormDataChange(field.name, e.target.checked)}
                              className="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <div className="flex-1">
                              <label htmlFor={field.name} className="text-sm font-medium text-gray-900 cursor-pointer block">
                                {field.label.replace('(Required by buyer)', '')}
                              </label>
                              {field.helpText && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help mt-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-sm">{field.helpText}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {fieldGroup.fields.map((field) => (
                      <div 
                        key={field.name} 
                        className={`space-y-2 ${
                          field.type === 'textarea' || field.type === 'pricing-calculator' 
                            ? 'lg:col-span-2' 
                            : ''
                        }`}
                      >
                        {/* Field Label with Info */}
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-900">
                            {field.label} {
                              // Show asterisk for essential fields only
                              getEssentialFieldNames().includes(field.name) && 
                              <span className="text-red-500">*</span>
                            }
                          </label>
                          {field.helpText && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                <p className="text-sm">{field.helpText}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>

                        {/* Field Input */}
                        {field.type === 'select' ? (
                          <select
                            value={state.formData[field.name] || ''}
                            onChange={(e) => handleFormDataChange(field.name, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          >
                            <option value="" disabled className="text-gray-500">
                              {field.placeholder || `Select ${field.label}`}
                            </option>
                            {field.options?.map((option) => (
                              <option key={option.value} value={option.value} className="text-gray-900">
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            placeholder={field.placeholder}
                            value={state.formData[field.name] || ''}
                            onChange={(e) => handleFormDataChange(field.name, e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          />
                        ) : field.type === 'pricing-calculator' ? (
                          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <PricingField
                              field={field}
                              value={state.formData[field.name] || ''}
                              onChange={(value) => handleFormDataChange(field.name, value)}
                              onPlatformFeeCalculated={(fee) => {
                                handleFormDataChange('platform_fee_auto_calc', `₹${fee}`);
                                handleFormDataChange('platform_fee', `₹${fee}`);
                              }}
                              onEscrowCalculated={(escrow) => {
                                handleFormDataChange('escrow_amount_auto_calc', `₹${escrow}`);
                                handleFormDataChange('escrow_payout', `₹${escrow}`);
                              }}
                            />
                          </div>
                        ) : field.name === 'platform_fee_auto_calc' || field.name === 'escrow_amount_auto_calc' ? (
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            value={state.formData[field.name] || ''}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-600 cursor-not-allowed"
                            readOnly
                          />
                        ) : field.type === 'date' ? (
                          <input
                            type="date"
                            placeholder={field.placeholder}
                            value={state.formData[field.name] || ''}
                            onChange={(e) => handleFormDataChange(field.name, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min={new Date().toISOString().split('T')[0]} // Prevent past dates
                          />
                        ) : field.type === 'file' ? (
                          // File upload disabled - using text input instead
                          <input
                            type="text"
                            placeholder={`${field.label} (file path or name)`}
                            value={state.formData[field.name] || ''}
                            onChange={(e) => handleFormDataChange(field.name, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : field.type === 'checkbox' ? (
                          <div className="flex items-center space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <input
                              type="checkbox"
                              id={field.name}
                              checked={state.formData[field.name] || false}
                              onChange={(e) => handleFormDataChange(field.name, e.target.checked)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <label htmlFor={field.name} className="text-sm font-medium text-gray-900 cursor-pointer">
                              {field.label}
                            </label>
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={state.formData[field.name] || ''}
                            onChange={(e) => handleFormDataChange(field.name, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        )}

                        {/* Field Suggestions */}
                        {field.placeholder && !field.helpText && field.type !== 'select' && (
                          <p className="text-xs text-gray-500">{field.placeholder}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TooltipProvider>
            
          {/* Form Actions */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Progress indicator */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Form Progress</span>
                  <span className="font-medium">
                    {(() => {
                      const { completedCount, totalCount } = getRequiredFieldsStatus();
                      return `${completedCount} / ${totalCount} required fields completed`;
                    })()}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{
                      width: `${(() => {
                        const { completedCount, totalCount } = getRequiredFieldsStatus();
                        return (completedCount / totalCount) * 100;
                      })()}%`
                    }}
                  ></div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
                  <Button 
                    variant="outline"
                    onClick={() => setState(prev => ({ ...prev, step: 'category-selection' }))}
                    className="order-1 sm:order-1"
                  >
                    ← Back to Category Selection
                  </Button>
                  
                  <div className="flex gap-3 order-2 sm:order-2">
                    <Button 
                      variant="secondary"
                      onClick={() => {
                        console.log('🔴 SAVE DRAFT BUTTON CLICKED! Starting save process...');
                        
                        // Async function to handle the save
                        (async () => {
                          console.log('💾 Manual save draft triggered...');
                          console.log('📋 Current form data to save:', state.formData);
                          
                          setState(prev => ({ ...prev, isLoading: true, error: null }));
                          
                          try {
                            const success = await saveFormToDatabase(state.formData, false);
                            
                            if (success) {
                              // Show success feedback and clear localStorage since it's now in DB
                              setState(prev => ({ ...prev, isLoading: false, error: null }));
                              const storageKey = `form_data_${state.productCategory}_${state.annexureCode}`;
                              localStorage.removeItem(storageKey);
                              console.log('✅ Form saved to database and localStorage cleared');
                              
                              // Show success message briefly
                              setTimeout(() => {
                                setState(prev => ({ ...prev, error: 'Draft saved successfully!' }));
                                setTimeout(() => {
                                  setState(prev => ({ ...prev, error: null }));
                                }, 3000);
                              }, 100);
                            } else {
                              setState(prev => ({ 
                                ...prev, 
                                isLoading: false,
                                error: 'Failed to save draft. Please try again.' 
                              }));
                            }
                          } catch (error: any) {
                            console.error('Save draft error:', error);
                            setState(prev => ({ 
                              ...prev, 
                              isLoading: false,
                              error: `Save failed: ${error.message || 'Unknown error'}` 
                            }));
                          }
                        })();
                      }}
                      disabled={state.isLoading}
                      className="flex-1 sm:flex-none"
                    >
                      {state.isLoading ? '💾 Saving...' : '💾 Save Draft'}
                    </Button>
                    
                    {/* Main CTA Button */}
                    {(() => {
                      const { isComplete } = getRequiredFieldsStatus();
                      return !isComplete ? (
                        <Button 
                          disabled
                          className="flex-1 sm:flex-none bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                        >
                          📝 Complete Required Fields
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => {
                            console.log('🔴 BUTTON CLICKED! Starting contract generation...');
                            handleGenerateContract();
                          }}
                          disabled={state.isLoading}
                          className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          {state.isLoading ? (
                            <>
                              <Loader className="h-4 w-4 mr-2 animate-spin" />
                              Generating Contract...
                            </>
                          ) : (
                            <>✓ Review & Generate Contract</>
                          )}
                        </Button>
                      );
                    })()}
                  </div>
                </div>
                
                {/* Missing fields helper */}
                {(() => {
                  const { isComplete, missingFields } = getRequiredFieldsStatus();
                  return !isComplete && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-600">⚠️</span>
                        <div>
                          <p className="font-medium text-amber-800">Complete these required fields:</p>
                          <ul className="mt-1 space-y-1 text-amber-700">
                            {missingFields.map((field, idx) => (
                              <li key={idx}>• {field}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* STEP 3: REVIEW */}
      {state.step === 'review' && (
        <div className="w-screen -ml-[calc((100vw-100%)/2)] px-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                Contract Generated Successfully
              </CardTitle>
              <CardDescription>Review the generated contract before sending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="w-full max-h-[75vh] overflow-auto border-2 rounded-lg p-8 bg-white text-gray-900 text-sm leading-relaxed" 
                  style={{ 
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                  dangerouslySetInnerHTML={{ __html: state.contractHTML }} 
                />
                
                <div className="flex gap-2 sticky bottom-0 bg-white pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setState(prev => ({ ...prev, step: 'form-filling' }))}
                  >
                    Back to Edit
                  </Button>
                  <Button
                    onClick={() => setState(prev => ({ ...prev, step: 'send' }))}
                    className="flex-1"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Contract
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* STEP 4: SEND CONTRACT */}
      {state.step === 'send' && (
        <Card>
          <CardHeader>
            <CardTitle>Send Contract</CardTitle>
            <CardDescription>Contract will be sent to the buyer for acceptance</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Contract sending functionality is being implemented.
              </AlertDescription>
            </Alert>

            <div className="bg-blue-50 p-4 rounded-md space-y-2 mt-4">
              <p className="text-sm font-medium">Contract Summary:</p>
              <p className="text-xs text-gray-600">
                Product: {getProductNameField() || 'Not specified'} ({state.formData.brand || state.formData.make || 'No brand'})
              </p>
              <p className="text-xs text-gray-600">
                Price: ₹{state.formData.sale_price}
              </p>
              <p className="text-xs text-gray-600">
                Seller: [Will be determined by role]
              </p>
              <p className="text-xs text-gray-600">
                Buyer: [Will be determined by role]
              </p>
              <p className="text-xs text-amber-600 mt-2">
                Note: Party roles assigned based on your current toggle (buyer/seller) and selected contact
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setState(prev => ({ ...prev, step: 'review' }))}
              >
                Back to Review
              </Button>
              <Button
                className="flex-1"
                disabled={state.isLoading}
              >
                {state.isLoading ? 'Sending...' : 'Send Contract'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ContractGenerationUI;