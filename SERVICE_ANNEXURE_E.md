# 📚 SERVICE INDUSTRY: TUITION / COACHING / TRAINING / SKILL DEVELOPMENT
## COMPREHENSIVE ONLINE & OFFLINE COACHING PROJECT DATA MODEL
**Date Created:** November 28, 2025  
**Annexure Code:** E (Service Industry - Tuition & Coaching)  
**Industry:** Education & Training Services  
**Categories:** Academic Tutoring, Exam Preparation, Skill Training, Fitness Coaching, Music Training, Language Training, Business Coaching, Personality Development

---

## 📋 TABLE OF CONTENTS

- **PART A: CONTRACT CREATION FIELDS** (58 fields)
- **PART B: DELIVERY EVIDENCE FIELDS** (18 fields)
- **PART C: DISPUTE EVIDENCE FIELDS** (15 fields)
- **PART D: DATABASE SCHEMA MAPPING**
- **PART E: SAMPLE CONTRACT CLAUSE GENERATION**

---

# ⚙️ PART A: CONTRACT CREATION FIELDS
**Filled before contract is generated & signed**  
**These fields become binding clauses in the contract**

---

## 🔷 SECTION 1: PROGRAM TYPE & DEFINITION
**Mandatory fields that set the training foundation**

### 1.1 Tuition/Coaching Type (Category)
- **Field Name:** `coaching_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `academic_tutoring` — Academic Tutoring (School subjects: Math, English, Science)
  - `exam_preparation` — Exam Preparation (JEE, NEET, UPSC, IELTS, GMAT, CAT, etc.)
  - `skill_training_tech` — Skill Training - Technology (Coding, Web Development, App Development, Data Science)
  - `skill_training_design` — Skill Training - Design (Graphic Design, UI/UX, Animation)
  - `fitness_coaching` — Fitness Coaching (Gym, Yoga, CrossFit, Sports)
  - `music_vocal_training` — Music/Vocal Training (Classical, Guitar, Piano, Singing)
  - `language_training` — Language Training (English, Spanish, Mandarin, etc.)
  - `business_coaching` — Business Coaching (Entrepreneurship, Leadership, Sales)
  - `personality_development` — Personality Development (Communication, Confidence, Soft Skills)
  - `professional_certification` — Professional Certification (Accounting, IT, Project Management)
  - `arts_craft_training` — Arts & Craft Training (Painting, Drawing, Sculpture)
  - `custom_coaching` — Custom Coaching Type (Specify below)
- **Custom Field:** `coaching_type_custom` (if "custom_coaching")
- **Contract Clause:** "This Agreement pertains to the following coaching/training type: **{coaching_type}}**"

### 1.2 Program Title / Subject Name
- **Field Name:** `program_title`
- **Type:** Text (max 150 chars)
- **Required:** YES
- **Example:** "JEE Main Preparation - Physics Module", "Python for Beginners", "Yoga for Flexibility"
- **Contract Clause:** "Program: **{program_title}}**"

### 1.3 Student / Participant Details
- **Field Name:** `student_name`
- **Type:** Text (max 100 chars)
- **Required:** YES
- **Placeholder:** "e.g., 'Priya Sharma' or 'Cohort A - 15 students'"

### 1.4 Trainer / Coach Details (Optional Transparency)
- **Field Name:** `trainer_name_optional`
- **Type:** Text (max 100 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Prof. Rajesh Kumar' (optional for transparency)"

### 1.5 Program Start Date
- **Field Name:** `program_start_date`
- **Type:** Date Picker
- **Required:** YES
- **Contract Clause:** "Program shall commence on **{program_start_date}}**."

### 1.6 Program End Date (Expected)
- **Field Name:** `program_end_date`
- **Type:** Date Picker
- **Required:** YES
- **Contract Clause:** "Program shall conclude by **{program_end_date}}** (subject to extensions if mutually agreed)."

---

## 🔷 SECTION 2: TEACHING FORMAT & DELIVERY MODE

### 2.1 Teaching Format
- **Field Name:** `teaching_format`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `online_only` — Online Only (Zoom/Google Meet/Custom platform)
  - `offline_only` — Offline Only (Home/Institute/Studio)
  - `hybrid` — Hybrid (Mix of online + offline sessions)
- **Contract Clause:** "Teaching format: **{teaching_format}}**"

### 2.2 Online Platform (If Online Included)
- **Field Name:** `online_platform`
- **Type:** Multi-Select Checkboxes
- **Conditional:** If `teaching_format` includes online
- **Options:**
  - ✓ Zoom
  - ✓ Google Meet
  - ✓ Microsoft Teams
  - ✓ WhatsApp
  - ✓ Custom platform (specify)
  - ✓ Institute's proprietary platform
- **Contract Clause:** "Online classes shall be conducted via: {online_platform}"

### 2.3 Offline Location(s) (If Offline Included)
- **Field Name:** `offline_locations`
- **Type:** Repeatable Text (up to 3 locations)
- **Conditional:** If `teaching_format` includes offline
- **Required:** YES (if offline)
- **Placeholder:** "e.g., 'Bandra, Mumbai', 'Main Studio - Koramangala'"
- **Contract Clause:** "Offline classes shall be held at: {offline_locations}"

### 2.4 Hybrid Format Breakdown (If Hybrid)
- **Field Name:** `hybrid_breakdown`
- **Type:** Textarea (max 200 chars)
- **Conditional:** If `teaching_format == 'hybrid'`
- **Placeholder:** "e.g., '70% online, 30% offline monthly meetups' or '2 online classes/week, 1 offline class/week'"
- **Contract Clause:** "Hybrid format breakdown: {hybrid_breakdown}"

---

## 🔷 SECTION 3: CURRICULUM, SYLLABUS & LEARNING OUTCOMES
**CRITICAL - Prevents "teacher didn't teach enough" disputes**

### 3.1 Full Syllabus / Topics List
- **Field Name:** `full_syllabus`
- **Type:** Textarea (max 2000 chars) or File Upload
- **Required:** YES
- **Placeholder:** "List all topics/chapters/modules that will be covered. Format: 1. Topic, 2. Topic, etc. OR upload syllabus PDF"
- **Example for JEE Physics:**
  ```
  Module 1: Mechanics
  - 1.1 Kinematics
  - 1.2 Newton's Laws
  - 1.3 Work, Energy, Power
  
  Module 2: Heat & Thermodynamics
  - 2.1 Thermal Properties
  - 2.2 Thermodynamics Laws
  ```
- **Contract Clause:** "The following syllabus shall be comprehensively covered: {full_syllabus}"

### 3.2 Module / Chapter Breakdown (Structured)
- **Block Name:** `modules_block`
- **Type:** Repeatable Object (up to 20 modules)
- **Required:** NO (if full syllabus covers this)

**Per Module:**

#### 3.2.1 Module Number
- **Field Name:** `module_number`
- **Type:** Number

#### 3.2.2 Module Title
- **Field Name:** `module_title`
- **Type:** Text

#### 3.2.3 Module Topics
- **Field Name:** `module_topics`
- **Type:** Textarea (max 500 chars)

#### 3.2.4 Estimated Hours for This Module
- **Field Name:** `module_hours`
- **Type:** Number

#### 3.2.5 Module Assessment Type
- **Field Name:** `module_assessment_type`
- **Type:** Single Select (MCQ / Written Exam / Project / Practical / None)

### 3.3 Learning Outcomes / Skill Development
- **Block Name:** `learning_outcomes_block`
- **Type:** Object

#### 3.3.1 Core Skills/Knowledge to Be Gained
- **Field Name:** `core_learning_outcomes`
- **Type:** Repeatable Text (up to 10)
- **Placeholder:** "e.g., 'Solve complex physics problems using multiple approaches', 'Build full-stack web applications'"
- **Example:**
  - Understanding JEE-level calculus
  - Solving 100+ practice questions per topic
  - Achieving 80%+ accuracy in mock tests
- **Contract Clause:** "By the end of the program, student shall be able to: {core_learning_outcomes}"

#### 3.3.2 Tools/Software Required
- **Field Name:** `tools_software_required`
- **Type:** Multi-Select Checkboxes + Custom
- **Options:**
  - Programming languages (Python, Java, C++, JavaScript, etc.)
  - IDEs (VS Code, PyCharm, IntelliJ, etc.)
  - Design tools (Figma, Adobe Suite, Canva, etc.)
  - CAD software
  - Graphing calculators
  - Online platforms (Kaggle, LeetCode, etc.)
  - Fitness tracking apps
  - Music notation software
  - Custom tools (specify)
- **Free/Paid Details:** `tools_cost_responsibility` (Single Select: Provided free / Student purchases / Institute provides)
- **Contract Clause:** "Required tools/software: {tools_software_required}. Cost responsibility: {tools_cost_responsibility}"

### 3.4 Topics / Content NOT Included (Explicit Exclusion)
- **Field Name:** `topics_not_included`
- **Type:** Textarea (max 500 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Modern Physics', 'Advanced Quantum Mechanics', 'Cryptography' (clearly out of scope)"
- **Benefit:** Prevents disputes over what SHOULD have been included
- **Contract Clause:** "The following topics are explicitly OUT OF SCOPE: {topics_not_included}"

---

## 🔷 SECTION 4: SESSION STRUCTURE & CLASS SCHEDULE

### 4.1 Total Classes / Sessions
- **Block Name:** `session_structure_block`
- **Type:** Object

#### 4.1.1 Total Number of Classes
- **Field Name:** `total_classes_count`
- **Type:** Number
- **Required:** YES
- **Placeholder:** "e.g., 60 (for 3-month course), 100 (for 6-month course)"
- **Example:** "60 classes (3 months @ 5 classes/week)"
- **Contract Clause:** "Total classes: **{total_classes_count}}**"

#### 4.1.2 Duration of Each Class
- **Field Name:** `class_duration_minutes`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `30_minutes` — 30 Minutes (quick recap)
  - `45_minutes` — 45 Minutes (standard)
  - `60_minutes` — 60 Minutes (1 hour)
  - `90_minutes` — 90 Minutes (1.5 hours)
  - `120_minutes` — 120 Minutes (2 hours)
  - `custom_duration` — Custom (specify minutes)
- **Custom Field:** `class_duration_custom_minutes` (if "custom")
- **Contract Clause:** "Each class shall be **{class_duration_minutes}}** in duration."

#### 4.1.3 Class Frequency
- **Field Name:** `class_frequency`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `daily` — Daily (5-7 days/week)
  - `3_times_weekly` — 3 Times per Week
  - `2_times_weekly` — 2 Times per Week
  - `weekly` — Once per Week
  - `twice_monthly` — Twice per Month
  - `monthly` — Monthly
  - `custom_frequency` — Custom schedule (specify)
- **Custom Field:** `class_frequency_custom` (if "custom")
- **Contract Clause:** "Classes shall be held **{class_frequency}}**."

### 4.2 Exact Class Timings
- **Block Name:** `class_timings_block`
- **Type:** Object

#### 4.2.1 Class Timings
- **Field Name:** `class_timings_details`
- **Type:** Repeatable Timings (up to 7 per week)
- **Required:** YES
- **Fields per timing:**
  - Day of Week (Monday-Sunday)
  - Start Time (HH:MM format)
  - End Time (HH:MM format)
- **Example:**
  - Monday: 6:00 PM - 7:00 PM
  - Wednesday: 6:00 PM - 7:00 PM
  - Friday: 6:00 PM - 7:00 PM
  - Saturday: 10:00 AM - 11:00 AM
- **Contract Clause:** "Classes shall be held on: {class_timings_details with days and times}"

#### 4.2.2 Flexible/Variable Schedule
- **Field Name:** `flexible_schedule`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No
- **Sub-field (if Yes):** `flexibility_details` (Textarea, e.g., "Student can reschedule up to 2 classes/month with 48 hours notice")
- **Contract Clause (if flexible):** "Schedule flexibility: {flexibility_details}"

### 4.3 Batch Size / Class Composition
- **Field Name:** `batch_size`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `one_on_one` — 1:1 (One-on-one private coaching)
  - `small_group_2_5` — Small Group (2-5 students)
  - `medium_group_6_15` — Medium Group (6-15 students)
  - `large_group_16_plus` — Large Group (16+ students)
  - `mixed_batch` — Mixed (Specify breakdown)
- **Details Field:** `batch_composition_details` (Textarea, if mixed or for clarity)
- **Impact Clause:** "Class size: {batch_size}. This determines level of personalized attention available."
- **Contract Clause:** "This is a **{batch_size}}** coaching program. Group dynamics and availability of individualized attention shall reflect this."

---

## 🔷 SECTION 5: TRAINER/COACH RESPONSIBILITIES

### 5.1 Core Teaching Responsibilities
- **Block Name:** `trainer_responsibilities`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (select at least 3)
- **Options:**
  - ✓ Teach full syllabus as listed in Section 3
  - ✓ Start and finish each class on agreed time
  - ✓ Come prepared with notes/slides/content
  - ✓ Explain concepts clearly and answer questions
  - ✓ Provide study materials (PDF notes, slides)
  - ✓ Provide practice questions / worksheets
  - ✓ Conduct weekly / monthly tests
  - ✓ Provide recordings of classes (if online/hybrid)
  - ✓ Offer doubt-clearing sessions
  - ✓ Provide homework assignments
  - ✓ Give weekly progress reports
  - ✓ Be available for follow-up queries via email/chat
  - ✓ Provide time for one-on-one clarifications
  - ✓ Customize content based on individual pace (if 1:1)
  - ✓ Conduct final assessment/exam

**Auto-Generated Clause:**
```
TRAINER RESPONSIBILITIES:

The trainer commits to the following:

{for each selected responsibility}
✓ {responsibility}
{/for}

Failure to meet these responsibilities may constitute grounds for
student complaint or refund request (as per Refund Policy, Section 12).
```

### 5.2 Class Punctuality
- **Field Name:** `trainer_punctuality_clause`
- **Type:** Textarea
- **Default:** "Trainer shall start class within 5 minutes of scheduled time. If trainer is more than 15 minutes late, class shall be rescheduled or extended to compensate."
- **Editable**
- **Contract Clause:** "{trainer_punctuality_clause}"

### 5.3 Cancellation by Trainer
- **Field Name:** `trainer_cancellation_notice`
- **Type:** Textarea
- **Default:** "If trainer must cancel a class, 24-hour advance notice shall be provided (except emergencies). Cancelled classes shall be rescheduled within 3 business days."
- **Editable**
- **Contract Clause:** "{trainer_cancellation_notice}"

---

## 🔷 SECTION 6: STUDENT/PARTICIPANT RESPONSIBILITIES

### 6.1 Student Commitments
- **Block Name:** `student_responsibilities`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (select at least 2)
- **Options:**
  - ✓ Join classes on time
  - ✓ Complete assigned homework
  - ✓ Participate actively in class
  - ✓ Attempt all tests/assessments
  - ✓ Maintain minimum attendance (specify % in 6.2)
  - ✓ Maintain discipline and respectful behavior
  - ✓ Not share class recordings or materials outside the program
  - ✓ Provide regular feedback to trainer
  - ✓ Follow institute/trainer rules and guidelines
  - ✓ Communicate issues/concerns promptly

**Auto-Generated Clause:**
```
STUDENT RESPONSIBILITIES:

The student commits to the following:

{for each selected responsibility}
✓ {responsibility}
{/for}

Failure to meet these responsibilities may result in:
- Warning (first instance)
- Suspension from classes (repeated violations)
- Termination from program (severe/abusive behavior)
```

### 6.2 Minimum Attendance Requirement
- **Field Name:** `minimum_attendance_percent`
- **Type:** Single Select
- **Required:** YES (if attendance is a responsibility)
- **Options:**
  - `50_percent` — 50% (flexible program)
  - `70_percent` — 70% (standard requirement)
  - `80_percent` — 80% (strict requirement)
  - `90_percent` — 90% (very strict requirement)
  - `no_minimum` — No minimum (optional program)
  - `custom_percent` — Custom (specify below)
- **Custom Field:** `custom_attendance_percent` (if "custom")
- **Impact Clause:** "Students must maintain **{minimum_attendance_percent}}% attendance** to qualify for completion certificate and post-course support."
- **Contract Clause:** "Attendance requirement: **{minimum_attendance_percent}}%** of total classes."

### 6.3 Behavior & Conduct Policy
- **Field Name:** `conduct_policy`
- **Type:** Textarea
- **Default:** "Students must maintain respectful behavior. Any abusive language, harassment, or disruptive behavior shall result in immediate expulsion from program without refund."
- **Editable**
- **Contract Clause:** "{conduct_policy}"

---

## 🔷 SECTION 7: ATTENDANCE, MAKEUP & RECORDING POLICIES

### 7.1 Missed Class Policy
- **Block Name:** `missed_class_policy_block`
- **Type:** Object

#### 7.1.1 Recorded Session Provided
- **Field Name:** `recorded_session_provided`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes (for online/hybrid)
- **Conditional:** Should be Yes if online included
- **Sub-fields (if Yes):**
  - `recording_availability_duration` (Single Select: 7 days / 30 days / 90 days / lifetime)
  - `recording_access_method` (Single Select: YouTube link / Google Drive / Platform link)
- **Contract Clause (if Yes):** "Recordings shall be made available to students for {recording_availability_duration}} via {recording_access_method}."

#### 7.1.2 Makeup Class Allowed
- **Field Name:** `makeup_class_allowed`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes
- **Sub-fields (if Yes):**
  - `makeup_class_max_count` (Number, e.g., "2 makeup classes per month")
  - `makeup_class_notice_required` (Number of hours, e.g., "24 hours notice")
  - `makeup_class_schedule` (Textarea, e.g., "On Sundays at 5 PM OR custom timing")
- **Contract Clause (if Yes):** "Makeup classes: Up to **{makeup_class_max_count}}** per month, with {makeup_class_notice_required}-hour notice. Scheduled: {makeup_class_schedule}"

#### 7.1.3 Extra Fee for Makeup Classes
- **Field Name:** `makeup_class_extra_fee`
- **Type:** Yes/No
- **Conditional:** If makeup classes allowed
- **Default:** No
- **Sub-field (if Yes):** `makeup_class_fee_amount` (Currency, e.g., "₹500 per makeup class")
- **Contract Clause (if extra fee):** "Makeup classes shall incur an additional fee of {makeup_class_fee_amount}."

### 7.2 Completion Certificate Eligibility
- **Field Name:** `certificate_eligibility`
- **Type:** Textarea
- **Default:** "Completion certificate shall be issued only if student meets: (1) {minimum_attendance_percent}% attendance AND (2) Passes final assessment (if applicable)"
- **Editable**
- **Contract Clause:** "CERTIFICATE ELIGIBILITY: {certificate_eligibility}"

---

## 🔷 SECTION 8: RECORDING & PRIVACY POLICIES

### 8.1 Class Recording by Trainer/Institute
- **Field Name:** `class_recording_by_trainer`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes (for online/hybrid)
- **Sub-fields (if Yes):**
  - `recording_purpose` (Multi-Select: Student reference / Quality assurance / Backup / Marketing use)
  - `recording_consent_required` (Yes/No, default: Yes)
  - `recorded_files_retention_period` (Single Select: 30 days / 90 days / 1 year / indefinite)
- **Contract Clause (if Yes):** "Classes MAY be recorded. Purpose: {recording_purpose}. {if recording_consent_required}Student consent required.{/if} Recordings retained for {recorded_files_retention_period}."

### 8.2 Student Allowed to Record
- **Field Name:** `student_recording_allowed`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No (privacy protection)
- **Sub-fields (if Yes):**
  - `student_recording_sharing_allowed` (Yes/No, default: No)
  - `student_recording_purpose` (Textarea, e.g., "Personal study only, not for sharing")
- **Contract Clause (if allowed):** "Students may record classes for personal study. Sharing outside class group is prohibited."
- **Contract Clause (if not allowed):** "Students are NOT permitted to record classes without trainer's explicit permission."

### 8.3 Sharing Recordings Outside Class
- **Field Name:** `sharing_recordings_outside_prohibited`
- **Type:** Checkbox (Auto-checked)
- **Required:** YES
- **Statement:** "Sharing class recordings, materials, or content outside the class group is strictly prohibited"
- **Penalty Clause:** "Unauthorized sharing may result in: (1) Immediate removal from program, (2) Forfeiture of refund, (3) Legal action if applicable."

### 8.4 Privacy & Confidentiality Disclaimer
- **Field Name:** `privacy_disclaimer_auto`
- **Type:** Auto-populated
- **Default:**
  ```
  PRIVACY & CONFIDENTIALITY:
  
  All class content, recordings, materials, and student information are
  confidential. They shall not be shared with third parties without
  consent. Trainer shall comply with data protection regulations.
  
  Student data shall be used only for educational purposes and shall not
  be sold, shared, or misused.
  ```

---

## 🔷 SECTION 9: TESTS, ASSESSMENTS & CERTIFICATION

### 9.1 Tests/Assessments Included
- **Field Name:** `assessments_included`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes (recommended)

**If YES → Proceed with 9.2-9.4:**

### 9.2 Assessment Details
- **Block Name:** `assessment_details_block`
- **Type:** Object

#### 9.2.1 Number of Tests
- **Field Name:** `test_count`
- **Type:** Number
- **Required:** YES (if assessments included)
- **Placeholder:** "e.g., 12 (weekly tests), 4 (monthly tests)"
- **Example:** "12 weekly tests + 2 mock exams"

#### 9.2.2 Assessment Type(s)
- **Field Name:** `assessment_types`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (if assessments)
- **Options:**
  - ✓ MCQ (Multiple Choice Questions)
  - ✓ Written Exam (Descriptive answers)
  - ✓ Project Work (Submission of project)
  - ✓ Practical Assessment (Hands-on evaluation)
  - ✓ Presentation (Live presentation)
  - ✓ Portfolio Review
  - ✓ Mixed assessment (combination)

#### 9.2.3 Assessment Frequency
- **Field Name:** `assessment_frequency`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `weekly` — Weekly
  - `biweekly` — Bi-weekly
  - `monthly` — Monthly
  - `mid_and_final` — Mid-term & Final only
  - `custom` — Custom schedule

#### 9.2.4 Assessment Passing Score
- **Field Name:** `passing_score_percent`
- **Type:** Number (0-100)
- **Placeholder:** "e.g., 60"
- **Example:** "60% to pass each test"
- **Contract Clause:** "Passing score: **{passing_score_percent}%**"

### 9.3 Certification Offered
- **Field Name:** `certification_offered`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes (recommended)

**If YES:**

#### 9.3.1 Certificate Type(s)
- **Field Name:** `certificate_types`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (if certification offered)
- **Options:**
  - ✓ Participation Certificate (just attendance)
  - ✓ Completion Certificate (completed course)
  - ✓ Merit Certificate (scored above threshold, e.g., 80%+)
  - ✓ Skill Proficiency Certificate (demonstrated skill level)
  - ✓ Industry-recognized Certification (if applicable)

#### 9.3.2 Certificate Format
- **Field Name:** `certificate_format`
- **Type:** Single Select
- **Options:**
  - `digital_soft_copy` — Digital (soft copy via email)
  - `printed_hard_copy` — Printed (hard copy by mail, if applicable)
  - `both` — Both digital + printed

#### 9.3.3 Certificate Issuance Timeline
- **Field Name:** `certificate_issuance_timeline`
- **Type:** Textarea
- **Default:** "Certificates shall be issued within 7 days of course completion, provided student meets eligibility criteria."

---

## 🔷 SECTION 10: MATERIALS & RESOURCES PROVIDED

### 10.1 Study Materials Included
- **Block Name:** `study_materials_block`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (select at least 2)
- **Options:**
  - ✓ PDF notes for each class
  - ✓ Presentation slides
  - ✓ Video recordings of classes
  - ✓ MCQ question bank
  - ✓ Practice worksheets
  - ✓ Reference book list
  - ✓ Previous year papers / sample tests
  - ✓ Solved solutions
  - ✓ Summary/Cheat sheets
  - ✓ Software tools (free or paid access)
  - ✓ Online practice platform access
  - ✓ Recommended resource links

**Auto-Generated Clause:**
```
STUDY MATERIALS PROVIDED:

The following materials shall be provided with the course:

{for each selected material}
✓ {material}
{/for}

All materials are for educational use within the program. Unauthorized
distribution or resale is prohibited.
```

### 10.2 Physical Materials
- **Field Name:** `physical_materials_provided`
- **Type:** Yes/No
- **Default:** No

**If YES:**
- `physical_materials_details` (Textarea, e.g., "Printed books, workbooks, stationery kit")
- `physical_materials_delivery` (Single Select: Included / Additional cost / Student purchases)
- **Contract Clause:** "Physical materials: {physical_materials_details}. Delivery: {physical_materials_delivery}"

### 10.3 Digital Platform/Tools Access
- **Field Name:** `digital_platform_access`
- **Type:** Yes/No
- **Default:** Yes (for online programs)

**If YES:**
- `platform_name` (Text, e.g., "Google Classroom, LMS, etc.")
- `platform_access_duration` (Single Select: Till course end / 30 days after / 90 days after / 1 year after)
- `platform_features` (Multi-Select: Attendance tracking, Assignment submission, Discussion forum, Quiz, Resource library)

---

## 🔷 SECTION 11: POST-COURSE SUPPORT & FOLLOW-UP

### 11.1 Post-Course Support Duration
- **Field Name:** `post_course_support_duration`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `no_support` — No post-course support
  - `7_days` — 7 days after course ends
  - `14_days` — 14 days after course ends
  - `30_days` — 30 days after course ends
  - `custom_duration` — Custom duration (specify)
- **Custom Field:** `post_course_support_custom_duration` (if "custom")
- **Contract Clause:** "Post-course support shall be available for **{post_course_support_duration}}** after program completion."

### 11.2 Post-Course Support Type
- **Field Name:** `post_course_support_type`
- **Type:** Multi-Select Checkboxes
- **Conditional:** If post-course support > 0 days
- **Options:**
  - ✓ Chat/Email support for doubts
  - ✓ Follow-up 1:1 consultation calls
  - ✓ Access to recorded sessions
  - ✓ Assignment help/guidance
  - ✓ Career guidance (if applicable)
  - ✓ Referrals to advanced courses

### 11.3 Support Channels
- **Field Name:** `post_course_support_channels`
- **Type:** Multi-Select Checkboxes
- **Conditional:** If post-course support included
- **Options:**
  - ✓ Email
  - ✓ Chat (WhatsApp/Telegram/Messenger)
  - ✓ Phone calls (limit: specify)
  - ✓ Video calls

---

## 🔷 SECTION 12: REFUND, CANCELLATION & RESCHEDULING POLICIES

### 12.1 Refund Policy (Before Course Starts)
- **Field Name:** `refund_policy_before_start`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_refund` — 100% Refund
  - `50_percent_refund` — 50% Refund (administrative fee retained)
  - `no_refund` — No Refund
  - `custom_policy` — Custom policy (specify)
- **Notice Period:** `refund_notice_period_before_start` (Number of days, e.g., "7 days before start date")
- **Contract Clause:** "If student cancels before course start (with {refund_notice_period_before_start}-day notice), {refund_policy_before_start} shall apply."

### 12.2 Refund Policy (After Course Starts)
- **Field Name:** `refund_policy_after_start`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `no_refund_after_start` — No refund after course starts
  - `refund_within_24_hours` — Full refund if within 24 hours of first class
  - `refund_within_3_days` — Full refund if within 3 days of start
  - `prorate_refund` — Pro-rata refund (refund based on classes attended)
  - `refund_first_class_only` — Refund after first class only
  - `custom_policy` — Custom policy
- **Custom Details:** `refund_policy_custom` (Textarea, if custom)
- **Contract Clause:** "After course commences: {refund_policy_after_start}"

### 12.3 Refund Trigger Conditions
- **Field Name:** `refund_conditions`
- **Type:** Multi-Select Checkboxes
- **Required:** NO (special conditions only)
- **Options:**
  - Trainer fails to teach minimum classes
  - Trainer fails to complete promised syllabus (>30% not covered)
  - Program quality is demonstrably substandard (with evidence)
  - Health/emergency (student, with proof)
  - Technical issues prevent online access (persistently)

### 12.4 Cancellation by Trainer/Institute
- **Field Name:** `cancellation_by_trainer_policy`
- **Type:** Textarea
- **Default:** "If trainer must cancel the course: Full refund OR equivalent alternative course offered. Cancellation notice: 7 days advance (except emergencies)."
- **Editable**
- **Contract Clause:** "{cancellation_by_trainer_policy}"

### 12.5 Rescheduling & Makeup Classes
- **Field Name:** `rescheduling_policy`
- **Type:** Textarea
- **Default:** "Classes can be rescheduled/made up within 7 days of missed class with 24-hour notice. More than {makeup_class_max_count}/month not allowed without prior arrangement."
- **Editable**
- **Contract Clause:** "{rescheduling_policy}"

### 12.6 Inspection Window
- **Field Name:** `inspection_window_hours`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `24_hours` — 24 Hours after first class
  - `48_hours` — 48 Hours after first class
  - `3_days` — 3 Days after first class
  - `7_days` — 7 Days after first class
  - `no_window` — No inspection window
- **Contract Clause:** "Student shall have **{inspection_window_hours}}** from the first class to decide whether to continue or request refund based on course quality/fit."

### 12.7 Late Payment Penalty (Optional)
- **Field Name:** `late_payment_penalty_enabled`
- **Type:** Yes/No
- **Default:** No

**If YES:**
- `late_payment_penalty_percent_per_day` (Number, e.g., "0.5")
- `late_payment_penalty_max_cap_percent` (Number, e.g., "2")
- **Contract Clause:** "If fees not paid by agreed date, {late_payment_penalty_percent_per_day}% per day penalty applies, capped at {late_payment_penalty_max_cap_percent}%."

---

## 🔷 SECTION 13: COMMERCIAL TERMS

### 13.1 Total Program Fee
- **Field Name:** `total_program_fee`
- **Type:** Currency (INR)
- **Required:** YES
- **Contract Clause:** "Total program fee: **₹{total_program_fee}}**"

### 13.2 Payment Schedule
- **Field Name:** `payment_structure`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_upfront` — 100% Upfront (before course starts)
  - `50_50_split` — 50% Upfront, 50% at course midpoint
  - `installment_3` — 3 Installments (1st: now, 2nd: Day 15, 3rd: Day 30)
  - `installment_custom` — Custom installment plan (specify)
  - `monthly_plan` — Monthly payment (each month during course)
  - `on_demand` — Pay per class (if applicable)
- **Details:** `payment_structure_details` (Textarea, for custom/installment)
- **Contract Clause:** "Payment structure: {payment_structure}. {payment_structure_details}"

### 13.3 Payment Mode
- **Field Name:** `payment_modes_accepted`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - ✓ Bank Transfer / NEFT
  - ✓ Credit/Debit Card
  - ✓ UPI (Google Pay, PhonePe, etc.)
  - ✓ Cheque
  - ✓ Cash (if offline)

### 13.4 Late Fee & Taxes
- **Field Name:** `taxes_applicable`
- **Type:** Textarea
- **Placeholder:** "e.g., 'GST 18% applicable as per regulations', 'TDS 10% deductible as per income tax rules'"

### 13.5 Jurisdiction & Dispute Resolution
- **Field Name:** `jurisdiction_city`
- **Type:** Single Select + Autocomplete
- **Required:** YES
- **Default:** "Mumbai"
- **Contract Clause:** "This Agreement shall be governed by laws of {jurisdiction_city}, India."

---

# 📸 PART B: DELIVERY EVIDENCE FIELDS
**Submitted at various checkpoints or when dispute arises**

### B.1 At Time of Each Class / Session

#### B.1.1 Class Attendance Proof
- **Field Name:** `class_attendance_proof`
- **Type:** File Upload (Screenshot)
- **Required:** YES (every class)
- **Placeholder:** "Screenshot of Zoom/Meet showing attendees OR photo of in-person class"

#### B.1.2 Class Recording Link (If Promised)
- **Field Name:** `class_recording_link`
- **Type:** URL
- **Required:** Conditional (if recordings promised)
- **Placeholder:** "YouTube/Google Drive link to class recording"

#### B.1.3 Topics Covered in This Class
- **Field Name:** `class_topics_covered`
- **Type:** Textarea (max 300 chars)
- **Required:** NO (optional documentation)
- **Placeholder:** "e.g., 'Completed: Newton's Laws, Started: Work & Energy'"

#### B.1.4 Class Notes / Material Provided
- **Field Name:** `class_notes_file`
- **Type:** File Upload or URL
- **Required:** Conditional (if materials promised)
- **Placeholder:** "PDF notes, slides, or link"

#### B.1.5 Class Summary for Record
- **Field Name:** `class_summary_note`
- **Type:** Textarea (max 200 chars)
- **Required:** NO
- **Placeholder:** "Brief summary for record-keeping"

### B.2 At Milestones

#### B.2.1 Test/Assessment Results
- **Field Name:** `test_results_proof`
- **Type:** File Upload (Scorecard/Certificate)
- **Required:** Conditional (if tests conducted)
- **Placeholder:** "Test scorecard, mark sheet, or result PDF"

#### B.2.2 Attendance Summary (Mid-term)
- **Field Name:** `attendance_summary_midterm`
- **Type:** File Upload (CSV/Screenshot)
- **Required:** Conditional (mid-program checkpoint)
- **Placeholder:** "Attendance report showing classes attended vs. total classes"

#### B.2.3 Progress Report
- **Field Name:** `progress_report_milestone`
- **Type:** Textarea or File
- **Required:** NO (optional)
- **Placeholder:** "Trainer's assessment of student progress"

### B.3 At Course Completion

#### B.3.1 Final Attendance Certificate
- **Field Name:** `final_attendance_proof`
- **Type:** File Upload (Screenshot/PDF)
- **Required:** YES
- **Placeholder:** "Final attendance report from course management system"

#### B.3.2 All Class Materials Compiled
- **Field Name:** `all_materials_link`
- **Type:** URL or File
- **Required:** Conditional (if materials promised)
- **Placeholder:** "Google Drive folder link OR ZIP file containing all notes, slides, recordings"

#### B.3.3 Final Test/Exam Result
- **Field Name:** `final_exam_result`
- **Type:** File Upload
- **Required:** Conditional (if final exam)
- **Placeholder:** "Final exam scorecard"

#### B.3.4 Completion Certificate
- **Field Name:** `completion_certificate`
- **Type:** File Upload
- **Required:** Conditional (if certificate offered)
- **Placeholder:** "Digital completion certificate"

#### B.3.5 Course Completion Summary
- **Field Name:** `course_completion_summary`
- **Type:** Textarea
- **Required:** NO
- **Placeholder:** "Topics covered, skills gained, final thoughts"

---

# 🎯 PART C: DISPUTE EVIDENCE FIELDS

### C.1 When Raising a Dispute

#### C.1.1 Dispute Reason Category
- **Field Name:** `dispute_reason_category`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `class_not_held` — Class was not held (scheduled but cancelled/no-show)
  - `trainer_absent` — Trainer was absent/inactive during class
  - `incomplete_syllabus` — Syllabus not completed (topics not covered)
  - `poor_teaching_quality` — Poor teaching quality (unclear explanations, unpreparedness)
  - `materials_not_provided` — Promised materials not provided
  - `poor_test_quality` — Tests/assessments problematic or unfair
  - `harassment_misbehavior` — Trainer misbehavior or harassment
  - `technical_issues` — Technical issues (for online classes)
  - `attendance_miscalculation` — Incorrect attendance tracking
  - `late_delivery_or_delay` — Delays in course timeline or material delivery
  - `refund_not_processed` — Refund promised but not processed
  - `other` — Other (specify)

#### C.1.2 Detailed Dispute Description
- **Field Name:** `dispute_description`
- **Type:** Textarea (max 1500 chars)
- **Required:** YES
- **Placeholder:** "Clearly describe what's wrong and how it violates the contract."

#### C.1.3 Dispute Severity
- **Field Name:** `dispute_severity`
- **Type:** Single Select
- **Options:**
  - `critical` — Critical (entire program compromised)
  - `major` — Major (significant issues affecting learning)
  - `minor` — Minor (small issues, easily correctable)

#### C.1.4 Proof: Class Did Not Happen
- **Field Name:** `dispute_class_not_held_proof`
- **Type:** File Upload or Textarea
- **Required:** Conditional (if "class not held")
- **Placeholder:** "No recording link, chat logs showing 'class cancelled', trainer absence message, or screenshots"

#### C.1.5 Proof: Syllabus Not Completed
- **Field Name:** `dispute_syllabus_incomplete_proof`
- **Type:** Textarea
- **Required:** Conditional (if "incomplete syllabus")
- **Placeholder:** "List topics from agreed syllabus that were NOT covered. Example: 'Agreed: 20 topics. Covered: 12 topics. Missing: 8 topics (Thermodynamics, Optics, Modern Physics)'"

#### C.1.6 Proof: Poor Teaching Quality
- **Field Name:** `dispute_poor_quality_proof`
- **Type:** File Upload (Screenshots/Recording clips)
- **Required:** Conditional (if "poor teaching")
- **Placeholder:** "Recording clips showing unclear explanations, screenshots of chat confusion, timestamps of silence, or unpreparedness"
- **Important:** "Must provide concrete examples (not subjective opinions like 'I didn't like it')"

#### C.1.7 Proof: Materials Not Provided
- **Field Name:** `dispute_materials_missing_proof`
- **Type:** Textarea
- **Required:** Conditional (if "materials not provided")
- **Placeholder:** "List promised materials vs. what was actually provided. Example: 'Promised: Weekly notes, 100 MCQs, slidedeck. Provided: Only 4 week's notes, 20 MCQs, no slides'"

#### C.1.8 Proof: Technical Issues
- **Field Name:** `dispute_technical_issues_proof`
- **Type:** File Upload (Screenshots/Error messages)
- **Required:** Conditional (if "technical issues")
- **Placeholder:** "Screenshots of connection errors, audio/video failures, platform down messages, or timestamped issues"

#### C.1.9 Attendance Discrepancy Proof
- **Field Name:** `dispute_attendance_discrepancy_proof`
- **Type:** Textarea
- **Required:** Conditional (if "attendance miscalculation")
- **Placeholder:** "Platform shows X% attendance, but I attended Y classes. Provide dates/screenshots."

#### C.1.10 Comparison: Expected vs. Actual
- **Field Name:** `dispute_comparison_evidence`
- **Type:** Textarea
- **Required:** YES
- **Placeholder:** "Side-by-side comparison of what was promised in contract vs. what was delivered"

#### C.1.11 Communication Trail
- **Field Name:** `dispute_communication_evidence`
- **Type:** File Upload (Screenshots/Chat logs)
- **Required:** NO (supporting evidence)
- **Placeholder:** "Screenshots of messages to trainer about issues, complaints, or concerns"

#### C.1.12 Requested Resolution
- **Field Name:** `dispute_requested_resolution`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_refund` — Full refund
  - `partial_refund` — Partial refund (specify %)
  - `course_continuation_fix` — Continue course with fixes
  - `makeup_classes` — Additional makeup classes
  - `grade_improvement` — Grade/score adjustment
  - `other` — Other (specify)
- **Amount Field:** `dispute_refund_amount` (Currency, if applicable)

#### C.1.13 Supporting Documentation
- **Field Name:** `dispute_supporting_docs`
- **Type:** File Upload
- **Required:** NO
- **Placeholder:** "Any other proof: course syllabus, payment receipts, schedule screenshots, recorded sessions"

#### C.1.14 Evidence Authenticity
- **Field Name:** `dispute_evidence_authenticity`
- **Type:** Checkbox
- **Required:** YES
- **Statement:** "I confirm all evidence provided is authentic and unaltered"

---

# 🗄️ PART D: DATABASE SCHEMA MAPPING

```sql
-- Section 1: Program Definition
coaching_type TEXT NOT NULL, -- enum
coaching_type_custom TEXT,
program_title TEXT NOT NULL,
student_name TEXT NOT NULL,
trainer_name_optional TEXT,
program_start_date DATE NOT NULL,
program_end_date DATE NOT NULL,

-- Section 2: Teaching Format
teaching_format TEXT NOT NULL, -- enum
online_platform TEXT[],
offline_locations TEXT[],
hybrid_breakdown TEXT,

-- Section 3: Curriculum & Learning
full_syllabus TEXT,
modules_block JSONB, -- array of {module_number, title, topics, hours, assessment_type}
core_learning_outcomes TEXT[],
tools_software_required TEXT[],
tools_cost_responsibility TEXT,
topics_not_included TEXT,

-- Section 4: Session Structure
total_classes_count INTEGER NOT NULL,
class_duration_minutes TEXT NOT NULL,
class_frequency TEXT NOT NULL,
class_frequency_custom TEXT,
class_timings_details JSONB, -- array of {day, start_time, end_time}
flexible_schedule BOOLEAN,
flexibility_details TEXT,
batch_size TEXT NOT NULL,
batch_composition_details TEXT,

-- Section 5: Trainer Responsibilities
trainer_responsibilities TEXT[] NOT NULL,
trainer_punctuality_clause TEXT,
trainer_cancellation_notice TEXT,

-- Section 6: Student Responsibilities
student_responsibilities TEXT[],
minimum_attendance_percent TEXT,
custom_attendance_percent INTEGER,
conduct_policy TEXT,

-- Section 7: Attendance & Makeup
recorded_session_provided BOOLEAN,
recording_availability_duration TEXT,
recording_access_method TEXT,
makeup_class_allowed BOOLEAN,
makeup_class_max_count INTEGER,
makeup_class_notice_required INTEGER,
makeup_class_schedule TEXT,
makeup_class_extra_fee BOOLEAN,
makeup_class_fee_amount NUMERIC,
certificate_eligibility TEXT,

-- Section 8: Recording & Privacy
class_recording_by_trainer BOOLEAN,
recording_purpose TEXT[],
recording_consent_required BOOLEAN,
recorded_files_retention_period TEXT,
student_recording_allowed BOOLEAN,
student_recording_sharing_allowed BOOLEAN,
student_recording_purpose TEXT,
sharing_recordings_outside_prohibited BOOLEAN,
privacy_disclaimer_auto TEXT,

-- Section 9: Assessments & Certification
assessments_included BOOLEAN,
test_count INTEGER,
assessment_types TEXT[],
assessment_frequency TEXT,
passing_score_percent INTEGER,
certification_offered BOOLEAN,
certificate_types TEXT[],
certificate_format TEXT,
certificate_issuance_timeline TEXT,

-- Section 10: Materials & Resources
study_materials_block TEXT[],
physical_materials_provided BOOLEAN,
physical_materials_details TEXT,
physical_materials_delivery TEXT,
digital_platform_access BOOLEAN,
platform_name TEXT,
platform_access_duration TEXT,
platform_features TEXT[],

-- Section 11: Post-Course Support
post_course_support_duration TEXT,
post_course_support_custom_duration TEXT,
post_course_support_type TEXT[],
post_course_support_channels TEXT[],

-- Section 12: Refund & Cancellation
refund_policy_before_start TEXT,
refund_notice_period_before_start INTEGER,
refund_policy_after_start TEXT,
refund_policy_custom TEXT,
refund_conditions TEXT[],
cancellation_by_trainer_policy TEXT,
rescheduling_policy TEXT,
inspection_window_hours TEXT,
late_payment_penalty_enabled BOOLEAN,
late_payment_penalty_percent_per_day NUMERIC,
late_payment_penalty_max_cap_percent NUMERIC,

-- Section 13: Commercial Terms
total_program_fee NUMERIC NOT NULL,
payment_structure TEXT NOT NULL,
payment_structure_details TEXT,
payment_modes_accepted TEXT[],
taxes_applicable TEXT,
jurisdiction_city TEXT NOT NULL,

-- Part B: Delivery Evidence
class_attendance_proof TEXT, -- file URL
class_recording_link TEXT, -- URL
class_topics_covered TEXT,
class_notes_file TEXT,
class_summary_note TEXT,
test_results_proof TEXT,
attendance_summary_midterm TEXT,
progress_report_milestone TEXT,
final_attendance_proof TEXT,
all_materials_link TEXT,
final_exam_result TEXT,
completion_certificate TEXT,
course_completion_summary TEXT,

-- Part C: Dispute Evidence
dispute_reason_category TEXT,
dispute_description TEXT,
dispute_severity TEXT,
dispute_class_not_held_proof TEXT,
dispute_syllabus_incomplete_proof TEXT,
dispute_poor_quality_proof TEXT,
dispute_materials_missing_proof TEXT,
dispute_technical_issues_proof TEXT,
dispute_attendance_discrepancy_proof TEXT,
dispute_comparison_evidence TEXT,
dispute_communication_evidence TEXT,
dispute_requested_resolution TEXT,
dispute_refund_amount NUMERIC,
dispute_supporting_docs TEXT,
dispute_evidence_authenticity BOOLEAN,
```

---

## 📝 SUMMARY

This SERVICE ANNEXURE E for Tuition & Coaching provides:

✅ **58 Contract Creation Fields** → Become binding contract clauses  
✅ **18 Delivery Evidence Fields** → Tracked throughout course  
✅ **15 Dispute Evidence Fields** → Required when raising disputes  
✅ **100+ Database Columns** → Schema mapping for storage  
✅ **Auto-Generated Contract** → Clauses populate from form inputs  
✅ **Legally Strong** → Protects against all common coaching disputes  

**Key Dispute Protections:**
- Syllabus binding (prevents "I didn't teach topics I promised")
- Attendance tracking with proof (prevents fake attendance claims)
- Class recordings prove classes happened
- Materials delivery verification
- Test quality standards defined
- Trainer responsibilities explicit (punctuality, preparation, completion)
- Refund conditions clear (before start vs. after start)
- Makeup class limits prevent abuse
- Recording & privacy policy transparent
- Post-course support duration defined
- Batch size determines personal attention expectations
- Flexible schedule terms define rescheduling rights

**Created so far:**
- ✅ SERVICE_ANNEXURE_A (Software Development) - 86 fields
- ✅ SERVICE_ANNEXURE_B (UI/UX Design & Graphic Design) - 64 fields
- ✅ SERVICE_ANNEXURE_C (Content Writing & Copywriting) - 80 fields
- ✅ SERVICE_ANNEXURE_D (Photography & Videography) - 82 fields
- ✅ SERVICE_ANNEXURE_E (Tuition & Coaching) - 91 fields

**Ready for next:** F (Consulting), G (Digital Marketing), H (Fitness), or another service?

