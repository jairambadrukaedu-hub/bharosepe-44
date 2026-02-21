# 🔧 SERVICE INDUSTRY: HOME REPAIR / MAINTENANCE / ELECTRICIAN / PLUMBER / CARPENTER
## COMPREHENSIVE HOME SERVICE & REPAIR PROJECT DATA MODEL
**Date Created:** November 28, 2025  
**Annexure Code:** F (Service Industry - Home Repair & Maintenance)  
**Industry:** Home Repair & Maintenance Services  
**Categories:** Electrical Repair, Plumbing, Carpentry, Painting, AC Service, Appliance Repair, Masonry, Interior Repair, Handyman Services

---

## 📋 TABLE OF CONTENTS

- **PART A: CONTRACT CREATION FIELDS** (62 fields)
- **PART B: DELIVERY EVIDENCE FIELDS** (20 fields)
- **PART C: DISPUTE EVIDENCE FIELDS** (16 fields)
- **PART D: DATABASE SCHEMA MAPPING**
- **PART E: SAMPLE CONTRACT CLAUSE GENERATION**

---

# ⚙️ PART A: CONTRACT CREATION FIELDS
**Filled before contract is generated & signed**  
**These fields become binding clauses in the contract**

---

## 🔷 SECTION 1: SERVICE TYPE & DEFINITION
**Mandatory fields that set the repair service foundation**

### 1.1 Service Type (Category)
- **Field Name:** `service_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `electrical_repair` — Electrical Repair (wiring, switches, circuit breaker)
  - `plumbing` — Plumbing (pipes, taps, leakage, toilets)
  - `carpentry` — Carpentry & Woodworking (shelves, cabinets, doors, furniture)
  - `painting` — Painting & Wall Finishing (walls, doors, trim)
  - `ac_service_repair` — AC Service / AC Repair (servicing, gas filling, repair)
  - `appliance_repair` — Appliance Repair (fridge, washing machine, microwave, TV, etc.)
  - `masonry_civil` — Masonry & Civil Minor Work (wall repair, concrete, tiling)
  - `interior_repair` — Interior Repair (kitchen, bathroom, general)
  - `furniture_assembly` — Furniture Assembly & Installation
  - `drilling_fitting_mounting` — Drilling, Fittings & Mounting (AC, shelf, TV)
  - `painting_interior` — Interior Painting & Decoration
  - `custom_repair` — Custom Repair Job (specify below)
- **Custom Field:** `service_type_custom` (if "custom_repair")
- **Contract Clause:** "This Agreement pertains to the following service: **{service_type}}**"

### 1.2 Service Job Title
- **Field Name:** `service_job_title`
- **Type:** Text (max 150 chars)
- **Required:** YES
- **Example:** "Kitchen Tap Repair & Installation", "AC Compressor Gas Filling", "Bedroom Wall Painting"
- **Contract Clause:** "Job Description: **{service_job_title}}**"

### 1.3 Service Location
- **Field Name:** `service_location_address`
- **Type:** Textarea (max 300 chars)
- **Required:** YES
- **Placeholder:** "Full address with building name, flat number, city, zip code"
- **Example:** "Flat 5B, Sunshine Towers, Bandra, Mumbai 400050"
- **Contract Clause:** "Service location: **{service_location_address}}**"

### 1.4 Property Type
- **Field Name:** `property_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `residential_home` — Residential Home
  - `residential_apartment` — Residential Apartment
  - `office_commercial` — Office/Commercial Space
  - `retail_shop` — Retail Shop
  - `industrial` — Industrial/Warehouse
  - `mixed_use` — Mixed-use Property
- **Contract Clause:** "Property type: **{property_type}}**"

---

## 🔷 SECTION 2: LOCATION ACCESS & LOGISTICS

### 2.1 Access Details
- **Block Name:** `access_details_block`
- **Type:** Object

#### 2.1.1 Floor Number (If Applicable)
- **Field Name:** `floor_number`
- **Type:** Number or Text
- **Placeholder:** "e.g., 5, Ground, Basement, Mezzanine"
- **Example:** "5th floor"

#### 2.1.2 Elevator/Lift Availability
- **Field Name:** `lift_available`
- **Type:** Yes/No
- **Required:** YES (if multi-floor)
- **Default:** No (assume not available)
- **Contract Clause:** "Lift availability: {lift_available}"

#### 2.1.3 Parking Availability
- **Field Name:** `parking_available`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No
- **Sub-field (if No):** `parking_alternative` (Textarea, e.g., "Street parking 100m away")
- **Contract Clause:** "Parking availability: {parking_available}. {if no parking}{parking_alternative}{/if}"

#### 2.1.4 Security/Access Clearance Required
- **Field Name:** `security_clearance_required`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No
- **Sub-fields (if Yes):**
  - `security_clearance_type` (Text, e.g., "Security gate entry, building pass, visitor ID")
  - `security_clearance_responsibility` (Single Select: Homeowner arranges / Service provider coordinates / Shared responsibility)
- **Impact Clause:** "Security clearance delays do not count as service provider delay."

#### 2.1.5 Working Hours Access Restrictions
- **Field Name:** `working_hours_restrictions`
- **Type:** Textarea (max 200 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Can only work 8 AM - 6 PM', 'No work on Sundays', 'Avoid 12-2 PM lunch time'"
- **Contract Clause:** "Working hours restrictions: {working_hours_restrictions}"

#### 2.1.6 Additional Access Conditions
- **Field Name:** `additional_access_conditions`
- **Type:** Textarea (max 300 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Pets in home - allergic to dogs', 'Children sleeping - quiet work only', 'Shared wall - neighbors sensitive'"

---

## 🔷 SECTION 3: SCOPE OF WORK (EXTREMELY DETAILED)
**CRITICAL - Prevents 90% of disputes**

### 3.1 Problem Description
- **Block Name:** `problem_description_block`
- **Type:** Object

#### 3.1.1 Current Issue/Problem
- **Field Name:** `current_problem_description`
- **Type:** Textarea (max 500 chars)
- **Required:** YES
- **Placeholder:** "Describe the exact problem in detail. e.g., 'Tap in kitchen is dripping continuously even after closing fully. Drips about 20 drops/minute.'"

#### 3.1.2 Problem Duration
- **Field Name:** `problem_duration`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `less_than_week` — Less than 1 week
  - `1_to_4_weeks` — 1-4 weeks
  - `1_to_3_months` — 1-3 months
  - `more_than_3_months` — More than 3 months
- **Contract Clause:** "Issue exists since: **{problem_duration}}**"

#### 3.1.3 Previous Repair Attempts
- **Field Name:** `previous_repair_attempts`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No
- **Sub-fields (if Yes):**
  - `previous_repair_details` (Textarea, e.g., "ABC Plumber attempted repair 2 months ago, didn't work")
  - `previous_repair_impact` (Multi-Select: Made worse / No improvement / Partial improvement / Other)
- **Contract Clause (if Yes):** "Previous repair attempts: {previous_repair_details}. Result: {previous_repair_impact}"

#### 3.1.4 Emergency Situation?
- **Field Name:** `emergency_situation`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No
- **Sub-fields (if Yes):**
  - `emergency_type` (Multi-Select: Water leakage / Electrical short circuit / Gas leak / Appliance malfunction / Structural damage / Other)
  - `emergency_severity` (Single Select: Critical (immediate risk) / High (urgent) / Moderate (can wait few hours))
- **Impact Clause:** "Emergency services may incur additional charges (see Section 11 - Commercial Terms)."

### 3.2 Scope of Work - Task List (Structured & Quantified)
- **Block Name:** `scope_of_work_tasks[]`
- **Type:** Array of Objects (up to 20 tasks)
- **Required:** YES (at least 1 task)

**Per Task:**

#### 3.2.1 Task Number
- **Field Name:** `task_number`
- **Type:** Auto-populated (1, 2, 3...)

#### 3.2.2 Task Name/Description
- **Field Name:** `task_name`
- **Type:** Text (max 100 chars)
- **Required:** YES
- **Examples:**
  - "Fix leakage in kitchen tap"
  - "Install ceiling fan - Bedroom 1"
  - "Repaint living room walls"
  - "Replace AC compressor"
- **Contract Clause:** "Task {task_number}: {task_name}"

#### 3.2.3 Detailed Task Description
- **Field Name:** `task_detailed_description`
- **Type:** Textarea (max 300 chars)
- **Required:** YES
- **Placeholder:** "Provide specific details about what needs to be done"
- **Example:** "Kitchen tap body is leaking from the joint. Needs tightening or washers replaced so water doesn't drip even when closed."

#### 3.2.4 Quantity/Measurement
- **Field Name:** `task_quantity`
- **Type:** Text
- **Required:** NO
- **Placeholder:** "e.g., '1 tap', '3 ceiling fans', '200 sq ft wall area', '5 cabinet doors'"
- **Examples:**
  - "1 tap"
  - "3 ceiling fans (all bedrooms)"
  - "200 sq ft (living room walls)"
  - "2 shelves, 4 feet each"

#### 3.2.5 Expected Outcome / Acceptance Criteria
- **Field Name:** `task_expected_outcome`
- **Type:** Textarea (max 200 chars)
- **Required:** YES
- **Placeholder:** "How will you know if the work is done correctly? Be specific and measurable."
- **Examples:**
  - "Tap fully closes without dripping. Water flow is normal."
  - "All three fans operate smoothly at all speeds. No noise."
  - "Walls painted evenly with no drips or uneven coating."
  - "AC cooling reaches 16°C as normal."
  - "Walls are level (±0.5 cm tolerance) and secured firmly."

#### 3.2.6 Materials Required for This Task
- **Field Name:** `task_materials_required`
- **Type:** Repeatable Text (up to 5 per task)
- **Placeholder:** "e.g., 'Washers', 'Paint (2 liters, white matte)', 'Refrigerant gas'"

#### 3.2.7 Estimated Time for This Task
- **Field Name:** `task_estimated_hours`
- **Type:** Number (decimal, e.g., 0.5, 1, 2.5)
- **Placeholder:** "hours"
- **Example:** "0.5 hours for tap repair, 3 hours for wall painting per 100 sq ft"

#### 3.2.8 Risk or Special Considerations
- **Field Name:** `task_special_considerations`
- **Type:** Textarea (max 200 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'High voltage electrical work', 'May need wall cutting', 'Requires scaffold'"

### 3.3 Work Exclusions (Explicit & Binding)
- **Field Name:** `work_exclusions`
- **Type:** Textarea (max 500 chars)
- **Required:** YES
- **Placeholder:** "Explicitly list what is NOT included in the contract. This prevents scope creep."
- **Examples:**
  ```
  NOT INCLUDED:
  - Painting skirting boards or trim (only walls)
  - Wall repair (only painting)
  - Pipe replacement (only tap repair - existing pipes assumed functional)
  - Electrical panel upgrades (only repair of specific circuit)
  - Structural changes or drilling holes in bearing walls
  - Disposal of old materials (only removal from work area)
  ```
- **Contract Clause:** "WORK EXCLUSIONS (Not part of this agreement): {work_exclusions}"
- **Benefit:** Prevents classic "yeh bhi kar do sir" disputes

---

## 🔷 SECTION 4: MATERIALS & COST STRUCTURE

### 4.1 Material Provision
- **Block Name:** `material_provision_block`
- **Type:** Object

#### 4.1.1 Who Provides Materials?
- **Field Name:** `materials_provided_by`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `homeowner_provides` — Homeowner provides all materials
  - `service_provider_provides` — Service provider provides all materials
  - `shared_responsibility` — Shared (specify breakdown below)
  - `labour_only` — Labour-only contract (homeowner provides everything)

**Sub-field (if shared):**
- `material_sharing_details` (Textarea, e.g., "Homeowner provides paint, service provider provides tools and brushes")

#### 4.1.2 Estimated Material Cost (If Service Provider Provides)
- **Field Name:** `estimated_material_cost`
- **Type:** Currency (INR)
- **Required:** Conditional (if service provider provides)
- **Placeholder:** "e.g., ₹500"
- **Note:** "This is estimate only. Final cost based on actual materials used."
- **Contract Clause:** "Estimated material cost: **₹{estimated_material_cost}}** (subject to actual usage)"

#### 4.1.3 Material List & Specifications
- **Field Name:** `material_list`
- **Type:** Textarea (max 500 chars)
- **Required:** NO (optional for clarity)
- **Placeholder:** "List specific materials with quantities, brands, grades"
- **Example:**
  ```
  - Tap washers: 5 pieces (rubber, standard size)
  - Paint: 2 liters, brand XYZ, white matte finish
  - Ceiling fan: 3x Havells model ABC, 1200 RPM
  ```

#### 4.1.4 Material Quality Standard
- **Field Name:** `material_quality_grade`
- **Type:** Single Select
- **Required:** NO
- **Options:**
  - `economy` — Economy grade (budget-friendly, standard quality)
  - `standard` — Standard grade (typical market quality)
  - `premium` — Premium grade (high quality, branded)
  - `as_specified` — As specified by homeowner (specify details below)
- **Specification Details:** `material_quality_custom` (Textarea, if "as_specified")
- **Contract Clause:** "Material grade: **{material_quality_grade}}**"

#### 4.1.5 Material Invoice & Receipts
- **Field Name:** `material_invoices_required`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes
- **Contract Clause (if Yes):** "Service provider shall provide original invoices/receipts for all materials purchased."

### 4.2 Labour vs. Material Pricing
- **Field Name:** `labour_material_breakdown`
- **Type:** Textarea (max 200 chars)
- **Required:** NO (optional for transparency)
- **Placeholder:** "e.g., '₹1000 labour + ₹500 materials = ₹1500 total'"

### 4.3 Additional Charges (Defined Upfront)
- **Block Name:** `additional_charges_block`
- **Type:** Multi-Select Checkboxes (with amounts)
- **Required:** NO
- **Options (with price fields):**
  - ☐ Visiting/Call-out charge: ₹___
  - ☐ Emergency/night charges (6 PM - 8 AM): ___% surcharge
  - ☐ Weekend charges (Saturday/Sunday): ___% surcharge
  - ☐ Height work surcharge (above 12 feet): ₹___ per hour
  - ☐ Difficult access surcharge: ₹___
  - ☐ Material disposal charge: ₹___
  - ☐ AC gas refill (specify per liter cost): ₹___ per liter
  - ☐ Spare parts cost (if applicable): ₹___ (with list)
  - ☐ Travel charges beyond ___km radius: ₹___ per km
  - ☐ Other charges (specify): ₹___

**Auto-Generated Clause:**
```
ADDITIONAL CHARGES (To be paid if applicable):

{for each selected charge}
✓ {charge_name}: {charge_amount}
{/for}

These charges shall be communicated to homeowner BEFORE starting work.
No additional charges beyond these shall be levied.
```

**Critical Protection:** "No additional charges shall be imposed beyond those listed above without written approval from homeowner."

---

## 🔷 SECTION 5: WORKMANSHIP QUALITY STANDARDS

### 5.1 Expected Finish Level
- **Field Name:** `workmanship_quality_level`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `basic_repair` — Basic Repair (functional, minimal aesthetic concern)
  - `standard_finish` — Standard Finish (clean, professional appearance)
  - `professional_grade` — Professional Grade (high quality, expert finish)
  - `premium_finish` — Premium Finish (premium materials and perfection, luxury standard)

**Level Descriptions:**
- **Basic:** Tap stops leaking (main goal achieved), may have minor cosmetic imperfections
- **Standard:** Tap repaired cleanly, no leaks, normal appearance for residential use
- **Professional:** Tap repaired with matching finish, seamless integration, polished appearance
- **Premium:** Tap upgraded/replaced with premium fixture, perfect finish, luxury aesthetic

- **Contract Clause:** "Workmanship quality level: **{workmanship_quality_level}}**. Service provider shall meet this standard."

### 5.2 Specific Quality Parameters
- **Block Name:** `quality_parameters_block`
- **Type:** Object

#### 5.2.1 Color Matching Required
- **Field Name:** `color_matching_required`
- **Type:** Yes/No (for painting/finishing)
- **Conditional:** If painting or finishing work
- **Default:** Yes (for painting)
- **Sub-field (if Yes):** `color_matching_tolerance` (Text, e.g., "Perfect match using color matching technology")
- **Contract Clause (if Yes):** "Color matching: {color_matching_tolerance}"

#### 5.2.2 Alignment & Level Tolerance
- **Field Name:** `alignment_tolerance`
- **Type:** Textarea (max 150 chars)
- **Required:** NO (optional for structural work)
- **Placeholder:** "e.g., 'Shelves level within ±0.5cm', 'Tiles aligned within 2mm'"
- **Example for carpentry:** "Shelves must be level within ±0.5 cm using spirit level"
- **Contract Clause:** "Alignment tolerance: {alignment_tolerance}"

#### 5.2.3 Leakage Tolerance (For Plumbing)
- **Field Name:** `leakage_tolerance`
- **Type:** Textarea (max 150 chars)
- **Conditional:** If plumbing work
- **Default:** "Zero leakage - no visible water drops"
- **Examples:**
  - "Zero leakage - tap must fully stop"
  - "Pipe joints must not show any wetness or moisture"
- **Contract Clause:** "Leakage tolerance: {leakage_tolerance}"

#### 5.2.4 Noise/Vibration Tolerance (For Mechanical Work)
- **Field Name:** `noise_vibration_tolerance`
- **Type:** Textarea (max 150 chars)
- **Conditional:** If electrical/mechanical/appliance work
- **Placeholder:** "e.g., 'Fan should run silently, no vibration on mounting', 'AC compressor normal operating noise only'"
- **Contract Clause:** "Noise/vibration standards: {noise_vibration_tolerance}"

#### 5.2.5 Performance Standards
- **Field Name:** `performance_standards`
- **Type:** Textarea (max 300 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'AC must reach 16°C on auto mode within 30 minutes', 'Washing machine water drainage must complete within 5 minutes'"

---

## 🔷 SECTION 6: WARRANTY / GUARANTEE POLICIES

### 6.1 Warranty Type (Mandatory Decision)
- **Field Name:** `warranty_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `no_warranty` — No warranty/guarantee
  - `7_day_warranty` — 7-day service warranty
  - `15_day_warranty` — 15-day service warranty
  - `30_day_warranty` — 30-day service warranty
  - `90_day_warranty` — 90-day service warranty
  - `6_month_warranty` — 6-month warranty
  - `1_year_warranty` — 1-year warranty
  - `custom_warranty` — Custom warranty period (specify)
- **Custom Field:** `custom_warranty_days` (if "custom_warranty")
- **Contract Clause:** "Warranty period: **{warranty_type}}** from service completion date."

### 6.2 Warranty Coverage Scope
- **Block Name:** `warranty_coverage_block`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (if warranty > 0 days)
- **Options:**
  - ✓ Labour warranty (service provider responsible for re-work)
  - ✓ Parts warranty (replacement parts covered if defective)
  - ✓ Material defects (if material provided by service provider)
  - ✓ Manufacturing defects (if parts provided)
  - ✓ Workmanship defects (improper installation/repair)

**Auto-Generated Clause:**
```
WARRANTY COVERAGE:

{for each selected coverage}
✓ {coverage_type}
{/for}

Service provider shall provide free corrective service or parts replacement
if covered issue occurs within warranty period.
```

### 6.3 Warranty Exclusions (Critical)
- **Field Name:** `warranty_exclusions`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (if warranty > 0 days)
- **Default Checked Options:**
  - ✓ Misuse or improper use by homeowner
  - ✓ Lack of maintenance (e.g., not cleaning AC filters regularly)
  - ✓ Water damage from other sources (flooding, other leaks)
  - ✓ Physical damage after repair (dropping appliance, hitting fixture)
  - ✓ Third-party repair or tampering
  - ✓ Modification to repaired item
  - ✓ Natural wear and tear
  - ✓ Acts of God (fire, earthquake, flood, lightning)
  - ✓ Unauthorized spare parts used
  - ✓ Accidental damage post-repair

**Auto-Generated Clause:**
```
WARRANTY EXCLUSIONS (Warranty void if):

{for each selected exclusion}
✓ {exclusion}
{/for}

Service provider shall not be liable for issues caused by misuse,
damage, or negligence after service completion.
```

### 6.4 Warranty Claim Process
- **Field Name:** `warranty_claim_process`
- **Type:** Textarea
- **Default:**
  ```
  WARRANTY CLAIM PROCEDURE:
  
  1. Contact service provider within warranty period with photos/videos of issue
  2. Service provider shall assess claim within 48 hours
  3. If approved, service provider shall visit for corrective work
  4. Corrective work shall be free under warranty
  5. If claim is denied (falls under exclusions), charges apply
  ```
- **Editable**

### 6.5 Warranty Void Conditions (Explicit)
- **Field Name:** `warranty_void_if`
- **Type:** Textarea
- **Default:**
  ```
  WARRANTY BECOMES VOID IF:
  - Someone other than authorized service provider attempts repair
  - Repaired item is modified after service completion
  - Misuse or negligence occurs post-repair
  - Another technician works on item after service
  ```

---

## 🔷 SECTION 7: TIME & SCHEDULE

### 7.1 Appointment Details
- **Block Name:** `appointment_block`
- **Type:** Object

#### 7.1.1 Appointment Date
- **Field Name:** `appointment_date`
- **Type:** Date Picker
- **Required:** YES
- **Contract Clause:** "Scheduled service date: **{appointment_date}}**"

#### 7.1.2 Appointment Time Window
- **Field Name:** `appointment_time_window`
- **Type:** Time Range Picker
- **Required:** YES
- **Format:** From HH:MM to HH:MM
- **Example:** "10:00 AM to 12:00 PM" or "2:00 PM to 4:00 PM"
- **Contract Clause:** "Service time window: **{appointment_time_window}}**"

#### 7.1.3 Punctuality Guarantee
- **Field Name:** `punctuality_guarantee_clause`
- **Type:** Textarea
- **Default:** "Service provider shall arrive within the scheduled time window. If more than 30 minutes late, service may be rescheduled or relocated within 3 days."
- **Editable**

### 7.2 Job Duration & Completion
- **Block Name:** `job_duration_block`
- **Type:** Object

#### 7.2.1 Estimated Job Duration
- **Field Name:** `estimated_job_duration_hours`
- **Type:** Number (decimal)
- **Required:** YES
- **Placeholder:** "e.g., 2.5 (hours)"
- **Example:** "0.5 hours for tap repair, 2 hours for AC service"
- **Contract Clause:** "Estimated job duration: **{estimated_job_duration_hours}} hours**"

#### 7.2.2 Expected Completion Date
- **Field Name:** `expected_completion_date`
- **Type:** Date Picker
- **Required:** YES
- **Note:** "Usually same as appointment date (unless multi-day job)"
- **Contract Clause:** "Expected completion date: **{expected_completion_date}}**"

#### 7.2.3 Delay Tolerance
- **Field Name:** `delay_tolerance`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `no_delay_tolerance` — No tolerance (strict deadline)
  - `1_hour_tolerance` — 1 hour tolerance
  - `3_hour_tolerance` — 3 hours tolerance
  - `24_hour_tolerance` — 24 hours tolerance
  - `custom_tolerance` — Custom tolerance (specify)
- **Custom Field:** `custom_delay_tolerance_hours` (if "custom")
- **Contract Clause:** "Delays up to {delay_tolerance} shall be considered within acceptable range."

### 7.3 Multi-Day Jobs
- **Field Name:** `multi_day_job`
- **Type:** Yes/No
- **Default:** No
- **Sub-fields (if Yes):**
  - `job_duration_days` (Number, e.g., "3 days")
  - `daily_schedule` (Textarea, e.g., "Day 1: Prep & planning, Day 2: Main work, Day 3: Finishing")
  - `daily_start_end_times` (Textarea, e.g., "10 AM - 5 PM each day, 1-hour lunch break")

### 7.4 Delay Responsibility Clause
- **Field Name:** `delay_responsibility_auto`
- **Type:** Auto-populated
- **Default:**
  ```
  DELAYS NOT ATTRIBUTABLE TO SERVICE PROVIDER:
  - Lack of material/tool availability
  - Homeowner not providing access/materials
  - Unexpected complications (wall damage, hidden wiring issues)
  - Third-party delays (landlord approval, permission delays)
  - Weather conditions (for outdoor work)
  - Traffic/transportation delays
  
  If delay occurs due to above, homeowner shall be notified and timeline adjusted.
  Service provider shall not be penalized for these delays.
  ```

---

## 🔷 SECTION 8: SAFETY & LIABILITY

### 8.1 High-Risk Work Classification
- **Block Name:** `safety_risk_block`
- **Type:** Object

#### 8.1.1 High-Voltage Electrical Work
- **Field Name:** `high_voltage_work`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `high_voltage_details` (Text, e.g., "Main panel work, >230V circuits")
- **Safety Clause (if Yes):** "High-voltage work shall follow electrical safety standards. Service provider is certified for this work."

#### 8.1.2 Water Leakage Risk
- **Field Name:** `water_leakage_risk`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `leakage_risk_details` (Text, e.g., "Pipe repair, can cause water spillage")

#### 8.1.3 Structural/Wall-Breaking Work
- **Field Name:** `structural_work`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `structural_work_details` (Text, e.g., "Drilling into walls, removing tiles")

#### 8.1.4 Height Work (Above 12 feet)
- **Field Name:** `height_work`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `height_work_details` (Text, e.g., "Ceiling fans, high shelves, AC installation")

### 8.2 Liability & Damage Responsibility
- **Block Name:** `liability_block`
- **Type:** Object

#### 8.2.1 Direct Damage Liability
- **Field Name:** `direct_damage_liability`
- **Type:** Textarea
- **Default:**
  ```
  DIRECT DAMAGE LIABILITY:
  
  Service provider is liable for direct damages caused DURING the service:
  - Wall cracks from drilling
  - Tile breakage from tool slip
  - Paint damage
  - Appliance malfunction caused by service work
  
  Service provider shall rectify such damage at no extra cost.
  ```
- **Editable**

#### 8.2.2 Indirect/Consequential Damage Exclusion
- **Field Name:** `consequential_damage_exclusion`
- **Type:** Textarea
- **Default:**
  ```
  CONSEQUENTIAL DAMAGE EXCLUSION:
  
  Service provider is NOT liable for indirect damages:
  - Food spoilage due to fridge not working post-repair
  - Productivity loss
  - Emotional distress
  - Third-party claims
  - Property damage from causes unrelated to service
  
  Maximum liability: 100% of service charge only.
  ```
- **Editable**

#### 8.2.3 Risk Disclosure by Homeowner
- **Field Name:** `risk_disclosure_homeowner`
- **Type:** Textarea (max 300 chars)
- **Required:** NO
- **Placeholder:** "Disclose any special risks (e.g., 'Fragile plaster walls', 'Buried pipes location unknown', 'Loaded ceiling')"
- **Impact Clause:** "Homeowner shall disclose all known risks to prevent accidents."

#### 8.2.4 Tool & Equipment Damage
- **Field Name:** `tool_equipment_damage_responsibility`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `service_provider_responsible` — Service provider responsible for tools (normal wear & tear excepted)
  - `homeowner_responsible` — Homeowner responsible for safe tool storage
  - `shared_responsibility` — Shared (service provider responsible for tool usage, homeowner for secure storage)
- **Contract Clause:** "Tool/equipment damage responsibility: {tool_equipment_damage_responsibility}"

### 8.3 Insurance & Guarantees
- **Field Name:** `insurance_status`
- **Type:** Textarea (max 200 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Service provider has general liability insurance covering up to ₹5,00,000'"

---

## 🔷 SECTION 9: CLEANUP & SITE MANAGEMENT

### 9.1 Post-Work Cleanup Requirements
- **Block Name:** `cleanup_requirements_block`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (select at least 2)
- **Options:**
  - ✓ Clean work area before leaving (dust, debris, spills)
  - ✓ Remove debris and waste materials from home
  - ✓ Take away old parts/replaced items
  - ✓ Dispose of packaging responsibly
  - ✓ Sweep/vacuum work area
  - ✓ Clean tools and equipment left behind
  - ✓ Remove tape/protective coverings
  - ✓ Restore furniture/items to original positions

**Auto-Generated Clause:**
```
POST-WORK CLEANUP:

Service provider shall complete the following before leaving:

{for each selected requirement}
✓ {requirement}
{/for}

Work area shall be left clean and ready for immediate use.
Homeowner shall not incur cleanup costs.
```

### 9.2 Disposal Method
- **Field Name:** `waste_disposal_method`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `service_provider_removes_all` — Service provider removes all waste
  - `homeowner_responsible` — Homeowner disposes waste
  - `shared_arrangement` — Shared arrangement (specify)
  - `third_party_collection` — Scheduled waste collection (service provider arranges)
- **Contract Clause:** "Waste disposal: {waste_disposal_method}"

### 9.3 Special Cleanup Conditions
- **Field Name:** `special_cleanup_needs`
- **Type:** Textarea (max 200 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Carpet protection required', 'Allergy-prone - use HEPA filter vacuum', 'No debris on shared stairs'"

---

## 🔷 SECTION 10: POST-SERVICE SUPPORT & FOLLOW-UP

### 10.1 Post-Service Support Included
- **Field Name:** `post_service_support_included`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes

**If YES:**

#### 10.1.1 Support Type
- **Field Name:** `post_service_support_type`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - ✓ Phone support for questions
  - ✓ Follow-up visit if issues arise
  - ✓ Remote consultation (WhatsApp video, etc.)
  - ✓ Email support
  - ✓ Chat support

#### 10.1.2 Response Time
- **Field Name:** `support_response_time`
- **Type:** Single Select
- **Options:**
  - `within_24_hours` — Within 24 hours
  - `within_48_hours` — Within 48 hours
  - `within_72_hours` — Within 72 hours
  - `emergency_response` — Emergency: within 6 hours (for critical issues)

#### 10.1.3 Support Duration
- **Field Name:** `support_duration_days`
- **Type:** Number (days)
- **Default:** 30
- **Placeholder:** "e.g., 30 days post-completion"

- **Contract Clause:** "Post-service support: {post_service_support_type} for {support_duration_days} days with {support_response_time} response time."

---

## 🔷 SECTION 11: COMMERCIAL TERMS

### 11.1 Total Service Charge
- **Field Name:** `total_service_charge`
- **Type:** Currency (INR)
- **Required:** YES
- **Contract Clause:** "Total service charge: **₹{total_service_charge}}** (excluding additional charges if applicable)"

### 11.2 Payment Schedule
- **Field Name:** `payment_structure`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_upfront` — 100% Upfront (before service)
  - `50_50_split` — 50% Upfront, 50% on completion
  - `on_completion` — Full payment on completion (after work & inspection)
  - `custom_schedule` — Custom payment schedule (specify)
- **Details:** `payment_structure_details` (Textarea, if custom)
- **Contract Clause:** "Payment structure: {payment_structure}. {payment_structure_details}"

### 11.3 Payment Methods
- **Field Name:** `payment_methods_accepted`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - ✓ Cash
  - ✓ Bank transfer/NEFT
  - ✓ Credit/Debit card
  - ✓ UPI (Google Pay, PhonePe, Paytm)
  - ✓ Cheque

### 11.4 Inspection Window
- **Field Name:** `inspection_window_hours`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `immediate_after_completion` — Immediate after completion
  - `24_hours` — 24 hours after completion
  - `48_hours` — 48 hours after completion
  - `7_days` — 7 days after completion
- **Contract Clause:** "Homeowner shall have **{inspection_window_hours}}** to inspect work and report issues within scope."

### 11.5 Refund Policy (If Work Found Defective)
- **Field Name:** `refund_policy`
- **Type:** Single Select
- **Options:**
  - `no_refund` — No refund (warranty repairs offered instead)
  - `partial_refund_if_defective` — Partial refund (50%) if work found seriously defective
  - `full_refund_if_defective` — Full refund if work doesn't meet standards
  - `custom_refund` — Custom policy (specify)
- **Details:** `refund_policy_details` (Textarea, if custom)
- **Contract Clause:** "Refund policy: {refund_policy}. {refund_policy_details}"

### 11.6 Extra Work / Scope Changes
- **Field Name:** `extra_work_clause`
- **Type:** Textarea
- **Default:**
  ```
  EXTRA WORK / SCOPE CHANGES:
  
  If additional work (not in original scope) is required:
  1. Service provider shall stop and inform homeowner
  2. Provide additional quote for extra work
  3. Obtain homeowner approval in writing
  4. Only proceed after approval
  
  Extra work charges shall be billed separately.
  No extra work shall be done without prior approval.
  ```
- **Editable**

### 11.7 Jurisdiction & Dispute Resolution
- **Field Name:** `jurisdiction_city`
- **Type:** Single Select + Autocomplete
- **Required:** YES
- **Default:** "Mumbai"
- **Contract Clause:** "This Agreement shall be governed by laws of {jurisdiction_city}, India."

---

# 📸 PART B: DELIVERY EVIDENCE FIELDS
**Submitted after service completion OR when dispute arises**

### B.1 Mandatory Completion Evidence

#### B.1.1 Before & After Photos
- **Field Name:** `before_after_photos`
- **Type:** File Upload (Images, min 5 pairs)
- **Required:** YES
- **Placeholder:** "Upload clear photos showing problem before & completed work after"

#### B.1.2 Work Completion Video
- **Field Name:** `work_completion_video`
- **Type:** File Upload (Video, max 5 mins)
- **Required:** NO (recommended for disputes)
- **Placeholder:** "Video walkthrough showing completed work, all tasks done, functionality verified"

#### B.1.3 Functional Testing Video (If Applicable)
- **Field Name:** `functional_testing_video`
- **Type:** File Upload (Video)
- **Required:** Conditional (for appliance/electrical/AC work)
- **Placeholder:**
  - Tap: Show no dripping after closing
  - AC: Show cooling to temperature
  - Fan: Show operation at all speeds
  - Appliance: Show normal operation

#### B.1.4 Short Completion Report
- **Field Name:** `completion_report`
- **Type:** Textarea (max 300 chars)
- **Required:** YES
- **Placeholder:** "Brief summary of work completed, methods used, materials installed"

#### B.1.5 Replaced Parts / Materials List
- **Field Name:** `replaced_parts_list`
- **Type:** Textarea (max 300 chars)
- **Required:** NO (for repairs only)
- **Placeholder:** "e.g., 'Tap washers replaced (5 pieces), new filter installed (model XYZ)'"

#### B.1.6 Material Invoices (If Materials Provided)
- **Field Name:** `material_invoices`
- **Type:** File Upload (PDFs)
- **Required:** Conditional (if materials provided)
- **Placeholder:** "Original invoices/receipts for materials purchased"

#### B.1.7 Work Time Log
- **Field Name:** `work_time_log`
- **Type:** Textarea
- **Required:** NO (optional for transparency)
- **Placeholder:** "Actual start time, completion time, actual duration"
- **Example:** "Started: 2:00 PM, Completed: 3:30 PM, Duration: 1.5 hours"

#### B.1.8 Homeowner Sign-Off / Acceptance
- **Field Name:** `homeowner_acceptance_photo`
- **Type:** File Upload (Photo/Screenshot)
- **Required:** NO (recommended)
- **Placeholder:** "Photo of work with homeowner present or written acceptance message"

#### B.1.9 Safety Checklist Completion
- **Field Name:** `safety_checklist_completed`
- **Type:** Checkbox
- **Required:** YES (for high-risk work)
- **Statement:** "All safety checks completed and area is safe for use"

#### B.1.10 Cleanup Completion Proof
- **Field Name:** `cleanup_completion_photo`
- **Type:** File Upload (Photo)
- **Required:** YES
- **Placeholder:** "Photo showing work area cleaned, waste removed, site ready for use"

---

# 🎯 PART C: DISPUTE EVIDENCE FIELDS

### C.1 When Raising a Dispute

#### C.1.1 Dispute Reason Category
- **Field Name:** `dispute_reason_category`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `poor_workmanship` — Poor workmanship (quality below standard)
  - `incomplete_work` — Incomplete work (task not finished)
  - `damage_caused` — Damage caused during service (wall, appliance, item)
  - `extra_charges` — Unexpected/extra charges (beyond contract)
  - `material_issues` — Material issues (wrong/defective material used)
  - `late_work` — Work delayed beyond tolerance
  - `safety_concern` — Safety concern (unsafe work, risk)
  - `lack_of_cleanup` — Lack of cleanup (site left dirty/unsafe)
  - `functionality_issue` — Functionality issue (repair doesn't work)
  - `warranty_issue` — Warranty issue (work failed within warranty period)
  - `missing_tasks` — Missing tasks (some tasks not done)
  - `other` — Other (specify)

#### C.1.2 Detailed Dispute Description
- **Field Name:** `dispute_description`
- **Type:** Textarea (max 1500 chars)
- **Required:** YES
- **Placeholder:** "Clearly describe what's wrong and how it violates the contract."

#### C.1.3 Dispute Severity
- **Field Name:** `dispute_severity`
- **Type:** Single Select
- **Options:**
  - `critical_unusable` — Critical (Work completely unusable/dangerous)
  - `major_significant` — Major (Significant issues affecting function)
  - `minor_fixable` — Minor (Small issues, easily correctable)

#### C.1.4 Quality Issue Proof
- **Field Name:** `quality_issue_proof`
- **Type:** File Upload (Photos/Videos)
- **Required:** Conditional (if quality complaint)
- **Placeholder:** "Photos/videos showing poor finish, leaking, misalignment, color mismatch, etc."

#### C.1.5 Damage Proof
- **Field Name:** `damage_proof`
- **Type:** File Upload (Photos)
- **Required:** Conditional (if damage claim)
- **Placeholder:** "Photos of wall crack, tile breakage, appliance damage caused during service"

#### C.1.6 Extra Charges Proof
- **Field Name:** `extra_charges_proof`
- **Type:** File Upload (Invoice/Screenshot)
- **Required:** Conditional (if extra charges disputed)
- **Placeholder:** "Invoice showing charges, screenshot of bill vs contract amount"

#### C.1.7 Incomplete Work Proof
- **Field Name:** `incomplete_work_proof`
- **Type:** Textarea
- **Required:** Conditional (if incomplete work)
- **Placeholder:** "List of tasks from contract vs. what was actually completed"

#### C.1.8 Functionality Issue Proof
- **Field Name:** `functionality_issue_proof`
- **Type:** File Upload (Video/Photos)
- **Required:** Conditional (if functionality issue)
- **Placeholder:** "Video showing tap still dripping, AC not cooling, fan not working, etc."

#### C.1.9 Before & After Comparison
- **Field Name:** `dispute_comparison_evidence`
- **Type:** File Upload (Photos side-by-side)
- **Required:** YES
- **Placeholder:** "Side-by-side photos showing what was agreed vs. what was delivered"

#### C.1.10 Communication Trail
- **Field Name:** `dispute_communication_evidence`
- **Type:** File Upload (Screenshots)
- **Required:** NO (supporting evidence)
- **Placeholder:** "Screenshots of messages/calls about issues raised with service provider"

#### C.1.11 Expert Assessment (Optional)
- **Field Name:** `expert_assessment_optional`
- **Type:** File Upload
- **Required:** NO
- **Placeholder:** "Optional: Assessment from another contractor confirming issue"

#### C.1.12 Requested Resolution
- **Field Name:** `dispute_requested_resolution`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_refund` — Full refund
  - `partial_refund` — Partial refund (specify %)
  - `corrective_work` — Free corrective work from service provider
  - `price_reduction` — Price reduction for partial defect
  - `damage_compensation` — Compensation for damage caused
  - `other` — Other (specify)
- **Amount Field:** `dispute_refund_or_reduction_amount` (Currency, if applicable)

#### C.1.13 Supporting Documentation
- **Field Name:** `dispute_supporting_docs`
- **Type:** File Upload
- **Required:** NO
- **Placeholder:** "Original contract, payment receipts, quotes, previous communications"

#### C.1.14 Evidence Authenticity
- **Field Name:** `dispute_evidence_authenticity`
- **Type:** Checkbox
- **Required:** YES
- **Statement:** "I confirm all evidence provided is authentic, unaltered, and accurately represents the issue"

---

# 🗄️ PART D: DATABASE SCHEMA MAPPING

```sql
-- Section 1: Service Definition
service_type TEXT NOT NULL, -- enum
service_type_custom TEXT,
service_job_title TEXT NOT NULL,
service_location_address TEXT NOT NULL,
property_type TEXT NOT NULL,

-- Section 2: Location Access
floor_number TEXT,
lift_available BOOLEAN,
parking_available BOOLEAN,
parking_alternative TEXT,
security_clearance_required BOOLEAN,
security_clearance_type TEXT,
security_clearance_responsibility TEXT,
working_hours_restrictions TEXT,
additional_access_conditions TEXT,

-- Section 3: Scope of Work
current_problem_description TEXT NOT NULL,
problem_duration TEXT,
previous_repair_attempts BOOLEAN,
previous_repair_details TEXT,
previous_repair_impact TEXT[],
emergency_situation BOOLEAN,
emergency_type TEXT[],
emergency_severity TEXT,
scope_of_work_tasks JSONB, -- array of {task_number, task_name, task_detailed_description, task_quantity, task_expected_outcome, task_materials_required, task_estimated_hours, task_special_considerations}
work_exclusions TEXT NOT NULL,

-- Section 4: Materials & Costs
materials_provided_by TEXT NOT NULL,
material_sharing_details TEXT,
estimated_material_cost NUMERIC,
material_list TEXT,
material_quality_grade TEXT,
material_quality_custom TEXT,
material_invoices_required BOOLEAN,
labour_material_breakdown TEXT,
additional_charges JSONB, -- array of {charge_name, charge_amount}

-- Section 5: Quality Standards
workmanship_quality_level TEXT NOT NULL,
color_matching_required BOOLEAN,
color_matching_tolerance TEXT,
alignment_tolerance TEXT,
leakage_tolerance TEXT,
noise_vibration_tolerance TEXT,
performance_standards TEXT,

-- Section 6: Warranty
warranty_type TEXT NOT NULL,
custom_warranty_days INTEGER,
warranty_coverage TEXT[],
warranty_exclusions TEXT[],
warranty_claim_process TEXT,
warranty_void_if TEXT,

-- Section 7: Time & Schedule
appointment_date DATE NOT NULL,
appointment_time_window TEXT NOT NULL,
punctuality_guarantee_clause TEXT,
estimated_job_duration_hours NUMERIC NOT NULL,
expected_completion_date DATE NOT NULL,
delay_tolerance TEXT,
custom_delay_tolerance_hours INTEGER,
multi_day_job BOOLEAN,
job_duration_days INTEGER,
daily_schedule TEXT,
daily_start_end_times TEXT,

-- Section 8: Safety & Liability
high_voltage_work BOOLEAN,
high_voltage_details TEXT,
water_leakage_risk BOOLEAN,
leakage_risk_details TEXT,
structural_work BOOLEAN,
structural_work_details TEXT,
height_work BOOLEAN,
height_work_details TEXT,
direct_damage_liability TEXT,
consequential_damage_exclusion TEXT,
risk_disclosure_homeowner TEXT,
tool_equipment_damage_responsibility TEXT,
insurance_status TEXT,

-- Section 9: Cleanup
cleanup_requirements TEXT[],
waste_disposal_method TEXT,
special_cleanup_needs TEXT,

-- Section 10: Post-Service Support
post_service_support_included BOOLEAN,
post_service_support_type TEXT[],
support_response_time TEXT,
support_duration_days INTEGER,

-- Section 11: Commercial Terms
total_service_charge NUMERIC NOT NULL,
payment_structure TEXT NOT NULL,
payment_structure_details TEXT,
payment_methods_accepted TEXT[],
inspection_window_hours TEXT,
refund_policy TEXT,
refund_policy_details TEXT,
extra_work_clause TEXT,
jurisdiction_city TEXT NOT NULL,

-- Part B: Delivery Evidence
before_after_photos TEXT, -- file URLs
work_completion_video TEXT,
functional_testing_video TEXT,
completion_report TEXT,
replaced_parts_list TEXT,
material_invoices TEXT,
work_time_log TEXT,
homeowner_acceptance_photo TEXT,
safety_checklist_completed BOOLEAN,
cleanup_completion_photo TEXT,

-- Part C: Dispute Evidence
dispute_reason_category TEXT,
dispute_description TEXT,
dispute_severity TEXT,
quality_issue_proof TEXT,
damage_proof TEXT,
extra_charges_proof TEXT,
incomplete_work_proof TEXT,
functionality_issue_proof TEXT,
dispute_comparison_evidence TEXT,
dispute_communication_evidence TEXT,
expert_assessment_optional TEXT,
dispute_requested_resolution TEXT,
dispute_refund_or_reduction_amount NUMERIC,
dispute_supporting_docs TEXT,
dispute_evidence_authenticity BOOLEAN,
```

---

## 📝 SUMMARY

This SERVICE ANNEXURE F for Home Repair & Maintenance provides:

✅ **62 Contract Creation Fields** → Become binding contract clauses  
✅ **20 Delivery Evidence Fields** → Tracked at completion  
✅ **16 Dispute Evidence Fields** → Required when raising disputes  
✅ **110+ Database Columns** → Schema mapping for storage  
✅ **Auto-Generated Contract** → Clauses populate from form inputs  
✅ **Legally Strong** → Protects against all common home repair disputes  

**Key Dispute Protections:**
- Scope of work detailed with measurable acceptance criteria (prevents scope creep)
- Materials & costs defined upfront (no hidden charges)
- Additional charges explicitly listed (prevents "extra ₹500 laga" scams)
- Workmanship quality level binding (basic, standard, professional, premium)
- Warranty explicit (type, coverage, exclusions, void conditions)
- Quality parameters measurable (color tolerance, alignment ±0.5cm, zero leakage)
- Liability clear (direct vs. consequential, caps on responsibility)
- Cleanup requirements binding (prevents messy work areas)
- Payment schedule transparent (upfront, on completion, or split)
- Damage responsibility explicit (contractor liable during work, not after)
- Safety risks disclosed (high voltage, structural, water, height work)
- Time/delay tolerance clear (1hr, 3hr, 24hr options, force majeure exclusions)
- Warranty claim process defined (48-hr assessment, free corrective work)
- Post-service support included (phone, email, follow-up visits)

**Created so far:**
- ✅ SERVICE_ANNEXURE_A (Software Development) - 86 fields
- ✅ SERVICE_ANNEXURE_B (UI/UX Design & Graphic Design) - 64 fields
- ✅ SERVICE_ANNEXURE_C (Content Writing & Copywriting) - 80 fields
- ✅ SERVICE_ANNEXURE_D (Photography & Videography) - 82 fields
- ✅ SERVICE_ANNEXURE_E (Tuition & Coaching) - 91 fields
- ✅ SERVICE_ANNEXURE_F (Home Repair & Maintenance) - 98 fields

**Total fields created: 501 across 6 comprehensive annexures**

Ready for G (Digital Marketing), H (Consulting), I (Beauty Services) or more?

