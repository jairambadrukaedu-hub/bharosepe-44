/**
 * ANNEXURE B — MOBILE PHONES & LAPTOPS ADDENDUM
 * 
 * Specific terms and conditions for transactions involving:
 * - Smartphones (iPhone, Android)
 * - Laptops
 * - Tablets
 * - Desktop Computers
 * 
 * This annexure supplements the Master Goods Sale & Escrow Agreement
 * In case of conflict, this Annexure prevails for mobile/laptop transactions
 */

export const ANNEXURE_B = `
═══════════════════════════════════════════════════════════════════════════════════
ANNEXURE B — MOBILE PHONES, LAPTOPS & COMPUTING DEVICES
═══════════════════════════════════════════════════════════════════════════════════

Applicable to: Smartphones, Tablets, Laptops, Desktop Computers

This Annexure provides specific terms for transactions involving mobile and computing
devices. In case of any conflict between the Master Agreement and this Annexure,
the terms in this Annexure shall prevail for mobile/laptop transactions.

═══════════════════════════════════════════════════════════════════════════════════
1. DEVICE IDENTIFICATION & SPECIFICATIONS
═══════════════════════════════════════════════════════════════════════════════════

DEVICE DETAILS:
  Device Type: {{device_type}}
  Brand: {{brand}}
  Model Name: {{model_name}}
  Color: {{color}}
  Variant: {{variant_ram_storage}}
  Serial Number: {{serial_number}}
  IMEI 1: {{imei1}}
  IMEI 2: {{imei2}}

DEVICE SPECIFICATIONS:
  Processor: {{processor}}
  RAM: {{ram}}
  Storage: {{storage_details}}
  Graphics Card: {{graphics_card}}
  Battery Capacity: {{battery_capacity}}
  Manufactured Year: {{manufactured_year}}
  Purchase Date: {{purchase_date}}

═══════════════════════════════════════════════════════════════════════════════════
2. SECURITY & LOCK STATUS (CRITICAL - MUST BE OFF FOR SALE)
═══════════════════════════════════════════════════════════════════════════════════

MANDATORY SECURITY CLEARANCES:

✓ iCloud Lock Status (iPhones): {{icloud_lock_status}}
  → BUYER CAN ONLY ACCEPT IF: "Off"
  → If "On": Contract is VOID. Device cannot be sold.
  → Liability: SELLER bears full liability if lock is not removed before delivery

✓ Google FRP Lock Status (Android): {{google_frp_lock}}
  → BUYER CAN ONLY ACCEPT IF: "Off"
  → If "On": Contract is VOID. Device cannot be sold.
  → Liability: SELLER bears full liability if lock is not removed before delivery

✓ MI Account Lock (Xiaomi): {{mi_account_lock}}
  → If "On": Buyer must accept explicitly or reject transaction
  → Seller must provide account credentials for removal

✓ Device Resettable: {{can_device_be_reset}}
  → CRITICAL: Device MUST be resettable to factory settings
  → If NO: Buyer can dispute immediately during inspection window

✓ BIOS Lock (Laptops): {{bios_lock}}
  → If YES: Seller must provide BIOS password to Buyer
  → Buyer can verify BIOS unlock during inspection

✓ OS Activation Status: {{os_activation_status}}
  → For Windows laptops: Must be activated or Buyer can claim misrepresentation
  → For macOS/Linux: Not applicable

═══════════════════════════════════════════════════════════════════════════════════
3. CONDITION ASSESSMENT (HIGH-RISK - DISPUTES COMMON)
═══════════════════════════════════════════════════════════════════════════════════

PHYSICAL CONDITION:
  ✓ Scratches Present: {{scratches_present}}
  ✓ Back Dents: {{back_dents}}
  ✓ Screen Condition: {{screen_condition}}
  ✓ Cracks: {{cracks_present}}
  ✓ Spots/Lines on Screen: {{spots_lines}}
  ✓ Touch Issues: {{touch_issues}}
  ✓ Heating Issues: {{heating_issues}}
  ✓ Speaker/Mic Issues: {{speaker_mic_issues}}
  ✓ Network Issues: {{network_issues}}
  ✓ Camera Issues: {{camera_issues}}
  ✓ Charging Port Issues: {{charging_port_issues}}
  ✓ RAM/SSD Upgraded: {{ram_ssd_upgraded}}

BATTERY HEALTH:
  ✓ Battery Health %: {{battery_health_percentage}}%
  ✓ Battery Health (iPhone): {{battery_health_iphone}}%
  ✓ Battery Backup Duration: {{backup_duration_hours}} hours
  ✓ Fast Charging Support: {{fast_charging_support}}
  ✓ Laptop Battery Backup: {{laptop_battery_backup}} hours
  ✓ Battery Cycle Count (MacBooks): {{battery_cycle_count}}

LAPTOP-SPECIFIC:
  ✓ Fan Noise: {{fan_noise}}
  ✓ Overheating Issues: {{overheating}}

═══════════════════════════════════════════════════════════════════════════════════
4. FUNCTIONAL TEST CHECKLIST
═══════════════════════════════════════════════════════════════════════════════════

The Seller has tested and confirmed the following features work as expected:

  ✓ Turns ON: {{turns_on}}
  ✓ Charges: {{charges}}
  ✓ Touchscreen: {{touchscreen}}
  ✓ Buttons: {{buttons}}
  ✓ WiFi/Bluetooth: {{wifi_bluetooth}}
  ✓ Fingerprint/FaceID: {{fingerprint_faceid}}
  ✓ Speaker/Mic: {{speaker_mic_functional}}
  ✓ Front/Back Camera: {{front_back_camera}}
  ✓ SIM Detection: {{sim_detection}}

BUYER INSPECTION OBLIGATION:
During the {{inspection_window_hours}} hour inspection window, the Buyer MUST test all 
above features and report any non-functioning items immediately with video evidence.

═══════════════════════════════════════════════════════════════════════════════════
5. EVIDENCE DOCUMENTATION (CRITICAL FOR DISPUTES)
═══════════════════════════════════════════════════════════════════════════════════

SELLER'S DOCUMENTATION UPLOADED:
  ✓ Photos of all disclosed issues: {{condition_issue_photos}}
  ✓ Battery health screenshots: {{battery_health_screenshots}}
  ✓ Performance test video: {{performance_test_video}}
  ✓ Benchmark screenshot: {{benchmark_screenshot}}

SELLER'S REPRESENTATION:
"The above photos/videos are authentic, timestamped, and accurately represent
the device condition. Any deviation from this condition during Buyer inspection
is NOT due to seller misrepresentation."

═══════════════════════════════════════════════════════════════════════════════════
6. DISPUTE ELIGIBILITY (Mobile-Specific Rules)
═══════════════════════════════════════════════════════════════════════════════════

VALID REASONS TO FILE A DISPUTE:

✓ SECURITY LOCKS NOT REMOVED
  → iCloud/FRP/MI locks still active on arrival
  → Device cannot be reset or setup
  → SELLER LIABLE: Full refund + return shipping

✓ CRITICAL FUNCTIONALITY FAILURE
  → Device doesn't turn on/charge
  → Screen is completely non-functional
  → Touchscreen completely unresponsive
  → Camera/speaker/mic completely dead
  → WiFi/Bluetooth completely dead

✓ MISREPRESENTED CONDITION
  → Physical damage worse than photos provided
  → Battery health significantly lower (>10% drop from claimed)
  → Hardware components genuinely different from described
  → Evidence: Timestamped unboxing video with timestamp overlay

✓ LOCKED/BLOCKED DEVICE
  → Device is blacklisted (can verify on GSMA website)
  → Reported stolen or lost
  → Insurance claim filed against it

INVALID REASONS TO FILE A DISPUTE:

✗ MINOR COSMETIC DAMAGE
  → Scratches that match seller's photos
  → Minor dust marks
  → Packaging imperfections
  → DISPUTE REJECTED: Photo evidence supports seller

✗ EXPECTED BATTERY DEGRADATION
  → Battery health lower by <5% from claimed
  → Battery backup shorter than claimed by <1 hour
  → Normal wear-related performance drop
  → DISPUTE REJECTED: Within normal range

✗ USER ERROR OR NEGLECT
  → Buyer dropped device and caused damage
  → Buyer installed incompatible software
  → Buyer didn't activate device properly
  → Buyer lost device pin/credentials
  → DISPUTE REJECTED: Not seller's liability

✗ CARRIER-LEVEL RESTRICTIONS
  → Device is locked to specific carrier (expected for carrier phones)
  → Requires activation on same carrier
  → DISPUTE REJECTED: This is normal in carrier market

✗ COSMETIC ISSUES IF DISCLOSED
  → Scratches/dents if shown in seller's photos
  → Screen lines if documented in videos
  → Discoloration if disclosed in description
  → DISPUTE REJECTED: Buyer accepted known condition

═══════════════════════════════════════════════════════════════════════════════════
7. INSPECTION WINDOW OBLIGATIONS
═══════════════════════════════════════════════════════════════════════════════════

BUYER'S INSPECTION WINDOW: {{inspection_window_hours}} hours from delivery

BUYER MUST:
1. Unbox device with timestamped video (overlay required)
2. Test ALL items in Functional Test Checklist (above)
3. Check screen for dead pixels
4. Verify security locks are actually off (try factory reset)
5. Document ANY discrepancies with clear photos/video
6. File dispute WITH EVIDENCE within inspection window
7. Keep device in resaleable condition during inspection

BUYER CANNOT:
✗ Make modifications to hardware
✗ Open device or break seals (unless necessary for inspection)
✗ Install unauthorised software
✗ Use device to make calls/data during inspection
✗ File dispute after inspection window closes

═══════════════════════════════════════════════════════════════════════════════════
8. ESCROW & PAYMENT TERMS
═══════════════════════════════════════════════════════════════════════════════════

Sale Price: ₹{{sale_price}}
Platform Fee (1%): ₹{{platform_fee}}
Escrow Amount Held: ₹{{escrow_amount}}

Timeline:
1. Buyer pays ₹{{sale_price}} → Held in escrow with Bharose Pe
2. Seller ships device
3. Buyer receives → {{inspection_window_hours}} hour inspection window starts
4. If No Dispute → Escrow released to Seller, Buyer gets device
5. If Dispute Filed → AI mediation + human review
6. If Fraud Detected → Full refund to Buyer, seller account banned

═══════════════════════════════════════════════════════════════════════════════════
9. SPECIAL TERMS FOR COMMON ISSUES
═══════════════════════════════════════════════════════════════════════════════════

BATTERY HEALTH DISPUTES:
  → If claimed: {{battery_health_percentage}}% actual: {{battery_health_iphone}}%
  → If difference >5%: Valid dispute IF unboxing video shows battery level drop
  → If difference <5%: Minor variance, dispute rejected
  → Remedy: Buyer can reject if claimed ≥80% but actual <75%

SCREEN DEFECTS:
  → Dead pixels <3: Not disputable (normal in industry)
  → Dead pixels >5: Valid dispute, full refund
  → Screen lines if undisclosed: Valid dispute
  → Screen lines if disclosed with photo: Not disputable

COSMETIC DAMAGE:
  → If seller provided photos showing condition: Not disputable
  → If condition worse than photos: Valid dispute
  → Standard: Scratches acceptable if documented

SECURITY LOCKS:
  → If lock status was FALSE and still ON at delivery: FRAUD
  → Seller must provide credentials or full refund + penalty
  → Automatic seller account ban after second offense

═══════════════════════════════════════════════════════════════════════════════════
10. SELLER WARRANTIES & LIABILITY
═══════════════════════════════════════════════════════════════════════════════════

SELLER WARRANTS:
1. ✓ Device is LEGAL and not stolen/blacklisted
2. ✓ All security locks {{icloud_lock_status}}, {{google_frp_lock}} are OFF
3. ✓ Device can be {{can_device_be_reset}} reset to factory settings
4. ✓ Battery health is {{battery_health_percentage}}%
5. ✓ All features tested and working: {{turns_on}}, {{charges}}, {{touchscreen}}, etc.
6. ✓ Physical condition matches {{condition_issue_photos}} provided
7. ✓ No undisclosed repairs or refurbishments
8. ✓ Original charger included (if applicable)
9. ✓ Device is not blacklisted/stolen

SELLER LIABILITY:
  Liability Cap: ₹{{sale_price}} or ₹1,000 whichever is greater
  → Max refund if dispute upheld: ₹{{sale_price}}
  → Seller not liable for lost/damaged accessories
  → Seller not liable for buyer's data/apps

═══════════════════════════════════════════════════════════════════════════════════
11. BUYER RESPONSIBILITIES & PROTECTIONS
═══════════════════════════════════════════════════════════════════════════════════

BUYER RESPONSIBILITIES:
1. Inspect device within {{inspection_window_hours}} hours
2. Test ALL functionality listed above
3. Document ANY issues with timestamped video
4. File dispute with evidence within window
5. Don't modify or damage device during inspection
6. Keep device in resaleable condition

BUYER PROTECTIONS:
✓ Full escrow protection: ₹{{escrow_amount}} held safely
✓ {{inspection_window_hours}} hour inspection window for testing
✓ AI + Human dispute review
✓ Free mediation service
✓ Consumer Protection Act, 2019 applies
✓ Section 65B digital evidence admissibility
✓ Video evidence is legally binding proof

═══════════════════════════════════════════════════════════════════════════════════
12. DISPUTE RESOLUTION FLOW FOR MOBILE DEVICES
═══════════════════════════════════════════════════════════════════════════════════

Stage 1: IMMEDIATE REJECTION (0-1 hour)
  → Device doesn't turn on
  → Security locks still active
  → Device is blacklisted
  → DECISION: Immediate refund, return to seller

Stage 2: AI REVIEW (1-24 hours)
  → AI analyzes buyer's video evidence
  → Compares with seller's original photos
  → Checks condition match
  → DECISION: Reject/Accept dispute or escalate

Stage 3: HUMAN MEDIATION (1-7 days)
  → Both parties chat with mediator
  → Mediator reviews all evidence
  → DECISION: Award refund or deny

Stage 4: ARBITRATION (7-30 days)
  → Independent arbitrator reviews case
  → Binding decision
  → Final and executable in court

═══════════════════════════════════════════════════════════════════════════════════
13. SPECIAL DISCLAIMERS FOR MOBILE/LAPTOP TRANSACTIONS
═══════════════════════════════════════════════════════════════════════════════════

⚠️ SECURITY LOCKS ARE CRITICAL
   If a device has active iCloud/FRP/MI locks, it is WORTHLESS regardless of condition.
   Seller must OFF all locks before shipping or buyer will immediately reject.

⚠️ BATTERY HEALTH CANNOT RECOVER
   Battery health only goes down over time. If claimed {{battery_health_percentage}}% 
   but actual is {{battery_health_iphone}}%, seller cannot restore it.

⚠️ NO HIDDEN DAMAGE CLAUSES
   Buyer can inspect thoroughly. Any damage not shown in seller's photos is considered
   misrepresentation. Take comprehensive photos BEFORE listing.

⚠️ CARRIER LOCKS ARE ALLOWED
   Carrier locks are NORMAL in carrier markets. They don't prevent device usage.
   Buyer must expect and accept carrier locks in carrier phones.

⚠️ COSMETIC DAMAGE IF DISCLOSED
   Minor scratches/dents are acceptable IF documented with photos.
   Don't hide condition - disclose completely upfront.

═══════════════════════════════════════════════════════════════════════════════════
14. REFERENCES & STANDARDS
═══════════════════════════════════════════════════════════════════════════════════

Battery Health Standards:
  • 90-100%: Like New (0-1 months old)
  • 80-89%: Excellent (6-12 months old)
  • 70-79%: Good (1-2 years old)
  • 60-69%: Fair (2-3 years old)
  • <60%: Poor (>3 years old) - Seller must disclose

Device Condition Standards:
  • Mint: Brand new, pristine, zero damage
  • Like New: Used <1 month, no visible damage
  • Excellent: Used <6 months, minor cosmetic marks
  • Good: Used <12 months, visible wear, fully functional
  • Fair: Used >12 months, obvious wear, fully functional
  • Poor: Significant damage, still functional

═══════════════════════════════════════════════════════════════════════════════════
END OF ANNEXURE B — MOBILE PHONES, LAPTOPS & COMPUTING DEVICES
═══════════════════════════════════════════════════════════════════════════════════

This Annexure is legally binding and admissible in courts.
Print and retain for your records.
`;

export default ANNEXURE_B;
