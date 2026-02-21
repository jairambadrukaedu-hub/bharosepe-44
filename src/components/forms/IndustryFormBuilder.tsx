/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * INDUSTRY-SPECIFIC FORM BUILDER
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Renders beautiful, user-friendly forms for all 12 industry categories
 * - Smart validation and conditional fields
 * - Multi-step progress tracking
 * - Auto-save drafts functionality
 * - Accessibility-first design
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  CircularProgress,
  Alert,
  Chip,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import MetadataExtractor from '@/components/MetadataExtractor';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'email' | 'tel' | 'date' | 'select' | 'checkbox' | 'radio' | 'file';
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: (value: any) => string | null;
  conditional?: (formData: Record<string, any>) => boolean;
  multiline?: boolean;
  multiple?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  accept?: string;
  info?: string;
}

export interface FormSection {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  fields: FormField[];
  optional?: boolean;
}

export interface IndustryFormConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  sections: FormSection[];
  estimatedTime?: number; // in minutes
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export interface FormErrors {
  [fieldName: string]: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: '16px',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  backgroundColor: '#FFFFFF',
  border: 'none',
  borderRadius: '12px',
  overflow: 'hidden',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  padding: '0 16px',
  background: '#000000',
  color: '#FFFFFF',
  borderRadius: '12px 12px 0 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  height: '44px',
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const FieldWrapper = styled(Box)(({ theme }) => ({
  marginBottom: '10px',
  '&:last-child': {
    marginBottom: 0,
  },
}));

const FieldLabelWithInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(1),
}));

const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  fontWeight: 700,
  color: '#1a1a1a',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const InfoButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.info.main,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const HelperIcon = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  marginLeft: theme.spacing(0.5),
  color: theme.palette.primary.main,
  cursor: 'help',
  fontSize: '0.9rem',
  fontWeight: 'bold',
}));

// ═══════════════════════════════════════════════════════════════════════════════
// PRICING SUMMARY COMPONENT - SHOWS SALE PRICE + 1% PLATFORM FEE
// ═══════════════════════════════════════════════════════════════════════════════

const PricingCard = styled(Paper)(({ theme }) => ({
  padding: '16px 20px',
  marginBottom: theme.spacing(2),
  background: '#FFFFFF',
  borderRadius: '12px',
  border: '1px solid #E5E7EB',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
}));

const PricingRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
  paddingBottom: '10px',
  borderBottom: '1px solid #F3F4F6',
  '&:last-child': {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottom: 'none',
  },
}));

const PricingLabel = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: 500,
  color: '#6B7280',
}));

const PricingValue = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151',
}));

const TotalValue = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 700,
  color: '#111827',
}));

interface PricingSummaryProps {
  salePrice: number | string | undefined;
}

const PricingSummary: React.FC<PricingSummaryProps> = ({ salePrice }) => {
  const price = parseFloat(String(salePrice)) || 0;
  const platformFee = price * 0.01; // 1% fee
  const total = price + platformFee;

  // Only show if price is valid and greater than 0
  if (price <= 0) {
    return null;
  }

  return (
    <PricingCard elevation={1}>
      <Stack spacing={0.5}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#111827', mb: 0.5, fontSize: '13px' }}>
          Pricing Summary
        </Typography>
        
        <PricingRow>
          <PricingLabel>Sale Price:</PricingLabel>
          <PricingValue>₹ {price.toFixed(2)}</PricingValue>
        </PricingRow>

        <PricingRow>
          <PricingLabel>Platform Fee (1%):</PricingLabel>
          <PricingValue>₹ {platformFee.toFixed(2)}</PricingValue>
        </PricingRow>

        <PricingRow>
          <PricingLabel sx={{ fontSize: '13px', fontWeight: 600 }}>Total:</PricingLabel>
          <TotalValue>₹ {total.toFixed(2)}</TotalValue>
        </PricingRow>
      </Stack>
    </PricingCard>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// Helper component to render field label with optional info icon
const FieldLabelComponent: React.FC<{
  label: string;
  required?: boolean;
  info?: string;
}> = ({ label, required, info }) => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    mb: 0.75, 
    width: '100%',
    gap: 1.5
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography sx={{ 
        fontSize: '14px',
        fontWeight: 700,
        color: '#000000',
        letterSpacing: '-0.3px'
      }}>
        {label}
      </Typography>
      {required && <span style={{ color: '#EF4444', fontWeight: 700, fontSize: '16px' }}>*</span>}
    </Box>
    {info && (
      <Tooltip title={info} arrow placement="top" sx={{ cursor: 'help' }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1.5px solid #D1D5DB',
          color: '#374151',
          fontSize: '12px',
          fontWeight: 700,
          flexShrink: 0,
          cursor: 'help',
          transition: 'all 0.2s ease',
          minHeight: '44px',
          minWidth: '44px',
          '&:hover': {
            borderColor: '#4F46E5',
            color: '#4F46E5',
            backgroundColor: '#F3F4F6'
          }
        }}>
          i
        </Box>
      </Tooltip>
    )}
  </Box>
);

interface FieldInputProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  disabled?: boolean;
}

// Shared TextInput styling configuration
const textInputSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    '& fieldset': {
      borderColor: '#E5E7EB',
      borderWidth: '1.2px',
    },
    '&:hover fieldset': {
      borderColor: '#9CA3AF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4F46E5',
      borderWidth: '1.5px',
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
    },
    '&.Mui-disabled': {
      backgroundColor: '#F9FAFB',
      '& fieldset': {
        borderColor: '#E5E7EB',
      }
    }
  },
  '& .MuiOutlinedInput-input': {
    padding: '10px 12px',
    fontSize: '14px',
    color: '#374151',
    fontWeight: 400,
    '&::placeholder': {
      color: '#9CA3AF',
      opacity: 0.8,
      fontWeight: 400,
    }
  },
  '& .MuiFormHelperText-root': {
    marginTop: '4px',
    fontSize: '12px',
    color: '#6B7280',
  }
};

export const FieldInput: React.FC<FieldInputProps> = ({
  field,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const hasError = !!error;

  switch (field.type) {
    case 'textarea':
      return (
        <Box sx={{ mb: 1.5 }}>
          <FieldLabelComponent label={field.label} required={field.required} info={field.info} />
          <TextField
            fullWidth
            multiline
            rows={field.rows || 4}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            error={!!error}
            helperText={error || field.helperText}
            disabled={disabled}
            variant="outlined"
            sx={textInputSx}
          />
        </Box>
      );

    case 'number':
      return (
        <Box sx={{ mb: 1.5 }}>
          <FieldLabelComponent label={field.label} required={field.required} info={field.info} />
          <TextField
            fullWidth
            type="number"
            value={value || ''}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
            placeholder={field.placeholder}
            error={!!error}
            helperText={error || field.helperText}
            disabled={disabled}
            variant="outlined"
            inputProps={{
              min: field.min,
              max: field.max,
              step: field.step || 1,
            }}
            sx={textInputSx}
          />
        </Box>
      );

    case 'select':
      return (
        <Box sx={{ mb: 1.5 }}>
          <FieldLabelComponent label={field.label} required={field.required} info={field.info} />
          <FormControl fullWidth error={!!error} disabled={disabled}>
            <Select
              value={field.multiple ? (Array.isArray(value) ? value : []) : (value || '')}
              onChange={(e) => onChange(field.multiple ? (typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value) : e.target.value)}
              multiple={field.multiple}
              sx={{
                ...textInputSx,
                '& .MuiSelect-select': {
                  padding: '10px 12px !important',
                  color: '#374151',
                }
              }}
            >
              {!field.multiple && <MenuItem value="">Select an option</MenuItem>}
              {field.options?.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            {(error || field.helperText) && (
              <FormHelperText error={!!error} sx={{ mt: 0.5, fontSize: '12px' }}>{error || field.helperText}</FormHelperText>
            )}
          </FormControl>
        </Box>
      );

    case 'checkbox':
      return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5 }}>
          <Checkbox
            checked={value || false}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            sx={{
              mt: 0.5,
              color: '#D1D5DB',
              '&.Mui-checked': {
                color: '#111827',
              }
            }}
          />
          <Box sx={{ flex: 1, pt: 0.5 }}>
            <Typography sx={{ 
              fontSize: '14px',
              fontWeight: 500,
              color: '#111827'
            }}>
              {field.label}
              {field.required && <span style={{ color: '#EF4444' }}>*</span>}
            </Typography>
            {field.helperText && (
              <Typography sx={{ 
                fontSize: '12px',
                color: '#6B7280',
                mt: 0.5
              }}>
                {field.helperText}
              </Typography>
            )}
          </Box>
          {field.info && (
            <Tooltip title={field.info} arrow placement="top">
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '1.5px solid #D1D5DB',
                color: '#6B7280',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'help',
                mt: 0.5,
                flexShrink: 0,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#9CA3AF',
                  backgroundColor: '#F9FAFB'
                }
              }}>
                i
              </Box>
            </Tooltip>
          )}
        </Box>
      );

    case 'radio':
      return (
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography sx={{ 
              fontSize: '15px',
              fontWeight: 600,
              color: '#111827'
            }}>
              {field.label}
              {field.required && <span style={{ color: '#EF4444' }}>*</span>}
            </Typography>
            {field.info && (
              <Tooltip title={field.info} arrow placement="top">
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '1.5px solid #D1D5DB',
                  color: '#6B7280',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'help',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#9CA3AF',
                    backgroundColor: '#F9FAFB'
                  }
                }}>
                  i
                </Box>
              </Tooltip>
            )}
          </Box>
          <FormControl component="fieldset" error={!!error} disabled={disabled}>
            <RadioGroup
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              row
            >
              {field.options?.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  control={<Radio sx={{ color: '#D1D5DB', '&.Mui-checked': { color: '#111827' } }} />}
                  label={<Typography sx={{ fontSize: '14px', color: '#374151' }}>{opt.label}</Typography>}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {(error || field.helperText) && (
            <FormHelperText error={!!error} sx={{ mt: 0.5, fontSize: '12px' }}>{error || field.helperText}</FormHelperText>
          )}
        </Box>
      );

    case 'date':
      return (
        <Box sx={{ mb: 1.5 }}>
          <FieldLabelComponent label={field.label} required={field.required} info={field.info} />
          <TextField
            fullWidth
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            error={!!error}
            helperText={error || field.helperText}
            disabled={disabled}
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            sx={textInputSx}
          />
        </Box>
      );

    case 'file':
      return (
        <Box sx={{ mb: 1.5 }}>
          <FieldLabelComponent label={field.label} required={field.required} info={field.info} />
          <Box sx={{ 
            mt: 0.75, 
            p: 2, 
            border: '1.5px dashed #D1D5DB', 
            borderRadius: '12px', 
            backgroundColor: '#F9FAFB',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: '#9CA3AF',
              backgroundColor: '#F3F4F6'
            }
          }}>
            <input
              type="file"
              onChange={(e) => onChange(e.target.files?.[0] || null)}
              accept={field.accept}
              disabled={disabled}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <Typography sx={{ fontSize: '12px', color: '#6B7280', mt: 0.5 }}>
              Click to select a file
            </Typography>
          </Box>
          {(error || field.helperText) && (
            <FormHelperText error={!!error} sx={{ mt: 0.5, fontSize: '12px' }}>{error || field.helperText}</FormHelperText>
          )}
        </Box>
      );

    default:
      return (
        <Box sx={{ mb: 1.5 }}>
          <FieldLabelComponent label={field.label} required={field.required} info={field.info} />
          <TextField
            fullWidth
            type={field.type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            error={!!error}
            helperText={error || field.helperText}
            disabled={disabled}
            variant="outlined"
            sx={textInputSx}
          />
        </Box>
      );
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN FORM BUILDER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface IndustryFormBuilderProps {
  config: IndustryFormConfig;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onSaveDraft?: (data: Record<string, any>) => Promise<void>;
  initialData?: Record<string, any>;
  isLoading?: boolean;
}

export const IndustryFormBuilder: React.FC<IndustryFormBuilderProps> = ({
  config,
  onSubmit,
  onSaveDraft,
  initialData = {},
  isLoading = false,
}) => {
  // Load form data from localStorage on mount
  const getInitialFormData = () => {
    try {
      const storageKey = `form_data_${config.id}`;
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        console.log('📂 Loaded form data from localStorage');
        return { ...initialData, ...JSON.parse(savedData) };
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    return initialData;
  };

  const [formData, setFormData] = useState<Record<string, any>>(getInitialFormData());
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(config.sections.length > 0 ? [config.sections[0].id] : [])
  );

  // Save form data to localStorage whenever it changes
  // NOTE: This is LOCAL-ONLY auto-save. Data syncs to database ONLY on manual "Save Draft" or "Generate Contract"
  useEffect(() => {
    try {
      const storageKey = `form_data_${config.id}`;
      localStorage.setItem(storageKey, JSON.stringify(formData));
      console.log('📱 Form data saved locally to browser storage (not synced to database yet)');
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [formData, config.id]);

  // Calculate form completion
  const calculateCompletion = useCallback(() => {
    const requiredFields = config.sections.flatMap((section) =>
      section.fields
        .filter((f) => f.required && (!f.conditional || f.conditional(formData)))
        .map((f) => f.name)
    );

    const filledFields = requiredFields.filter((fieldName) => {
      const value = formData[fieldName];
      return value !== undefined && value !== null && value !== '';
    });

    return Math.round((filledFields.length / requiredFields.length) * 100);
  }, [config.sections, formData]);

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    // Clear error for this field
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    config.sections.forEach((section) => {
      section.fields.forEach((field) => {
        // Check conditional visibility
        if (field.conditional && !field.conditional(formData)) {
          return;
        }

        // Check required fields
        if (field.required) {
          const value = formData[field.name];
          if (value === undefined || value === null || value === '') {
            newErrors[field.name] = `${field.label} is required`;
          }
        }

        // Run custom validation
        if (field.validation && formData[field.name]) {
          const error = field.validation(formData[field.name]);
          if (error) {
            newErrors[field.name] = error;
          }
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = async () => {
    if (!onSaveDraft) return;

    setIsSaving(true);
    try {
      await onSaveDraft(formData);
      setSubmitStatus('success');
      // Keep localStorage data for draft - user can resume editing
      console.log('✅ Form data backed up to database! You can close the browser safely now');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to save draft:', error);
      setSubmitStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    try {
      await onSubmit(formData);
      setSubmitStatus('success');
      
      // Clear localStorage after successful submission
      try {
        const storageKey = `form_data_${config.id}`;
        localStorage.removeItem(storageKey);
        console.log('✅ Form submitted! Cleared localStorage');
      } catch (error) {
        console.error('Failed to clear localStorage:', error);
      }
      
      // Reset form
      setFormData({});
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus('error');
    }
  };

  const completion = calculateCompletion();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
            {config.icon} {config.name}
          </Typography>
          {config.riskLevel && (
            <Chip
              label={`${config.riskLevel.toUpperCase()} RISK`}
              color={
                config.riskLevel === 'critical'
                  ? 'error'
                  : config.riskLevel === 'high'
                  ? 'warning'
                  : 'info'
              }
              size="small"
            />
          )}
        </Stack>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          {config.description}
        </Typography>

        {/* Info Banner: How auto-save works */}
        <Alert
          icon={<InfoIcon />}
          severity="info"
          sx={{ mb: 3 }}
        >
          💡 <strong>Your form data saves automatically to your browser.</strong> Click <strong>"💾 SAVE AS DRAFT"</strong> to back it up to the server, or <strong>"& GENERATE CONTRACT"</strong> to finalize.
        </Alert>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <Alert
            icon={<CheckCircleIcon />}
            severity="success"
            onClose={() => setSubmitStatus('idle')}
            sx={{ mb: 2 }}
          >
            ✅ Form data saved to server! It's now backed up safely.
          </Alert>
        )}
        {submitStatus === 'error' && (
          <Alert
            icon={<ErrorIcon />}
            severity="error"
            onClose={() => setSubmitStatus('idle')}
            sx={{ mb: 2 }}
          >
            ❌ Please fix the errors and try again.
          </Alert>
        )}
      </Box>

      {/* Progress Bar */}
      <ProgressContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight="bold">
            Form Completion
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="primary">
            {completion}%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={completion} sx={{ height: 8 }} />
      </ProgressContainer>

      {/* Auto-Fill from URL or Image */}
      <MetadataExtractor
        onFieldsExtracted={(fields) => {
          // Auto-fill the extracted fields
          Object.entries(fields).forEach(([fieldName, value]) => {
            if (value && value !== undefined && value !== null && value !== '') {
              handleFormDataChange(fieldName, value);
            }
          });
          console.log('✅ Form fields auto-filled from extracted data!');
        }}
        onMetadataExtracted={(metadata) => {
          console.log('📊 Extracted metadata:', metadata);
        }}
      />

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {config.sections.map((section) => {
            const visibleFields = section.fields.filter(
              (f) => !f.conditional || f.conditional(formData)
            );

            if (visibleFields.length === 0) return null;

            const isExpanded = expandedSections.has(section.id);

            return (
              <StyledCard key={section.id}>
                {/* Section Header */}
                <SectionHeader
                  onClick={() => {
                    setExpandedSections((prev) => {
                      const next = new Set(prev);
                      if (next.has(section.id)) {
                        next.delete(section.id);
                      } else {
                        next.add(section.id);
                      }
                      return next;
                    });
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  <Typography variant="h6" sx={{ 
                    flex: 1, 
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {section.icon && <span>{section.icon} </span>}
                    {section.title}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF' }}>
                    {isExpanded ? '▲' : '▼'}
                  </Typography>
                </SectionHeader>

                {/* Section Content */}
                {isExpanded && (
                  <CardContent sx={{ padding: '18px 24px', '&:last-child': { paddingBottom: '18px' } }}>
                    {section.description && (
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1.25 }}>
                        {section.description}
                      </Typography>
                    )}

                    <Grid container spacing={0.75}>
                      {visibleFields.map((field) => (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          key={field.name}
                        >
                          <FieldWrapper>
                            <FieldInput
                              field={field}
                              value={formData[field.name]}
                              onChange={(value) => handleFieldChange(field.name, value)}
                              error={errors[field.name]}
                              disabled={isLoading}
                            />
                            {field.info && (
                              <Box sx={{ mt: 0.75, p: 0.75, bgcolor: '#F9FAFB', borderRadius: '8px', borderLeft: '3px solid #4F46E5' }}>
                                <Typography variant="caption" color="#374151" sx={{ fontSize: '12px', fontWeight: 500 }}>
                                  <InfoIcon sx={{ fontSize: '0.85rem', mr: 0.5, verticalAlign: 'text-bottom' }} />
                                  {field.info}
                                </Typography>
                              </Box>
                            )}
                          </FieldWrapper>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                )}
              </StyledCard>
            );
          })}
        </Stack>

        {/* PRICING SUMMARY - Shows Sale Price + 1% Platform Fee + Total */}
        <PricingSummary salePrice={formData.sale_price} />

        {/* Action Buttons - Sticky Bottom Bar */}
        <Paper
          elevation={2}
          sx={{
            position: 'sticky',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '20px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            gap: '16px',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            height: 'auto',
            minHeight: '80px',
            borderTop: '2px solid #F0F0F0',
          }}
        >
          {onSaveDraft && (
            <Button
              variant="outlined"
              startIcon={isSaving ? <CircularProgress size={18} /> : <SaveIcon />}
              onClick={handleSaveDraft}
              disabled={isLoading || isSaving}
              sx={{
                height: '52px',
                fontSize: '16px',
                fontWeight: 700,
                borderRadius: '12px',
                padding: '12px 28px',
                whiteSpace: 'nowrap',
                flex: { xs: '1 1 100%', sm: 'auto' },
                minWidth: { xs: '100%', sm: '180px' },
                border: '2px solid #2563EB',
                color: '#2563EB',
                '&:hover': {
                  backgroundColor: '#EFF6FF',
                  borderColor: '#1D4ED8',
                },
                '&:disabled': {
                  borderColor: '#D1D5DB',
                  color: '#9CA3AF',
                },
                transition: 'all 0.3s ease',
              }}
            >
              💾 Save as Draft
            </Button>
          )}
          <Tooltip title="Clear all saved form data from this browser">
            <Button
              variant="text"
              onClick={() => {
                try {
                  const storageKey = `form_data_${config.id}`;
                  localStorage.removeItem(storageKey);
                  setFormData({});
                  console.log('🗑️ Cleared all saved form data');
                  setSubmitStatus('success');
                  setTimeout(() => setSubmitStatus('idle'), 2000);
                } catch (error) {
                  console.error('Failed to clear data:', error);
                }
              }}
              sx={{
                height: '52px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '12px',
                padding: '8px 16px',
                whiteSpace: 'nowrap',
                color: '#9CA3AF',
                '&:hover': {
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                },
                transition: 'all 0.3s ease',
              }}
            >
              🗑️ Clear
            </Button>
          </Tooltip>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{
              height: '52px',
              fontSize: '16px',
              fontWeight: 700,
              borderRadius: '12px',
              padding: '12px 28px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              flex: { xs: '1 1 100%', sm: 'auto' },
              minWidth: { xs: '100%', sm: '220px' },
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)',
                boxShadow: '0 8px 16px rgba(37, 99, 235, 0.3)',
              },
              '&:disabled': {
                background: '#D1D5DB',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {isLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : '& Generate Contract'}
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default IndustryFormBuilder;
