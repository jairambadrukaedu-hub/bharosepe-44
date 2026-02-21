/**
 * CONTRACT GENERATION ENGINE
 * 
 * Purpose: Convert user-filled form data into legally-binding contracts
 * Takes: FormData (from Annexure A-L templates)
 * Returns: Generated contract HTML/PDF with all fields populated
 * 
 * Architecture:
 * 1. Load Master Template (base structure)
 * 2. Load Industry Annexure (category-specific clauses)
 * 3. Merge Master + Annexure
 * 4. Replace ALL {{placeholders}} with user data
 * 5. Validate completeness & legal compliance
 * 6. Generate PDF with signatures
 */

import { supabase } from '@/integrations/supabase/client';
import { MASTER_ESCROW_AGREEMENT } from './masterEscrowTemplate';

// ═══════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════

export interface ContractFormData {
  // Basic transaction info
  transaction_id: string;
  product_category: 'electronics' | 'mobile' | 'furniture' | 'vehicles' | 'jewellery' | 
                    'fashion-apparel' | 'building_material' | 'collectibles' | 'industrial' | 
                    'books' | 'art' | 'other';
  annexure_code: string; // A, B, C, D, F, G, H, I, J, K, L
  
  // Party information
  seller_name: string;
  seller_id: string;
  seller_phone: string;
  seller_address: string;
  seller_pan?: string;
  seller_gst?: string;
  seller_kyc_status: 'verified' | 'unverified' | 'rejected';
  seller_kyc_date?: string;
  
  buyer_name: string;
  buyer_id: string;
  buyer_phone: string;
  buyer_address: string;
  buyer_pan?: string;
  buyer_gst?: string;
  buyer_kyc_status: 'verified' | 'unverified' | 'rejected';
  buyer_kyc_date?: string;
  
  // Product details (user-filled)
  product_name: string;
  brand: string;
  model_number: string;
  color?: string;
  serial_number: string;
  imei_1?: string;
  imei_2?: string;
  
  // Specifications (category-specific)
  [key: string]: any; // Allow any category-specific fields
  
  // Condition & defects
  condition_category: string;
  scratches_present: string;
  dents_present: string;
  battery_health_percent?: number;
  icloud_lock_status?: string;
  google_frp_lock_status?: string;
  repairs_done?: string;
  
  // Functional status
  power_on_working: 'yes' | 'no';
  charging_working: 'yes' | 'no';
  camera_working?: 'yes' | 'no';
  wifi_bt_working?: 'yes' | 'no';
  
  // Accessories
  original_box_included: 'yes' | 'no' | 'damaged';
  original_charger_included: 'yes' | 'no';
  
  // Warranty
  warranty_status: string;
  warranty_valid_till?: string;
  
  // Transaction details
  sale_price: number;
  delivery_method: 'courier' | 'pickup' | 'in-person';
  delivery_address: string;
  delivery_days: number;
  
  // Auto-fetched fields (system generates)
  contract_generated_at?: string;
  contract_id?: string;
  escrow_amount?: number;
  platform_fee?: number;
  platform_fee_percentage?: number;
  gross_amount?: number;
  inspection_window_hours?: number;
  payment_aggregator_name?: string;
  escrow_payment_reference?: string;
  
  // Evidence references
  evidence_hash_seller_video?: string;
  evidence_hash_buyer_video?: string;
  evidence_hash_seller_photos?: string;
}

export interface GeneratedContract {
  contract_id: string;
  contract_html: string;
  contract_text: string;
  placeholder_count: number;
  populated_count: number;
  missing_fields: string[];
  is_valid: boolean;
  generated_at: string;
}

// ═══════════════════════════════════════════════════════════════════
// MASTER TEMPLATE (Loaded from file/DB)
// ═══════════════════════════════════════════════════════════════════

const MASTER_CONTRACT_TEMPLATE = `
═══════════════════════════════════════════════════════════════════════════
BHAROSE PE TECHNOLOGIES PVT. LTD.
MASTER GOODS SALE & ESCROW AGREEMENT (Version 2.0)
═══════════════════════════════════════════════════════════════════════════

EFFECTIVE DATE: {{contract_generated_at}}
CONTRACT ID: {{contract_id}}
TRANSACTION ID: {{transaction_id}}

═══════════════════════════════════════════════════════════════════════════
PART A — PREAMBLE & PARTIES
═══════════════════════════════════════════════════════════════════════════

SELLER (Product Provider):
  Name: {{seller_name}}
  ID: {{seller_id}}
  Phone: {{seller_phone}}
  Address: {{seller_address}}
  PAN: {{seller_pan}}
  GST: {{seller_gst}}
  KYC Status: {{seller_kyc_status}} (Verified on {{seller_kyc_date}})

BUYER (Product Receiver):
  Name: {{buyer_name}}
  ID: {{buyer_id}}
  Phone: {{buyer_phone}}
  Address: {{buyer_address}}
  PAN: {{buyer_pan}}
  GST: {{buyer_gst}}
  KYC Status: {{buyer_kyc_status}} (Verified on {{buyer_kyc_date}})

PLATFORM: Bharose Pe Technologies Pvt. Ltd.
  Role: Neutral Escrow Agent & Dispute Facilitator
  Escrow Account: {{escrow_account_details}}

═══════════════════════════════════════════════════════════════════════════
PART B — FIELD CONTROL MATRIX
═══════════════════════════════════════════════════════════════════════════

AUTO-FETCHED (Platform Records):
  ✓ Contract Generated: {{contract_generated_at}}
  ✓ Contract ID: {{contract_id}}
  ✓ Seller Device ID: {{seller_device_id}}
  ✓ Seller IP: {{seller_ip_address}}
  ✓ Buyer Device ID: {{buyer_device_id}}
  ✓ Buyer IP: {{buyer_ip_address}}
  ✓ Escrow Amount: ₹{{escrow_amount}}
  ✓ Platform Fee (1%): ₹{{platform_fee}}
  ✓ Evidence Hash (Seller Video): {{evidence_hash_seller_video}}
  ✓ Evidence Hash (Buyer Video): {{evidence_hash_buyer_video}}

USER-PROVIDED (Seller/Buyer Input):
  □ Product Name: {{product_name}}
  □ Brand: {{brand}}
  □ Model: {{model_number}}
  □ Serial: {{serial_number}}
  □ Condition: {{condition_category}}
  □ Scratches: {{scratches_present}}
  □ Dents: {{dents_present}}
  □ Battery Health: {{battery_health_percent}}%
  □ Power ON: {{power_on_working}}
  □ Charging: {{charging_working}}
  □ Price: ₹{{sale_price}}
  □ Delivery: {{delivery_method}}

PLATFORM-DEFAULT (Non-Negotiable):
  ✓ Inspection Window: {{inspection_window_hours}} hours
  ✓ Escrow Release Conditions: [Standard terms]
  ✓ Dispute Resolution: [AI + Human + Mediation + Arbitration]
  ✓ Liability Cap: ₹{{escrow_amount}} or ₹1,000 (whichever greater)

═══════════════════════════════════════════════════════════════════════════
PART C — DEFINITIONS
═══════════════════════════════════════════════════════════════════════════

"Goods": {{product_name}} ({{brand}} {{model_number}}) 
  Condition: {{condition_category}}
  Serial/IMEI: {{serial_number}} / {{imei_1}}

"Escrow Amount": ₹{{escrow_amount}} (Held with {{payment_aggregator_name}})

"Inspection Window": {{inspection_window_hours}} hours from delivery
  Basis: Product category {{product_category}} per Annexure {{annexure_code}}

═══════════════════════════════════════════════════════════════════════════
PART D — PLATFORM ROLE & LIMITATION
═══════════════════════════════════════════════════════════════════════════

Platform is neutral escrow agent only. NOT:
  ✗ Seller of goods
  ✗ Manufacturer or guarantor
  ✗ Responsible for product quality

Platform IS responsible for:
  ✓ Holding escrow securely
  ✓ Recording evidence with integrity
  ✓ Fair dispute resolution
  ✓ Complying with law

Liability Cap: ₹{{escrow_amount}} or ₹1,000 (whichever is greater)

═══════════════════════════════════════════════════════════════════════════
PART E — SELLER REPRESENTATIONS & WARRANTIES
═══════════════════════════════════════════════════════════════════════════

Seller {{seller_name}} represents:

a) OWNERSHIP & AUTHORITY
   Seller is lawful owner and authorized to sell the Goods.
   Goods are NOT stolen, counterfeit, or encumbered.

b) PRODUCT ACCURACY (Material Representation - Fraud if false)
   Product matches description:
   □ Name: {{product_name}}
   □ Brand: {{brand}}
   □ Model: {{model_number}}
   □ Serial: {{serial_number}}
   □ Condition: {{condition_category}}

c) DEFECT DISCLOSURE (Complete Honesty Required)
   All known defects disclosed:
   □ Scratches: {{scratches_present}}
   □ Dents: {{dents_present}}
   □ Battery Health: {{battery_health_percent}}%
   □ Repairs: {{repairs_done}}
   
   Non-disclosure = Fraud = Full Refund + Legal Action

d) DELIVERY OBLIGATION
   Seller will deliver via: {{delivery_method}}
   To: {{delivery_address}}
   Within: {{delivery_days}} days

e) SELLER INDEMNITY
   If fraud, Seller indemnifies Buyer + Platform for all losses.

═══════════════════════════════════════════════════════════════════════════
PART F — BUYER REPRESENTATIONS & RESPONSIBILITIES
═══════════════════════════════════════════════════════════════════════════

Buyer {{buyer_name}} agrees:

a) INSPECTION OBLIGATION
   Inspect within: {{inspection_window_hours}} hours
   Upload: Continuous unboxing video + functional test video

b) ACCEPTANCE
   No dispute within window = Automatic acceptance = Escrow releases

c) NO TAMPERING
   Buyer will not modify product beyond inspection

d) DISPUTE PROCEDURE
   If disputing: Raise within {{inspection_window_hours}} hours with evidence

═══════════════════════════════════════════════════════════════════════════
PART G — PAYMENT & ESCROW
═══════════════════════════════════════════════════════════════════════════

7.1 PAYMENT FLOW
   Buyer pays: ₹{{gross_amount}}
   Platform fee (1%): ₹{{platform_fee}}
   Escrow held: ₹{{escrow_amount}}
   
   Escrow held with: {{payment_aggregator_name}}
   Account: {{escrow_account_details}}

7.2 ESCROW RELEASE CONDITIONS
   Escrow releases to SELLER when:
   ✓ Buyer confirms receipt, OR
   ✓ {{inspection_window_hours}} hours pass without dispute, OR
   ✓ AI + Human panel conclude seller compliant, OR
   ✓ Mutual settlement executed
   
   Escrow releases to BUYER when:
   ✓ Serial/IMEI mismatch, OR
   ✓ Device dead on arrival, OR
   ✓ Undisclosed defects proven, OR
   ✓ Counterfeit detected

7.3 TAXATION
   GST (if applicable): {{gst_applicable}}
   Seller responsible for GST compliance.

═══════════════════════════════════════════════════════════════════════════
PART H — DELIVERY & INSPECTION
═══════════════════════════════════════════════════════════════════════════

8.1 DELIVERY METHOD
   Selected: {{delivery_method}}
   Location: {{delivery_address}}
   Timeline: {{delivery_days}} days

8.2 BUYER INSPECTION
   Upload: Continuous unboxing video
   Show: Product, serial number, functional tests
   Deadline: {{inspection_window_hours}} hours

8.3 COMPLIANCE FAILURE
   No inspection video = Auto-acceptance = Escrow released

═══════════════════════════════════════════════════════════════════════════
PART I — EVIDENCE
═══════════════════════════════════════════════════════════════════════════

9.1 EVIDENCE HIERARCHY (Weighted)
   TIER 1: Pre-dispatch seller video + unboxing buyer video
   TIER 2: Diagnostic outputs (battery %, IMEI screenshot)
   TIER 3: Static photos
   TIER 4: Claims without video

9.2 REQUIRED FORMATS
   Photos: Min 2MP, unaltered, EXIF preserved
   Videos: Continuous (no cuts), Max 2GB, 1080p
   Hash: SHA-256 computed by Platform

═══════════════════════════════════════════════════════════════════════════
PART J — DISPUTE RESOLUTION
═══════════════════════════════════════════════════════════════════════════

10.1 STEP 1: AI TRIAGE (0-2 hours)
   Platform AI analyzes:
   ✓ Serial/IMEI matching
   ✓ Condition matching
   ✓ Fraud indicators
   
   Output: Provisional determination

10.2 STEP 2: HUMAN REVIEW (24-72 hours)
   If inconclusive/fraud suspected:
   ✓ 3-person panel reviews evidence
   ✓ Issues binding determination
   ✓ Fraud detected → Full refund + ban

10.3 STEP 3: MEDIATION (Optional)
   If neither party satisfied:
   ✓ Empanelled mediator assigned
   ✓ Settlement discussions (7-day window)
   ✓ Non-binding initially

10.4 STEP 4: ARBITRATION / COURT (Final)
   Venue: {{arbitration_seat}}
   Governed by: Arbitration & Conciliation Act, 1996

═══════════════════════════════════════════════════════════════════════════
PART K — FRAUD RESPONSE
═══════════════════════════════════════════════════════════════════════════

11.1 FRAUD INDICATORS
   Platform monitors:
   □ IMEI/Serial mismatch
   □ Doctored evidence
   □ Chargeback patterns
   □ Velocity fraud

11.2 PLATFORM REMEDIES
   □ Freeze escrow
   □ Suspend seller account
   □ Clawback funds
   □ Refer to law enforcement

11.3 SELLER INDEMNITY
   If fraud: Seller liable under IPC 420, IT Act 66D

═══════════════════════════════════════════════════════════════════════════
PART L — LIMITATION OF LIABILITY
═══════════════════════════════════════════════════════════════════════════

14.1 PLATFORM LIABILITY CAP
   Lesser of:
   (a) ₹{{escrow_amount}}
   (b) ₹1,000
   
   EXCEPTIONS: Willful misconduct, gross negligence, data breach

14.2 SELLER LIABILITY
   Full liability for misrepresentation + fraud

14.3 BUYER LIABILITY
   Liable for post-acceptance damage, misuse, fraudulent disputes

═══════════════════════════════════════════════════════════════════════════
PART M — DATA PRIVACY & RETENTION
═══════════════════════════════════════════════════════════════════════════

13.1 CONSENT
   By transacting, parties consent to data processing per DPDP Act, 2023

13.2 RETENTION
   Evidence retained: Minimum 7 years
   Storage: Encrypted Indian servers
   Access: Authorized personnel + mediators + law enforcement (on request)

═══════════════════════════════════════════════════════════════════════════
PART N — GOVERNING LAW
═══════════════════════════════════════════════════════════════════════════

17.1 GOVERNING LAW
   Indian Contract Act 1872
   Sale of Goods Act 1930
   Consumer Protection Act 2019
   Information Technology Act 2000
   DPDP Act 2023

17.2 JURISDICTION
   Courts at {{arbitration_seat}} (Default: Hyderabad)
   OR as per transaction {{buyer_address_state}}

═══════════════════════════════════════════════════════════════════════════
PART O — DIGITAL SIGNATURES
═══════════════════════════════════════════════════════════════════════════

SELLER: {{seller_name}}
  Acceptance Timestamp: {{seller_acceptance_timestamp}}
  Device ID: {{seller_device_id}}
  IP: {{seller_ip_address}}
  Signature Hash: {{seller_signature_hash}}

BUYER: {{buyer_name}}
  Acceptance Timestamp: {{buyer_acceptance_timestamp}}
  Device ID: {{buyer_device_id}}
  IP: {{buyer_ip_address}}
  Signature Hash: {{buyer_signature_hash}}

PLATFORM: Bharose Pe Technologies Pvt. Ltd.
  Generated: {{contract_generated_at}}
  Contract ID: {{contract_id}}
  Hash: {{contract_hash_sha256}}

═══════════════════════════════════════════════════════════════════════════
END OF MASTER CONTRACT
═══════════════════════════════════════════════════════════════════════════

Disputes: disputes@bharosepe.com | Phone: 1800-BHAROSE-1
Contract Hash (SHA-256): {{contract_hash_sha256}}
`;

// ═══════════════════════════════════════════════════════════════════
// ANNEXURE-SPECIFIC SECTIONS (Appended to Master)
// ═══════════════════════════════════════════════════════════════════

const ANNEXURE_SECTIONS = {
  A: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE A — ELECTRONICS GOODS ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. ITEM SPECIFICATIONS
   Product Name: {{product_name}}
   Brand: {{brand}}
   Model Number: {{model_number}}
   Category: {{product_category}}
   Color: {{color}}
   Storage: {{storage}} GB
   RAM: {{ram}} GB
   Display Size: {{display_size}} inches
   Processor: {{processor}}
   Battery Capacity: {{battery_capacity}} mAh
   Manufactured Year: {{manufactured_year}}

2. CONDITION DISCLOSURE
   Condition Status: {{condition_category}}
   Scratches: {{scratches_present}}
   Dents: {{dents_present}}
   Screen Issues: {{screen_issues}}
   Battery Health: {{battery_health_percent}}%
   Speaker/Mic Issues: {{speaker_mic_issues}}
   Charging Issues: {{charging_issues}}

3. FUNCTIONALITY CONFIRMATION
   Power ON: {{power_on_working}}
   Charging: {{charging_working}}
   Screen: {{screen_ok}}
   Touch: {{touch_ok}}
   Buttons: {{buttons_ok}}
   Speakers: {{speakers_ok}}
   Camera: {{camera_working}}
   WiFi/Bluetooth: {{wifi_bt_working}}
   Ports: {{ports_ok}}

4. ACCESSORIES INCLUDED
   Box: {{original_box_included}}
   Charger: {{original_charger_included}}
   Cable: {{cables_included}}
   Earphones: {{earphones_included}}
   Case: {{case_included}}
   Manual: {{manual_included}}
   Other: {{other_accessories}}

5. WARRANTY
   Status: {{warranty_status}}
   Valid Till: {{warranty_valid_till}}

6. DISPUTE VALIDITY (ELECTRONICS SPECIFIC)
   VALID reasons:
   ✓ IMEI mismatch
   ✓ Device dead on arrival
   ✓ Undisclosed functional defects
   ✓ Software locks (iCloud/FRP)
   ✓ Battery health diff >3%
   ✓ Wrong device model delivered
   
   INVALID reasons:
   ✗ No unboxing video provided
   ✗ Minor scratches already disclosed
   ✗ Battery life complaints
   ✗ Device misuse damage
   ✗ Buyer regret / price complaints

7. ESCROW RELEASE (Electronics Specific)
   Release to SELLER if:
   • Buyer confirms receipt
   • Window expires without dispute
   • Dispute rejected (insufficient evidence)
   • All evidence supports seller
   
   Release to BUYER if:
   • IMEI mismatch detected
   • Device dead on arrival
   • Undisclosed defects proven
   • Counterfeit device detected

═══════════════════════════════════════════════════════════════════════════
  `,
  
  B: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE B — MOBILE PHONES, LAPTOPS & COMPUTING DEVICES
═══════════════════════════════════════════════════════════════════════════

1. DEVICE IDENTIFICATION & SPECIFICATIONS
Device Type: {{device_type}} | Brand: {{brand}} | Model: {{model_name}} | Color: {{color}}
Variant: {{variant_ram_storage}} | Serial: {{serial_number}}
IMEI 1: {{imei1}} | IMEI 2: {{imei2}}
Processor: {{processor}} | RAM: {{ram}} | Storage: {{storage_details}}
Graphics: {{graphics_card}} | Battery: {{battery_capacity}} mAh
Manufactured: {{manufactured_year}} | Purchased: {{purchase_date}}

2. SECURITY & LOCK STATUS (CRITICAL)
✓ iCloud Lock: {{icloud_lock_status}} (MUST BE OFF)
✓ Google FRP: {{google_frp_lock}} (MUST BE OFF)
✓ MI Account Lock: {{mi_account_lock}}
✓ Device Resettable: {{can_device_be_reset}} (MUST BE YES)
✓ BIOS Lock: {{bios_lock}}
✓ OS Activation: {{os_activation_status}}

3. CONDITION ASSESSMENT
Scratches: {{scratches}} | Dents: {{back_dents}} | Screen: {{screen_condition}}
Cracks: {{cracks}} | Spots/Lines: {{spots_lines}} | Touch Issues: {{touch_issues}}
Heating: {{heating_issues}} | Speaker/Mic: {{speaker_mic_issues}}
Network: {{network_issues}} | Camera: {{camera_issues}}
Charging Port: {{charging_port_issues}} | RAM/SSD Upgraded: {{ram_ssd_upgraded}}

4. BATTERY HEALTH
Battery Health: {{battery_health_percentage}}% | iPhone: {{battery_health_iphone}}%
Backup Duration: {{backup_duration_hours}} hours | Fast Charging: {{fast_charging_support}}
Laptop Battery: {{laptop_battery_backup}} hours | Cycle Count: {{battery_cycle_count}}

5. FUNCTIONAL TESTS COMPLETED
✓ Turns ON: {{turns_on}} ✓ Charges: {{charges}} ✓ Touchscreen: {{touchscreen}}
✓ Buttons: {{buttons}} ✓ WiFi/Bluetooth: {{wifi_bluetooth}}
✓ Fingerprint/FaceID: {{fingerprint_faceid}} ✓ Speaker/Mic: {{speaker_mic_functional}}
✓ Front/Back Camera: {{front_back_camera}} ✓ SIM Detection: {{sim_detection}}

6. VALID DISPUTE REASONS
✓ Security locks still ON | ✓ Device dead on arrival | ✓ Screen non-functional
✓ Undisclosed damage worse than photos | ✓ Battery >10% lower than claimed
✓ Blacklisted/stolen device | ✓ Critical features dead

7. INVALID DISPUTE REASONS
✗ Minor cosmetic damage if disclosed | ✗ Battery <5% variance
✗ Buyer error/damage | ✗ Price complaints | ✗ Normal wear if disclosed

8. INSPECTION & ESCROW
Inspection Window: {{inspection_window_hours}} hours from delivery
Sale Price: ₹{{sale_price}} | Platform Fee: ₹{{platform_fee}}
Escrow Amount: ₹{{escrow_amount}} (Held with Bharose Pe)

9. SELLER WARRANTIES & LIABILITY
Device is legal, not stolen | Locks OFF | Resettable to factory | Battery: {{battery_health_percentage}}%
All features working | Condition matches photos | No undisclosed repairs
Liability Cap: ₹{{escrow_amount}} or ₹1,000 (whichever greater)

═══════════════════════════════════════════════════════════════════════════
  `,
  
  C: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE C — FURNITURE ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. FURNITURE SPECIFICATIONS
   Item Type: {{furniture_type}}
   Brand: {{brand}}
   Material: {{material_type}}
   Color: {{color}}
   Style: {{style}}
   
   DIMENSIONS (with tape proof video):
   Length: {{length_cm}} cm
   Breadth: {{breadth_cm}} cm
   Height: {{height_cm}} cm
   Weight: {{weight_kg}} kg

2. CONDITION DISCLOSURE
   Overall Condition: {{condition_category}}
   Scratches: {{scratches_present}}
   Dents: {{dents_present}}
   Stains: {{stains_present}}
   Broken Parts: {{broken_parts}}
   Missing Parts: {{missing_parts}}
   Odor Declaration: {{odor_declaration}}
   Flexibility/Stability: {{stability_test_video}}

3. STRUCTURAL INTEGRITY
   Frame Condition: {{frame_condition}}
   Cushion Condition: {{cushion_condition}}
   Springs: {{springs_intact}}
   Joints: {{joints_tight}}
   Legs/Base: {{legs_intact}}

4. FUNCTIONALITY
   Drawers/Doors: {{drawers_doors_working}}
   Locks: {{locks_working}}
   Hinges: {{hinges_working}}
   Armrests (if any): {{armrests_intact}}

5. ASSEMBLY STATUS
   Pre-Assembled: {{pre_assembled}}
   Partial Assembly Required: {{partial_assembly}}
   Full Assembly Required: {{full_assembly_required}}

6. DELIVERY & INSTALLATION
   Delivery Method: {{delivery_method}}
   Packaging: {{packaging_quality}}
   Installation Help: {{installation_included}}
   Assembly Video: {{assembly_video_provided}}

7. WARRANTY
   Status: {{warranty_status}}
   Valid Till: {{warranty_valid_till}}

8. DISPUTE VALIDITY (Furniture Specific)
   VALID reasons:
   ✓ Dimensions mismatch >5%
   ✓ Broken parts not disclosed
   ✓ Stability failure (frame/joints collapse)
   ✓ Undisclosed structural damage
   ✓ Missing parts with video proof
   
   INVALID reasons:
   ✗ Minor scratches already disclosed
   ✗ Odor (disclosed in form)
   ✗ Cosmetic damage already shown
   ✗ Assembly difficulty
   ✗ Buyer preference change

═══════════════════════════════════════════════════════════════════════════
  `,
  
  D: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE D — VEHICLES ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. VEHICLE IDENTIFICATION
   Make: {{make}}
   Model: {{model_number}}
   Year: {{manufactured_year}}
   Registration Number: {{registration_number}}
   Chassis Number: {{chassis_number}}
   Engine Number: {{engine_number}}
   VIN: {{vin}}
   Color: {{color}}
   Transmission: {{transmission}}
   Fuel Type: {{fuel_type}}

2. ODOMETER & USAGE
   Odometer Reading: {{odometer_reading}} km
   Service History: {{service_history}}
   Accident History: {{accident_history}}
   Ownership History: {{ownership_history}}

3. DOCUMENTATION
   RC Valid: {{rc_valid}}
   RC Status: {{rc_status}}
   Insurance: {{insurance_status}}
   Insurance Valid Till: {{insurance_valid_till}}
   PUC Valid: {{puc_valid}}
   PUC Valid Till: {{puc_valid_till}}
   Registration Owner: {{registration_owner}}

4. VEHICLE CONDITION
   Body Condition: {{body_condition}}
   Paint Chips: {{paint_chips}}
   Dents: {{dents_present}}
   Rust Spots: {{rust_present}}
   Glass/Mirrors: {{glass_intact}}
   Lights Working: {{lights_working}}
   Tires: {{tire_condition}}
   Tire Tread Depth: {{tire_tread_mm}} mm

5. ENGINE & MECHANICAL
   Engine Condition: {{engine_condition}}
   Engine Sound: {{engine_sound_video}}
   Transmission: {{transmission_working}}
   Brakes: {{brakes_condition}}
   Steering: {{steering_responsive}}
   AC/Heater: {{ac_heater_working}}
   Music System: {{music_system_working}}
   Sunroof/Windows: {{sunroof_windows_working}}

6. INSPECTION & VIDEOS
   Engine Start Video: {{engine_start_video}}
   Cold Start Behavior: {{cold_start_video}}
   Driving Test Video: {{driving_test_video}}
   Chassis Inspection Video: {{chassis_video}}
   Undercarriage Condition: {{undercarriage_condition}}

7. SERVICE RECORDS
   Last Service Date: {{last_service_date}}
   Service Center: {{service_center}}
   Service Due: {{next_service_due}}
   Major Repairs: {{major_repairs_done}}

8. REGISTRATION DETAILS
   Registered Owner Name: {{registration_owner_name}}
   Registered Address: {{registration_address}}
   Registration Valid Till: {{registration_valid_till}}
   NOC Status: {{noc_status}}

9. DISPUTE VALIDITY (Vehicles Specific)
   VALID reasons:
   ✓ Odometer mismatch (>1000 km variation)
   ✓ Undisclosed accident damage
   ✓ Engine not starting
   ✓ Major mechanical failure
   ✓ Forged RC/documents
   ✓ Finance/legal claim outstanding
   
   INVALID reasons:
   ✗ Minor maintenance issues
   ✗ Expected wear & tear
   ✗ Cosmetic damage already disclosed
   ✗ Service cost concerns
   ✗ Buyer regret

═══════════════════════════════════════════════════════════════════════════
  `,
  
  E: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE E — FASHION & APPAREL ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. APPAREL SPECIFICATIONS
   Item Type: {{item_type}}
   Brand: {{brand}}
   Category: {{category}}
   Size: {{size}}
   Color: {{color}}
   Material: {{material_composition}}
   Design/Pattern: {{design_pattern}}
   Fit Type: {{fit_type}}
   Sleeve Length: {{sleeve_length}}
   Product Code/SKU: {{product_code}}

2. CONDITION DISCLOSURE
   Overall Condition: {{condition_category}}
   Wear Level: {{wear_level}}
   Stains/Marks: {{stains_marks}}
   Odor: {{odor_present}}
   Pilling: {{pilling_present}}
   Fading: {{fading_present}}
   Loose Buttons: {{loose_buttons}}
   Seam Issues: {{seam_issues}}
   Zipper/Closure Status: {{zipper_status}}
   Hemming Done: {{hemming_done}}
   Alterations: {{alterations_made}}

3. CARE & WASHING
   Wash Status: {{wash_status}}
   Washing Instructions: {{washing_instructions}}
   Dry Clean Only: {{dry_clean_only}}
   Special Care Required: {{special_care_required}}
   Detergent Type Recommended: {{detergent_type}}

4. AUTHENTICITY
   Original/Duplicate: {{authenticity_status}}
   Tags Present: {{tags_present}}
   Brand Tags: {{brand_tags_present}}
   Care Label: {{care_label_present}}
   Serial Number/QR: {{serial_number}}
   Authentication Certificate: {{auth_certificate_provided}}

5. SIZE & FIT DETAILS
   Declared Size: {{declared_size}}
   Actual Size (Measured): {{actual_size}}
   Length (inches): {{length_inches}}
   Chest/Bust (inches): {{chest_bust_inches}}
   Waist (inches): {{waist_inches}}
   Sleeves (inches): {{sleeves_inches}}
   Fit Note: {{fit_note}}

6. DAMAGE & DEFECTS
   Manufacturing Defects: {{manufacturing_defects}}
   Rips/Tears: {{rips_tears}}
   Holes: {{holes_present}}
   Color Run: {{color_run}}
   Thread Issues: {{thread_issues}}

7. PHOTOGRAPHIC DOCUMENTATION
   Front View Photo: {{front_view_photo}}
   Back View Photo: {{back_view_photo}}
   Detail Photos: {{detail_photos}}
   Tags/Labels Photo: {{tags_labels_photo}}
   Packaging Photo: {{packaging_photo}}

8. PURCHASE & HISTORY
   Original Purchase Date: {{purchase_date}}
   Original Price: ₹{{original_price}}
   Invoice/Receipt Available: {{invoice_available}}
   Warranty: {{warranty_status}}

9. DISPUTE VALIDITY (Fashion & Apparel Specific - 24-Hour Window)
   VALID reasons:
   ✓ Size mismatch (>0.5 inch difference)
   ✓ Material misrepresentation
   ✓ Undisclosed major damage
   ✓ Counterfeit brand detected
   ✓ Major seam/structural failure
   ✓ Color significantly different from photos
   ✓ Odor issues (non-removable)
   
   INVALID reasons:
   ✗ Minor wear already disclosed
   ✗ Personal fit dissatisfaction
   ✗ Color perception difference
   ✗ Buyer regret/changed mind
   ✗ Wash-related damage (post-delivery)
   ✗ Size fit variation (personal preference)
   ✗ Missing packaging materials

10. ESCROW RELEASE (Fashion & Apparel Specific)
   Release to SELLER if:
   • Buyer confirms receipt and condition matches description
   • Inspection window expires without dispute
   • Dispute rejected (insufficient evidence)
   • Minor wear already disclosed
   
   Release to BUYER if:
   • Size significantly misrepresented
   • Material composition different
   • Undisclosed major damage/defects
   • Counterfeit detected
   • Multiple disclosed issues not matching description

═══════════════════════════════════════════════════════════════════════════
  `,
  
  F: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE F — JEWELLERY ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. JEWELLERY IDENTIFICATION
   Item Type: {{item_type}}
   Metal Type: {{metal_type}}
   Metal Purity: {{metal_purity}}
   Hallmark Status: {{hallmark_status}}
   Hallmark: {{hallmark}}
   Assay Certificate: {{assay_certificate_number}}

2. WEIGHT & DIMENSIONS
   Gross Weight: {{gross_weight_gm}} gm
   Net Weight: {{net_weight_gm}} gm
   Weight Proof Video: {{weight_proof_video}}
   
   DIMENSIONS:
   Length: {{length_mm}} mm
   Breadth: {{breadth_mm}} mm
   Height: {{height_mm}} mm

3. STONES & GEMS
   Stone Type: {{stone_type}}
   Stone Count: {{stone_count}}
   Carat Total: {{total_carat}}
   Certificate: {{gem_certificate}}
   Lab: {{certification_lab}}
   Color Grade: {{color_grade}}
   Clarity Grade: {{clarity_grade}}

4. CONDITION
   Overall Condition: {{condition_category}}
   Scratches: {{scratches_present}}
   Dents: {{dents_present}}
   Loose Stones: {{loose_stones}}
   Broken Settings: {{broken_settings}}
   Polish: {{polish_condition}}

5. AUTHENTICITY
   Certificate of Authenticity: {{coa_provided}}
   Lab Report: {{lab_report_provided}}
   360° Video: {{video_360_provided}}
   Maker Mark: {{maker_mark}}
   Maker Location: {{maker_location}}

6. VALUATION
   Declared Value: ₹{{declared_value}}
   Market Value Estimate: ₹{{market_value_estimate}}
   Insurance: {{insurance_included}}

7. INSPECTION WINDOW
   EXPEDITED: 2 hours (high-value items)
   Inspection Method: Photo + Video required
   Evidence: SHA-256 hash verification

8. DISPUTE VALIDITY (Jewellery Specific - 2-Hour Window)
   VALID reasons:
   ✓ Weight mismatch >0.5 gm
   ✓ Hallmark missing/fake
   ✓ Stone missing/broken
   ✓ Metal purity different
   ✓ Counterfeit certificate
   ✓ Undisclosed repairs
   
   INVALID reasons:
   ✗ Minor scratches already disclosed
   ✗ Cosmetic condition changes
   ✗ Missing documentation (if disclosed)
   ✗ Price regret
   ✗ No inspection conducted

9. WARRANTY & CERTIFICATION
   Warranty Period: {{warranty_period}}
   Warranty Coverage: {{warranty_coverage}}
   Certification Valid Till: {{certification_valid_till}}

═══════════════════════════════════════════════════════════════════════════
  `,
  
  G: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE G — BUILDING MATERIALS & FIXTURES ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. MATERIAL SPECIFICATIONS
   Material Type: {{material_type}}
   Brand: {{brand}}
   Model: {{model_number}}
   Grade: {{grade_quality}}
   Color: {{color}}
   
   EFFICIENCY:
   Energy Rating: {{energy_rating}}
   Power Consumption: {{power_consumption_watts}} W
   Voltage: {{voltage}} V
   Frequency: {{frequency}} Hz

2. CONDITION
   Overall Condition: {{condition_category}}
   Scratches: {{scratches_present}}
   Dents: {{dents_present}}
   Discoloration: {{discoloration}}
   Rust: {{rust_present}}
   Glass Condition: {{glass_intact}}
   Doors/Lids: {{doors_lids_working}}

3. FUNCTIONAL TESTS
   Power ON: {{power_on_working}}
   All Functions: {{all_functions_working}}
   Heating/Cooling: {{heating_cooling_working}}
   Timer: {{timer_working}}
   Display: {{display_working}}
   Noise Level: {{noise_level}}
   Function Test Video: {{function_test_video}}

4. ACCESSORIES & PARTS
   Original Accessories: {{original_accessories_list}}
   Missing Parts: {{missing_parts}}
   Extra Parts: {{extra_parts}}

5. INSTALLATION REQUIREMENTS
   Installation Required: {{installation_required}}
   Installation Type: {{installation_type}}
   Warranty on Installation: {{installation_warranty}}
   Technical Support: {{technical_support_included}}

6. WARRANTY
   Status: {{warranty_status}}
   Valid Till: {{warranty_valid_till}}
   Extended Warranty: {{extended_warranty}}

7. SERVICE HISTORY
   Service Record: {{service_record}}
   Last Service Date: {{last_service_date}}
   Next Service Due: {{next_service_due}}

8. DISPUTE VALIDITY (Building Materials Specific)
   VALID reasons:
   ✓ Dimensions not as specified
   ✓ Grade/quality mismatch
   ✓ Color variation from sample
   ✓ Hidden defects or damage
   ✓ Quantity short or incorrect
   
   INVALID reasons:
   ✗ Minor cosmetic variations
   ✗ Color/grain natural variation
   ✗ Installation costs
   ✗ Cutting/customization required
   ✗ Transportation damage (buyer responsibility)

═══════════════════════════════════════════════════════════════════════════
  `,
  
  H: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE H — BUILDING MATERIAL & FIXTURES ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. MATERIAL IDENTIFICATION
   Material Type: {{material_type}}
   Category: {{material_category}}
   Brand: {{brand}}
   Grade/Quality: {{grade}}
   
   BATCH DETAILS:
   Batch Number: {{batch_number}}
   Manufacturing Date: {{manufacturing_date}}
   Shade/Color Code: {{shade_code}}
   
   QUANTITY:
   Unit Type: {{unit_type}}
   Quantity: {{quantity}}
   Unit Price: {{unit_price}}

2. SPECIFICATIONS
   Standard: {{standard_compliance}}
   Dimensions: {{dimensions_specified}}
   Thickness: {{thickness_mm}} mm
   Weight: {{weight_per_unit}} kg
   Surface Finish: {{surface_finish}}

3. QUALITY CERTIFICATION
   Certificate: {{quality_certificate}}
   Lab Report: {{lab_report_provided}}
   Testing Done: {{testing_details}}

4. CONDITION & DAMAGE
   Overall Condition: {{condition_category}}
   Broken Units: {{broken_units_count}}
   Damaged Units: {{damaged_units_count}}
   Water Damaged: {{water_damage_status}}
   Rust/Oxidation: {{rust_present}}

5. DIMENSIONAL VERIFICATION
   Dimensions with Tape Proof: {{dimensions_video}}
   Deviation: {{deviation_percentage}}%
   Acceptable Tolerance: {{tolerance_percentage}}%

6. STORAGE & HANDLING
   Storage Conditions: {{storage_conditions}}
   Handling Instructions: {{handling_instructions}}
   Expiry Date: {{expiry_date}}
   Shelf Life: {{shelf_life}}

7. DELIVERY & QUANTITY
   Delivered Quantity: {{delivered_quantity}}
   Packaging Condition: {{packaging_condition}}
   Extra Units: {{extra_units_provided}}

8. DISPUTE VALIDITY (Building Material Specific)
   VALID reasons:
   ✓ Dimensions deviation >2%
   ✓ Batch number mismatch
   ✓ Quality below standard (test proof)
   ✓ Water/storage damage
   ✓ Undisclosed defects
   ✓ Quantity shortage (with video proof)
   
   INVALID reasons:
   ✗ Minor color variation (within tolerance)
   ✗ Normal wear during use
   ✗ Installation damage
   ✗ Improper storage by buyer
   ✗ Price complaints

═══════════════════════════════════════════════════════════════════════════
  `,
  
  I: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE I — COLLECTIBLES & LUXURY GOODS ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. ITEM IDENTIFICATION
   Item Name: {{item_name}}
   Category: {{collectible_category}}
   Rarity: {{rarity_level}}
   
   SERIAL/EDITION:
   Serial Number: {{serial_number}}
   Edition: {{edition_number}}
   Limited Edition: {{limited_edition}}
   Production Year: {{production_year}}

2. AUTHENTICITY & PROVENANCE
   Certificate of Authenticity: {{coa_provided}}
   COA Number: {{coa_number}}
   Issuing Authority: {{issuing_authority}}
   Chain of Custody: {{chain_of_custody}}
   Previous Owners: {{previous_owners_list}}

3. CONDITION & PRESERVATION
   Overall Condition: {{condition_category}}
   Damage: {{damage_description}}
   Restoration: {{restoration_done}}
   Conservation: {{conservation_status}}
   Environmental Impact: {{environmental_factors}}

4. DOCUMENTATION & PROVENANCE
   Original Purchase Invoice: {{original_invoice}}
   Purchase Date: {{purchase_date}}
   Purchase Price: {{purchase_price}}
   Appraisal Report: {{appraisal_report}}
   Insurance Valuation: {{insurance_valuation}}

5. INSPECTION & VERIFICATION
   360° Video: {{video_360_provided}}
   Close-up Photos: {{closeup_photos_provided}}
   Expert Inspection: {{expert_inspection_done}}
   Inspector Name: {{inspector_name}}

6. DIMENSIONS & PHYSICAL SPECS
   Dimensions: {{dimensions_specified}}
   Weight: {{weight_specified}}
   Material: {{material_type}}
   Color: {{color}}

7. MARKET VALUE
   Estimated Value: ₹{{estimated_value}}
   Market Value Range: {{market_value_range}}
   Insurance Value: {{insurance_value}}

8. STORAGE & HANDLING
   Storage Requirements: {{storage_requirements}}
   Temperature: {{temperature_range}}
   Humidity: {{humidity_range}}
   Special Care: {{special_care_instructions}}

9. DISPUTE VALIDITY (Collectibles Specific - 2-Hour Window)
   VALID reasons:
   ✓ Counterfeit detected (expert test)
   ✓ Serial number mismatch
   ✓ Condition misrepresentation
   ✓ COA authenticity failed
   ✓ Undisclosed significant damage
   ✓ Provenance fabricated
   
   INVALID reasons:
   ✗ Minor cosmetic defects
   ✗ Documentation incomplete (disclosed)
   ✗ Value disagreement
   ✗ Buyer expertise assessment
   ✗ Market price change

═══════════════════════════════════════════════════════════════════════════
  `,
  
  J: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE J — INDUSTRIAL MACHINERY ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. MACHINERY SPECIFICATIONS
   Equipment Type: {{equipment_type}}
   Brand: {{brand}}
   Model: {{model_number}}
   Serial Number: {{serial_number}}
   Year of Manufacture: {{manufactured_year}}
   
   ELECTRICAL SPECS:
   Voltage: {{voltage}} V
   Phase: {{phase}}
   Frequency: {{frequency}} Hz
   Power: {{power_hp}} HP / {{power_kw}} kW
   Amperage: {{amperage}} A

2. PHYSICAL SPECIFICATIONS
   Dimensions: {{dimensions_specified}}
   Length: {{length_mm}} mm
   Breadth: {{breadth_mm}} mm
   Height: {{height_mm}} mm
   Weight: {{weight_kg}} kg

3. CONDITION ASSESSMENT
   Overall Condition: {{condition_category}}
   Paint/Coating: {{paint_condition}}
   Rust/Corrosion: {{rust_present}}
   Moving Parts: {{moving_parts_condition}}
   Bearings: {{bearings_condition}}

4. OPERATIONAL TESTS
   Power Test: {{power_test_video}}
   Cold Start: {{cold_start_video}}
   Run Test (5 min): {{run_test_video}}
   Load Test: {{load_test_video}}
   Noise Level: {{noise_level_db}} dB
   Vibration: {{vibration_level}}

5. MAINTENANCE & REPAIR HISTORY
   Repair History: {{repair_history}}
   Major Repairs: {{major_repairs_done}}
   Last Service Date: {{last_service_date}}
   Service Manual: {{service_manual_provided}}
   Spare Parts Available: {{spare_parts_available}}

6. SAFETY FEATURES
   Emergency Stop: {{emergency_stop_working}}
   Safety Guards: {{safety_guards_intact}}
   Pressure Relief: {{pressure_relief_working}}
   Interlocks: {{interlocks_functional}}

7. COMPLIANCE & CERTIFICATION
   ISO Certification: {{iso_certified}}
   CE Mark: {{ce_mark_present}}
   Factory Certification: {{factory_certified}}
   Testing Certificates: {{testing_certs_provided}}

8. DELIVERY & INSTALLATION
   Delivery Method: {{delivery_method}}
   Installation Support: {{installation_support}}
   Commissioning: {{commissioning_support}}
   Training: {{training_provided}}

9. WARRANTY & SUPPORT
   Warranty Period: {{warranty_period}}
   Warranty Coverage: {{warranty_coverage}}
   Technical Support: {{technical_support_included}}

10. DISPUTE VALIDITY (Industrial Machinery Specific)
    VALID reasons:
    ✓ Machine non-operational on arrival
    ✓ Serial number mismatch
    ✓ Power specs don't match
    ✓ Major bearing/component failure
    ✓ Undisclosed repair damage
    ✓ Safety features non-functional
    
    INVALID reasons:
    ✗ Minor maintenance needs
    ✗ Normal operational wear
    ✗ Expected servicing required
    ✗ Adjustment/calibration costs
    ✗ Performance less than expectations

═══════════════════════════════════════════════════════════════════════════
  `,
  
  K: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE K — BOOKS & EDUCATIONAL MATERIAL ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. PUBLICATION DETAILS
   Title: {{title}}
   Author: {{author}}
   Publisher: {{publisher}}
   Edition: {{edition}}
   ISBN: {{isbn}}
   Publication Year: {{publication_year}}
   Language: {{language}}

2. PHYSICAL SPECIFICATIONS
   Format: {{format}}
   Page Count: {{page_count}}
   Binding Type: {{binding_type}}
   Dimensions: {{dimensions_specified}}
   Weight: {{weight_gm}} gm

3. CONDITION ASSESSMENT
   Overall Condition: {{condition_category}}
   Cover Condition: {{cover_condition}}
   Pages Condition: {{pages_condition}}
   Binding: {{binding_condition}}
   Spine: {{spine_condition}}
   Markings: {{markings_present}}
   Annotations: {{annotations_description}}

4. PHYSICAL DAMAGE
   Water Damage: {{water_damage_status}}
   Torn Pages: {{torn_pages_count}}
   Missing Pages: {{missing_pages_count}}
   Stains: {{stains_present}}
   Discoloration: {{discoloration_present}}
   Odor: {{odor_declaration}}

5. MARKINGS & PRIOR USE
   Previous Owner Markings: {{owner_markings_disclosure}}
   Highlighting: {{highlighting_extent}}
   Underlines: {{underlines_extent}}
   Marginalia: {{marginalia_description}}
   Stamps/Seals: {{stamps_present}}

6. CONTENT VERIFICATION
   All Pages Present: {{all_pages_present}}
   Plates/Illustrations: {{plates_intact}}
   Maps/Foldouts: {{maps_intact}}
   Index: {{index_intact}}
   Dust Jacket: {{dust_jacket_included}}

7. EDITION & VARIANT
   First Edition: {{first_edition}}
   Rare/Collectible: {{is_collectible}}
   Special/Limited: {{is_limited_edition}}
   Signed Copy: {{signed_copy}}

8. DISPUTE VALIDITY (Books & Educational Material Specific)
   VALID reasons:
   ✓ Missing pages (>5 pages)
   ✓ Different edition/publication delivered
   ✓ Severe water damage affecting readability
   ✓ Binding separated/broken
   ✓ Undisclosed significant damage
   
   INVALID reasons:
   ✗ Minor highlighting/annotations (if disclosed)
   ✗ Cosmetic page wear
   ✗ Normal age discoloration
   ✗ Markings (if clearly disclosed)
   ✗ Page yellowing

═══════════════════════════════════════════════════════════════════════════
  `,
  
  L: `
═══════════════════════════════════════════════════════════════════════════
ANNEXURE L — ART & HANDMADE ITEMS ADDENDUM
═══════════════════════════════════════════════════════════════════════════

1. ARTWORK IDENTIFICATION
   Title: {{title}}
   Artist: {{artist}}
   Medium: {{medium}}
   Surface Type: {{surface_type}}
   Year Created: {{year_created}}
   
   DIMENSIONS:
   Length: {{length_cm}} cm
   Breadth: {{breadth_cm}} cm
   Depth: {{depth_cm}} cm

2. AUTHENTICITY & PROVENANCE
   Certificate of Authenticity: {{coa_provided}}
   Artist Signature: {{artist_signature}}
   Signed Location: {{signature_location}}
   Serial Number: {{serial_number}}
   Edition Information: {{edition_information}}

3. CONDITION ASSESSMENT
   Overall Condition: {{condition_category}}
   Surface Condition: {{surface_condition}}
   Color Fade: {{color_fade_percentage}}%
   Cracks: {{cracks_present}}
   Damaged Areas: {{damage_description}}

4. RESTORATION & HISTORY
   Previous Restoration: {{restoration_done}}
   Restoration Details: {{restoration_description}}
   Preserved Condition: {{preserved_condition}}
   Environmental Damage: {{environmental_factors}}

5. MATERIALS & TECHNIQUE
   Paint Type: {{paint_type}}
   Canvas/Support: {{support_type}}
   Technique: {{technique_used}}
   Material Composition: {{material_composition}}

6. VISUAL DOCUMENTATION
   360° Video: {{video_360_provided}}
   Close-up Photos: {{closeup_photos_provided}}
   Texture Shots: {{texture_photos}}
   Back/Frame Photos: {{back_photos}}
   Signature Photos: {{signature_photos}}

7. VALUATION & PROVENANCE
   Artist Recognition: {{artist_recognition}}
   Market Estimate: ₹{{market_estimate}}
   Insurance Value: {{insurance_value}}
   Previous Exhibition: {{exhibition_history}}
   Previous Price: {{previous_sale_price}}

8. FRAMING & PRESENTATION
   Framed: {{framed_status}}
   Frame Condition: {{frame_condition}}
   Frame Type: {{frame_type}}
   Glass/Acrylic: {{glass_condition}}
   Hanging Hardware: {{hardware_included}}

9. STORAGE & CARE
   Storage Requirements: {{storage_requirements}}
   Temperature Range: {{temperature_range}}
   Humidity Range: {{humidity_range}}
   Light Sensitivity: {{light_sensitivity}}
   Special Care: {{special_care_instructions}}

10. DISPUTE VALIDITY (Art & Handmade Items Specific - 2-Hour Window)
    VALID reasons:
    ✓ Counterfeit/forgery detected (expert)
    ✓ Artist signature missing/fake
    ✓ Significant condition misrepresentation
    ✓ COA authenticity failed
    ✓ Severe damage affecting display
    ✓ Provenance falsified
    
    INVALID reasons:
    ✗ Minor cosmetic defects
    ✗ Color/finish differences
    ✗ Age-appropriate wear
    ✗ Documentation incomplete (disclosed)
    ✗ Personal aesthetic preference

═══════════════════════════════════════════════════════════════════════════
  `,
};

// ═══════════════════════════════════════════════════════════════════
// CONTRACT GENERATION SERVICE
// ═══════════════════════════════════════════════════════════════════

export class ContractGenerationEngine {
  
  /**
   * MAIN: Generate contract from form data
   */
  // ═══════════════════════════════════════════════════════════════════
  // CONTRACT GENERATION
  // ═══════════════════════════════════════════════════════════════════

  static async generateContract(formData: ContractFormData): Promise<GeneratedContract> {
    try {
      // Step 1: Validate input data
      const validation = this.validateFormData(formData);
      if (!validation.is_valid) {
        throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
      }
      
      // Step 2: Enrich with auto-fetched fields
      const enrichedData = await this.enrichFormData(formData);
      
      // Step 3: Load master template and append annexure section
      let contractText = MASTER_ESCROW_AGREEMENT;
      const annexureSection = ANNEXURE_SECTIONS[formData.annexure_code as keyof typeof ANNEXURE_SECTIONS];
      console.log(`📎 Loading annexure ${formData.annexure_code}: ${annexureSection ? '✅ Found' : '❌ Not found'}`);
      if (annexureSection) {
        contractText += annexureSection;
        console.log(`✅ Annexure ${formData.annexure_code} appended to master agreement`);
      } else {
        console.warn(`⚠️ Annexure ${formData.annexure_code} not found in ANNEXURE_SECTIONS`);
      }
      
      // Step 5: Replace ALL placeholders
      const { populated_text, placeholder_count, populated_count, missing_fields } = 
        this.replacePlaceholders(contractText, enrichedData);
      
      // Step 6: Validate completeness
      const is_valid = missing_fields.length === 0;
      
      // Step 7: Convert to HTML for display
      const contract_html = this.convertToHTML(populated_text);
      
      // Step 8: Generate contract ID & hash
      const contract_id = `${formData.transaction_id}-V1`;
      const contract_hash_sha256 = await this.hashContract(populated_text);
      
      // Step 9: Store contract to database
      await this.storeContractToDB(
        formData.transaction_id,
        contract_id,
        populated_text,
        contract_hash_sha256,
        is_valid,
        { id: formData.seller_id, name: formData.seller_name, email: formData.seller_email }, // seller data
        { id: formData.buyer_id, name: formData.buyer_name, email: formData.buyer_email }, // buyer data
        formData.product_category,
        formData.annexure_code,
        contract_html,
        placeholder_count,
        populated_count,
        missing_fields
      );
      
      // Step 10: Return generated contract
      return {
        contract_id,
        contract_html,
        contract_text: populated_text,
        placeholder_count,
        populated_count,
        missing_fields,
        is_valid,
        generated_at: new Date().toISOString(),
      };
      
    } catch (error) {
      console.error('Contract generation failed:', error);
      throw error;
    }
  }
  
  /**
   * Validate all required fields are present
   * FLEXIBLE VALIDATION: Allows for field name variations and optional fields
   */
  static validateFormData(formData: ContractFormData): { is_valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Core required fields (minimal validation)
    const coreRequired = [
      'transaction_id', 'seller_name', 'buyer_name'
    ];
    
    coreRequired.forEach(field => {
      if (!formData[field as keyof ContractFormData]) {
        errors.push(`Missing required field: ${field}`);
      }
    });
    
    // Optional but encouraged fields - check for alternatives
    // Brand field (can be brand, manufacturer, maker, etc.)
    const brandField = (formData as any).brand || 
                       (formData as any).manufacturer || 
                       (formData as any).maker;
    if (!brandField) {
      console.warn('⚠️ Brand/Manufacturer not provided - optional field');
    }
    
    // Serial number field (can have various names)
    const serialField = (formData as any).serial_number || 
                        (formData as any).imei || 
                        (formData as any).serial ||
                        (formData as any).device_id;
    if (!serialField) {
      console.warn('⚠️ Serial number/IMEI not provided - optional field');
    }
    
    // Condition category (can be condition_category, condition, item_condition, etc.)
    const conditionField = (formData as any).condition_category || 
                           (formData as any).condition || 
                           (formData as any).item_condition;
    if (!conditionField) {
      console.warn('⚠️ Condition not provided - optional field');
    }
    
    // Price field (can be sale_price, price, amount, etc.)
    const priceField = (formData as any).sale_price || 
                       (formData as any).price || 
                       (formData as any).amount ||
                       (formData as any).bid_price;
    if (!priceField) {
      console.warn('⚠️ Price/Amount not provided - optional field');
    }
    
    // Delivery method (can be delivery_method, delivery_mode, shipping_method, etc.)
    const deliveryMethodField = (formData as any).delivery_method || 
                                (formData as any).delivery_mode || 
                                (formData as any).shipping_method;
    if (!deliveryMethodField) {
      console.warn('⚠️ Delivery method not provided - optional field');
    }
    
    // Delivery address (can be delivery_address, shipping_address, address, etc.)
    const deliveryAddressField = (formData as any).delivery_address || 
                                 (formData as any).shipping_address || 
                                 (formData as any).address;
    if (!deliveryAddressField) {
      console.warn('⚠️ Delivery address not provided - optional field');
    }
    
    // Check for product name (can be product_name, model_name, item_title, book_title, etc. depending on category)
    const productNameField = formData.product_name || 
                              (formData as any).model_name || 
                              (formData as any).item_title || 
                              (formData as any).book_title ||
                              (formData as any).item_name ||
                              (formData as any).product_title;
    if (!productNameField) {
      console.warn('⚠️ Product name not provided - optional field');
    }
    
    // Category-specific validation (make optional as well)
    if (formData.product_category === 'electronics' || formData.product_category === 'mobile') {
      if (!(formData as any).battery_health_percent) {
        console.warn('⚠️ Battery health percent not provided for electronics/mobile - optional');
      }
    }
    
    if (formData.product_category === 'furniture') {
      const hasLength = (formData as any).length_cm || (formData as any).length;
      const hasBreadth = (formData as any).breadth_cm || (formData as any).breadth || (formData as any).width;
      const hasHeight = (formData as any).height_cm || (formData as any).height;
      if (!hasLength || !hasBreadth || !hasHeight) {
        console.warn('⚠️ Furniture dimensions not fully provided - optional');
      }
    }
    
    if (formData.product_category === 'vehicles') {
      if (!(formData as any).registration_number || !(formData as any).chassis_number) {
        console.warn('⚠️ Vehicle registration/chassis numbers not provided - optional');
      }
    }
    
    return {
      is_valid: errors.length === 0,
      errors
    };
  }
  
  /**
   * Enrich form data with auto-fetched fields
   */
  /**
   * Helper: Flatten JSONB grouped data into flat key-value pairs
   * Also maps common field name variations to contract template field names
   * Converts: { technical_specs: { ram: 8, storage: 256 } } → { ram: 8, storage: 256 }
   */
  static flattenJSONBData(data: any): Record<string, any> {
    const flattened: Record<string, any> = {};
    
    // Field name mappings for common variations
    const fieldMappings: Record<string, string> = {
      'scratches': 'scratches_present',
      'dents': 'dents_present',
      'back_dents': 'dents_present',
      'battery_health_percentage': 'battery_health_percent',
      'battery_cycle_count': 'battery_cycle_count_percent',
      'power_on': 'power_on_working',
      'turns_on': 'power_on_working',
      'charging_working': 'charging_working',
      'charges': 'charging_working',
      'imei': 'imei_1',
      'imei1': 'imei_1',
      'imei2': 'imei_2',
      'condition': 'condition_category',
    };
    
    Object.keys(data || {}).forEach(key => {
      const value = data[key];
      
      // If value is a plain object (likely JSONB data), flatten it
      if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
        // Merge all keys from nested object into flattened result
        Object.keys(value).forEach(nestedKey => {
          // Apply field name mapping if available
          const mappedKey = fieldMappings[nestedKey] || nestedKey;
          flattened[mappedKey] = value[nestedKey];
          
          // Also keep original key as fallback
          if (mappedKey !== nestedKey) {
            flattened[nestedKey] = value[nestedKey];
          }
        });
      } else {
        // Keep primitive values as-is, with mapping
        const mappedKey = fieldMappings[key] || key;
        flattened[mappedKey] = value;
        
        // Also keep original key as fallback
        if (mappedKey !== key) {
          flattened[key] = value;
        }
      }
    });
    
    return flattened;
  }

  /**
   * Normalize form data from database (already in flat structure)
   * Maps stored database columns to contract template field names
   * The form_submissions table stores data with canonical names like:
   * - scratches_present (not scratches or back_dents)
   * - dents_present (not dents or back_dents)
   * - battery_health_percent (not battery_health_percentage)
   * - imei (not imei_1 or imei1) for first IMEI
   * - imei_2 (not imei2) for second IMEI
   */
  static normalizeFormDataFromDatabase(dbData: any): Record<string, any> {
    const normalized: Record<string, any> = {};
    
    // First, copy all direct column fields (non-JSONB)
    Object.keys(dbData || {}).forEach(key => {
      const value = dbData[key];
      
      // Skip JSONB fields for now - we'll flatten them below
      if (key === 'technical_specs' || key === 'identification_data' || key === 'condition_data' || 
          key === 'functionality_data' || key === 'measurements' || key === 'material_data' || 
          key === 'accessories_data' || key === 'warranty_legal_data' || key === 'documentation_data' || 
          key === 'usage_history_data' || key === 'media_files' || key === 'buyer_requirements' || 
          key === 'category_specific_data' || key === 'delivery_data') {
        return; // Skip JSONB, handle separately below
      }
      
      // Map IMEI fields: database stores 'imei' but contract template expects variations
      if (key === 'imei' && value) {
        normalized.imei_1 = value;
        normalized.imei = value; // Keep both for compatibility
      } else if (key === 'imei_2' && value) {
        normalized.imei_2 = value;
      } else if (value !== null && value !== undefined) {
        // All other direct fields are stored with correct names already
        normalized[key] = value;
      }
    });
    
    // Now flatten all JSONB objects - extract nested fields to root level
    console.log('📦 FLATTENING JSONB FIELDS FROM DATABASE:');
    
    const jsonbFields = [
      'technical_specs',
      'identification_data',
      'condition_data',
      'functionality_data',
      'measurements',
      'material_data',
      'accessories_data',
      'warranty_legal_data',
      'documentation_data',
      'usage_history_data',
      'media_files',
      'buyer_requirements',
      'category_specific_data',
      'delivery_data'
    ];
    
    jsonbFields.forEach(jsonbKey => {
      const jsonbValue = dbData[jsonbKey];
      if (jsonbValue && typeof jsonbValue === 'object') {
        console.log(`   📂 Flattening ${jsonbKey}:`, jsonbValue);
        Object.entries(jsonbValue).forEach(([nestedKey, nestedValue]) => {
          if (nestedValue !== null && nestedValue !== undefined) {
            normalized[nestedKey] = nestedValue;
            // Log important condition fields
            if (jsonbKey === 'condition_data' && (nestedKey.includes('scratch') || nestedKey.includes('dent') || 
                                                    nestedKey.includes('battery') || nestedKey.includes('damage'))) {
              console.log(`      ✅ ${nestedKey}: ${nestedValue}`);
            }
          }
        });
      }
    });
    
    console.log('🔍 NORMALIZED DATABASE FIELDS:');
    console.log('   - imei_1:', normalized.imei_1);
    console.log('   - imei_2:', normalized.imei_2);
    console.log('   - scratches:', normalized.scratches || normalized.scratches_present);
    console.log('   - dents:', normalized.dents || normalized.dents_present);
    console.log('   - warranty_info:', normalized.warranty_info);
    console.log('   - item_type:', normalized.item_type);
    console.log('   - size:', normalized.size);
    console.log('   - color:', normalized.color);
    console.log('   - material_composition:', normalized.material_composition);
    console.log('   Total flattened fields:', Object.keys(normalized).length);
    
    return normalized;
  }

  static async enrichFormData(formData: ContractFormData): Promise<ContractFormData> {
    const now = new Date();
    const contractId = `${formData.transaction_id}-${now.getTime()}`;
    
    console.log('📊 ENRICH FORM DATA STARTED');
    console.log('   Input formData keys:', Object.keys(formData).length);
    
    // Log seller/buyer profile data received
    console.log('👤 SELLER DATA IN ENRICH:');
    console.log('   - seller_name:', formData.seller_name);
    console.log('   - seller_id:', formData.seller_id);
    console.log('   - seller_email:', formData.seller_email);
    console.log('   - seller_phone:', formData.seller_phone);
    console.log('   - seller_address:', formData.seller_address);
    console.log('   - seller_pan:', formData.seller_pan);
    console.log('   - seller_gst:', formData.seller_gst);
    console.log('   - seller_city:', (formData as any).seller_city);
    console.log('   - seller_state:', (formData as any).seller_state);
    console.log('   - seller_pincode:', (formData as any).seller_pincode);
    
    console.log('👤 BUYER DATA IN ENRICH:');
    console.log('   - buyer_name:', formData.buyer_name);
    console.log('   - buyer_id:', formData.buyer_id);
    console.log('   - buyer_email:', formData.buyer_email);
    console.log('   - buyer_phone:', formData.buyer_phone);
    console.log('   - buyer_address:', formData.buyer_address);
    console.log('   - buyer_pan:', formData.buyer_pan);
    console.log('   - buyer_gst:', formData.buyer_gst);
    console.log('   - buyer_city:', (formData as any).buyer_city);
    console.log('   - buyer_state:', (formData as any).buyer_state);
    console.log('   - buyer_pincode:', (formData as any).buyer_pincode);
    
    console.log('   Checking for pre-enriched fields:');
    console.log('     - scratches_present:', formData.scratches_present);
    console.log('     - dents_present:', formData.dents_present);
    console.log('     - battery_health_percent:', formData.battery_health_percent);
    console.log('     - power_on_working:', formData.power_on_working);
    console.log('     - charging_working:', formData.charging_working);
    console.log('     - imei (raw from DB):', (formData as any).imei);
    
    // Try to fetch seller profile from database to get latest data
    let sellerProfileData: any = null;
    let buyerProfileData: any = null;
    
    try {
      if (formData.seller_id) {
        console.log('🔍 ENRICHMENT: Fetching seller profile from database with ID:', formData.seller_id);
        // Try to fetch by user_id first (the auth user ID), then by profile id if not found
        let { data: sellerData, error: sellerError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', formData.seller_id)
          .single();
        
        // If not found by user_id, try by id (profile UUID)
        if (sellerError) {
          console.log('⚠️ ENRICHMENT: Not found by user_id, trying by profile id...');
          const { data: sellerDataById, error: sellerErrorById } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', formData.seller_id)
            .single();
          if (!sellerErrorById && sellerDataById) {
            sellerData = sellerDataById;
            sellerError = null;
          } else {
            sellerError = sellerErrorById;
          }
        }
        
        if (!sellerError && sellerData) {
          sellerProfileData = sellerData;
          console.log('✅ ENRICHMENT: Seller profile fetched from database:', sellerProfileData);
          console.log('📋 ENRICHMENT: Seller DB Fields:', {
            address: sellerProfileData.address,
            city: sellerProfileData.city,
            state: sellerProfileData.state,
            pincode: sellerProfileData.pincode,
            pan_number: sellerProfileData.pan_number,
            gst_number: sellerProfileData.gst_number
          });
        } else {
          console.log('⚠️ ENRICHMENT: Could not fetch seller profile:', sellerError?.message);
        }
      }
      
      if (formData.buyer_id) {
        console.log('🔍 ENRICHMENT: Fetching buyer profile from database with ID:', formData.buyer_id);
        // Try to fetch by user_id first (the auth user ID), then by profile id if not found
        let { data: buyerData, error: buyerError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', formData.buyer_id)
          .single();
        
        // If not found by user_id, try by id (profile UUID)
        if (buyerError) {
          console.log('⚠️ ENRICHMENT: Not found by user_id, trying by profile id...');
          const { data: buyerDataById, error: buyerErrorById } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', formData.buyer_id)
            .single();
          if (!buyerErrorById && buyerDataById) {
            buyerData = buyerDataById;
            buyerError = null;
          } else {
            buyerError = buyerErrorById;
          }
        }
        
        if (!buyerError && buyerData) {
          buyerProfileData = buyerData;
          console.log('✅ ENRICHMENT: Buyer profile fetched from database:', buyerProfileData);
          console.log('📋 ENRICHMENT: Buyer DB Fields:', {
            address: buyerProfileData.address,
            city: buyerProfileData.city,
            state: buyerProfileData.state,
            pincode: buyerProfileData.pincode,
            pan_number: buyerProfileData.pan_number,
            gst_number: buyerProfileData.gst_number
          });
        } else {
          console.log('⚠️ ENRICHMENT: Could not fetch buyer profile:', buyerError?.message);
        }
      }
    } catch (e) {
      console.warn('⚠️ ENRICHMENT: Error fetching profiles during enrichment:', e);
    }
    
    // Check if data is already enriched (contains product-specific fields)
    // Check multiple field name variations since the mapper converts field names
    const hasEnrichedFields = formData.scratches_present !== undefined || 
                              formData.dents_present !== undefined ||
                              formData.battery_health_percent !== undefined ||
                              formData.power_on_working !== undefined ||
                              (formData as any).scratches !== undefined ||
                              (formData as any).dents !== undefined ||
                              (formData as any).battery_health_percentage !== undefined ||
                              (formData as any).power_on !== undefined;
    
    console.log('   hasEnrichedFields:', hasEnrichedFields);
    
    let dbFormData: any = null;
    
    // ALWAYS fetch from database to ensure we get the canonical field names from form_submissions table
    // This is critical because the mapper converts field names during save
    try {
      console.log('📥 Fetching complete form submission data from form_submissions table...');
      const { data: submissionData, error } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('transaction_id', formData.transaction_id)
        .maybeSingle();
      
      if (!error && submissionData) {
        // Map database data to canonical field names used by contract template
        // The database stores canonical names like: scratches_present, dents_present, battery_health_percent, etc.
        dbFormData = this.normalizeFormDataFromDatabase(submissionData);
        console.log('📋 Fetched form submission from database (RAW):', submissionData);
        console.log('📋 After normalization:', dbFormData);
        console.log('🔍 Normalized fields available:', Object.keys(dbFormData).filter(k => k.includes('scratch') || k.includes('dent') || k.includes('battery') || k.includes('power') || k.includes('charging') || k.includes('imei')));
      } else {
        console.log('⚠️ No form submission found in database or error:', error?.message);
        // Still use passed formData as fallback if no DB record exists
      }
    } catch (e) {
      console.warn('⚠️ Could not fetch form submission from database, using passed formData:', e);
    }
    
    // Use database values if available, otherwise fall back to passed formData
    const actualPrice = dbFormData?.sale_price || dbFormData?.price || formData.sale_price || 0;
    const inspectionWindowHours = dbFormData?.inspection_window_hours || formData.inspection_window_hours;
    
    // Calculate escrow & fees based on actual price
    const grossAmount = actualPrice;
    const platformFeePercentage = 1; // 1% fee
    const platformFee = Math.ceil(grossAmount * (platformFeePercentage / 100));
    const escrowAmount = grossAmount; // Full amount held as escrow, platform fee is separate
    
    // Determine inspection window based on category if not already set
    const inspectionWindows = {
      electronics: 24,
      mobile: 24,
      laptop: 24,
      furniture: 6,
      vehicles: 2, // at handover
      'fashion-apparel': 24,
      jewellery: 2, // high-value, quick inspection
      building_material: 6,
      collectibles: 2,
      industrial: 12,
      books: 6,
      art: 6,
    };
    
    const inspectionWindow = inspectionWindowHours || 
      inspectionWindows[formData.product_category as keyof typeof inspectionWindows] || 24;
    
    // Merge database data with form data - database data takes precedence for product details
    // Also merge freshly fetched seller/buyer profiles to override with latest data
    const mergedData = {
      ...formData,
      ...(dbFormData || {}),
      
      // Override with freshly fetched seller profile data if available
      ...(sellerProfileData ? {
        seller_address: sellerProfileData.address || 'Address not provided',
        seller_city: sellerProfileData.city || 'City not provided',
        seller_state: sellerProfileData.state || 'State not provided',
        seller_pincode: sellerProfileData.pincode || 'Pincode not provided',
        seller_pan: sellerProfileData.pan_number || 'PAN not provided',
        seller_gst: sellerProfileData.gst_number || 'GST not provided',
        seller_email: sellerProfileData.email || formData.seller_email,
      } : {
        seller_address: formData.seller_address || 'Address not provided',
        seller_city: formData.seller_city || 'City not provided',
        seller_state: formData.seller_state || 'State not provided',
        seller_pincode: formData.seller_pincode || 'Pincode not provided',
        seller_pan: formData.seller_pan || 'PAN not provided',
        seller_gst: formData.seller_gst || 'GST not provided',
      }),
      
      // Override with freshly fetched buyer profile data if available
      ...(buyerProfileData ? {
        buyer_address: buyerProfileData.address || 'Address not provided',
        buyer_city: buyerProfileData.city || 'City not provided',
        buyer_state: buyerProfileData.state || 'State not provided',
        buyer_pincode: buyerProfileData.pincode || 'Pincode not provided',
        buyer_pan: buyerProfileData.pan_number || 'PAN not provided',
        buyer_gst: buyerProfileData.gst_number || 'GST not provided',
        buyer_email: buyerProfileData.email || formData.buyer_email,
      } : {
        buyer_address: formData.buyer_address || 'Address not provided',
        buyer_city: formData.buyer_city || 'City not provided',
        buyer_state: formData.buyer_state || 'State not provided',
        buyer_pincode: formData.buyer_pincode || 'Pincode not provided',
        buyer_pan: formData.buyer_pan || 'PAN not provided',
        buyer_gst: formData.buyer_gst || 'GST not provided',
      }),
      
      sale_price: actualPrice,
      contract_generated_at: now.toISOString(),
      contract_id: contractId,
      escrow_amount: escrowAmount,
      platform_fee: platformFee,
      platform_fee_percentage: platformFeePercentage,
      gross_amount: grossAmount,
      inspection_window_hours: inspectionWindow,
      seller_device_id: 'SYSTEM_GENERATED',
      seller_ip_address: 'SYSTEM_RECORDED',
      buyer_device_id: 'SYSTEM_GENERATED',
      buyer_ip_address: 'SYSTEM_RECORDED',
      payment_aggregator_name: 'Bharose Pe',
      escrow_payment_reference: `ESCROW_ACCOUNT_${formData.transaction_id}`,
      arbitration_seat: 'Hyderabad, Telangana',
    };
    
    console.log('✅ Enriched form data COMPLETED');
    console.log('📋 ENRICHMENT: Final seller data merged:');
    console.log('   - seller_address:', mergedData['seller_address']);
    console.log('   - seller_city:', mergedData['seller_city']);
    console.log('   - seller_state:', mergedData['seller_state']);
    console.log('   - seller_pincode:', mergedData['seller_pincode']);
    console.log('   - seller_pan:', mergedData['seller_pan']);
    console.log('   - seller_gst:', mergedData['seller_gst']);
    
    console.log('📋 ENRICHMENT: Final buyer data merged:');
    console.log('   - buyer_address:', mergedData['buyer_address']);
    console.log('   - buyer_city:', mergedData['buyer_city']);
    console.log('   - buyer_state:', mergedData['buyer_state']);
    console.log('   - buyer_pincode:', mergedData['buyer_pincode']);
    console.log('   - buyer_pan:', mergedData['buyer_pan']);
    console.log('   - buyer_gst:', mergedData['buyer_gst']);
    
    console.log('📋 ENRICHMENT: Product & Contract Data merged:');
    console.log('   - product_title:', mergedData['product_title']);
    console.log('   - product_brand:', mergedData['product_brand']);
    console.log('   - product_description:', mergedData['product_description']);
    console.log('   - warranty_info:', mergedData['warranty_info']);
    console.log('   - return_policy:', mergedData['return_policy']);
    console.log('   - delivery_mode:', mergedData['delivery_mode']);
    
    console.log('🔍 Final merged data - product fields:');
    console.log('   - scratches_present:', mergedData['scratches_present']);
    console.log('   - dents_present:', mergedData['dents_present']);
    console.log('   - battery_health_percent:', mergedData['battery_health_percent']);
    console.log('   - power_on_working:', mergedData['power_on_working']);
    console.log('   - charging_working:', mergedData['charging_working']);
    console.log('   - imei_1:', mergedData['imei_1']);
    console.log('   - condition_category:', mergedData['condition_category']);
    
    // FLATTEN JSONB FIELDS in mergedData if they exist
    // This ensures that nested JSONB fields are accessible at root level for template placeholders
    console.log('📦 FLATTENING JSONB FIELDS IN MERGED DATA:');
    const jsonbFieldsToFlatten = [
      'technical_specs',
      'identification_data',
      'condition_data',
      'functionality_data',
      'measurements',
      'material_data',
      'accessories_data',
      'warranty_legal_data',
      'documentation_data',
      'usage_history_data',
      'delivery_data'
    ];
    
    jsonbFieldsToFlatten.forEach(jsonbKey => {
      const jsonbValue = mergedData[jsonbKey];
      if (jsonbValue && typeof jsonbValue === 'object' && !Array.isArray(jsonbValue)) {
        console.log(`   📂 Flattening ${jsonbKey}...`);
        Object.entries(jsonbValue).forEach(([nestedKey, nestedValue]) => {
          if (nestedValue !== null && nestedValue !== undefined) {
            // Only set if not already present at root level (don't override existing root fields)
            if (!(nestedKey in mergedData)) {
              mergedData[nestedKey] = nestedValue;
            }
          }
        });
      }
    });
    
    console.log('✅ JSONB fields flattened into root level');
    
    return mergedData as ContractFormData;
  }
  
  /**
   * Replace all {{placeholders}} with actual data
   */
  static replacePlaceholders(
    template: string,
    data: ContractFormData
  ): { populated_text: string; placeholder_count: number; populated_count: number; missing_fields: string[] } {
    
    let populatedText = template;
    const placeholders = template.match(/\{\{[^}]+\}\}/g) || [];
    const uniquePlaceholders = [...new Set(placeholders)];
    let populatedCount = 0;
    const missing_fields: string[] = [];
    
    // Log condition fields at start of replacement
    console.log('🔍 REPLACEPLCEHOLDERS: Starting replacement with condition fields:');
    console.log('   - scratches_present:', data['scratches_present']);
    console.log('   - dents_present:', data['dents_present']);
    console.log('   - battery_health_percent:', data['battery_health_percent']);
    console.log('   - power_on_working:', data['power_on_working']);
    console.log('   - charging_working:', data['charging_working']);
    console.log('   - imei_1:', data['imei_1']);
    
    // Create a map of all possible field variations for fallback lookup
    const fieldVariations: Record<string, string[]> = {
      // Party Information
      'product_title': ['product_title', 'product_name', 'item_title', 'item_name', 'book_title'],
      'product_brand': ['product_brand', 'brand', 'make'],
      'product_description': ['product_description', 'description'],
      'seller_full_name': ['seller_full_name', 'seller_name'],
      'buyer_full_name': ['buyer_full_name', 'buyer_name'],
      'seller_user_id': ['seller_user_id', 'seller_id'],
      'buyer_user_id': ['buyer_user_id', 'buyer_id'],
      'seller_phone': ['seller_phone', 'seller_contact', 'phone'],
      'buyer_phone': ['buyer_phone', 'buyer_contact'],
      'seller_address': ['seller_address', 'address'],
      'buyer_address': ['buyer_address'],
      'seller_city': ['seller_city', 'city'],
      'buyer_city': ['buyer_city'],
      'seller_state': ['seller_state', 'state'],
      'buyer_state': ['buyer_state'],
      'seller_pincode': ['seller_pincode', 'pincode', 'postal_code'],
      'buyer_pincode': ['buyer_pincode', 'postal_code'],
      'seller_pan_number': ['seller_pan_number', 'seller_pan', 'pan_number', 'pan'],
      'buyer_pan_number': ['buyer_pan_number', 'buyer_pan', 'pan'],
      'seller_gst_number': ['seller_gst_number', 'seller_gst', 'gst_number', 'gst'],
      'buyer_gst_number': ['buyer_gst_number', 'buyer_gst', 'gst'],
      'seller_email': ['seller_email', 'email'],
      'buyer_email': ['buyer_email'],
      
      // Electronics & Mobile Condition Fields
      'scratches_present': ['scratches_present', 'scratches'],
      'dents_present': ['dents_present', 'dents', 'back_dents'],
      'battery_health_percent': ['battery_health_percent', 'battery_health_percentage'],
      'power_on_working': ['power_on_working', 'power_on', 'turns_on'],
      'charging_working': ['charging_working', 'charges'],
      'imei_1': ['imei_1', 'imei1', 'imei'],
      
      // Contract & Delivery Fields
      'warranty_info': ['warranty_info', 'warranty_status', 'warranty'],
      'return_policy': ['return_policy', 'returns_policy'],
      'inspection_window_hours': ['inspection_window_hours', 'inspection_window'],
      'expected_delivery_date': ['expected_delivery_date', 'delivery_date', 'dispatch_date'],
      
      // FASHION & APPAREL SPECIFIC FIELD MAPPINGS
      // Apparel Specifications
      'item_type': ['item_type', 'item_name', 'product_name'],
      'size': ['size', 'size_label', 'declared_size'],
      'color': ['color', 'item_color'],
      'material_composition': ['material_composition', 'fabric_composition'],
      'design_pattern': ['design_pattern', 'pattern'],
      'fit_type': ['fit_type', 'fit_note'],
      'sleeve_length': ['sleeve_length'],
      'product_code': ['product_code', 'sku'],
      
      // Condition Disclosure
      'condition_category': ['condition_category', 'condition'],
      'wear_level': ['wear_level', 'wear_status'],
      'stains_marks': ['stains_marks', 'stains_present'],
      'odor_present': ['odor_present', 'odor'],
      'loose_buttons': ['loose_buttons', 'button_condition'],
      'seam_issues': ['seam_issues', 'seam_condition'],
      'zipper_status': ['zipper_status', 'zipper_button_condition'],
      'hemming_done': ['hemming_done', 'hemmed'],
      'alterations_made': ['alterations_made', 'alterations'],
      'manufacturing_defects': ['manufacturing_defects', 'defect_description'],
      'rips_tears': ['rips_tears', 'holes_tears'],
      'holes_present': ['holes_present', 'holes_tears'],
      'color_run': ['color_run', 'color_bleeding'],
      'thread_issues': ['thread_issues', 'stitching_issues'],
      
      // Care & Washing
      'wash_status': ['wash_status', 'washed', 'wash_count'],
      'washing_instructions': ['washing_instructions', 'care_instructions'],
      'dry_clean_only': ['dry_clean_only', 'dry_clean'],
      'special_care_required': ['special_care_required', 'special_care'],
      'detergent_type': ['detergent_type', 'detergent'],
      
      // Authenticity
      'authenticity_status': ['authenticity_status', 'authenticity_guaranteed'],
      'tags_present': ['tags_present', 'brand_tags_present'],
      'care_label_present': ['care_label_present', 'care_label'],
      'serial_number': ['serial_number', 'product_code'],
      'auth_certificate_provided': ['auth_certificate_provided', 'certificate_available'],
      
      // Size & Fit Details
      'declared_size': ['declared_size', 'size_label', 'size'],
      'actual_size': ['actual_size', 'measured_size'],
      'length_inches': ['length_inches', 'length_cm'],
      'chest_bust_inches': ['chest_bust_inches', 'chest_cm'],
      'waist_inches': ['waist_inches', 'waist_cm'],
      'sleeves_inches': ['sleeves_inches', 'sleeve_length'],
      'fit_note': ['fit_note', 'fit_type'],
      
      // Material & Quality
      'material_type': ['material_type', 'primary_material'],
      'fabric_type': ['fabric_type', 'material_type'],
      'purity': ['purity', 'material_purity'],
      'grade_quality': ['grade_quality', 'quality'],
    };
    
    // Replace each placeholder
    uniquePlaceholders.forEach(placeholder => {
      const fieldName = placeholder.replace(/[{}]/g, '');
      let value = data[fieldName as keyof ContractFormData];
      
      // If value is not found, try field variations
      if ((value === '' || value === null || value === undefined) && fieldVariations[fieldName]) {
        for (const variation of fieldVariations[fieldName]) {
          const varValue = data[variation as keyof ContractFormData];
          if (varValue !== undefined && varValue !== null && varValue !== '') {
            value = varValue;
            console.log(`✅ Found field variation for ${fieldName}: using ${variation} = ${value}`);
            break;
          }
        }
      }
      
      // Log problematic fields for debugging
      if (fieldName.includes('scratch') || fieldName.includes('dent') || fieldName.includes('battery') || 
          fieldName.includes('power') || fieldName.includes('charging') || fieldName.includes('imei')) {
        console.log(`🔍 Placeholder: ${placeholder}, FieldName: ${fieldName}, Value: ${value}, Type: ${typeof value}`);
      }
      
      if (value === '' || value === null || value === undefined) {
        missing_fields.push(fieldName);
        console.log(`❌ Missing field: ${fieldName}`);
      } else {
        populatedText = populatedText.replace(
          new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          String(value)
        );
        populatedCount++;
      }
    });
    
    console.log(`✅ Replacement complete: ${populatedCount}/${uniquePlaceholders.length} placeholders replaced`);
    console.log(`❌ Missing ${missing_fields.length} fields:`, missing_fields);
    
    return {
      populated_text: populatedText,
      placeholder_count: uniquePlaceholders.length,
      populated_count: populatedCount,
      missing_fields
    };
  }
  
  /**
   * Convert contract text to HTML for display
   */
  static convertToHTML(contractText: string): string {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .contract { max-width: 900px; margin: 0 auto; padding: 20px; }
        h1 { text-align: center; font-size: 18px; font-weight: bold; }
        h2 { font-size: 14px; font-weight: bold; margin-top: 20px; }
        .section { margin-bottom: 20px; }
        .field { display: flex; margin: 8px 0; }
        .field-name { font-weight: bold; min-width: 200px; }
        pre { background: #f4f4f4; padding: 10px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <div class="contract">
        <pre>${contractText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
      </div>
    </body>
    </html>
    `;
    return html;
  }
  
  /**
   * Hash contract for integrity verification
   */
  static async hashContract(contractText: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(contractText);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  
  /**
   * Store generated contract to contracts table (data appears in v_contract_details view)
   */
  static async storeContractToDB(
    transactionId: string,
    contractId: string,
    contractText: string,
    contractHash: string,
    isValid: boolean,
    sellerData?: any,
    buyerData?: any,
    productCategory?: string,
    annexureCode?: string,
    contractHtml?: string,
    placeholderCount?: number,
    populatedCount?: number,
    missingFields?: string[]
  ): Promise<void> {
    try {
      console.log('💾 Storing generated contract to database...');
      
      // Since the contracts table has a broken trigger, we'll try storing in a simpler table
      // Try the contracts table first, but with absolute minimal fields
      
      const contractData = {
        transaction_id: transactionId,
        contract_content: contractText,
        terms: `Generated contract using annexure ${annexureCode || 'N/A'}`,
        status: 'draft'
      };

      console.log('📋 Attempting to insert contract...');
      
      const { error: insertError } = await supabase
        .from('contracts')
        .insert([contractData]);

      if (insertError) {
        // If contracts table fails, try generated_contracts
        console.warn('⚠️ contracts table insert failed, trying generated_contracts table...', insertError?.message);
        
        let { error: altError } = await supabase
          .from('generated_contracts')
          .insert([{
            transaction_id: transactionId,
            contract_content: contractText,
            status: 'draft',
            seller_id: sellerData?.id,
            buyer_id: buyerData?.id,
            master_template_id: null  // Make master_template_id optional
          }]);
        
        // If generated_contracts fails, try the new contract_storage table
        if (altError) {
          console.warn('⚠️ generated_contracts failed, trying contract_storage table...', altError?.message);
          
          // Try without transaction_id as a foreign key - just insert the contract data
          const { error: storageError } = await supabase
            .from('contract_storage')
            .insert([{
              transaction_id: transactionId,
              contract_content: contractText,
              terms: `Generated contract using annexure ${annexureCode || 'N/A'}`,
              status: 'draft'
            }]);
          
          if (storageError) {
            console.warn('⚠️ contract_storage table also failed, using localStorage as fallback...', storageError?.message);
            
            // Final fallback: store in localStorage
            try {
              const contractsStore = JSON.parse(localStorage.getItem('generated_contracts') || '[]');
              contractsStore.push({
                transaction_id: transactionId,
                contract_content: contractText,
                terms: `Generated contract using annexure ${annexureCode || 'N/A'}`,
                status: 'draft',
                created_at: new Date().toISOString(),
                seller_id: sellerData?.id,
                buyer_id: buyerData?.id
              });
              localStorage.setItem('generated_contracts', JSON.stringify(contractsStore));
              console.log('✅ Contract stored in localStorage (browser cache)');
              return;
            } catch (localStorageError) {
              console.error('❌ All storage methods failed:', storageError);
              throw storageError; // Throw the original database error
            }
          }
          
          console.log('✅ Contract stored in contract_storage table');
          return;
        }
        
        console.log('✅ Contract stored in generated_contracts table');
        return;
      }

      console.log('✅ Contract stored successfully in contracts table');
      
    } catch (error) {
      console.error('Failed to store contract:', error);
      throw error;
    }
  }
}

export default ContractGenerationEngine;
