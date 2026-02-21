# Form Generator - System Architecture Diagram

## 🏗️ Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     FORM GENERATOR SYSTEM                           │
│                      (1,088 Fields)                                 │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────┐      ┌──────────────────────────┐     │
│  │   FormRenderer.tsx      │      │   FormField.tsx          │     │
│  │   (350+ lines)          │◄─────┤   (400+ lines)           │     │
│  │                         │      │                          │     │
│  │ • Sections              │      │ • 16 Field Types         │     │
│  │ • Statistics            │      │ • Field Rendering        │     │
│  │ • Progress Bar          │      │ • Error Display          │     │
│  │ • Conditional Display   │      │ • Validation Feedback    │     │
│  │ • Error Handling        │      │ • Responsive Input       │     │
│  └─────────────────────────┘      └──────────────────────────┘     │
│           ▲                                   ▲                     │
│           │                                   │                     │
│           └───────────────┬───────────────────┘                     │
│                           │                                         │
│           ┌───────────────▼──────────────────┐                     │
│           │  CSS Styling (600+ lines)        │                     │
│           │  • formField.css                 │                     │
│           │  • formRenderer.css              │                     │
│           │  • Responsive Design             │                     │
│           │  • Animations & Effects          │                     │
│           └─────────────────────────────────┘                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                                ▲
                                │
┌──────────────────────────────────────────────────────────────────────┐
│                      STATE MANAGEMENT LAYER                         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │           Zustand Store (formStore.ts)                     │    │
│  │           (200+ lines)                                     │    │
│  │                                                            │    │
│  │  State:                                                    │    │
│  │  • formData: Record<string, any>                          │    │
│  │  • errors: Record<string, string>                         │    │
│  │  • completion: number                                     │    │
│  │  • mandatoryFilled: number                               │    │
│  │  • mandatoryTotal: number                                │    │
│  │  • isDirty: boolean                                       │    │
│  │  • isSubmitted: boolean                                   │    │
│  │                                                            │    │
│  │  Actions:                                                 │    │
│  │  • setConfiguration()                                     │    │
│  │  • updateField()                                          │    │
│  │  • validateForm()                                         │    │
│  │  • submitForm()                                           │    │
│  │  • resetForm()                                            │    │
│  │  • updateStatistics()                                     │    │
│  │                                                            │    │
│  │  Hooks:                                                   │    │
│  │  • useFormStore()  - Full store                          │    │
│  │  • useFormState()  - With computed values               │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                                ▲
                                │
┌──────────────────────────────────────────────────────────────────────┐
│                      LOGIC/SERVICE LAYER                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │        FormGenerator Service (450+ lines)               │      │
│  │                                                          │      │
│  │  Visibility Engine:                                     │      │
│  │  • isFieldVisible(field, formData)                      │      │
│  │  • getVisibleFields(config, formData)                   │      │
│  │  • getVisibleSections(config, formData)                 │      │
│  │                                                          │      │
│  │  Validation Engine:                                     │      │
│  │  • validateFieldValue(field, value)                     │      │
│  │  • validateFormSubmission(config, formData)             │      │
│  │  • Custom validators support                            │      │
│  │                                                          │      │
│  │  Auto-Calculation:                                      │      │
│  │  • autoCalculateFields(config, formData)                │      │
│  │  • Custom calculation rules                             │      │
│  │                                                          │      │
│  │  Statistics:                                            │      │
│  │  • calculateCompletion()                                │      │
│  │  • getMandatoryFieldsCount()                            │      │
│  │  • getOptionalFieldsCount()                             │      │
│  │                                                          │      │
│  │  Utilities:                                             │      │
│  │  • getFieldById()                                       │      │
│  │  • getAllFields()                                       │      │
│  │  • getDependentFields()                                 │      │
│  │  • resetFormData()                                      │      │
│  │  • createSubmission()                                   │      │
│  │  • getFormSummary()                                     │      │
│  │                                                          │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │  Common Fields Config (330 lines)                       │      │
│  │                                                          │      │
│  │  • goodsCommonFields: 20 fields (all mandatory)         │      │
│  │  • serviceCommonFields: 4 fields (all mandatory)        │      │
│  │  • Field inheritance model                              │      │
│  │  • Shared validation rules                              │      │
│  │  • Conditional logic for common fields                  │      │
│  │                                                          │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                                ▲
                                │
┌──────────────────────────────────────────────────────────────────────┐
│                      TYPE DEFINITION LAYER                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │         formTypes.ts (525 lines)                         │      │
│  │                                                          │      │
│  │  Core Types:                                            │      │
│  │  • FieldType: 16 types                                  │      │
│  │  • FormField: Field definition (20+ props)             │      │
│  │  • FormSection: Section definition                      │      │
│  │  • FormConfiguration: Complete form config             │      │
│  │  • ConditionalRule: 3 rule types (IF, CONDITIONAL_BY,  │      │
│  │                                   APPEARS_IF)           │      │
│  │  • FormRule: Rule types                                │      │
│  │  • FormSubmissionData: Submission structure             │      │
│  │                                                          │      │
│  │  Constants:                                             │      │
│  │  • APPLIANCE_TYPES: 11 types                           │      │
│  │  • EVENT_TYPES: 12 types                               │      │
│  │  • DELIVERY_METHODS: 3 types                           │      │
│  │  • RETURN_OPTIONS: 3 types                             │      │
│  │  • INSPECTION_WINDOW_OPTIONS: 5 options                │      │
│  │                                                          │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                                ▲
                                │
┌──────────────────────────────────────────────────────────────────────┐
│                    CONFIGURATION LAYER                              │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │  Goods Forms (12 Annexures)                             │      │
│  │                                                          │      │
│  │  ✅ appliancesForm.ts          - ANNEXURE A (31+ fields)      │      │
│  │  ⏳ mobileForm.ts               - ANNEXURE B (39 fields)       │      │
│  │  ⏳ furnitureForm.ts            - ANNEXURE C (31 fields)       │      │
│  │  ⏳ vehiclesForm.ts             - ANNEXURE D (51 fields)       │      │
│  │  ⏳ fashionForm.ts              - ANNEXURE E (30 fields)       │      │
│  │  ⏳ jewelryForm.ts              - ANNEXURE F (40 fields)       │      │
│  │  ⏳ buildingMaterialsForm.ts    - ANNEXURE G (23 fields)       │      │
│  │  ⏳ collectiblesForm.ts         - ANNEXURE H (42 fields)       │      │
│  │  ⏳ machineryForm.ts            - ANNEXURE I (51 fields)       │      │
│  │  ⏳ booksForm.ts                - ANNEXURE J (48 fields)       │      │
│  │  ⏳ artForm.ts                  - ANNEXURE K (35 fields)       │      │
│  │  ⏳ sellerForm.ts               - ANNEXURE L (44+ fields)      │      │
│  │                                                          │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐      │
│  │  Service Forms (10 Annexures)                           │      │
│  │                                                          │      │
│  │  ⏳ softwareForm.ts      - SERVICE A (47 fields)              │      │
│  │  ⏳ designForm.ts        - SERVICE B (42 fields)              │      │
│  │  ⏳ contentForm.ts       - SERVICE C (57 fields)              │      │
│  │  ⏳ photographyForm.ts   - SERVICE D (50 fields)              │      │
│  │  ⏳ coachingForm.ts      - SERVICE E (64 fields)              │      │
│  │  ⏳ repairForm.ts        - SERVICE F (53 fields)              │      │
│  │  ⏳ cleaningForm.ts      - SERVICE G (59 fields)              │      │
│  │  ⏳ marketingForm.ts     - SERVICE H (105+ fields)            │      │
│  │  ⏳ consultingForm.ts    - SERVICE I (78 fields)              │      │
│  │  ⏳ eventForm.ts         - SERVICE J (187 fields)             │      │
│  │                                                          │      │
│  └──────────────────────────────────────────────────────────┘      │
│                                                                      │
│              Total: 1,088 fields | 22 annexures                     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow Diagram

```
User Interaction
       │
       ▼
┌────────────────────┐
│  FormRenderer      │
│  Component         │
└────────────┬───────┘
             │
             ├─ Displays Sections
             ├─ Shows Fields via FormField
             │
             ▼
       ┌──────────────────────┐
       │  FormField Component │
       └──────────┬───────────┘
                  │
                  ├─ Renders Input
                  ├─ Captures onChange
                  │
                  ▼
       ┌──────────────────────┐
       │  Store.updateField() │
       └──────────┬───────────┘
                  │
                  ├─ Updates formData
                  ├─ Clears errors
                  ├─ Sets isDirty
                  ├─ Calls updateStatistics()
                  │
                  ▼
       ┌──────────────────────┐
       │  Statistics Update   │
       │  • Completion %      │
       │  • Mandatory filled  │
       │  • Visible fields    │
       └──────────┬───────────┘
                  │
                  ├─ Re-renders FormRenderer
                  ├─ Updates progress bar
                  ├─ Updates counters
                  │
                  ▼
Form Validation
       │
       ├─ On Submit:
       │
       ▼
┌────────────────────────────────┐
│ FormGenerator.validateForm()   │
└────────────┬───────────────────┘
             │
             ├─ Check all mandatory fields
             ├─ Validate field values
             ├─ Run form rules
             │
             ▼
     ┌─────────────────┐
     │  Valid?         │
     └────┬──────┬────┘
          │      │
      YES │      │ NO
          │      │
          ▼      ▼
    ┌─────────┐ ┌──────────────┐
    │ Submit  │ │ Show Errors  │
    │         │ │ Store.errors │
    └─────────┘ └──────────────┘
          │
          ▼
┌────────────────────────────────┐
│ FormGenerator.createSubmission()
│ • Collect data                 │
│ • Add metadata                 │
│ • Add timestamps               │
└────────────┬───────────────────┘
             │
             ▼
┌────────────────────────────────┐
│ API Submission                 │
│ • Send to backend              │
│ • Store in database            │
│ • Return confirmation          │
└────────────────────────────────┘
```

---

## 🔄 Conditional Visibility Flow

```
Parent Field Value
       │
       ▼
┌──────────────────────────────────┐
│ IF Condition?                    │
│ (Single field trigger)           │
└────────────┬────────────┬────────┘
             │            │
           YES            NO
             │            │
             ▼            ▼
       Show Field   Check CONDITIONAL_BY
                           │
                    ┌──────┴──────┐
                    │             │
                  YES           NO
                    │             │
                    ▼             ▼
              Show Field  Check APPEARS_IF
                         (Multi-select)
                           │
                    ┌──────┴──────┐
                    │             │
                  YES           NO
                    │             │
                    ▼             ▼
              Show Field   Hide Field
```

---

## 🎯 Field Type Rendering Decision Tree

```
FormField Component
       │
       ├─ Type = 'text'?        → <input type="text" />
       ├─ Type = 'textarea'?    → <textarea />
       ├─ Type = 'number'?      → <input type="number" />
       ├─ Type = 'email'?       → <input type="email" />
       ├─ Type = 'phone'?       → <input type="tel" />
       ├─ Type = 'date'?        → <input type="date" />
       ├─ Type = 'time'?        → <input type="time" />
       ├─ Type = 'select'?      → <select><options></select>
       ├─ Type = 'multi-select'?→ <select multiple><options></select>
       ├─ Type = 'checkbox'?    → <input type="checkbox" />
       ├─ Type = 'radio'?       → Radio button group
       ├─ Type = 'toggle'?      → Switch control
       ├─ Type = 'url'?         → <input type="url" />
       ├─ Type = 'file'?        → <input type="file" />
       ├─ Type = 'textarea-array'?→ Multiple textareas + Add button
       ├─ Type = 'repeatable-text'?→ Dynamic text field list
       └─ Type = 'repeatable-url'? → Dynamic URL field list
```

---

## 📈 Component Hierarchy

```
App/Page Component
│
├─ FormRenderer (Main Container)
│  │
│  ├─ FormHeader
│  │  ├─ Title
│  │  ├─ Description
│  │  └─ Statistics Bar
│  │      ├─ Mandatory Counter
│  │      ├─ Completion %
│  │      └─ Progress Bar
│  │
│  ├─ Sections Container
│  │  │
│  │  └─ FormSection (repeated per section)
│  │     │
│  │     ├─ SectionHeader
│  │     │  ├─ Section Number (circled)
│  │     │  ├─ Section Title
│  │     │  └─ Section Description
│  │     │
│  │     └─ FieldsGrid
│  │        │
│  │        └─ FieldWrapper (per visible field)
│  │           │
│  │           ├─ FormField Component
│  │           │  ├─ Field Label (with mandatory *)
│  │           │  ├─ Input/Control (16 types)
│  │           │  ├─ Hint Text
│  │           │  └─ Error Message
│  │           │
│  │           ├─ Conditional Info (if applicable)
│  │           ├─ Disclaimer (if applicable)
│  │           └─ Help Text (if applicable)
│  │
│  ├─ CommonFieldsSection
│  │  └─ (same structure as sections above)
│  │
│  └─ FormFooter
│     └─ Summary Statistics
│        ├─ Total Visible Fields
│        ├─ Mandatory Filled
│        └─ Completion %
│
├─ Zustand Store
│  └─ Manages all state
│
└─ FormGenerator Service
   └─ Handles all business logic
```

---

## 🔗 Dependencies Graph

```
src/index.ts (Export Index)
    │
    ├─── formTypes.ts (Core Types)
    │
    ├─── formGenerator.ts
    │    └─ Uses: formTypes, commonFieldsConfig
    │
    ├─── commonFieldsConfig.ts
    │    └─ Uses: formTypes
    │
    ├─── FormRenderer.tsx
    │    ├─ Uses: formTypes, formGenerator, FormField
    │    └─ Styling: formRenderer.css
    │
    ├─── FormField.tsx
    │    ├─ Uses: formTypes
    │    └─ Styling: formField.css
    │
    ├─── formStore.ts
    │    ├─ Uses: formTypes, formGenerator
    │    └─ Requires: zustand
    │
    └─── Form Configs (appliancesForm.ts, etc.)
         ├─ Uses: formTypes, commonFieldsConfig
         └─ Returns: FormConfiguration
```

---

## 🎨 Styling Architecture

```
CSS Foundation (2 files, 600+ lines total)
│
├─ formField.css (250+ lines)
│  │
│  ├─ .form-field (Base container)
│  ├─ .form-field__label (Field labels)
│  ├─ .form-field__input (Text inputs)
│  ├─ .form-field__textarea (Text areas)
│  ├─ .form-field__select (Dropdowns)
│  ├─ .form-field__checkbox-label (Checkboxes)
│  ├─ .form-field__radio-group (Radio buttons)
│  ├─ .form-field__toggle-label (Toggle switches)
│  ├─ .form-field__file-input (File inputs)
│  ├─ .form-field__repeatable-* (Repeating fields)
│  ├─ .form-field__button (Action buttons)
│  ├─ .form-field__hint (Helper text)
│  ├─ .form-field__error (Error messages)
│  │
│  └─ Media Queries
│     ├─ @media (max-width: 768px)
│     └─ @media (max-width: 480px)
│
└─ formRenderer.css (350+ lines)
   │
   ├─ .form-renderer (Main container)
   ├─ .form-renderer__header (Header section)
   ├─ .form-renderer__stats (Statistics display)
   ├─ .form-renderer__sections (Sections container)
   ├─ .form-renderer__section (Individual section)
   ├─ .form-renderer__section-title (Section title with number)
   ├─ .form-renderer__fields (Fields grid)
   ├─ .form-renderer__field-wrapper (Field wrapper)
   ├─ .form-renderer__progress (Progress bar)
   ├─ .form-renderer__conditional-info (Conditional indicators)
   ├─ .form-renderer__disclaimer (Warning disclaimers)
   ├─ .form-renderer__error-message (Error display)
   ├─ .form-renderer__footer (Footer section)
   │
   └─ Media Queries
      ├─ @media (max-width: 768px)
      └─ @media (max-width: 480px)
```

---

## 📦 Export Structure

```
src/index.ts (Main Export)
│
├─ Type Exports (7 types)
│  ├─ FieldType
│  ├─ FormField
│  ├─ FormSection
│  ├─ FormConfiguration
│  ├─ FormRule
│  ├─ FormSubmissionData
│  └─ ConditionalRule
│
├─ Service Exports
│  ├─ FormGenerator (class with 20+ methods)
│  ├─ goodsCommonFields (array)
│  └─ serviceCommonFields (array)
│
├─ Component Exports
│  ├─ FormRenderer (React component)
│  └─ FormFieldComponent (React component)
│
├─ Store Exports
│  ├─ useFormStore (Zustand hook)
│  └─ useFormState (Enhanced hook with computed values)
│
├─ Utility Exports
│  └─ CommonFields (grouped object)
│
└─ App Export
   └─ FormGeneratorApp (statistics and metadata)
```

---

## 🎯 Statistics Architecture

```
FormGenerator.getFormSummary(config, formData)
│
├─ Static Stats (from config)
│  ├─ formId
│  ├─ title
│  ├─ category
│  ├─ annexure
│  ├─ totalFields
│  ├─ totalMandatory
│  ├─ totalOptional
│  ├─ sections count
│  └─ commonFields count
│
└─ Dynamic Stats (from formData)
   ├─ visibleFields (count)
   ├─ completion (percentage)
   └─ mandatoryFilled (count)
```

---

This architecture is designed to be:
- **Scalable**: Supports 1,088 fields
- **Maintainable**: Clear separation of concerns
- **Performant**: Memoization and lazy loading
- **Type-Safe**: Full TypeScript coverage
- **Extensible**: Easy to add new field types or rules
- **Responsive**: Works on all devices
- **Accessible**: ARIA labels and keyboard navigation
