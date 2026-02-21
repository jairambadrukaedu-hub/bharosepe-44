/**
 * Form State Management Store
 * Zustand store for managing form state across the application
 */

import { create } from 'zustand';
import { FormConfiguration, FormSubmissionData } from '../types/formTypes';
import FormGenerator from '../services/formGenerator';

interface FormStore {
  // Current form configuration
  currentConfiguration: FormConfiguration | null;
  
  // Form data
  formData: Record<string, any>;
  
  // Validation errors
  errors: Record<string, string>;
  
  // Form state
  isLoading: boolean;
  isDirty: boolean;
  isSubmitted: boolean;
  
  // Form statistics
  completion: number;
  mandatoryFilled: number;
  mandatoryTotal: number;
  
  // Actions
  setConfiguration: (config: FormConfiguration) => void;
  setFormData: (data: Record<string, any>) => void;
  updateField: (fieldId: string, value: any) => void;
  setErrors: (errors: Record<string, string>) => void;
  setError: (fieldId: string, error: string) => void;
  clearError: (fieldId: string) => void;
  
  // Form operations
  resetForm: () => void;
  validateForm: () => boolean;
  submitForm: () => Promise<FormSubmissionData | null>;
  
  // State management
  setLoading: (loading: boolean) => void;
  setDirty: (dirty: boolean) => void;
  setSubmitted: (submitted: boolean) => void;
  
  // Statistics
  updateStatistics: () => void;
}

export const useFormStore = create<FormStore>((set, get) => ({
  currentConfiguration: null,
  formData: {},
  errors: {},
  isLoading: false,
  isDirty: false,
  isSubmitted: false,
  completion: 0,
  mandatoryFilled: 0,
  mandatoryTotal: 0,

  setConfiguration: (config: FormConfiguration) => {
    set({
      currentConfiguration: config,
      formData: FormGenerator.resetFormData(config),
      errors: {},
      isDirty: false,
      isSubmitted: false,
    });
    get().updateStatistics();
  },

  setFormData: (data: Record<string, any>) => {
    set({ formData: data, isDirty: true });
    get().updateStatistics();
  },

  updateField: (fieldId: string, value: any) => {
    set(state => ({
      formData: {
        ...state.formData,
        [fieldId]: value,
      },
      isDirty: true,
    }));
    get().clearError(fieldId);
    get().updateStatistics();
  },

  setErrors: (errors: Record<string, string>) => {
    set({ errors });
  },

  setError: (fieldId: string, error: string) => {
    set(state => ({
      errors: {
        ...state.errors,
        [fieldId]: error,
      },
    }));
  },

  clearError: (fieldId: string) => {
    set(state => {
      const { [fieldId]: _, ...rest } = state.errors;
      return { errors: rest };
    });
  },

  resetForm: () => {
    const { currentConfiguration } = get();
    if (currentConfiguration) {
      set({
        formData: FormGenerator.resetFormData(currentConfiguration),
        errors: {},
        isDirty: false,
        isSubmitted: false,
      });
      get().updateStatistics();
    }
  },

  validateForm: () => {
    const { currentConfiguration, formData } = get();
    if (!currentConfiguration) return false;

    const validation = FormGenerator.validateFormSubmission(
      currentConfiguration,
      formData
    );

    if (!validation.valid) {
      set({ errors: validation.errors });
      return false;
    }

    set({ errors: {} });
    return true;
  },

  submitForm: async () => {
    const { currentConfiguration, formData } = get();
    if (!currentConfiguration) return null;

    set({ isLoading: true });

    try {
      // Validate before submission
      if (!get().validateForm()) {
        set({ isLoading: false });
        return null;
      }

      // Create submission data
      const submission = FormGenerator.createSubmission(
        currentConfiguration,
        formData
      );

      // Mark form as submitted
      set({ isSubmitted: true, isLoading: false });

      // Return submission data (caller will handle API call)
      return submission;
    } catch (error) {
      console.error('Form submission error:', error);
      set({ isLoading: false });
      return null;
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setDirty: (dirty: boolean) => {
    set({ isDirty: dirty });
  },

  setSubmitted: (submitted: boolean) => {
    set({ isSubmitted: submitted });
  },

  updateStatistics: () => {
    const { currentConfiguration, formData } = get();
    if (!currentConfiguration) return;

    const visibleFields = FormGenerator.getVisibleFields(
      currentConfiguration,
      formData
    );

    const mandatoryFields = visibleFields.filter(f => f.mandatory);
    const filledMandatory = mandatoryFields.filter(
      f => formData[f.id] !== null &&
           formData[f.id] !== undefined &&
           formData[f.id] !== '' &&
           formData[f.id] !== false
    );

    const completion = FormGenerator.calculateCompletion(
      currentConfiguration,
      formData
    );

    set({
      completion,
      mandatoryFilled: filledMandatory.length,
      mandatoryTotal: mandatoryFields.length,
    });
  },
}));

/**
 * Hook to use form store with automatic statistics update
 */
export const useFormState = () => {
  const store = useFormStore();
  return {
    ...store,
    canSubmit: store.mandatoryFilled === store.mandatoryTotal,
    isValid: Object.keys(store.errors).length === 0,
  };
};

export default useFormStore;
