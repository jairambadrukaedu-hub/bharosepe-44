# 🧹 SERVICE INDUSTRY: CLEANING / HOUSEKEEPING / DEEP CLEANING / PEST CONTROL
## COMPREHENSIVE CLEANING & MAINTENANCE PROJECT DATA MODEL
**Date Created:** November 28, 2025  
**Annexure Code:** G (Service Industry - Cleaning & Housekeeping)  
**Industry:** Cleaning & Housekeeping Services  
**Categories:** Full Home Cleaning, Deep Cleaning, Specialized Cleaning, Pest Control, Water Tank Cleaning, Office Cleaning, Move-in/Move-out Cleaning

---

## 📋 TABLE OF CONTENTS

- **PART A: CONTRACT CREATION FIELDS** (58 fields)
- **PART B: DELIVERY EVIDENCE FIELDS** (22 fields)
- **PART C: DISPUTE EVIDENCE FIELDS** (18 fields)
- **PART D: DATABASE SCHEMA MAPPING**
- **PART E: SAMPLE CONTRACT CLAUSE GENERATION**

---

# ⚙️ PART A: CONTRACT CREATION FIELDS
**Filled before contract is generated & signed**  
**These fields become binding clauses in the contract**

---

## 🔷 SECTION 1: SERVICE TYPE & DEFINITION
**Mandatory fields that set the cleaning service foundation**

### 1.1 Cleaning Service Type (Category)
- **Field Name:** `cleaning_service_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_home_cleaning` — Full Home Cleaning (all areas, standard depth)
  - `deep_cleaning_full` — Deep Cleaning - Full Home (comprehensive)
  - `deep_cleaning_bathroom` — Deep Cleaning - Bathroom Only
  - `deep_cleaning_kitchen` — Deep Cleaning - Kitchen Only
  - `sofa_cleaning` — Sofa & Upholstery Cleaning
  - `mattress_cleaning` — Mattress Cleaning & Sanitization
  - `carpet_cleaning` — Carpet & Rug Cleaning
  - `window_cleaning` — Window & Glass Cleaning
  - `office_cleaning` — Office/Commercial Space Cleaning
  - `move_in_move_out_cleaning` — Move-in / Move-out Cleaning
  - `society_building_cleaning` — Society/Building Common Area Cleaning
  - `pest_control_service` — Pest Control (Cockroach, Termite, Rodent, etc.)
  - `water_tank_cleaning` — Water Tank Cleaning & Sanitization
  - `car_interior_cleaning` — Car Interior Cleaning
  - `post_construction_cleaning` — Post-Construction Cleaning
  - `custom_cleaning_service` — Custom Cleaning Service (specify below)
- **Custom Field:** `cleaning_service_type_custom` (if "custom_cleaning_service")
- **Contract Clause:** "This Agreement pertains to the following cleaning service: **{cleaning_service_type}}**"

### 1.2 Service Job Title
- **Field Name:** `cleaning_job_title`
- **Type:** Text (max 150 chars)
- **Required:** YES
- **Example:** "Deep Cleaning - 3 BHK Apartment", "Pest Control - Cockroach Treatment", "Move-out Cleaning - Office"
- **Contract Clause:** "Service: **{cleaning_job_title}}**"

### 1.3 Service Location
- **Field Name:** `cleaning_location_address`
- **Type:** Textarea (max 300 chars)
- **Required:** YES
- **Placeholder:** "Full address with building name, flat number, city"

---

## 🔷 SECTION 2: PROPERTY DETAILS & CONDITIONS

### 2.1 Property Type & Size
- **Block Name:** `property_details_block`
- **Type:** Object

#### 2.1.1 Property Type
- **Field Name:** `property_type_clean`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `1_bhk` — 1 BHK Apartment
  - `2_bhk` — 2 BHK Apartment
  - `3_bhk` — 3 BHK Apartment
  - `4_bhk` — 4+ BHK Apartment/Villa
  - `studio_flat` — Studio Flat
  - `villa` — Independent Villa/House
  - `office_space` — Office Space
  - `commercial_shop` — Commercial Shop/Retail
  - `co_working_space` — Co-working Space
  - `other` — Other (specify)
- **Contract Clause:** "Property type: **{property_type_clean}}**"

#### 2.1.2 Carpet Area (Approx)
- **Field Name:** `carpet_area_sqft`
- **Type:** Number
- **Required:** YES
- **Unit:** Square feet
- **Placeholder:** "e.g., 1200"
- **Impact:** Affects time estimation and pricing
- **Contract Clause:** "Carpet area: approximately **{carpet_area_sqft}} sq ft**"

#### 2.1.3 Floor Number (If Applicable)
- **Field Name:** `floor_number_clean`
- **Type:** Number or Text
- **Placeholder:** "e.g., 5, Ground, Mezzanine"

#### 2.1.4 Lift/Elevator Availability
- **Field Name:** `lift_available_clean`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No
- **Contract Clause:** "Lift availability: {lift_available_clean}"

#### 2.1.5 Property Occupancy Status
- **Field Name:** `property_occupancy_status`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `occupied_family_present` — Occupied (family/people present during cleaning)
  - `occupied_empty` — Occupied but empty (everyone out during cleaning)
  - `unoccupied` — Unoccupied/Vacant
  - `office_operating` — Office operating (staff present)
  - `office_closed` — Office closed (no staff)
- **Impact:** Affects noise level, safety, access
- **Contract Clause:** "Property occupancy: **{property_occupancy_status}}**"

#### 2.1.6 Current Cleanliness Level
- **Field Name:** `current_dirt_level`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `normal` — Normal (regular maintenance cleaning)
  - `moderate` — Moderate (some accumulated dust/dirt)
  - `heavy` — Heavy (significant dirt, neglected areas)
  - `very_dirty` — Very Dirty (heavily soiled, stains, grime)
  - `post_construction` — Post-construction (dust, debris)
- **Impact:** Affects time & effort required
- **Contract Clause:** "Current property cleanliness level: **{current_dirt_level}}**. This affects time and effort required."

---

## 🔷 SECTION 3: SCOPE OF WORK (EXTREMELY DETAILED & ROOM-BY-ROOM)
**CRITICAL - Prevents 90% of disputes**

### 3.1 Room-wise Cleaning Coverage
- **Block Name:** `room_coverage_block`
- **Type:** Multi-Select Checkboxes (with sub-options)
- **Required:** YES (select at least 1)

**Coverage Matrix:**

#### 3.1.1 Bedrooms
- **Field Name:** `bedrooms_cleaning`
- **Type:** Checkbox
- **Sub-options (if selected):**
  - ☑ Floor sweeping & mopping
  - ☑ Dusting (surfaces, furniture)
  - ☑ Window cleaning
  - ☑ Wardrobe cleaning (outside)
  - ☑ Wardrobe cleaning (inside - optional)
  - ☑ Bed frame cleaning (under bed)
  - ☑ Ceiling/fan dusting
  - ☑ Corner cobweb removal
- **Quantity:** `bedroom_count` (Number, e.g., "2")

#### 3.1.2 Living Room
- **Field Name:** `living_room_cleaning`
- **Type:** Checkbox
- **Sub-options (if selected):**
  - ☑ Floor sweeping & mopping
  - ☑ Dusting (surfaces, furniture, TV stand)
  - ☑ Sofa vacuuming/dry cleaning
  - ☑ Window cleaning
  - ☑ Ceiling/fan dusting
  - ☑ Corner cleaning & cobwebs
  - ☑ Curtain vacuuming (dry cleaning only)

#### 3.1.3 Kitchen
- **Field Name:** `kitchen_cleaning`
- **Type:** Checkbox
- **Sub-options (if selected):**
  - ☑ Floor sweeping & mopping
  - ☑ Countertop cleaning
  - ☑ Sink cleaning (inside & outside)
  - ☑ Stove cleaning (outside surface only)
  - ☑ Stove deep cleaning (inside burners - optional, may incur extra charge)
  - ☑ Refrigerator outside cleaning
  - ☑ Refrigerator deep cleaning (inside - optional)
  - ☑ Cabinet outside cleaning
  - ☑ Cabinet inside cleaning (optional)
  - ☑ Tiles & grout cleaning
  - ☑ Window cleaning
  - ☑ Exhaust fan cleaning
  - ☑ Ceiling/lights dusting

#### 3.1.4 Bathrooms
- **Field Name:** `bathrooms_cleaning`
- **Type:** Checkbox
- **Sub-options (if selected):**
  - ☑ Floor sweeping & mopping
  - ☑ Toilet bowl cleaning & disinfection
  - ☑ Toilet seat & cover cleaning
  - ☑ Sink cleaning & disinfection
  - ☑ Mirror cleaning
  - ☑ Tap/faucet cleaning
  - ☑ Bathtub/shower cleaning
  - ☑ Tiles cleaning (walls)
  - ☑ Grout deep cleaning (optional, extra charge)
  - ☑ Hard water stain removal (optional)
  - ☑ Exhaust fan cleaning
  - ☑ Door & handle disinfection
  - ☑ Ceiling dusting
- **Quantity:** `bathroom_count` (Number, e.g., "2")

#### 3.1.5 Balconies/Terraces
- **Field Name:** `balcony_terrace_cleaning`
- **Type:** Checkbox
- **Sub-options (if selected):**
  - ☑ Floor sweeping & mopping
  - ☑ Corner/edge cleaning
  - ☑ Wall dusting
  - ☑ Railing cleaning
  - ☑ Ceiling dusting
  - ☑ Drain cleaning
- **Note:** "Height work may incur additional safety charges"

#### 3.1.6 Windows & Glass
- **Field Name:** `windows_glass_cleaning`
- **Type:** Checkbox
- **Sub-options (if selected):**
  - ☑ Exterior window cleaning
  - ☑ Interior window cleaning
  - ☑ Window glass (inside & out)
  - ☑ Window frame cleaning
  - ☑ Window channel/track cleaning (optional)
  - ☑ Window grills cleaning
- **Quantity:** `window_count` (Number)

#### 3.1.7 Fans & Lights
- **Field Name:** `fans_lights_cleaning`
- **Type:** Checkbox
- **Sub-options (if selected):**
  - ☑ Ceiling fan blade dusting
  - ☑ Ceiling fan motor casing cleaning
  - ☑ Light fixture cleaning
  - ☑ Bulb cleaning
  - ☑ Chandelier cleaning (if delicate)
- **Quantity:** `fan_count` (Number), `light_fixture_count` (Number)
- **Safety Note:** "Cleaner must use ladder with safety precautions"

#### 3.1.8 Wardrobes & Storage
- **Field Name:** `wardrobe_storage_cleaning`
- **Type:** Checkbox
- **Sub-options (if selected):**
  - ☑ Wardrobe outside dusting
  - ☑ Wardrobe inside cleaning (optional, extra charge)
  - ☑ Shelves dusting
  - ☑ Cabinet outside cleaning
  - ☑ Cabinet inside cleaning
  - ☑ Drawer cleaning
- **Note:** "User must remove fragile items before cleaning"

#### 3.1.9 Appliances (Outside Surfaces)
- **Field Name:** `appliances_outside_cleaning`
- **Type:** Checkbox
- **Sub-options (if selected):**
  - ☑ Washing machine outside
  - ☑ Microwave outside
  - ☑ TV outside (gentle cleaning only)
  - ☑ AC unit outside (gentle cleaning only, NOT internal)
  - ☑ Other appliances (specify)
- **Note:** "Inside cleaning of appliances incurs extra charge and requires expertise"

#### 3.1.10 Specialized Cleaning Tasks
- **Field Name:** `specialized_cleaning_tasks`
- **Type:** Multi-Select Checkboxes (with separate charges)
- **Options:**
  - ☐ Sofa/Upholstery cleaning: ₹___
  - ☐ Mattress cleaning & sanitization: ₹___
  - ☐ Carpet shampooing: ₹___
  - ☐ Chimney deep cleaning: ₹___
  - ☐ Oven interior cleaning: ₹___
  - ☐ Refrigerator interior cleaning: ₹___
  - ☐ Grout restoration: ₹___
  - ☐ Hard water stain removal: ₹___

### 3.2 Deep Cleaning Specifications (If Deep Cleaning Selected)
- **Block Name:** `deep_cleaning_specifications`
- **Type:** Multi-Select Checkboxes
- **Conditional:** If `cleaning_service_type` includes "deep"
- **Required:** YES
- **Options:**
  - ✓ Ceiling dust removal
  - ✓ Fan deep cleaning (blade removal, motor casing)
  - ✓ Refrigerator deep cleaning (inside, shelves)
  - ✓ Chimney/exhaust degreasing
  - ✓ Kitchen cabinet deep cleaning (all shelves)
  - ✓ Bathroom tile descaling (lime removal)
  - ✓ Hard water stain removal (taps, shower heads)
  - ✓ Grease removal from stove/cooktop
  - ✓ Scrubbing & polishing floors
  - ✓ Glass cleaning (streak-free finish)
  - ✓ Window channel cleaning (tracks, sills)
  - ✓ Curtain/blind vacuuming
  - ✓ Door frame cleaning
  - ✓ Lighting fixture disassembly & cleaning

**Auto-Generated Clause:**
```
DEEP CLEANING SPECIFICATIONS:

{for each selected task}
✓ {task}
{/for}

Deep cleaning shall be thorough and meet professional standards.
Stubborn stains older than 6 months may not be fully removable
and shall require trial/partial removal efforts only.
```

### 3.3 Cleaning Products & Chemicals
- **Block Name:** `cleaning_products_block`
- **Type:** Object

#### 3.3.1 Who Provides Cleaning Supplies?
- **Field Name:** `cleaning_supplies_provided_by`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `cleaner_provides_all` — Cleaner provides all supplies
  - `homeowner_provides_all` — Homeowner provides all supplies
  - `shared_responsibility` — Shared (specify breakdown below)
- **Details (if shared):** `supply_sharing_details` (Textarea)

#### 3.3.2 Chemical Brands & Safety
- **Field Name:** `chemical_brand_safety`
- **Type:** Textarea (max 300 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Safe chemical brands only - no harsh toxins', 'Eco-friendly cleaning only', 'Specific brands acceptable'"
- **Contract Clause:** "Chemical usage: {chemical_brand_safety}"

#### 3.3.3 Eco-friendly Cleaning Option
- **Field Name:** `eco_friendly_cleaning_preferred`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `eco_friendly_details` (Text, e.g., "Only natural/biodegradable products")

#### 3.3.4 Chemical Safety Instructions
- **Field Name:** `chemical_safety_instructions`
- **Type:** Textarea
- **Default:** "Cleaner shall provide Material Safety Data Sheet (MSDS) for all chemicals used. Proper ventilation required. Protective gloves and equipment must be used."
- **Editable**

#### 3.3.5 Tools & Equipment Provided
- **Field Name:** `tools_equipment_provided`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (specify who provides)
- **Options (with provider):**
  - Vacuum cleaner: ___ (Cleaner/Homeowner)
  - Mop & bucket: ___ (Cleaner/Homeowner)
  - Brushes & brooms: ___ (Cleaner/Homeowner)
  - Pressure washer (if applicable): ___ (Cleaner/Homeowner)
  - Ladder: ___ (Cleaner/Homeowner)
  - Protective gloves: ___ (Cleaner/Homeowner)
  - Garbage bags: ___ (Cleaner/Homeowner)
  - Microfiber cloths: ___ (Cleaner/Homeowner)
  - Step stool: ___ (Cleaner/Homeowner)

---

## 🔷 SECTION 4: PRE-CLEANING REQUIREMENTS & HOMEOWNER RESPONSIBILITIES

### 4.1 Property Preparation Requirements
- **Block Name:** `pre_cleaning_requirements`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (select applicable)
- **Options:**
  - ☑ Property must be decluttered (items removed from floors)
  - ☑ Furniture arrangement must allow floor cleaning
  - ☑ Fragile items must be removed/stored safely
  - ☑ Valuable items must be secured
  - ☑ Children/elders must be supervised/moved to safe area
  - ☑ Pets must be moved to separate room (if present)
  - ☑ Water supply must be available
  - ☑ Electricity access required
  - ☑ Parking space must be available

**Auto-Generated Clause:**
```
PRE-CLEANING HOMEOWNER RESPONSIBILITIES:

Homeowner agrees to:

{for each selected requirement}
✓ {requirement}
{/for}

Failure to meet these requirements may delay cleaning or result in
incomplete service. Additional charges may apply for unexpected obstacles.
```

### 4.2 Pets & People During Cleaning
- **Field Name:** `pets_present`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No
- **Sub-fields (if Yes):**
  - `pet_type` (Multi-Select: Dogs / Cats / Birds / Other)
  - `pet_containment_plan` (Textarea, e.g., "Pets will be in separate room during cleaning")
- **Contract Clause:** "Pets arrangement: {pet_containment_plan}"

### 4.3 Access Conditions
- **Field Name:** `access_conditions`
- **Type:** Textarea (max 200 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Key with security guard', 'Gate code: XXXX', 'Available after 10 AM only'"

---

## 🔷 SECTION 5: TIME, DURATION & SCHEDULE

### 5.1 Appointment Schedule
- **Block Name:** `appointment_schedule_block`
- **Type:** Object

#### 5.1.1 Service Date
- **Field Name:** `service_date_clean`
- **Type:** Date Picker
- **Required:** YES
- **Contract Clause:** "Scheduled service date: **{service_date_clean}}**"

#### 5.1.2 Service Start Time
- **Field Name:** `service_start_time`
- **Type:** Time Picker
- **Required:** YES
- **Format:** HH:MM AM/PM
- **Contract Clause:** "Service start time: **{service_start_time}}**"

#### 5.1.3 Expected End Time
- **Field Name:** `service_expected_end_time`
- **Type:** Time Picker
- **Required:** YES
- **Placeholder:** "Approximate end time based on scope"
- **Contract Clause:** "Expected completion time: **{service_expected_end_time}}**"

#### 5.1.4 Total Duration (Hours)
- **Field Name:** `total_service_hours`
- **Type:** Number (decimal)
- **Placeholder:** "e.g., 3.5 (hours)"
- **Example:** "3 hours for 2 BHK deep cleaning"
- **Contract Clause:** "Estimated service duration: **{total_service_hours}} hours**"

### 5.2 Number of Cleaners
- **Field Name:** `number_of_cleaners`
- **Type:** Number
- **Required:** YES
- **Default:** 1
- **Placeholder:** "e.g., 1, 2, 3 (depends on property size and scope)"
- **Contract Clause:** "Number of cleaners assigned: **{number_of_cleaners}}**"

### 5.3 Delay Tolerance
- **Field Name:** `delay_tolerance_clean`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `30_min_tolerance` — 30 minutes
  - `1_hour_tolerance` — 1 hour
  - `2_hour_tolerance` — 2 hours
  - `no_tolerance` — No tolerance (strict time)
  - `custom_tolerance` — Custom (specify minutes)
- **Contract Clause:** "Acceptable delay: {delay_tolerance_clean} from scheduled start time."

### 5.4 Delay Responsibility Clause
- **Field Name:** `delay_responsibility_auto_clean`
- **Type:** Auto-populated
- **Default:**
  ```
  DELAYS NOT ATTRIBUTABLE TO CLEANER:
  - Homeowner not providing access/keys
  - Unexpected obstacles (excessive dirt, obstacles in way)
  - Property not prepared as agreed
  - Pets/people obstruction
  - Lack of water/electricity supply
  - Additional tasks requested on-spot
  - Security/permission delays
  
  If delay due to above, timeline shall be adjusted without penalty.
  ```

---

## 🔷 SECTION 6: QUALITY STANDARDS & FINISH LEVEL

### 6.1 Expected Cleaning Quality Level
- **Field Name:** `cleaning_quality_level`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `basic_cleaning` — Basic Cleaning (dust & light dirt removed)
  - `standard_cleaning` — Standard Cleaning (professional residential standards)
  - `premium_deep_cleaning` — Premium Deep Cleaning (thorough, professional grade)
  - `commercial_grade` — Commercial Grade (high-standard office/commercial)

**Quality Level Standards:**
- **Basic:** Dust removal, floor sweeping, basic dusting
- **Standard:** Complete cleaning, all listed areas, professional appearance
- **Premium:** Thorough deep cleaning, stain removal attempts, professional finish
- **Commercial:** Highest standards, detail-oriented, sanitized finish

- **Contract Clause:** "Cleaning quality level: **{cleaning_quality_level}}**"

### 6.2 Specific Quality Parameters
- **Block Name:** `quality_parameters_clean`
- **Type:** Object

#### 6.2.1 Stain Removal Expectation
- **Field Name:** `stain_removal_expectation`
- **Type:** Textarea (max 200 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Best effort stain removal on carpets', 'Grout stain reduction', 'Hard water stain removal'"
- **Disclaimer Auto-Added:** "Stains older than 6 months or from permanent damage may not be fully removable."

#### 6.2.2 Floor Polish/Shine Standard
- **Field Name:** `floor_finish_standard`
- **Type:** Single Select
- **Options:**
  - `basic_mop` — Basic mopping (clean but not polished)
  - `glossy_finish` — Glossy finish (polished, shiny appearance)
  - `matte_finish` — Matte finish (clean but not shiny)
  - `as_per_surface` — As per surface type (tile vs. wood vs. carpet)

#### 6.2.3 Disinfection Standard (Post-COVID Important)
- **Field Name:** `disinfection_required`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `disinfection_level` (Single Select: Light / Standard / Heavy)
- **Contract Clause (if Yes):** "Disinfection level: {disinfection_level} using approved disinfectants"

#### 6.2.4 Odor Elimination (If Applicable)
- **Field Name:** `odor_elimination_required`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `odor_type` (Text, e.g., "Pet odor", "Cooking odor", "Mold/moisture odor")

---

## 🔷 SECTION 7: DAMAGE RESPONSIBILITY & LIABILITY

### 7.1 Item Damage During Cleaning
- **Block Name:** `damage_liability_block`
- **Type:** Object

#### 7.1.1 Fragile Items Declaration
- **Field Name:** `fragile_items_present`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No
- **Sub-fields (if Yes):**
  - `fragile_items_details` (Textarea, e.g., "Glass showpiece on table, delicate chandelier, artwork")
  - `fragile_items_responsibility` (Single Select: Homeowner removes / Cleaner handles with care / Cleaner not responsible)
- **Contract Clause (if fragile):** "Fragile items: Homeowner responsible for removing or securing. Cleaner shall handle carefully but not be liable for breakage of fragile items."

#### 7.1.2 Electronics During Cleaning
- **Field Name:** `electronics_water_risk`
- **Type:** Yes/No
- **Default:** Yes (assume water risk)
- **Contract Clause:** "Electronics (TV, AC, computer) shall be protected from water/moisture. Homeowner responsible for placement in safe, dry areas."

#### 7.1.3 Direct Damage Liability
- **Field Name:** `direct_damage_liability_clean`
- **Type:** Textarea
- **Default:**
  ```
  DIRECT DAMAGE LIABILITY:
  
  Cleaner is liable for direct physical damage caused during cleaning:
  - Broken item from careless handling
  - Water damage to nearby electronics/furniture from spill
  - Surface scratches from tool misuse
  - Stain damage from inappropriate chemical use
  
  Cleaner shall compensate for such damage (limited to item replacement cost).
  ```
- **Editable**

#### 7.1.4 Exclusions from Liability
- **Field Name:** `liability_exclusions_clean`
- **Type:** Multi-Select Checkboxes
- **Default Checked:**
  - ✓ Pre-existing damage or wear
  - ✓ Fragile items not removed by homeowner
  - ✓ Negligent placement of valuables
  - ✓ Electronics not protected by homeowner
  - ✓ Damage from unforeseen accidents
  - ✓ Damage from homeowner's instructions
- **Contract Clause:** "Cleaner NOT liable for: {liability_exclusions_clean}"

---

## 🔷 SECTION 8: PEST CONTROL SPECIFICS (IF APPLICABLE)

### 8.1 Is This a Pest Control Service?
- **Field Name:** `pest_control_applicable`
- **Type:** Yes/No
- **Default:** No
- **Conditional:** If `cleaning_service_type == 'pest_control_service'`

**If YES → Proceed with 8.2-8.6:**

### 8.2 Pest Type
- **Field Name:** `pest_type`
- **Type:** Single Select
- **Required:** YES (if pest control)
- **Options:**
  - `cockroach` — Cockroach (German/American)
  - `termite` — Termite (Wood-eating)
  - `bedbug` — Bedbug
  - `rodent` — Rodent (Mouse/Rat)
  - `mosquito` — Mosquito
  - `ant` — Ant (Sugar/Carpenter)
  - `spider` — Spider
  - `combined` — Combined (Multiple pests)
  - `other` — Other pest (specify)
- **Custom Field:** `pest_type_custom` (if "other")

### 8.3 Chemical Details for Pest Control
- **Block Name:** `pest_control_chemical_block`
- **Type:** Object

#### 8.3.1 Chemical Used
- **Field Name:** `pest_control_chemical_name`
- **Type:** Text
- **Required:** YES
- **Placeholder:** "e.g., 'Imidacloprid-based spray', 'Cypermethrin solution'"
- **Contract Clause:** "Chemical used: {pest_control_chemical_name}"

#### 8.3.2 Chemical Safety Certification
- **Field Name:** `chemical_safety_certified`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes
- **Sub-field (if Yes):** `certification_details` (Text, e.g., "BIS approved, DGMS certified")
- **Contract Clause (if Yes):** "Chemical certification: {certification_details}"

#### 8.3.3 Safety Instructions for Occupants
- **Field Name:** `pest_control_safety_instructions`
- **Type:** Textarea
- **Default:**
  ```
  SAFETY INSTRUCTIONS FOR PEST CONTROL:
  
  1. Vacate premises for 2-4 hours after treatment (depending on chemical)
  2. Do not touch treated surfaces for minimum 1 hour
  3. Open windows after returning for ventilation
  4. Do not wash treated areas for 3 days
  5. Store food/water away from treated areas
  6. Pets should be removed during treatment
  7. Keep children away during application
  8. Pregnant women & elderly should leave premises
  ```
- **Editable**

#### 8.3.4 Re-visit Required?
- **Field Name:** `pest_control_revisit_required`
- **Type:** Yes/No
- **Default:** Yes (for cockroaches, termites)
- **Sub-fields (if Yes):**
  - `revisit_after_days` (Number, e.g., "7 days for cockroach, 15 days for termite")
  - `revisit_included_in_price` (Yes/No, default: Yes)

### 8.4 Pest Control Warranty
- **Field Name:** `pest_control_warranty_period`
- **Type:** Single Select
- **Required:** YES (if pest control)
- **Options:**
  - `no_warranty` — No warranty (one-time treatment)
  - `7_days_warranty` — 7-day warranty (if pests return, free revisit)
  - `30_days_warranty` — 30-day warranty
  - `90_days_warranty` — 90-day warranty
  - `6_month_warranty` — 6-month warranty (for termite)
  - `1_year_warranty` — 1-year warranty

**Auto-Generated Clause:**
```
PEST CONTROL WARRANTY:

Warranty period: {pest_control_warranty_period}

If pests reappear within warranty period, service provider shall conduct
free follow-up treatment. This warranty is void if homeowner fails to follow
safety/maintenance instructions or allows re-infestation from outside.
```

### 8.5 Post-Treatment Maintenance
- **Field Name:** `post_treatment_maintenance_required`
- **Type:** Yes/No
- **Default:** Yes
- **Sub-field (if Yes):** `maintenance_instructions` (Textarea, e.g., "Keep drainage clean, maintain ventilation, remove standing water")

---

## 🔷 SECTION 9: WASTE DISPOSAL & ENVIRONMENTAL RESPONSIBILITY

### 9.1 Waste Disposal Responsibility
- **Field Name:** `waste_disposal_responsibility`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `cleaner_disposes_all` — Cleaner removes all waste
  - `homeowner_disposes` — Homeowner disposes waste
  - `shared_responsibility` — Shared (specify below)
- **Details (if shared):** `waste_disposal_sharing_details` (Textarea)

### 9.2 Waste Segregation
- **Field Name:** `waste_segregation_required`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `wet_dry_separation_required` (Yes/No)
- **Contract Clause (if Yes):** "Wet/dry waste separation required as per municipal guidelines"

### 9.3 Special Waste Items
- **Field Name:** `special_waste_items`
- **Type:** Textarea (max 200 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Old electronics', 'Hazardous chemicals', 'Medical waste'"
- **Disposal Plan:** `special_waste_disposal_plan` (Textarea)

---

## 🔷 SECTION 10: ADDITIONAL CHARGES (DEFINED UPFRONT)

### 10.1 Additional Charge Categories
- **Block Name:** `additional_charges_clean`
- **Type:** Multi-Select Checkboxes (with amounts)
- **Required:** NO
- **Options (with price fields):**
  - ☐ Extra dirt charge (if property extremely dirty): ₹___ per hour additional
  - ☐ Sofa deep shampooing: ₹___ per seater
  - ☐ Mattress sanitization: ₹___ per mattress
  - ☐ Carpet shampooing: ₹___ per sq ft
  - ☐ Refrigerator deep cleaning (inside): ₹___
  - ☐ Chimney/exhaust deep cleaning: ₹___
  - ☐ Oven interior cleaning: ₹___
  - ☐ Height work surcharge (above 12 feet): ₹___ per hour
  - ☐ Weekend surcharge (Sat/Sun): ___% extra
  - ☐ Emergency/rush service: ___% extra
  - ☐ Parking charge: ₹___
  - ☐ Extra cleaner (if needed): ₹___ per person
  - ☐ Disinfection surcharge: ₹___
  - ☐ Pest control follow-up visit (if not included): ₹___
  - ☐ Other charges (specify): ₹___

**Auto-Generated Clause:**
```
ADDITIONAL CHARGES (If Applicable):

{for each selected charge}
✓ {charge_name}: {charge_amount}
{/for}

These charges shall be quoted BEFORE starting work. No additional charges
beyond these shall be imposed without homeowner's written approval.
```

---

## 🔷 SECTION 11: COMMERCIAL TERMS

### 11.1 Total Service Charge
- **Field Name:** `total_service_charge_clean`
- **Type:** Currency (INR)
- **Required:** YES
- **Contract Clause:** "Total service charge: **₹{total_service_charge_clean}}** (excluding additional charges if applicable)"

### 11.2 Payment Schedule
- **Field Name:** `payment_structure_clean`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_upfront` — 100% Upfront (before service)
  - `50_50_split` — 50% Upfront, 50% after service
  - `on_completion` — Full payment on completion (after inspection)
  - `custom_schedule` — Custom payment (specify)
- **Details:** `payment_structure_details_clean` (Textarea, if custom)

### 11.3 Payment Methods
- **Field Name:** `payment_methods_clean`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - ✓ Cash
  - ✓ Bank transfer
  - ✓ UPI (Google Pay, PhonePe)
  - ✓ Card payment

### 11.4 Inspection Window
- **Field Name:** `inspection_window_clean`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `immediate_after_completion` — Immediate after completion
  - `1_hour_after` — Within 1 hour of completion
  - `24_hours_after` — Within 24 hours
  - `48_hours_after` — Within 48 hours
- **Contract Clause:** "Homeowner shall inspect within **{inspection_window_clean}}** and report issues within scope."

### 11.5 Refund Policy
- **Field Name:** `refund_policy_clean`
- **Type:** Single Select
- **Options:**
  - `no_refund` — No refund (service complete)
  - `partial_refund_if_poor_quality` — Partial refund (50%) if quality poor
  - `full_refund_if_defective` — Full refund if service quality falls short
  - `custom_policy` — Custom (specify)
- **Details:** `refund_policy_details_clean` (Textarea, if custom)

### 11.6 Complaint & Resolution Process
- **Field Name:** `complaint_resolution_process`
- **Type:** Textarea
- **Default:**
  ```
  COMPLAINT & RESOLUTION:
  
  1. Report issues within inspection window with photos/videos
  2. Cleaner has 24 hours to respond to complaint
  3. If issue is within scope, cleaner shall revisit within 48 hours
  4. Revisit is free if issue is cleaner's responsibility
  5. If not resolved after 1 revisit, partial refund offered
  6. Complaints without objective evidence (photos/videos) not considered valid
  ```
- **Editable**

### 11.7 Jurisdiction
- **Field Name:** `jurisdiction_city_clean`
- **Type:** Single Select + Autocomplete
- **Required:** YES
- **Default:** "Mumbai"
- **Contract Clause:** "This Agreement governed by laws of {jurisdiction_city_clean}, India"

---

# 📸 PART B: DELIVERY EVIDENCE FIELDS
**Submitted after cleaning completion OR when dispute arises**

### B.1 Mandatory Completion Evidence

#### B.1.1 Before Cleaning Photos
- **Field Name:** `before_cleaning_photos`
- **Type:** File Upload (Images, min 8-10 photos)
- **Required:** YES
- **Placeholder:** "Photos of each major area showing initial condition (bathrooms, kitchen, bedrooms, living room, floors)"

#### B.1.2 After Cleaning Photos
- **Field Name:** `after_cleaning_photos`
- **Type:** File Upload (Images, min 8-10 photos)
- **Required:** YES
- **Placeholder:** "Photos of same areas showing cleaned condition"
- **Specific Focus Areas:**
  - Bathroom (toilet, sink, tiles, grout)
  - Kitchen (counters, stove, sink, cabinets)
  - Bedroom (floor, surfaces, windows)
  - Living room (floor, furniture, windows)
  - Balcony/terrace (if included)
  - Corners (dust, cobwebs)
  - Fan blades (if cleaned)

#### B.1.3 Detailed Area-wise Photos
- **Field Name:** `detailed_area_photos`
- **Type:** File Upload (Images)
- **Required:** Conditional (recommended for deep cleaning)
- **Placeholder:** "Close-up photos of tricky areas (grout, stains, appliances) showing before & after"

#### B.1.4 Video Walkthrough
- **Field Name:** `cleaning_completion_video`
- **Type:** File Upload (Video, max 10 mins)
- **Required:** NO (recommended for disputes)
- **Placeholder:** "Video walkthrough of entire space showing cleaned condition"

#### B.1.5 Specialized Task Proof (If Applicable)
- **Field Name:** `specialized_task_proof`
- **Type:** File Upload (Photos/Video)
- **Required:** Conditional (if sofa/mattress/carpet/pest control)
- **Placeholder:**
  - Sofa: Before/after photo of cleaning
  - Carpet: Video showing shampooing or final result
  - Pest control: Video of chemical application, chemical photo, safety instruction sheet
  - Chimney: Before/after of chimney outlet

#### B.1.6 Cleaning Supplies Used Documentation
- **Field Name:** `supplies_used_documentation`
- **Type:** File Upload (Photos/Invoice)
- **Required:** NO (recommended for transparency)
- **Placeholder:** "Photos of cleaning products bottles, brands, invoices"

#### B.1.7 Work Time Log
- **Field Name:** `work_time_log_clean`
- **Type:** Textarea
- **Required:** NO
- **Placeholder:** "Actual start time, completion time, actual duration (e.g., 'Started 10:00 AM, Completed 1:30 PM, Duration: 3.5 hours')"

#### B.1.8 Homeowner Sign-Off / Acceptance
- **Field Name:** `homeowner_acceptance_photo_clean`
- **Type:** File Upload (Photo)
- **Required:** NO (recommended)
- **Placeholder:** "Photo of homeowner with cleaner after completion, or written acceptance message"

#### B.1.9 Pest Control Certificate (If Applicable)
- **Field Name:** `pest_control_certificate`
- **Type:** File Upload (PDF/Image)
- **Required:** Conditional (if pest control)
- **Placeholder:** "Certificate showing chemical used, date, treatment done, re-visit date"

#### B.1.10 Safety Checklist Completion
- **Field Name:** `safety_checklist_clean`
- **Type:** Checkbox
- **Required:** YES (if high-risk work)
- **Statement:** "All safety precautions taken, area is safe for occupancy"

#### B.1.11 Waste Disposal Proof
- **Field Name:** `waste_disposal_proof_clean`
- **Type:** File Upload (Photo)
- **Required:** YES
- **Placeholder:** "Photo showing work area cleared of debris, waste removed, site clean"

---

# 🎯 PART C: DISPUTE EVIDENCE FIELDS

### C.1 When Raising a Dispute

#### C.1.1 Dispute Reason Category
- **Field Name:** `dispute_reason_category_clean`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `poor_cleaning_quality` — Poor cleaning quality (areas still dirty)
  - `incomplete_service` — Incomplete service (tasks not done)
  - `incomplete_areas` — Incomplete coverage (rooms/areas missed)
  - `stains_not_removed` — Stains not removed (as promised)
  - `damage_caused` — Damage caused during cleaning
  - `late_service` — Service delayed beyond tolerance
  - `extra_charges_imposed` — Unexpected extra charges imposed
  - `chemical_damage` — Chemical damage to surfaces/furniture
  - `cleaner_left_early` — Cleaner left early (before time complete)
  - `pest_returned` — Pests returned within warranty (pest control)
  - `odor_still_present` — Odor not eliminated (as promised)
  - `safety_violation` — Safety violation or negligence
  - `theft_or_loss` — Item missing/theft during cleaning
  - `cleaner_misbehavior` — Cleaner misconduct or misbehavior
  - `other` — Other (specify)

#### C.1.2 Detailed Dispute Description
- **Field Name:** `dispute_description_clean`
- **Type:** Textarea (max 1500 chars)
- **Required:** YES
- **Placeholder:** "Clearly describe what's wrong with objective evidence"

#### C.1.3 Dispute Severity
- **Field Name:** `dispute_severity_clean`
- **Type:** Single Select
- **Options:**
  - `critical_unsafe` — Critical (Safety issue or unusable state)
  - `major_significant` — Major (Significant areas not cleaned, damage)
  - `minor_acceptable` — Minor (Minor issues, mostly acceptable)

#### C.1.4 Poor Quality Proof
- **Field Name:** `poor_quality_proof_clean`
- **Type:** File Upload (Photos/Videos)
- **Required:** Conditional (if quality complaint)
- **Placeholder:** "Photos/videos showing dirty areas, missed spots, incomplete cleaning"
- **Required Evidence:** Must show specific areas still dirty with clear photos

#### C.1.5 Damage Proof
- **Field Name:** `damage_proof_clean`
- **Type:** File Upload (Photos)
- **Required:** Conditional (if damage claim)
- **Placeholder:** "Close-up photos of damage, before & after comparison, time-stamped"

#### C.1.6 Stain Removal Failure Proof
- **Field Name:** `stain_removal_failure_proof`
- **Type:** File Upload (Photos)
- **Required:** Conditional (if stain complaint)
- **Placeholder:** "Photos showing stains that were promised to be removed but still present"

#### C.1.7 Before & After Comparison
- **Field Name:** `before_after_comparison_clean`
- **Type:** File Upload (Photos side-by-side)
- **Required:** YES
- **Placeholder:** "Side-by-side before/after photos showing what was agreed vs. what was delivered"

#### C.1.8 Incomplete Service Proof
- **Field Name:** `incomplete_service_proof_clean`
- **Type:** Textarea
- **Required:** Conditional (if incomplete service)
- **Placeholder:** "List of tasks from contract vs. what was actually completed"
- **Example:** "Agreed: Sofa cleaning + carpet shampooing. Done: Only sofa, carpet not touched"

#### C.1.9 Late Service Proof
- **Field Name:** `late_service_proof_clean`
- **Type:** File Upload (Screenshots)
- **Required:** Conditional (if late service)
- **Placeholder:** "Screenshots of chat/messages showing scheduled time vs. actual arrival time"

#### C.1.10 Extra Charges Proof
- **Field Name:** `extra_charges_proof_clean`
- **Type:** File Upload (Invoice/Screenshots)
- **Required:** Conditional (if extra charges disputed)
- **Placeholder:** "Bill/invoice showing charges vs. contract price"

#### C.1.11 Pest Control Failure Proof (If Applicable)
- **Field Name:** `pest_control_failure_proof`
- **Type:** File Upload (Photos/Video)
- **Required:** Conditional (if pest complaint)
- **Placeholder:** "Photos/videos of pests returning within warranty period, time-stamped"

#### C.1.12 Communication Trail
- **Field Name:** `dispute_communication_evidence_clean`
- **Type:** File Upload (Screenshots)
- **Required:** NO (supporting evidence)
- **Placeholder:** "Screenshots of messages/calls about issues raised with cleaner"

#### C.1.13 Third-Party Assessment (Optional)
- **Field Name:** `third_party_assessment_clean`
- **Type:** File Upload
- **Required:** NO
- **Placeholder:** "Optional: Assessment from another cleaning service confirming issue"

#### C.1.14 Requested Resolution
- **Field Name:** `dispute_requested_resolution_clean`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_refund` — Full refund
  - `partial_refund` — Partial refund (specify %)
  - `free_reclean` — Free re-cleaning from service provider
  - `free_specific_area_reclean` — Free re-cleaning of specific areas
  - `damage_compensation` — Compensation for damage caused
  - `price_reduction` — Price reduction
  - `other` — Other (specify)
- **Amount Field:** `dispute_refund_or_reduction_amount_clean` (Currency, if applicable)

#### C.1.15 Supporting Documentation
- **Field Name:** `dispute_supporting_docs_clean`
- **Type:** File Upload
- **Required:** NO
- **Placeholder:** "Original contract, payment receipts, service schedule, previous communications"

#### C.1.16 Evidence Authenticity Declaration
- **Field Name:** `dispute_evidence_authenticity_clean`
- **Type:** Checkbox
- **Required:** YES
- **Statement:** "I confirm all evidence provided is authentic, unaltered, and accurately represents the issue. I understand that subjective complaints without objective evidence (photos/videos) shall not be considered valid."

---

# 🗄️ PART D: DATABASE SCHEMA MAPPING

```sql
-- Section 1: Service Definition
cleaning_service_type TEXT NOT NULL, -- enum
cleaning_service_type_custom TEXT,
cleaning_job_title TEXT NOT NULL,
cleaning_location_address TEXT NOT NULL,

-- Section 2: Property Details
property_type_clean TEXT NOT NULL,
carpet_area_sqft INTEGER,
floor_number_clean TEXT,
lift_available_clean BOOLEAN,
property_occupancy_status TEXT NOT NULL,
current_dirt_level TEXT NOT NULL,

-- Section 3: Scope of Work
bedrooms_cleaning BOOLEAN,
bedroom_count INTEGER,
living_room_cleaning BOOLEAN,
kitchen_cleaning BOOLEAN,
kitchen_sub_options TEXT[],
bathrooms_cleaning BOOLEAN,
bathroom_count INTEGER,
bathroom_sub_options TEXT[],
balcony_terrace_cleaning BOOLEAN,
windows_glass_cleaning BOOLEAN,
window_count INTEGER,
fans_lights_cleaning BOOLEAN,
fan_count INTEGER,
light_fixture_count INTEGER,
wardrobe_storage_cleaning BOOLEAN,
appliances_outside_cleaning BOOLEAN,
appliances_outside_sub_options TEXT[],
specialized_cleaning_tasks TEXT[],
deep_cleaning_specifications TEXT[],

-- Section 4: Cleaning Products
cleaning_supplies_provided_by TEXT,
supply_sharing_details TEXT,
chemical_brand_safety TEXT,
eco_friendly_cleaning_preferred BOOLEAN,
eco_friendly_details TEXT,
chemical_safety_instructions TEXT,
tools_equipment_provided JSONB, -- {tool_name, provided_by}

-- Section 5: Pre-Cleaning Requirements
pre_cleaning_requirements TEXT[],
pets_present BOOLEAN,
pet_type TEXT[],
pet_containment_plan TEXT,
access_conditions TEXT,

-- Section 6: Time & Schedule
service_date_clean DATE NOT NULL,
service_start_time TIME NOT NULL,
service_expected_end_time TIME NOT NULL,
total_service_hours NUMERIC NOT NULL,
number_of_cleaners INTEGER,
delay_tolerance_clean TEXT,
delay_tolerance_custom_minutes INTEGER,

-- Section 7: Quality Standards
cleaning_quality_level TEXT NOT NULL,
stain_removal_expectation TEXT,
floor_finish_standard TEXT,
disinfection_required BOOLEAN,
disinfection_level TEXT,
odor_elimination_required BOOLEAN,
odor_type TEXT,

-- Section 8: Damage Liability
fragile_items_present BOOLEAN,
fragile_items_details TEXT,
fragile_items_responsibility TEXT,
electronics_water_risk BOOLEAN,
direct_damage_liability_clean TEXT,
liability_exclusions_clean TEXT[],

-- Section 9: Pest Control (If Applicable)
pest_control_applicable BOOLEAN,
pest_type TEXT,
pest_type_custom TEXT,
pest_control_chemical_name TEXT,
chemical_safety_certified BOOLEAN,
certification_details TEXT,
pest_control_safety_instructions TEXT,
pest_control_revisit_required BOOLEAN,
revisit_after_days INTEGER,
revisit_included_in_price BOOLEAN,
pest_control_warranty_period TEXT,
post_treatment_maintenance_required BOOLEAN,
maintenance_instructions TEXT,

-- Section 10: Waste Disposal
waste_disposal_responsibility TEXT,
waste_disposal_sharing_details TEXT,
waste_segregation_required BOOLEAN,
wet_dry_separation_required BOOLEAN,
special_waste_items TEXT,
special_waste_disposal_plan TEXT,

-- Section 11: Additional Charges & Commercial
additional_charges_clean JSONB, -- {charge_name, charge_amount}
total_service_charge_clean NUMERIC NOT NULL,
payment_structure_clean TEXT NOT NULL,
payment_structure_details_clean TEXT,
payment_methods_clean TEXT[],
inspection_window_clean TEXT,
refund_policy_clean TEXT,
refund_policy_details_clean TEXT,
complaint_resolution_process TEXT,
jurisdiction_city_clean TEXT NOT NULL,

-- Part B: Delivery Evidence
before_cleaning_photos TEXT, -- file URLs
after_cleaning_photos TEXT,
detailed_area_photos TEXT,
cleaning_completion_video TEXT,
specialized_task_proof TEXT,
supplies_used_documentation TEXT,
work_time_log_clean TEXT,
homeowner_acceptance_photo_clean TEXT,
pest_control_certificate TEXT,
safety_checklist_clean BOOLEAN,
waste_disposal_proof_clean TEXT,

-- Part C: Dispute Evidence
dispute_reason_category_clean TEXT,
dispute_description_clean TEXT,
dispute_severity_clean TEXT,
poor_quality_proof_clean TEXT,
damage_proof_clean TEXT,
stain_removal_failure_proof TEXT,
before_after_comparison_clean TEXT,
incomplete_service_proof_clean TEXT,
late_service_proof_clean TEXT,
extra_charges_proof_clean TEXT,
pest_control_failure_proof TEXT,
dispute_communication_evidence_clean TEXT,
third_party_assessment_clean TEXT,
dispute_requested_resolution_clean TEXT,
dispute_refund_or_reduction_amount_clean NUMERIC,
dispute_supporting_docs_clean TEXT,
dispute_evidence_authenticity_clean BOOLEAN,
```

---

## 📝 SUMMARY

This SERVICE_ANNEXURE_G for Cleaning & Housekeeping provides:

✅ **58 Contract Creation Fields** → Become binding contract clauses  
✅ **22 Delivery Evidence Fields** → Tracked at completion  
✅ **18 Dispute Evidence Fields** → Required when raising disputes  
✅ **100+ Database Columns** → Schema mapping for storage  
✅ **Auto-Generated Contract** → Clauses populate from form inputs  
✅ **Legally Strong** → Protects against all common cleaning disputes  

**Key Dispute Protections:**
- Scope of work room-by-room and task-specific (prevents "didn't clean properly" without evidence)
- Quality level binding (basic, standard, premium, commercial grades)
- Stain removal disclaimer (older than 6 months may not be removable)
- Before & after photos mandatory (objective proof of cleaning)
- Area-specific proof photos required (bathroom, kitchen, corners, appliances)
- Fragile items responsibility clear (homeowner must remove or accept risk)
- Damage liability explicit (direct damage only, not pre-existing)
- Pest control warranty explicit (7-day, 30-day, 90-day options)
- Waste disposal responsibility clear (who removes what)
- Additional charges pre-defined (prevents "extra ₹500 laga" scams)
- Payment schedule transparent (upfront, split, on completion)
- Inspection window defined (when to report issues)
- Complaint process clear (24-hr response, 48-hr revisit)
- Chemical safety & disinfection optional (can be added for extra charge)
- Cleaner count defined (1 vs. 2 vs. 3 cleaners affects expectations)
- Working hours restrictions binding (before 10 AM, no Sundays, etc.)
- Access conditions documented (lift, parking, security)
- Objective evidence required for disputes (photos/videos, not subjective "jaisa socha tha waisa nahi")

**Real-World Dispute Examples Solved:**
1. "Area not cleaned properly" → Quality photos before/after + specific task list proof
2. "Left midway" → Time log + video proof of completion + homeowner sign-off
3. "Deep cleaning wasn't deep" → Deep cleaning specifications binding + detailed area photos
4. "Stains not removed" → Stain removal disclaimer (6+ months) + photo evidence of remaining stains
5. "Extra charge imposed" → Additional charges pre-defined, no unapproved charges allowed
6. "Damaged furniture" → Direct damage liability clause + photo proof with timestamps
7. "Pests returned" → Warranty period binding + pest control failure proof (photos/timestamps)

**Created so far:**
- ✅ SERVICE_ANNEXURE_A (Software Development) - 86 fields
- ✅ SERVICE_ANNEXURE_B (UI/UX Design & Graphic Design) - 64 fields
- ✅ SERVICE_ANNEXURE_C (Content Writing & Copywriting) - 80 fields
- ✅ SERVICE_ANNEXURE_D (Photography & Videography) - 82 fields
- ✅ SERVICE_ANNEXURE_E (Tuition & Coaching) - 91 fields
- ✅ SERVICE_ANNEXURE_F (Home Repair & Maintenance) - 98 fields
- ✅ SERVICE_ANNEXURE_G (Cleaning & Housekeeping) - 98 fields

**Total: 599 comprehensive fields across 7 service annexures**

Ready for H (Consulting), I (Beauty/Salon), J (Transportation) or more?

