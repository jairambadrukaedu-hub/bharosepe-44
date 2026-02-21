/**
 * Master Escrow Agreement Template for Bharose Pe
 * Updated: November 2025
 * 
 * This template includes:
 * - Seller info fetched from PROFILES table
 * - Buyer info fetched from PROFILES table  
 * - Product details fetched from FORM_SUBMISSIONS table
 * - Platform-enforced terms
 * - Complete Indian legal framework
 */

export const MASTER_ESCROW_AGREEMENT = `
================================================================================
                    BHAROSE PE — MASTER GOODS SALE & ESCROW AGREEMENT
                       Legally Binding Digital Contract Under Indian Law
================================================================================

BHAROSE PE — MASTER GOODS SALE & ESCROW AGREEMENT

This Master Goods Sale & Escrow Agreement (the "Agreement") is a legally binding digital contract executed between:

SELLER:
  Name: {{seller_full_name}}
  User ID: {{seller_user_id}}
  Phone: {{seller_phone}}
  Address: {{seller_address}}
  City: {{seller_city}}
  State: {{seller_state}}
  Pincode: {{seller_pincode}}
  PAN: {{seller_pan_number}}
  GST: {{seller_gst_number}}

BUYER:
  Name: {{buyer_full_name}}
  User ID: {{buyer_user_id}}
  Phone: {{buyer_phone}}
  Address: {{buyer_address}}
  City: {{buyer_city}}
  State: {{buyer_state}}
  Pincode: {{buyer_pincode}}
  PAN: {{buyer_pan_number}}
  GST: {{buyer_gst_number}}

BHAROSE PE TECHNOLOGIES PVT. LTD. ("Platform"):
  Status: Neutral escrow agent, identity verifier and dispute facilitator

Effective Date: {{contract_generated_at}}
Transaction ID: {{transaction_id}}
Contract ID: {{contract_id}}

This Agreement is governed by the laws of India and enforceable under the Information Technology Act, 2000 
and other applicable laws listed in Section 20.

================================================================================

PART A — PREAMBLE & PURPOSE

1.1 Purpose
The Parties enter this Agreement to record the terms under which Seller will sell and Buyer will purchase 
specified Goods, and the Platform will hold payment in Escrow pending release under the terms herein.

1.2 Scope
This Agreement governs all Goods transactions on Bharose Pe unless the Parties expressly execute a separate 
written agreement.

1.3 Effective Date
This Agreement becomes effective upon digital execution (acceptance by both parties on Platform).
Date of Execution: {{contract_generated_at}}
Contract Reference ID: {{transaction_id}}

================================================================================

PART B — PRODUCT DETAILS (USER INPUT - FETCHED FROM FORM_SUBMISSIONS TABLE)

Product Title: {{product_title}}
Brand: {{product_brand}}

Full Description: {{product_description}}

Delivery Date / Dispatch ETA: {{expected_delivery_date}}
Warranty Terms: {{warranty_info}}
Return Policy: {{return_policy}}

Inspection Window: {{inspection_window_hours}} hours

Product Photos & Mandatory Video: {{product_media_urls}}
Delivery Address:
  {{buyer_address}}, {{buyer_city}}, {{buyer_state}} {{buyer_pincode}}

================================================================================

PART C — DEFINITIONS

1. "Goods"
"Goods" means any tangible item, physical product, movable property, or material object described in the 
Transaction Form or relevant Annexure, offered for sale or exchange by the Seller, including all accessories, 
components, attachments, packaging, certificates, or add-ons that the Seller has created, manufactured, owned, 
or lawfully acquired and agreed to transfer to the Buyer as part of the transaction.

This definition includes, without limitation:
  - Electronics, appliances, phones, laptops
  - Vehicles (2W/4W), machinery, tools
  - Furniture, fixtures, home items
  - Fashion & apparel, footwear, accessories
  - Jewellery, collectibles, artwork
  - Books, educational material
  - Industrial equipment and raw materials

Goods must be accurately described by the Seller and accepted explicitly by the Buyer.

2. "Escrow Amount"
"Escrow Amount" means the total monetary consideration paid by the Buyer for the Goods or Services under a 
Transaction, including any taxes if applicable, which is temporarily held in a secure escrow account operated 
by Bharose Pe through its licensed Payment Aggregator partners, until such time the Platform releases such 
amount to the Seller or refunds it to the Buyer in accordance with the terms of this Agreement.

It includes:
  - Gross transaction amount: Rs.{{gross_amount}}
  - Platform service fee (1%): Rs.{{platform_fee}}
  - Net Escrow Amount: Rs.{{escrow_amount}}

Escrow Amount remains locked, non-withdrawable, and subject to auto-release mechanisms.

3. "Inspection Window"
"Inspection Window" means the specific duration ({{inspection_window_hours}} hours) accepted by both Seller 
and Buyer in the Transaction Form or set within the relevant Annexure, during which the Buyer must inspect, 
test, review, or verify the delivered Goods or completed Services and raise any dispute, defect claim, or 
non-conformity complaint with supporting Evidence.

Characteristics:
  - Begins from the timestamp of "Delivery Marked" or "Service Completed" event
  - If no dispute is raised within the Inspection Window, Goods/Services are deemed accepted
  - Auto-release of escrow applies upon acceptance
  - Inspection Window is transaction-specific, accepted by both Seller and Buyer

4. "Evidence"
"Evidence" means any verifiable, time-stamped, unedited, authentic documentation submitted by Buyer or Seller 
to substantiate a claim, defense, defect, or performance under a Transaction.

PLATFORM-APPROVED EVIDENCE FORMATS:

4.1 For Goods:
  - Continuous, unedited unboxing video
  - Time-stamped photographs showing front, back, sides, and defects
  - Serial number / IMEI verification images
  - Functional test videos
  - Device diagnostics screenshots (electronics, laptops, phones)
  - Lab purity certificates (for gold, jewellery)
  - Weight-scale photos (jewellery, collectibles)
  - Damage close-ups (chips, dents, stains, tears, cracks)
  - Packaging/unwrapping proof
  - Signed delivery receipt (optional)

4.2 For Services:
  - Before-and-after work images
  - Work-in-progress screenshots
  - Code commits/WIP dumps (software)
  - Test reports / usability feedback
  - Output files delivered
  - Recording of service performance
  - Attendance/participation proof (tutoring, events)

4.3 Evidence Must Be:
  - Original
  - Unedited
  - Clear & readable
  - Recorded before raising dispute
  - Matching the exact product/service delivered
  - Uploaded within inspection window

4.4 Evidence Is NOT Valid If:
  - Edited/cropped/filtered
  - Shot after Buyer has tampered with the item
  - Recorded without visibility of defect
  - Missing metadata/time context
  - Recorded after dispute filing

Platform + Annexure rules define what qualifies as acceptable evidence for each industry.

================================================================================

PART D — PLATFORM ROLE & LIMITATION (STRONG CLAUSE)

1. Limited Role
The Platform is an independent intermediary that:
  - Holds Escrow Amount with a licensed Payment Aggregator (PA)
  - Provides digital contract generation and storage
  - Provides AI + human dispute resolution tools

2. Not a Seller
Platform is not the seller, manufacturer, insurer or guarantor of Goods. Platform does not provide warranties. 
Seller alone makes representations.

3. Regulatory Compliance
Escrow handling follows PA/RBI guidelines; funds are non-interest bearing unless law requires otherwise. 
(PLATFORM-ENFORCED)

================================================================================

PART E — SELLER REPRESENTATIONS & WARRANTIES

Seller {{seller_full_name}} represents and warrants to Buyer and Platform that:

a) Seller is the lawful owner of the Goods or is authorized to sell
b) Goods conform to the description, images and specifications uploaded: {{product_description}}
c) Serial numbers, IMEI ({{product_serial}}), chassis, model identifiers are accurate and have not been tampered
d) Goods are not stolen, counterfeit, embargoed or subject to any encumbrance
e) Seller has disclosed all known defects: {{known_defects}}, repairs or replacements
f) Seller will provide pre-dispatch evidence and dispatch via {{delivery_method}}

Breach: Misrepresentation is a material breach and entitles Buyer to immediate refund from escrow, penalties, 
and Platform remedies including suspension and legal referral.

================================================================================

PART F — BUYER REPRESENTATIONS & RESPONSIBILITIES

Buyer {{buyer_full_name}} represents and agrees that:

a) Buyer has reviewed Listing and accepts the condition as described
b) Buyer shall inspect Goods within {{inspection_window_hours}} hours and submit any dispute with required evidence
c) Buyer will not tamper with or use Goods beyond necessary inspection prior to raising a dispute
d) Buyer understands Escrow rules and accepts Platform as escrow agent

Failure to inspect within the Inspection Window results in deemed acceptance and funds release.

================================================================================

PART G — PAYMENT & ESCROW LOGIC

7.1 Payment Flow
  - Buyer pays gross amount: Rs.{{gross_amount}}
  - Platform fee (1%): Rs.{{platform_fee}}
  - Escrow Amount held: Rs.{{escrow_amount}}

7.2 Escrow Hold
Escrow Amount held with licensed PA; funds are locked and not disbursed until Release Conditions are met.

7.3 Release Conditions (Automated)

ESCROW RELEASED TO SELLER when any of the following occur:
  1. Buyer clicks "Accept Delivery/Completion"
  2. Buyer fails to raise a dispute within {{inspection_window_hours}} hours
  3. Buyer raises a dispute but submits incomplete, invalid, or insufficient evidence
  4. Platform determines Seller has fulfilled contractual obligations
  5. Mediation/Arbitration rules in favor of Seller
  6. Buyer uses the service or product fully and then asks for refund

ESCROW RELEASED TO BUYER when any of the following occur:
  1. Seller fails to deliver goods/services
  2. Seller delivers materially different or defective product/services
  3. Seller violates disclosures or hides critical defects
  4. Buyer provides valid, timely evidence of breach
  5. Platform mediation rules in Buyer's favor

Inspection Window: {{inspection_window_hours}} hours (as accepted by both BUYER and SELLER)
Platform does not unilaterally decide the inspection window.

7.4 Milestone Payments (Services)
For service projects with milestones, escrow may be released partially based on user-defined milestones.

7.5 Freeze & Auto-Reverse (Platform-Enforced)

Immediate Freeze:
If the Buyer raises a dispute within the Inspection Window, the Platform shall immediately freeze the Escrow Amount, preventing release to the Seller until resolution.

Seller Non-Response:
If the Seller fails to respond to the Platform's requests for Evidence, clarification, or participation in mediation within forty-eight (48) hours of receiving such notice, the Platform, at its sole discretion, may automatically refund the Escrow Amount to the Buyer.

Platform Discretion:
The Platform may also freeze or reverse funds if:
  - submitted evidence shows clear breach by Seller, or
  - Seller becomes unreachable, unresponsive, or refuses to cooperate.

These actions are taken to ensure fair dispute handling and fraud prevention.

7.6 Partial Refunds (Platform-Enforced + Mutually Agreed Option)

Partial refunds may occur under the following circumstances:

1. Annexure-Permitted Partial Refunds
Where the industry-specific Annexure allows partial refunds (e.g., damaged accessory, partial service, incomplete delivery), the Platform may adjudicate a partial settlement based on:
  - proportion of work completed
  - condition of Goods
  - fair-value calculations
  - supporting Evidence

2. Mediator-Directed Partial Refund
In mediation, a trained mediator may determine that a partial refund is the most equitable remedy, taking into account:
  - nature of defect or service shortfall
  - severity
  - contractual promises
  - industry norms

3. Buyer–Seller Mutual Settlement
Buyer and Seller may voluntarily agree to a mutual settlement, including:
  - partial refund
  - replacement
  - discount adjustment
  - any custom resolution

The Platform will honor such settlement only when both parties confirm it digitally inside the Platform interface.

4. Platform Finalization
Once partial refund terms are digitally confirmed by:
  - both parties (mutual settlement), or
  - mediator (evidence-based), or
  - Annexure rules (industry-based),
the Platform will execute the partial release/refund accordingly.

7.7 Prohibited Activity

Both parties agree that:
  - Direct offline payments are strictly prohibited
  - Attempts to bypass escrow may lead to suspension
  - Refund/chargeback attempts outside the platform are violations

7.8 Chargebacks (Platform-Enforced)

Right to Reclaim Funds:
If a bank or card-issuer chargeback is initiated by the Buyer, and after internal review the Platform determines the Buyer's claim is valid, the Platform may reclaim the equivalent amount from the Seller, including by:
  - deducting from pending payouts
  - freezing Seller's wallet
  - holding future Escrow releases

Seller Indemnification:
The Seller hereby indemnifies and holds harmless the Platform from any chargeback loss arising due to:
  - misrepresentation of Goods or Services
  - violation of contract terms
  - fraudulent listing
  - counterfeit items
  - non-delivery
  - hidden defects

Platform Decision Finality:
The Platform's decision regarding chargeback responsibility shall be final and binding, except where arbitration rules apply.

Fraud Prevention:
Sellers engaging in repeated chargeback-related fraud may face:
  - account suspension
  - withholding of payouts
  - legal reporting
  - permanent removal from the Platform

================================================================================

PART H — DELIVERY & INSPECTION PROTOCOL

8.1 Delivery Methods
Seller accepted method (Courier / In-Person / Hand-to-Hand).

8.2 Handover Proof
For courier deliveries, Seller must upload tracking ID; delivery OTP verification and GPS handover are recorded.

8.3 Buyer Inspection Obligations
Buyer must perform continuous unboxing video recorded by Buyer's device (timestamped, platform upload) and if applicable power-on test or relevant checks (e.g., IMEI check, serial number match).

8.4 Inspection Timeframes
Accepted by both Buyer and Seller.

8.5 Failure to Comply
Failure to provide required Buyer evidence results in dispute rejection absent exceptional proof.

================================================================================

PART I — EVIDENCE HIERARCHY & REQUIRED FORMATS

9.1 Evidence Hierarchy (Ordered by Weight)

1. Pre-dispatch Seller video & photos uploaded to platform (highest)
2. Courier tracking proof + delivery OTP
3. Buyer continuous unboxing video recorded and uploaded
4. Diagnostic screenshots / lab reports (if applicable)
5. Time-stamped in-app chats and transaction logs

9.2 Required Evidence Formats

Photos: minimum 2MP, unaltered, with EXIF timestamp preserved
Videos: continuous unboxing, no cuts, max 2GB; platform computes hash upon upload
Platform chat logs
Recorded voice (only if relevant)
Documents: PDFs only for certificates/lab reports

9.3 Seller Mandatory Evidence (Goods + Services)

Seller must provide:
  - Photos showing actual item/work
  - Videos showing condition/functionality/work
  - Serial number/IMEI proof (if applicable)
  - Before/After images (services)
  - Progress/work-in-progress proof
  - Packaging proof (goods)

9.4 Buyer Mandatory Evidence

Buyer must provide:
  - Unboxing video (goods)
  - Demonstration of defect
  - Try/test proof (services/goods)
  - Screenshots of errors
  - Audio/video evidence where relevant
  - Detailed explanation of defect

9.5 Evidence Rejection Criteria

Evidence will NOT be considered if:
  - Edited or manipulated
  - Cropped or incomplete
  - Blurry or unreadable
  - Missing timestamps
  - Not showing the item/service
  - Recorded after user damaged item
  - Contradicting annexure technical requirements

Failure to submit valid evidence = dispute auto rejected

================================================================================

PART J — DISPUTE RESOLUTION WORKFLOW (SMART + LEGAL)

10.1 Step 1 — Automated Triage (0–2 hours)

Platform AI analyzes evidence (images, video, serial number matching, delivery logs). AI issues a provisional result. Platform will not auto-release where AI finds probable fraud.

AI-Based Screening:
Bharose Pe's automated system will:
  - Analyze uploads
  - Verify metadata
  - Compare against contract
  - Apply industry annexure rules
  - Detect fraud indicators

AI generates a preliminary recommendation.

10.2 Step 2 — Human Review (24–72 hours)

If AI is inconclusive or parties contest, a human panel reviews evidence and issues a binding Platform Determination.

10.3 Step 3 — Mediation

As per Mediation Act, 2023: If either party requests, Platform refers dispute to an empanelled mediator; mediation is mandatory prior to arbitration/litigation. Parties agree to mediation scheduling within 7 days.

If the issue remains unresolved:
  - A trained mediator reviews all evidence
  - Hears both parties
  - Suggests a settlement
  - Applies contract + annexure + platform rules

Mediation is mandatory.

10.4 Step 4 — Arbitration / Courts

If mediation fails, Parties may proceed to arbitration under Arbitration & Conciliation Act, 1996, seat: Hyderabad or appropriate jurisdiction per transaction. Parties may also institute court proceedings only after mediation and/or if urgent interim relief is required.

Arbitration (Arbitration & Conciliation Act, 1996):
  - A sole arbitrator (registered) appointed by platform
  - Decision is final & binding
  - Proceedings are digital
  - Award enforceable under Section 36

10.5 No Direct Court Access

Parties CANNOT approach court without:
  - Completing mediation
  - Completing arbitration

This is legally valid under Indian law.

Injunctive Relief: Nothing prevents parties from seeking urgent interim relief at any court of competent jurisdiction after completion of Mediation and Arbitration.

================================================================================

PART K — FRAUD RESPONSE & ENFORCEMENT

11.1 Fraud Indicators
Mismatched IMEI/serial, identical buyer and seller accounts, doctored evidence, chargeback patterns.

11.2 Platform Remedies
Immediate freeze, account suspension, escrow clawback, levy of fines, public listing of offending seller for internal use, and referral to law enforcement if criminality suspected.

11.3 Seller Indemnity on Fraud
Seller indemnifies Platform & Buyer for losses caused by fraudulent sale or misrepresentation, including legal fees and chargebacks.

================================================================================

PART L — TAX, GST & LEGAL COMPLIANCE

12.1 GST, Taxation & Invoicing

Seller Responsibility:
The Seller is solely responsible for determining whether GST registration is required for their business and for issuing a valid GST invoice, where applicable, in accordance with the Central Goods and Services Tax Act, 2017 and relevant State GST laws.

Platform Non-Liability:
The Platform (Bharose Pe) does not verify, audit, certify, or guarantee the correctness of GST numbers, invoices, HSN/SAC codes, tax rates, or compliance by the Seller. All tax representations are entirely Seller's responsibility.

Withholding of Funds (If Required):
The Platform may temporarily withhold Escrow release if:
  - Seller's GST details appear invalid, mismatched, or fraudulent
  - Buyer raises a GST-related dispute supported by proof
  - Applicable law or Payment Aggregator flags the transaction

No Professional Tax Advice:
Bharose Pe does not provide legal, GST, accounting, or professional tax guidance.

12.2 Import, Export & Cross-Border Compliance

Seller Obligations:
For cross-border sales, the Seller must comply with:
  - Customs laws
  - Export/import regulations
  - DGFT rules
  - Shipping and documentation requirements
  - Duties, tariffs, and international compliance obligations

Platform Non-Involvement:
Bharose Pe is not responsible for:
  - Customs clearance
  - Duties/taxes calculation
  - Detained/returned shipments
  - Incorrect declarations
  - Illegal export/import attempts

Indemnification:
Seller indemnifies the Platform against any penalties, seizures, fines, or customs violations arising from their shipment or declarations.

12.3 Prohibited Goods, Restricted Goods & Illegal Activities

Material Breach:
Listing, selling, or attempting to transact any prohibited or restricted item (as per Indian law, RBI guidelines, state regulations, or Platform Policy) constitutes a material breach of this Agreement.

Immediate Platform Action:
In such cases, the Platform may:
  - Immediately cancel the transaction
  - Refund the Buyer (if applicable)
  - Freeze Seller account or payouts
  - Permanently suspend Seller
  - Report to relevant authorities (if required)

Platform Zero Liability:
Bharose Pe shall not, under any circumstances, be held liable for:
  - Seller's illegal, fraudulent, or prohibited listings
  - Violation of government rules
  - Unlawful possession or sale of items
  - Misuse of the Platform for illegal trade

Sole Responsibility:
The entire legal responsibility for prohibited goods or illegal activity rests exclusively with the Seller (and Buyer, where applicable). The Platform merely provides technology facilitation and does not participate in trade, possession, verification, or distribution.

12.4 Platform Immunity & Indemnification

Platform Not a Party to Sale:
Bharose Pe is not the Buyer, not the Seller, and not an agent of either. The Platform only provides escrow-based facilitation.

No Liability for User Violations:
The Platform shall have no liability whatsoever for:
  - Non-payment of taxes by Seller
  - Incorrect GST claims
  - Fake invoices
  - Illegal goods
  - Banned items
  - Misclassification under GST
  - Import/export violations
  - Customs penalties
  - Intellectual property violations
  - Fraudulent representations by users
  - Any legal breach committed by Buyer or Seller

User Indemnification:
Both Buyer and Seller agree to defend, indemnify, and hold harmless Bharose Pe from all claims, penalties, fines, losses, or proceedings arising from their own actions or omissions.

Independent Parties:
All transactions are executed directly between Buyer and Seller, and Bharose Pe is only a technological intermediary as defined under:
  - Information Technology Act, 2000 (Section 2(w))
  - Intermediary Guidelines (2021)

No Representation or Warranty:
Bharose Pe does not guarantee authenticity, legality, ownership, quality, or compliance of any Goods or Services listed by users.

================================================================================

PART M — DATA PRIVACY, RECORDING & RETENTION

13.1 Data Collected (Digital Personal Data Protection Act, 2023)

Platform collects:
  - KYC information
  - PAN
  - Phone, email, address
  - Transaction details
  - Uploaded images/videos
  - Chat logs
  - Device identifiers
  - Dispute evidence

13.2 Purpose of Processing

Used for:
  - Contract enforcement
  - Fraud detection
  - Payment verification
  - Dispute resolution
  - Regulatory compliance (RBI, DPDP Act)
  - Platform safety

13.3 Data Retention

Data is retained for:
  - 180 days after transaction completion
  - Longer if dispute ongoing
  - Longer if law enforcement requests information

13.4 User Rights

Users can:
  - Request access
  - Rectification
  - Withdrawal of consent (after transaction ends)
  - Deletion after statutory retention

13.5 Platform Rights

Platform may:
  - Use anonymized data
  - Share data with Payment Aggregators, banks
  - Share with police, courts, regulators upon lawful request

13.6 Consent

By using Bharose Pe:
  - User consents to DPDP-compliant processing
  - User agrees to the above data uses
  - Consent is stored digitally as proof

================================================================================

PART N — LIMITATION OF LIABILITY & INDEMNITY

14.1 Platform Liability

Platform's aggregate liability is limited to the Escrow Amount or ₹1,000 (whichever is greater) except in cases of wilful misconduct or gross negligence.

Bharose Pe is NOT liable for:
  - Product quality
  - Service quality
  - Seller behaviour
  - Buyer misuse
  - Off-platform negotiations
  - Delayed communication
  - Incorrect user-disclosed information

Bharose Pe liability is limited strictly to:
  - Escrow fund handling
  - Technical system failures caused by the platform

14.2 Seller Liability

Seller is liable for full direct loss due to:
  - Misrepresentation
  - Hidden defects
  - Counterfeit items
  - Incomplete services
  - Failure to deliver
  - Violation of disclosures
  - IP violations (services)

Seller indemnifies Buyer & Platform.

14.3 Buyer Liability

Buyer indemnifies Seller & Platform for damages caused after acceptance, misuse, or fraudulent dispute. Buyer is responsible for:
  - Damaging the item after receiving it
  - Misusing the product/service
  - Using product/service fully and then requesting refund
  - Providing false or misleading evidence
  - Failing to provide required inputs to seller (services)

================================================================================

PART O — FORCE MAJEURE

15.1 Force Majeure

Neither Party liable for failure due to Force Majeure (pandemic, flood, fire, government acts, strikes). Affected Party must notify Platform within 72 hours and propose remediation.

================================================================================

PART P — DIGITAL EXECUTION & RECORDS

16.1 Electronic Acceptance

Clicking "Accept & Create Contract" or similar is equivalent to digital signature under IT Act, 2000. Parties consent to electronic records and the Platform will maintain logs and evidence hashes admissible under Section 65B of Evidence Act.

16.2 Audit Trail

Platform stores immutable audit log: timestamps, IP addresses, device IDs, evidence hash, payment confirmations.

================================================================================

PART Q — GOVERNING LAW & JURISDICTION

17.1 Governing Law

Laws of India, including:
  - Indian Contract Act 1872
  - Sale of Goods Act 1930
  - Consumer Protection Act 2019
  - Information Technology Act 2000
  - Mediation Act 2023
  - Digital Personal Data Protection Act 2023

17.2 Jurisdiction

Courts at seat of arbitration (default: {{arbitration_seat}}) or as specified in transaction.

================================================================================

DIGITAL SIGNATURES

SELLER: {{seller_full_name}}
  User ID: {{seller_user_id}}
  Acceptance Timestamp: {{seller_acceptance_timestamp}}
  Device ID: {{seller_device_id}}
  IP Address: {{seller_ip_address}}
  Signature Hash: {{seller_signature_hash}}

BUYER: {{buyer_full_name}}
  User ID: {{buyer_user_id}}
  Acceptance Timestamp: {{buyer_acceptance_timestamp}}
  Device ID: {{buyer_device_id}}
  IP Address: {{buyer_ip_address}}
  Signature Hash: {{buyer_signature_hash}}

PLATFORM: Bharose Pe Technologies Pvt. Ltd.
  Generated: {{contract_generated_at}}
  Contract ID: {{contract_id}}
  Transaction ID: {{transaction_id}}
  Contract Hash (SHA-256): {{contract_hash_sha256}}

================================================================================
                      END OF MASTER GOODS SALE & ESCROW AGREEMENT
                        LEGALLY BINDING & ADMISSIBLE IN COURTS
                        Governed by Information Technology Act, 2000
                For queries: support@bharosepe.com
                For disputes: disputes@bharosepe.com
================================================================================
`;

export default MASTER_ESCROW_AGREEMENT;
