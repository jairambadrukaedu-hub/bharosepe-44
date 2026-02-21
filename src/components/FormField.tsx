/**
 * Individual Form Field Component
 * Renders different field types with appropriate input controls
 */

import React, { useCallback } from 'react';
import { FormField } from '../types/formTypes';
import '../styles/formField.css';

interface FormFieldProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  showLabel?: boolean;
  showHint?: boolean;
}

export const FormFieldComponent: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  showLabel = true,
  showHint = true,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const target = e.target as HTMLInputElement;
      let newValue: any = target.value;

      if (field.type === 'checkbox' || field.type === 'toggle') {
        newValue = target.checked;
      } else if (field.type === 'number') {
        newValue = target.value ? parseFloat(target.value) : null;
      } else if (field.type === 'multi-select') {
        const selected = Array.from(
          (e.target as HTMLSelectElement).selectedOptions,
          option => option.value
        );
        newValue = selected;
      }

      onChange(newValue);
    },
    [field.type, onChange]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        if (field.type === 'file' && !field.multi) {
          onChange(files[0]);
        } else {
          onChange(Array.from(files));
        }
      }
    },
    [field, onChange]
  );

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            className="form-field__input"
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            minLength={field.minLength}
            maxLength={field.maxLength}
            pattern={field.pattern}
          />
        );

      case 'textarea':
        return (
          <textarea
            className="form-field__textarea"
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            minLength={field.minLength}
            maxLength={field.maxLength}
            rows={field.rows || 4}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            className="form-field__input"
            placeholder={field.placeholder}
            value={value ?? ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            className="form-field__input"
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
          />
        );

      case 'phone':
        return (
          <input
            type="tel"
            className="form-field__input"
            placeholder={field.placeholder}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            pattern="\d{10}"
          />
        );

      case 'date':
        return (
          <input
            type="date"
            className="form-field__input"
            value={value ? new Date(value).toISOString().split('T')[0] : ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            min={field.min?.toString()}
            max={field.max?.toString()}
          />
        );

      case 'time':
        return (
          <input
            type="time"
            className="form-field__input"
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
          />
        );

      case 'select':
        return (
          <select
            className="form-field__select"
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
          >
            <option value="">
              {field.placeholder || `Select ${field.label}`}
            </option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multi-select':
        return (
          <select
            multiple
            className="form-field__select form-field__select--multi"
            value={value || []}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className="form-field__checkbox-label">
            <input
              type="checkbox"
              className="form-field__checkbox"
              checked={value || false}
              onChange={handleChange}
              onBlur={onBlur}
              disabled={disabled}
            />
            <span className="form-field__checkbox-text">{field.checkboxLabel}</span>
          </label>
        );

      case 'radio':
        return (
          <div className="form-field__radio-group">
            {field.options?.map(option => (
              <label key={option.value} className="form-field__radio-label">
                <input
                  type="radio"
                  className="form-field__radio"
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  onBlur={onBlur}
                  disabled={disabled}
                />
                <span className="form-field__radio-text">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'toggle':
        return (
          <div className="form-field__toggle-wrapper">
            <label className="form-field__toggle-label">
              <input
                type="checkbox"
                className="form-field__toggle-input"
                checked={value || false}
                onChange={handleChange}
                onBlur={onBlur}
                disabled={disabled}
              />
              <span className="form-field__toggle-switch" />
              <span className="form-field__toggle-text">
                {value ? 'Yes' : 'No'}
              </span>
            </label>
          </div>
        );

      case 'url':
        return (
          <input
            type="url"
            className="form-field__input"
            placeholder={field.placeholder || 'https://example.com'}
            value={value || ''}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
          />
        );

      case 'file':
        return (
          <div className="form-field__file-input-wrapper">
            <input
              type="file"
              className="form-field__file-input"
              onChange={handleFileChange}
              onBlur={onBlur}
              disabled={disabled}
              multiple={field.multi}
              accept={field.accept}
            />
            {field.fileSize && (
              <span className="form-field__file-hint">
                Max size: {field.fileSize}
              </span>
            )}
          </div>
        );

      case 'textarea-array':
        return (
          <div className="form-field__textarea-array">
            {(value || []).map((item: string, index: number) => (
              <textarea
                key={index}
                className="form-field__textarea form-field__textarea--array-item"
                value={item}
                onChange={(e) => {
                  const newArray = [...(value || [])];
                  newArray[index] = e.target.value;
                  onChange(newArray);
                }}
                placeholder={`Item ${index + 1}`}
                disabled={disabled}
              />
            ))}
            <button
              type="button"
              className="form-field__button form-field__button--add-array"
              onClick={() => onChange([...(value || []), ''])}
              disabled={disabled}
            >
              + Add Another
            </button>
          </div>
        );

      case 'repeatable-text':
        return (
          <div className="form-field__repeatable-text">
            {(value || []).map((item: string, index: number) => (
              <div key={index} className="form-field__repeatable-item">
                <input
                  type="text"
                  className="form-field__input"
                  value={item}
                  onChange={(e) => {
                    const newArray = [...(value || [])];
                    newArray[index] = e.target.value;
                    onChange(newArray);
                  }}
                  placeholder={`${field.label} ${index + 1}`}
                  disabled={disabled}
                />
                <button
                  type="button"
                  className="form-field__button form-field__button--remove"
                  onClick={() => {
                    const newArray = value.filter((_: string, i: number) => i !== index);
                    onChange(newArray);
                  }}
                  disabled={disabled}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="form-field__button form-field__button--add"
              onClick={() => onChange([...(value || []), ''])}
              disabled={disabled}
            >
              + Add Another
            </button>
          </div>
        );

      case 'repeatable-url':
        return (
          <div className="form-field__repeatable-url">
            {(value || []).map((item: string, index: number) => (
              <div key={index} className="form-field__repeatable-item">
                <input
                  type="url"
                  className="form-field__input"
                  value={item}
                  onChange={(e) => {
                    const newArray = [...(value || [])];
                    newArray[index] = e.target.value;
                    onChange(newArray);
                  }}
                  placeholder={`URL ${index + 1}`}
                  disabled={disabled}
                />
                <button
                  type="button"
                  className="form-field__button form-field__button--remove"
                  onClick={() => {
                    const newArray = value.filter((_: string, i: number) => i !== index);
                    onChange(newArray);
                  }}
                  disabled={disabled}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              className="form-field__button form-field__button--add"
              onClick={() => onChange([...(value || []), ''])}
              disabled={disabled}
            >
              + Add URL
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`form-field ${error ? 'form-field--error' : ''}`}>
      {showLabel && field.label && (
        <label className={`form-field__label ${field.mandatory ? 'form-field__label--mandatory' : ''}`}>
          {field.label}
          {field.mandatory && <span className="form-field__required-indicator">*</span>}
        </label>
      )}

      <div className="form-field__input-wrapper">{renderField()}</div>

      {showHint && field.hint && (
        <div className="form-field__hint">{field.hint}</div>
      )}

      {error && (
        <div className="form-field__error">
          <span className="form-field__error-icon">⚠️</span>
          <span className="form-field__error-message">{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormFieldComponent;
