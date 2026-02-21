# 📋 ANNEXURE EXPANSION PLAN
**Started:** November 28, 2025

## 🎯 CURRENT STATE (A-K = 11 Annexures)

| Code | Category | Description | Status |
|------|----------|-------------|--------|
| A | Electronics | General electronics, laptops, tablets | ✅ Complete |
| B | Mobile | Mobile phones, computing devices | ✅ Complete |
| C | Furniture | Sofas, chairs, tables, beds | ✅ Complete |
| D | Vehicles | Cars, bikes, scooters | ✅ Complete |
| E | Fashion & Apparel | Clothing, shoes, bags | ✅ Complete |
| F | Jewellery | Gold, silver, gems, ornaments | ✅ Complete |
| G | Building Materials | Fixtures, hardware, cement, steel | ✅ Complete |
| H | Collectibles | Limited editions, memorabilia | ✅ Complete |
| I | Industrial Machinery | Heavy equipment, generators | ✅ Complete |
| J | Books & Educational | Books, educational materials | ✅ Complete |
| K | Art & Handmade | Paintings, sculptures, crafts | ✅ Complete |

---

## 📝 PROPOSED NEW ANNEXURES (L, M, N, O, P...)

**Ready to add - one by one:**

### Option 1: ANNEXURE L — SPORTS & OUTDOOR EQUIPMENT
**Categories**: Cricket bats, golf clubs, camping gear, bicycles, gym equipment, etc.

**Key Fields**:
- Equipment type & brand
- Condition (new/used/refurbished)
- Warranty status
- Usage history
- Safety certifications (if any)
- Damage assessment (scratches, dents, functional issues)
- Original packaging & accessories
- Dispute window: 24 hours

---

### Option 2: ANNEXURE M — APPLIANCES & KITCHEN EQUIPMENT
**Categories**: Refrigerators, washing machines, microwaves, ovens, ACs, etc.

**Key Fields**:
- Appliance type & model
- Year of manufacture
- Power rating & energy efficiency
- Installation & warranty
- Service history
- Functional tests (heating, cooling, cycles)
- Accessories included
- Dispute window: 48 hours

---

### Option 3: ANNEXURE N — MUSICAL INSTRUMENTS
**Categories**: Guitars, keyboards, drums, wind instruments, etc.

**Key Fields**:
- Instrument type & brand
- Model & serial number
- Condition assessment
- Playability test (sound quality, intonation)
- Case/stand included
- Repairs/restoration history
- Certificate of authenticity (if applicable)
- Original strings/accessories
- Dispute window: 2 hours

---

### Option 4: ANNEXURE O — CAMERAS & PHOTOGRAPHY EQUIPMENT
**Categories**: DSLRs, mirrorless, smartphones with special focus, lenses, tripods, etc.

**Key Fields**:
- Camera type & brand
- Sensor specs (MP, ISO, shutter speed)
- Lens type & focal length
- Condition & usage count
- Shutter/sensor tests
- Warranty status
- Accessories (battery, charger, strap, bag)
- Dispute window: 48 hours

---

### Option 5: ANNEXURE P — GAMING CONSOLES & EQUIPMENT
**Categories**: PlayStation, Xbox, Nintendo Switch, gaming PCs, VR headsets, etc.

**Key Fields**:
- Console/equipment type
- Model & serial number
- Storage capacity
- Original packaging & accessories
- Controllers functional status
- Game performance test
- Warranty & service history
- HDMI/power ports functional
- Dispute window: 24 hours

---

### Option 6: ANNEXURE Q — HEALTH & WELLNESS EQUIPMENT
**Categories**: Treadmills, yoga mats, massage chairs, medical devices, water purifiers, etc.

**Key Fields**:
- Equipment type & brand
- Model & specifications
- Condition & usage history
- Functional tests (power, settings, moving parts)
- Warranty status
- Maintenance/repair history
- Original packaging & accessories
- Safety certifications
- Dispute window: 48 hours (except medical devices - 2 hours)

---

### Option 7: ANNEXURE R — PETS & PET SUPPLIES (if applicable)
**Categories**: Live pets, pet accessories, cages, feeders, etc.

**Key Fields**:
- Pet type & breed (if live)
- Age & health certificates
- Vaccination records
- Accessories condition
- Care instructions provided
- Health guarantee period
- Return policy (specific to pets)
- Dispute window: 24 hours

---

### Option 8: ANNEXURE S — SCHOOL & OFFICE SUPPLIES (Bulk)
**Categories**: Stationery sets, office furniture, school uniforms, bags, etc.

**Key Fields**:
- Item type & brand
- Quantity & packaging
- Expiry date (if applicable)
- Condition assessment
- Original packaging intact
- Damage in transit
- Bulk order verification
- Dispute window: 7 days

---

### Option 9: ANNEXURE T — EDUCATIONAL COURSES & SERVICES (Digital)
**Categories**: Online courses, coaching programs, tutorials, certifications

**Key Fields**:
- Course title & platform
- Instructor/institution
- Duration & curriculum
- Access type (lifetime, limited time)
- Prerequisites
- Refund policy (usually NO REFUND after enrolment)
- Certificate issued
- Support included
- Dispute window: 24 hours (only for non-access)

---

### Option 10: ANNEXURE U — SERVICES (Professional)
**Categories**: Plumbing, electrical work, carpentry, beauty services, etc.

**Key Fields**:
- Service type & scope
- Contractor qualifications
- Materials included
- Warranty on work
- Timeline & completion date
- Inspection criteria
- Dispute basis (workmanship, safety, completeness)
- Payment milestones
- Dispute window: 48 hours (quality issues), 30 days (safety issues)

---

## 🛠️ PROCESS TO ADD EACH ANNEXURE

### Step 1️⃣: **Create Annexure Template** (in `contractGenerationEngine.ts`)
```typescript
// Add to ANNEXURE_SECTIONS object
L: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE L — CATEGORY_NAME ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. ITEM IDENTIFICATION
   [Fields specific to category]

2. CONDITION ASSESSMENT
   [Category-specific damage checks]

3. FUNCTIONAL TESTS
   [How to verify it works]

4. ACCESSORIES & PACKAGING
   [What's included]

5. WARRANTY & SUPPORT
   [Coverage period]

6. DISPUTE VALIDITY
   VALID reasons: [...]
   INVALID reasons: [...]
═══════════════════════════════════════════════════════════════════════════
`
```

### Step 2️⃣: **Update Category Map** (in `ContractGenerationUI.tsx`)
```typescript
const CATEGORY_ANNEXURE_MAP = {
  // ... existing entries ...
  'new_category': 'L', // Add new entry
};
```

### Step 3️⃣: **Update Database Constraint** (in migration file)
```sql
-- Alter form_submissions table constraint
ALTER TABLE form_submissions
DROP CONSTRAINT form_submissions_annexure_code_check;

ALTER TABLE form_submissions
ADD CONSTRAINT form_submissions_annexure_code_check 
CHECK (annexure_code IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'));
```

### Step 4️⃣: **Update Form Field Definitions** (in field templates)
- Add category-specific fields to form schema
- Map to database columns
- Set required/optional flags

### Step 5️⃣: **Add Evidence Validation Rules** (in `evidenceValidationEngine.ts`)
```typescript
const evidenceRules = {
  'new_category': {
    category: 'new_category',
    annexure_code: 'L',
    required_photos: [...],
    required_documents: [...],
    required_tests: [...]
  }
};
```

### Step 6️⃣: **Add to Form Field Display** (in UI components)
- Add category option to category selector
- Display category-specific fields
- Show relevant evidence requirements

### Step 7️⃣: **Test End-to-End**
- Create form data for new category
- Generate contract with new annexure
- Verify all placeholders populated
- Check database storage
- Verify evidence validation

---

## 📊 CURRENT FILES TO MODIFY

When adding a new annexure, update these files:

1. **`src/services/contractGenerationEngine.ts`** (Add to ANNEXURE_SECTIONS)
2. **`src/components/ContractGenerationUI.tsx`** (Update CATEGORY_ANNEXURE_MAP)
3. **`src/services/evidenceValidationEngine.ts`** (Add evidence rules)
4. **`supabase/migrations/*.sql`** (Update annexure_code constraint)
5. **Form field definitions** (Add category fields)
6. **Database schema** (If new columns needed)

---

## 🚀 NEXT STEPS

**Which annexure would you like to add first?**

- [ ] L — Sports & Outdoor Equipment
- [ ] M — Appliances & Kitchen Equipment  
- [ ] N — Musical Instruments
- [ ] O — Cameras & Photography Equipment
- [ ] P — Gaming Consoles & Equipment
- [ ] Q — Health & Wellness Equipment
- [ ] R — Pets & Pet Supplies
- [ ] S — School & Office Supplies
- [ ] T — Educational Courses & Services
- [ ] U — Professional Services
- [ ] **Custom?** (Describe your category)

**Let's go one by one!** 👈 Which one first?

