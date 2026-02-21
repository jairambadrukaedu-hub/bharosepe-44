# 📋 FORM FIELDS - COMMON + CATEGORY SPECIFIC

## 🔷 COMMON FIELDS (All Categories)

These fields appear in EVERY category form:

```
1. product_name (text) - Item name/title
2. brand (text) - Brand name
3. color (text) - Color/finish
4. condition_category (select) - Overall condition status
5. scratches_present (text/select) - Scratches disclosure
6. dents_present (text/select) - Dents disclosure
7. sale_price (number) - Sale price in ₹
8. delivery_method (select) - courier/pickup/in-person
9. delivery_address (textarea) - Where to deliver
10. delivery_days (number) - Days to delivery
11. warranty_status (select) - Warranty present/expired/none
12. warranty_valid_till (date) - Warranty expiry date
```

**Count: 12 fields for all**

---

## 🔹 ANNEXURE A: ELECTRONICS (Specific Fields)

**Section 1: Item Specifications**
- model_number (text)
- storage (number) - GB
- ram (number) - GB
- display_size (number) - inches
- processor (text)
- battery_capacity (number) - mAh
- manufactured_year (number)

**Section 2: Condition Disclosure**
- screen_issues (text)
- battery_health_percent (number) - %
- speaker_mic_issues (text)
- charging_issues (text)

**Section 3: Functionality**
- power_on_working (select) - yes/no
- charging_working (select) - yes/no
- screen_ok (select)
- touch_ok (select)
- buttons_ok (select)
- speakers_ok (select)
- camera_working (select)
- wifi_bt_working (select)
- ports_ok (select)

**Section 4: Accessories**
- original_box_included (select)
- original_charger_included (select)
- cables_included (select)
- earphones_included (select)
- case_included (select)
- manual_included (select)
- other_accessories (text)

**Electronics Total: 12 + 22 = 34 fields**

---

## 🔹 ANNEXURE B: MOBILE PHONES & LAPTOPS (Specific Fields)

**Section 1: Device Identification**
- device_type (select) - phone/laptop/tablet
- model_name (text)
- variant_ram_storage (text)
- serial_number (text)
- imei1 (text) - CRITICAL
- imei2 (text)
- processor (text)
- ram (number) - GB
- storage_details (text)
- graphics_card (text)
- battery_capacity (number)
- manufactured_year (number)
- purchase_date (date)

**Section 2: Security & Lock Status (CRITICAL)**
- icloud_lock_status (select) - OFF/ON/UNKNOWN
- google_frp_lock (select)
- mi_account_lock (select)
- can_device_be_reset (select) - yes/no
- bios_lock (select)
- os_activation_status (select)

**Section 3: Condition Assessment**
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
- ram_ssd_upgraded (select) - yes/no

**Section 4: Battery Health**
- battery_health_percentage (number) - %
- battery_health_iphone (number) - % (iPhone specific)
- backup_duration_hours (number)
- fast_charging_support (select)
- laptop_battery_backup (number)
- battery_cycle_count (number)

**Section 5: Functional Tests**
- turns_on (select)
- charges (select)
- touchscreen (select)
- buttons (select)
- wifi_bluetooth (select)
- fingerprint_faceid (select)
- speaker_mic_functional (select)
- front_back_camera (select)
- sim_detection (select)

**Mobile Total: 12 + 50 = 62 fields**

---

## 🔹 ANNEXURE C: FURNITURE (Specific Fields)

**Section 1: Furniture Specifications**
- furniture_type (select) - sofa/bed/table/chair/cabinet
- material_type (select)
- style (text)
- length_cm (number)
- breadth_cm (number)
- height_cm (number)
- weight_kg (number)

**Section 2: Condition Disclosure**
- stains_present (text)
- broken_parts (text)
- missing_parts (text)
- odor_declaration (text)
- stability_test_video (file)

**Section 3: Structural Integrity**
- frame_condition (text)
- cushion_condition (text)
- springs_intact (select) - yes/no
- joints_tight (select)
- legs_intact (select)

**Section 4: Functionality**
- drawers_doors_working (select)
- locks_working (select)
- hinges_working (select)
- armrests_intact (select)

**Section 5: Assembly Status**
- pre_assembled (select)
- partial_assembly (select)
- full_assembly_required (select)

**Section 6: Delivery & Installation**
- packaging_quality (text)
- installation_included (select)
- assembly_video_provided (select)

**Furniture Total: 12 + 36 = 48 fields**

---

## 🔹 ANNEXURE D: VEHICLES (Specific Fields)

**Section 1: Vehicle Identification**
- make (text)
- model_number (text)
- manufactured_year (number)
- registration_number (text) - CRITICAL
- chassis_number (text)
- engine_number (text)
- vin (text)
- transmission (select)
- fuel_type (select)

**Section 2: Odometer & Usage**
- odometer_reading (number) - km
- service_history (text)
- accident_history (text)
- ownership_history (text)

**Section 3: Documentation**
- rc_valid (select) - yes/no
- rc_status (text)
- insurance_status (select)
- insurance_valid_till (date)
- puc_valid (select)
- puc_valid_till (date)
- registration_owner (text)

**Section 4: Vehicle Condition**
- body_condition (text)
- paint_chips (text)
- rust_present (select)
- glass_intact (select)
- lights_working (select)
- tire_condition (text)
- tire_tread_mm (number)

**Section 5: Engine & Mechanical**
- engine_condition (text)
- engine_sound_video (file)
- transmission_working (select)
- brakes_condition (text)
- steering_responsive (select)
- ac_heater_working (select)
- music_system_working (select)
- sunroof_windows_working (select)

**Section 6: Inspection & Videos**
- engine_start_video (file)
- cold_start_video (file)
- driving_test_video (file)
- chassis_video (file)
- undercarriage_condition (text)

**Section 7: Service Records**
- last_service_date (date)
- service_center (text)
- next_service_due (date)
- major_repairs_done (text)

**Section 8: Registration Details**
- registration_owner_name (text)
- registration_address (textarea)
- registration_valid_till (date)
- noc_status (select)

**Vehicles Total: 12 + 56 = 68 fields**

---

## 🔹 ANNEXURE E: FASHION & APPAREL (Specific Fields)

**Section 1: Apparel Specifications**
- item_type (select) - shirt/pant/dress/jacket
- category (text)
- size (text) - XS/S/M/L/XL
- material_composition (text)
- design_pattern (text)
- fit_type (select)
- sleeve_length (text)
- product_code (text)

**Section 2: Condition Disclosure**
- wear_level (select) - never/rarely/lightly/moderately/heavily
- stains_marks (text)
- odor_present (select)
- pilling_present (select)
- fading_present (select)
- loose_buttons (select)
- seam_issues (text)
- zipper_status (text)
- hemming_done (select)
- alterations_made (text)

**Section 3: Care & Washing**
- wash_status (select) - never/once/multiple
- washing_instructions (text)
- dry_clean_only (select)
- special_care_required (text)
- detergent_type (text)

**Section 4: Authenticity**
- authenticity_status (select) - original/duplicate
- tags_present (select)
- brand_tags_present (select)
- care_label_present (select)
- serial_number (text)
- auth_certificate_provided (select)

**Section 5: Size & Fit**
- declared_size (text)
- actual_size (text)
- length_inches (number)
- chest_bust_inches (number)
- waist_inches (number)
- sleeves_inches (number)
- fit_note (text)

**Section 6: Damage & Defects**
- manufacturing_defects (text)
- rips_tears (text)
- holes_present (select)
- color_run (select)
- thread_issues (text)

**Section 7: Photos**
- front_view_photo (file)
- back_view_photo (file)
- detail_photos (file)
- tags_labels_photo (file)
- packaging_photo (file)

**Section 8: Purchase History**
- purchase_date (date)
- original_price (number)
- invoice_available (select)

**Fashion Total: 12 + 57 = 69 fields**

---

## 🔹 ANNEXURE F: JEWELLERY (Specific Fields)

**Section 1: Jewellery Identification**
- item_type (select) - ring/necklace/bracelet/earring
- metal_type (select) - gold/silver/platinum
- metal_purity (text) - 22K/18K/14K
- hallmark_status (select) - yes/no
- hallmark (text)
- assay_certificate_number (text)

**Section 2: Weight & Dimensions**
- gross_weight_gm (number)
- net_weight_gm (number)
- weight_proof_video (file)
- length_mm (number)
- breadth_mm (number)
- height_mm (number)

**Section 3: Stones & Gems**
- stone_type (text)
- stone_count (number)
- total_carat (number)
- gem_certificate (select)
- certification_lab (text)
- color_grade (text)
- clarity_grade (text)

**Section 4: Condition**
- loose_stones (select)
- broken_settings (select)
- polish_condition (text)

**Section 5: Authenticity**
- coa_provided (select)
- lab_report_provided (select)
- video_360_provided (select)
- maker_mark (select)
- maker_location (text)

**Section 6: Valuation**
- declared_value (number) - ₹
- market_value_estimate (number) - ₹
- insurance_included (select)

**Section 7: Warranty**
- warranty_period (text)
- warranty_coverage (text)
- certification_valid_till (date)

**Jewellery Total: 12 + 41 = 53 fields**

---

## 🔹 ANNEXURE G: BUILDING MATERIALS & FIXTURES (Specific Fields)

**Section 1: Material Specifications**
- material_type (select) - door/window/tile/wood
- model_number (text)
- grade_quality (select) - premium/standard/economy
- energy_rating (text)
- power_consumption_watts (number)
- voltage (number)
- frequency (number)

**Section 2: Condition**
- discoloration (select)
- rust_present (select)
- glass_intact (select)
- doors_lids_working (select)

**Section 3: Functional Tests**
- power_on_working (select)
- all_functions_working (select)
- heating_cooling_working (select)
- timer_working (select)
- display_working (select)
- noise_level (text)
- function_test_video (file)

**Section 4: Accessories & Parts**
- original_accessories_list (text)
- missing_parts (text)
- extra_parts (text)

**Section 5: Installation**
- installation_required (select)
- installation_type (text)
- installation_warranty (select)
- technical_support_included (select)

**Section 6: Service**
- service_record (text)
- last_service_date (date)
- next_service_due (date)

**Section 7: Warranty**
- extended_warranty (select)

**Building Materials Total: 12 + 38 = 50 fields**

---

## 🔹 ANNEXURE H: COLLECTIBLES & LUXURY GOODS (Specific Fields)

**Section 1: Item Identification**
- item_name (text)
- collectible_category (select)
- rarity_level (select) - common/rare/very_rare/unique
- serial_number (text)
- edition_number (text)
- limited_edition (select)
- production_year (number)

**Section 2: Authenticity & Provenance**
- coa_provided (select)
- coa_number (text)
- issuing_authority (text)
- chain_of_custody (text)
- previous_owners_list (textarea)

**Section 3: Condition & Preservation**
- damage_description (textarea)
- restoration_done (select)
- conservation_status (text)
- environmental_factors (text)

**Section 4: Documentation**
- original_invoice (file)
- purchase_date (date)
- purchase_price (number)
- appraisal_report (file)
- insurance_valuation (number)

**Section 5: Inspection**
- video_360_provided (select)
- closeup_photos_provided (select)
- expert_inspection_done (select)
- inspector_name (text)

**Section 6: Specifications**
- dimensions_specified (text)
- weight_specified (number)
- material_type (text)

**Section 7: Valuation**
- estimated_value (number) - ₹
- market_value_range (text)
- insurance_value (number)

**Section 8: Storage**
- storage_requirements (text)
- temperature_range (text)
- humidity_range (text)
- special_care_instructions (text)

**Collectibles Total: 12 + 47 = 59 fields**

---

## 🔹 ANNEXURE I: INDUSTRIAL MACHINERY (Specific Fields)

**Section 1: Machinery Specifications**
- equipment_type (select)
- model_number (text)
- serial_number (text)
- manufactured_year (number)
- voltage (number)
- phase (text)
- frequency (number)
- power_hp (number)
- power_kw (number)
- amperage (number)

**Section 2: Physical Specs**
- dimensions_specified (text)
- length_mm (number)
- breadth_mm (number)
- height_mm (number)
- weight_kg (number)

**Section 3: Condition**
- paint_condition (text)
- rust_present (select)
- moving_parts_condition (text)
- bearings_condition (text)

**Section 4: Operational Tests**
- power_test_video (file)
- cold_start_video (file)
- run_test_video (file)
- load_test_video (file)
- noise_level_db (number)
- vibration_level (text)

**Section 5: Maintenance**
- repair_history (text)
- major_repairs_done (text)
- last_service_date (date)
- service_manual_provided (select)
- spare_parts_available (select)

**Section 6: Safety**
- emergency_stop_working (select)
- safety_guards_intact (select)
- pressure_relief_working (select)
- interlocks_functional (select)

**Section 7: Compliance**
- iso_certified (select)
- ce_mark_present (select)
- factory_certified (select)
- testing_certs_provided (select)

**Section 8: Delivery**
- installation_support (select)
- commissioning_support (select)
- training_provided (select)

**Section 9: Warranty**
- warranty_period (text)
- warranty_coverage (text)
- technical_support_included (select)

**Industrial Total: 12 + 61 = 73 fields**

---

## 🔹 ANNEXURE J: BOOKS & EDUCATIONAL MATERIAL (Specific Fields)

**Section 1: Publication**
- title (text)
- author (text)
- publisher (text)
- edition (text)
- isbn (text)
- publication_year (number)
- language (select)

**Section 2: Physical Specs**
- format (select) - hardcover/paperback/ebook
- page_count (number)
- binding_type (text)
- dimensions_specified (text)
- weight_gm (number)

**Section 3: Condition**
- cover_condition (text)
- pages_condition (text)
- binding_condition (text)
- spine_condition (text)
- markings_present (select)
- annotations_description (text)

**Section 4: Damage**
- water_damage_status (select)
- torn_pages_count (number)
- missing_pages_count (number)
- stains_present (select)
- discoloration_present (select)
- odor_declaration (text)

**Section 5: Prior Use**
- owner_markings_disclosure (text)
- highlighting_extent (text)
- underlines_extent (text)
- marginalia_description (text)
- stamps_present (select)

**Section 6: Content**
- all_pages_present (select)
- plates_intact (select)
- maps_intact (select)
- index_intact (select)
- dust_jacket_included (select)

**Section 7: Edition**
- first_edition (select)
- is_collectible (select)
- is_limited_edition (select)
- signed_copy (select)

**Books Total: 12 + 51 = 63 fields**

---

## 🔹 ANNEXURE K: ART & HANDMADE ITEMS (Specific Fields)

**Section 1: Identification**
- artwork_name (text)
- artist_name (text)
- art_type (select) - painting/sculpture/handmade/digital
- medium (text)
- style (text)
- creation_year (number)
- dimensions_specified (text)
- weight_specified (number)

**Section 2: Authenticity**
- certificate_of_authenticity (select)
- coa_number (text)
- artist_signature (select)
- signature_location (text)
- artist_verified (select)

**Section 3: Condition**
- damage_description (textarea)
- restoration_history (text)
- conservation_status (text)

**Section 4: Documentation**
- artist_bio (textarea)
- creation_story (textarea)
- previous_exhibitions (text)
- awards_recognition (text)
- insurance_valuation (number)

**Section 5: Specifications**
- materials_used (text)
- color_palette (text)

**Section 6: Storage**
- storage_requirements (text)
- temperature_range (text)
- humidity_range (text)
- special_care_instructions (text)

**Section 7: Verification**
- photos_provided (select)
- video_provided (select)
- expert_verification_done (select)

**Art Total: 12 + 42 = 54 fields**

---

## 📊 SUMMARY TABLE

| Annexure | Category | Specific Fields | Total | Complexity |
|----------|----------|-----------------|-------|------------|
| A | Electronics | 22 | 34 | Medium |
| B | Mobile/Laptop | 50 | 62 | **HIGH** |
| C | Furniture | 36 | 48 | Medium |
| D | Vehicles | 56 | 68 | **HIGHEST** |
| E | Fashion | 57 | 69 | **HIGHEST** |
| F | Jewellery | 41 | 53 | Medium-High |
| G | Building Materials | 38 | 50 | Medium |
| H | Collectibles | 47 | 59 | Medium-High |
| I | Industrial | 61 | 73 | **HIGHEST** |
| J | Books | 51 | 63 | Medium-High |
| K | Art | 42 | 54 | Medium-High |

**TOTAL: 12 common + ~501 specific = ~513 total fields**

---

## 🎯 Recommendation for Implementation

**Phase 1 (Critical - Most Needed):**
1. Vehicles (D) - 68 fields
2. Fashion (E) - 69 fields
3. Mobile (B) - 62 fields

**Phase 2 (High Priority):**
4. Industrial (I) - 73 fields
5. Books (J) - 63 fields
6. Collectibles (H) - 59 fields

**Phase 3 (Medium Priority):**
7. Jewellery (F) - 53 fields
8. Art (K) - 54 fields
9. Building Materials (G) - 50 fields

**Phase 4 (Lower Priority):**
10. Furniture (C) - 48 fields
11. Electronics (A) - 34 fields





# 📋 SERVICE FORM FIELDS - COMMON + SERVICE-SPECIFIC

## 🔷 COMMON FIELDS (All Services)

These fields appear in EVERY service form across all 9 service annexures:

```
1. buyer_name (text) - Client/Service buyer name
2. buyer_email (email) - Email address
3. buyer_phone (text) - Phone number with country code
4. buyer_address (textarea) - Address for service location or billing
5. seller_name (text) - Service provider name
6. seller_email (email) - Email address
7. seller_phone (text) - Phone number
8. seller_business_type (select) - Freelancer/Agency/Registered Business
9. service_price (number) - Total service cost in ₹
10. payment_method (select) - Online/Cash/Check/Bank Transfer
11. payment_schedule (select) - Full upfront/Partial upfront/On delivery/Milestone-based
12. delivery_timeline (number) - Days to delivery/completion
13. delivery_date (date) - Agreed completion date
14. currency (select) - INR (default)
15. dispute_medium (select) - Bharose Pe / Court / Arbitration
16. dispute_resolution_days (number) - Days allowed for resolution (default: 30)
```

**Count: 16 fields for all services**

---

# 🔹 SERVICE ANNEXURE A: SOFTWARE / APP / WEBSITE DEVELOPMENT

**Specific Fields:** 56 fields | **Total with Common:** 72 fields | **Complexity:** HIGH

## SECTION 1: PROJECT IDENTITY & CONTEXT (8 fields)

- `project_title` (text) - Project name/title
- `project_type` (select) - Website/Mobile App/SaaS/Backend API/Custom Tool (10+ options)
- `project_type_other` (text) - Custom project type if selected
- `business_use_case` (textarea) - What will this be used for
- `criticality_level` (select) - Experimental/Internal/Customer-facing/Mission-Critical
- `project_description` (textarea) - Detailed project overview
- `team_size_allocation` (number) - Team members assigned
- `project_methodology` (select) - Agile/Waterfall/Hybrid

## SECTION 2: DETAILED SCOPE OF WORK (22 fields)

### Features & Functionality (8 fields)
- `features[]` (array) - Repeatable: up to 50 features
  - `feature_name` (text)
  - `feature_description` (textarea)
  - `feature_user_type` (multi-select) - End user/Admin/Vendor/Guest
  - `feature_priority` (select) - Must-have/Should-have/Nice-to-have
  - `feature_acceptance_criteria` (textarea)
  
### User Roles & Permissions (4 fields)
- `user_roles[]` (array) - Repeatable: up to 20 roles
  - `role_name` (text)
  - `role_description` (textarea)
  - `role_permissions` (multi-select)
  
### NFRs (Non-Functional Requirements) (6 fields)
- `page_load_time_desktop` (text) - e.g., "< 3 seconds"
- `page_load_time_mobile` (text) - e.g., "< 5 seconds"
- `api_response_time` (text) - e.g., "< 500ms"
- `concurrent_users_expected` (number)
- `supported_devices` (multi-select)
- `supported_browsers` (multi-select with versions)

### Integrations (4 fields)
- `integrations[]` (array) - Repeatable: up to 20 integrations
  - `integration_name` (select)
  - `integration_credentials_provider` (select) - User provides/Developer creates
  - `integration_behaviour` (select) - Read-only/Write/Read-Write/Bidirectional

## SECTION 3: TECHNOLOGY STACK (6 fields)

- `frontend_technology` (multi-select) - React/Vue/Angular/etc
- `backend_technology` (multi-select) - Node.js/Python/Java/etc
- `database_type` (select) - SQL/NoSQL/Both/Other
- `hosting_platform` (select) - AWS/GCP/Azure/Heroku/Other
- `third_party_services` (multi-select) - Cloud storage/Analytics/etc
- `open_source_preference` (select) - Preference for open source libraries

## SECTION 4: DESIGN & UI/UX (8 fields)

- `design_preference` (select) - Custom design/Template-based/User provides
- `design_reference_links` (repeatable urls) - Up to 5 inspiration links
- `color_palette` (repeatable) - Primary/Secondary/Accent colors
- `responsive_breakpoints` (multi-select) - Mobile/Tablet/Desktop/TV
- `accessibility_requirements` (multi-select) - WCAG/Screen readers/etc
- `branding_guidelines_provided` (yes/no)
- `brand_assets_provided` (yes/no)
- `ui_framework_preference` (text) - Bootstrap/Material/Tailwind/Other

## SECTION 5: DEPLOYMENT & HOSTING (4 fields)

- `deployment_environment` (select) - Cloud/On-premise/Both
- `deployment_regions` (multi-select) - India/Global/Specific countries
- `ssl_https_required` (yes/no)
- `backup_recovery_plan` (yes/no)

## SECTION 6: TESTING & QA (4 fields)

- `testing_scope` (select) - Unit/Integration/E2E/Performance/Security/All
- `browser_testing_required` (yes/no)
- `device_testing_required` (yes/no)
- `load_testing_threshold` (number) - Concurrent users to test

## SECTION 7: DOCUMENTATION (2 fields)

- `documentation_required` (yes/no)
- `api_documentation_required` (yes/no)

## SECTION 8: SUPPORT & MAINTENANCE (2 fields)

- `post_launch_support_months` (number)
- `bug_fix_sla_response_hours` (number)

## SECTION 9: DELIVERABLES & TIMELINE (3 fields)

- `deliverable_format` (multi-select) - Source code/Executables/Documentation
- `code_repository_access` (yes/no)
- `milestone_based_delivery` (yes/no)

## SECTION 10: LIABILITY & LEGAL (3 fields)

- `liability_cap_type` (select) - Percentage/Fixed amount/Unlimited
- `liability_cap_value` (number)
- `ip_ownership` (select) - Entirely to client/Shared/Components remain provider's

---

# 🔹 SERVICE ANNEXURE B: UI/UX DESIGN & GRAPHIC DESIGN

**Specific Fields:** 42 fields | **Total with Common:** 58 fields | **Complexity:** MEDIUM-HIGH

## SECTION 1: PROJECT IDENTITY (6 fields)

- `project_title` (text)
- `design_type` (select) - Logo/Branding/UI/UX/Social Media/Posters/Packaging (13 options)
- `design_type_custom` (text) - If custom selected
- `business_use_case` (textarea)
- `industry_domain` (select) - Fashion/Tech/Finance/Healthcare/Food/etc (13 options)
- `industry_domain_custom` (text) - If custom

## SECTION 2: DETAILED SCOPE OF WORK (15 fields)

### Deliverable Count (6 fields)
- `screen_count` (number) - For UI/UX designs
- `logo_concept_count` (number) - Number of logo concepts
- `banner_variation_count` (number) - Number of banner variations
- `social_post_count` (number) - Number of social media posts
- `packaging_mockup_count` (number) - Number of packaging designs
- `illustration_count` (number) - Number of illustrations
- `ux_flow_count` (number) - Number of UX flows/journeys

### Design Style Preferences (6 fields)
- `design_style` (select) - Minimal/Modern/Corporate/Playful/Luxury/Retro (8 options)
- `design_style_description` (textarea)
- `reference_links` (repeatable urls) - Up to 5 inspiration links
- `competitor_analysis_links` (repeatable urls) - Up to 5 competitor links
- `inspiration_board_attached` (yes/no)
- `style_guidelines_provided` (yes/no)

### Color Palette (3 fields)
- `color_palette_option` (select) - Designer proposes/Fixed colors/Preferences given
- `brand_color_codes` (repeatable) - Up to 5 colors with hex/rgb
- `color_preference_description` (textarea)

## SECTION 3: TYPOGRAPHY & FONTS (4 fields)

- `font_selection_preference` (select) - Designer chooses/Client specifies/Predefined brands
- `font_licenses_required` (yes/no)
- `font_fallback_support` (yes/no)
- `typography_guidelines` (textarea)

## SECTION 4: BRAND GUIDELINES (4 fields)

- `brand_guidelines_provided` (yes/no)
- `brand_logo_files` (file upload) - Existing logo files
- `brand_colors_provided` (yes/no)
- `brand_voice_document_provided` (yes/no)

## SECTION 5: REVISIONS & ITERATIONS (3 fields)

- `revision_rounds_included` (number) - Number of free revisions
- `revision_scope` (select) - Major/Minor/Unlimited
- `revision_timeline_days` (number)

## SECTION 6: DELIVERABLE FORMAT (4 fields)

- `file_formats_required` (multi-select) - PSD/Figma/XD/PDF/PNG/SVG/etc
- `source_files_included` (yes/no)
- `web_optimized_files` (yes/no)
- `print_optimized_files` (yes/no)

## SECTION 7: USAGE RIGHTS & LICENSE (3 fields)

- `exclusive_rights` (yes/no) - Client gets exclusive use
- `portfolio_usage_allowed` (yes/no) - Designer can showcase in portfolio
- `credit_attribution_required` (yes/no)

---

# 🔹 SERVICE ANNEXURE C: CONTENT WRITING / COPYWRITING

**Specific Fields:** 48 fields | **Total with Common:** 64 fields | **Complexity:** MEDIUM-HIGH

## SECTION 1: PROJECT DEFINITION (5 fields)

- `project_title` (text)
- `content_type` (select) - Blog/Social/Product Descriptions/Ad Copy/Scripts/Email (15 options)
- `content_type_custom` (text)
- `industry_domain` (select) - Tech/Finance/Health/Education/Real Estate/etc (14 options)
- `industry_domain_custom` (text)

## SECTION 2: WORD COUNT & LENGTH (5 fields)

- `content_length_type` (select) - Long-form/Medium-form/Short-form/Variable
- `minimum_word_count` (number) - e.g., 1500
- `maximum_word_deviation_percent` (number) - ±% tolerance
- `short_form_specs` (textarea) - Specific for social posts/short content
- `reading_time_target` (number) - Estimated minutes to read

## SECTION 3: DELIVERABLE COUNTS (7 fields)

- `blog_article_count` (number)
- `social_caption_count` (number)
- `product_description_count` (number)
- `ad_copy_count` (number)
- `video_script_count` (number)
- `email_sequence_count` (number)
- `page_count` (number)

## SECTION 4: TONE & VOICE (5 fields)

- `tone_of_voice` (select) - Professional/Friendly/Informal/Sales/Technical/Humorous/Luxury/etc (10 options)
- `tone_of_voice_custom_description` (textarea)
- `voice_consistency_required` (yes/no)
- `brand_voice_guide_provided` (yes/no)
- `personality_brand_traits` (textarea) - Brand personality keywords

## SECTION 5: TARGET AUDIENCE (5 fields)

- `target_demographic` (textarea) - Age, gender, location, income, education
- `audience_persona_description` (textarea)
- `content_purpose` (select) - Educate/Entertain/Sell/Build trust/etc
- `primary_language` (select) - English/Hindi/Hinglish/etc
- `language_proficiency_level` (select) - Native/Fluent/Professional

## SECTION 6: SEO & KEYWORDS (5 fields)

- `seo_optimization_required` (yes/no)
- `primary_keywords` (repeatable text) - Up to 10 keywords
- `keyword_density_target` (number) - 1-2%
- `meta_description_included` (yes/no)
- `internal_linking_required` (yes/no)

## SECTION 7: RESEARCH REQUIREMENTS (4 fields)

- `research_included` (yes/no)
- `fact_checking_required` (yes/no)
- `source_citations_required` (yes/no)
- `expert_interviews_included` (yes/no)

## SECTION 8: FORMATTING & STRUCTURE (4 fields)

- `heading_hierarchy_required` (yes/no)
- `bullet_points_allowed` (yes/no)
- `tables_infographics_included` (yes/no)
- `call_to_action_required` (yes/no)

## SECTION 9: REVISIONS (3 fields)

- `revision_rounds_included` (number)
- `revision_scope` (select) - Content/Grammar/Style/Complete rewrite
- `revision_turnaround_days` (number)

## SECTION 10: DELIVERABLES (3 fields)

- `file_format_required` (select) - Google Docs/Word/Markdown/PDF/HTML
- `plagiarism_check_included` (yes/no)
- `plagiarism_threshold_percent` (number) - Max acceptable similarity

---

# 🔹 SERVICE ANNEXURE D: PHOTOGRAPHY & VIDEOGRAPHY

**Specific Fields:** 52 fields | **Total with Common:** 68 fields | **Complexity:** HIGH

## SECTION 1: SHOOT TYPE & DEFINITION (4 fields)

- `shoot_type` (select) - Wedding/Event/Product/Real Estate/Food/Corporate/Drone (15 options)
- `shoot_type_custom` (text)
- `project_title` (text)
- `shoot_date` (date)

## SECTION 2: COVERAGE & LOGISTICS (8 fields)

- `shoot_locations` (repeatable text) - Up to 5 locations
- `coverage_hours_total` (number) - Hours of coverage
- `coverage_start_time` (time)
- `coverage_end_time` (time)
- `coverage_break_policy` (textarea)
- `photographer_count` (select) - 1/2/3/4+ photographers
- `videographer_count` (select)
- `backup_coverage_required` (yes/no)

## SECTION 3: SHOT TYPES (3 fields)

- `shot_types_required` (multi-select) - Candid/Traditional/Drone/Stage/Portraits/etc
- `shot_priority_order` (textarea) - Priority order of shots
- `specialized_shots_required` (textarea) - Specific shots needed

## SECTION 4: PHOTO DELIVERABLES (8 fields)

- `edited_photos_count` (number) - e.g., 300
- `photo_count_deviation_percent` (number) - ±% tolerance
- `raw_photos_delivery` (yes/no)
- `raw_photos_approximate_count` (number)
- `raw_files_format` (select) - RAW/NEF/CR2/DNG
- `raw_retention_period` (select) - 30/60/90 days/permanent
- `photo_resolution` (select) - Full/High/Social Media/Mixed
- `file_format_photos` (multi-select) - JPG/PNG/Both/RAW+JPG

## SECTION 5: PHOTO EDITING (3 fields)

- `editing_scope_photos` (select) - Color correction/Professional/Advanced/Minimal
- `skin_retouching_level` (select) - None/Light/Moderate/Heavy
- `color_grading_style` (select) - Natural/Warm/Cool/Vintage/Custom

## SECTION 6: VIDEO DELIVERABLES (8 fields)

- `video_included` (yes/no)
- `cinematic_video_required` (yes/no)
- `cinematic_video_length` (number) - Minutes
- `raw_video_delivery` (yes/no)
- `video_resolution` (select) - 1080p/4K/8K/Mixed
- `frame_rate` (select) - 24/30/60 fps
- `editing_level_video` (select) - Basic/Professional/Cinematic
- `color_grading_video` (yes/no)

## SECTION 7: ALBUMS & GALLERIES (3 fields)

- `physical_album_delivery` (yes/no)
- `album_count` (number)
- `album_quality_grade` (select) - Standard/Premium/Luxury

## SECTION 8: ONLINE GALLERY (3 fields)

- `online_gallery_provided` (yes/no)
- `password_protected_gallery` (yes/no)
- `gallery_expiry_days` (number)

## SECTION 9: COPYRIGHTS & USAGE RIGHTS (4 fields)

- `copyright_ownership` (select) - Photographer/Client/Shared
- `commercial_usage_allowed` (yes/no)
- `social_media_usage_allowed` (yes/no)
- `print_usage_allowed` (yes/no)

---

# 🔹 SERVICE ANNEXURE E: TUITION / COACHING / ONLINE LEARNING

**Specific Fields:** 58 fields | **Total with Common:** 74 fields | **Complexity:** MEDIUM-HIGH

## SECTION 1: COACHING TYPE & DEFINITION (6 fields)

- `coaching_type` (select) - School tuition/Competitive exam prep/Skill development/Language learning/Music/Art (15+ options)
- `coaching_type_custom` (text)
- `student_name` (text)
- `student_grade_level` (select) - Class 1-12/College/Professional/Other
- `subject_or_skill` (text) - e.g., "Mathematics", "Guitar", "Spoken English"
- `learning_goals` (textarea)

## SECTION 2: TEACHING FORMAT (4 fields)

- `learning_format` (select) - Online/Offline/Hybrid
- `session_mode` (select) - One-on-one/Small group/Batch
- `group_size_max` (number) - If group classes
- `batch_size_current` (number)

## SECTION 3: CURRICULUM & SYLLABUS (8 fields)

- `curriculum_provided` (yes/no)
- `curriculum_document` (file upload)
- `syllabus_provided` (yes/no)
- `total_modules` (number)
- `modules_list` (repeatable text) - Up to 20 modules
- `customization_allowed` (yes/no)
- `learning_outcomes_documented` (yes/no)
- `learning_outcomes_list` (textarea)

## SECTION 4: SCHEDULE & SESSIONS (6 fields)

- `session_frequency` (select) - Daily/3x week/2x week/Weekly/Other
- `session_duration_minutes` (number) - Minutes per session
- `total_sessions_planned` (number)
- `class_timing_preference` (textarea) - e.g., "6-7 PM IST"
- `flexible_rescheduling` (yes/no)
- `cancellation_policy` (textarea)

## SECTION 5: LEARNING MATERIALS (5 fields)

- `study_materials_provided` (yes/no)
- `material_format` (multi-select) - PDF/Video/Slides/Worksheets/Books/etc
- `supplementary_resources_provided` (yes/no)
- `material_cost_included` (yes/no)
- `access_to_materials_duration` (text) - e.g., "Lifetime"

## SECTION 6: ASSESSMENT & EVALUATION (6 fields)

- `assessment_method` (multi-select) - Tests/Quizzes/Projects/Assignments/Presentations
- `assessment_frequency` (select) - Weekly/Bi-weekly/Monthly/Milestone-based
- `progress_tracking_included` (yes/no)
- `feedback_frequency` (select) - After each session/Weekly/Monthly
- `performance_reports_provided` (yes/no)
- `report_frequency` (select) - Weekly/Monthly/End of term

## SECTION 7: DOUBT SOLVING (4 fields)

- `doubt_session_policy` (textarea)
- `additional_doubt_sessions_included` (number)
- `additional_session_cost` (number)
- `response_time_for_queries_hours` (number)

## SECTION 8: MOCK TESTS & PRACTICE (4 fields)

- `mock_tests_included` (yes/no)
- `mock_test_count` (number)
- `mock_test_review_included` (yes/no)
- `practice_material_count` (number)

## SECTION 9: TEACHING TOOLS & TECHNOLOGY (4 fields)

- `platform_used` (select) - Zoom/Google Meet/Skype/Physical classroom/Hybrid
- `learning_management_system_used` (text)
- `screen_sharing_required` (yes/no)
- `recording_of_sessions_allowed` (yes/no)

## SECTION 10: PERFORMANCE GUARANTEE (4 fields)

- `performance_guarantee_offered` (yes/no)
- `guarantee_metric` (select) - Score improvement/Exam pass/Skill certification
- `guarantee_target_value` (number)
- `guarantee_conditions` (textarea)

---

# 🔹 SERVICE ANNEXURE F: HOME REPAIR & MAINTENANCE

**Specific Fields:** 62 fields | **Total with Common:** 78 fields | **Complexity:** HIGH

## SECTION 1: SERVICE TYPE & DEFINITION (4 fields)

- `service_type` (select) - Electrical/Plumbing/Carpentry/Painting/AC Service/Appliance Repair/etc (12 options)
- `service_type_custom` (text)
- `service_job_title` (text)
- `property_type` (select) - Residential/Apartment/Commercial/Shop/Industrial

## SECTION 2: LOCATION & ACCESS (6 fields)

- `service_location_address` (textarea)
- `floor_number` (text)
- `lift_available` (yes/no)
- `parking_available` (yes/no)
- `parking_alternative` (textarea)
- `security_clearance_required` (yes/no)
- `security_clearance_type` (text)

## SECTION 3: WORKING CONDITIONS (4 fields)

- `working_hours_restrictions` (textarea)
- `working_days_preference` (multi-select) - Weekdays/Weekends/Specific days
- `access_availability_hours` (text)
- `additional_access_conditions` (textarea)

## SECTION 4: PROBLEM DESCRIPTION (4 fields)

- `current_problem_description` (textarea)
- `problem_duration` (select) - < 1 week / 1-4 weeks / 1-3 months / 3+ months
- `previous_repair_attempts` (yes/no)
- `previous_repair_details` (textarea)

## SECTION 5: EMERGENCY STATUS (2 fields)

- `emergency_situation` (yes/no)
- `emergency_type` (multi-select) - Water leakage/Electrical/Gas leak/Structural damage

## SECTION 6: SCOPE OF WORK - TASKS (15 fields)

- `scope_of_work_tasks[]` (array) - Up to 20 tasks
  - `task_number` (auto)
  - `task_name` (text)
  - `task_detailed_description` (textarea)
  - `task_quantity` (text) - e.g., "3 ceiling fans"
  - `task_expected_outcome` (textarea)
  - `task_materials_required` (repeatable text)
  - `task_estimated_hours` (number)
  - `task_special_considerations` (textarea)

## SECTION 7: WORK EXCLUSIONS (2 fields)

- `work_exclusions` (textarea) - What's NOT included
- `scope_creep_handling` (select) - Additional work billable/Free up to X hours

## SECTION 8: MATERIALS & SUPPLIES (6 fields)

- `materials_provided_by` (select) - Service provider/Client/Shared
- `quality_grade_materials` (select) - Economy/Standard/Premium
- `material_cost_included` (yes/no)
- `warranty_on_materials` (yes/no)
- `material_warranty_duration` (text)
- `material_quotes_provided_upfront` (yes/no)

## SECTION 9: QUALITY STANDARDS (5 fields)

- `quality_standards_reference` (textarea)
- `workmanship_warranty_period` (number) - Days
- `defect_definition` (textarea)
- `rework_policy` (textarea)
- `quality_inspection_by` (select) - Service provider/Client/Both

## SECTION 10: TIMELINE & SCHEDULING (5 fields)

- `estimated_completion_date` (date)
- `estimated_total_hours` (number)
- `single_visit_or_multiple` (select) - Single day/Multiple visits
- `number_of_visits_estimated` (number)
- `visit_schedule_flexibility` (yes/no)

## SECTION 11: CLEANUP & POST-WORK (3 fields)

- `cleanup_included` (yes/no)
- `waste_disposal_included` (yes/no)
- `restoration_to_original_state` (yes/no)

---

# 🔹 SERVICE ANNEXURE G: CLEANING & HOUSEKEEPING

**Specific Fields:** 58 fields | **Total with Common:** 74 fields | **Complexity:** MEDIUM-HIGH

## SECTION 1: SERVICE TYPE & DEFINITION (5 fields)

- `service_type` (select) - Home cleaning/Office cleaning/Post-construction/Deep cleaning/etc (15+ options)
- `service_type_custom` (text)
- `property_type` (select) - Apartment/Villa/Office/Shop/Industrial
- `property_size_sqft` (number)
- `property_condition_before` (select) - Light soiled/Moderately soiled/Heavily soiled

## SECTION 2: PROPERTY DETAILS (6 fields)

- `bedroom_count` (number)
- `bathroom_count` (number)
- `kitchen_present` (yes/no)
- `living_area_present` (yes/no)
- `balcony_terrace_present` (yes/no)
- `outdoor_area_present` (yes/no)

## SECTION 3: ROOM-BY-ROOM COVERAGE MATRIX (12 fields)

- `bedroom_1_cleaning` (yes/no)
- `bedroom_2_cleaning` (yes/no)
- `bedroom_3_cleaning` (yes/no)
- `bathroom_1_cleaning` (yes/no)
- `bathroom_2_cleaning` (yes/no)
- `kitchen_cleaning` (yes/no)
- `living_room_cleaning` (yes/no)
- `dining_area_cleaning` (yes/no)
- `hallway_staircase_cleaning` (yes/no)
- `balcony_cleaning` (yes/no)
- `office_area_cleaning` (yes/no)
- `other_rooms_cleaning` (textarea)

## SECTION 4: SPECIALIZED CLEANING (8 fields)

- `carpet_cleaning` (yes/no)
- `carpet_cleaning_cost` (number)
- `window_cleaning` (yes/no)
- `window_cleaning_type` (select) - Interior/Exterior/Both
- `sofa_upholstery_cleaning` (yes/no)
- `pest_control_required` (yes/no)
- `pest_control_type` (select) - General/Cockroach/Mosquito/Rodent
- `pest_control_cost` (number)

## SECTION 5: PRODUCTS & CHEMICALS (6 fields)

- `eco_friendly_products_required` (yes/no)
- `chemical_sensitivity_disclosure` (yes/no)
- `allergy_information` (textarea)
- `pet_friendly_products` (yes/no)
- `pet_type_present` (multi-select) - Dogs/Cats/Birds/Others
- `pet_allergies` (textarea)

## SECTION 6: CLEANING SUPPLIES (4 fields)

- `cleaning_supplies_provided_by` (select) - Cleaning company/Client/Shared
- `supply_cost_included` (yes/no)
- `reusable_vs_disposable` (select)
- `prohibited_products` (textarea)

## SECTION 7: SCHEDULE & FREQUENCY (5 fields)

- `cleaning_frequency` (select) - One-time/Weekly/Bi-weekly/Monthly
- `preferred_day_time` (text) - e.g., "Monday 10 AM"
- `session_duration_hours` (number)
- `same_cleaner_preference` (yes/no)
- `advance_notice_requirement_days` (number)

## SECTION 8: PRE-CLEANING REQUIREMENTS (4 fields)

- `property_preparation_required` (yes/no)
- `decluttering_needed` (yes/no)
- `furniture_moving_included` (yes/no)
- `client_availability_required` (yes/no)

## SECTION 9: QUALITY STANDARDS (4 fields)

- `cleanliness_level_expectation` (select) - Good/Very good/Excellent/Spotless
- `inspection_checklist_provided` (yes/no)
- `photographic_proof_required` (yes/no)
- `quality_guarantee_period_days` (number)

## SECTION 10: SPECIAL CONDITIONS (4 fields)

- `child_care_concurrent_needed` (yes/no)
- `elderly_care_concurrent_needed` (yes/no)
- `work_from_home_considerations` (yes/no)
- `noise_level_restrictions` (textarea)

---

# 🔹 SERVICE ANNEXURE H: DIGITAL MARKETING

**Specific Fields:** 72+ fields | **Total with Common:** 88+ fields | **Complexity:** HIGHEST

## SECTION 1: SERVICE TYPE & DEFINITION (6 fields)

- `service_type` (select) - Social media/SEO/PPC/Content/Email/Influencer/Video/Full-stack (17+ options)
- `service_type_custom` (text)
- `business_type` (select) - B2C/B2B/D2C/E-commerce/SaaS/Local business/etc
- `campaign_name` (text)
- `campaign_goals` (textarea)
- `target_market_geography` (multi-select) - India/Global/Specific countries

## SECTION 2: BRAND INFORMATION (5 fields)

- `brand_name` (text)
- `brand_description` (textarea)
- `website_url` (url)
- `brand_voice_guidelines_provided` (yes/no)
- `competitor_analysis_provided` (yes/no)

## SECTION 3: STRATEGY & OBJECTIVES (6 fields)

- `marketing_strategy_documented` (yes/no)
- `strategy_duration_months` (number)
- `primary_objective` (select) - Brand awareness/Lead generation/Sales/Engagement/etc
- `secondary_objectives` (multi-select)
- `target_audience_detailed` (textarea)
- `aspirational_metrics_disclaimer` (yes/no) - Agrees that results not guaranteed

## SECTION 4: SOCIAL MEDIA (Conditional - 10 fields if selected)

- `social_media_included` (yes/no)
- `platforms_to_manage` (multi-select) - Instagram/Facebook/LinkedIn/Twitter/TikTok/YouTube/etc
- `instagram_included` (yes/no)
  - `instagram_post_frequency` (number) - Posts per week
  - `instagram_story_frequency` (number)
  - `instagram_engagement_target` (number) - Followers/Likes/Comments target
- `facebook_included` (yes/no)
  - `facebook_post_frequency` (number)
  - `facebook_engagement_type` (select)
- `linkedin_included` (yes/no)
  - `linkedin_content_type` (multi-select)
- `tiktok_included` (yes/no)
  - `tiktok_video_count_monthly` (number)
- `youtube_included` (yes/no)
  - `youtube_video_frequency` (number)
  - `youtube_video_length_minutes` (text)

## SECTION 5: CONTENT CREATION (10 fields)

- `content_creation_included` (yes/no)
- `content_types` (multi-select) - Blog posts/Graphics/Videos/Carousels/Reels/etc
- `blog_posts_monthly` (number)
- `graphics_per_month` (number)
- `video_content_monthly` (number)
- `reels_shorts_monthly` (number)
- `content_calendar_provided` (yes/no)
- `content_approval_process` (select) - Client approval/Direct publishing
- `content_revision_rounds` (number)
- `content_sourcing` (select) - Agency creates/Client provides/Research-based

## SECTION 6: SEO (Conditional - 10 fields if selected)

- `seo_included` (yes/no)
- `keyword_research_included` (yes/no)
- `target_keywords_count` (number)
- `on_page_optimization` (yes/no)
- `technical_seo_audit` (yes/no)
- `backlink_building_included` (yes/no)
- `target_domain_authority` (number)
- `ranking_target_months` (number)
- `local_seo_included` (yes/no)
- `monthly_seo_reports` (yes/no)

## SECTION 7: PAID ADVERTISING (11 fields)

- `paid_ads_included` (yes/no)
- `google_ads_included` (yes/no)
  - `google_ads_monthly_budget` (number)
  - `google_ads_campaign_type` (multi-select) - Search/Display/Shopping
- `facebook_ads_included` (yes/no)
  - `facebook_ads_monthly_budget` (number)
  - `facebook_ads_objective` (select)
- `instagram_ads_included` (yes/no)
  - `instagram_ads_monthly_budget` (number)
- `ad_creative_design_included` (yes/no)
- `a_b_testing_included` (yes/no)
- `conversion_tracking_setup` (yes/no)
- `roi_reporting_frequency` (select) - Weekly/Bi-weekly/Monthly

## SECTION 8: EMAIL MARKETING (5 fields)

- `email_marketing_included` (yes/no)
- `email_list_size_current` (number)
- `email_campaign_frequency` (select) - Weekly/Bi-weekly/Monthly
- `email_design_included` (yes/no)
- `automation_setup_included` (yes/no)

## SECTION 9: INFLUENCER MARKETING (5 fields)

- `influencer_marketing_included` (yes/no)
- `influencer_tier_preference` (select) - Micro/Mid-tier/Macro/Celebrity
- `influencer_count_target` (number)
- `deliverables_per_influencer` (text) - e.g., "3 posts + 2 stories"
- `influencer_vetting_included` (yes/no)

## SECTION 10: ANALYTICS & REPORTING (6 fields)

- `analytics_setup_included` (yes/no)
- `reporting_frequency` (select) - Weekly/Bi-weekly/Monthly
- `key_metrics_tracked` (multi-select) - Reach/Engagement/Conversions/ROI/etc
- `custom_dashboard_provided` (yes/no)
- `strategy_adjustments_included` (number) - Free adjustments per month
- `performance_review_meetings` (number) - Per month

## SECTION 11: CAMPAIGN DURATION & TERMS (4 fields)

- `campaign_duration_months` (number)
- `contract_renewal_terms` (textarea)
- `minimum_commitment_months` (number)
- `exit_clause_terms` (textarea)

---

# 🔹 SERVICE ANNEXURE I: CONSULTING / CA SERVICES / TAX / LEGAL / FINANCIAL ADVICE

**Specific Fields:** 70+ fields | **Total with Common:** 86+ fields | **Complexity:** HIGHEST

## SECTION 1: SERVICE TYPE & DEFINITION (6 fields)

- `service_type` (select) - ITR filing/GST/Business plan/Investment advisory/Legal consultation/etc (35+ options)
- `service_type_custom` (text)
- `client_entity_type` (select) - Individual/Sole proprietor/Partnership/Private limited/etc
- `client_business_type` (select) - Startup/SME/Enterprise/Non-profit/etc
- `service_description` (textarea)
- `service_complexity_level` (select) - Basic/Intermediate/Complex/Highly complex

## SECTION 2: CLIENT INFORMATION (8 fields)

- `client_name` (text)
- `client_pan_number` (text) - PAN or Tax ID
- `client_aadhaar_number` (text) - For identity verification
- `client_business_name` (text) - If business client
- `client_registration_number` (text) - CIN/GSTIN/LLC number/etc
- `client_industry` (select)
- `client_annual_turnover` (select) - < 10L / 10L-1Cr / 1-10Cr / 10Cr+
- `client_existing_advisor` (text) - Previous advisor/CA if any

## SECTION 3: SCOPE OF WORK - DELIVERABLES (12 fields)

- `deliverables_list` (repeatable textarea) - Up to 20 deliverables
- `deliverables_count_total` (number)
- `primary_deliverable` (textarea)
- `secondary_deliverables` (textarea)
- `documentation_to_provide` (multi-select) - Forms/Reports/Certificates/Strategies/Plans
- `timeline_for_each_deliverable` (textarea)
- `milestone_based_delivery` (yes/no)
- `milestone_count` (number)
- `final_delivery_deadline` (date)
- `deliverable_format` (multi-select) - PDF/Excel/Hardcopy/Digital signatures
- `revisions_included` (number)
- `revision_scope` (select) - Limited to minor corrections/Major changes

## SECTION 4: COMPLIANCE & REGULATORY (7 fields)

- `regulatory_requirements_applicable` (multi-select) - Income Tax/GST/Company Law/Labor law/etc
- `compliance_calendar_provided` (yes/no)
- `compliance_deadline_reminders` (yes/no)
- `compliance_documentation_prepared` (yes/no)
- `regulatory_return_filings` (yes/no)
- `number_of_returns_to_file` (number)
- `jurisdiction` (select) - India/NRI/Foreign/Multiple countries

## SECTION 5: INVOICING & TAX PLANNING (6 fields)

- `tax_planning_included` (yes/no)
- `tax_saving_strategies` (textarea)
- `expected_tax_savings_estimate` (number) - Estimated ₹
- `invoice_optimization_included` (yes/no)
- `gst_implications_analyzed` (yes/no)
- `business_structure_recommendations` (yes/no)

## SECTION 6: DOCUMENTATION HANDOVER (5 fields)

- `documents_to_be_provided_by_client` (textarea) - List of documents needed
- `document_submission_timeline` (text) - By when client should provide
- `missing_documents_handling` (select) - Service delayed/Estimated/Optional
- `document_retention_policy` (text) - How long retained
- `document_confidentiality_duration_years` (number)

## SECTION 7: LIABILITY & DISCLAIMERS (15 fields for CA/Legal/Consultant/Financial Advisor)

### General Liability
- `liability_cap_percentage` (number) - e.g., 50% of fees
- `liability_cap_amount_if_fixed` (number) - Fixed amount in ₹
- `exclusion_of_consequential_damages` (yes/no)
- `liability_period_days` (number) - How long advisor is liable

### Professional Liability & Scope Limitations
- `advice_not_guaranteed` (yes/no)
- `scope_of_advice_documented` (yes/no)
- `out_of_scope_advice_cost` (number) - Additional charges
- `client_reliance_on_own_judgment` (yes/no) - Disclaimer

### Specific Disclaimers (CA/Tax Advisor)
- `tax_filing_not_legal_advice_disclaimer` (yes/no)
- `no_guarantee_refund_disclaimer` (yes/no)
- `no_guarantee_penalty_avoidance_disclaimer` (yes/no)

### Specific Disclaimers (Legal Consultant)
- `not_attorney_client_relationship_disclaimer` (yes/no)
- `not_full_legal_representation_disclaimer` (yes/no)
- `independent_legal_counsel_recommended_disclaimer` (yes/no)

### Specific Disclaimers (Financial Advisor)
- `not_investment_advice_disclaimer` (yes/no)
- `market_risks_disclosure` (yes/no)
- `past_performance_no_guarantee_disclaimer` (yes/no)

## SECTION 8: COMMUNICATION & SUPPORT (5 fields)

- `communication_method` (multi-select) - Email/Phone/Video call/In-person/Chat
- `response_time_sla_hours` (number)
- `support_availability` (select) - Business hours/24/7/Restricted hours
- `escalation_procedure_documented` (yes/no)
- `emergency_support_available` (yes/no)

## SECTION 9: REVISION & REWORK POLICY (4 fields)

- `revision_rounds_included` (number)
- `revision_timeline_days` (number)
- `rework_due_to_error` (select) - Free/Partial/Charged
- `rework_response_time_days` (number)

## SECTION 10: ADDITIONAL CHARGES (6 fields)

- `additional_services_possible` (yes/no)
- `additional_service_examples` (textarea) - e.g., "Representation in audit"
- `additional_service_cost_structure` (select) - Hourly/Per service/Project-based
- `hourly_rate_additional` (number) - If hourly
- `approval_required_for_additional` (yes/no)
- `cost_estimate_upfront` (yes/no)

## SECTION 11: PAYMENT & TERMS (5 fields)

- `payment_structure` (select) - Full upfront/Milestone-based/On delivery/Retainer
- `payment_schedule` (textarea)
- `late_payment_charges` (number) - % per day
- `cancellation_policy` (textarea)
- `refund_policy` (textarea)

---

## 📊 SUMMARY TABLE - SERVICES

| Annexure | Service Type | Specific Fields | Total Fields | Complexity |
|----------|--------------|-----------------|--------------|------------|
| A | Software Development | 56 | 72 | **HIGHEST** |
| B | UI/UX Design & Graphics | 42 | 58 | MEDIUM-HIGH |
| C | Content Writing & Copywriting | 48 | 64 | MEDIUM-HIGH |
| D | Photography & Videography | 52 | 68 | **HIGH** |
| E | Tuition & Coaching | 58 | 74 | MEDIUM-HIGH |
| F | Home Repair & Maintenance | 62 | 78 | **HIGH** |
| G | Cleaning & Housekeeping | 58 | 74 | MEDIUM-HIGH |
| H | Digital Marketing | 72+ | 88+ | **HIGHEST** |
| I | Consulting/CA/Legal/Financial | 70+ | 86+ | **HIGHEST** |

**TOTAL SERVICE-SPECIFIC FIELDS: ~518 fields**  
**TOTAL WITH COMMON: ~666 fields**  
**COMBINED GOODS (513) + SERVICES (666) = ~1,179 fields total**

---

## 📊 SUMMARY TABLE - GOODS (For Reference)

| Annexure | Category | Specific Fields | Total | Complexity |
|----------|----------|-----------------|-------|------------|
| A | Electronics | 22 | 34 | Medium |
| B | Mobile/Laptop | 50 | 62 | **HIGH** |
| C | Furniture | 36 | 48 | Medium |
| D | Vehicles | 56 | 68 | **HIGHEST** |
| E | Fashion | 57 | 69 | **HIGHEST** |
| F | Jewellery | 41 | 53 | Medium-High |
| G | Building Materials | 38 | 50 | Medium |
| H | Collectibles | 47 | 59 | Medium-High |
| I | Industrial Machinery | 61 | 73 | **HIGHEST** |
| J | Books | 51 | 63 | Medium-High |
| K | Art | 42 | 54 | Medium-High |

**TOTAL GOODS FIELDS: ~513 fields**

---

## 🎯 Key Differences: GOODS vs SERVICES

### Goods Focus (Physical Inspection-Based)
- **Condition specification:** Battery health %, scratches, dents, rust
- **Functionality tests:** Power on/charging/screen/WiFi/camera working
- **Accessories:** Original box, chargers, cables included
- **Physical specs:** Weight, dimensions, serial numbers, IMEI
- **Inspection windows:** Return periods, warranty coverage
- **Dispute triggers:** "Item not as described", "Arrived damaged", "Condition misrepresented"

### Services Focus (Scope & Deliverable-Based)
- **Deliverable quantification:** Number of screens, blog posts, photos, tasks
- **Scope definition:** Explicit task lists, exclusions, acceptance criteria
- **Timeline & milestones:** Delivery dates, session counts, revision rounds
- **Quality standards:** Editing levels, resolution, completeness thresholds
- **Liability shields:** Disclaimers for tax/legal advice, guaranteed results
- **Dispute triggers:** "Didn't deliver as promised", "Quality not met", "Scope exceeded"

---

## 🎯 Implementation Priority - SERVICES

**Phase 1 (Critical - Most Revenue Impact):**
1. SERVICE I (Consulting/CA/Legal) - 86+ fields - HIGHEST complexity
2. SERVICE H (Digital Marketing) - 88+ fields - HIGHEST complexity
3. SERVICE A (Software Development) - 72 fields - HIGHEST complexity

**Phase 2 (High Priority):**
4. SERVICE D (Photography) - 68 fields - HIGH complexity
5. SERVICE F (Home Repair) - 78 fields - HIGH complexity

**Phase 3 (Medium Priority):**
6. SERVICE B (Design) - 58 fields
7. SERVICE C (Content) - 64 fields
8. SERVICE E (Coaching) - 74 fields
9. SERVICE G (Cleaning) - 74 fields

---

## 💾 Database Implementation Notes

### Single Table Approach (Recommended)
```sql
CREATE TABLE form_submissions (
  -- COMMON FIELDS (16 columns)
  id UUID PRIMARY KEY,
  transaction_type VARCHAR(50), -- 'goods', 'services_software', 'services_consulting', etc.
  buyer_id UUID,
  seller_id UUID,
  sale_price DECIMAL(12,2),
  payment_method VARCHAR(50),
  delivery_timeline INT,
  created_at TIMESTAMP,
  
  -- GOODS-SPECIFIC (~200 columns) [NULL if service]
  battery_health_percent INT,
  imei VARCHAR(20),
  metal_purity VARCHAR(10),
  ...
  
  -- SERVICES-SPECIFIC (~518 columns) [NULL if goods]
  -- SOFTWARE (56 columns)
  project_title VARCHAR(150),
  project_type VARCHAR(50),
  features JSONB, -- Array of feature objects
  user_roles JSONB,
  supported_devices TEXT[],
  ...
  
  -- DESIGN (42 columns)
  design_type VARCHAR(50),
  screen_count INT,
  logo_concept_count INT,
  design_style VARCHAR(50),
  reference_links TEXT[],
  ...
  
  -- CONTENT (48 columns)
  content_type VARCHAR(50),
  minimum_word_count INT,
  blog_article_count INT,
  social_caption_count INT,
  tone_of_voice VARCHAR(50),
  ...
  
  -- PHOTOGRAPHY (52 columns)
  shoot_type VARCHAR(50),
  coverage_hours_total DECIMAL(4,1),
  edited_photos_count INT,
  video_included BOOLEAN,
  ...
  
  -- And so on for all services...
);

-- Use JSON/JSONB for complex nested structures
-- Examples:
--   features: [{"name": "Auth", "priority": "must_have"}, ...]
--   scope_of_work_tasks: [{"task_name": "Repair", "hours": 2}, ...]
--   user_roles: [{"role_name": "Admin", "permissions": ["view", "edit"]}, ...]
```

### Query Pattern (Contract Generation)
```sql
SELECT * FROM form_submissions 
WHERE id = $1 AND transaction_type LIKE 'services_%';

-- Then in application:
const template = getTemplate(formData.transaction_type);
const contract = replacePlaceholders(template, formData);
```

---

## 📋 Form Generation Strategy

### Dynamic Form Builders
1. **Field Configuration:** Store field definitions in database with conditional logic
2. **Conditional Rendering:** Show/hide fields based on user selections
3. **Validation Rules:** Service-specific mandatory field validation
4. **Auto-Population:** Pre-fill common fields across all services

### Form Complexity Handling
- **SERVICE A (Software):** Large repeatable arrays (features, integrations, user roles)
- **SERVICE D (Photography):** Complex multi-section forms with conditional sections
- **SERVICE H (Marketing):** Highly conditional - different fields based on selected platforms
- **SERVICE I (Consulting):** Lengthy liability & disclaimer sections (15+ fields)

---

## 🚀 Deployment Recommendations

1. **Database Migration:** Add 518 service columns (or use JSONB for flexibility)
2. **Form UI:** Build dynamic form renderer supporting 72+ field types
3. **Contract Templates:** Create 9 master templates (one per service type)
4. **Validation Engine:** Service-specific business rules and mandatory field checks
5. **Testing:** Load test with 1,000+ service submissions across all types
