# 🏗️ SERVICE INDUSTRY: SOFTWARE / APP / WEBSITE DEVELOPMENT
## SUPER-DETAILED, LEGALLY STRONG DATA MODEL
**Date Created:** November 28, 2025  
**Annexure Code:** A (Service Industry)  
**Industry:** Software Development Services (Custom Code, Web/Mobile/Desktop)  
**Category:** Software/App/Website Development Services

---

## 📋 TABLE OF CONTENTS

- **PART A: CONTRACT CREATION FIELDS** (56 fields)
- **PART B: DELIVERY/COMPLETION EVIDENCE FIELDS** (18 fields)
- **PART C: DISPUTE EVIDENCE FIELDS** (12 fields)
- **PART D: DATABASE SCHEMA MAPPING**
- **PART E: SAMPLE CONTRACT CLAUSE GENERATION**

---

# ⚙️ PART A: CONTRACT CREATION FIELDS
**Filled before contract is generated & signed**  
**These fields become binding clauses in the contract**

---

## 🔷 SECTION 1: PROJECT IDENTITY & CONTEXT
**Mandatory fields that set the foundation**

### 1.1 Project Title
- **Field Name:** `project_title`
- **Type:** Text (max 150 chars)
- **Required:** YES
- **Example:** "E-Commerce Platform Redesign"
- **Contract Clause:** "This Agreement pertains to the following project: **{project_title}**"

### 1.2 Project Type
- **Field Name:** `project_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `website_responsive` — Responsive Website (Desktop + Mobile)
  - `website_static` — Static Website (Brochure/Portfolio)
  - `mobile_app_ios` — iOS Mobile App
  - `mobile_app_android` — Android Mobile App
  - `mobile_app_hybrid` — Hybrid App (React Native / Flutter / Cordova)
  - `web_app` — Web Application (SPA / PWA)
  - `backend_api` — Backend API / Microservices
  - `saas_platform` — SaaS Platform (Multi-tenant)
  - `custom_tool` — Custom Tool / Utility
  - `plugin_extension` — Plugin / Browser Extension
  - `other` — Other (Specify below)
- **Related Field:** `project_type_other` (if "other" selected)
- **Contract Clause:** "The Scope of Work shall be for development of a **{project_type}** as defined in Section 2 below."

### 1.3 Business Use Case
- **Field Name:** `business_use_case`
- **Type:** Text (max 300 chars)
- **Required:** YES
- **Placeholder:** "What will this be used for? (e.g., 'Online marketplace for local vendors')"
- **Example:** "B2B platform to connect suppliers with manufacturers"
- **Contract Clause:** "Business Context: {business_use_case}"
- **Why Critical:** Affects "acceptable performance" during mediation

### 1.4 Criticality Level
- **Field Name:** `criticality_level`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `experimental` — Experimental (Test/MVP, failures acceptable)
  - `internal_tool` — Internal Tool (Employee use, non-critical)
  - `customer_facing` — Customer-Facing (Directly affects users/revenue)
  - `mission_critical` — Mission-Critical (Downtime = direct revenue loss)
- **Contract Clause:** "The System is classified as **{criticality_level}** per Criticality Matrix in Schedule A."
- **Impact:** 
  - Experimental: Lower SLA expectations, more tolerance for bugs
  - Mission-Critical: Higher SLA expectations, faster resolution required

---

## 🔷 SECTION 2: DETAILED SCOPE OF WORK (SOW)
**80% of software disputes start here — so we go DEEP**

### 2.1 Functional Features (Repeatable Block)
- **Block Name:** `features[]`
- **Type:** Array of Objects
- **Min Items:** 1, **Max Items:** 50

**Per Feature Object:**

#### 2.1.1 Feature Name
- **Field Name:** `feature_name`
- **Type:** Text (max 100 chars)
- **Required:** YES
- **Example:** "User Authentication & Login"

#### 2.1.2 Feature Description
- **Field Name:** `feature_description`
- **Type:** Textarea (max 500 chars)
- **Required:** YES
- **Placeholder:** "Describe exactly what this feature should do, including all scenarios"
- **Example:** "Allow users to register with email/phone, verify OTP, set password. Include 'forgot password' flow. Support Google/GitHub login."

#### 2.1.3 User Type / Role
- **Field Name:** `feature_user_type`
- **Type:** Multi-Select Tags
- **Options:**
  - `end_user` — End User
  - `admin` — Administrator
  - `vendor` — Vendor/Partner
  - `guest` — Guest/Anonymous
  - `support_team` — Support/CS Team
- **Example:** Selected: `end_user`, `admin`

#### 2.1.4 Must-Have vs Nice-to-Have
- **Field Name:** `feature_priority`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `must_have` — Must-Have (Blocking delivery)
  - `should_have` — Should-Have (Nice to have, but valuable)
  - `nice_to_have` — Nice-to-Have (Can skip without affecting core)
- **Impact on Disputes:** If marked "nice-to-have" but missing, NOT a valid dispute reason

#### 2.1.5 Acceptance Criteria Per Feature
- **Field Name:** `feature_acceptance_criteria`
- **Type:** Textarea (max 300 chars)
- **Required:** NO
- **Placeholder:** "How will you know this feature is complete? (e.g., 'User can login in <2s, email verified before access')"

---

### 2.2 User Roles & Permissions (Repeatable Block)
- **Block Name:** `user_roles[]`
- **Type:** Array of Objects
- **Min Items:** 0, **Max Items:** 20

**Per Role Object:**

#### 2.2.1 Role Name
- **Field Name:** `role_name`
- **Type:** Text
- **Required:** YES
- **Examples:** Admin, Vendor, End-User, Support Agent

#### 2.2.2 Role Description
- **Field Name:** `role_description`
- **Type:** Textarea
- **Required:** NO

#### 2.2.3 Permissions per Role
- **Field Name:** `role_permissions`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `view` — View/Read Data
  - `create` — Create New Records
  - `edit` — Edit Existing Records
  - `delete` — Delete Records
  - `export` — Export Data
  - `admin` — Admin/Settings Access
  - `approve` — Approve/Reject Submissions
  - `report` — View Reports

**Auto-Generated Clause:** "Role-based access control shall be implemented per the following matrix: [Table]"

---

### 2.3 Non-Functional Requirements (NFRs)
- **Block Name:** `nfr_block`
- **Type:** Object

#### 2.3.1 Performance Expectations
- **Field Name:** `performance_expectations`
- **Type:** Structured Data
- **Sub-fields:**
  - `page_load_time_desktop` (e.g., "< 3 seconds on 4G")
  - `page_load_time_mobile` (e.g., "< 5 seconds on 3G")
  - `api_response_time` (e.g., "< 500ms")
  - `concurrent_users_expected` (e.g., "1000 concurrent users")
- **Contract Clause:** "The System shall support {concurrent_users_expected} concurrent users with page load times not exceeding {page_load_time_desktop} on Desktop and {page_load_time_mobile} on Mobile."

#### 2.3.2 Supported Devices
- **Field Name:** `supported_devices`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `desktop_windows` — Desktop (Windows)
  - `desktop_mac` — Desktop (macOS)
  - `desktop_linux` — Desktop (Linux)
  - `tablet_ipad` — Tablet (iPad)
  - `tablet_android` — Tablet (Android)
  - `phone_ios` — Smartphone (iOS)
  - `phone_android` — Smartphone (Android)

#### 2.3.3 Supported Browsers
- **Field Name:** `supported_browsers`
- **Type:** Multi-Select with Version Input
- **Browsers:**
  - Chrome (Version: e.g., "v120+")
  - Safari (Version: e.g., "v17+")
  - Firefox (Version: e.g., "v121+")
  - Edge (Version: e.g., "v121+")
- **Contract Clause:** "The Application shall be compatible with {supported_browsers} and later versions."

#### 2.3.4 Availability Expectations
- **Field Name:** `availability_expectations`
- **Type:** Text
- **Placeholder:** "e.g., 'System must be available 99% of the time during business hours (9am-6pm IST)'"
- **NOT an SLA guarantee**, just expectations during development

---

### 2.4 Integrations & APIs (Repeatable Block)
- **Block Name:** `integrations[]`
- **Type:** Array of Objects
- **Min Items:** 0, **Max Items:** 20

**Per Integration Object:**

#### 2.4.1 Third-Party Service Name
- **Field Name:** `integration_name`
- **Type:** Predefined + Custom
- **Predefined Options:**
  - `payment_bharosepe` — Bharosepe 
  - `payment_razorpay` — Razorpay
  - `payment_stripe` — Stripe
  - `payment_paypal` — PayPal
  - `sms_twilio` — Twilio (SMS)
  - `email_sendgrid` — SendGrid (Email)
  - `auth_google` — Google Authentication
  - `auth_github` — GitHub Authentication
  - `storage_aws_s3` — AWS S3
  - `storage_google_cloud` — Google Cloud Storage
  - `maps_google` — Google Maps
  - `analytics_google` — Google Analytics
  - `custom` — Custom (Enter name)

#### 2.4.2 API Credentials Provider
- **Field Name:** `integration_credentials_provider`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `user_provides` — User/Client provides API keys & credentials
  - `developer_creates` — Developer creates (via client account)
  - `shared_corporate` — Shared corporate account
- **Contract Clause:** "The party selected in '{integration_credentials_provider}' shall be responsible for obtaining and managing credentials."
- **Critical for Disputes:** If credentials not provided, Developer not liable for missing integration

#### 2.4.3 Integration Behaviour
- **Field Name:** `integration_behaviour`
- **Type:** Single Select
- **Options:**
  - `read_only` — Read-Only (Data fetched from 3rd party)
  - `write_only` — Write-Only (Data sent to 3rd party)
  - `read_write` — Bidirectional (Read & Write)
  - `sync` — Sync (Periodic two-way sync)

#### 2.4.4 Dependency & Liability Note
- **Field Name:** `integration_liability_note`
- **Type:** Auto-populated + Editable
- **Default:** "If the API provider experiences downtime, service disruption, or API changes, the Developer shall not be liable for system failures related to this integration."
- **Contract Clause:** "{integration_liability_note}"

---

### 2.5 Data & Storage
- **Block Name:** `data_storage_block`
- **Type:** Object

#### 2.5.1 Database Required
- **Field Name:** `database_required`
- **Type:** Yes/No
- **Required:** YES

#### 2.5.2 Database Type (If Yes)
- **Field Name:** `database_type`
- **Type:** Single Select
- **Conditional:** Only appears if `database_required == true`
- **Options:**
  - `sql_postgresql` — SQL (PostgreSQL)
  - `sql_mysql` — SQL (MySQL)
  - `sql_sql_server` — SQL (SQL Server)
  - `nosql_mongodb` — NoSQL (MongoDB)
  - `nosql_firestore` — NoSQL (Firebase Firestore)
  - `supabase` — Supabase (PostgreSQL + Auth)
  - `dynamodb` — AWS DynamoDB
  - `other` — Other
- **Contract Clause:** "The data shall be stored using {database_type}."

#### 2.5.3 Data Migration
- **Field Name:** `data_migration_required`
- **Type:** Yes/No
- **Required:** YES

#### 2.5.4 Data Migration Details (If Yes)
- **Field Name:** `data_migration_details`
- **Type:** Textarea (max 500 chars)
- **Conditional:** Only if `data_migration_required == true`
- **Placeholder:** "Source system, data volume, expected schema changes, etc."
- **Example:** "Migrate 50,000 customer records from old Access DB, map 15 fields, handle duplicates"
- **Contract Clause:** "Data Migration Scope: {data_migration_details}. Data migration failures or data loss during migration is Developer's responsibility if backups not taken."

#### 2.5.5 Backup & Recovery
- **Field Name:** `backup_recovery_responsibility`
- **Type:** Single Select
- **Options:**
  - `developer_handles` — Developer handles all backups
  - `user_handles` — User/Client handles backups
  - `shared` — Shared responsibility (specify details below)
- **Details Field:** `backup_recovery_details` (Textarea, if "shared")

---

### 2.6 Out-of-Scope Section (Critical!)
- **Field Name:** `out_of_scope_items`
- **Type:** Textarea (max 1000 chars)
- **Required:** NO
- **Placeholder:** "The following items are explicitly NOT included in this contract..."
- **Examples:**
  - "Mobile app (only web version included)"
  - "Server hosting and infrastructure setup"
  - "User training sessions"
  - "Marketing materials"
  - "Third-party license fees"
- **Contract Clause:**
  ```
  OUT OF SCOPE:
  The following items are explicitly not included in the scope of this project:
  
  {out_of_scope_items}
  
  Any work beyond the defined scope shall be treated as a Change Request
  and quoted separately.
  ```
- **Dispute Impact:** If dispute claims missing feature was in scope, this section is the primary reference

---

## 🔷 SECTION 3: DELIVERABLES (GRANULAR)

### 3.1 Source Code Delivery
- **Field Name:** `source_code_delivery`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `yes_full` — YES (Full source code)
  - `yes_partial` — Partial (Frontend only / Backend only / specify)
  - `no_compiled_only` — NO (Compiled/built version only)
- **Related Field:** `source_code_partial_details` (if "partial")
- **Contract Clause:** "Source code shall be delivered as per the following: {source_code_delivery}"

### 3.2 Repository Type
- **Field Name:** `repository_type`
- **Type:** Single Select
- **Conditional:** Only if `source_code_delivery != 'no_compiled_only'`
- **Options:**
  - `github_public` — GitHub (Public)
  - `github_private` — GitHub (Private)
  - `gitlab_private` — GitLab (Private)
  - `self_hosted` — Self-Hosted Git
  - `zip_file` — ZIP File Only (No repo access)
- **Contract Clause:** "Source code repository shall be hosted on {repository_type}."

### 3.3 Design Assets
- **Field Name:** `design_assets_included`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `figma_project` — Figma Project (Full access)
  - `xd_project` — Adobe XD Project
  - `sketch_project` — Sketch Project
  - `high_fidelity_mockups` — High-Fidelity Mockups (PDF/Images)
  - `style_guide` — UI/Component Style Guide
  - `wireframes` — Wireframes
  - `none` — None / Not included
- **Contract Clause:** "The following design assets shall be provided: {design_assets_included}"

### 3.4 Documentation
- **Field Name:** `documentation_included`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `setup_guide` — Setup/Installation Guide
  - `api_documentation` — API Documentation
  - `user_manual` — User Manual
  - `architecture_docs` — Architecture & Design Documentation
  - `deployment_guide` — Deployment Guide
  - `code_comments` — Inline Code Comments
  - `none` — None / Not included
- **Contract Clause:** "The following documentation shall be provided: {documentation_included}"

### 3.5 Deployable Artifacts
- **Field Name:** `deployable_artifacts`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `apk_android` — APK (Android)
  - `ipa_ios` — IPA (iOS)
  - `docker_image` — Docker Image
  - `build_zip` — Build ZIP/Bundle
  - `static_files` — Static Files (HTML/CSS/JS)
  - `executable` — Executable (.exe, .dmg, etc.)
  - `none` — None / Not included
- **Contract Clause:** "Deployable artifacts to be provided: {deployable_artifacts}"

### 3.6 Environment Setup
- **Field Name:** `environment_setup_included`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `dev_environment` — Dev Environment Setup
  - `staging_environment` — Staging Environment Setup
  - `production_setup` — Production Setup & Deployment
- **Contract Clause:** "Developer shall set up the following environments: {environment_setup_included}"

---

## 🔷 SECTION 4: TIMELINES, MILESTONES & DEPENDENCIES

### 4.1 Overall Expected Completion Date
- **Field Name:** `expected_completion_date`
- **Type:** Date Picker
- **Required:** YES
- **Format:** YYYY-MM-DD
- **Contract Clause:** "The expected completion and delivery of the project is **{expected_completion_date}**. Extensions may be granted if delays occur due to factors listed in Section 4.3 below."
- **Note:** This is NOT a hard deadline, but basis for delay claims

### 4.2 Milestones (Repeatable Block)
- **Block Name:** `milestones[]`
- **Type:** Array of Objects
- **Min Items:** 1, **Max Items:** 30

**Per Milestone Object:**

#### 4.2.1 Milestone Name
- **Field Name:** `milestone_name`
- **Type:** Text
- **Required:** YES
- **Examples:** "Phase 1: User Auth & Dashboard", "MVP Launch", "QA & Testing"

#### 4.2.2 Milestone Description
- **Field Name:** `milestone_description`
- **Type:** Textarea
- **Required:** YES
- **Placeholder:** "What exactly will be completed in this milestone?"

#### 4.2.3 Expected Completion Date
- **Field Name:** `milestone_due_date`
- **Type:** Date Picker
- **Required:** YES

#### 4.2.4 Work Percentage
- **Field Name:** `milestone_work_percentage`
- **Type:** Number (1-100)
- **Required:** YES
- **Example:** 30 (30% of total work)
- **Validation:** Sum of all milestones must equal 100%
- **Use Case:** For calculating partial refunds if project stops early

#### 4.2.5 Deliverables in This Milestone
- **Field Name:** `milestone_deliverables`
- **Type:** Textarea
- **Required:** YES
- **Placeholder:** "List all features/deliverables expected in this milestone"

---

### 4.3 Dependencies & Prerequisites
- **Field Name:** `dependencies_prerequisites`
- **Type:** Multi-Select Checkboxes (with details)
- **Checkbox Options:**
  - `branding_assets` — Branding (Logo, colors, fonts)
  - `content_copy` — Content/Copy/Text
  - `api_keys` — API Keys & Credentials
  - `server_access` — Server/Infrastructure Access
  - `database_setup` — Database Setup & Access
  - `design_approval` — Design Approval from Client
  - `requirements_clarity` — Clear Requirements Finalization
  - `data_provided` — Test Data / Existing Data
  - `other` — Other (Specify below)

**Per Selected Dependency:**
- **Details Field:** `dependency_details_<name>` (Textarea)
- **Example:** For "branding_assets": "Client to provide: logo.png, color palette (hex codes), fonts (TTF files)"

#### 4.3.1 Auto-Generated Delay Clause
```
DELAY CLAUSE (Auto-Generated):
If the Client fails to provide the following prerequisites on time,
the Developer's timeline shall be extended accordingly:

{dependencies_prerequisites with details}

For each day of delay in Client delivery, the Project completion date
shall be extended by that same number of days.
```

---

## 🔷 SECTION 5: REVISIONS, CHANGES & SCOPE CREEP

### 5.1 Number of Revisions Included
- **Field Name:** `revisions_included`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `0` — Zero Revisions (Deliver once, take-it-or-leave-it)
  - `1` — 1 Revision Round
  - `2` — 2 Revision Rounds
  - `3` — 3 Revision Rounds
  - `unlimited` — Unlimited Revisions (until satisfied)
  - `custom` — Custom Number (enter below)
- **Custom Field:** `revisions_custom_number` (if "custom")
- **Contract Clause:** "The Client shall receive {revisions_included} revisions. Each revision round shall be completed within 5 business days."

### 5.2 Revision Scope (What CAN be revised)
- **Field Name:** `revision_scope_allowed`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `text_changes` — Minor text/copy changes
  - `color_changes` — Color changes
  - `layout_adjustments` — Layout/positioning adjustments
  - `ux_tweaks` — Small UX tweaks
  - `bug_fixes` — Bug fixes
- **Contract Clause:** "Revisions are limited to the following scope: {revision_scope_allowed}"

### 5.3 Revision Scope (What CANNOT be revised)
- **Field Name:** `revision_scope_excluded`
- **Type:** Multi-Select Checkboxes (Pre-selected defaults)
- **Default Options:**
  - ✓ `new_features` — New Features
  - ✓ `new_pages` — New Pages/Screens/Modules
  - ✓ `new_modules` — New Functionality
  - ✓ `logic_changes` — Business Logic Changes
  - ✓ `architecture_changes` — Architecture/Technology Changes
- **Contract Clause:** "The following are explicitly NOT included in revision rounds: {revision_scope_excluded}. Any such work shall require a Change Request and separate quote."

### 5.4 Change Request Process
- **Field Name:** `change_request_process`
- **Type:** Textarea
- **Required:** YES
- **Placeholder:** "How should new feature requests be handled? (e.g., 'Via email with 48-hour quote turnaround')"
- **Default:** "Any change request outside the revision scope shall be submitted in writing. Developer shall provide a separate quote within 48 hours. Work shall commence only after written approval and any required deposit."
- **Contract Clause:** "CHANGE REQUEST PROCESS: {change_request_process}"

---

## 🔷 SECTION 6: TESTING, QA & ACCEPTANCE CRITERIA

### 6.1 Testing Responsibility
- **Field Name:** `testing_responsibility`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `developer_only` — Developer Only (Internal testing)
  - `both_parties` — Both Parties (Client participates in testing)
  - `uat_by_client` — UAT by Client (Client does final acceptance testing)
- **Contract Clause:** "Testing shall be handled by: {testing_responsibility}"

### 6.2 Testing Types Included
- **Field Name:** `testing_types_included`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `unit_tests` — Unit Tests
  - `integration_tests` — Integration Tests
  - `uat_support` — UAT Support (Client testing sessions)
  - `performance_testing` — Performance/Load Testing
  - `security_testing` — Basic Security Testing
  - `cross_browser_testing` — Cross-browser Testing
  - `accessibility_testing` — Accessibility Testing (A11y)
- **Contract Clause:** "The following testing shall be included: {testing_types_included}"

### 6.3 Bug Severity Definitions (For Mediation)
- **Block Name:** `bug_severity_definitions`
- **Type:** Object with pre-defined severity levels

#### 6.3.1 Critical Severity
- **Field Name:** `bug_critical_definition`
- **Type:** Textarea
- **Default:** "System crashes, core feature completely non-functional, data loss, security vulnerability, or product cannot be used for primary purpose"
- **Auto-populated but editable**

#### 6.3.2 Major Severity
- **Field Name:** `bug_major_definition`
- **Type:** Textarea
- **Default:** "Main feature works but with significant issues, intermittent failures, user can work around but significantly delayed"

#### 6.3.3 Minor Severity
- **Field Name:** `bug_minor_definition`
- **Type:** Textarea
- **Default:** "Cosmetic issues, alignment problems, typos, small text issues, does not impact core functionality"

**Contract Clause:**
```
BUG SEVERITY MATRIX:

CRITICAL: {bug_critical_definition}
MAJOR: {bug_major_definition}
MINOR: {bug_minor_definition}

During the Support Period, the Developer shall fix all CRITICAL and MAJOR
bugs at no additional cost. MINOR bugs may require a separate service request.
```

### 6.4 Acceptance Criteria (Super Important!)
- **Field Name:** `acceptance_criteria_general`
- **Type:** Textarea (max 500 chars)
- **Required:** YES
- **Placeholder:** "Define what 'done' looks like. Example: 'System passes all tests, no critical/major bugs, features match the Scope of Work, performance benchmarks met'"
- **Example Criteria:**
  - All features from Section 2.1 working without critical bugs
  - Page loads under 3 seconds
  - Supports all specified browsers
  - All user roles can access their designated features
  - API integrations functional
  - Data migrations complete without data loss
  - Documentation provided and accurate
- **Contract Clause:**
  ```
  PROJECT ACCEPTANCE CRITERIA:
  
  The project shall be considered complete and accepted when ALL of the following
  criteria are met:
  
  {acceptance_criteria_general}
  
  Upon satisfaction of these criteria and client approval in writing,
  the project shall be marked as DELIVERED.
  ```

---

## 🔷 SECTION 7: SUPPORT, WARRANTY & POST-DELIVERY

### 7.1 Bug-Fix Support Period
- **Field Name:** `bugfix_support_period`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `none` — No Support (As-is delivery)
  - `7_days` — 7 Days
  - `30_days` — 30 Days
  - `60_days` — 60 Days
  - `90_days` — 90 Days
  - `6_months` — 6 Months
  - `1_year` — 1 Year
  - `custom` — Custom Period (Specify days below)
- **Custom Field:** `bugfix_support_custom_days` (if "custom")
- **Contract Clause:** "Developer shall provide bug-fix support for a period of **{bugfix_support_period}** from the delivery/acceptance date. Support includes identification and fixing of bugs identified during this period."

### 7.2 What Bugs Are Covered in Support
- **Field Name:** `bugs_covered_in_support`
- **Type:** Multi-Select Checkboxes
- **Default Options:**
  - ✓ `critical_major` — Critical & Major bugs only
  - `all_severities` — All severity levels (within reason)
- **Contract Clause:** "Bug-fix support shall cover: {bugs_covered_in_support}"

### 7.3 Support Channels
- **Field Name:** `support_channels_available`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `email` — Email
  - `phone` — Phone Call
  - `whatsapp` — WhatsApp
  - `ticket_system` — Ticket/Issue Tracking System
  - `video_call` — Video Call (for critical issues)
- **Contract Clause:** "Client may reach support via: {support_channels_available}"

### 7.4 Support Response Time (Optional SLA)
- **Field Name:** `support_response_time`
- **Type:** Single Select (Optional)
- **Options:**
  - `none` — No specific response time guarantee
  - `4_hours` — 4 Hours (Business hours only)
  - `24_hours` — 24 Hours
  - `48_hours` — 48 Hours
  - `custom` — Custom (Specify below)
- **Custom Field:** `support_response_custom` (if "custom")
- **Contract Clause:** "Support response time: {support_response_time} (on best-effort basis)"
- **Important Note:** "This is a best-effort commitment, not a legal SLA"

### 7.5 What's EXCLUDED from Support
- **Field Name:** `support_excluded_items`
- **Type:** Multi-Select Checkboxes (Pre-selected defaults)
- **Default Checked:**
  - ✓ `new_features` — New features or feature enhancements
  - ✓ `new_design` — Design changes or new design
  - ✓ `os_updates` — OS/Browser/Dependency updates after delivery
  - ✓ `third_party_downtime` — Third-party service downtime (payment gateways, APIs, etc.)
  - ✓ `client_modifications` — Modifications made by client or third party
  - ✓ `hosting_issues` — Server hosting/infrastructure issues
  - ✓ `data_recovery` — Data recovery (client responsible for backups)
- **Contract Clause:**
  ```
  The following are EXPLICITLY EXCLUDED from Support:
  {support_excluded_items}
  
  Any support requests related to these items shall be quoted separately as
  a Change Request or Maintenance Service.
  ```

---

## 🔷 SECTION 8: THIRD-PARTY, LICENSES & IP

### 8.1 Open-Source Libraries Usage
- **Field Name:** `open_source_used`
- **Type:** Yes/No
- **Required:** YES

### 8.2 Open-Source Details (If Yes)
- **Field Name:** `open_source_details`
- **Type:** Textarea
- **Conditional:** If `open_source_used == true`
- **Placeholder:** "List key open-source libraries/frameworks used (e.g., React, Node.js, PostgreSQL, etc.) and their licenses"
- **Example:** "React (MIT License), Express.js (MIT License), Material-UI (MIT License)"

### 8.3 Open-Source License Impact
- **Field Name:** `open_source_license_impact`
- **Type:** Textarea
- **Auto-populated Default:** "Open-source components used under their respective licenses. Client to review licenses for compliance with their use case. Developer not liable for open-source license violations."
- **Editable**

### 8.4 Paid Licenses Required
- **Field Name:** `paid_licenses_required`
- **Type:** Yes/No

### 8.5 Paid Licenses Details (If Yes)
- **Field Name:** `paid_licenses_details`
- **Type:** Textarea
- **Conditional:** If `paid_licenses_required == true`
- **Placeholder:** "What paid licenses are needed? (e.g., 'Adobe Fonts: $10/month', 'Mapbox API: $300/month')"

### 8.6 Who Pays for Licenses
- **Field Name:** `license_payment_responsibility`
- **Type:** Single Select
- **Conditional:** If `paid_licenses_required == true`
- **Options:**
  - `client_pays` — Client pays for all licenses
  - `developer_covers` — Developer covers license costs (included in project price)
  - `shared` — Shared (specify which licenses per party)
- **Details Field:** `license_payment_details` (Textarea, if "shared")
- **Contract Clause:** "Responsibility for paid licenses: {license_payment_responsibility}. {license_payment_details}"

### 8.7 Intellectual Property Ownership
- **Field Name:** `ip_ownership_model`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_transfer` — Full Ownership Transfer to Client (after payment)
  - `limited_license` — Limited License (Client can use, Developer retains)
  - `compiled_only` — Compiled Build Only (No source code ownership)
  - `custom` — Custom Arrangement (Specify below)
- **Custom Details:** `ip_ownership_custom` (Textarea, if "custom")

**Contract Clause:**
```
INTELLECTUAL PROPERTY OWNERSHIP:

Model Selected: {ip_ownership_model}

{if full_transfer}
All intellectual property, code, designs, and documentation created under this
project shall transfer to the Client upon:
1. Full payment of the agreed project price, AND
2. Acceptance of deliverables per Section 6 (Acceptance Criteria)

After IP transfer, the Developer retains no rights to reuse, resell, or modify
this code or designs.
{/if}

{if limited_license}
The Client receives a non-exclusive, non-transferable license to use the
deliverables for their own business use only. The Developer retains all IP rights
and may reuse code/design patterns in future projects (with variations).

Client may NOT:
- Resell or sublicense
- Claim original authorship
- Use for competitive services

{/if}

{if compiled_only}
The Client receives only the compiled/built version for use. Source code ownership
remains with the Developer. Client may NOT decompile, reverse-engineer, or extract
source code.

{/if}

{if custom}
IP Ownership: {ip_ownership_custom}
{/if}
```

### 8.8 Reusable Components & Patterns
- **Field Name:** `reusable_components_note`
- **Type:** Textarea
- **Pre-filled Default:** "Developer may reuse generic UI patterns, utility functions, and architectural patterns learned during this project in future projects, but shall not reuse Client-specific logic, branding, or business rules."
- **Editable**

---

## 🔷 SECTION 9: LEGAL / COMMERCIAL SUMMARY
**User-Controlled Terms That Map Directly to Legal Clauses**

### 9.1 Total Project Price
- **Field Name:** `total_project_price`
- **Type:** Currency Input (INR)
- **Required:** YES
- **Placeholder:** "₹50,000"
- **Contract Clause:** "The total project price is **₹{total_project_price}}** (including all taxes if applicable)."

### 9.2 Payment Structure
- **Field Name:** `payment_structure`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `upfront_100` — 100% Upfront
  - `milestone_split` — Milestone-based splits (e.g., 30% on start, 70% on delivery)
  - `50_50` — 50% Upfront, 50% on Delivery
  - `on_delivery` — Full payment on delivery
  - `custom` — Custom payment schedule (specify below)
- **Details Field:** `payment_structure_custom` (if "custom")
- **Contract Clause:** "Payment shall follow this structure: {payment_structure}"

### 9.3 Inspection Window (Discovery Period)
- **Field Name:** `inspection_window_hours`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `immediate` — Immediate (No inspection period)
  - `24_hours` — 24 Hours
  - `48_hours` — 48 Hours
  - `72_hours` — 72 Hours
  - `7_days` — 7 Days
  - `14_days` — 14 Days
  - `30_days` — 30 Days
- **Contract Clause:** "The Client shall have **{inspection_window_hours}** from delivery to inspect the deliverables and report any issues. Issues reported after this window may not be eligible for refunds unless critical."

### 9.4 Refund Policy (If Applicable)
- **Field Name:** `refund_policy`
- **Type:** Single Select
- **Options:**
  - `none` — No Refund (Delivered work is final)
  - `full_if_not_delivered` — Full refund if project not delivered by deadline
  - `prorated_partial` — Prorated partial refund based on milestone completion %
  - `custom` — Custom refund terms (specify below)
- **Custom Field:** `refund_policy_custom` (Textarea, if "custom")
- **Contract Clause:**
  ```
  REFUND POLICY:
  {if none}
  Once project is delivered and accepted, all payments are final and non-refundable.
  {/if}
  
  {if full_if_not_delivered}
  If the Developer fails to deliver the project by {expected_completion_date},
  and the Client chooses to cancel, the Client shall receive a full refund
  of all payments made.
  {/if}
  
  {if prorated_partial}
  If the project is cancelled before completion, the Client receives a refund
  based on the percentage of work completed at the milestone level.
  
  Example: If 50% of milestones are complete, the Client pays 50% of the
  total price and receives a refund of the remaining 50%.
  {/if}
  
  {if custom}
  Refund Terms: {refund_policy_custom}
  {/if}
  ```

### 9.5 Late Delivery Penalty (Optional)
- **Field Name:** `late_delivery_penalty_enabled`
- **Type:** Yes/No
- **Required:** NO (Optional)

### 9.5a Late Delivery Penalty Details (If Yes)
- **Field Name:** `late_delivery_penalty_percent`
- **Type:** Number (0-5)
- **Conditional:** If `late_delivery_penalty_enabled == true`
- **Placeholder:** "Percentage of project price per day of delay (e.g., 0.5% = ₹250/day on ₹50k project)"
- **Max Cap Field:** `late_penalty_max_cap_percent`
- **Default:** 2% of total project price
- **Contract Clause:**
  ```
  LATE DELIVERY PENALTY:
  If the project is delivered after {expected_completion_date} (excluding delays
  due to force majeure or Client-caused delays as per Section 4.3), the Developer
  shall pay a penalty of {late_delivery_penalty_percent}% of the project price
  per day of delay, up to a maximum of {late_penalty_max_cap_percent}% of the
  total project price.
  
  Example: If {late_delivery_penalty_percent}% = 0.5% and total price is ₹50,000,
  the penalty is ₹250/day, capped at {late_penalty_max_cap_percent}% (₹1,000).
  ```

### 9.6 Jurisdiction & Dispute Resolution City
- **Field Name:** `jurisdiction_city`
- **Type:** Single Select with Autocomplete
- **Required:** YES
- **Placeholder:** "Select city where disputes will be mediated/arbitrated"
- **Options:** List of major Indian cities (Delhi, Mumbai, Bangalore, Hyderabad, Pune, Chennai, Kolkata, etc.)
- **Default:** "Mumbai"
- **Contract Clause:** "Any disputes arising from this contract shall be governed by the laws of the State of {jurisdiction_city} and subject to the exclusive jurisdiction of courts in {jurisdiction_city}, India."

### 9.7 Force Majeure Events
- **Field Name:** `force_majeure_included`
- **Type:** Checkbox (pre-checked)
- **Default:** Checked (YES, include)
- **Contract Clause (if checked):**
  ```
  FORCE MAJEURE:
  Neither party shall be held liable for non-performance due to unforeseen events
  beyond reasonable control, including but not limited to:
  - Natural disasters (earthquakes, floods, etc.)
  - War, terrorism, civil unrest
  - Government lockdowns or restrictions
  - Internet/electricity outages lasting >24 hours
  - Major cloud service provider outages
  
  In such events, timelines shall be extended by the duration of the force majeure event.
  ```

---

# 📸 PART B: DELIVERY/COMPLETION EVIDENCE FIELDS
**Submitted when work is marked as 'Delivered' or when raising disputes**

### B.1 At Time of Delivery (Normal Completion Flow)
When user clicks "Mark as Delivered / Completed", system should request:

#### B.1.1 Latest Build / Live Link
- **Field Name:** `delivery_build_link`
- **Type:** URL
- **Required:** YES
- **Placeholder:** "e.g., https://myapp.com or https://drive.google.com/file/d/xxx"
- **Validation:** URL must be accessible (system can ping it)

#### B.1.2 Repository Link (If source code included)
- **Field Name:** `delivery_repo_link`
- **Type:** URL
- **Required:** Conditional (if `source_code_delivery != 'no_compiled_only'`)
- **Placeholder:** "e.g., https://github.com/user/project"
- **Validation:** GitHub/GitLab URL format

#### B.1.3 Release Notes / Changelog
- **Field Name:** `delivery_release_notes`
- **Type:** Textarea (max 1000 chars)
- **Required:** YES
- **Placeholder:** "Summary of what was delivered in this version. What's new, what changed, known limitations?"

#### B.1.4 Key Features Screenshots
- **Field Name:** `delivery_screenshots`
- **Type:** File Upload (Multiple images)
- **Required:** YES
- **Accepted Formats:** JPG, PNG
- **Max Files:** 10
- **Per Screenshot:**
  - `screenshot_file`
  - `screenshot_label` (e.g., "Login Screen", "Dashboard", "User Profile")

#### B.1.5 Screen Recording (End-to-End Happy Path)
- **Field Name:** `delivery_video_recording`
- **Type:** File Upload or YouTube/Loom Link
- **Required:** NO (but highly recommended for software)
- **Max File Size:** 500 MB
- **Formats:** MP4, MOV, WebM, or link to Loom/YouTube
- **Instructions:** "Record yourself walking through the main features of the application. Keep it under 5 minutes."

#### B.1.6 Known Limitations / Caveats
- **Field Name:** `delivery_known_limitations`
- **Type:** Textarea
- **Required:** NO
- **Placeholder:** "List any known issues, workarounds, or features that don't work as expected"
- **Example:** "Search functionality is slow on very large datasets (>100k records). Workaround: Use filters."

#### B.1.7 Completed Milestones Checklist
- **Field Name:** `delivery_milestones_completed`
- **Type:** Multi-Select Checkboxes (from Section 4.2)
- **Options:** Auto-populated from the `milestones[]` array created in Section 4.2
- **Example:**
  - ☑ Phase 1: User Auth & Dashboard
  - ☑ Phase 2: Vendor Dashboard
  - ☑ Phase 3: Payment Integration
  - ☐ Phase 4: Analytics & Reporting

#### B.1.8 Environment Access Provided
- **Field Name:** `delivery_environment_access`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `dev_access` — Dev Environment Access (Credentials/Links provided)
  - `staging_access` — Staging Environment Access
  - `prod_access` — Production Environment Access
  - `database_access` — Database Access (Connection details)
  - `admin_credentials` — Admin User Credentials Provided
- **Related Fields (for each selected):**
  - `delivery_env_<name>_credentials` (Textarea, encrypted)
  - `delivery_env_<name>_instructions` (Textarea)

#### B.1.9 Documentation Submitted
- **Field Name:** `delivery_documentation_submitted`
- **Type:** Multi-Select Checkboxes (from Section 3.4)
- **Options:**
  - ☑ Setup Guide (attached as PDF/Markdown)
  - ☑ API Documentation
  - ☐ User Manual
  - ☑ Code Comments (in source)

#### B.1.10 System Requirements / Dependencies
- **Field Name:** `delivery_system_requirements`
- **Type:** Textarea
- **Required:** NO
- **Placeholder:** "List any system requirements, libraries, or dependencies needed to run this (e.g., 'Node.js v18+, React 18, PostgreSQL 12+')"

---

### B.2 At Time of Raising a Dispute
When someone clicks "Raise Dispute" for a software project, system should REQUIRE:

#### B.2.1 Dispute Reason (Category)
- **Field Name:** `dispute_reason_category`
- **Type:** Single Select (dropdown)
- **Required:** YES
- **Options:**
  - `not_delivered` — Work Not Delivered / Incomplete
  - `features_missing` — Features Missing or Not Working
  - `bugs_blocking_usage` — Critical Bugs Blocking Usage
  - `scope_not_followed` — Deliverables Don't Match Scope
  - `ip_ownership_issue` — IP Ownership / Licensing Problem
  - `quality_below_standard` — Quality Below Agreed Standards
  - `deadline_missed` — Deadline Missed Without Valid Reason
  - `undisclosed_limitations` — Undisclosed Bugs / Limitations
  - `late_payment` — Late Payment (if Developer raising)
  - `other` — Other (Specify below)

#### B.2.2 Detailed Dispute Description
- **Field Name:** `dispute_description_detailed`
- **Type:** Textarea (max 1500 chars)
- **Required:** YES
- **Placeholder:** "Provide a clear, detailed explanation of what's wrong and why you believe it violates the contract."

#### B.2.3 Dispute Severity Level
- **Field Name:** `dispute_severity`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `critical_blocking` — Critical (System completely unusable)
  - `major_significant` — Major (Main features broken)
  - `minor_cosmetic` — Minor (Cosmetic / workarounds exist)
- **Note:** "Severity affects inspection priority and response time"

#### B.2.4 Evidence: Screen Recording
- **Field Name:** `dispute_video_evidence`
- **Type:** File Upload or YouTube/Loom Link
- **Required:** YES
- **Max File Size:** 500 MB
- **Formats:** MP4, MOV, WebM, or Loom/YouTube link
- **Instructions:** "Record a video showing the issue. Walk through the steps to reproduce the problem. Keep it under 10 minutes."
- **System Validation:** Video must be playable and meet size/format requirements

#### B.2.5 Evidence: Screenshots
- **Field Name:** `dispute_screenshots_evidence`
- **Type:** File Upload (Multiple images)
- **Required:** YES (at least 1)
- **Max Files:** 10
- **Per Screenshot:**
  - `screenshot_file` (JPG/PNG)
  - `screenshot_annotation` (Textarea, max 200 chars)
  - **Example Annotation:** "User clicks 'Login', enters credentials, system shows this error"

#### B.2.6 Evidence: Error Logs / Console Output
- **Field Name:** `dispute_error_logs`
- **Type:** Textarea or File Upload
- **Required:** NO (but highly recommended if applicable)
- **Max Size:** 2 MB
- **Formats:** .txt, .log, or paste directly
- **Instructions:** "If there are error messages, system logs, or console errors, provide them here. Helps with root cause analysis."

#### B.2.7 Evidence: Live Access Link
- **Field Name:** `dispute_live_environment_link`
- **Type:** URL
- **Required:** NO
- **Placeholder:** "Link to the live/staging system where the issue can be seen"
- **Validation:** System attempts to access and verify link is valid

#### B.2.8 Evidence: Related Chat/Communication
- **Field Name:** `dispute_related_communication`
- **Type:** Textarea or File Upload
- **Required:** NO
- **Instructions:** "If there are relevant chat messages, emails, or messages from the platform that relate to this dispute, you can paste or attach them here."
- **Note:** "Off-platform communications (WhatsApp, personal email) may not be admissible in mediation."

#### B.2.9 Reproducibility Steps
- **Field Name:** `dispute_reproduction_steps`
- **Type:** Textarea (numbered list)
- **Required:** YES
- **Placeholder:**
  ```
  Step-by-step instructions to reproduce the issue:
  1. Navigate to [URL]
  2. Enter [data]
  3. Click [button]
  4. Observe: [what happens vs. what should happen]
  ```
- **Example:**
  ```
  1. Go to https://myapp.com/checkout
  2. Add 3 items to cart
  3. Click "Proceed to Payment"
  4. Expected: Payment gateway opens. Actual: Page shows "Error 500"
  ```

#### B.2.10 Impact Statement
- **Field Name:** `dispute_business_impact`
- **Type:** Textarea
- **Required:** NO
- **Placeholder:** "How has this issue impacted your business? (e.g., 'We cannot process orders, losing ₹50k/day in revenue')"
- **Use:** Helps mediation engine understand urgency and severity

#### B.2.11 Requested Resolution
- **Field Name:** `dispute_requested_resolution`
- **Type:** Single Select or Text
- **Required:** YES
- **Options:**
  - `full_refund` — Full refund of project price
  - `partial_refund` — Partial refund (specify amount below)
  - `fix_and_redelivery` — Fix the issue and re-deliver
  - `price_reduction` — Reduce project price (specify amount)
  - `additional_work` — Provide additional work/features at no cost
  - `other` — Other (Specify below)
- **Amount Field:** `dispute_refund_amount` (Currency, if "partial refund" or "price reduction")
- **Details Field:** `dispute_resolution_details` (Textarea, if "other")

---

# 🗄️ PART D: DATABASE SCHEMA MAPPING
**How these fields map to database columns in `form_submissions` table**

## New Columns Needed (60+ columns)

```sql
-- Section 1: Project Identity
project_title TEXT NOT NULL,
project_type TEXT NOT NULL, -- enum
project_type_other TEXT,
business_use_case TEXT NOT NULL,
criticality_level TEXT NOT NULL, -- enum

-- Section 2: Scope of Work (JSONB - flexible)
features_list JSONB, -- Array of {feature_name, description, user_type[], priority}
user_roles_permissions JSONB, -- Array of {role_name, description, permissions[]}
performance_expectations JSONB, -- {page_load_time_desktop, mobile, api_response_time, concurrent_users}
supported_devices TEXT[], -- array of device types
supported_browsers JSONB, -- {browser: version}
availability_expectations TEXT,
integrations JSONB, -- Array of {name, credentials_provider, behaviour, liability_note}
database_required BOOLEAN,
database_type TEXT,
data_migration_required BOOLEAN,
data_migration_details TEXT,
backup_recovery_responsibility TEXT,
out_of_scope_items TEXT,

-- Section 3: Deliverables
source_code_delivery TEXT NOT NULL, -- enum
source_code_partial_details TEXT,
repository_type TEXT,
design_assets_included TEXT[],
documentation_included TEXT[],
deployable_artifacts TEXT[],
environment_setup_included TEXT[],

-- Section 4: Timelines & Milestones
expected_completion_date DATE NOT NULL,
milestones JSONB, -- Array of {name, description, due_date, work_percentage, deliverables}
dependencies_prerequisites JSONB, -- {dependency_name, details}

-- Section 5: Revisions
revisions_included TEXT NOT NULL, -- enum or number
revisions_custom_number INTEGER,
revision_scope_allowed TEXT[],
revision_scope_excluded TEXT[],
change_request_process TEXT,

-- Section 6: Testing & QA
testing_responsibility TEXT NOT NULL, -- enum
testing_types_included TEXT[],
bug_severity_definitions JSONB, -- {critical, major, minor: definition text}
acceptance_criteria_general TEXT NOT NULL,

-- Section 7: Support
bugfix_support_period TEXT NOT NULL, -- enum
bugs_covered_in_support TEXT[],
support_channels_available TEXT[],
support_response_time TEXT,
support_response_custom TEXT,
support_excluded_items TEXT[],

-- Section 8: IP & Licenses
open_source_used BOOLEAN,
open_source_details TEXT,
open_source_license_impact TEXT,
paid_licenses_required BOOLEAN,
paid_licenses_details TEXT,
license_payment_responsibility TEXT,
license_payment_details TEXT,
ip_ownership_model TEXT NOT NULL, -- enum
ip_ownership_custom TEXT,
reusable_components_note TEXT,

-- Section 9: Legal/Commercial
total_project_price NUMERIC NOT NULL,
payment_structure TEXT NOT NULL, -- enum
payment_structure_custom TEXT,
inspection_window_hours TEXT NOT NULL, -- enum
refund_policy TEXT NOT NULL, -- enum
refund_policy_custom TEXT,
late_delivery_penalty_enabled BOOLEAN,
late_delivery_penalty_percent NUMERIC,
late_penalty_max_cap_percent NUMERIC,
jurisdiction_city TEXT NOT NULL,
force_majeure_included BOOLEAN,

-- Part B: Delivery Evidence
delivery_build_link TEXT,
delivery_repo_link TEXT,
delivery_release_notes TEXT,
delivery_screenshots JSONB, -- Array of {file_url, label}
delivery_video_recording TEXT, -- URL or file path
delivery_known_limitations TEXT,
delivery_milestones_completed TEXT[],
delivery_environment_access TEXT[],
delivery_env_credentials JSONB,
delivery_env_instructions JSONB,
delivery_documentation_submitted TEXT[],
delivery_system_requirements TEXT,

-- Part C: Dispute Evidence
dispute_reason_category TEXT,
dispute_description_detailed TEXT,
dispute_severity TEXT,
dispute_video_evidence TEXT, -- URL or file path
dispute_screenshots_evidence JSONB, -- Array of {file_url, annotation}
dispute_error_logs TEXT,
dispute_live_environment_link TEXT,
dispute_related_communication TEXT,
dispute_reproduction_steps TEXT,
dispute_business_impact TEXT,
dispute_requested_resolution TEXT,
dispute_refund_amount NUMERIC,
dispute_resolution_details TEXT,
```

---

# 🎯 PART E: AUTO-GENERATED CONTRACT CLAUSES
**Example of how contract clauses are generated from these fields**

When all fields are filled, the contract auto-generates sections like:

```
═══════════════════════════════════════════════════════════════════════════
ANNEXURE L — SOFTWARE DEVELOPMENT SERVICES
═══════════════════════════════════════════════════════════════════════════

PROJECT DETAILS
───────────────
Project Title: {project_title}
Project Type: {project_type}
Business Context: {business_use_case}
Criticality Level: {criticality_level}
Total Project Price: ₹{total_project_price}

SCOPE OF WORK
─────────────
{for each feature in features_list}
Feature: {feature_name}
Description: {feature_description}
User Types: {feature_user_type}
Priority: {feature_priority}
Acceptance Criteria: {feature_acceptance_criteria}
{/for}

Out of Scope:
{out_of_scope_items}

DELIVERABLES
────────────
Source Code: {source_code_delivery}
Repository: {repository_type}
Design Assets: {design_assets_included}
Documentation: {documentation_included}
Artifacts: {deployable_artifacts}
Environments: {environment_setup_included}

TIMELINES & MILESTONES
──────────────────────
Overall Completion: {expected_completion_date}

{for each milestone in milestones}
Milestone: {milestone_name}
Due Date: {milestone_due_date}
Work %: {milestone_work_percentage}
Deliverables: {milestone_deliverables}
{/for}

DEPENDENCIES & PREREQUISITES
─────────────────────────────
{for each dependency}
- {dependency_name}: {dependency_details}
  Timeline Extension: +{days} for each day of Client delay
{/for}

REVISIONS & CHANGE REQUESTS
───────────────────────────
Revision Rounds: {revisions_included}
Revision Types Allowed: {revision_scope_allowed}
Explicitly NOT Included: {revision_scope_excluded}
Change Request Process: {change_request_process}

TESTING & ACCEPTANCE
────────────────────
Testing Responsibility: {testing_responsibility}
Testing Types: {testing_types_included}
Bug Severity Matrix:
  - Critical: {bug_critical_definition}
  - Major: {bug_major_definition}
  - Minor: {bug_minor_definition}

Project Acceptance Criteria:
{acceptance_criteria_general}

POST-DELIVERY SUPPORT
─────────────────────
Support Period: {bugfix_support_period} from delivery date
Covered Bugs: {bugs_covered_in_support}
Support Channels: {support_channels_available}
Response Time: {support_response_time}
Excluded from Support: {support_excluded_items}

INTELLECTUAL PROPERTY
─────────────────────
IP Ownership Model: {ip_ownership_model}
{if ip_ownership_model == full_transfer}
All IP transfers to Client upon full payment and acceptance.
{/if}

Open-Source Components: {open_source_used}
{if open_source_used}
Libraries: {open_source_details}
{/if}

PAYMENT & COMMERCIAL TERMS
──────────────────────────
Total Price: ₹{total_project_price}
Payment Structure: {payment_structure}
Inspection Window: {inspection_window_hours}
Refund Policy: {refund_policy}

LEGAL & JURISDICTION
────────────────────
Governing Law: State of {jurisdiction_city}, India
Dispute Resolution: Courts in {jurisdiction_city}
Force Majeure: Included

═══════════════════════════════════════════════════════════════════════════
```

---

## 📝 SUMMARY

This SERVICE ANNEXURE L for Software Development provides:

✅ **56 Contract Creation Fields** → Become binding contract clauses  
✅ **18 Delivery Evidence Fields** → Needed when marking complete  
✅ **12 Dispute Evidence Fields** → Required when raising disputes  
✅ **60+ Database Columns** → Schema mapping for storage  
✅ **Auto-Generated Contract** → Clauses populate from form inputs  
✅ **Legally Strong** → Every field has legal implications  

**Next Steps:**
1. Add ANNEXURE L to `contractGenerationEngine.ts`
2. Update `CATEGORY_ANNEXURE_MAP` with `'software_development': 'L'`
3. Create database migration for new columns
4. Build form UI with all 86 fields
5. Add evidence validation rules

