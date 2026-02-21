# Form Submissions Table - Complete Column Reference

## Summary
- **Total Columns:** 230
- **Required Columns:** 4 (id, user_id, transaction_id, industry_category, annexure_code)
- **Optional Columns:** 226
- **Main Data Types:** TEXT, BOOLEAN, JSONB, INTEGER, NUMERIC, UUID, TIMESTAMP, DATE

---

## Core Metadata (Columns 1-5)
| # | Name | Type | Notes |
|---|------|------|-------|
| 1 | id | bigint | Auto-increment ID |
| 2 | user_id | uuid | Reference to user |
| 3 | transaction_id | text | Reference to transaction |
| 4 | industry_category | text | Electronics, Jewellery, Furniture, etc. |
| 5 | annexure_code | text | Category code |

---

## Product Identification (Columns 6-31)
**General Product Info:**
- product_name, item_title, item_name, machine_name, book_title
- brand, make, model, model_name, model_number, model_edition
- variant, variant_ram_storage, category, device_type
- jewellery_category, description, authors, publisher
- price (numeric), sale_price (numeric)
- expected_delivery_date (date), delivery_mode, weight_category

---

## Structured Data - JSONB (Columns 32-45)
All stored as JSON objects for flexible data:
- **technical_specs** - Device specs
- **identification_data** - IMEI, serial numbers
- **condition_data** - Device condition flags
- **functionality_data** - Working/not working items
- **measurements** - Size/weight details
- **material_data** - Material composition
- **accessories_data** - What's included
- **warranty_legal_data** - Warranty info
- **documentation_data** - Papers, certificates
- **usage_history_data** - Previous usage
- **media_files** - Photos/videos URLs
- **buyer_requirements** - Buyer expectations
- **category_specific_data** - Industry-specific fields
- **delivery_data** - Shipping details

---

## Form Tracking (Columns 46-52)
| # | Name | Type |
|---|------|------|
| 46 | form_status | text | draft, submitted, completed |
| 47 | completion_percentage | integer | 0-100 |
| 48 | required_fields_completed | integer | Count |
| 49 | total_fields_filled | integer | Count |
| 50 | created_at | timestamp | When created |
| 51 | updated_at | timestamp | Last update |
| 52 | submitted_at | timestamp | When submitted |

---

## Device Conditions - BOOLEAN (Columns 53-118)
**Phone/Device Status:**
- scratches_present, dents_present ✅
- power_on_working, charging_working ✅
- screen_ok, touchscreen ✅
- camera_ok, buttons_ok, speakers_ok
- wifi_bluetooth_ok, ports_ok
- fingerprint_faceid, speaker_mic_functional
- sim_detection

**Laptop Specific:**
- keyboard_keys, trackpad, usb_hdmi_ports, webcam
- fast_charging_support

**Accessories:**
- cable, earphones, case_included, manual
- stand_base, remote, laptop_charger, laptop_bag
- additional_battery, tools_included, original_packaging

**Locks/Security:**
- google_frp_lock, mi_account_lock
- icloud_lock_status (text)

**Authentication:**
- hallmark_available, authenticity_guaranteed
- purchase_receipt_available

**Ownership:**
- seller_id, buyer_id (uuid)

---

## Device Details - TEXT/VARCHAR (Columns 127-149)
- fuel_type, voltage_required, phase
- power_rating, wattage, load_capacity
- rpm_output_capacity, air_pressure
- electrical_quality_grade
- **imei** (varchar) ✅
- engine_number, chassis_number, registration_number
- batch_number, shade_number, edition_number
- battery_cycle_count (integer)
- **condition** (varchar) ✅

---

## Issue Details - VARCHAR/TEXT (Columns 150-197)
**Phone Issues:**
- charging_issues, charging_port_issues
- screen_issues, buttons_ports_issues
- speaker_mic_issues, battery_performance_issues

**Furniture Issues:**
- torn_upholstery, sun_fading
- loose_stone, missing_stone, loose_legs

**General:**
- known_defects (text) ✅
- odor_assessment
- no_damages (boolean)

**Replacements:**
- back_glass_replaced, screen_replaced
- charging_port_replaced, battery_replaced
- motherboard_replaced, speaker_replaced
- ssd_ram_replaced (varchar) ✅

**Other Factors:**
- drawer_cabinet_function_test, fan_noise, overheating
- **original_box** (varchar) ✅
- **original_charger** (varchar) ✅
- case, other_accessories (varchar) ✅
- **warranty_valid_until** (timestamp) ✅
- warranty_info, third_party_warranty, apple_brand_warranty
- invoice_available, bios_lock, os_activation_status
- can_device_be_reset, authorized_service_repair
- previous_repairs

---

## Measurements (Columns 199-228)
- length_cm, breadth_cm, height_cm, width_cm, depth_cm, thickness_mm (numeric)
- size_label

**Material/Quality:**
- material_type, material, purity
- gross_weight_grams, net_weight_grams
- stone_type, stone_count, carat_weight, clarity, color_grade
- fabric_composition, medium, surface
- artwork_type, grade_quality, quality
- finish_type

**Purchase Info:**
- purchase_date (date)
- storage_details, laptop_battery_backup
- assembly_status, assembly_responsibility

**Access Notes:**
- additional_access_notes, floor_access_notes

---

## Migration Impact ✅

**Columns DROPPED (23 total):**
- scratches, dents, back_dents
- power_on, turns_on, charges
- touch_ok, touch_issues, front_back_camera
- box, original_box_included, charger, original_charger_included
- battery_health_percentage, battery_health_iphone
- warranty_valid_till, others, known_issues, other_damages
- ram_ssd_upgraded, imei_1, imei1, imei2, screen_condition

**Columns CONSOLIDATED (Data moved to canonical):**
- scratches_present ✅
- dents_present ✅
- power_on_working ✅
- charging_working ✅
- touchscreen ✅
- camera_ok ✅
- original_box ✅
- original_charger ✅
- battery_health_percent ✅
- screen_ok ✅
- warranty_valid_until ✅
- other_accessories ✅
- known_defects ✅
- ssd_ram_replaced ✅

---

## Data Storage Strategy

**For Contract Generation:**
Use these canonical columns consistently:
```
Device Condition: scratches_present, dents_present, power_on_working, charging_working
Functionality: touchscreen, camera_ok, screen_ok
Accessories: original_box, original_charger, other_accessories
Warranty: warranty_valid_until
Issues: known_defects, battery_performance_issues, screen_issues
```

**For Complex Data:**
Use JSONB columns for flexible, nested data:
- technical_specs → Device specifications
- functionality_data → What works/doesn't work
- accessories_data → Complete accessories list
- condition_data → All condition details
- material_data → Material information

---

## Next Steps

1. ✅ Migration complete - 23 duplicate columns dropped
2. ✅ Canonical columns now have consolidated data
3. Use these columns in contract templates
4. Test placeholder replacement (expected >99% success)
5. Deploy to production

