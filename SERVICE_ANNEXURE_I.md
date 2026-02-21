# 🧑‍💼 SERVICE INDUSTRY: CONSULTING / CA SERVICES / TAX / LEGAL / ADVISORY
## COMPREHENSIVE CONSULTING & PROFESSIONAL SERVICES PROJECT DATA MODEL
**Date Created:** November 28, 2025  
**Annexure Code:** I (Service Industry - Consulting, CA, Legal, Advisory)  
**Industry:** Professional Services - Consulting, CA, Tax, Legal, Financial Advisory, Business Consulting  
**Categories:** CA Services, GST Filing, ITR Filing, Tax Compliance, Legal Drafting, Business Consulting, Financial Planning, Startup Advisory

---

## 📋 TABLE OF CONTENTS

- **PART A: CONTRACT CREATION FIELDS** (70+ fields)
- **PART B: DELIVERY EVIDENCE FIELDS** (TBD - to be added)
- **PART C: DISPUTE EVIDENCE FIELDS** (TBD - to be added)
- **PART D: DATABASE SCHEMA MAPPING** (TBD - to be added)
- **PART E: SAMPLE CONTRACT CLAUSE GENERATION** (TBD - to be added)

---

# ⚙️ PART A: CONTRACT CREATION FIELDS
**Filled before contract is generated & signed**  
**These fields become binding clauses in the contract**  
**⚠️ EXTREMELY DETAILED - Designed to prevent 90% of disputes**

---

## 🔷 SECTION 1: SERVICE TYPE & DEFINITION
**Mandatory fields that set the consulting service foundation**

### 1.1 Consulting Service Type (Category)
- **Field Name:** `consulting_service_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `ca_finance_tax` — CA/Finance/Tax Services
  - `itr_filing` — ITR Filing (Income Tax Returns)
  - `gst_monthly_filing` — GST Monthly Filing
  - `gst_annual_return` — GST Annual Return
  - `tds_compliance` — TDS Compliance & Filing
  - `bookkeeping` — Bookkeeping & Ledger Management
  - `internal_audit` — Internal Audit
  - `company_incorporation` — Company Incorporation (LLP/OPC/Pvt Ltd)
  - `roc_filing` — ROC Filing (Ministry of Corporate Affairs)
  - `financial_modelling` — Financial Modelling
  - `valuation` — Valuation Reports
  - `due_diligence` — Due Diligence
  - `audit_support` — Audit Support
  - `legal_consultation` — Legal Consultation (Advisory only, no representation)
  - `agreement_drafting` — Agreement Drafting
  - `notice_drafting` — Notices/Reply Drafting
  - `policy_drafting` — Policy Document Drafting
  - `contract_vetting` — Contract Vetting & Review
  - `trademark_filing` — Trademark Filing & Registration
  - `copyright_filing` — Copyright Filing & Registration
  - `business_plan` — Business Plan Development
  - `pitch_deck` — Pitch Deck Creation
  - `market_research` — Market Research
  - `startup_advisory` — Startup Advisory
  - `sop_creation` — SOP (Standard Operating Procedure) Creation
  - `hr_consulting` — HR Consulting & Documentation
  - `process_improvement` — Process Improvement Consulting
  - `investment_advisory` — Investment Advisory
  - `wealth_management` — Wealth Management
  - `insurance_planning` — Insurance Planning & Review
  - `portfolio_review` — Portfolio Review & Analysis
  - `financial_planning` — Financial Planning
  - `risk_advisory` — Risk Advisory
  - `corporate_documentation` — Corporate Documentation
  - `startup_documentation` — Startup Documentation (valuation, ESOP, pitch decks)
  - `custom_consulting` — Custom Consulting Service (specify below)
- **Custom Field:** `consulting_service_type_custom` (if "custom_consulting")
- **Contract Clause:** "This Agreement pertains to the following consulting service: **{consulting_service_type}}**"

### 1.2 Service Job Title
- **Field Name:** `consulting_job_title`
- **Type:** Text (max 150 chars)
- **Required:** YES
- **Example:** "GST Filing - 6 months", "Business Plan Development", "Investment Advisory - Portfolio Review", "Legal Agreement Drafting (NDA + Employment Contract)"
- **Contract Clause:** "Service: **{consulting_job_title}}**"

### 1.3 Service Engagement Type
- **Field Name:** `engagement_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `one_time_project` — One-time Project
  - `recurring_monthly` — Recurring/Monthly Service
  - `annual_contract` — Annual Contract
  - `project_based` — Project-based (time-bound)
  - `retainer` — Retainer Engagement
  - `ad_hoc_consulting` — Ad-hoc Consulting (hourly/as-needed)
- **Contract Clause:** "Engagement type: **{engagement_type}}**"

---

## 🔷 SECTION 2: CLIENT & ORGANIZATION DETAILS

### 2.1 Client/Business Information
- **Block Name:** `client_info_block`
- **Type:** Object

#### 2.1.1 Client Name
- **Field Name:** `client_name`
- **Type:** Text
- **Required:** YES
- **Placeholder:** "Individual or company name"

#### 2.1.2 Organization/Business Name (If Applicable)
- **Field Name:** `organization_name`
- **Type:** Text
- **Required:** NO
- **Placeholder:** "e.g., ABC Pvt Ltd, XYZ LLP"

#### 2.1.3 Business Type/Industry
- **Field Name:** `client_industry_type`
- **Type:** Single Select
- **Required:** YES (for some services)
- **Options:**
  - Retail / E-commerce
  - SaaS / Software
  - Professional Services
  - Manufacturing
  - Trading / Distribution
  - Real Estate
  - Finance / Banking
  - Education
  - Healthcare
  - Hospitality / Travel
  - Media / Entertainment
  - Non-profit / Charity
  - Startup / Early-stage
  - Other

#### 2.1.4 PAN / Registration Number
- **Field Name:** `client_pan_number`
- **Type:** Text
- **Required:** Conditional (for CA/tax work)
- **Placeholder:** "e.g., AAAPA1234C"
- **Validation:** PAN format validation

#### 2.1.5 Contact Details
- **Block Name:** `client_contact_block`
- **Fields:**
  - `client_email` (Email) — Required: YES
  - `client_phone` (Phone) — Required: YES
  - `client_address` (Textarea) — Required: YES

---

## 🔷 SECTION 3: SCOPE OF WORK (CRITICAL - PREVENTS 90% OF DISPUTES)

### 3.1 Detailed Deliverables (Explicit & Exact)
- **Field Name:** `detailed_deliverables`
- **Type:** Textarea (max 1500 chars)
- **Required:** YES
- **Validation:** Cannot contain vague terms like "handle", "manage", "support", "as needed"
- **Instruction Text:** "Be EXACT about deliverables. Example: 'File 1 ITR for FY24-25 + 1 GST return (Jan 2025) + prepare 5 MIS reports + 2 revision rounds + 3 consultation calls' NOT 'Handle tax compliance'"
- **Contract Clause:** "DELIVERABLES: {detailed_deliverables}"

### 3.2 Conditional Fields - IF CA/TAX WORK SELECTED

#### 3.2.1 Number of Returns to Be Filed
- **Field Name:** `returns_count`
- **Type:** Number
- **Required:** YES (if CA/tax)
- **Placeholder:** "e.g., 2, 3, etc."
- **Contract Clause:** "Number of returns to be filed: **{returns_count}}**"

#### 3.2.2 Return Types
- **Field Name:** `return_types`
- **Type:** Multi-Select
- **Required:** YES (if CA/tax)
- **Options:**
  - ITR (Income Tax Return)
  - GST Return (GSTR-1)
  - GST Return (GSTR-3B)
  - GST Annual Return
  - TDS Return
  - Other (specify)

#### 3.2.3 Period Covered
- **Field Name:** `period_covered`
- **Type:** Text
- **Required:** YES (if CA/tax)
- **Placeholder:** "e.g., 'FY 2024-25 + GST Jan-Mar 2025'"
- **Contract Clause:** "Period covered: **{period_covered}}**"

#### 3.2.4 Ledger Cleanup Included?
- **Field Name:** `ledger_cleanup_included`
- **Type:** Yes/No
- **Required:** YES (if CA/tax)
- **Sub-field (if Yes):** `ledger_cleanup_scope` (Textarea, e.g., "Reconciliation of bank statements, classification of entries")
- **Contract Clause:** "Ledger cleanup: {ledger_cleanup_included}. Scope: {ledger_cleanup_scope}"

#### 3.2.5 Notices Reply Included?
- **Field Name:** `notices_reply_included`
- **Type:** Yes/No
- **Required:** YES (if CA/tax)
- **Sub-field (if Yes):** `notice_types` (Multi-Select: IT notice / GST notice / Department notice / Other)
- **Contract Clause:** "Notices reply preparation: {notices_reply_included}"

#### 3.2.6 MIS Reports Included?
- **Field Name:** `mis_reports_included`
- **Type:** Yes/No
- **Required:** YES (if CA/tax)
- **Sub-field (if Yes):**
  - `mis_reports_count` (Number, e.g., "3 reports")
  - `mis_report_types` (Multi-Select: Profit & Loss / Balance Sheet / GST Summary / Cash Flow / Other)
  - `mis_report_frequency` (Single Select: Monthly / Quarterly / Annual)
- **Contract Clause:** "MIS reports: {mis_reports_count} ({mis_report_types}) {mis_report_frequency}"

#### 3.2.7 Working Papers/Documentation Included?
- **Field Name:** `working_papers_included`
- **Type:** Yes/No
- **Required:** YES (if CA/tax)
- **Default:** Yes
- **Contract Clause:** "Working papers documentation: {working_papers_included}"

---

### 3.3 Conditional Fields - IF LEGAL WORK SELECTED

#### 3.3.1 Document Types to Draft
- **Field Name:** `document_types_legal`
- **Type:** Multi-Select
- **Required:** YES (if legal)
- **Options:**
  - NDA (Non-Disclosure Agreement)
  - Employment Agreement
  - Service Agreement
  - Vendor Agreement
  - Client Agreement
  - Loan Agreement
  - Partnership Agreement
  - Policy Document
  - Notices (legal)
  - Contract Review/Vetting
  - Trademark Filing
  - Copyright Filing
  - Other (specify)
- **Contract Clause:** "Document types to be prepared: {document_types_legal}"

#### 3.3.2 Number of Unique Drafts
- **Field Name:** `drafts_count`
- **Type:** Number
- **Required:** YES (if legal)
- **Placeholder:** "e.g., 1, 2, 3"
- **Contract Clause:** "Number of unique documents: **{drafts_count}}**"

#### 3.3.3 Expected Pages/Clauses
- **Field Name:** `expected_pages_clauses`
- **Type:** Text
- **Required:** NO
- **Placeholder:** "e.g., '8-10 pages', '20-25 clauses'"
- **Contract Clause:** "Expected scope: {expected_pages_clauses}"

#### 3.3.4 Revision Rounds
- **Field Name:** `revision_rounds_legal`
- **Type:** Number
- **Required:** YES (if legal)
- **Default:** 2
- **Options:** 1 / 2 / 3 / Unlimited
- **Contract Clause:** "Revision rounds included: **{revision_rounds_legal}}**"

#### 3.3.5 Consultation Calls Included?
- **Field Name:** `consultation_calls_legal`
- **Type:** Number
- **Required:** YES (if legal)
- **Placeholder:** "e.g., 2, 3 calls"
- **Sub-field:** `call_duration` (Single Select: 30 mins / 60 mins / 90 mins)
- **Contract Clause:** "Consultation calls: {consultation_calls_legal} calls x {call_duration} each"

#### 3.3.6 Additional Documents (Beyond Drafting)
- **Field Name:** `additional_legal_docs`
- **Type:** Multi-Select
- **Options:**
  - NDA (separately)
  - Addendum
  - Schedules
  - Annexures
  - Signatures/seal documentation
- **Contract Clause:** "Additional documents included: {additional_legal_docs}"

---

### 3.4 Conditional Fields - IF BUSINESS CONSULTING SELECTED

#### 3.4.1 Deliverable Types
- **Field Name:** `deliverable_types_consulting`
- **Type:** Multi-Select
- **Required:** YES (if consulting)
- **Options:**
  - Report
  - Presentation/Slides
  - Financial Model
  - Roadmap/Timeline
  - Action Plan
  - Recommendations Document
  - Research Document
  - Strategy Document
  - Other (specify)

#### 3.4.2 Report Length
- **Field Name:** `report_length_pages`
- **Type:** Number
- **Required:** Conditional (if report selected)
- **Placeholder:** "e.g., 15, 20, 50"
- **Contract Clause:** "Report length: {report_length_pages} pages"

#### 3.4.3 Presentation Slides Count
- **Field Name:** `presentation_slides_count`
- **Type:** Number
- **Required:** Conditional (if presentation selected)
- **Placeholder:** "e.g., 30, 50"
- **Contract Clause:** "Presentation: {presentation_slides_count} slides"

#### 3.4.4 Research Depth
- **Field Name:** `research_depth_consulting`
- **Type:** Single Select
- **Required:** YES (if consulting)
- **Options:**
  - Desktop research only (secondary sources)
  - With 3-5 interviews/expert consultations
  - With 5-10 interviews
  - With 10+ interviews/extensive primary research
- **Contract Clause:** "Research approach: {research_depth_consulting}"

#### 3.4.5 Data Sources Allowed
- **Field Name:** `data_sources_allowed`
- **Type:** Textarea
- **Required:** YES (if consulting)
- **Placeholder:** "e.g., 'Public databases only', 'Client data + public sources', 'Desktop research only'"
- **Contract Clause:** "Permitted data sources: {data_sources_allowed}"

#### 3.4.6 Consultation/Workshop Sessions
- **Field Name:** `consultation_sessions_count`
- **Type:** Number
- **Required:** NO
- **Placeholder:** "Number of meetings/workshops"
- **Contract Clause:** "Included sessions: {consultation_sessions_count}"

---

### 3.5 Conditional Fields - IF FINANCIAL ADVISORY SELECTED

#### 3.5.1 Written Plan vs. Verbal?
- **Field Name:** `written_or_verbal_plan`
- **Type:** Single Select
- **Required:** YES (if financial advisory)
- **Options:**
  - Written Plan (document)
  - Verbal Consultation (calls only)
  - Both (written plan + calls)
- **Contract Clause:** "Plan format: {written_or_verbal_plan}"

#### 3.5.2 Written Plan Pages (If Applicable)
- **Field Name:** `financial_plan_pages`
- **Type:** Number
- **Required:** Conditional (if written plan)
- **Placeholder:** "e.g., 15, 20"
- **Contract Clause:** "Written plan: {financial_plan_pages} pages"

#### 3.5.3 Number of Review Calls
- **Field Name:** `review_calls_count`
- **Type:** Number
- **Required:** YES (if financial advisory)
- **Placeholder:** "e.g., 2, 3, 4"
- **Sub-field:** `call_duration_advisory` (Single Select: 30 mins / 60 mins / 90 mins)
- **Contract Clause:** "Strategy calls: {review_calls_count} calls x {call_duration_advisory} each"

#### 3.5.4 Portfolio Reports Count
- **Field Name:** `portfolio_reports_count`
- **Type:** Number
- **Required:** NO
- **Placeholder:** "e.g., 2 (quarterly)"
- **Contract Clause:** "Portfolio reports: {portfolio_reports_count}"

#### 3.5.5 Investment Instruments Covered
- **Field Name:** `instruments_covered`
- **Type:** Multi-Select
- **Required:** YES (if financial advisory)
- **Options:**
  - Stocks
  - Mutual Funds
  - Bonds / Fixed Deposits
  - Real Estate / Property
  - Insurance
  - Commodities
  - Currencies / Forex
  - NOT Crypto (explicitly exclude)
  - Other (specify)
- **Contract Clause:** "Investment instruments covered: {instruments_covered}"

---

### 3.6 Deliverables NOT Included (MANDATORY - Scope Protection)
- **Field Name:** `deliverables_not_included`
- **Type:** Textarea (max 800 chars)
- **Required:** YES
- **Instruction:** "Explicitly state what is OUT OF SCOPE to prevent scope creep disputes"
- **Placeholder Examples:**
  ```
  NOT INCLUDED:
  - Court representation / litigation
  - Physical implementation (advisory only)
  - Guaranteed outcomes / results
  - Late payment penalties
  - Government agency liaison (client's responsibility)
  - Travel/accommodation costs
  - Implementation support
  - Post-delivery maintenance
  ```
- **Contract Clause:** "OUT OF SCOPE (NOT included in this engagement): {deliverables_not_included}"

---

## 🔷 SECTION 4: ACCESS & DATA REQUIREMENTS (CRITICAL)

### 4.1 Required Data & Documents
- **Field Name:** `data_requirements_checklist`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (select all applicable)
- **Options:**

**For CA/Tax Services:**
- [ ] PAN & Aadhar copies
- [ ] Last 3-12 months bank statements
- [ ] All invoices (sales & purchases)
- [ ] Expense receipts
- [ ] GST portal credentials
- [ ] Accounting software login (Tally/QB/etc.)
- [ ] Income proof documents
- [ ] Fixed asset details
- [ ] Previous year returns
- [ ] TDS certificates (if applicable)

**For Legal Services:**
- [ ] Existing agreements/contracts
- [ ] Email correspondence
- [ ] Case/dispute background
- [ ] Notices/demands received
- [ ] Party details & contact info
- [ ] Supporting documents
- [ ] Previous legal opinions

**For Business Consulting:**
- [ ] Business registration docs
- [ ] Revenue data (12 months)
- [ ] Organizational chart
- [ ] Previous reports
- [ ] Customer/market data
- [ ] Competitive information
- [ ] Internal process documentation

**For Financial Advisory:**
- [ ] Current investment portfolio
- [ ] Income & expense statement
- [ ] Risk tolerance questionnaire
- [ ] Previous investment statements
- [ ] Insurance policies list
- [ ] Financial goals documentation
- [ ] Bank/loan details

### 4.2 Data Upload / Document Submission
- **Field Name:** `required_documents_upload`
- **Type:** File Upload + URLs
- **Required:** YES (for selected data requirements)
- **Placeholder:** "Upload all required documents or provide secure links"
- **Accepted Formats:** PDF, JPG, PNG, Excel, Word, CSV

**Auto-Generated Clause:**
```
DATA PROVISION CLAUSE:

Client is responsible for providing all required data and documents.
Delay in data submission extends all project timelines proportionally.
If data not provided by [DEADLINE], consultant may:
  a) Extend the engagement
  b) Charge additional consultation fees (₹[AMOUNT]/hour)
  c) Suspend or terminate the engagement
```

---

## 🔷 SECTION 5: TIMELINES & DEADLINES (BINDING DATES)

### 5.1 Project Timeline
- **Block Name:** `timeline_section`
- **Type:** Object

#### 5.1.1 Project Start Date
- **Field Name:** `project_start_date_consulting`
- **Type:** Date Picker
- **Required:** YES
- **Default:** Today + 1 day
- **Contract Clause:** "Project start: **{project_start_date_consulting}}**"

#### 5.1.2 First Deliverable/Draft Date
- **Field Name:** `first_deliverable_date_consulting`
- **Type:** Date Picker
- **Required:** YES
- **Contract Clause:** "Draft delivery: **{first_deliverable_date_consulting}}**"

#### 5.1.3 Client Feedback/Review Turnaround Time
- **Field Name:** `feedback_turnaround_days`
- **Type:** Number (days)
- **Required:** YES
- **Default:** 3
- **Placeholder:** "How many days for client to provide feedback on drafts?"
- **Contract Clause:** "Client feedback turnaround: **{feedback_turnaround_days}} days** after receiving draft"

#### 5.1.4 Final Delivery Date
- **Field Name:** `final_delivery_date_consulting`
- **Type:** Date Picker
- **Required:** YES
- **Contract Clause:** "Final delivery: **{final_delivery_date_consulting}}**"

#### 5.1.5 Filing Deadline (If Applicable - For CA Work)
- **Field Name:** `filing_deadline_consulting`
- **Type:** Date Picker
- **Required:** Conditional (if CA/tax work)
- **Contract Clause:** "Government filing deadline: **{filing_deadline_consulting}}**"

#### 5.1.6 Total Consultation Hours/Sessions
- **Field Name:** `total_consultation_hours`
- **Type:** Number (hours) or Number (sessions)
- **Required:** Conditional (if advisory services)
- **Placeholder:** "e.g., 3 hours, 5 sessions"
- **Contract Clause:** "Total consultation time: **{total_consultation_hours}}**"

#### 5.1.7 Call Duration Per Session
- **Field Name:** `call_duration_per_session`
- **Type:** Single Select
- **Required:** Conditional (if advisory)
- **Options:** 30 mins / 60 mins / 90 mins / 120 mins
- **Contract Clause:** "Each call duration: **{call_duration_per_session}}**"

**Auto-Generated Clause:**
```
TIMELINE AUTO-EXTENSION CLAUSE:

If client delays in providing feedback or data:
- Project timeline extends automatically by 1 day for every day of client delay
- Filing/delivery deadline also shifts proportionally
- Service provider is not liable for delayed delivery due to client delay
- This is documented in the engagement log
```

---

## 🔷 SECTION 6: REVISIONS & REVIEW ROUNDS

### 6.1 Number of Revision Rounds
- **Field Name:** `revision_rounds_count`
- **Type:** Single Select
- **Required:** YES
- **Options:** 1 / 2 / 3 / Unlimited
- **Default:** 2
- **Contract Clause:** "Revision rounds included: **{revision_rounds_count}}**"

### 6.2 Revision Definition (What Counts & What Doesn't)
- **Block Name:** `revision_definition_block`
- **Type:** Object

#### 6.2.1 What Counts as a Revision
- **Field Name:** `revision_counts_as`
- **Type:** Textarea
- **Default:**
  ```
  WHAT COUNTS AS A REVISION:
  - Minor edits (spelling, grammar, formatting)
  - Single clause/section modification
  - Data field updates (1-2 fields)
  - Style/font changes
  - Content reordering (same content)
  - Addition of 1-2 minor clauses
  ```
- **Contract Clause:** "Revisions include: {revision_counts_as}"

#### 6.2.2 What Does NOT Count (= New Project)
- **Field Name:** `fresh_project_threshold`
- **Type:** Textarea
- **Default:**
  ```
  WHAT COUNTS AS A FRESH PROJECT (New charge applies):
  - Complete re-draft (>50% content change)
  - New document type added
  - New business scope/vertical
  - Different compliance period
  - Major structural/conceptual overhaul
  - Addition of 5+ significant clauses
  - Scope expansion beyond original agreement
  ```
- **Contract Clause:** "Scope expansion beyond above = new engagement with separate fee"

#### 6.2.3 Additional Revision Charges
- **Field Name:** `additional_revision_charges`
- **Type:** Currency
- **Required:** NO
- **Placeholder:** "e.g., ₹2000 per revision round beyond included rounds"
- **Contract Clause (if applicable):** "Additional revisions: **₹{additional_revision_charges}} per round**"

---

## 🔷 SECTION 7: ADVICE & LIABILITY BOUNDARIES (CRITICAL LEGAL SHIELDS)

### 7.1 Liability Disclaimers (Mandatory Multi-Select)
- **Field Name:** `liability_disclaimers_mandatory`
- **Type:** Multi-Select Checkboxes
- **Required:** YES — ALL MUST BE CHECKED
- **Instruction:** "These are NON-NEGOTIABLE liability protections. All apply to this engagement."

#### For CA / TAX SERVICES (Conditional - check all):
- [ ] **Filing Accuracy Depends on Data Quality**
  > "Consultant's filing accuracy is dependent on accuracy of data provided by client. If client provides incorrect data, consultant is NOT liable for penalties or filing errors."

- [ ] **No Refund Guarantee Clause**
  > "Consultant cannot guarantee refund amounts, timing, or approval. Refund decisions are made solely by Income Tax Department. Consultant not liable for refund amount or delay."

- [ ] **Penalty Liability Exemption**
  > "Consultant NOT liable for tax penalties if caused by: incorrect data, non-cooperation, late data submission, client's decision not to provide documents, or government portal issues."

- [ ] **Compliance Law Changes**
  > "Filing compliance is subject to laws as of filing date. Consultant not responsible for law changes after filing date affecting earlier periods."

- [ ] **Late Filing Clause**
  > "If filing deadline missed due to client's delay in data submission, consultant is NOT liable for late penalties or interest."

#### For LEGAL SERVICES (Conditional - check all):
- [ ] **Non-Representation Clause**
  > "This is legal drafting/advisory only, NOT legal representation. Consultant cannot appear in court, handle litigation, or provide courtroom advocacy."

- [ ] **Legal Validity Not Guaranteed**
  > "Consultant does NOT guarantee legal validity of drafted documents. Client must verify with government authorities/courts before enforcement if required."

- [ ] **No Enforcement Responsibility**
  > "Consultant NOT responsible for enforcement of agreements or ensuring compliance by other parties. Client is solely responsible for enforcement."

- [ ] **No Case Outcome Guarantee**
  > "If this involves legal matters, consultant does NOT guarantee dispute resolution, court victory, favorable judgment, or any specific legal outcome."

- [ ] **Draft Quality Depends on Client Info**
  > "Quality of draft depends on accuracy and completeness of information provided by client. If client provides incomplete/incorrect information, draft quality may be affected."

- [ ] **Jurisdiction Limitation**
  > "Drafted documents are prepared for {STATE/JURISDICTION} only. If used in different jurisdiction, client is responsible for modifications and validity checks."

#### For BUSINESS CONSULTING (Conditional - check all):
- [ ] **Implementation Liability Exemption**
  > "Consultant provides strategic recommendations only. Consultant NOT liable for implementation results, business outcomes, success or failure of strategies."

- [ ] **No Market Guarantee**
  > "NO guarantee of market success, sales growth, customer acquisition, investor interest, or business growth. Market outcomes depend on client's execution and external factors."

- [ ] **Client Decision Liability**
  > "Client makes final business decisions based on consultant's recommendations. Consultant NOT liable for outcomes of client's decisions."

- [ ] **External Market Changes**
  > "NO liability for market changes, competitive actions, regulatory changes, economic shifts, or other external factors affecting business after delivery."

- [ ] **Timeline Realism Clause**
  > "Business results take time to materialize. Consultant not liable if results don't appear within {MONTHS} of strategy delivery."

#### For FINANCIAL ADVISORY (Conditional - check all):
- [ ] **No Return Guarantee**
  > "Consultant does NOT guarantee investment returns, ROI, wealth growth, capital preservation, or any specific financial outcome. All investments carry market risk."

- [ ] **Market Risk Acceptance**
  > "Client accepts and understands market risks. Consultant NOT liable for market downturns, crashes, economic recessions, or adverse market events."

- [ ] **Investment Decision Responsibility**
  > "Client makes final investment decisions based on consultant's advice. Consultant NOT liable for investment performance, losses, or portfolio underperformance."

- [ ] **Tax Planning Separate**
  > "Financial advisory is separate from tax planning. Client must consult CA for tax implications of investments. Consultant not responsible for tax liability."

- [ ] **Market Prediction Disclaimer**
  > "Markets are unpredictable. Consultant's projections, forecasts, and market assumptions are estimates only, not guarantees. Future performance is uncertain."

- [ ] **Liability Cap**
  > "Consultant's total liability for this engagement (if any) is limited to the fee paid for this engagement. Client cannot claim damages beyond engagement fee."

**Auto-Generated Master Liability Clause:**
```
MASTER LIABILITY CLAUSE:

Consultant and Platform are NOT liable for:
- Business outcomes, financial losses, or penalties
- Adverse legal judgments or litigation losses
- Market performance, investment losses, or ROI shortfalls
- Unfavorable government decisions or tax assessments
- Results from implementation of recommendations
- External factors beyond consultant's control

UNLESS caused by proven GROSS NEGLIGENCE or WILLFUL MISCONDUCT by consultant.

Consultant's maximum liability = fee paid for this engagement.
```

---

## 🔷 SECTION 8: CONFIDENTIALITY & DATA PROTECTION

### 8.1 Confidentiality Requirements
- **Block Name:** `confidentiality_section`
- **Type:** Object

#### 8.1.1 Confidentiality Mandatory?
- **Field Name:** `confidentiality_required`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes (mandatory for all services)
- **Contract Clause:** "All engagement matters are CONFIDENTIAL"

#### 8.1.2 NDA Required?
- **Field Name:** `nda_required`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No
- **Sub-field (if Yes):** `nda_scope` (Textarea, e.g., "Specific client identity, financial details, strategy")
- **Contract Clause (if Yes):** "Formal NDA required. Scope: {nda_scope}"

#### 8.1.3 Confidentiality Duration
- **Field Name:** `confidentiality_duration_months`
- **Type:** Number (months)
- **Required:** YES
- **Default:** 24 months
- **Options:** 12 / 24 / 36 / 60 / Indefinite
- **Contract Clause:** "Confidentiality duration: **{confidentiality_duration_months}} months** from engagement completion"

#### 8.1.4 Data Retention & Deletion
- **Field Name:** `data_retention_period`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - Delete immediately after 1 year
  - Retain for 2 years then delete
  - Retain for 3 years (legal compliance)
  - Indefinite retention (if required for compliance)
  - Other (specify)
- **Contract Clause:** "Client data retention: {data_retention_period}"

#### 8.1.5 Data Sharing Restrictions
- **Field Name:** `data_sharing_restrictions`
- **Type:** Multi-Select
- **Required:** YES
- **Options:**
  - [ ] Data cannot be shared with any 3rd parties
  - [ ] Data can be shared with subcontractors only (with NDA)
  - [ ] Data can be used for platform analytics (anonymized only)
  - [ ] Data can be archived for compliance/legal purposes
  - [ ] Client data cannot be used in other client engagements
  - [ ] Consultant can reference this project in portfolio (anonymized)

**Auto-Generated Clause:**
```
DATA PROTECTION & CONFIDENTIALITY:

1. All client data shall be treated as confidential
2. Data handling complies with DPDP Act 2023 and applicable laws
3. Data sharing: {data_sharing_restrictions}
4. Data retention: {data_retention_period}
5. Confidentiality duration: {confidentiality_duration_months} months from engagement end
6. Data breach must be reported within 48 hours
```

---

## 🔷 SECTION 9: COMPLIANCE OBLIGATIONS & DISCLAIMERS

### 9.1 Compliance Acknowledgments
- **Field Name:** `compliance_disclaimers_checkbox`
- **Type:** Multi-Select
- **Required:** YES (select all applicable)

#### For CA/TAX WORK:
- [ ] **Data Accuracy Responsibility**: Filing accuracy depends on client providing correct & complete data
- [ ] **Penalty Exemptions**: Consultant NOT liable for penalties from incorrect data, non-cooperation, late submission
- [ ] **Filing Deadline Subject to**: Government portal availability, system issues don't constitute consultant delay
- [ ] **Legal Compliance**: Filing prepared per laws as of filing date

#### For LEGAL WORK:
- [ ] **Draft Quality**: Depends on accuracy of information provided by client
- [ ] **No Legal Validity Guarantee**: Client must verify with authorities before use
- [ ] **Legal Disputes**: Consultant not liable for disputes arising from document use
- [ ] **Client Responsibility**: Client responsible for ensuring document compliance with local laws

#### For CONSULTING/ADVISORY:
- [ ] **Recommendations Based on Available Info**: At time of delivery only
- [ ] **No Business Success Guarantee**: Outcomes depend on client execution
- [ ] **External Changes**: Consultant not liable for market/regulatory changes after delivery
- [ ] **Client Implementation Responsibility**: Client solely responsible for implementing recommendations

---

## 🔷 SECTION 10: COMMERCIAL TERMS & PAYMENT

### 10.1 Service Fee
- **Block Name:** `commercial_terms_section`
- **Type:** Object

#### 10.1.1 Total Service Fee (INR)
- **Field Name:** `total_service_fee_consulting`
- **Type:** Currency
- **Required:** YES
- **Placeholder:** "e.g., ₹50,000"
- **Contract Clause:** "Total engagement fee: **₹{total_service_fee_consulting}}** (excluding taxes)"

#### 10.1.2 Payment Schedule
- **Field Name:** `payment_schedule`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - Full payment upfront (before work starts)
  - 50% advance, 50% on final delivery
  - 30% advance, 70% on delivery
  - Monthly installments (if recurring)
  - Hourly basis (as work progresses)
- **Contract Clause:** "Payment terms: {payment_schedule}"

#### 10.1.3 Add-on/Optional Charges
- **Field Name:** `addon_charges_list`
- **Type:** Textarea
- **Required:** NO
- **Placeholder:** "e.g., 'Hard copy delivery: ₹500', 'Extra revision: ₹2000/round', 'Urgent handling: +25%'"
- **Contract Clause (if applicable):** "Optional/Additional charges: {addon_charges_list}"

#### 10.1.4 Statutory Fees Covered?
- **Field Name:** `statutory_fees_covered`
- **Type:** Yes/No
- **Required:** YES (for services involving govt fees)
- **Default:** No
- **Contract Clause:** "Statutory/govt fees included in total fee: {statutory_fees_covered}"

### 10.2 Inspection & Acceptance Window
- **Field Name:** `inspection_window_days`
- **Type:** Single Select
- **Required:** YES
- **Options:** 3 days / 7 days / 14 days / 30 days / No inspection period
- **Default:** 7 days
- **Contract Clause:** "Inspection window: **{inspection_window_days}}** after final delivery"
- **Description:** "Client has this period to review and raise issues. After this period, work is deemed accepted."

### 10.3 Refund Policy
- **Field Name:** `refund_policy_consulting`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - No refund after work starts
  - Partial refund (50%) if work not started
  - Full refund only if nothing delivered
  - Pro-rata refund if terminated early
  - Custom (specify)
- **Custom Field:** `refund_policy_details_consulting` (Textarea, if "custom")
- **Contract Clause:** "Refund policy: {refund_policy_consulting}"

### 10.4 Jurisdiction & Dispute Resolution
- **Block Name:** `jurisdiction_section`
- **Type:** Object

#### 10.4.1 Jurisdiction (For Legal Matters)
- **Field Name:** `jurisdiction_city_consulting`
- **Type:** City Select
- **Required:** YES
- **Default:** "Mumbai"
- **Options:** All major Indian cities
- **Contract Clause:** "Jurisdiction: **{jurisdiction_city_consulting}}**"

#### 10.4.2 Dispute Resolution Method
- **Field Name:** `dispute_resolution_method`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - Platform mediation first
  - Arbitration (mutually agreed)
  - Court (as per jurisdiction)
- **Contract Clause:** "Disputes shall be resolved via {dispute_resolution_method}"

---

**END OF PART A: CONTRACT CREATION FIELDS**

---

## 📊 FIELD SUMMARY FOR PART A

**Total Mandatory Fields:** 45+  
**Total Conditional Fields:** 30+  
**Total Optional Fields:** 15+  
**Total Fields:** 90+

---

**Next Sections to Be Added:**
- **PART B:** Delivery Evidence Fields (with service-specific proof requirements)
- **PART C:** Dispute Evidence & Resolution Framework
- **PART D:** Database Schema Mapping
- **PART E:** Sample Contract Clause Generation

---

**Version:** 1.0  
**Last Updated:** Nov 28, 2025  
**Status:** PRODUCTION READY - PART A COMPLETE
