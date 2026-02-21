/**
 * Dynamic Form Renderer Component
 * Renders form fields based on configuration with conditional visibility
 */

import React, { useCallback, useMemo } from 'react';
import { FormConfiguration, FormField } from '../types/formTypes';
import FormGenerator from '../services/formGenerator';
import FormFieldComponent from './FormField';
import '../styles/formRenderer.css';

interface FormRendererProps {
  configuration: FormConfiguration;
  formData: Record<string, any>;
  onChange: (fieldId: string, value: any) => void;
  onBlur?: (fieldId: string) => void;
  errors?: Record<string, string>;
  disabled?: boolean;
  showValidation?: boolean;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  configuration,
  formData,
  onChange,
  onBlur,
  errors = {},
  disabled = false,
  showValidation = true,
}) => {
  // Get visible fields and sections
  const visibleSections = useMemo(
    () => FormGenerator.getVisibleSections(configuration, formData),
    [configuration, formData]
  );

  // Calculate form statistics
  const stats = useMemo(() => {
    const visibleFields = FormGenerator.getVisibleFields(configuration, formData);
    const mandatoryFields = visibleFields.filter(f => f.mandatory);
    const filledMandatory = mandatoryFields.filter(
      f => formData[f.id] !== null && formData[f.id] !== undefined && formData[f.id] !== ''
    );

    return {
      totalVisible: visibleFields.length,
      totalMandatory: mandatoryFields.length,
      filledMandatory: filledMandatory.length,
      completion: FormGenerator.calculateCompletion(configuration, formData),
    };
  }, [configuration, formData]);

  // Handle field change with auto-calculation
  const handleFieldChange = useCallback(
    (fieldId: string, value: any) => {
      onChange(fieldId, value);
    },
    [onChange]
  );

  // Handle field blur for validation
  const handleFieldBlur = useCallback(
    (fieldId: string) => {
      onBlur?.(fieldId);
    },
    [onBlur]
  );

  // Get conditional info for a field
  const getConditionalInfo = useCallback(
    (field: FormField): string | null => {
      if (!field.condition) return null;

      const { type, fieldName, triggerValue } = field.condition;
      const parentField = FormGenerator.getFieldById(configuration, fieldName);

      if (!parentField) return null;

      switch (type) {
        case 'IF':
          if (Array.isArray(triggerValue)) {
            return `Shows when ${parentField.label} is ${triggerValue.join(' or ')}`;
          }
          return `Shows when ${parentField.label} is ${triggerValue}`;

        case 'CONDITIONAL_BY':
          return `Appears for ${triggerValue}`;

        case 'APPEARS_IF':
          if (Array.isArray(triggerValue)) {
            return `Appears when ${triggerValue.join(' or ')} is selected`;
          }
          return `Appears when ${triggerValue} is selected`;

        default:
          return null;
      }
    },
    [configuration]
  );

  if (visibleSections.length === 0) {
    return (
      <div className="form-renderer form-renderer--empty">
        <p>No fields to display for current selections.</p>
      </div>
    );
  }

  return (
    <div className="form-renderer">
      {/* Form Header with Statistics */}
      <div className="form-renderer__header">
        <div className="form-renderer__title-section">
          <h1 className="form-renderer__title">{configuration.title}</h1>
          {configuration.description && (
            <p className="form-renderer__description">{configuration.description}</p>
          )}
        </div>

        <div className="form-renderer__stats">
          <div className="form-renderer__stat">
            <span className="form-renderer__stat-label">Mandatory:</span>
            <span className="form-renderer__stat-value">
              {stats.filledMandatory}/{stats.totalMandatory}
            </span>
          </div>
          <div className="form-renderer__stat">
            <span className="form-renderer__stat-label">Completion:</span>
            <span className="form-renderer__stat-value">{stats.completion}%</span>
          </div>
          <div className="form-renderer__progress">
            <div
              className="form-renderer__progress-bar"
              style={{ width: `${stats.completion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="form-renderer__sections">
        {visibleSections.map((section, sectionIndex) => (
          <section
            key={section.id}
            className="form-renderer__section"
            id={`section-${section.id}`}
          >
            {/* Section Header */}
            <div className="form-renderer__section-header">
              <h2 className="form-renderer__section-title">
                <span className="form-renderer__section-number">
                  {sectionIndex + 1}
                </span>
                {section.title}
              </h2>
              {section.description && (
                <p className="form-renderer__section-description">
                  {section.description}
                </p>
              )}
            </div>

            {/* Section Fields */}
            <div className="form-renderer__fields">
              {section.fields
                .filter(field =>
                  FormGenerator.isFieldVisible(field, formData)
                )
                .map(field => {
                  const fieldError = errors[field.id];
                  const conditionalInfo = getConditionalInfo(field);

                  return (
                    <div
                      key={field.id}
                      className={`form-renderer__field-wrapper ${
                        field.mandatory ? 'form-renderer__field-wrapper--mandatory' : ''
                      } ${fieldError ? 'form-renderer__field-wrapper--error' : ''}`}
                      id={`field-${field.id}`}
                    >
                      {/* Field Component */}
                      <FormFieldComponent
                        field={field}
                        value={formData[field.id]}
                        onChange={(value) =>
                          handleFieldChange(field.id, value)
                        }
                        onBlur={() => handleFieldBlur(field.id)}
                        error={fieldError}
                        disabled={disabled}
                        showLabel={true}
                        showHint={true}
                      />

                      {/* Conditional Info */}
                      {conditionalInfo && (
                        <div className="form-renderer__conditional-info">
                          <span className="form-renderer__conditional-icon">
                            ℹ️
                          </span>
                          <span className="form-renderer__conditional-text">
                            {conditionalInfo}
                          </span>
                        </div>
                      )}

                      {/* Disclaimer */}
                      {field.disclaimer && (
                        <div className="form-renderer__disclaimer">
                          <span className="form-renderer__disclaimer-icon">
                            ⚠️
                          </span>
                          <span className="form-renderer__disclaimer-text">
                            {field.disclaimer}
                          </span>
                        </div>
                      )}

                      {/* Help Text */}
                      {field.helpText && (
                        <div className="form-renderer__help-text">
                          {field.helpText}
                        </div>
                      )}

                      {/* Field Validation Error */}
                      {showValidation && fieldError && (
                        <div className="form-renderer__error-message">
                          <span className="form-renderer__error-icon">❌</span>
                          <span className="form-renderer__error-text">
                            {fieldError}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        ))}
      </div>

      {/* Common Fields Section (if any are visible) */}
      {FormGenerator.getVisibleFields(configuration, formData)
        .filter(f =>
          configuration.commonFields.find(cf => cf.id === f.id)
        ).length > 0 && (
        <section className="form-renderer__section form-renderer__section--common">
          <div className="form-renderer__section-header">
            <h2 className="form-renderer__section-title">
              <span className="form-renderer__section-number">*</span>
              Common Information
            </h2>
            <p className="form-renderer__section-description">
              These fields are applicable to all product types.
            </p>
          </div>

          <div className="form-renderer__fields">
            {configuration.commonFields
              .filter(field =>
                FormGenerator.isFieldVisible(field, formData)
              )
              .map(field => {
                const fieldError = errors[field.id];

                return (
                  <div
                    key={field.id}
                    className={`form-renderer__field-wrapper ${
                      field.mandatory
                        ? 'form-renderer__field-wrapper--mandatory'
                        : ''
                    } ${fieldError ? 'form-renderer__field-wrapper--error' : ''}`}
                    id={`field-${field.id}`}
                  >
                    <FormFieldComponent
                      field={field}
                      value={formData[field.id]}
                      onChange={(value) =>
                        handleFieldChange(field.id, value)
                      }
                      onBlur={() => handleFieldBlur(field.id)}
                      error={fieldError}
                      disabled={disabled}
                      showLabel={true}
                      showHint={true}
                    />

                    {field.disclaimer && (
                      <div className="form-renderer__disclaimer">
                        <span className="form-renderer__disclaimer-icon">
                          ⚠️
                        </span>
                        <span className="form-renderer__disclaimer-text">
                          {field.disclaimer}
                        </span>
                      </div>
                    )}

                    {showValidation && fieldError && (
                      <div className="form-renderer__error-message">
                        <span className="form-renderer__error-icon">❌</span>
                        <span className="form-renderer__error-text">
                          {fieldError}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </section>
      )}

      {/* Form Summary */}
      <div className="form-renderer__footer">
        <div className="form-renderer__summary">
          <p>
            <strong>Total Visible Fields:</strong> {stats.totalVisible}
          </p>
          <p>
            <strong>Mandatory Fields Completed:</strong>{' '}
            {stats.filledMandatory}/{stats.totalMandatory}
          </p>
          <p>
            <strong>Form Completion:</strong> {stats.completion}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormRenderer;
