/**
 * Comprehensive Form Field Type Definitions
 * Based on REFINED_FORM_FIELDS_MANDATORY_OPTIONAL.md
 */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'phone'
  | 'date'
  | 'time'
  | 'select'
  | 'multi-select'
  | 'checkbox'
  | 'radio'
  | 'toggle'
  | 'url'
  | 'file'
  | 'textarea-array'
  | 'repeatable-text'
  | 'repeatable-url';

export type FieldCategory =
  | 'goods'
  | 'service'
  | 'common-goods'
  | 'common-service';

export type GoodsAnnexure =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M';

export type ServiceAnnexure =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J';

export type EventServiceType =
  | 'Event Planner'
  | 'Decoration Team'
  | 'Catering Service'
  | 'Sound & DJ Service'
  | 'Lighting Team'
  | 'Makeup Artist'
  | 'Host/Anchor/MC'
  | 'Event Staffing'
  | 'Logistics & Transport'
  | 'Hospitality & Guest Support'
  | 'Floral Service'
  | 'Stage Setup Team'
  | 'Custom Service';

export interface FieldOption {
  label: string;
  value: string;
  description?: string;
}

export interface ConditionalRule {
  /**
   * Type of condition:
   * - 'IF': Show field if condition equals value
   * - 'CONDITIONAL_BY': Show section based on parent field selection
   * - 'APPEARS_IF': Show section if specific option is selected in multi-select
   */
  type: 'IF' | 'CONDITIONAL_BY' | 'APPEARS_IF';

  /**
   * Parent field name to watch
   */
  fieldName: string;

  /**
   * Value or values to trigger visibility
   */
  triggerValue?: string | string[];

  /**
   * Description of the condition for UI
   */
  description?: string;
}

export interface FormField {
  /**
   * Unique field identifier
   */
  id: string;

  /**
   * Field display name/label
   */
  label: string;

  /**
   * Field type (text, select, date, etc.)
   */
  type: FieldType;

  /**
   * Field placeholder or hint text
   */
  placeholder?: string;

  /**
   * Field description/help text
   */
  description?: string;

  /**
   * Is this field mandatory?
   */
  mandatory: boolean;

  /**
   * Available options for select/multi-select/radio
   */
  options?: FieldOption[];

  /**
   * Validation pattern (regex)
   */
  pattern?: string;

  /**
   * Min length for text fields
   */
  minLength?: number;

  /**
   * Max length for text fields
   */
  maxLength?: number;

  /**
   * Min value for number fields
   */
  min?: number;

  /**
   * Max value for number fields
   */
  max?: number;

  /**
   * Default value
   */
  defaultValue?: any;

  /**
   * Conditional visibility rules
   */
  condition?: ConditionalRule;

  /**
   * For file uploads - accepted file types
   */
  accept?: string;

  /**
   * For file uploads - max file size in MB
   */
  maxFileSize?: number;

  /**
   * For file uploads - allow multiple files?
   */
  allowMultiple?: boolean;

  /**
   * Custom validation function
   */
  validate?: (value: any) => boolean | string;

  /**
   * Display order within section
   */
  order: number;

  /**
   * Section this field belongs to
   */
  section: string;

  /**
   * Any disclaimers or special notes
   */
  disclaimer?: string;
}

export interface FormSection {
  /**
   * Section identifier
   */
  id: string;

  /**
   * Section title
   */
  title: string;

  /**
   * Section description
   */
  description?: string;

  /**
   * All fields in this section
   */
  fields: FormField[];

  /**
   * Is this section collapsible?
   */
  collapsible?: boolean;

  /**
   * Display order
   */
  order: number;

  /**
   * Conditional visibility for entire section
   */
  condition?: ConditionalRule;
}

export interface FormConfiguration {
  /**
   * Form identifier
   */
  id: string;

  /**
   * Form title
   */
  title: string;

  /**
   * Form description
   */
  description?: string;

  /**
   * Type of form (goods or service)
   */
  category: FieldCategory;

  /**
   * Which annexure (A-L for goods, A-J for services)
   */
  annexure?: GoodsAnnexure | ServiceAnnexure;

  /**
   * For service forms - which sub-service type
   */
  serviceType?: string;

  /**
   * All sections in this form
   */
  sections: FormSection[];

  /**
   * Common fields (inherited by category/annexure)
   */
  commonFields: FormField[];

  /**
   * Total mandatory fields
   */
  totalMandatory: number;

  /**
   * Total optional fields
   */
  totalOptional: number;

  /**
   * Total fields
   */
  totalFields: number;

  /**
   * Form submission rules
   */
  rules?: FormRule[];
}

export interface FormRule {
  /**
   * Rule type
   */
  type:
    | 'REQUIRE_ALL_MANDATORY'
    | 'REQUIRE_CONDITIONAL'
    | 'ALLOW_OPTIONAL'
    | 'VALIDATE_INTERDEPENDENCE'
    | 'AUTO_CALCULATE';

  /**
   * Rule description
   */
  description: string;

  /**
   * Fields affected by this rule
   */
  affectedFields: string[];

  /**
   * Rule implementation
   */
  implementation: (formData: Record<string, any>) => boolean | string;
}

export interface FormSubmissionData {
  /**
   * Form configuration ID
   */
  formId: string;

  /**
   * Category (goods/service)
   */
  category: FieldCategory;

  /**
   * Annexure type
   */
  annexure?: GoodsAnnexure | ServiceAnnexure;

  /**
   * Service type (for service forms)
   */
  serviceType?: string;

  /**
   * All submitted form data
   */
  data: Record<string, any>;

  /**
   * Timestamp of submission
   */
  submittedAt: Date;

  /**
   * Form completion percentage
   */
  completionPercentage: number;

  /**
   * Validation errors (if any)
   */
  errors?: Record<string, string>;
}

/**
 * Appliance Types for conditional fields
 */
export const APPLIANCE_TYPES = [
  'TV',
  'AC',
  'Fridge',
  'Washing Machine',
  'Microwave',
  'Geyser',
  'Laptop',
  'Desktop',
  'Gaming Console',
  'Camera',
  'Other',
] as const;

/**
 * Event types for Event Planner sub-service
 */
export const EVENT_TYPES = [
  'Wedding',
  'Corporate',
  'Birthday',
  'Anniversary',
  'Engagement',
  'Mehendi',
  'Haldi',
  'Reception',
  'Graduation',
  'Social',
  'Conference',
  'Other',
] as const;

/**
 * Delivery methods for goods
 */
export const DELIVERY_METHODS = [
  'Courier',
  'Pickup',
  'In-person',
] as const;

/**
 * Return options
 */
export const RETURN_OPTIONS = [
  'Yes - Full returns accepted',
  'No - No returns accepted',
  'Partial - Returns accepted only if damaged/defective',
] as const;

/**
 * Inspection window hours
 */
export const INSPECTION_WINDOW_OPTIONS = [
  '6 hours',
  '12 hours',
  '24 hours',
  '48 hours',
  'Custom',
] as const;
