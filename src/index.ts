/**
 * Form Generator - Complete Export Index
 * Central entry point for all form generation utilities and components
 */

// Type Definitions
export type {
  FieldType,
  FormField,
  FormSection,
  FormConfiguration,
  FormRule,
  FormSubmissionData,
  ConditionalRule,
} from './types/formTypes';

// Services
export { FormGenerator } from './services/formGenerator';
export { goodsCommonFields, serviceCommonFields } from './services/commonFieldsConfig';

// Components
export { FormRenderer } from './components/FormRenderer';
export { FormFieldComponent } from './components/FormField';

// Store
export { useFormStore, useFormState } from './store/formStore';

// Common Fields (for external access)
import { goodsCommonFields, serviceCommonFields } from './services/commonFieldsConfig';

export const CommonFields = {
  goods: goodsCommonFields,
  service: serviceCommonFields,
};

/**
 * Main FormGenerator application entry point
 */
export const FormGeneratorApp = {
  // Version
  version: '1.0.0',
  
  // Description
  description: 'Comprehensive form generator based on REFINED_FORM_FIELDS_MANDATORY_OPTIONAL.md',
  
  // Key features
  features: [
    'Dynamic form rendering with 16 field types',
    'Conditional field visibility (IF, CONDITIONAL_BY, APPEARS_IF)',
    'Mandatory/Optional field management',
    'Auto-calculation support',
    'Real-time validation',
    'Form state management with Zustand',
    '1,088 total fields across 22 annexures',
    'Responsive UI with Tailwind CSS',
  ],

  // Statistics
  statistics: {
    totalFields: 1088,
    mandatoryFields: 481,
    optionalFields: 607,
    goodsAnnexures: 12, // A-L
    serviceAnnexures: 10, // A-J
    fieldTypes: 16,
    conditionalRuleTypes: 3,
  },

  // Coverage
  coverage: {
    goods: {
      annexures: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
      labels: [
        'A: Appliances & Electronics',
        'B: Mobile Phones',
        'C: Furniture',
        'D: Vehicles',
        'E: Fashion',
        'F: Jewellery',
        'G: Building Materials',
        'H: Collectibles',
        'I: Industrial Machinery',
        'J: Books',
        'K: Art',
        'L: Instagram/WhatsApp Sellers',
      ],
      totalFields: 362,
    },
    services: {
      annexures: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      labels: [
        'A: Software Development',
        'B: Design',
        'C: Content Creation',
        'D: Photography',
        'E: Coaching',
        'F: Repair',
        'G: Cleaning',
        'H: Marketing',
        'I: Consulting',
        'J: Event Management (13 sub-services)',
      ],
      totalFields: 726,
    },
  },
};

export default FormGeneratorApp;
