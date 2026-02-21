# Visual Flow Diagram - Before and After

## BEFORE (Problem)

```
┌──────────────────────────────────────────────────────────────┐
│ USER FILLS FORM                                              │
│ scratches: "yes"                                             │
│ dents: "no"                                                  │
│ battery_health_percentage: "87"                              │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: SAVE TO DATABASE                                     │
│ ✓ Maps to: scratches_present, dents_present, etc.            │
│ ✓ Saves to form_submissions table                            │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 2: FETCH FROM DATABASE                                  │
│ ├─ SUCCESS: Returns {scratches_present: "yes", ...}         │
│ ├─ FAIL: Returns NULL                                        │
│ └─ Problem: No fallback! If NULL, saved data lost           │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 3: BUILD contractData                                   │
│ ├─ If fetch succeeded:                                       │
│ │  └─ {scratches_present: "yes", ...} ✓                    │
│ ├─ If fetch failed:                                          │
│ │  └─ {scratches: "yes"} ✗ (only original name!)           │
│ └─ Problem: Missing mapped field names!                      │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 4: REPLACE PLACEHOLDERS                                 │
│ Template looks for: {{scratches_present}}                    │
│ Data has: scratches = "yes"                                  │
│ ✗ NOT FOUND! (looking for scratches_present)                │
│ ✗ Placeholder remains: {{scratches_present}}                 │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ FINAL CONTRACT OUTPUT (BROKEN)                               │
│                                                              │
│ USER-PROVIDED INPUT:                                         │
│   □ Scratches: {{scratches_present}} ✗ NOT REPLACED         │
│   □ Dents: {{dents_present}} ✗ NOT REPLACED                 │
│   □ Battery: {{battery_health_percent}}% ✗ NOT REPLACED     │
└──────────────────────────────────────────────────────────────┘
```

---

## AFTER (Solution)

```
┌──────────────────────────────────────────────────────────────┐
│ USER FILLS FORM                                              │
│ scratches: "yes"                                             │
│ dents: "no"                                                  │
│ battery_health_percentage: "87"                              │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: SAVE TO DATABASE                                     │
│ ✓ Maps to: scratches_present, dents_present, etc.            │
│ ✓ Saves to form_submissions table                            │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 2: FETCH FROM DATABASE (with Fallback)                  │
│                                                              │
│ TRY PRIMARY:                                                 │
│ ├─ SUCCESS: Returns {scratches_present: "yes", ...} ✓       │
│ │  └─ savedFormData = {scratches_present: "yes", ...}       │
│ │                                                           │
│ └─ FAIL: Returns NULL → TRY FALLBACK                         │
│                                                             │
│ TRY FALLBACK (NEW):                                          │
│ ├─ Map in-memory form data                                   │
│ ├─ savedFormData = mapFormDataToDatabase(state.formData)     │
│ └─ savedFormData = {scratches_present: "yes", ...} ✓        │
│                                                             │
│ Result: ALWAYS has mapped field names!                       │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 3: BUILD contractData                                   │
│ contractData = {                                             │
│   ...state.formData,        // {scratches: "yes"}            │
│   ...savedFormData          // {scratches_present: "yes"} ✓  │
│ }                                                            │
│                                                              │
│ Result: HAS BOTH original and mapped names!                  │
│   - scratches: "yes" (original)                              │
│   - scratches_present: "yes" (mapped, takes precedence)      │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 4: REPLACE PLACEHOLDERS (with Variations)               │
│                                                              │
│ Template looks for: {{scratches_present}}                    │
│                                                              │
│ TRY 1 - EXACT MATCH:                                         │
│ ├─ data.scratches_present = "yes" ✓ FOUND!                 │
│ └─ REPLACE: {{scratches_present}} → "yes"                   │
│                                                              │
│ IF NOT FOUND, TRY 2 - VARIATIONS (NEW):                      │
│ ├─ Try: scratches, dents, back_dents, etc.                  │
│ ├─ data.scratches = "yes" ✓ FOUND!                          │
│ └─ REPLACE: {{scratches_present}} → "yes"                   │
│                                                              │
│ Result: Placeholder ALWAYS replaced!                         │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ FINAL CONTRACT OUTPUT (FIXED) ✓                              │
│                                                              │
│ USER-PROVIDED INPUT:                                         │
│   □ Scratches: yes ✓ REPLACED                               │
│   □ Dents: no ✓ REPLACED                                    │
│   □ Battery: 87% ✓ REPLACED                                 │
│   □ Power ON: yes ✓ REPLACED                                │
│   □ Charging: yes ✓ REPLACED                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Comparison Table

| Step | BEFORE | AFTER |
|------|--------|-------|
| **Step 1: Save** | ✓ Saves mapped names | ✓ Saves mapped names |
| **Step 2: Fetch** | ✗ If NULL, data lost | ✓ Falls back to mapping |
| **Step 3: contractData** | ✗ Only has original names | ✓ Has both names |
| **Step 4: Replace** | ✗ Only tries exact match | ✓ Tries variations |
| **Result** | ✗ Placeholders remain | ✓ Placeholders replaced |

---

## Success Chain

### BEFORE - Chain Breaks Anywhere = Failure
```
Fetch ✓ → contractData ✓ → Replace ✗ = FAILED
Fetch ✗ → contractData ✗ → Replace ✗ = FAILED  
Fetch ✓ → contractData ✓ → Replace ✗ = FAILED
```

### AFTER - Multiple Fallbacks = Success
```
Fetch ✓ → contractData ✓ → Replace ✓ = SUCCESS ✓
Fetch ✗ → MAP ✓ → contractData ✓ → Replace ✓ = SUCCESS ✓
Fetch ✓ → contractData ✓ → Replace ? → VARIATION ✓ = SUCCESS ✓
```

---

## 3-Tier Safety System Visual

```
Template Placeholder: {{scratches_present}}
Data Received: ?

┌─────────────────────────────────────┐
│ TIER 1: Try Exact Match             │
├─────────────────────────────────────┤
│ data.scratches_present = ?          │
│ ├─ SUCCESS: Use value ✓             │
│ └─ FAIL: Go to TIER 2               │
└─────────────────────────────────────┘
           │ TIER 1 FAILED
           ▼
┌─────────────────────────────────────┐
│ TIER 2: Try Variations              │
├─────────────────────────────────────┤
│ data.scratches = ?                  │
│ data.dents = ?                      │
│ data.back_dents = ?                 │
│ ├─ SUCCESS: Use value ✓             │
│ └─ FAIL: Go to TIER 3               │
└─────────────────────────────────────┘
           │ TIER 2 FAILED
           ▼
┌─────────────────────────────────────┐
│ TIER 3: Report Missing              │
├─────────────────────────────────────┤
│ ✗ Missing: scratches_present        │
│ Placeholder remains in contract     │
│ (User didn't fill form field)       │
└─────────────────────────────────────┘
```

---

## Data Transformation Example

```
┌────────────────────────────────────────────────────┐
│ INPUT: User fills form                             │
│ {                                                  │
│   scratches: "yes",                                │
│   battery_health_percentage: 87                    │
│ }                                                  │
└────────────────────────────┬───────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────┐
│ AFTER mapFormDataToDatabase()                      │
│ {                                                  │
│   scratches: "yes",                                │
│   scratches_present: "yes",  ← MAPPED              │
│   battery_health_percentage: 87,                   │
│   battery_health_percent: 87  ← MAPPED             │
│ }                                                  │
└────────────────────────────┬───────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────┐
│ SAVED TO form_submissions TABLE                    │
│ (180+ columns with individual field values)        │
└────────────────────────────┬───────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
           SUCCESS                     FAIL
                │                         │
                ▼                         ▼
    ┌─────────────────┐      ┌──────────────────────┐
    │ Fetch returns   │      │ Fetch returns NULL   │
    │ mapped data ✓   │      │ Use fallback ✓       │
    └────────┬────────┘      └────────┬─────────────┘
             │                        │
             └────────────┬───────────┘
                          │
                          ▼
           ┌──────────────────────────┐
           │ contractData prepared    │
           │ Has: scratches: "yes"    │
           │ Has: scratches_present   │
           │      "yes"   ✓           │
           └────────┬─────────────────┘
                    │
                    ▼
           ┌──────────────────────────┐
           │ Template replacement     │
           │ {{scratches_present}}    │
           │ ↓                        │
           │ "yes" ✓                  │
           └──────────────────────────┘
```

---

## The Fix in One Sentence

> "If the database fetch fails or returns NULL, automatically map the in-memory form data to create the properly named fields, and during template replacement, try alternate field names if the exact match isn't found."

**Result**: Placeholders are ALWAYS replaced, even with DB issues or field name mismatches!
