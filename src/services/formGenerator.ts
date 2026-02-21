/**
 * Comprehensive Form Generator
 * Handles form configuration, validation, conditional visibility, and rules
 * Based on REFINED_FORM_FIELDS_MANDATORY_OPTIONAL.md
 */

import {
  FormConfiguration,
  FormField,
  FormSection,
  FormSubmissionData,
  ConditionalRule,
  FieldType,
} from '../types/formTypes';

export class FormGenerator {
  /**
   * Validate if a field is visible based on conditional rules
   */
  static isFieldVisible(
    field: FormField,
    formData: Record<string, any>
  ): boolean {
    if (!field.condition) {
      return true;
    }

    const { type, fieldName, triggerValue } = field.condition;

    switch (type) {
      case 'IF':
        // Check if parent field value matches trigger value
        if (Array.isArray(triggerValue)) {
          return triggerValue.includes(formData[fieldName]);
        }
        return formData[fieldName] === triggerValue;

      case 'CONDITIONAL_BY':
        // Check if specific category/annexure is selected
        return formData[fieldName] === triggerValue;

      case 'APPEARS_IF':
        // Check if value exists in multi-select array
        const parentValue = formData[fieldName];
        if (Array.isArray(parentValue)) {
          if (Array.isArray(triggerValue)) {
            return triggerValue.some(val => parentValue.includes(val));
          }
          return parentValue.includes(triggerValue);
        }
        return false;

      default:
        return true;
    }
  }

  /**
   * Get all visible fields for current form state
   */
  static getVisibleFields(
    configuration: FormConfiguration,
    formData: Record<string, any>
  ): FormField[] {
    const visibleFields: FormField[] = [];

    // Add common fields that are visible
    configuration.commonFields.forEach(field => {
      if (this.isFieldVisible(field, formData)) {
        visibleFields.push(field);
      }
    });

    // Add section fields that are visible
    configuration.sections.forEach(section => {
      section.fields.forEach(field => {
        if (this.isFieldVisible(field, formData)) {
          visibleFields.push(field);
        }
      });
    });

    return visibleFields;
  }

  /**
   * Get all visible sections
   */
  static getVisibleSections(
    configuration: FormConfiguration,
    formData: Record<string, any>
  ): FormSection[] {
    return configuration.sections.filter(section => {
      if (!section.condition) {
        return true;
      }
      return this.isFieldVisible(
        { ...section, mandatory: false, order: 0, section: '' } as FormField,
        formData
      );
    });
  }

  /**
   * Validate field value based on type and constraints
   */
  static validateFieldValue(
    field: FormField,
    value: any
  ): { valid: boolean; error?: string } {
    // Check if mandatory field is empty
    if (field.mandatory && (value === null || value === undefined || value === '')) {
      return {
        valid: false,
        error: `${field.label} is required`,
      };
    }

    // Allow empty optional fields
    if (!field.mandatory && (value === null || value === undefined || value === '')) {
      return { valid: true };
    }

    // Validate by field type
    switch (field.type) {
      case 'text':
      case 'textarea':
        if (typeof value !== 'string') {
          return { valid: false, error: `${field.label} must be text` };
        }
        if (field.minLength && value.length < field.minLength) {
          return {
            valid: false,
            error: `${field.label} must be at least ${field.minLength} characters`,
          };
        }
        if (field.maxLength && value.length > field.maxLength) {
          return {
            valid: false,
            error: `${field.label} must not exceed ${field.maxLength} characters`,
          };
        }
        if (field.pattern) {
          const regex = new RegExp(field.pattern);
          if (!regex.test(value)) {
            return { valid: false, error: `${field.label} format is invalid` };
          }
        }
        break;

      case 'number':
        if (typeof value !== 'number') {
          return { valid: false, error: `${field.label} must be a number` };
        }
        if (field.min !== undefined && value < field.min) {
          return {
            valid: false,
            error: `${field.label} must be at least ${field.min}`,
          };
        }
        if (field.max !== undefined && value > field.max) {
          return {
            valid: false,
            error: `${field.label} must not exceed ${field.max}`,
          };
        }
        break;

      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return { valid: false, error: `${field.label} must be a valid email` };
        }
        break;

      case 'phone':
        if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
          return { valid: false, error: `${field.label} must be a valid phone number` };
        }
        break;

      case 'url':
        try {
          new URL(value);
        } catch {
          return { valid: false, error: `${field.label} must be a valid URL` };
        }
        break;

      case 'date':
        if (!(value instanceof Date) && typeof value !== 'string') {
          return { valid: false, error: `${field.label} must be a valid date` };
        }
        break;

      case 'select':
        if (!field.options?.some(opt => opt.value === value)) {
          return { valid: false, error: `${field.label} has invalid selection` };
        }
        break;

      case 'multi-select':
        if (!Array.isArray(value)) {
          return { valid: false, error: `${field.label} must be an array` };
        }
        if (value.length === 0) {
          return {
            valid: false,
            error: `${field.label} must have at least one selection`,
          };
        }
        const validOptions = field.options?.map(opt => opt.value) || [];
        if (!value.every(v => validOptions.includes(v))) {
          return { valid: false, error: `${field.label} has invalid selections` };
        }
        break;

      case 'checkbox':
      case 'toggle':
        if (typeof value !== 'boolean') {
          return { valid: false, error: `${field.label} must be yes or no` };
        }
        break;

      case 'radio':
        if (!field.options?.some(opt => opt.value === value)) {
          return { valid: false, error: `${field.label} has invalid selection` };
        }
        break;

      case 'file':
        if (typeof value !== 'string' && !(value instanceof File)) {
          return { valid: false, error: `${field.label} must be a file` };
        }
        break;
    }

    // Custom validation
    if (field.validate) {
      const result = field.validate(value);
      if (result !== true) {
        return {
          valid: false,
          error: typeof result === 'string' ? result : `${field.label} validation failed`,
        };
      }
    }

    return { valid: true };
  }

  /**
   * Validate entire form submission
   */
  static validateFormSubmission(
    configuration: FormConfiguration,
    formData: Record<string, any>
  ): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    const visibleFields = this.getVisibleFields(configuration, formData);

    visibleFields.forEach(field => {
      const validation = this.validateFieldValue(field, formData[field.id]);
      if (!validation.valid) {
        errors[field.id] = validation.error || 'Validation failed';
      }
    });

    // Run form-level rules
    if (configuration.rules) {
      configuration.rules.forEach(rule => {
        const ruleResult = rule.implementation(formData);
        if (ruleResult !== true && typeof ruleResult === 'string') {
          errors[rule.description] = ruleResult;
        }
      });
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Calculate form completion percentage
   */
  static calculateCompletion(
    configuration: FormConfiguration,
    formData: Record<string, any>
  ): number {
    const visibleFields = this.getVisibleFields(configuration, formData);
    if (visibleFields.length === 0) return 0;

    const filledFields = visibleFields.filter(field => {
      const value = formData[field.id];
      return value !== null && value !== undefined && value !== '' && value !== false;
    });

    return Math.round((filledFields.length / visibleFields.length) * 100);
  }

  /**
   * Get all mandatory fields count (visible only)
   */
  static getMandatoryFieldsCount(
    configuration: FormConfiguration,
    formData: Record<string, any>
  ): number {
    return this.getVisibleFields(configuration, formData).filter(
      f => f.mandatory
    ).length;
  }

  /**
   * Get all optional fields count (visible only)
   */
  static getOptionalFieldsCount(
    configuration: FormConfiguration,
    formData: Record<string, any>
  ): number {
    return this.getVisibleFields(configuration, formData).filter(
      f => !f.mandatory
    ).length;
  }

  /**
   * Create submission data object
   */
  static createSubmission(
    configuration: FormConfiguration,
    formData: Record<string, any>
  ): FormSubmissionData {
    const validation = this.validateFormSubmission(configuration, formData);
    const completion = this.calculateCompletion(configuration, formData);

    return {
      formId: configuration.id,
      category: configuration.category,
      annexure: configuration.annexure,
      serviceType: configuration.serviceType,
      data: formData,
      submittedAt: new Date(),
      completionPercentage: completion,
      errors: validation.valid ? undefined : validation.errors,
    };
  }

  /**
   * Get field by ID from configuration
   */
  static getFieldById(
    configuration: FormConfiguration,
    fieldId: string
  ): FormField | undefined {
    // Check common fields
    let field = configuration.commonFields.find(f => f.id === fieldId);
    if (field) return field;

    // Check section fields
    for (const section of configuration.sections) {
      field = section.fields.find(f => f.id === fieldId);
      if (field) return field;
    }

    return undefined;
  }

  /**
   * Get all fields from configuration (common + sections)
   */
  static getAllFields(configuration: FormConfiguration): FormField[] {
    const allFields: FormField[] = [...configuration.commonFields];

    configuration.sections.forEach(section => {
      allFields.push(...section.fields);
    });

    return allFields;
  }

  /**
   * Check if field has conditional visibility
   */
  static hasConditionalVisibility(field: FormField): boolean {
    return !!field.condition;
  }

  /**
   * Get dependent fields (fields that depend on this field)
   */
  static getDependentFields(
    configuration: FormConfiguration,
    fieldId: string
  ): FormField[] {
    const allFields = this.getAllFields(configuration);
    return allFields.filter(
      f => f.condition?.fieldName === fieldId
    );
  }

  /**
   * Get fields by section
   */
  static getFieldsBySection(
    configuration: FormConfiguration,
    sectionId: string
  ): FormField[] {
    const section = configuration.sections.find(s => s.id === sectionId);
    return section?.fields || [];
  }

  /**
   * Reset form to initial state
   */
  static resetFormData(
    configuration: FormConfiguration
  ): Record<string, any> {
    const formData: Record<string, any> = {};
    const allFields = this.getAllFields(configuration);

    allFields.forEach(field => {
      if (field.defaultValue !== undefined) {
        formData[field.id] = field.defaultValue;
      } else {
        formData[field.id] = field.type === 'multi-select' ? [] : null;
      }
    });

    return formData;
  }

  /**
   * Auto-calculate fields based on rules
   */
  static autoCalculateFields(
    configuration: FormConfiguration,
    formData: Record<string, any>
  ): Record<string, any> {
    const updatedData = { ...formData };

    configuration.rules?.forEach(rule => {
      if (rule.type === 'AUTO_CALCULATE') {
        rule.implementation(updatedData);
      }
    });

    return updatedData;
  }

  /**
   * Get form summary statistics
   */
  static getFormSummary(
    configuration: FormConfiguration,
    formData?: Record<string, any>
  ) {
    return {
      formId: configuration.id,
      title: configuration.title,
      category: configuration.category,
      annexure: configuration.annexure,
      totalFields: configuration.totalFields,
      totalMandatory: configuration.totalMandatory,
      totalOptional: configuration.totalOptional,
      sections: configuration.sections.length,
      commonFields: configuration.commonFields.length,
      ...(formData && {
        visibleFields: this.getVisibleFields(configuration, formData).length,
        completion: this.calculateCompletion(configuration, formData),
        mandatoryFilled: this.getVisibleFields(configuration, formData).filter(
          f => f.mandatory && formData[f.id]
        ).length,
      }),
    };
  }
}

export default FormGenerator;
