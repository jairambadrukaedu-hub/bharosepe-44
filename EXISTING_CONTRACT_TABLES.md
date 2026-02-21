# EXISTING CONTRACT TABLES ANALYSIS

## Table 1: CONTRACTS
**Total Columns:** 14 columns
**Purpose:** Main contract storage table

### Structure:
```
id                  | uuid                        | NO    (Primary Key)
transaction_id      | character varying           | NO    (Foreign key to transactions)
master_template_id  | uuid                        | YES   (Link to contract template)
annexure_id         | uuid                        | YES   (Link to annexure)
seller_id           | uuid                        | YES   (Foreign key to seller profile)
buyer_id            | uuid                        | YES   (Foreign key to buyer profile)
contract_content    | text                        | NO    (Full contract text/HTML)
contract_summary    | text                        | YES   (Summary of contract)
status              | character varying           | YES   (draft/active/signed/completed)
seller_accepted_at  | timestamp without time zone | YES   (When seller signed)
buyer_accepted_at   | timestamp without time zone | YES   (When buyer signed)
accepted_metadata   | jsonb                       | YES   (Metadata from acceptance)
created_at          | timestamp without time zone | YES   (Creation timestamp)
updated_at          | timestamp without time zone | YES   (Update timestamp)
```

### Key Observations:
- ✅ Already has transaction_id reference
- ✅ Already has seller_id and buyer_id
- ✅ Stores full contract_content (text)
- ✅ Tracks acceptance timestamps
- ✅ Has status field for workflow
- ✅ JSONB field for metadata

### Contract Workflow:
1. Contract created and stored in contracts table
2. contract_content populated with full text
3. seller_accepted_at set when seller signs
4. buyer_accepted_at set when buyer signs
5. Status moves: draft → active → signed → completed

---

## Table 2: CONTRACT_TEMPLATES (or CONTRACT_METADATA)
**Total Columns:** 21 columns
**Purpose:** Track contract template usage and metadata

### Structure:
```
id                  | uuid                        | YES   (Primary Key)
contract_id         | uuid                        | YES   (Foreign key to contracts table)
transaction_id      | uuid                        | YES   (Foreign key to transactions)
seller_id           | uuid                        | YES   (Seller reference)
buyer_id            | uuid                        | YES   (Buyer reference)
product_category    | character varying           | YES   (Product category code)
annexure_code       | character                   | YES   (Annexure type)
status              | text                        | YES   (Template status)
populated_fields    | integer                     | YES   (Count of filled placeholders)
total_placeholders  | integer                     | YES   (Total placeholders in template)
escrow_amount       | numeric                     | YES   (Escrow transaction amount)
platform_fee        | numeric                     | YES   (Platform fee amount)
inspection_deadline | timestamp without time zone | YES   (Inspection window deadline)
has_dispute         | boolean                     | YES   (Whether dispute exists)
dispute_status      | character varying           | YES   (dispute status)
seller_signed_at    | timestamp without time zone | YES   (Seller signature timestamp)
buyer_signed_at     | timestamp without time zone | YES   (Buyer signature timestamp)
created_at          | timestamp with time zone    | YES   (Creation timestamp)
updated_at          | timestamp with time zone    | YES   (Update timestamp)
contract_content    | text                        | YES   (Contract content copy)
contract_hash       | character varying           | YES   (Hash for integrity check)
terms               | text                        | YES   (Contract terms)
created_by          | uuid                        | YES   (User who created contract)
```

### Key Observations:
- ✅ Tracks placeholder replacement success (populated_fields / total_placeholders)
- ✅ Has dispute tracking (has_dispute, dispute_status)
- ✅ Has signature tracking (seller_signed_at, buyer_signed_at)
- ✅ Tracks financial data (escrow_amount, platform_fee)
- ✅ Has contract_hash for integrity
- ✅ Tracks inspection deadline
- ✅ Stores product_category and annexure_code

---

## Recommendation: UPDATE STRATEGY

### Option A: Use Existing Tables (RECOMMENDED)
1. **contracts table:** Store final contract text
2. **contract_templates table:** Track metadata, placeholder replacement, disputes, signatures

**Flow:**
```
1. Query form_submissions + profiles to get data
2. Load MASTER_CONTRACT_TEMPLATE.md
3. Replace all {{placeholders}} with actual values
4. Insert into contracts table (contract_content + metadata)
5. Insert into contract_templates table (tracking + metadata)
6. Update status as contract progresses
```

### Option B: Create New Specialized Tables
- Not recommended - these tables already exist and fit the use case

---

## Integration Points

### With CONTRACTS Table:
- Store populated contract text
- Track seller/buyer acceptance
- Store accepted metadata
- Use status field for workflow

### With CONTRACT_TEMPLATES Table:
- Track placeholder replacement success rate
- Record populated_fields / total_placeholders count
- Store dispute information
- Track signatures and timestamps
- Record escrow and fee information

---

## Next Steps:
1. **Create Contract Generation Service** that:
   - Fetches data from form_submissions + profiles
   - Loads MASTER_CONTRACT_TEMPLATE.md
   - Replaces all 50+ {{placeholders}} with actual values
   - Calculates placeholder replacement success rate
   - Inserts into contracts + contract_templates tables

2. **Placeholder Replacement** strategy:
   - {{seller_full_name}} → data.seller_full_name
   - {{buyer_full_name}} → data.buyer_full_name
   - {{product_name}} → data.product_name
   - etc. (50+ placeholders)

3. **Success Metric:**
   - populated_fields / total_placeholders >= 0.99 (99% success rate)
   - Previous target: >99% (instead of 70%)

---

## Status: READY FOR IMPLEMENTATION
Both tables exist and are ready to receive:
- ✅ contracts table - ready
- ✅ contract_templates table - ready
- ⏳ Contract generation service - needs implementation
