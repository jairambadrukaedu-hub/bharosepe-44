# Form Generator - Quick Reference

## 📋 Files Reference

### Core Infrastructure (8 Files - 2,400+ lines)

| File | Lines | Purpose | Status |
|------|-------|---------|--------|
| `src/types/formTypes.ts` | 525 | Type definitions | ✅ |
| `src/services/formGenerator.ts` | 450+ | Form logic & validation | ✅ |
| `src/services/commonFieldsConfig.ts` | 330 | Shared fields (24 total) | ✅ |
| `src/components/FormRenderer.tsx` | 350+ | Main form component | ✅ |
| `src/components/FormField.tsx` | 400+ | Individual fields (16 types) | ✅ |
| `src/store/formStore.ts` | 200+ | Zustand state management | ✅ |
| `src/styles/formField.css` | 250+ | Field styling | ✅ |
| `src/styles/formRenderer.css` | 350+ | Form styling | ✅ |

### Form Configurations

**Goods Forms (12)**
- ✅ `appliancesForm.ts` - ANNEXURE A (31+ fields)
- ⏳ mobileForm.ts - ANNEXURE B
- ⏳ furnitureForm.ts - ANNEXURE C
- ⏳ vehiclesForm.ts - ANNEXURE D
- ⏳ fashionForm.ts - ANNEXURE E
- ⏳ jewelryForm.ts - ANNEXURE F
- ⏳ buildingMaterialsForm.ts - ANNEXURE G
- ⏳ collectiblesForm.ts - ANNEXURE H
- ⏳ machineryForm.ts - ANNEXURE I
- ⏳ booksForm.ts - ANNEXURE J
- ⏳ artForm.ts - ANNEXURE K
- ⏳ sellerForm.ts - ANNEXURE L

**Service Forms (10)**
- ⏳ softwareForm.ts - SERVICE A
- ⏳ designForm.ts - SERVICE B
- ⏳ contentForm.ts - SERVICE C
- ⏳ photographyForm.ts - SERVICE D
- ⏳ coachingForm.ts - SERVICE E
- ⏳ repairForm.ts - SERVICE F
- ⏳ cleaningForm.ts - SERVICE G
- ⏳ marketingForm.ts - SERVICE H
- ⏳ consultingForm.ts - SERVICE I
- ⏳ eventForm.ts - SERVICE J

---

## 🔧 API Quick Calls

### FormGenerator (Service)

```typescript
// Visibility
FormGenerator.isFieldVisible(field, formData)
FormGenerator.getVisibleFields(config, formData)
FormGenerator.getVisibleSections(config, formData)

// Validation
FormGenerator.validateFieldValue(field, value)
FormGenerator.validateFormSubmission(config, formData)

// Operations
FormGenerator.calculateCompletion(config, formData)
FormGenerator.createSubmission(config, formData)
FormGenerator.resetFormData(config)
FormGenerator.autoCalculateFields(config, formData)

// Info
FormGenerator.getFieldById(config, fieldId)
FormGenerator.getAllFields(config)
FormGenerator.getDependentFields(config, fieldId)
FormGenerator.getFormSummary(config, formData)
```

### useFormStore (Zustand)

```typescript
// State
store.formData
store.errors
store.completion
store.mandatoryFilled
store.mandatoryTotal
store.isLoading
store.isDirty

// Methods
store.setConfiguration(config)
store.updateField(fieldId, value)
store.validateForm()
store.submitForm()
store.resetForm()
store.clearError(fieldId)

// Hook
const state = useFormState(); // includes canSubmit, isValid
```

---

## 🎯 Field Types (16)

| Type | Input | Example |
|------|-------|---------|
| `text` | Text field | "Product Name" |
| `textarea` | Multi-line | Description |
| `number` | Number input | 1000, 5.5 |
| `email` | Email validation | user@example.com |
| `phone` | Phone validation | 9876543210 |
| `date` | Date picker | 2024-01-15 |
| `time` | Time picker | 14:30 |
| `select` | Dropdown | Category selection |
| `multi-select` | Multi-dropdown | Feature selection |
| `checkbox` | Yes/No toggle | Warranty status |
| `radio` | Option buttons | Condition choice |
| `toggle` | Switch | Enable/disable |
| `url` | URL validation | https://example.com |
| `file` | File upload | Document, Image |
| `textarea-array` | Multiple text areas | Item list |
| `repeatable-text` | Dynamic text list | Names list |
| `repeatable-url` | Dynamic URL list | Media URLs |

---

## 🔀 Conditional Patterns (3)

### 1. IF Pattern
```typescript
// Show when appliance_type = TV
condition: {
  type: 'IF',
  fieldName: 'appliance_type',
  triggerValue: 'TV'
}

// Show when status = New or Refurbished
condition: {
  type: 'IF',
  fieldName: 'device_status',
  triggerValue: ['New', 'Refurbished']
}
```

### 2. CONDITIONAL_BY Pattern
```typescript
// Show for Design service type
condition: {
  type: 'CONDITIONAL_BY',
  fieldName: 'service_type',
  triggerValue: 'Design'
}
```

### 3. APPEARS_IF Pattern
```typescript
// Show when Photography selected in multi-select
condition: {
  type: 'APPEARS_IF',
  fieldName: 'services',
  triggerValue: 'Photography'
}
```

---

## ✅ Validation Examples

```typescript
// Email validation (automatic)
{ type: 'email' }

// Phone validation (automatic)
{ type: 'phone' }

// URL validation (automatic)
{ type: 'url' }

// Text with constraints
{
  type: 'text',
  minLength: 3,
  maxLength: 50,
  pattern: '^[a-zA-Z ]+$'
}

// Number with range
{
  type: 'number',
  min: 0,
  max: 1000000,
  step: 100
}

// Custom validation
{
  validate: (value) => {
    if (value.length < 5) return 'Too short';
    return true; // Valid
  }
}
```

---

## 📊 Common Field Reference

### Goods Common (20)
1. product_name (mandatory)
2. brand (mandatory)
3. description (mandatory)
4. condition_category (mandatory)
5. color (mandatory)
6. sale_price (mandatory)
7. delivery_method (mandatory)
8. delivery_address (mandatory)
9. delivery_date (mandatory)
10. warranty_status (mandatory)
11. warranty_valid_till (mandatory)
12. buyer_evidence_recording (mandatory)
13. what_to_record (conditional on #12=yes)
14. seller_predispatch_recording (mandatory)
15. predispatch_recording_items (conditional on #14=yes)
16. return_accepted (mandatory)
17. return_condition_description (conditional)
18. return_shipping_paid_by (conditional)
19. return_refund_timeline_days (conditional)
20. inspection_window_hours (mandatory)

### Service Common (4)
1. service_price (mandatory)
2. payment_schedule (mandatory)
3. delivery_date (mandatory)
4. dispute_resolution_days (mandatory)

---

## 💡 Usage Patterns

### Basic Form Rendering
```typescript
<FormRenderer
  configuration={appliancesForm}
  formData={formData}
  onChange={(id, value) => updateField(id, value)}
  errors={errors}
/>
```

### With Zustand Store
```typescript
const store = useFormStore();
store.setConfiguration(appliancesForm);

<FormRenderer
  configuration={store.currentConfiguration}
  formData={store.formData}
  onChange={(id, value) => store.updateField(id, value)}
  errors={store.errors}
/>
```

### Form Submission
```typescript
const validate = () => {
  const result = FormGenerator.validateFormSubmission(config, formData);
  if (result.valid) {
    const submission = FormGenerator.createSubmission(config, formData);
    // Send to API
  } else {
    setErrors(result.errors);
  }
};
```

### Field Dependency Check
```typescript
// Get all fields that depend on this field
const dependents = FormGenerator.getDependentFields(config, 'appliance_type');
// Returns: [tv_tests, ac_tests, fridge_tests, ...]
```

---

## 📱 Component Props

### FormRenderer Props
```typescript
interface FormRendererProps {
  configuration: FormConfiguration      // Required
  formData: Record<string, any>         // Required
  onChange: (fieldId, value) => void    // Required
  onBlur?: (fieldId) => void            // Optional
  errors?: Record<string, string>       // Optional
  disabled?: boolean                    // Optional
  showValidation?: boolean              // Optional
}
```

### FormField Props
```typescript
interface FormFieldProps {
  field: FormField                      // Required
  value: any                            // Required
  onChange: (value) => void             // Required
  onBlur?: () => void                   // Optional
  error?: string                        // Optional
  disabled?: boolean                    // Optional
  showLabel?: boolean                   // Optional
  showHint?: boolean                    // Optional
}
```

---

## 📈 Statistics Available

```typescript
const stats = FormGenerator.getFormSummary(config, formData);

{
  formId: 'appliances-form',
  title: 'Appliances & Electronics',
  category: 'Goods',
  annexure: 'A',
  totalFields: 31,
  totalMandatory: 26,
  totalOptional: 5,
  sections: 4,
  commonFields: 20,
  
  // With formData:
  visibleFields: 31,
  completion: 45,
  mandatoryFilled: 12
}
```

---

## 🚀 Quick Start

### 1. Import Core Components
```typescript
import { FormRenderer } from '@/components/FormRenderer';
import { useFormStore } from '@/store/formStore';
import { appliancesForm } from '@/services/goodsFormConfigs/appliancesForm';
```

### 2. Setup State
```typescript
const [formData, setFormData] = useState({});
const [errors, setErrors] = useState({});
```

### 3. Render Form
```typescript
<FormRenderer
  configuration={appliancesForm}
  formData={formData}
  onChange={(id, value) => setFormData(prev => ({...prev, [id]: value}))}
  errors={errors}
/>
```

### 4. Handle Submission
```typescript
const handleSubmit = () => {
  const validation = FormGenerator.validateFormSubmission(appliancesForm, formData);
  if (validation.valid) {
    const submission = FormGenerator.createSubmission(appliancesForm, formData);
    // Send to backend
  } else {
    setErrors(validation.errors);
  }
};
```

---

## 🎯 Statistics

- **Total Fields**: 1,088
- **Mandatory**: 481 (44%)
- **Optional**: 607 (56%)
- **Annexures**: 22 (12 goods + 10 services)
- **Field Types**: 16
- **Common Fields**: 24
- **Conditional Rules**: 3 patterns
- **Code Lines**: 2,400+
- **Completion**: 4.5% (1/22 forms)

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| Field not showing | Check condition in FormRenderer.isFieldVisible() |
| Validation not working | Ensure validateForm() called before submission |
| State not updating | Check updateField() in store |
| Style issues | Verify formRenderer.css and formField.css imported |
| Type errors | Check export type in formTypes.ts |

---

**Last Updated**: Current Session
**Status**: Core Infrastructure Complete ✅
**Next**: Form Configuration Build-Out (21 remaining forms)
