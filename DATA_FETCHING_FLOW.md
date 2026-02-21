# Template Data Fetching Flow - Step by Step

## How Templates Fetch Data from form_submissions Table

### Overview
The system now guarantees that template placeholders are replaced with actual values from the form_submissions table, with multiple fallback mechanisms.

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│ USER FILLS FORM                                                       │
│ (scratches: "yes", dents: "no", battery_health_percentage: "87")      │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 1: SAVE TO form_submissions TABLE                               │
│ ├─ mapFormDataToDatabase() converts field names                      │
│ ├─ scratches → scratches_present                                     │
│ ├─ dents → dents_present                                             │
│ ├─ battery_health_percentage → battery_health_percent                │
│ └─ UPSERT to form_submissions (creates row with transaction_id)      │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 2: FETCH FROM form_submissions TABLE                            │
│                                                                       │
│ TRY 1: Database Fetch                                                │
│   SELECT * FROM form_submissions                                     │
│   WHERE transaction_id = '[user_transaction_id]'                     │
│   │                                                                   │
│   ├─ SUCCESS? → Save fetched data in savedFormData                   │
│   │   (has scratches_present, dents_present, etc.)                   │
│   │                                                                   │
│   └─ FAIL? (returns NULL or error) → TRY 2                           │
│                                                                       │
│ TRY 2: Fallback Mapping                                              │
│   mapFormDataToDatabase(state.formData)                              │
│   │                                                                   │
│   └─ Maps in-memory form data to get proper field names              │
│       (creates scratches_present, dents_present from state.formData) │
│       Save in savedFormData                                          │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 3: MERGE INTO contractData                                      │
│ ├─ contractData = { ...state.formData, ...savedFormData }            │
│ ├─ Now has BOTH original names AND mapped names                      │
│ ├─ Examples:                                                         │
│ │  ├─ scratches: "yes"         (from state.formData)                 │
│ │  ├─ scratches_present: "yes" (from savedFormData - MAPPED)         │
│ │  ├─ dents: "no"              (from state.formData)                 │
│ │  ├─ dents_present: "no"      (from savedFormData - MAPPED)         │
│ │  └─ ...                                                            │
│ └─ Mapped names take precedence if duplicate keys                    │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 4: PASS TO CONTRACT ENGINE                                      │
│ ├─ ContractGenerationEngine.generateContract(contractData)           │
│ └─ contractData now has all fields needed for template               │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 5: ENRICH FORM DATA                                             │
│ ├─ Detect if data is pre-enriched (has scratches_present, etc.)      │
│ ├─ If yes → Skip additional DB fetch (already enriched)              │
│ ├─ If no → Attempt to fetch from DB again                           │
│ └─ Merge any missing fields and return enrichedData                 │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 6: REPLACE PLACEHOLDERS IN TEMPLATE                             │
│ ├─ Load MASTER_CONTRACT_TEMPLATE with placeholders                   │
│ ├─ replacePlaceholders(template, enrichedData)                       │
│ │                                                                    │
│ ├─ For each {{placeholder}} in template:                             │
│ │  ├─ Extract fieldName = "scratches_present"                        │
│ │  ├─ Look for value in enrichedData[fieldName]                      │
│ │  │                                                                 │
│ │  ├─ TRY 1: Exact match                                             │
│ │  │  ├─ enrichedData.scratches_present → "yes" ✅ FOUND             │
│ │  │  └─ Replace {{scratches_present}} with "yes"                    │
│ │  │                                                                 │
│ │  ├─ TRY 2: Field variations (if exact match fails)                 │
│ │  │  ├─ Try: scratches, back_dents, etc.                           │
│ │  │  └─ If found → Use that value                                  │
│ │  │                                                                 │
│ │  └─ FAIL: If no value found                                        │
│ │     └─ Leave placeholder as-is, add to missing_fields              │
│ │                                                                    │
│ └─ Return: template with all placeholders replaced                   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│ FINAL OUTPUT - CONTRACT                                              │
│                                                                      │
│ USER-PROVIDED (Seller/Buyer Input):                                 │
│   □ Scratches: yes            ← Replaced from form_submissions      │
│   □ Dents: no                 ← Replaced from form_submissions      │
│   □ Battery Health: 87%       ← Replaced from form_submissions      │
│   □ Power ON: yes             ← Replaced from form_submissions      │
│   □ Charging: yes             ← Replaced from form_submissions      │
└─────────────────────────────────────────────────────────────────────┘
```

## Example Data Transformations

### Input Form Data (User fills form)
```json
{
  "scratches": "yes",
  "dents": "no",
  "back_dents": "no",
  "battery_health_percentage": 87,
  "power_on": "yes",
  "charging_working": "yes",
  "imei": "123456789012345"
}
```

### STEP 1 Output (After mapFormDataToDatabase)
```json
{
  "scratches": "yes",
  "scratches_present": "yes",      ← Mapped
  "dents": "no",
  "dents_present": "no",           ← Mapped
  "back_dents": "no",
  "battery_health_percentage": 87,
  "battery_health_percent": 87,    ← Mapped
  "power_on": "yes",
  "power_on_working": "yes",       ← Mapped
  "charging_working": "yes",
  "charges": "yes",
  "imei": "123456789012345",
  "imei_1": "123456789012345"      ← Mapped
}
```

### STEP 2 Output (After fetch + merge)
**Saved in form_submissions table, then fetched:**
```json
{
  "transaction_id": "uuid-123",
  "user_id": "user-456",
  "product_category": "mobile",
  "annexure_code": "MOBILE_001",
  "scratches_present": "yes",
  "dents_present": "no",
  "battery_health_percent": 87,
  "power_on_working": "yes",
  "charging_working": "yes",
  "imei_1": "123456789012345",
  ... [180+ other fields]
}
```

### STEP 3 Output (After contractData merge)
```json
{
  // From state.formData (original names)
  "scratches": "yes",
  "dents": "no",
  "battery_health_percentage": 87,
  "power_on": "yes",
  
  // From savedFormData (mapped names - PRIORITY)
  "scratches_present": "yes",
  "dents_present": "no",
  "battery_health_percent": 87,
  "power_on_working": "yes",
  "charging_working": "yes",
  "imei_1": "123456789012345",
  
  // From KYC profiles
  "seller_name": "John Seller",
  "buyer_name": "Jane Buyer",
  "seller_email": "john@example.com",
  ... [more fields]
}
```

### STEP 5 Output (After enrichFormData)
```json
{
  // All fields from contractData
  "scratches_present": "yes",
  "dents_present": "no",
  "battery_health_percent": 87,
  "power_on_working": "yes",
  "charging_working": "yes",
  
  // Additional enriched fields
  "contract_generated_at": "2025-11-27T10:30:00Z",
  "contract_id": "uuid-123-V1",
  "escrow_amount": 25000,
  "platform_fee": 250,
  "inspection_window_hours": 24,
  ... [all fields ready for template]
}
```

### STEP 6 Output (After replacePlaceholders)
```
PART B — FIELD CONTROL MATRIX

USER-PROVIDED (Seller/Buyer Input):
  □ Product Name: Samsung S25 Ultra
  □ Brand: Samsung
  □ Model: SM-S9110
  □ Serial: 123456789
  □ Condition: new
  □ Scratches: yes                    ← REPLACED (was {{scratches_present}})
  □ Dents: no                         ← REPLACED (was {{dents_present}})
  □ Battery Health: 87%               ← REPLACED (was {{battery_health_percent}}%)
  □ Power ON: yes                     ← REPLACED (was {{power_on_working}})
  □ Charging: yes                     ← REPLACED (was {{charging_working}})
  □ Price: ₹25,000
  □ Delivery: courier
```

## Field Name Mapping Reference

### Condition Assessment Fields
| Original (Form) | Mapped (Database) | Template Placeholder | Example Value |
|---|---|---|---|
| scratches | scratches_present | {{scratches_present}} | yes/no |
| dents | dents_present | {{dents_present}} | yes/no |
| back_dents | dents_present | {{dents_present}} | yes/no |
| battery_health_percentage | battery_health_percent | {{battery_health_percent}} | 87 |
| power_on / turns_on | power_on_working | {{power_on_working}} | yes/no |
| charging_working / charges | charging_working | {{charging_working}} | yes/no |

### Identification Fields
| Original (Form) | Mapped (Database) | Template Placeholder |
|---|---|---|
| imei | imei_1 | {{imei_1}} |
| imei1 | imei_1 | {{imei_1}} |
| imei2 | imei_2 | {{imei_2}} |

## Multiple Fallback Mechanisms

```
Template looks for: {{scratches_present}}

TRY 1: Exact field name
  data.scratches_present → "yes" ✅ FOUND!

If TRY 1 fails, TRY 2: Field variations
  data.scratches → "yes" ✅ FOUND!
  
If TRY 2 fails, TRY 3: Show error
  ❌ Missing field: scratches_present
  (Placeholder stays as {{scratches_present}} in contract)
```

## Why This Works

1. **Dual Storage**: Every field is stored with both original name AND mapped name
2. **Fallback Fetching**: If DB fetch fails, we map the in-memory data
3. **Variation Matching**: replacePlaceholders tries multiple field names
4. **Comprehensive Logging**: Every step logs what's happening

This ensures that even if one mechanism fails, another catches it and provides the value.

## Verification

To verify the entire flow is working:

1. **Form Entry**: User enters "Scratches: Yes"
2. **Console Check (STEP 1)**: Look for `scratches_present: "yes"` in mapped data
3. **Console Check (STEP 2)**: Look for `scratches_present: "yes" TYPE: string` from DB
4. **Console Check (STEP 5)**: Look for `scratches_present: yes` in enrichedData
5. **Console Check (STEP 6)**: Look for `Placeholder: {{scratches_present}}, Value: yes`
6. **Contract Output**: Should show `Scratches: yes` (not `{{scratches_present}}`)

If all checks pass ✅, the entire pipeline is working correctly!
