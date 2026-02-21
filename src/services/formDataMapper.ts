/**
 * FORM DATA MAPPER - Maps all 382+ form fields to database columns
 * 
 * Purpose: Convert form data (with any field naming variations) to normalized
 * database column names used in form_submissions table
 * 
 * Strategy: 
 * - Direct columns: product_name, brand, model, description, price, etc.
 * - JSONB fields: technical_specs, identification_data, condition_data, etc.
 * 
 * Handles:
 * - Field name variations (e.g., imei vs imei_1, charges vs charging_working)
 * - Type conversions (boolean → yes/no, objects → JSON strings)
 * - Null/undefined handling
 */

export interface FormDataRecord {
  [key: string]: any;
}

/**
 * Helper to safely extract and convert field values
 */
function getFieldValue(value: any): any {
  if (value === null || value === undefined) return null;
  if (typeof value === 'boolean') return value ? 'yes' : 'no';
  if (typeof value === 'object' && Array.isArray(value)) return JSON.stringify(value);
  if (typeof value === 'object' && !(value instanceof Date)) return JSON.stringify(value);
  return value;
}

/**
 * Main mapper function - takes raw form data and returns normalized database record
 * All fields are properly mapped to actual database schema columns or JSONB fields
 */
export function mapFormDataToDatabase(formData: Record<string, any>): FormDataRecord {
  const record: FormDataRecord = {};

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: SYSTEM FIELDS (Direct columns in form_submissions)
  // ═══════════════════════════════════════════════════════════════════
  record.user_id = formData.user_id || null;
  record.form_id = formData.form_id || formData.transaction_id || null;
  record.industry_category = formData.industry_category || formData.product_category || null;
  record.annexure_code = formData.annexure_code || null;
  record.form_status = formData.form_status || 'draft';

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: BASIC PRODUCT IDENTIFICATION (Direct columns)
  // ═══════════════════════════════════════════════════════════════════
  // These are actual columns in the form_submissions table
  record.product_name = formData.product_name || formData.item_title || formData.book_title || 'Unlisted Product';
  record.item_title = formData.item_title || null;
  record.item_name = formData.item_name || null;
  record.machine_name = formData.machine_name || null;
  record.book_title = formData.book_title || null;
  record.brand = formData.brand || formData.make || null;
  record.make = formData.make || null;
  record.model = formData.model || null;
  record.model_name = formData.model_name || null;
  record.model_number = formData.model_number || formData.model || formData.model_name || null;
  record.model_edition = formData.model_edition || null;
  record.variant = formData.variant || null;
  record.variant_ram_storage = formData.variant_ram_storage || null;
  record.category = formData.category || null;
  record.jewellery_category = formData.jewellery_category || null;
  record.device_type = formData.device_type || null;
  record.description = formData.description || 'No description provided';
  record.authors = formData.authors || null;
  record.publisher = formData.publisher || null;

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3: PRICING & DELIVERY INFORMATION (Direct columns)
  // ═══════════════════════════════════════════════════════════════════
  record.price = formData.price ? parseFloat(formData.price) : null;
  record.sale_price = formData.sale_price ? parseFloat(formData.sale_price) : 0;
  // Set default expected delivery date to 7 days from now if not provided
  if (formData.expected_delivery_date) {
    record.expected_delivery_date = formData.expected_delivery_date;
  } else {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    record.expected_delivery_date = futureDate.toISOString().split('T')[0];
  }
  record.inspection_window_hours = formData.inspection_window_hours ? parseInt(formData.inspection_window_hours) : 24;
  record.return_policy = getFieldValue(formData.return_policy) || 'no-return';
  record.delivery_mode = formData.delivery_mode || 'standard';
  record.weight_category = formData.weight_category || null;
  // Add condition as a direct column (NOT NULL)
  record.condition = formData.condition || formData.condition_category || 'not-specified';

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 4: TECHNICAL SPECIFICATIONS (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const technical_specs: Record<string, any> = {};
  if (formData.color) technical_specs.color = formData.color;
  if (formData.storage) technical_specs.storage = formData.storage;
  if (formData.ram) technical_specs.ram = formData.ram;
  if (formData.display_size) technical_specs.display_size = formData.display_size;
  if (formData.processor) technical_specs.processor = formData.processor;
  if (formData.graphics_card) technical_specs.graphics_card = formData.graphics_card;
  if (formData.battery_capacity) technical_specs.battery_capacity = formData.battery_capacity;
  if (formData.manufactured_year) technical_specs.manufactured_year = formData.manufactured_year;
  if (formData.manufacturing_year) technical_specs.manufacturing_year = formData.manufacturing_year;
  if (formData.registration_year) technical_specs.registration_year = formData.registration_year;
  if (formData.fuel_type) technical_specs.fuel_type = formData.fuel_type;
  if (formData.voltage_required) technical_specs.voltage_required = formData.voltage_required;
  if (formData.phase) technical_specs.phase = formData.phase;
  if (formData.power_rating) technical_specs.power_rating = formData.power_rating;
  if (formData.wattage) technical_specs.wattage = formData.wattage;
  if (formData.load_capacity) technical_specs.load_capacity = formData.load_capacity;
  if (formData.rpm_output_capacity) technical_specs.rpm_output_capacity = formData.rpm_output_capacity;
  if (formData.air_pressure) technical_specs.air_pressure = formData.air_pressure;
  if (formData.electrical_quality_grade) technical_specs.electrical_quality_grade = formData.electrical_quality_grade;
  if (Object.keys(technical_specs).length > 0) {
    record.technical_specs = technical_specs;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 5: IDENTIFICATION DATA (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const identification_data: Record<string, any> = {};
  if (formData.serial_number) identification_data.serial_number = formData.serial_number;
  if (formData.imei) identification_data.imei = formData.imei;
  if (formData.imei_1) identification_data.imei_1 = formData.imei_1;
  if (formData.imei1) identification_data.imei1 = formData.imei1;
  if (formData.imei_2) identification_data.imei_2 = formData.imei_2;
  if (formData.imei2) identification_data.imei2 = formData.imei2;
  if (formData.engine_number) identification_data.engine_number = formData.engine_number;
  if (formData.chassis_number) identification_data.chassis_number = formData.chassis_number;
  if (formData.registration_number) identification_data.registration_number = formData.registration_number;
  if (formData.batch_number) identification_data.batch_number = formData.batch_number;
  if (formData.shade_number) identification_data.shade_number = formData.shade_number;
  if (formData.edition_number) identification_data.edition_number = formData.edition_number;
  if (formData.serial_date_code) identification_data.serial_date_code = formData.serial_date_code;
  if (formData.battery_cycle_count) identification_data.battery_cycle_count = formData.battery_cycle_count;
  if (Object.keys(identification_data).length > 0) {
    record.identification_data = identification_data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 6: CONDITION ASSESSMENT (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const condition_data: Record<string, any> = {};
  if (formData.condition_category) condition_data.condition_category = formData.condition_category;
  if (formData.condition) condition_data.condition = formData.condition;
  if (formData.scratches) condition_data.scratches = formData.scratches;
  if (formData.scratches_present) condition_data.scratches_present = formData.scratches_present;
  if (formData.dents) condition_data.dents = formData.dents;
  if (formData.dents_present) condition_data.dents_present = formData.dents_present;
  if (formData.back_dents) condition_data.back_dents = formData.back_dents;
  if (formData.screen_issues) condition_data.screen_issues = formData.screen_issues;
  if (formData.screen_condition) condition_data.screen_condition = formData.screen_condition;
  if (formData.cracks) condition_data.cracks = formData.cracks;
  if (formData.spots_lines) condition_data.spots_lines = formData.spots_lines;
  if (formData.touch_issues) condition_data.touch_issues = formData.touch_issues;
  if (formData.buttons_ports_issues) condition_data.buttons_ports_issues = formData.buttons_ports_issues;
  if (formData.speaker_mic_issues) condition_data.speaker_mic_issues = formData.speaker_mic_issues;
  if (formData.charging_issues) condition_data.charging_issues = formData.charging_issues;
  if (formData.charging_port_issues) condition_data.charging_port_issues = formData.charging_port_issues;
  if (formData.battery_health_percent) condition_data.battery_health_percent = formData.battery_health_percent;
  if (formData.battery_health_percentage) condition_data.battery_health_percentage = formData.battery_health_percentage;
  if (formData.heating_issues) condition_data.heating_issues = formData.heating_issues;
  if (formData.network_issues) condition_data.network_issues = formData.network_issues;
  if (formData.camera_issues) condition_data.camera_issues = formData.camera_issues;
  if (formData.water_marks) condition_data.water_marks = formData.water_marks;
  if (formData.torn_upholstery) condition_data.torn_upholstery = formData.torn_upholstery;
  if (formData.sun_fading) condition_data.sun_fading = formData.sun_fading;
  if (formData.loose_stone) condition_data.loose_stone = formData.loose_stone;
  if (formData.missing_stone) condition_data.missing_stone = formData.missing_stone;
  if (formData.loose_legs) condition_data.loose_legs = formData.loose_legs;
  if (formData.known_defects) condition_data.known_defects = formData.known_defects;
  if (formData.known_issues) condition_data.known_issues = formData.known_issues;
  if (formData.other_damages) condition_data.other_damages = formData.other_damages;
  if (formData.odor_assessment) condition_data.odor_assessment = formData.odor_assessment;
  if (formData.no_damages) condition_data.no_damages = formData.no_damages;
  if (Object.keys(condition_data).length > 0) {
    record.condition_data = condition_data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 7: FUNCTIONALITY TESTS (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const functionality_data: Record<string, any> = {};
  if (formData.power_on_working) functionality_data.power_on_working = formData.power_on_working;
  if (formData.power_on) functionality_data.power_on = formData.power_on;
  if (formData.turns_on) functionality_data.turns_on = formData.turns_on;
  if (formData.charging_working) functionality_data.charging_working = formData.charging_working;
  if (formData.charges) functionality_data.charges = formData.charges;
  if (formData.screen_ok) functionality_data.screen_ok = formData.screen_ok;
  if (formData.touch_ok) functionality_data.touch_ok = formData.touch_ok;
  if (formData.buttons_ok) functionality_data.buttons_ok = formData.buttons_ok;
  if (formData.speakers_ok) functionality_data.speakers_ok = formData.speakers_ok;
  if (formData.camera_ok) functionality_data.camera_ok = formData.camera_ok;
  if (formData.wifi_bluetooth_ok) functionality_data.wifi_bluetooth_ok = formData.wifi_bluetooth_ok;
  if (formData.ports_ok) functionality_data.ports_ok = formData.ports_ok;
  if (formData.touchscreen) functionality_data.touchscreen = formData.touchscreen;
  if (formData.buttons) functionality_data.buttons = formData.buttons;
  if (formData.wifi_bluetooth) functionality_data.wifi_bluetooth = formData.wifi_bluetooth;
  if (formData.fingerprint_faceid) functionality_data.fingerprint_faceid = formData.fingerprint_faceid;
  if (formData.speaker_mic_functional) functionality_data.speaker_mic_functional = formData.speaker_mic_functional;
  if (formData.sim_detection) functionality_data.sim_detection = formData.sim_detection;
  if (formData.keyboard_keys) functionality_data.keyboard_keys = formData.keyboard_keys;
  if (formData.trackpad) functionality_data.trackpad = formData.trackpad;
  if (formData.usb_hdmi_ports) functionality_data.usb_hdmi_ports = formData.usb_hdmi_ports;
  if (formData.webcam) functionality_data.webcam = formData.webcam;
  if (formData.fast_charging_support) functionality_data.fast_charging_support = formData.fast_charging_support;
  if (formData.drawer_cabinet_function_test) functionality_data.drawer_cabinet_function_test = formData.drawer_cabinet_function_test;
  if (formData.fan_noise) functionality_data.fan_noise = formData.fan_noise;
  if (formData.overheating) functionality_data.overheating = formData.overheating;
  if (formData.laptop_battery_backup) functionality_data.laptop_battery_backup = formData.laptop_battery_backup;
  if (Object.keys(functionality_data).length > 0) {
    record.functionality_data = functionality_data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 8: MEASUREMENTS & DIMENSIONS (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const measurements: Record<string, any> = {};
  if (formData.length_cm) measurements.length_cm = formData.length_cm;
  if (formData.breadth_cm) measurements.breadth_cm = formData.breadth_cm;
  if (formData.height_cm) measurements.height_cm = formData.height_cm;
  if (formData.width_cm) measurements.width_cm = formData.width_cm;
  if (formData.depth_cm) measurements.depth_cm = formData.depth_cm;
  if (formData.thickness_mm) measurements.thickness_mm = formData.thickness_mm;
  if (formData.slab_thickness) measurements.slab_thickness = formData.slab_thickness;
  if (formData.size_label) measurements.size_label = formData.size_label;
  if (formData.size) measurements.size = formData.size;
  if (formData.fit_type) measurements.fit_type = formData.fit_type;
  if (formData.measurements_provided) measurements.measurements_provided = formData.measurements_provided;
  if (Object.keys(measurements).length > 0) {
    record.measurements = measurements;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 9: MATERIAL & QUALITY INFORMATION (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const material_data: Record<string, any> = {};
  if (formData.material_type) material_data.material_type = formData.material_type;
  if (formData.material) material_data.material = formData.material;
  if (formData.material_type_purity) material_data.material_type_purity = formData.material_type_purity;
  if (formData.finish_type) material_data.finish_type = formData.finish_type;
  if (formData.grade_quality) material_data.grade_quality = formData.grade_quality;
  if (formData.quality) material_data.quality = formData.quality;
  if (formData.purity) material_data.purity = formData.purity;
  if (formData.gross_weight_grams) material_data.gross_weight_grams = formData.gross_weight_grams;
  if (formData.net_weight_grams) material_data.net_weight_grams = formData.net_weight_grams;
  if (formData.making_charges_percentage) material_data.making_charges_percentage = formData.making_charges_percentage;
  if (formData.wastage_percentage) material_data.wastage_percentage = formData.wastage_percentage;
  if (formData.stone_type) material_data.stone_type = formData.stone_type;
  if (formData.stone_count) material_data.stone_count = formData.stone_count;
  if (formData.carat_weight) material_data.carat_weight = formData.carat_weight;
  if (formData.clarity) material_data.clarity = formData.clarity;
  if (formData.color_grade) material_data.color_grade = formData.color_grade;
  if (formData.fabric_composition) material_data.fabric_composition = formData.fabric_composition;
  if (formData.care_instructions) material_data.care_instructions = formData.care_instructions;
  if (formData.medium) material_data.medium = formData.medium;
  if (formData.surface) material_data.surface = formData.surface;
  if (formData.artwork_type) material_data.artwork_type = formData.artwork_type;
  if (Object.keys(material_data).length > 0) {
    record.material_data = material_data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 10: ACCESSORIES & INCLUSIONS (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const accessories_data: Record<string, any> = {};
  if (formData.original_box) accessories_data.original_box = formData.original_box;
  if (formData.box) accessories_data.box = formData.box;
  if (formData.original_box_included) accessories_data.original_box_included = formData.original_box_included;
  if (formData.original_charger) accessories_data.original_charger = formData.original_charger;
  if (formData.charger) accessories_data.charger = formData.charger;
  if (formData.original_charger_included) accessories_data.original_charger_included = formData.original_charger_included;
  if (formData.cable) accessories_data.cable = formData.cable;
  if (formData.earphones) accessories_data.earphones = formData.earphones;
  if (formData.case) accessories_data.case = formData.case;
  if (formData.manual) accessories_data.manual = formData.manual;
  if (formData.stand_base) accessories_data.stand_base = formData.stand_base;
  if (formData.remote) accessories_data.remote = formData.remote;
  if (formData.laptop_charger) accessories_data.laptop_charger = formData.laptop_charger;
  if (formData.laptop_bag) accessories_data.laptop_bag = formData.laptop_bag;
  if (formData.additional_battery) accessories_data.additional_battery = formData.additional_battery;
  if (formData.other_accessories) accessories_data.other_accessories = formData.other_accessories;
  if (formData.others) accessories_data.others = formData.others;
  if (formData.tools_included) accessories_data.tools_included = formData.tools_included;
  if (formData.original_packaging) accessories_data.original_packaging = formData.original_packaging;
  if (formData.assembly_status) accessories_data.assembly_status = formData.assembly_status;
  if (formData.assembly_responsibility) accessories_data.assembly_responsibility = formData.assembly_responsibility;
  if (Object.keys(accessories_data).length > 0) {
    record.accessories_data = accessories_data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 11: WARRANTY & LEGAL STATUS (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const warranty_legal_data: Record<string, any> = {};
  if (formData.warranty_status) warranty_legal_data.warranty_status = formData.warranty_status;
  if (formData.warranty_valid_until) warranty_legal_data.warranty_valid_until = formData.warranty_valid_until;
  if (formData.warranty_valid_till) warranty_legal_data.warranty_valid_till = formData.warranty_valid_till;
  if (formData.warranty_info) warranty_legal_data.warranty_info = formData.warranty_info;
  if (formData.apple_brand_warranty) warranty_legal_data.apple_brand_warranty = formData.apple_brand_warranty;
  if (formData.third_party_warranty) warranty_legal_data.third_party_warranty = formData.third_party_warranty;
  if (formData.return_policy_preset) warranty_legal_data.return_policy_preset = formData.return_policy_preset;
  if (formData.rc_status) warranty_legal_data.rc_status = formData.rc_status;
  if (formData.ownership) warranty_legal_data.ownership = formData.ownership;
  if (formData.hypothecation) warranty_legal_data.hypothecation = formData.hypothecation;
  if (formData.finance_company_name) warranty_legal_data.finance_company_name = formData.finance_company_name;
  if (formData.insurance_status) warranty_legal_data.insurance_status = formData.insurance_status;
  if (formData.puc_valid_till) warranty_legal_data.puc_valid_till = formData.puc_valid_till;
  if (formData.noc_availability) warranty_legal_data.noc_availability = formData.noc_availability;
  if (formData.icloud_lock_status) warranty_legal_data.icloud_lock_status = formData.icloud_lock_status;
  if (formData.google_frp_lock) warranty_legal_data.google_frp_lock = formData.google_frp_lock;
  if (formData.mi_account_lock) warranty_legal_data.mi_account_lock = formData.mi_account_lock;
  if (formData.can_device_be_reset) warranty_legal_data.can_device_be_reset = formData.can_device_be_reset;
  if (formData.bios_lock) warranty_legal_data.bios_lock = formData.bios_lock;
  if (formData.os_activation_status) warranty_legal_data.os_activation_status = formData.os_activation_status;
  if (formData.hallmark_available) warranty_legal_data.hallmark_available = formData.hallmark_available;
  if (formData.lab_certificate_available) warranty_legal_data.lab_certificate_available = formData.lab_certificate_available;
  if (formData.authenticity_guaranteed) warranty_legal_data.authenticity_guaranteed = formData.authenticity_guaranteed;
  if (formData.purchase_receipt_available) warranty_legal_data.purchase_receipt_available = formData.purchase_receipt_available;
  if (formData.brand_tags_present) warranty_legal_data.brand_tags_present = formData.brand_tags_present;
  if (Object.keys(warranty_legal_data).length > 0) {
    record.warranty_legal_data = warranty_legal_data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 12: CERTIFICATES & DOCUMENTATION (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const documentation_data: Record<string, any> = {};
  if (formData.certificate_available) documentation_data.certificate_available = formData.certificate_available;
  if (formData.memorabilia_coa_available) documentation_data.memorabilia_coa_available = formData.memorabilia_coa_available;
  if (formData.authenticity_declaration) documentation_data.authenticity_declaration = formData.authenticity_declaration;
  if (formData.coa_provided) documentation_data.coa_provided = formData.coa_provided;
  if (Object.keys(documentation_data).length > 0) {
    record.documentation_data = documentation_data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 13: USAGE & HISTORY (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const usage_history_data: Record<string, any> = {};
  if (formData.odometer_reading) usage_history_data.odometer_reading = formData.odometer_reading;
  if (formData.odometer_authenticity) usage_history_data.odometer_authenticity = formData.odometer_authenticity;
  if (formData.usage_type) usage_history_data.usage_type = formData.usage_type;
  if (formData.accident_history) usage_history_data.accident_history = formData.accident_history;
  if (formData.flood_damage) usage_history_data.flood_damage = formData.flood_damage;
  if (formData.paint_condition) usage_history_data.paint_condition = formData.paint_condition;
  if (formData.tyre_condition_percentage) usage_history_data.tyre_condition_percentage = formData.tyre_condition_percentage;
  if (formData.battery_age) usage_history_data.battery_age = formData.battery_age;
  if (formData.previous_repairs) usage_history_data.previous_repairs = formData.previous_repairs;
  if (formData.battery_replaced) usage_history_data.battery_replaced = formData.battery_replaced;
  if (formData.screen_replaced) usage_history_data.screen_replaced = formData.screen_replaced;
  if (formData.back_glass_replaced) usage_history_data.back_glass_replaced = formData.back_glass_replaced;
  if (formData.motherboard_replaced) usage_history_data.motherboard_replaced = formData.motherboard_replaced;
  if (formData.ssd_ram_replaced) usage_history_data.ssd_ram_replaced = formData.ssd_ram_replaced;
  if (formData.ram_ssd_upgraded) usage_history_data.ram_ssd_upgraded = formData.ram_ssd_upgraded;
  if (formData.speaker_replaced) usage_history_data.speaker_replaced = formData.speaker_replaced;
  if (formData.charging_port_replaced) usage_history_data.charging_port_replaced = formData.charging_port_replaced;
  if (formData.authorized_service_repair) usage_history_data.authorized_service_repair = formData.authorized_service_repair;
  if (formData.last_service_date) usage_history_data.last_service_date = formData.last_service_date;
  if (formData.motor_rewinding) usage_history_data.motor_rewinding = formData.motor_rewinding;
  if (Object.keys(usage_history_data).length > 0) {
    record.usage_history_data = usage_history_data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 14: MEDIA FILES (JSONB field - for file URLs/paths)
  // ═══════════════════════════════════════════════════════════════════
  // Note: Media files will be populated by the UI when uploading
  // The mapper just creates the container if needed
  if (formData.media_files) {
    record.media_files = formData.media_files;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 15: BUYER REQUIREMENTS (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  if (formData.buyer_requirements) {
    record.buyer_requirements = formData.buyer_requirements;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 16: CATEGORY-SPECIFIC DATA (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  if (formData.category_specific_data) {
    record.category_specific_data = formData.category_specific_data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 17: DELIVERY DATA (JSONB field)
  // ═══════════════════════════════════════════════════════════════════
  const delivery_data: Record<string, any> = {};
  if (formData.floor_access_notes) delivery_data.floor_access_notes = formData.floor_access_notes;
  if (formData.additional_access_notes) delivery_data.additional_access_notes = formData.additional_access_notes;
  if (formData.polish_required) delivery_data.polish_required = formData.polish_required;
  if (formData.pre_existing_cracks) delivery_data.pre_existing_cracks = formData.pre_existing_cracks;
  if (Object.keys(delivery_data).length > 0) {
    record.delivery_data = delivery_data;
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 18: FORM METADATA
  // ═══════════════════════════════════════════════════════════════════
  record.completion_percentage = formData.completion_percentage || 0;
  record.required_fields_completed = formData.required_fields_completed || 0;
  record.total_fields_filled = formData.total_fields_filled || 0;

  // ═══════════════════════════════════════════════════════════════════
  // CLEANUP: Remove null/undefined values to keep database clean
  // ═══════════════════════════════════════════════════════════════════
  // First, set defaults for NOT NULL columns
  if (!record.condition) {
    record.condition = 'not-specified';
  }
  if (!record.product_name) {
    record.product_name = 'Unlisted Product';
  }

  Object.keys(record).forEach(key => {
    if (record[key] === null || record[key] === undefined) {
      delete record[key];
    }
  });

  console.log('✅ Form data mapped successfully');
  console.log(`   Direct columns: ${Object.keys(record).filter(k => typeof record[k] !== 'object').length}`);
  console.log(`   JSONB fields: ${Object.keys(record).filter(k => typeof record[k] === 'object').length}`);
  
  return record;
}
