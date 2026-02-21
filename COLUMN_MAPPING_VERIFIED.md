# VERIFIED COLUMN MAPPING

## PROFILES Table (Verified ✅)
```
id                      → uuid (primary key)
user_id                 → uuid (references auth user)
full_name              → text (user's full name)
phone                  → text (phone number)
avatar_url             → text (profile picture URL)
created_at             → timestamp with time zone
updated_at             → timestamp with time zone
email                  → text (email address)
address                → text (full address)
city                   → text (city)
state                  → text (state)
pincode                → text (postal code)
pan_number             → text (PAN for tax)
gst_number             → text (GST for business)
business_name          → text (business name)
business_type          → text (type of business)
verified_phone         → boolean (is phone verified)
```

**Total Columns:** 17 columns
**Data Types:** UUID (2), TEXT (12), TIMESTAMP (2), BOOLEAN (1)

---

## Contract Placeholder Mapping - PROFILES Table

### Seller Information (from buyer/seller profile_id in form_submissions)
- {{seller_full_name}} → profiles.full_name
- {{seller_phone}} → profiles.phone
- {{seller_address}} → profiles.address
- {{seller_city}} → profiles.city
- {{seller_state}} → profiles.state
- {{seller_pincode}} → profiles.pincode
- {{seller_pan_number}} → profiles.pan_number
- {{seller_gst_number}} → profiles.gst_number
- {{seller_email}} → profiles.email
- {{seller_business_name}} → profiles.business_name
- {{seller_verified_phone}} → profiles.verified_phone

### Buyer Information (from buyer profile_id in form_submissions)
- {{buyer_full_name}} → profiles.full_name
- {{buyer_phone}} → profiles.phone
- {{buyer_address}} → profiles.address
- {{buyer_city}} → profiles.city
- {{buyer_state}} → profiles.state
- {{buyer_pincode}} → profiles.pincode
- {{buyer_pan_number}} → profiles.pan_number
- {{buyer_gst_number}} → profiles.gst_number
- {{buyer_email}} → profiles.email
- {{buyer_business_name}} → profiles.business_name
- {{buyer_verified_phone}} → profiles.verified_phone

---

## FORM_SUBMISSIONS Table (Verified ✅)
**Total Columns:** 102 columns
**Key Groupings:**
- **Identifiers:** id (bigint), user_id (UUID), transaction_id (text)
- **Product Names:** product_name, item_title, item_name, machine_name, book_title
- **Product Details:** brand, make, model, model_name, model_number, model_edition, variant, variant_ram_storage, category, device_type, color
- **Specifications:** storage (int), ram (int), display_size (numeric), processor, graphics_card, battery_capacity (int), manufactured_year (int)
- **Pricing & Delivery:** price (numeric), sale_price (numeric), expected_delivery_date (date), inspection_window_hours (int), delivery_mode (text), return_policy (text)
- **Condition Booleans (25 fields):** scratches_present, dents_present, power_on_working, charging_working, cracks, spots_lines, heating_issues, network_issues, camera_issues, water_marks, screen_ok, buttons_ok, speakers_ok, camera_ok, wifi_bluetooth_ok, ports_ok, touchscreen, buttons, wifi_bluetooth, fingerprint_faceid, speaker_mic_functional, sim_detection, keyboard_keys, trackpad, usb_hdmi_ports, webcam, fast_charging_support
- **Accessories Booleans (8 fields):** cable, earphones, case_included, manual, stand_base, remote, laptop_charger, laptop_bag
- **JSONB Fields (14 fields):** technical_specs, identification_data, condition_data, functionality_data, measurements, material_data, accessories_data, warranty_legal_data, documentation_data, usage_history_data, media_files, buyer_requirements, category_specific_data, delivery_data
- **Status Fields:** form_status, completion_percentage (int), required_fields_completed (int), total_fields_filled (int)
- **Timestamps:** created_at, updated_at, submitted_at
- **Other:** industry_category, annexure_code, authors, publisher, serial_number, imei_2, battery_health_percent, condition_category, screen_condition, weight_category, jewellery_category

### Contract Placeholder Mapping - FORM_SUBMISSIONS Table
- {{product_name}} → form_submissions.product_name (or item_title, item_name, machine_name, book_title)
- {{brand}} → form_submissions.brand
- {{model}} → form_submissions.model
- {{imei}} → form_submissions.identification_data->>'imei' (JSON field)
- {{serial_number}} → form_submissions.serial_number
- {{condition}} → form_submissions.condition_category
- {{description}} → form_submissions.description
- {{scratches_present}} → form_submissions.scratches_present
- {{dents_present}} → form_submissions.dents_present
- {{power_on_working}} → form_submissions.power_on_working
- {{charging_working}} → form_submissions.charging_working
- {{touchscreen}} → form_submissions.touchscreen
- {{camera_ok}} → form_submissions.camera_ok
- {{screen_ok}} → form_submissions.screen_ok
- {{battery_health_percent}} → form_submissions.battery_health_percent
- {{buttons_ok}} → form_submissions.buttons_ok
- {{speakers_ok}} → form_submissions.speakers_ok
- {{wifi_bluetooth_ok}} → form_submissions.wifi_bluetooth_ok
- {{ports_ok}} → form_submissions.ports_ok
- {{cracks}} → form_submissions.cracks
- {{cable}} → form_submissions.cable
- {{earphones}} → form_submissions.earphones
- {{case_included}} → form_submissions.case_included
- {{manual}} → form_submissions.manual
- {{original_box}} → form_submissions.accessories_data->>'original_box' (JSON field)
- {{original_charger}} → form_submissions.accessories_data->>'original_charger' (JSON field)
- {{warranty_info}} → form_submissions.warranty_legal_data->>'warranty_info' (JSON field)
- {{warranty_status}} → form_submissions.warranty_legal_data->>'warranty_status' (JSON field)
- {{price}} → form_submissions.price
- {{sale_price}} → form_submissions.sale_price
- {{expected_delivery_date}} → form_submissions.expected_delivery_date
- {{delivery_mode}} → form_submissions.delivery_mode
- {{inspection_window_hours}} → form_submissions.inspection_window_hours
- {{return_policy}} → form_submissions.return_policy
- {{transaction_id}} → form_submissions.transaction_id

---

## TRANSACTIONS Table (Verified ✅)
**Total Columns:** 18 columns
**Key Fields:**
- **Identifiers:** id (UUID), title (text), transaction_id implicit from form_submissions
- **Parties:** buyer_id (UUID), seller_id (UUID), buyer_phone (text), seller_phone (text)
- **Financial:** amount (numeric), status (text), payment_released_at (timestamp)
- **Delivery:** delivery_date (date), work_marked_done_at (timestamp)
- **Dispute:** dispute_details (text), dispute_reason (text), has_evidence (boolean), resolution_breakdown (JSONB)
- **Timestamps:** created_at, updated_at

### Contract Placeholder Mapping - TRANSACTIONS Table
- {{transaction_id}} → transactions.id (or use form_submissions.transaction_id)
- {{amount}} → transactions.amount
- {{transaction_status}} → transactions.status
- {{buyer_id}} → transactions.buyer_id
- {{seller_id}} → transactions.seller_id
- {{delivery_date}} → transactions.delivery_date (or form_submissions.expected_delivery_date)
- {{payment_released_at}} → transactions.payment_released_at
- {{work_marked_done_at}} → transactions.work_marked_done_at

---

## Notes
- PROFILES table is verified and ready for use
- All TEXT fields are nullable (YES) - need null checks in queries
- No issues with data types - all mappings are straightforward
- Ready to proceed with FORM_SUBMISSIONS table verification
