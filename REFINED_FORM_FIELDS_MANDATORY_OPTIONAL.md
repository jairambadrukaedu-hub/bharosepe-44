# 📋 REFINED FORM FIELDS - MANDATORY + CATEGORY SPECIFIC

## 🔷 COMMON FIELDS (All Categories)

### MANDATORY (Must be filled)
```
1. product_name (text) - Item name/title ⭐
2. brand (text) - Brand name ⭐
3. description (textarea) - Detailed description ⭐ [MANDATORY FOR ALL]
4. condition_category (select) - Overall condition ⭐
5. color (text) - Color/finish ⭐
6. sale_price (number) - Sale price ₹ ⭐
7. delivery_method (select) - courier/pickup/in-person ⭐
8. delivery_address (textarea) - Where to deliver ⭐
9. delivery_date (date) - When will item be delivered 📅 ⭐
10. warranty_status (select) - Warranty present/expired/none ⭐
11. warranty_valid_till (date) - Warranty expiry date ⭐
12. buyer_evidence_recording (select) - yes/no ⭐

[CONDITIONAL IF buyer_evidence_recording = "yes"]:
- what_to_record (multi-select) ⭐
  Options: 
  - Unboxing video
  - Power ON test
  - Functionality test
  - Physical condition inspection
  - Serial/model number verification
  - Sound/display test
  - All accessories check
  - Other (specify)

📌 **DISCLAIMER - Buyer Evidence Recording:**
*"Recording buyer evidence (unboxing, functionality tests, condition verification) is always preferable for strong evidence points. These recordings provide clear proof of product condition at delivery and protect both buyer and seller in case of disputes."*

---

13. seller_predispatch_recording (select) - yes/no ⭐

[CONDITIONAL IF seller_predispatch_recording = "yes"]:
- predispatch_recording_items (multi-select) ⭐
  Options:
  - Full product packaging video
  - Product condition walkthrough
  - Serial number/label verification
  - Accessories verification (all items included)
  - Box sealing/security verification
  - Final weight/dimension check
  - Handling instructions demonstration
  - Other (specify)

📌 **DISCLAIMER - Seller Pre-Dispatch Recording:**
*"Pre-dispatch recording videos showing packaging, condition verification, and handling are always preferable for strong evidence points. These recordings provide clear proof of product condition before shipment and establish accountability."*

---

14. return_accepted (select) - yes/no/partial ⭐
  Options:
  - Yes - Full returns accepted
  - No - No returns accepted
  - Partial - Returns accepted only if damaged/defective
  
[CONDITIONAL IF return_accepted = "yes" OR "partial"]:
- return_condition_description (textarea) ⭐
  *Specify exact conditions under which returns are accepted*
- return_shipping_paid_by (select) ⭐
  Options: Buyer | Seller | Mutual agreement based on case
- return_refund_timeline_days (number) ⭐
  *Days to process refund after return received*
  
15.inspection_window_hours (select) - Hours buyer has to inspect item after receipt (6/12/24/48/custom) ⭐
. 
```

### AUTO-CALCULATED (System)
```
- platform_fee (number) = sale_price × 0.01 ⭐
- total_amount (number) = sale_price + platform_fee ⭐
```

**TOTAL: 15 Mandatory + 2 Conditional + 2 Auto-Calculated**

---

## 🔹 ANNEXURE A: APPLIANCES & ELECTRONICS

### MANDATORY

**Section 0: Appliance Type Selection**
- appliance_type (select) ⭐
  Options: TV | AC | Fridge | Washing Machine | Microwave | Geyser | Laptop | Desktop | Gaming Console | Camera | Other

**Section 1: Basic Specifications (ALL APPLIANCES)**
- brand (text) ⭐
- model_number (text) ⭐
- capacity (text) ⭐
- energy_rating (select) - 1-5 stars ⭐
- manufactured_year (number) ⭐

**Section 2: Condition & Usage (ALL APPLIANCES)**
- condition (select) - New/Used ⭐

**[CONDITIONAL IF condition = "Used"]:**
- age_months_or_years (number) ⭐
- usage_frequency (select) - Daily/Weekly/Occasional ⭐
- previous_repairs (select) - yes/no ⭐
- warranty_remaining (select) - yes/no ⭐
- if_warranty_remaining_months (number)
- original_bill_available (select) - yes/no ⭐

**Section 3: Appliance-Specific Tests [CONDITIONAL BY appliance_type]**

**[TV ONLY]:**
- display_condition (select) ⭐
- dead_pixels_present (select) - yes/no ⭐
- lines_shadow_light_bleed (select) - yes/no ⭐
- remote_working (select) - yes/no ⭐
- hdmi_ports_working (select) - yes/no ⭐
- speaker_working (select) - yes/no ⭐

**[AC ONLY]:**
- cooling_test_passed (select) - yes/no ⭐
- compressor_replaced (select) - yes/no ⭐
- gas_refill_required (select) - yes/no ⭐
- pcb_replaced (select) - yes/no ⭐
- remote_working (select) - yes/no ⭐
- noise_level (select) - Normal/Unusual ⭐

**[FRIDGE ONLY]:**
- cooling_test_passed (select) - yes/no ⭐
- compressor_condition (select) - Good/Fair/Poor ⭐
- door_seal_condition (select) - Good/Fair/Poor ⭐
- freezer_working (select) - yes/no ⭐
- ice_maker_working (select) - yes/no ⭐

**[WASHING MACHINE ONLY]:**
- drum_noise_vibration (select) - Normal/Unusual ⭐
- water_inlet_outlet_working (select) - yes/no ⭐
- spin_working (select) - yes/no ⭐
- pcb_replaced (select) - yes/no ⭐
- drum_condition (select) - Good/Fair/Poor ⭐

**[MICROWAVE ONLY]:**
- heating_test_passed (select) - yes/no ⭐
- display_working (select) - yes/no ⭐
- turntable_working (select) - yes/no ⭐
- buttons_working (select) - yes/no ⭐

**[GEYSER ONLY]:**
- heating_test_passed (select) - yes/no ⭐
- thermostat_working (select) - yes/no ⭐
- water_pressure_normal (select) - yes/no ⭐
- element_replaced (select) - yes/no ⭐

**[LAPTOP/DESKTOP ONLY]:**
- processor_type (text) ⭐
- ram_gb (number) ⭐
- storage_gb (number) ⭐
- battery_health_percent (number)
- screen_working (select) - yes/no ⭐
- keyboard_working (select) - yes/no ⭐
- trackpad_working (select) - yes/no ⭐
- ports_working (select) - yes/no ⭐
- hard_drive_replaced (select) - yes/no ⭐

**[GAMING CONSOLE ONLY]:**
- console_model (text) ⭐
- power_on_working (select) - yes/no ⭐
- controllers_working (select) - yes/no ⭐
- display_output_working (select) - yes/no ⭐
- disc_drive_working (select) - yes/no ⭐

**[CAMERA ONLY]:**
- camera_model (text) ⭐
- sensor_megapixels (number) ⭐
- power_on_working (select) - yes/no ⭐
- lens_condition (select) - Good/Fair/Poor ⭐
- sensor_scratches (select) - yes/no ⭐
- autofocus_working (select) - yes/no ⭐

**Section 4: MANDATORY SELLER EVIDENCE (ALL APPLIANCES)**
- function_test_video (url) ⭐
  [Shows: Power ON + Working display/functionality + Noise check + Remote working]
- physical_condition_photos (url array) ⭐
  [Front + Back/side + Serial sticker + Dents/scratches closeup + Remote/panel + Power cable]
- capacity_rating_label_photo (url) ⭐
  [Star rating + Energy guide + Capacity]
- previous_repairs_evidence (url) [IF previous_repairs = "yes"] ⭐
  [Bill + Service report + Warranty card]

### OPTIONAL
- power_rating_watts (text)
- dimensions_hxwxd (text)
- accessories_included (textarea)
- maintenance_tips (textarea)

**Appliances & Electronics: 12 Common Mandatory + 14 Core Specific Mandatory (+ Conditional Tests) = 26+ MANDATORY**
**Total: 26+ Mandatory + 5 Optional**

---

## 🔹 ANNEXURE B: MOBILE PHONES & LAPTOPS

### MANDATORY
```
Section 1: Device Identification
- device_type (select) - phone/laptop/tablet ⭐
- model_name (text) ⭐
- variant_ram_storage (text) ⭐
- ram (number) - GB ⭐
- storage_details (text) ⭐

Section 2: Security & Lock Status (CRITICAL - Verify at delivery only)
- device_lock_status (select) - OFF/ON/UNKNOWN ⭐
- can_device_be_reset (select) - yes/no ⭐

Section 3: Condition
- scratches (text)
- back_dents (text)
- screen_condition (text)
- cracks (text)
- spots_lines (text)
- touch_issues (text)
- heating_issues (text)
- speaker_mic_issues (text)
- network_issues (text)
- camera_issues (text)
- charging_port_issues (text)
- ram_ssd_upgraded (select)

Section 4: Functional Tests
- turns_on (select) ⭐
- charges (select) ⭐
- touchscreen (select) ⭐

Section 5: Optional Functional Tests
- buttons (select)
- fingerprint_faceid (select)
- speaker_mic_functional (select)
- front_back_camera (select)
- sim_detection (select)
```

**Mobile: 12 Common Mandatory + 10 Specific Mandatory = 22 MANDATORY**
**Total: 22 Mandatory + 17 Optional**

---

## 🔹 ANNEXURE C: FURNITURE

### MANDATORY
```
Section 1: Specifications
- furniture_type (select) - sofa/bed/table/chair ⭐
- style (text)
- material_type (select) ⭐
- length_cm (number) ⭐
- breadth_cm (number) ⭐
- height_cm (number) ⭐
- weight_kg (number)

Section 2: Condition
- frame_condition (select) - good/fair/poor ⭐
- stains_present (text)
- broken_parts (text)
- cushion_condition (text)
- stability_test_video (video url)⭐
- fully_functional (select)-yes/partial/no⭐
- if_partial_explain(text)

Section 3: Assembly
- Assembled (select) - fully_assembled /partial/to_be_assembles ⭐

Section 4: Delivery
- packaging_quality (text)
- installation_included (select)- yes/no⭐
- delivery_cost(select)-included/excluded
- if_excluded_what_is_the_extra_cost(text)
```

**Furniture: 12 Common Mandatory + 10 Specific Mandatory = 22 MANDATORY**
**Total: 22 Mandatory + 9 Optional**

---

## 🔹 ANNEXURE D: VEHICLES

### MANDATORY
```
Section 1: Identification
- vin (text)
- make (text) ⭐
- model_number (text) ⭐
- manufactured_year (number) ⭐
- registration_number (text) ⭐
- chassis_number (text) ⭐
- engine_number (text) ⭐
- transmission (select) ⭐
- fuel_type (select) ⭐

Section 2: Usage
- odometer_reading (number) - km ⭐
- ownership_history (text) ⭐
- service_history (text)⭐
- accident_history (text)⭐

Section 3: Documentation
- rc_valid (select) - yes/no ⭐
- insurance_status (select) ⭐
- puc_valid (select) ⭐

Section 4: Condition
- body_condition (text)⭐
- paint_chips (text)⭐
- rust_present (select)⭐
- glass_intact (select)⭐
- lights_working (select)⭐
- tire_condition (text)⭐
- tire_tread_mm (number)⭐
- steering_responsive (select)⭐
- ac_heater_working (select)⭐
- music_system_working (select)⭐
- engine_condition (select) ⭐
- transmission_working (select) ⭐
- brakes_condition (select) ⭐

Section 5: Videos (CRITICAL VERIFICATION)
- engine_start_video (url) ⭐
- driving_test_video (url) ⭐
- cold_start_video (url)⭐
- engine_sound_video (url)⭐
- chassis_video (url)⭐

Section 6: Service
- last_service_date (date)
- service_center (text)
- next_service_due (date)
- major_repairs_done (text)
- sunroof_windows_working (select)
```

**Vehicles: 12 Common Mandatory + 33 Specific Mandatory = 45 MANDATORY**
**Total: 45 Mandatory + 6 Optional**

---

## 🔹 ANNEXURE E: FASHION & APPAREL

### MANDATORY
```
Section 1: Specifications
- item_type (text) ⭐
- size (text) - XS/S/M/L/XL/XXL ⭐
- size_chart_refferal(image.url)⭐
- material_composition (text) ⭐

Section 2: Condition
- wear_level (select) - never/rarely/lightly/etc ⭐
- odor_present (select) - yes/no ⭐
- stains_marks (select) - yes/no ⭐
- fading_present (select) - yes/no ⭐
- loose_buttons (select) - yes/no ⭐
- zipper_is_functional(select) - yes/no ⭐
- alterations_made (select) - yes/no ⭐

Section 3: Authenticity
- authenticity_status (select) - original/duplicate ⭐
- tags_present (select) - yes/no ⭐

Section 4: Photos & Videos (CRITICAL)
- front_view_photo (url) ⭐
- back_view_photo (url) ⭐
- product_video(url)⭐

Section 5: Purchase
- purchase_date (date)
- invoice_available (select) - yes/no ⭐
```

**Fashion: 12 Common Mandatory + 17 Specific Mandatory = 29 MANDATORY**
**Total: 29 Mandatory + 1 Optional**

---

## 🔹 ANNEXURE F: JEWELLERY

### MANDATORY
```
Section 1: Identification
- item_type (select) - ring/necklace/bracelet ⭐
- metal_type (select) - gold/silver ⭐
- metal_purity (text) - 22K/18K ⭐
- hallmark_status (select) - yes/no ⭐

Section 2: Weight & Dimensions
- gross_weight_gm (number) ⭐
- net_weight_gm (number) ⭐
- weight_proof_video (url) ⭐
- length_mm (number)
- breadth_mm (number)
- height_mm (number)

Section 3: Stones
- stone_type (text) ⭐
- total_carat (number) ⭐
- stone_count (number)
- gem_certificate (select)
- certification_lab (text)
- color_grade (text)
- clarity_grade (text)
- loose_stones (select)
- broken_settings (select)
- polish_condition (text)

Section 4: Authenticity
- coa_provided (select) - yes/no ⭐
- video_360_provided (select) - yes/no ⭐
- lab_report_provided (select)
- maker_mark (select)
- maker_location (text)


```

**Jewellery: 12 Common Mandatory + 11 Specific Mandatory = 23 MANDATORY**
**Total: 23 Mandatory + 17 Optional**

---

## 🔹 ANNEXURE G: BUILDING MATERIALS

### MANDATORY
```
Section 1: Specifications
- material_type (text) ⭐
- grade_quality (select) - premium/standard ⭐
- quantity (number) ⭐

Section 2: Condition
- rust_present (select) - yes/no ⭐
- fully_functional (select) - yes/no ⭐
- discoloration (select)⭐

Section 3: Installation
- installation_required (select)⭐
- installation_type (text)
- technical_support_included (select)⭐
- is_installation_included (select) - yes/no ⭐
- if_no_what_is_the_extra_cost(text)
```

**Building Materials: 12 Common Mandatory + 9 Specific Mandatory = 21 MANDATORY**
**Total: 21 Mandatory + 2 Optional**

---

## 🔹 ANNEXURE H: COLLECTIBLES & LUXURY GOODS

### MANDATORY
```
Section 1: Identification
- item_name (text) ⭐
- collectible_category (select) ⭐
- rarity_level (select) ⭐
- production_year (number) ⭐
- serial_number (text)
- edition_number (text)
- limited_edition (select)- yes/no ⭐

Section 2: Authenticity
- coa_provided (select) - yes/no ⭐
- if_yes_authority_name(text)
- issuing_authority (text)
- video_360_provided (url) - yes/no ⭐

Section 3: Documentation
- purchase_date (date) ⭐

Section 4: Condition
- damage_description (textarea)
- restoration_done (select)
- conservation_status (text)
- environmental_factors (text)

Section 5: Additional Documentation
- original_invoice (file)
- appraisal_report (file)
- insurance_valuation (number)

Section 6: Inspection
- closeup_photos_provided (url)
- expert_inspection_done (select)
- inspector_name (text)

Section 7: Specifications
- dimensions_specified (text)
- weight_specified (number)
- material_type (text)
- insurance_value (number)

Section 8: Storage
- storage_requirements (text)
- temperature_range (text)
- humidity_range (text)
- special_care_instructions (text)
```

**Collectibles: 12 Common Mandatory + 8 Specific Mandatory = 20 MANDATORY**
**Total: 20 Mandatory + 22 Optional**

---

## 🔹 ANNEXURE I: INDUSTRIAL MACHINERY

### MANDATORY
```
Section 1: Specifications
- equipment_type (select) ⭐
- model_number (text) ⭐
- weight_kg (number)⭐
- paint_condition (select) ⭐
- rust_present (select) ⭐
- moving_parts_condition (select) ⭐
- power_test_video (url) ⭐
- run_test_video (url) ⭐
- installation_support_included (select)-yes/no⭐
- training_provided (select)-yes/no⭐

Optional Specs (Section 1 Optional):
- manufactured_year (number)
- voltage (number)
- power_hp (number)
- serial_number (text)
- phase (text)
- frequency (number)
- power_kw (number)
- amperage (number)

Section 2: Physical Specs
- dimensions_specified (text)
- length_mm (number)
- breadth_mm (number)
- height_mm (number)

Section 3: Tests
- cold_start_video (url)
- load_test_video (url)
- noise_level_db (number)
- vibration_level (url)

Section 4: Safety
- emergency_stop_working (select)
- safety_guards_intact (select)
- interlocks_functional (select)

Section 5: Maintenance
- repair_history (text)
- major_repairs_done (text)
- last_service_date (date)
- service_manual_provided (select)
- spare_parts_available (select)

Section 6: Compliance
- iso_certified (select)
- ce_mark_present (select)
- factory_certified (select)
- testing_certs_provided (select)

Section 7: Delivery
- if_no_what_is_the_extra_cost(text)
```

**Industrial: 12 Common Mandatory + 10 Specific Mandatory = 22 MANDATORY**
**Total: 22 Mandatory + 29 Optional**

---

## 🔹 ANNEXURE J: BOOKS & EDUCATIONAL MATERIAL

### MANDATORY
```
Section 1: Publication
- Book Name (text) ⭐
- author (text) ⭐
- genre(select)⭐
- language (select) ⭐
- publisher (text) ⭐
- publication_year (number) ⭐


Section 2: Physical Specs
- page_count (number) ⭐
- format (select) - hardcover/paperback ⭐

Section 3: Condition

- all_pages_present (select) - yes/no ⭐
- water_damage_status (select) - yes/no ⭐
- missing_pages_count (number) ⭐
- markings_present (select)-yes/no⭐
- cover_condition (text)
- pages_condition (text)
- binding_condition (text)
- spine_condition (text)
- annotations_description (text)

Section 4: Damage
- torn_pages_count (number)
- stains_present (select)
- page_discoloration_present (select)
- odor_declaration (text)

Section 5: Prior Use Markings
- highlighting_extent (select)-yes/no⭐
- underlines_extent (select)-yes/no⭐
- marginalia_description (text)
- stamps_present (select)-yes/no⭐

Section 6: Content
- plates_intact (select)
- maps_intact (select)
- index_intact (select)
- dust_jacket_included (select)

Section 7: Edition
- edition (select)-regular_edition /first_edition/is_collectible/is_limited_edition / signed_copy ⭐
- mention_speciality(text)

Section 8: Photos & Videos
- cover_page (url)⭐
- video_of_pages(url)⭐
```
Optional
-isbn (text)⭐

**Books: 12 Common Mandatory + 18 Specific Mandatory = 30 MANDATORY**
**Total: 30 Mandatory + 18 Optional**

---

## 🔹 ANNEXURE K: ART & HANDMADE ITEMS

### MANDATORY
```
Section 1: Identification
- style (text)
- artwork_name (text) ⭐
- artist_name (text) ⭐
- art_type (select) - painting/sculpture
- creation_year (number) ⭐
- dimensions_specified (text)
- weight_specified (number)

Section 2: Authenticity
- certificate_of_authenticity (select) - yes/no ⭐
- if_yes_mention_authority_name(text)
- artist_signature (select) - yes/no ⭐
- artist_verified (select) - yes/no ⭐

Section 3: Condition
- damage_description_if_any(textarea) ⭐
- restoration_history_if_any(text)
- conservation_status (text)

Section 4: Documentation
- insurance_valuation (number) ⭐
- awards_recognition (text)

Section 5: Specifications
- materials_used (text)
- color_palette (text)

Section 6: Storage
- storage_requirements (text)
- special_care_instructions (text)

Section 7: Verification
- photos_provided (url)
- video_provided (url)
- expert_verification_done (select)
```

**Art: 12 Common Mandatory + 8 Specific Mandatory = 20 MANDATORY** ✓
**Total: 20 Mandatory + 15 Optional**

---

## 🔹 ANNEXURE L: INSTAGRAM / WHATSAPP SELLERS (UNIVERSAL PRODUCTS)

### MANDATORY

**Section 1: Product Details (Unique to Social Sellers)**
```
1. product_category (select) ⭐
2. product_material (text)
3. product_dimensions (text)
4. product_weight (text)
5. authenticity_claim (select) ⭐
   Options: Original / Replica / Not Applicable
6. quantity (number) ⭐

[NOTE: product_title, product_description, product_color, condition_category, sale_price, delivery_method, delivery_address, delivery_date are inherited from COMMON FIELDS]
```

**Section 2: Shown Media (What Seller Showed Online)**
```
[These media become legally binding "Shown vs Delivered" comparison]

7. shown_photos (url, multi) ⭐
8. shown_video (url)
9. shown_description_text (textarea) ⭐
10. color_variation_disclaimer_accepted (yes/no) ⭐
11. handmade_variation_disclaimer (yes/no)
```

**Section 3: Custom Orders / Personalized Items**
```
12. is_custom_order (yes/no) ⭐

[CONDITIONAL IF is_custom_order = "yes"]:
13. custom_requirements_description (textarea) ⭐
14. custom_reference_images (url, multi)
15. text_or_name_customization (text)
16. custom_variation_tolerance (text)
17. custom_order_non_returnable (checkbox) ⭐
```


**Section 4: Risk & Variation Acceptance**
```
28. minor_color_variation_accepted (yes/no) ⭐
29. handmade_variation_accepted (yes/no)
30. measurement_tolerance_accepted (text)
```

**Section 5: Others**
- gift_wrapping_available (yes/no)
- invoice_provided (yes/no)
- similar_product_substitution_allowed (yes/no)

```

**INSTAGRAM/WHATSAPP SELLERS: 15 Common Mandatory + 15 Specific Mandatory (+ 5 Conditional Custom Order) = 30+ MANDATORY**
**Total: 30+ Mandatory + 14 Optional**

---

## 🔹 ANNEXURE M: [NEW INDUSTRY #2 - AWAITING DETAILS]

### MANDATORY
```
[Placeholder for Industry Details]
[To be filled after user provides field specifications]
```

**[Industry Name]: Details to be added**
**Total: TBD**

---

## 📊 CORRECTED GOODS SUMMARY TABLE

| Annexure | Category | Mandatory | Optional | Total | Status |
|----------|----------|-----------|----------|-------|--------|
| Common | All | 15 | 0 | 15 | ✓ +4 (recording + inspection + returns) |
| A | Appliances & Electronics | 26+ | 5 | 31+ | ✓ NEW |
| B | Mobile Phones | 22 | 17 | 39 | ✓ FIXED |
| C | Furniture | 22 | 9 | 31 | ✓ FIXED |
| D | Vehicles | 45 | 6 | 51 | ✓ FIXED |
| E | Fashion | 29 | 1 | 30 | ✓ FIXED |
| F | Jewellery | 23 | 17 | 40 | ✓ FIXED |
| G | Building Materials | 21 | 2 | 23 | ✓ FIXED |
| H | Collectibles | 20 | 22 | 42 | ✓ FIXED |
| I | Industrial | 22 | 29 | 51 | ✓ FIXED |
| J | Books | 30 | 18 | 48 | ✓ FIXED |
| K | Art | 20 | 15 | 35 | ✓ CORRECTED |
| L | Instagram/WhatsApp Sellers | 30+ | 14 | 44+ | ✓ DEDUPED |
| M | [NEW INDUSTRY #2] | TBD | TBD | TBD | ⏳ PENDING |

**GOODS TOTALS (FINAL - With Deduplicated Instagram/WhatsApp):**
- **MANDATORY: 232 fields** (15 common + 217 category-specific)
- **OPTIONAL: 130 fields** (all category-specific)
- **TOTAL: 362 fields**

---

## 🔷 SERVICE COMMON FIELDS (All Services)

### MANDATORY (Must be filled by user)
```
1. service_price (number) - Total service cost in ₹ ⭐
2. payment_schedule (select) - Full upfront/Partial upfront/On delivery/Milestone-based ⭐
3. delivery_date (date) - Agreed completion date ⭐
4. dispute_resolution_days (number) - Days allowed for resolution (default: 30) ⭐
```

### AUTO-CALCULATED (System)
```
- platform_fee (number) = service_price × 0.01 ⭐
- total_amount (number) = service_price + platform_fee ⭐
```

**TOTAL: 4 Mandatory (User-filled) + 10 Auto-Fetched + 2 Auto-Calculated**

---

## 🔹 SERVICE ANNEXURE A: SOFTWARE / APP / WEBSITE DEVELOPMENT

### MANDATORY
```
Section 1: Project Identity
- project_title (text) ⭐
- project_type (select) ⭐
- project_description (textarea)
- business_use_case (textarea) ⭐
- criticality_level (select) ⭐
- team_size_allocation (number)
- project_methodology (select)

Section 2: Scope of Work
- features (array) - Up to 50 features ⭐
- user_roles (array) - Up to 20 roles ⭐
- supported_devices (multi-select) ⭐
- page_load_time_desktop (text)
- page_load_time_mobile (text)
- api_response_time (text)
- concurrent_users_expected (number)
- supported_browsers (multi-select)
- integrations (array)

Section 3: Tech Stack
- frontend_technology (multi-select) ⭐
- backend_technology (multi-select) ⭐
- database_type (select) ⭐

Section 4: Design
- design_preference (select)
- design_reference_links (repeatable urls)
- color_palette (repeatable)
- responsive_breakpoints (multi-select)
- accessibility_requirements (multi-select)
- branding_guidelines_provided (yes/no)
- ui_framework_preference (text)

Section 5: Deployment
- deployment_environment (select)
- deployment_regions (multi-select)
- ssl_https_required (yes/no)
- backup_recovery_plan (yes/no)

Section 6: Testing
- testing_scope (select)
- browser_testing_required (yes/no)
- device_testing_required (yes/no)
- load_testing_threshold (number)

Section 7: Support
- post_launch_support_months (number)
- bug_fix_sla_response_hours (number)
- liability_cap_type (select)
- ip_ownership (select)

Section 8: Deliverables
- deliverable_format (multi-select) ⭐
- code_repository_access (yes/no) ⭐
- milestone_based_delivery (yes/no) ⭐

Section 9: Timeline
- total_estimated_hours (number) ⭐
```

**SOFTWARE: 4 Common Mandatory + 13 Specific Mandatory = 17 MANDATORY**
**Total: 17 Mandatory + 30 Optional**

---

## 🔹 SERVICE ANNEXURE B: UI/UX DESIGN & GRAPHIC DESIGN

### MANDATORY
```
Section 1: Project Definition
- project_title (text) ⭐
- design_type (select) ⭐
- business_use_case (textarea) ⭐
- industry_domain (select) ⭐

Section 2: Brand
- brand_guidelines_provided (yes/no)
- brand_logo_files (url)
- brand_colors_provided (yes/no)
- brand_voice_document_provided (yes/no)

Section 3: Typography
- font_selection_preference (select)
- font_licenses_required (yes/no)
- font_fallback_support (yes/no)
- typography_guidelines (textarea)

Section 4: Deliverables
- screen_count (number) ⭐
- design_style (select) ⭐
- color_palette_option (select) ⭐
- logo_concept_count (number)
- banner_variation_count (number)
- social_post_count (number)
- packaging_mockup_count (number)
- illustration_count (number)
- ux_flow_count (number)
- design_style_description (textarea)
- reference_links (repeatable urls)
- competitor_analysis_links (repeatable urls)
- inspiration_board_attached (yes/no)
- style_guidelines_provided (yes/no)
- brand_color_codes (repeatable)
- color_preference_description (textarea)

Section 5: Files
- file_formats_required (multi-select) ⭐
- source_files_included (yes/no) ⭐
- web_optimized_files (yes/no)
- print_optimized_files (yes/no)

Section 6: Revisions
- revision_scope (select) ⭐
- revision_rounds_included (number) ⭐
- revision_timeline_days (number) ⭐

Section 7: Usage Rights
- exclusive_rights (yes/no)
- portfolio_usage_allowed (yes/no)
- credit_attribution_required (yes/no)
```

**DESIGN: 4 Common Mandatory + 7 Specific Mandatory = 11 MANDATORY**
**Total: 11 Mandatory + 31 Optional**

---

## 🔹 SERVICE ANNEXURE C: CONTENT WRITING / COPYWRITING

### MANDATORY
```
Section 1: Project Definition
- project_title (text) ⭐
- content_type (select) ⭐
- industry_domain (select) ⭐

Section 2: Word Count
- content_length_type (select) ⭐
- minimum_word_count (number) ⭐
- maximum_word_deviation_percent (number)
- short_form_specs (textarea)
- reading_time_target (number)

Section 3: Deliverables
- blog_article_count (number) ⭐
- social_caption_count (number) ⭐
- product_description_count (number)
- ad_copy_count (number)
- video_script_count (number)
- email_sequence_count (number)
- page_count (number)

Section 4: Tone & Voice
- tone_of_voice (select) ⭐
- target_demographic (textarea) ⭐
- tone_of_voice_custom_description (textarea)
- voice_consistency_required (yes/no)
- brand_voice_guide_provided (yes/no)
- personality_brand_traits (textarea)

Section 5: Target Audience
- audience_persona_description (textarea)
- content_purpose (select)
- primary_language (select)
- language_proficiency_level (select)

Section 6: SEO
- seo_optimization_required (yes/no) ⭐
- primary_keywords (repeatable text)
- keyword_density_target (number)
- meta_description_included (yes/no)
- internal_linking_required (yes/no)

Section 7: Research
- research_included (yes/no)
- fact_checking_required (yes/no)
- source_citations_required (yes/no)
- expert_interviews_included (yes/no)

Section 8: Formatting
- heading_hierarchy_required (yes/no)
- bullet_points_allowed (yes/no)
- tables_infographics_included (yes/no)
- call_to_action_required (yes/no)

Section 9: Revisions
- revision_rounds_included (number) ⭐
- revision_scope (select)
- revision_turnaround_days (number)

Section 10: Deliverables Format
- file_format_required (select)
- plagiarism_check_included (yes/no)
- plagiarism_threshold_percent (number)
```

**CONTENT: 4 Common Mandatory + 11 Specific Mandatory = 15 MANDATORY**
**Total: 15 Mandatory + 42 Optional**

---

## 🔹 SERVICE ANNEXURE D: PHOTOGRAPHY & VIDEOGRAPHY

### MANDATORY
```
Section 1: Shoot Type
- shoot_type (select) - Photos Only / Videos Only / Both ⭐
- project_title (text) ⭐
- shoot_date (multiple dates can be selected) ⭐

Section 2: Coverage
- shoot_locations (repeatable text) ⭐
- coverage_hours_total (number) ⭐
- coverage_start_time (time)
- coverage_end_time (time)
- coverage_break_policy (textarea)
- photographer_count (select)
- videographer_count (select)
- backup_coverage_required (yes/no)
- shot_types_required (multi-select)
- shot_priority_order (textarea)
- specialized_shots_required (textarea)

**[CONDITIONAL IF shoot_type = "Photos Only" OR "Both"]:**

Section 3: Photo Deliverables
- photo_resolution (select) ⭐
- edited_photos_count (number) ⭐
- raw_photos_delivery (yes/no) ⭐
- raw_retention_period (select) ⭐

**[CONDITIONAL IF shoot_type = "Videos Only" OR "Both"]:**

Section 4: Video Deliverables
- video_resolution (select) ⭐
- cinematic_video_required (yes/no)
- cinematic_video_length (number)
- edited_video_count (number) ⭐
- raw_video_delivery (yes/no) ⭐
- raw_retention_period (select) ⭐

**[CONDITIONAL IF shoot_type = "Photos Only" OR "Both"]:**

Section 5: Photo Albums
- physical_album_delivery (yes/no) ⭐
- album_count (number)
- album_quality_grade (select)

**[CONDITIONAL IF shoot_type = "Videos Only" OR "Both"]:**

Section 6: Online Gallery
- online_gallery_provided (yes/no) ⭐
- password_protected_gallery (yes/no)
- gallery_expiry_days (number)

Section 7: Usage Rights
- copyright_ownership (select) ⭐
- commercial_usage_allowed (yes/no) ⭐
- social_media_usage_allowed (yes/no) ⭐
- print_usage_allowed (yes/no) ⭐
```

**PHOTOGRAPHY: 4 Common Mandatory + 11 Specific Mandatory (+ Conditional Photo/Video) = 15+ MANDATORY**
**Total: 15+ Mandatory + 35 Optional**

---

## 🔹 SERVICE ANNEXURE E: TUITION / COACHING / TRAINING

### MANDATORY
```
Section 1: Coaching Type
- coaching_type (select) ⭐
- trainer_name (text) ⭐
- trainer_qualification_experience (text) ⭐
- student_name (text) ⭐
- student_grade_level (select) ⭐
- subject_or_skill (text) ⭐

Section 2: Teaching Format
- learning_format (select) ⭐
- session_mode (select) ⭐
- group_size_max (number)

Section 3: Schedule
- session_frequency (select) ⭐
- session_duration_minutes (number) ⭐
- total_sessions_planned (number) ⭐
- class_timing_preference (textarea) ⭐
- flexible_rescheduling (yes/no)
- cancellation_policy (textarea)

Section 4: Curriculum
- curriculum_provided (yes/no)
- modules_list (repeatable text)
- total_modules (number)
- curriculum_document (url)
- syllabus_provided (yes/no)
- customization_allowed (yes/no)
- learning_outcomes_documented (yes/no)
- learning_outcomes_list (textarea)
- core_skills (textarea)
- tools_software_required (text)
- cost_responsibility_for_tools (select)

Section 5: Assessment
- assessment_method (multi-select) ⭐
- assessment_frequency (select) ⭐
- progress_tracking_included (yes/no)
- feedback_frequency (select)
- performance_reports_provided (yes/no)
- report_frequency (select)

Section 6: Doubt Solving
- doubt_session_policy (textarea)
- additional_doubt_sessions_included (number)
- additional_session_cost (number)
- response_time_for_queries_hours (number)

Section 7: Mock Tests
- mock_tests_included (yes/no)
- mock_test_count (number)
- mock_test_review_included (yes/no)
- practice_material_count (number)

Section 8: Technology
- platform_used (select)
- learning_management_system_used (text)
- screen_sharing_required (yes/no)
- recording_of_sessions_allowed (yes/no)

Section 9: Performance
- performance_guarantee_offered (yes/no)
- guarantee_metric (select)
- guarantee_target_value (number)
- guarantee_conditions (textarea)

Section 10: Materials
- study_materials_provided (yes/no) ⭐
- material_format (multi-select) ⭐
- access_to_materials_duration (text)
```

**COACHING: 4 Common Mandatory + 16 Specific Mandatory = 20 MANDATORY**
**Total: 20 Mandatory + 44 Optional**

---

## 🔹 SERVICE ANNEXURE F: HOME REPAIR & MAINTENANCE

### MANDATORY
```
Section 1: Service Type
- service_type (select) ⭐
- service_job_title (text) ⭐
- property_type (select) ⭐

Section 2: Location
- service_location_address (textarea) ⭐
- floor_number (text) ⭐
- lift_available (yes/no) ⭐
- working_hours_restrictions (textarea) ⭐
- working_days_preference (multi-select) ⭐
- access_availability_hours (text)
- additional_access_conditions (textarea)

Section 3: Problem Description
- current_problem_description (textarea) ⭐
- emergency_situation (yes/no) ⭐

Section 4: Scope of Work
- scope_of_work_tasks (array) - Up to 20 tasks ⭐
- work_exclusions (textarea) ⭐

Section 5: Materials
- materials_provided_by (select) ⭐
- quality_grade_materials (select) ⭐

Section 6: Quality Standards
- workmanship_warranty_period (number) ⭐
- rework_policy (textarea) ⭐
- quality_standards_reference (textarea)
- defect_definition (textarea)
- quality_inspection_by (select)

Section 7: Timeline
- single_visit_or_multiple (select) ⭐
- number_of_visits_estimated (number)
- visit_schedule_flexibility (yes/no) ⭐
- estimated_completion_date (date) ⭐
- estimated_total_hours (number) ⭐

Section 8: Cleanup
- cleanup_included (yes/no)
- waste_disposal_included (yes/no)
- restoration_to_original_state (yes/no)
```

**REPAIR: 4 Common Mandatory + 15 Specific Mandatory = 19 MANDATORY**
**Total: 19 Mandatory + 34 Optional**

---

## 🔹 SERVICE ANNEXURE G: CLEANING & HOUSEKEEPING

### MANDATORY
```
Section 1: Service Type
- service_type (select) ⭐
- property_type (select) ⭐
- property_size_sqft (number) ⭐
- property_condition_before (select) ⭐

Section 2: Property Details
- bedroom_count (number) ⭐
- bathroom_count (number) ⭐
- kitchen_present (yes/no)
- living_area_present (yes/no)
- balcony_terrace_present (yes/no)
- outdoor_area_present (yes/no)

Section 3: Scope
- bedroom_cleaning (yes/no)
- bedroom_cleaning_count (number)
- washroom_cleaning (yes/no)
- washroom_cleaning_count (number)
- kitchen_cleaning (yes/no)
- living_room_cleaning (yes/no)
- hallway_staircase_cleaning (yes/no)
- balcony_cleaning (yes/no)
- balcony_cleaning_count (number)
- office_area_cleaning (yes/no)
- other_rooms_cleaning (textarea)
- carpet_cleaning (yes/no)
- carpet_cleaning_count (number)
- window_cleaning (yes/no)
- window_cleaning_count (number)
- sofa_upholstery_cleaning (yes/no)
- pest_control_included (yes/no)

Section 4: Products
- eco_friendly_products_required (yes/no)
- chemical_sensitivity_disclosure (yes/no)
- allergy_information (textarea)
- pet_friendly_products (yes/no)
- cleaning_supplies_provided_by (select)
- supply_cost_included (yes/no)

Section 5: Schedule
- preferred_time (text) ⭐
- session_duration_hours (number) ⭐

Section 6: Pre-Cleaning
- property_preparation_required (yes/no)
- furniture_moving_included (yes/no)
- client_availability_required (yes/no)

Section 7: Quality
- cleanliness_level_expectation (select) ⭐
- inspection_checklist_provided (yes/no)
- photographic_proof_required (yes/no) ⭐
- quality_guarantee_period_days (number)

Section 8: Special Conditions
- child_care_concurrent_needed (yes/no)
- elderly_care_concurrent_needed (yes/no)
- work_from_home_considerations (yes/no)
- noise_level_restrictions (textarea)
```

**CLEANING: 4 Common Mandatory + 10 Specific Mandatory = 14 MANDATORY**
**Total: 14 Mandatory + 45 Optional**

---

## 🔹 SERVICE ANNEXURE D: PHOTOGRAPHY & VIDEOGRAPHY

### MANDATORY
```
Section 1: Shoot Type
- shoot_type (select) - Photos Only / Videos Only / Both ⭐
- project_title (text) ⭐
- shoot_date (multiple dates can be selected) ⭐

Section 2: Coverage
- shoot_locations (repeatable text) ⭐
- coverage_hours_total (number) ⭐
- coverage_start_time (time)
- coverage_end_time (time)
- coverage_break_policy (textarea)
- photographer_count (select)
- videographer_count (select)
- backup_coverage_required (yes/no)
- shot_types_required (multi-select)
- shot_priority_order (textarea)
- specialized_shots_required (textarea)

**[CONDITIONAL IF shoot_type = "Photos Only" OR "Both"]:**

Section 3: Photo Deliverables
- photo_resolution (select) ⭐
- edited_photos_count (number)⭐
- raw_photos_delivery (yes/no)⭐
- raw_retention_period (select)⭐

**[CONDITIONAL IF shoot_type = "Videos Only" OR "Both"]:**

Section 4: Video Deliverables
- video_resolution (select) ⭐
- cinematic_video_required (yes/no)
- cinematic_video_length (number)
- edited_video_count (number)⭐
- raw_video_delivery (yes/no)⭐
- raw_retention_period (select)⭐

**[CONDITIONAL IF shoot_type = "Photos Only" OR "Both"]:**

Section 5: Photo Albums
- physical_album_delivery (yes/no)⭐
- album_count (number)
- album_quality_grade (select)

**[CONDITIONAL IF shoot_type = "Videos Only" OR "Both"]:**

Section 6: Online Gallery
- online_gallery_provided (yes/no)⭐
- password_protected_gallery (yes/no)
- gallery_expiry_days (number)

Section 7: Usage Rights
- copyright_ownership (select) ⭐
- commercial_usage_allowed (yes/no) ⭐
- social_media_usage_allowed (yes/no)⭐
- print_usage_allowed (yes/no)⭐
```

**Photography: 16 Common Mandatory + Conditional Photo/Video fields = Dynamic MANDATORY**
**Total: Variable Mandatory + 35 Optional**

---

## 🔹 SERVICE ANNEXURE H: DIGITAL MARKETING

### MANDATORY
```
Section 1: Service Type
- service_type (select) ⭐
- business_type (select) ⭐
- campaign_name (text) ⭐

Section 2: Brand Information
- brand_name (text) ⭐
- brand_description (textarea) ⭐
- website_url (url) ⭐
- brand_voice_guidelines_provided (yes/no)
- competitor_analysis_provided (yes/no)

Section 3: Strategy
- marketing_strategy_documented (yes/no) ⭐
- strategy_duration_months (number) ⭐
- primary_objective (select) ⭐
- aspirational_metrics_disclaimer (yes/no) ⭐
- secondary_objectives (multi-select)
- target_audience_detailed (textarea)

Section 4: Content Creation
- content_creation_included (yes/no) ⭐
- any_promising_reach(select)yes/no ⭐
- if_yes_mention(text)
- content_types (multi-select) ⭐

⚙️ **CONDITIONAL SECTIONS (Based on Section 4 - content_types selection):**

**[APPEARS IF "Social Media" selected in Section 4]:**
Section 4.1: Social Media
- social_media_included (yes/no)
- platforms_to_manage (multi-select)
- instagram_included (yes/no)
- instagram_post_frequency (number)
- instagram_story_frequency (number)
- instagram_engagement_target (number)
- facebook_included (yes/no)
- facebook_post_frequency (number)
- facebook_engagement_type (select)
- linkedin_included (yes/no)
- linkedin_content_type (multi-select)
- tiktok_included (yes/no)
- tiktok_video_count_monthly (number)
- youtube_included (yes/no)
- youtube_video_frequency (number)
- youtube_video_length_minutes (text)

**[APPEARS IF "Blog/Content" selected in Section 4]:**
Section 4.2: Content Creation
- blog_posts_monthly (number)
- graphics_per_month (number)
- video_content_monthly (number)
- reels_shorts_monthly (number)
- content_calendar_provided (yes/no)
- content_approval_process (select)
- content_revision_rounds (number)
- content_sourcing (select)

**[APPEARS IF "SEO" selected in Section 4]:**
Section 4.3: SEO
- seo_included (yes/no)
- keyword_research_included (yes/no)
- target_keywords_count (number)
- on_page_optimization (yes/no)
- technical_seo_audit (yes/no)
- backlink_building_included (yes/no)
- target_domain_authority (number)
- ranking_target_months (number)
- local_seo_included (yes/no)
- monthly_seo_reports (yes/no)

**[APPEARS IF "Paid Ads" selected in Section 4]:**
Section 4.4: Paid Ads
- paid_ads_included (yes/no)
- google_ads_included (yes/no)
- google_ads_monthly_budget (number)
- google_ads_campaign_type (multi-select)
- facebook_ads_included (yes/no)
- facebook_ads_monthly_budget (number)
- facebook_ads_objective (select)
- instagram_ads_included (yes/no)
- instagram_ads_monthly_budget (number)
- ad_creative_design_included (yes/no)
- a_b_testing_included (yes/no)
- conversion_tracking_setup (yes/no)
- roi_reporting_frequency (select)

**[APPEARS IF "Email Marketing" selected in Section 4]:**
Section 4.5: Email Marketing
- email_marketing_included (yes/no)
- email_list_size_current (number)
- email_campaign_frequency (select)
- email_design_included (yes/no)
- automation_setup_included (yes/no)

**[APPEARS IF "Influencer Marketing" selected in Section 4]:**
Section 4.6: Influencer Marketing
- influencer_marketing_included (yes/no)
- influencer_tier_preference (select)
- influencer_count_target (number)
- deliverables_per_influencer (text)
- influencer_vetting_included (yes/no)

Section 5: Reporting
- reporting_frequency (select) ⭐

Section 6: Analytics
- analytics_setup_included (yes/no)
- key_metrics_tracked (multi-select)
- custom_dashboard_provided (yes/no)
- strategy_adjustments_included (number)
- performance_review_meetings (number)

Section 7: Terms
- campaign_duration_months (number) ⭐
- contract_renewal_terms (textarea)
- minimum_commitment_months (number)
- exit_clause_terms (textarea)
```

**Marketing: 4 Common Mandatory + 12 Specific Mandatory (+ Conditional 4.1-4.6) = 16+ MANDATORY**
**Total: 16+ Mandatory + 89 Optional**

---

## 🔹 SERVICE ANNEXURE I: CONSULTING / CA / TAX / LEGAL / FINANCIAL ADVICE

### MANDATORY
```
Section 1: Service Type
- service_type (select) ⭐
- client_entity_type (select) ⭐
- client_business_type (select) ⭐

Section 2: Client Information
- client_name (text) ⭐
- client_pan_number (text) ⭐

Section 3: Documentation
- documents_to_be_provided_by_client (textarea)
- document_submission_timeline (text)
- missing_documents_handling (select)
- document_retention_policy (text)
- document_confidentiality_duration_years (number)

Section 4: Scope
- deliverables_list (repeatable textarea) ⭐
- deliverables_count_total (number) ⭐
- primary_deliverable (textarea) ⭐
- secondary_deliverables (textarea)
- documentation_to_provide (multi-select)
- timeline_for_each_deliverable (textarea)
- milestone_based_delivery (yes/no)
- milestone_count (number)
- final_delivery_deadline (date)
- deliverable_format (multi-select)
- revision_scope (select)

Section 5: Compliance
- regulatory_requirements_applicable (multi-select) ⭐
- jurisdiction (select) ⭐
- compliance_calendar_provided (yes/no)
- compliance_deadline_reminders (yes/no)
- compliance_documentation_prepared (yes/no)
- regulatory_return_filings (yes/no)
- number_of_returns_to_file (number)

Section 6: Liability Disclaimers
- liability_cap_percentage (number) ⭐
- advice_not_guaranteed (yes/no) ⭐
- no_guarantee_refund_disclaimer (yes/no) ⭐
- not_full_representation_disclaimer (yes/no) ⭐
- not_investment_advice_disclaimer (yes/no) ⭐
- liability_cap_amount_if_fixed (number)
- exclusion_of_consequential_damages (yes/no)
- liability_period_days (number)
- scope_of_advice_documented (yes/no)
- out_of_scope_advice_cost (number)
- client_reliance_on_own_judgment (yes/no)
- tax_filing_not_legal_advice_disclaimer (yes/no)
- no_guarantee_penalty_avoidance_disclaimer (yes/no)
- not_attorney_client_relationship_disclaimer (yes/no)
- independent_legal_counsel_recommended_disclaimer (yes/no)
- market_risks_disclosure (yes/no)
- past_performance_no_guarantee_disclaimer (yes/no)
- tax_planning_included (yes/no)
- tax_saving_strategies (textarea)
- expected_tax_savings_estimate (number)
- invoice_optimization_included (yes/no)
- gst_implications_analyzed (yes/no)
- business_structure_recommendations (yes/no)

Section 7: Communication
- communication_method (multi-select) ⭐
- response_time_sla_hours (number) ⭐
- support_availability (select)
- escalation_procedure_documented (yes/no)
- emergency_support_available (yes/no)

Section 8: Revision
- revision_rounds_included (number) ⭐
- revision_timeline_days (number)
- rework_due_to_error (select)
- rework_response_time_days (number)

Section 9: Payment
- payment_structure (select) ⭐
- cancellation_policy (textarea)
- refund_policy (textarea)

Section 10: Additional Services
- additional_services_possible (yes/no)
- additional_service_examples (textarea)
- additional_service_cost_structure (select)
- hourly_rate_additional (number)
- approval_required_for_additional (yes/no)
- cost_estimate_upfront (yes/no)
```

**CONSULTING: 4 Common Mandatory + 18 Specific Mandatory = 22 MANDATORY**
**Total: 22 Mandatory + 56 Optional**

---

## 🔹 SERVICE ANNEXURE J: EVENT MANAGEMENT

⚙️ **EVENT SERVICE ARCHITECTURE:**
Event Management is structured as **13 distinct sub-services**, each inheriting 4 Common Service Fields (service_price, payment_schedule, delivery_date, dispute_resolution_days) from SERVICE COMMON. Based on `service_type` selection, the user fills out only the relevant sub-service fields.

**[CONDITIONAL BY service_type]** - Show only selected sub-service fields:

---

### 🔸 EVENT PLANNER (Event Planning & Coordination)

**[APPEARS IF service_type = "Event Planner"]:**

**MANDATORY**
```
1. event_type (select) ⭐
   Options: Wedding / Corporate / Birthday / Anniversary / Engagement / Mehendi / Haldi / Reception / Graduation / Social / Conference / Other
2. event_date (date) ⭐
3. event_start_time (time) ⭐
4. event_end_time (time) ⭐
5. venue_address (textarea) ⭐
6. expected_guest_count (number) ⭐
7. overall_event_scope (textarea) ⭐
8. event_zones_managed (multi-select) ⭐
   Options: Entrance | Seating | Bar | Food Court | Dance Floor | Photo Booth | Lounge | VIP Area | Prayer/Ritual Area | Kids Zone | Parking | Other
9. planning_tasks_included (multi-select) ⭐
   Options: Vendor sourcing | Timeline planning | Budget management | Day-of coordination | Guest management | Setup coordination | Theme finalization | Menu planning | Music selection | Photography direction
10. exclusions (textarea) ⭐
11. vendors_to_be_managed (multi-select) ⭐
12. vendor_payments_managed_by (select) ⭐
    Options: Planner | Client | Mixed
13. load_in_time (time) ⭐
14. load_out_time (time) ⭐
15. crowd_management_responsibility (select) ⭐
    Options: Planner | Security team | Client | Mixed
16. emergency_protocol_defined (yes/no) ⭐
17. manpower_required (number) ⭐
18. approval_required_for_changes (yes/no) ⭐
19. rain_plan_required (yes/no)
```

**OPTIONAL: 8 fields**
- contingency_budget_percent (number)
- preferred_vendor_list (textarea)
- client_contact_person (text)
- backup_contact_person (text)
- event_brief_document (url)
- post_event_debrief_required (yes/no)
- next_event_follow_up (yes/no)
- event_photography_coordinator_included (yes/no)

**Event Planner: 4 Common + 19 Mandatory = 23 MANDATORY**
**Total: 23 Mandatory + 8 Optional**

---

### 🔸 DECORATION TEAM (Decoration/Stage/Mandap/Fabrication)

**[APPEARS IF service_type = "Decoration Team"]:**

**MANDATORY**
```
1. decor_style (text) ⭐
2. decor_theme_reference_images (url, multi) ⭐
3. floral_requirement (select) ⭐
   Options: Fresh flowers | Artificial flowers | Mixed
4. props_included (textarea) ⭐
5. lighting_included_for_decor (yes/no) ⭐
6. installation_time_required_hours (number) ⭐
7. dismantling_time_required_hours (number) ⭐
8. decor_variation_tolerance (text) ⭐
9. safety_rigging_required (yes/no)
10. height_clearance_requirement (number)
11. backdrop_style (text)
12. seating_style (text)
13. centerpiece_items (textarea)
```

**OPTIONAL: 7 fields**
- decor_color_palette (text)
- wall_coverage_required (yes/no)
- ceiling_decoration (yes/no)
- floor_coverage_type (text)
- entrance_arch_style (text)
- stage_backdrop_details (textarea)
- post_event_decoration_removal (yes/no)

**Decoration Team: 4 Common + 13 Mandatory = 17 MANDATORY**
**Total: 17 Mandatory + 7 Optional**

---

### 🔸 CATERING SERVICE (Food, Beverages, Live Counters, Serving Staff)

**[APPEARS IF service_type = "Catering Service"]:**

**MANDATORY**
```
1. menu_items (textarea) ⭐
2. menu_type (select) ⭐
   Options: Vegetarian | Non-vegetarian | Mixed
3. pax_count (number) ⭐
4. food_service_type (select) ⭐
   Options: Buffet | Plated | Live counter | Mixed
5. serving_duration_hours (number) ⭐
6. cutlery_provided (yes/no) ⭐
7. server_staff_count (number) ⭐
8. food_wastage_policy (textarea) ⭐
9. cleanup_responsibility (select) ⭐
   Options: Client | Caterer | Mixed
10. live_counter_required (yes/no)
11. live_counter_items (textarea)
12. food_tasting_session_included (yes/no)
13. allergen_information_provided (yes/no)
14. kitchen_setup_required (yes/no)
15. electricity_load_required_kw (number)
```

**OPTIONAL: 10 fields**
- beverage_options (textarea)
- mocktail_menu (textarea)
- dessert_station_included (yes/no)
- dietary_restrictions_catered_for (textarea)
- crockery_glassware_type (text)
- serving_temperature_maintained (yes/no)
- leftover_food_policy (text)
- catering_equipment_provided (textarea)
- bar_service_staff_included (yes/no)
- guest_dietary_form_required (yes/no)

**Catering Service: 4 Common + 15 Mandatory = 19 MANDATORY**
**Total: 19 Mandatory + 10 Optional**

---

### 🔸 SOUND & DJ SERVICE (Non-Photography, Non-Video Entertainment)

**[APPEARS IF service_type = "Sound & DJ Service"]:**

**MANDATORY**
```
1. sound_system_type (select) ⭐
   Options: Basic | Professional | Concert-grade
2. equipment_list (textarea) ⭐
3. dj_performance_duration_hours (number) ⭐
4. noise_restriction_compliant (yes/no) ⭐
5. power_requirement_kw (number) ⭐
6. sound_check_time_required (text) ⭐
7. playlist_preference (textarea)
8. genre_preferences (multi-select)
9. backup_speaker_available (yes/no)
10. mc_or_announcer_included (yes/no)
11. dj_table_required (yes/no)
```

**OPTIONAL: 9 fields**
- custom_mixing_available (yes/no)
- mic_for_speeches_included (yes/no)
- wireless_microphone_count (number)
- sound_mixing_board_quality (text)
- cable_length_requirements (text)
- backup_dj_available (yes/no)
- music_licensing_handled (yes/no)
- sound_engineer_included (yes/no)
- ambient_background_music_duration (text)

**Sound & DJ Service: 4 Common + 11 Mandatory = 15 MANDATORY**
**Total: 15 Mandatory + 9 Optional**

---

### 🔸 LIGHTING TEAM (Stage/Floor/Decor Lights)

**[APPEARS IF service_type = "Lighting Team"]:**

**MANDATORY**
```
1. lighting_types_required (multi-select) ⭐
   Options: Stage lights | Uplights | Fairy lights | Spotlights | Wash lights | DMX programmable lights
2. lighting_design_brief (textarea) ⭐
3. power_load_requirement_kw (number) ⭐
4. installation_time_required_hours (number) ⭐
5. lighting_rigging_requirements (text)
6. dismantling_time_hours (number)
7. light_operator_required (yes/no)
8. control_console_included (yes/no)
9. generator_backup_required (yes/no)
10. lighting_color_schemes (multi-select)
11. dynamic_lighting_changes (yes/no)
12. backup_lights_available (yes/no)
```

**OPTIONAL: 8 fields**
- lighting_effect_preferences (textarea)
- synchronized_with_music (yes/no)
- follow_spots_required (yes/no)
- laseshow_available (yes/no)
- control_panel_location (text)
- power_distribution_points (number)
- lighting_maintenance_during_event (yes/no)
- post_event_equipment_storage (yes/no)

**Lighting Team: 4 Common + 12 Mandatory = 16 MANDATORY**
**Total: 16 Mandatory + 8 Optional**

---

### 🔸 MAKEUP ARTIST (MUA)

**[APPEARS IF service_type = "Makeup Artist"]:**

**MANDATORY**
```
1. makeup_style_required (text) ⭐
2. trial_session_included (yes/no) ⭐
3. skin_allergy_disclaimer_accepted (yes/no) ⭐
4. products_used (textarea)
5. hair_styling_included (yes/no)
6. touchup_sessions_included (number)
7. travel_charges_applicable (yes/no)
8. before_after_photos_allowed (yes/no)
```

**OPTIONAL: 7 fields**
- makeup_theme_coordination (yes/no)
- bridal_trial_date (date)
- trial_location_preference (text)
- product_substitution_allowed (yes/no)
- on_site_setup_time_required (number)
- airbrush_makeup_available (yes/no)
- makeup_removal_service_included (yes/no)

**Makeup Artist: 4 Common + 8 Mandatory = 12 MANDATORY**
**Total: 12 Mandatory + 7 Optional**

---

### 🔸 HOST / ANCHOR / MC SERVICES

**[APPEARS IF service_type = "Host/Anchor/MC"]:**

**MANDATORY**
```
1. host_language_preferences (multi-select) ⭐
   Options: English | Hindi | Regional languages | Mixed
2. hosting_duration_hours (number) ⭐
3. script_required (yes/no) ⭐
4. script_provided_by (select) ⭐
   Options: Client | Host
5. rehearsal_required (yes/no)
6. rehearsal_duration_hours (number)
7. dress_code (text)
8. crowd_interaction_level (select)
   Options: Low | Medium | High
```

**OPTIONAL: 6 fields**
- script_customization_allowed (yes/no)
- event_flow_documentation (yes/no)
- guest_name_pronunciation_help (yes/no)
- on_site_coordination_required (yes/no)
- backup_host_available (yes/no)
- post_event_feedback_session (yes/no)

**Host/Anchor/MC: 4 Common + 8 Mandatory = 12 MANDATORY**
**Total: 12 Mandatory + 6 Optional**

---

### 🔸 EVENT STAFFING (Bouncers, Helpers, Ushers, Volunteers)

**[APPEARS IF service_type = "Event Staffing"]:**

**MANDATORY**
```
1. staff_type (select) ⭐
   Options: Bouncers | Ushers | Volunteers | Helpers | Security
2. staff_count (number) ⭐
3. duty_hours (text) ⭐
4. uniform_required (yes/no)
5. food_arrangement_responsibility (select) ⭐
   Options: Client | Service provider | Mixed
6. entry_exit_management_required (yes/no)
7. crowd_control_level (select)
   Options: Low | Medium | High
```

**OPTIONAL: 6 fields**
- staff_training_provided (yes/no)
- briefing_document_required (yes/no)
- background_verification_done (yes/no)
- communication_devices_provided (yes/no)
- emergency_response_training (yes/no)
- post_event_report_required (yes/no)

**Event Staffing: 4 Common + 7 Mandatory = 11 MANDATORY**
**Total: 11 Mandatory + 6 Optional**

---

### 🔸 LOGISTICS & TRANSPORT (Setup Trucks, Guest Transport, Vendor Moves)

**[APPEARS IF service_type = "Logistics & Transport"]:**

**MANDATORY**
```
1. logistics_type (select) ⭐
   Options: Guest transport | Vendor transport | Equipment transport | Mixed
2. vehicle_type (select) ⭐
   Options: Car | Tempo | Truck | Bus | Multiple vehicles
3. vehicle_count (number) ⭐
4. load_in_time (text) ⭐
5. load_out_time (text) ⭐
6. kilometer_limit (number)
7. driver_details_required (yes/no)
8. toll_parking_included (yes/no)
9. pickup_drop_locations (textarea)
```

**OPTIONAL: 7 fields**
- fuel_charges_included (yes/no)
- vehicle_decoration_required (yes/no)
- insurance_coverage (yes/no)
- driver_uniform_required (yes/no)
- vehicle_capacity_details (text)
- waiting_time_charges (number)
- return_trip_included (yes/no)

**Logistics & Transport: 4 Common + 9 Mandatory = 13 MANDATORY**
**Total: 13 Mandatory + 7 Optional**

---

### 🔸 HOSPITALITY & GUEST SUPPORT

**[APPEARS IF service_type = "Hospitality & Guest Support"]:**

**MANDATORY**
```
1. hospitality_team_size (number) ⭐
2. guest_welcome_kit_included (yes/no)
3. seating_management_required (yes/no)
4. vip_guest_handling_required (yes/no)
5. lost_and_found_management (yes/no)
6. water_station_setup (yes/no)
7. queue_management (yes/no)
8. guest_feedback_collection (yes/no)
9. guest_assistance_areas (multi-select)
10. information_desk_required (yes/no)
```

**OPTIONAL: 8 fields**
- guest_accommodation_assistance (yes/no)
- transportation_assistance_provided (yes/no)
- special_needs_accommodation (yes/no)
- complaint_resolution_protocol (yes/no)
- guest_comfort_items_provided (textarea)
- post_event_thank_you_coordination (yes/no)
- guest_database_management (yes/no)
- vip_lounge_management (yes/no)

**Hospitality & Guest Support: 4 Common + 10 Mandatory = 14 MANDATORY**
**Total: 14 Mandatory + 8 Optional**

---

### 🔸 FLORAL SERVICE (Standalone Florist)

**[APPEARS IF service_type = "Floral Service"]:**

**MANDATORY**
```
1. flower_type_preference (text) ⭐
2. flower_quantity (text) ⭐
3. fresh_or_artificial (select) ⭐
   Options: Fresh | Artificial | Mixed
4. seasonal_flower_variation_accepted (yes/no) ⭐
5. bouquet_count (number)
6. floral_installation_required (yes/no)
7. water_supply_required (yes/no)
8. replacement_frequency (text)
```

**OPTIONAL: 6 fields**
- flower_color_palette (text)
- floral_arrangement_style (text)
- fragrance_preference (text)
- allergenic_flowers_avoided (yes/no)
- floral_preservation_tips (yes/no)
- post_event_flower_disposal (text)

**Floral Service: 4 Common + 8 Mandatory = 12 MANDATORY**
**Total: 12 Mandatory + 6 Optional**

---

### 🔸 STAGE SETUP TEAM

**[APPEARS IF service_type = "Stage Setup Team"]:**

**MANDATORY**
```
1. stage_type (text) ⭐
2. stage_dimensions (text) ⭐
3. stage_safety_certification (yes/no) ⭐
4. installation_time_hours (number) ⭐
5. carpet_required (yes/no)
6. steps_required (yes/no)
7. stage_load_capacity (number)
8. backdrop_attachment_points (number)
9. electrical_outlets_required (number)
```

**OPTIONAL: 6 fields**
- stage_height_adjustable (yes/no)
- microphone_stands_included (yes/no)
- stage_railing_required (yes/no)
- stage_covering_material (text)
- post_event_dismantling_included (yes/no)
- storage_of_stage_material (yes/no)

**Stage Setup Team: 4 Common + 9 Mandatory = 13 MANDATORY**
**Total: 13 Mandatory + 6 Optional**

---

### 🔸 CUSTOM SERVICE (Any Other Event-Related Work)

**[APPEARS IF service_type = "Custom Service"]:**

**MANDATORY**
```
1. custom_service_title (text) ⭐
2. custom_service_description (textarea) ⭐
3. materials_required (textarea)
4. on_site_requirements (textarea)
5. delivery_format (textarea)
6. risk_factors (textarea)
```

**OPTIONAL: 5 fields**
- vendor_coordination_needed (yes/no)
- setup_time_required (number)
- breakdown_time_required (number)
- insurance_required (yes/no)
- additional_cost_factors (textarea)

**Custom Service: 4 Common + 6 Mandatory = 10 MANDATORY**
**Total: 10 Mandatory + 5 Optional**

---

**EVENT MANAGEMENT SUMMARY:**
- **MANDATORY: 116 fields** (4 Common + 112 sub-service-specific)
- **OPTIONAL: 71 fields** (across all 13 sub-services)
- **TOTAL EVENT MANAGEMENT: 187 fields**

---

## 📊 SERVICES SUMMARY TABLE

| Annexure | Service Type | Mandatory | Optional | Total | Notes |
|----------|--------------|-----------|----------|-------|-------|
| Common | All | 4 | 0 | 4 | Auto-fetched from contract |
| A | Software Dev | 17 | 30 | 47 | Highly complex |
| B | Design | 11 | 31 | 42 | Creative flexibility |
| C | Content | 15 | 42 | 57 | SEO-rich |
| D | Photography | 15+ | 35 | 50+ | Conditional Photo/Video |
| E | Coaching | 20 | 44 | 64 | Performance guarantee |
| F | Repair | 19 | 34 | 53 | Scope definition critical |
| G | Cleaning | 14 | 45 | 59 | Checklist-based |
| H | Marketing | 16+ | 89 | 105+ | Conditional 4.1-4.6 |
| I | Consulting | 22 | 56 | 78 | Liability disclaimers |
| J | Event Management | 116 | 71 | 187 | 13 sub-services, conditional by type |

**TOTAL SERVICES:**
- **MANDATORY: 249 fields** (User-filled only)
- **OPTIONAL: 477 fields**
- **TOTAL SERVICES: 726 fields**

---

## 📊 FINAL COMPLETE SUMMARY: GOODS + SERVICES

### GOODS (Annexures A-L)
- **MANDATORY: 232 fields**
- **OPTIONAL: 130 fields**
- **TOTAL GOODS: 362 fields**

### SERVICES (Annexures A-J)
- **MANDATORY: 249 fields** (User-filled only)
- **OPTIONAL: 477 fields**
- **TOTAL SERVICES: 726 fields**

### COMBINED TOTAL
- **MANDATORY: 481 fields**
- **OPTIONAL: 607 fields**
- **GRAND TOTAL: 1,088 fields**

**Breakdown:**
- **Goods Common Fields:** 15 mandatory + 0 optional = 15
- **Goods Category-Specific:** 217 mandatory + 130 optional = 347
- **Services Common Fields:** 4 mandatory + 0 optional = 4
- **Services Sub-Service-Specific:** 245 mandatory + 477 optional = 722
- **Total:** 481 mandatory + 607 optional = **1,088 fields**

---

## ✅ SUMMARY OF CHANGES

### GOODS:
1. ✅ **Common**: Added `buyer_evidence_recording` (yes/no) + `what_to_record` (conditional multi-select)
2. ✅ **Appliances & Electronics**: Completely restructured with appliance-type selection
   - Conditional fields based on appliance type (TV, AC, Fridge, WM, etc.)
   - All evidence requirements grouped
3. ✅ **Instagram/WhatsApp Sellers**: Deduplicated 8 common fields
4. ✅ **All categories**: Updated common field count from 11 to 15

### SERVICES:
1. ✅ **All 10 Annexures Complete (A-J)**: Software, Design, Content, Photography, Coaching, Repair, Cleaning, Marketing, Consulting, **Event Management**
2. ✅ **Photography**: Photo/Video sections conditional on `shoot_type` selection
3. ✅ **Digital Marketing**: Sections 4.1-4.6 conditional on content_types multi-select
4. ✅ **Event Management**: 13 distinct sub-services with conditional visibility by `service_type` selection
   - All sub-service fields appear only when that service type is selected
   - 116 mandatory fields + 71 optional fields = 187 total Event Management fields
5. ✅ **All conditional visibility** clearly marked with brackets

---

## 🎯 KEY STRUCTURE FOR DEVELOPERS

**Conditional Logic Pattern:**
- `[IF condition = value]` → Show these fields
- `[CONDITIONAL BY field_name]` → Show specific group based on selection
- `[APPEARS IF "option" selected]` → Section visibility based on multi-select

**Common Recording Evidence:**
Users can select from:
- Unboxing video
- Power ON test
- Functionality test
- Physical condition inspection
- Serial/model number verification
- Sound/display test
- All accessories check
- Other (specify)
```
