# 📊 FORM SUBMISSIONS TABLE SCHEMA
**Last Updated:** November 28, 2025

## 🔷 MANDATORY COLUMNS (Cannot be NULL)

| Column Name | Data Type | Purpose |
|------------|-----------|---------|
| id | bigint | Primary key (auto-generated) |
| user_id | uuid | User who submitted form |
| transaction_id | text | Unique transaction identifier |
| industry_category | text | Product category (electronics, mobile, furniture, etc.) |
| annexure_code | text | Legal annexure code (A-K) |

**Total Mandatory: 5 columns**

---

## 🔸 CORE SINGLE-VALUE COLUMNS (Optional but important)

### Product & Item Identification
- product_name (text) - Main product name
- item_title (text) - Alternative title
- item_name (text) - Alternative name
- machine_name (text) - For industrial equipment
- book_title (text) - For books
- brand (text) - Brand name
- make (text) - For vehicles
- model (text) - Model name
- model_name (text) - Alternative model name
- model_number (text) - Specific model number
- model_edition (text) - Edition number
- variant (text) - Variant description
- variant_ram_storage (text) - RAM/Storage combo
- category (text) - Sub-category
- jewellery_category (text) - Jewellery type
- device_type (text) - Type of device
- description (text) - Full description
- authors (text) - Book authors
- publisher (text) - Publisher name

### Pricing & Delivery
- price (numeric) - Original price
- sale_price (numeric) - Selling price
- expected_delivery_date (date) - Delivery date
- inspection_window_hours (integer) - Inspection period
- return_policy (text) - Return policy
- delivery_mode (text) - Delivery method
- weight_category (text) - Weight category
- delivery_method (varchar) - How to deliver
- delivery_address (text) - Where to deliver

### Device-Specific Technical
- storage (integer) - Storage in GB
- ram (integer) - RAM in GB
- display_size (numeric) - Screen size in inches
- processor (text) - Processor name
- graphics_card (text) - GPU name
- battery_capacity (integer) - Battery mAh
- manufactured_year (integer) - Year made
- battery_cycle_count (integer) - Battery cycles
- battery_health_percent (integer) - Battery health %
- laptop_battery_backup (varchar) - Backup hours

### Condition & Damage
- condition_category (text) - Overall condition
- color (text) - Color/finish
- screen_condition (text) - Screen status
- condition (varchar) - Condition level
- charging_issues (varchar) - Charging problems
- charging_port_issues (varchar) - Port damage
- known_defects (text) - Known issues
- buttons_ports_issues (text) - Button/port problems
- screen_issues (text) - Screen problems
- speaker_mic_issues (text) - Audio issues
- battery_performance_issues (text) - Battery issues
- odor_assessment (varchar) - Odor level

### Furniture-Specific
- torn_upholstery (varchar) - Upholstery damage
- sun_fading (varchar) - Fading level
- loose_stone (varchar) - Loose gems/stones
- missing_stone (varchar) - Missing gems
- loose_legs (varchar) - Structural damage

### Jewellery-Specific
- gross_weight_grams (numeric) - Total weight
- net_weight_grams (numeric) - Net weight
- stone_type (varchar) - Type of stone
- stone_count (integer) - Number of stones
- carat_weight (numeric) - Carat weight
- clarity (varchar) - Clarity grade
- color_grade (varchar) - Color rating
- purity (varchar) - Metal purity (22K, 18K, etc.)
- hallmark_available (boolean) - Hallmark present
- authenticity_guaranteed (boolean) - Authentic
- purchase_receipt_available (boolean) - Receipt available

### Vehicle-Specific
- fuel_type (varchar) - Petrol/Diesel/Electric
- registration_number (varchar) - License plate
- engine_number (varchar) - Engine ID
- chassis_number (varchar) - Chassis ID
- imei (varchar) - IMEI number
- rc_status (text) - RC condition
- ownership (text) - Ownership history
- insurance_status (text) - Insurance status
- puc_valid_till (date) - PUC expiry

### Dimensions & Measurements
- length_cm (numeric) - Length in cm
- breadth_cm (numeric) - Width in cm
- height_cm (numeric) - Height in cm
- width_cm (numeric) - Width alternative
- depth_cm (numeric) - Depth in cm
- thickness_mm (numeric) - Thickness in mm
- size_label (varchar) - Size (XS, S, M, L, etc.)
- measurements_provided (boolean) - Video proof

### Industrial/Technical
- voltage_required (varchar) - Voltage needed
- phase (varchar) - Single/Three phase
- power_rating (varchar) - Power rating
- wattage (varchar) - Wattage
- load_capacity (varchar) - Load capacity
- rpm_output_capacity (varchar) - RPM/output
- air_pressure (varchar) - Air pressure specs
- electrical_quality_grade (varchar) - Quality grade
- grade_quality (varchar) - Grade level
- quality (varchar) - Quality level
- finish_type (varchar) - Finish type

### Material & Composition
- material_type (varchar) - Material type
- material (varchar) - Material description
- fabric_composition (varchar) - Fabric type
- medium (varchar) - Art medium
- surface (varchar) - Surface type
- artwork_type (varchar) - Art type

### Dates & History
- purchase_date (date) - When purchased
- warranty_status (text) - Warranty status
- warranty_valid_until (timestamp) - Warranty expiry
- warranty_info (text) - Warranty details
- third_party_warranty (varchar) - 3rd party warranty
- apple_brand_warranty (varchar) - Apple warranty
- authorization_service_repair (varchar) - Service repairs done
- previous_repairs (text) - Repair history
- back_glass_replaced (varchar) - Glass replacement
- screen_replaced (varchar) - Screen replacement
- charging_port_replaced (varchar) - Port replacement
- battery_replaced (varchar) - Battery replacement
- motherboard_replaced (varchar) - Motherboard replacement
- speaker_replaced (varchar) - Speaker replacement
- ssd_ram_replaced (varchar) - Storage/RAM upgrade

### Books-Specific
- edition_number (varchar) - Edition
- batch_number (varchar) - Batch number
- shade_number (varchar) - Shade/color code
- storage_details (varchar) - Storage condition

### Assembly & Delivery
- assembly_status (varchar) - Assembly status
- assembly_responsibility (varchar) - Who assembles
- additional_access_notes (text) - Access instructions
- floor_access_notes (text) - Floor access notes
- drawer_cabinet_function_test (varchar) - Drawer test
- fan_noise (varchar) - Fan noise level
- overheating (varchar) - Overheating issues
- original_box (varchar) - Original packaging
- original_charger (varchar) - Original charger
- case (varchar) - Case included
- other_accessories (varchar) - Other items

---

## 🔵 BOOLEAN COLUMNS (YES/NO)

| Column Name | Purpose |
|------------|---------|
| scratches_present | Scratches visible |
| dents_present | Dents present |
| power_on_working | Device powers on |
| charging_working | Charging functional |
| cracks | Screen/glass cracks |
| spots_lines | Display spots/lines |
| heating_issues | Overheating issues |
| network_issues | Network problems |
| camera_issues | Camera issues |
| water_marks | Water damage |
| screen_ok | Screen functional |
| buttons_ok | Buttons working |
| speakers_ok | Speakers working |
| camera_ok | Camera working |
| wifi_bluetooth_ok | WiFi/Bluetooth working |
| ports_ok | Ports functional |
| touchscreen | Touchscreen working |
| buttons | Buttons functional |
| wifi_bluetooth | WiFi/Bluetooth present |
| fingerprint_faceid | Biometric working |
| speaker_mic_functional | Speaker/mic working |
| sim_detection | SIM detection working |
| keyboard_keys | Keyboard working |
| trackpad | Trackpad working |
| usb_hdmi_ports | USB/HDMI ports working |
| webcam | Webcam functional |
| fast_charging_support | Fast charging |
| cable | Cable included |
| earphones | Earphones included |
| case_included | Case included |
| manual | Manual included |
| stand_base | Stand/base included |
| remote | Remote included |
| laptop_charger | Laptop charger included |
| laptop_bag | Laptop bag included |
| additional_battery | Extra battery |
| tools_included | Tools included |
| original_packaging | Original box |
| google_frp_lock | Google FRP lock |
| mi_account_lock | MI account lock |
| bios_lock | BIOS lock |
| can_device_be_reset | Device resettable |
| no_damages | No damage present |
| invoice_available | Invoice available |

---

## 🟣 JSONB COLUMNS (Flexible storage for complex data)

| Column Name | Purpose | Default |
|------------|---------|---------|
| technical_specs | Specs like processor, RAM, storage | {} |
| identification_data | IMEI, serial, model details | {} |
| condition_data | Damage descriptions, defects | {} |
| functionality_data | All yes/no functional tests | {} |
| measurements | Dimensions, sizes | {} |
| material_data | Materials, composition | {} |
| accessories_data | Box, charger, cables, etc. | {} |
| warranty_legal_data | Warranty, legal info | {} |
| documentation_data | Receipts, certificates, docs | {} |
| usage_history_data | Service history, repairs | {} |
| media_files | Photos, videos, documents | {} |
| buyer_requirements | Buyer preferences | {} |
| category_specific_data | Industry-specific fields | {} |
| delivery_data | Delivery instructions | {} |
| uploaded_photos | Photo URLs | {} |
| uploaded_images | Image URLs | {} |

---

## 🟢 FORM METADATA COLUMNS

| Column Name | Data Type | Purpose |
|------------|-----------|---------|
| form_status | text | draft/completed/submitted/reviewed |
| completion_percentage | integer | 0-100% |
| required_fields_completed | integer | Count of mandatory fields filled |
| total_fields_filled | integer | Total fields with data |
| created_at | timestamp | When form was created |
| updated_at | timestamp | Last update time |
| submitted_at | timestamp | When submitted |

---

## 🔴 ACTOR COLUMNS

| Column Name | Data Type | Purpose |
|------------|-----------|---------|
| seller_id | uuid | Seller user ID |
| buyer_id | uuid | Buyer user ID |

---

## 📈 INDEXES FOR PERFORMANCE

1. **idx_form_submissions_user_id** → Fast lookups by user
2. **idx_form_submissions_transaction_id** → Unique transactions
3. **idx_form_submissions_industry_category** → Filter by industry
4. **idx_form_submissions_form_status** → Filter by status
5. **idx_form_submissions_user_industry** → Combined user + industry
6. **idx_form_submissions_user_status** → Combined user + status
7. **idx_form_submissions_created_at** → Sort by date
8. **GIN indexes on JSONB columns** → Fast JSON searches

---

## 📊 COLUMN SUMMARY STATISTICS

| Category | Count |
|----------|-------|
| Mandatory columns | 5 |
| Single-value text/numeric | 180+ |
| Boolean columns | 45 |
| JSONB columns | 16 |
| Metadata columns | 8 |
| Actor columns | 2 |
| **TOTAL COLUMNS** | **256+** |

---

## 💡 DATA ORGANIZATION STRATEGY

### Option 1: Direct Columns (Current Approach)
- Individual columns for each field
- Pro: Simple queries, direct access
- Con: Very wide table (256+ columns)

### Option 2: JSONB Storage (Hybrid)
- Group related data into JSONB
- Pro: Flexible, schema-less
- Con: Needs JSON operators for querying

### Option 3: Complete JSONB (Future)
- All dynamic fields in single `form_data` JSONB
- Pro: Extremely flexible
- Con: Complex queries

**Current Table:** Hybrid approach (both direct columns + JSONB)

---

## 🎯 NEXT STEPS FOR formFieldDefinitions.ts

Use these actual database columns when building form fields:

✅ **Map form fields to DB columns:**
- Common fields → Direct columns (product_name, brand, etc.)
- Complex data → JSONB columns (technical_specs, condition_data)
- Boolean confirmations → Boolean columns

✅ **Validate field types match DB:**
- Text input → varchar/text
- Numbers → integer/numeric
- Dates → date/timestamp
- Files → JSONB (URLs)
- Yes/No → boolean

✅ **Track completion:**
- required_fields_completed (increment when mandatory field filled)
- total_fields_filled (increment for any field)
- completion_percentage = (required_fields_completed / 11) × 100

