# 📷 SERVICE INDUSTRY: PHOTOGRAPHY / VIDEOGRAPHY / EVENT SHOOTS / PRODUCT SHOOTS
## COMPREHENSIVE PHOTOGRAPHY & VIDEOGRAPHY PROJECT DATA MODEL
**Date Created:** November 28, 2025  
**Annexure Code:** D (Service Industry - Photography & Videography)  
**Industry:** Photography & Videography Services  
**Categories:** Wedding Photography, Event Photography, Product Photography, Videography, Real Estate, Food Photography, Corporate Events, Drone Footage, Studio Shoots

---

## 📋 TABLE OF CONTENTS

- **PART A: CONTRACT CREATION FIELDS** (52 fields)
- **PART B: DELIVERY EVIDENCE FIELDS** (16 fields)
- **PART C: DISPUTE EVIDENCE FIELDS** (14 fields)
- **PART D: DATABASE SCHEMA MAPPING**
- **PART E: SAMPLE CONTRACT CLAUSE GENERATION**

---

# ⚙️ PART A: CONTRACT CREATION FIELDS
**Filled before contract is generated & signed**  
**These fields become binding clauses in the contract**

---

## 🔷 SECTION 1: SHOOT TYPE & PROJECT DEFINITION
**Mandatory fields that set the photography/videography foundation**

### 1.1 Shoot Type (Project Category)
- **Field Name:** `shoot_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `wedding_photography` — Wedding Photography (Ceremony + Reception)
  - `wedding_cinematic_video` — Wedding Cinematic Videography (Cinematic video)
  - `pre_wedding_shoot` — Pre-Wedding Shoot (Couple photoshoot)
  - `birthday_event` — Birthday Event Photography/Video
  - `corporate_event` — Corporate Event Photography
  - `product_photography` — Product Photography (E-commerce)
  - `real_estate_photography` — Real Estate Photography
  - `food_photography` — Food Photography (Restaurant, Product)
  - `portfolio_shoot` — Portfolio/Model Photoshoot
  - `studio_shoot` — Studio Photoshoot (Controlled environment)
  - `documentary_filming` — Documentary Filming
  - `ad_shoot` — Advertisement / Commercial Shoot
  - `birthday_video` — Birthday Event Videography
  - `drone_footage` — Drone Photography/Videography
  - `custom_shoot` — Custom Shoot (Specify below)
- **Custom Field:** `shoot_type_custom` (if "custom")
- **Contract Clause:** "This Agreement pertains to the following shoot type: **{shoot_type}}**"

### 1.2 Project Title
- **Field Name:** `project_title`
- **Type:** Text (max 150 chars)
- **Required:** YES
- **Example:** "Priya & Rahul's Wedding Photography", "XYZ Corp Product Photoshoot"
- **Contract Clause:** "Project Title: **{project_title}}**"

### 1.3 Event/Shoot Date (Scheduled)
- **Field Name:** `shoot_date`
- **Type:** Date Picker
- **Required:** YES
- **Contract Clause:** "Scheduled shoot date: **{shoot_date}}**"

### 1.4 Shoot Location(s)
- **Field Name:** `shoot_locations`
- **Type:** Repeatable Text (up to 5 locations)
- **Required:** YES
- **Placeholder:** "e.g., 'Hotel XYZ, Delhi', 'Outdoor venue, Mumbai'"
- **Example:** 
  - Location 1: Bridal preparation at home
  - Location 2: Ceremony venue
  - Location 3: Reception venue
- **Contract Clause:** "Shoot locations: {shoot_locations}"

---

## 🔷 SECTION 2: COVERAGE REQUIREMENTS (EXTREMELY DETAILED)
**Critical for preventing "I didn't get what I expected" disputes**

### 2.1 Hours of Coverage
- **Block Name:** `coverage_block`
- **Type:** Object

#### 2.1.1 Coverage Duration
- **Field Name:** `coverage_hours_total`
- **Type:** Number (0.5 - 24)
- **Required:** YES
- **Placeholder:** "e.g., 8 (for full day event)"
- **Unit:** Hours
- **Example:** "8 hours of coverage from 9 AM to 5 PM"

#### 2.1.2 Coverage Start Time
- **Field Name:** `coverage_start_time`
- **Type:** Time Picker
- **Required:** YES
- **Example:** "09:00 AM"
- **Contract Clause:** "Coverage shall commence at **{coverage_start_time}}** and conclude at **{coverage_end_time}}**."

#### 2.1.3 Coverage End Time
- **Field Name:** `coverage_end_time`
- **Type:** Time Picker
- **Required:** YES
- **Example:** "05:00 PM"

#### 2.1.4 Break Policy (If Applicable)
- **Field Name:** `coverage_break_policy`
- **Type:** Textarea (max 200 chars)
- **Required:** NO
- **Placeholder:** "e.g., '30-min lunch break', 'No breaks — continuous coverage'"
- **Default:** "1-hour break after 5 hours of continuous coverage"
- **Contract Clause:** "Break policy: {coverage_break_policy}"

### 2.2 Type of Shots Required
- **Block Name:** `shot_types_required`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (at least 1)
- **Options:**
  - ✓ Candid (unposed, natural moments)
  - ✓ Traditional (posed family/group photos)
  - ✓ Drone (aerial drone shots)
  - ✓ Stage/Ceremony (focused on main event area)
  - ✓ Group Photos (family, friends groups)
  - ✓ Venue Coverage (overall space shots)
  - ✓ Behind-the-Scenes (preparation, candid moments)
  - ✓ Detail Shots (decorations, close-ups of jewelry, food, etc.)
  - ✓ Portraits (individual/couple portraits)
  - ✓ Fashion/Styling (clothing, jewelry details)
  - ✓ Night/Low-Light Shots (dance floor, lights, etc.)
- **Contract Clause:** "Photographer shall capture the following shot types: {shot_types_required}"

### 2.3 Number of Photographers
- **Field Name:** `photographer_count`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `1_photographer` — 1 Photographer
  - `2_photographers` — 2 Photographers
  - `3_photographers` — 3 Photographers
  - `4_or_more` — 4 or More Photographers (specify number)
- **Custom Field:** `photographer_count_custom` (if 4 or more)
- **Contract Clause:** "Number of photographers assigned: **{photographer_count}}**. All photographers shall maintain the same professional standards and shot consistency."

### 2.4 Number of Videographers
- **Field Name:** `videographer_count`
- **Type:** Single Select
- **Required:** Conditional (if video included)
- **Options:**
  - `no_videographer` — No Videography
  - `1_videographer` — 1 Videographer
  - `2_videographers` — 2 Videographers
  - `3_videographers` — 3 Videographers
  - `4_or_more` — 4 or More (specify)
- **Contract Clause (if video):** "Number of videographers assigned: **{videographer_count}}**."

### 2.5 Backup Coverage Requirements
- **Field Name:** `backup_coverage_required`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes (recommended)
- **Sub-fields (if Yes):**
  - `backup_photographer_backup` (Yes/No) — Backup photographer if primary gets sick
  - `backup_drone_operator` (Yes/No) — Backup drone pilot if primary unavailable
- **Contract Clause (if Yes):** "Backup coverage team shall be available. If primary photographer/videographer is unable to cover, backup team shall take over without additional cost."

---

## 🔷 SECTION 3: PHOTO DELIVERABLES (QUANTIFIED & BINDING)
**Prevents the "I thought I paid for 500 photos" disputes**

### 3.1 Total Edited Photos
- **Block Name:** `photo_deliverables_block`
- **Type:** Object

#### 3.1.1 Number of Edited Photos to Deliver
- **Field Name:** `edited_photos_count`
- **Type:** Number
- **Required:** YES (if photography included)
- **Placeholder:** "e.g., 300 (for wedding), 50 (for product shoot)"
- **Example:** "400 edited photos from 8-hour wedding coverage"
- **Contract Clause:** "Photographer shall deliver **{edited_photos_count}} edited, high-quality photographs**."

#### 3.1.2 Acceptable Deviation Range (±%)
- **Field Name:** `photo_count_deviation_percent`
- **Type:** Number (0-15)
- **Default:** 10
- **Placeholder:** "Acceptable ±% deviation (e.g., 10 = 360-440 photos if 400 agreed)"
- **Contract Clause:** "Photo count shall not deviate more than ±{photo_count_deviation_percent}% from {edited_photos_count}."

#### 3.1.3 Raw/Unedited Photos
- **Field Name:** `raw_photos_delivery`
- **Type:** Yes/No
- **Required:** YES
- **Sub-fields (if Yes):**
  - `raw_photos_approximate_count` (Number, e.g., "e.g., 1500-2000 raw shots")
  - `raw_files_format` (Single Select: RAW/NEF/CR2/DNG)
  - `raw_retention_period` (Single Select: 30 days / 60 days / 90 days / permanent)
- **Contract Clause (if Yes):** "Raw, unedited photos (approximately {raw_photos_approximate_count}} images in {raw_files_format} format) shall be delivered. Photographer retains raw files for {raw_retention_period}} and may delete after this period."

#### 3.1.4 Photo Resolution & Format
- **Field Name:** `photo_resolution`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_resolution` — Full Resolution (4K or higher, print-ready)
  - `high_resolution` — High Resolution (2K, web & small print)
  - `social_media_resolution` — Social Media Resolution (1080x1080, 1200x630)
  - `mixed_resolutions` — Mixed (Specify below)
- **File Format Options:**
  - `jpg` — JPG (most common)
  - `png` — PNG (with transparency)
  - `both_jpg_png` — Both JPG + PNG
  - `raw_and_jpg` — RAW files + JPG processed
- **Contract Clause:** "Photo resolution: **{photo_resolution}}** in **{file_format}}** format."

#### 3.1.5 Color Correction vs. Full Editing
- **Field Name:** `editing_scope_photos`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `color_correction_only` — Color Correction Only (basic adjustments)
  - `professional_editing` — Professional Editing (retouching, enhancements)
  - `advanced_editing` — Advanced Editing (skin smoothing, blemish removal, complex adjustments)
  - `minimal_editing` — Minimal/No Editing (RAW-to-JPG conversion only)
- **Contract Clause:** "Editing scope: **{editing_scope_photos}}**."

---

## 🔷 SECTION 4: VIDEO DELIVERABLES (IF APPLICABLE)
**Extremely detailed to prevent video disputes**

### 4.1 Video Included?
- **Field Name:** `video_included`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No (depends on shoot type)

**If YES → Proceed with 4.2-4.8:**

### 4.2 Cinematic/Main Event Video
- **Block Name:** `cinematic_video_block`
- **Type:** Object

#### 4.2.1 Is Cinematic/Highlight Video Required?
- **Field Name:** `cinematic_video_required`
- **Type:** Yes/No
- **Conditional:** If `video_included == true`
- **Default:** Yes (if video included)

#### 4.2.2 Cinematic Video Length
- **Field Name:** `cinematic_video_length`
- **Type:** Single Select
- **Conditional:** If `cinematic_video_required == true`
- **Required:** YES
- **Options:**
  - `1_minute` — 1 Minute
  - `3_minutes` — 3 Minutes
  - `5_minutes` — 5 Minutes
  - `10_minutes` — 10 Minutes
  - `15_minutes` — 15 Minutes
  - `custom_length` — Custom Length (specify seconds below)
- **Custom Field:** `cinematic_video_length_custom_seconds` (if "custom_length")
- **Contract Clause:** "Cinematic highlight video shall be **{cinematic_video_length}}** in length."

#### 4.2.3 Full Event Documentary Video
- **Field Name:** `full_event_documentary_required`
- **Type:** Yes/No
- **Required:** NO
- **Default:** No (usually separate from highlight)
- **Sub-fields (if Yes):**
  - `documentary_video_length` (Single Select: Full event (1-8 hrs) / Condensed (30-60 min) / Edited highlights (15-20 min))
- **Contract Clause (if Yes):** "Full event documentary video (length: {documentary_video_length}) shall also be provided."

#### 4.2.4 Trailer/Teaser Video
- **Field Name:** `teaser_video_required`
- **Type:** Yes/No
- **Default:** No
- **Sub-fields (if Yes):**
  - `teaser_length` (Single Select: 15 secs / 30 secs / 45 secs / 1 min)
- **Contract Clause (if Yes):** "Short teaser/trailer video ({teaser_length}) shall be provided for social media sharing."

### 4.3 Additional Video Elements
- **Block Name:** `additional_video_elements`
- **Type:** Multi-Select Checkboxes

#### 4.3.1 Drone Footage
- **Field Name:** `drone_footage_included`
- **Type:** Yes/No
- **Sub-fields (if Yes):**
  - `drone_footage_duration` (Number, in seconds, e.g., "30-60 seconds of drone footage")
  - `drone_4k_available` (Yes/No)
- **Contract Clause (if Yes):** "Drone footage of approximately {drone_footage_duration}} seconds shall be included. 4K available: {drone_4k_available}"

#### 4.3.2 Voiceover/Narration
- **Field Name:** `voiceover_required`
- **Type:** Yes/No
- **Sub-fields (if Yes):**
  - `voiceover_details` (Textarea, e.g., "Professional male voice, English, 10-15 lines")
  - `voiceover_provided_by` (Single Select: Photographer provides / Client provides / Third-party hired)
- **Contract Clause (if Yes):** "Voiceover: {voiceover_details}. Provided by: {voiceover_provided_by}"

#### 4.3.3 Music & Licensing
- **Field Name:** `music_licensing_responsibility`
- **Type:** Single Select
- **Required:** YES (if video included)
- **Options:**
  - `photographer_provides_licensed_music` — Photographer provides royalty-free music
  - `client_provides_music` — Client provides music (they ensure licensing)
  - `third_party_music_hired` — Third-party hired for music (cost TBD)
  - `no_music_client_adds_later` — No music (Client will add music later)
- **Licensing Details:** `music_licensing_details` (Textarea)
- **Contract Clause:** "Music licensing responsibility: **{music_licensing_responsibility}}**. {music_licensing_details}"

### 4.4 Multi-Camera Synchronization (If Multiple Videographers)
- **Field Name:** `multi_camera_sync_required`
- **Type:** Yes/No
- **Conditional:** If `videographer_count > 1`
- **Default:** Yes
- **Contract Clause (if Yes):** "Multiple camera footage shall be professionally synchronized and cut together for seamless viewing."

### 4.5 Video Editing Requirements
- **Block Name:** `video_editing_scope`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (if video included)
- **Default Checked:**
  - ✓ Basic cut & sequence (arrange clips in order)
  - ✓ Transitions (dissolves, fades, cuts)
  - ✓ Color grading (color correction & professional look)
  - ✓ Audio cleanup (remove background noise)
- **Optional:**
  - Stabilization (camera shake reduction)
  - Titles/Text overlays
  - Subtitles (burnt-in or SRT file)
  - Motion graphics/animations
  - Slow-motion effects
  - Picture-in-picture
  - Custom effects/filters
- **Contract Clause:** "Video editing shall include: {video_editing_scope}"

### 4.6 Video Output Format & Resolution
- **Field Name:** `video_output_format`
- **Type:** Single Select
- **Required:** YES (if video included)
- **Options:**
  - `1080p_mp4` — 1080p MP4 (standard, all devices)
  - `4k_mp4` — 4K MP4 (high quality)
  - `1080p_and_4k` — Both 1080p & 4K versions
  - `youtube_ready` — YouTube optimized (1080p or 4K, specific settings)
  - `instagram_vertical` — Instagram Vertical (1080x1920)
  - `mixed_formats` — Multiple formats (specify)
- **Contract Clause:** "Video shall be delivered in: **{video_output_format}}**"

### 4.7 Video Delivery Format (How Client Gets It)
- **Field Name:** `video_delivery_method`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (if video included)
- **Options:**
  - Google Drive link (streaming + download)
  - Pen Drive / Hard Disk (physical delivery)
  - Cloud storage link (Dropbox, OneDrive, AWS)
  - File transfer service (WeTransfer, etc.)
  - YouTube/Vimeo link (unlisted, private)
- **Contract Clause:** "Video shall be delivered via: {video_delivery_method}"

---

## 🔷 SECTION 5: PRODUCT PHOTOGRAPHY SPECIFICS (IF APPLICABLE)

### 5.1 Is This a Product Photoshoot?
- **Field Name:** `product_shoot_applicable`
- **Type:** Yes/No
- **Default:** No (depends on shoot type)

**If YES → Proceed with 5.2-5.6:**

### 5.2 Number of Products to Photograph
- **Field Name:** `product_count`
- **Type:** Number
- **Required:** YES (if product shoot)
- **Placeholder:** "e.g., 50 products"

### 5.3 Shots Per Product
- **Field Name:** `shots_per_product`
- **Type:** Number
- **Required:** YES
- **Placeholder:** "e.g., 5 shots per product (front, back, side, detail, lifestyle)"

### 5.4 Required Angles & Perspectives
- **Field Name:** `product_angles_required`
- **Type:** Multi-Select Checkboxes
- **Required:** YES
- **Options:**
  - ✓ Front view (straight-on)
  - ✓ Back view
  - ✓ 45-degree angle (3/4 view)
  - ✓ Top-down view
  - ✓ Close-up detail shots
  - ✓ Lifestyle shots (product in use)
  - ✓ Size reference (with hand, scale, etc.)
  - ✓ Multiple color variations (if applicable)
- **Contract Clause:** "Product photography shall include: {product_angles_required}"

### 5.5 Background & Environment
- **Field Name:** `product_background_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `white_background` — White background (clean, minimal)
  - `black_background` — Black background (elegant)
  - `colored_background` — Colored background (specify color below)
  - `lifestyle_background` — Lifestyle background (product in real environment)
  - `textured_background` — Textured background (fabric, wood, etc.)
  - `mixed_backgrounds` — Mixed backgrounds
- **Color/Details Field:** `background_specifications` (Textarea)
- **Contract Clause:** "Background type: **{product_background_type}}**. Specifications: {background_specifications}"

### 5.6 Props, Styling & Setup
- **Field Name:** `product_props_styling_required`
- **Type:** Textarea (max 300 chars)
- **Required:** NO
- **Placeholder:** "e.g., 'Accessories for clothing shots', 'Plants for home decor shots', 'Water droplets for jewelry shots'"
- **Sub-field:** `props_provided_by` (Single Select: Photographer provides / Client provides)
- **Contract Clause:** "Product styling props: {product_props_styling_required}. Provided by: {props_provided_by}"

---

## 🔷 SECTION 6: EDITING & POST-PROCESSING STANDARDS

### 6.1 Photo Editing Level
- **Field Name:** `photo_editing_level`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `basic_color_correction` — Basic color correction (exposure, contrast, white balance)
  - `professional_editing` — Professional editing (color grading, minor retouching)
  - `advanced_retouching` — Advanced retouching (skin smoothing, blemish removal, object cleanup)
  - `extreme_editing` — Extreme editing (background removal, complex manipulations)
  - `minimal_raw_conversion` — Minimal editing (RAW-to-JPG conversion only)
  - `custom_level` — Custom level (specify below)
- **Custom Details:** `editing_level_custom` (Textarea, if "custom_level")
- **Contract Clause:** "Photo editing level: **{photo_editing_level}}**"

### 6.2 Specific Retouching Scope (If Applicable)
- **Field Name:** `retouching_scope`
- **Type:** Multi-Select Checkboxes
- **Required:** NO (optional enhancements)
- **Options:**
  - Skin retouching (smoothing, blemish removal)
  - Eyes enhancement (brightening, sharpening)
  - Teeth whitening
  - Background cleanup (remove unwanted objects)
  - Stain/dirt removal from clothing
  - Jewelry enhancement (shine, clarity)
  - Hair enhancement
  - Color vibrance enhancement
  - Sharpening & clarity boost
  - Vignetting (darkened edges)
- **Contract Clause (if selected):** "Additional retouching shall include: {retouching_scope}"

### 6.3 Video Editing Standards
- **Field Name:** `video_editing_standards`
- **Type:** Single Select
- **Required:** Conditional (if video included)
- **Options:**
  - `basic_cut_and_music` — Basic cut with music (clips in order, simple transitions)
  - `cinematic_edit` — Cinematic edit (color grading, music syncing, professional pacing)
  - `broadcast_quality` — Broadcast quality (advanced color, sound design, effects)
  - `custom_editing_level` — Custom level (specify below)
- **Custom Details:** `video_editing_level_custom` (Textarea, if "custom")
- **Contract Clause:** "Video editing standard: **{video_editing_standards}}**"

### 6.4 Video Color Grading
- **Field Name:** `video_color_grading_included`
- **Type:** Yes/No
- **Required:** Conditional (if video included)
- **Default:** Yes (for cinematic videos)
- **Sub-fields (if Yes):**
  - `color_grading_style` (Textarea, e.g., "Warm & romantic tones", "Cool & cinematic look")
- **Contract Clause (if Yes):** "Video color grading style: {color_grading_style}"

### 6.5 Video Stabilization
- **Field Name:** `video_stabilization_included`
- **Type:** Yes/No
- **Required:** Conditional (if video included)
- **Default:** No (can be added if needed)
- **Sub-fields (if Yes):**
  - `stabilization_level` (Single Select: Mild / Moderate / Heavy)
- **Contract Clause (if Yes):** "Video stabilization: {stabilization_level} level shall be applied."

---

## 🔷 SECTION 7: TIMELINES & DELIVERY SCHEDULE

### 7.1 Expected Delivery Dates
- **Block Name:** `delivery_timeline_block`
- **Type:** Object

#### 7.1.1 Raw Photos Delivery Date
- **Field Name:** `raw_photos_delivery_date`
- **Type:** Date Picker
- **Required:** Conditional (if raw photos included)
- **Placeholder:** "e.g., 3-5 days after shoot"
- **Contract Clause:** "Raw photos shall be delivered by **{raw_photos_delivery_date}}**."

#### 7.1.2 Edited Photos Delivery Date
- **Field Name:** `edited_photos_delivery_date`
- **Type:** Date Picker
- **Required:** YES (if photography included)
- **Placeholder:** "e.g., 10-14 days after shoot"
- **Contract Clause:** "Edited photos shall be delivered by **{edited_photos_delivery_date}}**."

#### 7.1.3 Video First Draft Delivery Date
- **Field Name:** `video_first_draft_date`
- **Type:** Date Picker
- **Required:** Conditional (if video included)
- **Placeholder:** "e.g., 21-30 days after shoot"
- **Contract Clause:** "First video draft shall be provided by **{video_first_draft_date}}** for initial review."

#### 7.1.4 Final Video Delivery Date (After Revisions)
- **Field Name:** `video_final_delivery_date`
- **Type:** Date Picker
- **Required:** Conditional (if video included)
- **Placeholder:** "e.g., 35-45 days after shoot"
- **Contract Clause:** "Final video shall be delivered by **{video_final_delivery_date}}** after revision rounds."

### 7.2 Delivery Buffer / Grace Period
- **Field Name:** `delivery_grace_period_days`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `no_buffer` — No buffer (strict deadlines)
  - `3_days` — 3-day grace period
  - `7_days` — 7-day grace period
  - `14_days` — 14-day grace period
  - `custom_buffer` — Custom (specify days below)
- **Custom Field:** `custom_buffer_days` (if "custom_buffer")
- **Contract Clause:** "Delivery deadlines shall have a grace period of **{delivery_grace_period_days}}**. Delays beyond this shall be treated as late delivery."

### 7.3 Cause for Delay Clause (Protection for Photographer)
- **Field Name:** `delay_force_majeure_clause`
- **Type:** Auto-populated
- **Default:** 
  ```
  DELAYS NOT COUNTED AS PHOTOGRAPHER FAULT:
  - Weather conditions (rain, extreme heat, storm)
  - Venue/location restrictions imposed by owner
  - Permission/legal issues (drone, permits)
  - Technical equipment failure (backup used immediately)
  - Client not providing required information/approvals on time
  - Client canceling/rescheduling shoot date
  - Natural disasters, accidents, or force majeure events
  ```

---

## 🔷 SECTION 8: REVISIONS, EDITS & CHANGE REQUESTS

### 8.1 Photo Edit Revisions
- **Field Name:** `photo_edit_revisions_included`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `1_revision_round` — 1 Revision Round
  - `2_revision_rounds` — 2 Revision Rounds
  - `3_revision_rounds` — 3 Revision Rounds
  - `unlimited_revisions` — Unlimited Revisions (within revision scope)
  - `no_revisions` — No revisions (delivered as-is)
  - `custom` — Custom number (specify below)
- **Custom Field:** `photo_revisions_custom_number` (if "custom")
- **Contract Clause:** "Photo edit revisions: **{photo_edit_revisions_included}}**."

### 8.2 Photo Edit Revision Scope (What's Allowed)
- **Field Name:** `photo_revision_scope_allowed`
- **Type:** Multi-Select Checkboxes
- **Required:** YES
- **Default Checked:**
  - ✓ Brightness/contrast adjustments
  - ✓ Color correction (temperature, tint)
  - ✓ Crop adjustments
  - ✓ Exposure fixes
  - ✓ Sharpness adjustments
  - ✓ Minor retouching refinements
- **Optional:**
  - Removing specific elements (specify which)
  - Adding filters/effects
  - Changing background tone
- **Contract Clause:** "Photo revision scope includes: {photo_revision_scope_allowed}"

### 8.3 Photo Revision Exclusions (What's NOT Allowed)
- **Field Name:** `photo_revision_exclusions`
- **Type:** Multi-Select Checkboxes
- **Required:** YES
- **Default Checked:**
  - ✓ Additional photo selections (beyond original set)
  - ✓ Adding new people/removing people from photos
  - ✓ Complete background replacement
  - ✓ Extensive retouching not in original scope
  - ✓ Requesting reshoots of specific moments
- **Contract Clause:** "The following are NOT included in revision rounds: {photo_revision_exclusions}. These shall require separate charges."

### 8.4 Video Edit Revisions
- **Field Name:** `video_edit_revisions_included`
- **Type:** Single Select
- **Required:** Conditional (if video included)
- **Options:**
  - `1_revision_round` — 1 Revision Round
  - `2_revision_rounds` — 2 Revision Rounds
  - `3_revision_rounds` — 3 Revision Rounds
  - `unlimited_revisions` — Unlimited Revisions (within scope)
  - `custom` — Custom number (specify)
- **Custom Field:** `video_revisions_custom_number`
- **Contract Clause:** "Video edit revisions: **{video_edit_revisions_included}}**."

### 8.5 Video Edit Revision Scope (What's Allowed)
- **Field Name:** `video_revision_scope_allowed`
- **Type:** Multi-Select Checkboxes
- **Required:** Conditional (if video)
- **Default Checked:**
  - ✓ Sequence reordering (changing clip order)
  - ✓ Timing adjustments (making video longer/shorter)
  - ✓ Color grading adjustments
  - ✓ Music/audio level adjustments
  - ✓ Transition style changes
  - ✓ Title text changes
  - ✓ Speed adjustments (slow-motion, fast-forward)
- **Contract Clause:** "Video revision scope includes: {video_revision_scope_allowed}"

### 8.6 Video Edit Revision Exclusions (NOT Allowed)
- **Field Name:** `video_revision_exclusions`
- **Type:** Multi-Select Checkboxes
- **Required:** Conditional (if video)
- **Default Checked:**
  - ✓ Adding completely new footage/shots from scratch
  - ✓ Recreating video with different structure/story
  - ✓ Advanced VFX/visual effects additions
  - ✓ Multiple voiceover recordings
  - ✓ Requesting major reshoots
  - ✓ Changing cinematic style completely (cinematic → casual)
- **Contract Clause:** "The following are NOT included in video revisions: {video_revision_exclusions}. These require additional charges."

### 8.7 Extra Revision Cost (Optional Overages)
- **Field Name:** `extra_revision_cost_enabled`
- **Type:** Yes/No
- **Required:** NO

**If Yes:**
- `extra_revision_cost_per_round` (Currency, e.g., "₹5,000 per additional revision")
- **Contract Clause:** "Additional revisions beyond the included rounds shall be charged at {extra_revision_cost_per_round}."

### 8.8 Change Request Process
- **Field Name:** `change_request_process`
- **Type:** Textarea
- **Required:** YES
- **Default:** "Any work outside the revision scope (new shoots, major restructures, additional products) must be submitted in writing. Photographer shall provide a separate quote within 48 hours. Work shall commence only after written approval and any required deposit."
- **Contract Clause:** "CHANGE REQUEST PROCESS: {change_request_process}"

---

## 🔷 SECTION 9: LOCATION, PERMISSIONS & LOGISTICS

### 9.1 Travel Included
- **Field Name:** `travel_included`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes (most shoots)

**If NO:**
- `travel_cost_policy` (Textarea, e.g., "Client reimburses actual travel cost: ₹X per km OR flat ₹Y")
- **Contract Clause:** "Travel to shoot locations is NOT included in project price. Client shall reimburse: {travel_cost_policy}"

**If YES:**
- **Contract Clause:** "Travel to all specified shoot locations is included in the project price."

### 9.2 Shoot Location Restrictions
- **Field Name:** `location_restrictions_noted`
- **Type:** Yes/No
- **Default:** No

**If YES:**
- `location_restrictions_details` (Textarea, e.g., "Venue doesn't allow outdoor drone shots", "Indoor venue has low lighting")
- **Impact Clause:** "The following location restrictions may affect coverage: {location_restrictions_details}. Photographer shall adapt accordingly."

### 9.3 Permits & Permissions Required
- **Field Name:** `permits_required`
- **Type:** Multi-Select Checkboxes
- **Required:** NO
- **Options:**
  - Drone permit (DGCA)
  - Venue photography permission
  - Street/public space permit
  - Model release forms
  - Property release forms
  - Copyright clearances (background music, etc.)

**For Each Selected:**
- `permit_responsibility_<name>` (Single Select: Photographer arranges / Client arranges / Shared responsibility)

**Auto-Generated Clause:**
```
PERMITS & PERMISSIONS:

{for each permit}
{permit}: Responsibility - {permit_responsibility}
{/for}

Delays caused by unavailable or denied permissions shall not be
photographer's responsibility. Project timeline may be extended.
```

---

## 🔷 SECTION 10: EQUIPMENT & BACKUP

### 10.1 Equipment List (Transparency)
- **Field Name:** `equipment_list_provided`
- **Type:** Yes/No
- **Default:** No (optional)

**If YES:**
- `equipment_details` (Textarea, e.g., "Canon EOS R5, Sony A7IV, DJI Air 2S Drone, gimbal, lighting kit")
- **Contract Clause:** "Equipment to be used: {equipment_details}"

### 10.2 Backup Equipment Guaranteed
- **Field Name:** `backup_equipment_guaranteed`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes (recommended)
- **Contract Clause (if Yes):** "Backup equipment (cameras, lenses, drones, lighting) shall be available. If primary equipment fails, backup shall be used immediately without quality compromise."

### 10.3 RAW File Retention & Deletion
- **Field Name:** `raw_file_retention_period`
- **Type:** Single Select
- **Required:** Conditional (if raw files delivered)
- **Options:**
  - `15_days` — 15 days
  - `30_days` — 30 days
  - `60_days` — 60 days
  - `90_days` — 90 days
  - `6_months` — 6 months
  - `1_year` — 1 year
  - `indefinite` — Indefinite (kept forever)
- **Contract Clause:** "Photographer shall retain raw files for **{raw_file_retention_period}}**. After this period, raw files may be deleted. Client must request permanent backups before deletion."

---

## 🔷 SECTION 11: COPYRIGHT, USAGE RIGHTS & WATERMARKS

### 11.1 Copyright & Usage Rights Model
- **Field Name:** `copyright_usage_model`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `client_full_rights` — Client owns all images (full commercial rights after payment)
  - `photographer_retains_rights` — Photographer retains copyright (Client gets personal use license)
  - `watermarked_preview` — Watermarked preview (Client cannot use publicly until full payment)
  - `shared_rights` — Shared rights (Client can use, photographer can use for portfolio)
  - `custom_rights` — Custom rights agreement (specify below)

**Contract Clause (Auto-Generated):**
```
COPYRIGHT & USAGE RIGHTS:

{if client_full_rights}
Upon full payment, all images shall become the exclusive property of Client.
Client has full commercial, personal, and distribution rights. Photographer
retains no rights to use these images after payment is complete.
{/if}

{if photographer_retains_rights}
Photographer retains copyright. Client receives a non-exclusive license for
personal use only (home display, personal albums, limited social media sharing).
Client may NOT use images for commercial purposes, resale, or professional use
without written permission. Photographer may use images in portfolio.
{/if}

{if watermarked_preview}
Initial delivery includes watermarked preview images. Upon full payment,
unwatermarked, full-resolution images shall be provided. Until payment is
received, Client cannot use images publicly.
{/if}

{if shared_rights}
Both Client and Photographer retain rights. Client can use images for personal
and commercial purposes. Photographer can use images in portfolio, websites,
and marketing. Both parties shall credit each other appropriately.
{/if}

{if custom_rights}
Custom rights agreement: {copyright_custom_details}
{/if}
```

### 11.2 Social Media Posting Rights
- **Field Name:** `social_media_posting_allowed`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes

**If YES:**
- `social_media_posting_details` (Textarea, e.g., "Photographer may post 5-10 best images on Instagram/Facebook, tagging Client, with Client credit")
- **Contract Clause (if Yes):** "Photographer may post selected images on social media: {social_media_posting_details}"

**If NO:**
- **Contract Clause:** "Photographer shall NOT post any images publicly without written permission from Client."

### 11.3 Portfolio / Case Study Usage
- **Field Name:** `portfolio_usage_allowed`
- **Type:** Yes/No
- **Required:** NO
- **Default:** Yes (if photographer retains rights)

**If YES:**
- `portfolio_usage_details` (Textarea, e.g., "Images can be used in photographer's portfolio, website, and marketing materials with Client name/credit")
- **Contract Clause (if Yes):** "Images may be included in photographer's portfolio: {portfolio_usage_details}"

### 11.4 Watermarks on Final Delivery
- **Field Name:** `watermark_on_final_delivery`
- **Type:** Yes/No
- **Default:** No
- **Contract Clause (if Yes):** "Final delivered images shall include photographer's watermark/logo for copyright protection."

---

## 🔷 SECTION 12: COMMERCIAL TERMS

### 12.1 Total Project Price
- **Field Name:** `total_project_price`
- **Type:** Currency (INR)
- **Required:** YES
- **Contract Clause:** "The total project price is **₹{total_project_price}}**."

### 12.2 Payment Schedule
- **Field Name:** `payment_structure`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_upfront` — 100% Upfront (before shoot)
  - `50_50_split` — 50% Upfront, 50% on Delivery
  - `milestone_split` — Milestone-based splits (specify)
  - `30_70_split` — 30% Upfront, 70% on Delivery
  - `full_on_delivery` — Full payment on delivery
  - `custom` — Custom payment schedule
- **Details:** `payment_structure_details` (Textarea, if "milestone" or "custom")
- **Contract Clause:** "Payment structure: {payment_structure}. {payment_structure_details}"

### 12.3 Inspection / Review Window
- **Field Name:** `inspection_window_hours`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `24_hours` — 24 Hours
  - `48_hours` — 48 Hours
  - `72_hours` — 72 Hours
  - `7_days` — 7 Days
  - `14_days` — 14 Days
  - `custom` — Custom (specify)
- **Contract Clause:** "Client shall have **{inspection_window_hours}}** from delivery to inspect and report issues within scope."

### 12.4 Refund Policy
- **Field Name:** `refund_policy`
- **Type:** Single Select
- **Options:**
  - `no_refund` — No refund (delivered photos/videos are final)
  - `quality_issues_only` — Refund only for quality issues (blur, missed key moments)
  - `incomplete_delivery` — Refund for incomplete deliverables (missing photos/videos)
  - `custom` — Custom refund terms
- **Details:** `refund_policy_details` (Textarea, if "custom")
- **Contract Clause:**
  ```
  REFUND POLICY:
  
  {if no_refund}
  Once photos/videos are delivered and accepted, all payments are final
  and non-refundable.
  {/if}
  
  {if quality_issues_only}
  If delivered content has quality issues (excessive blur, missed moments,
  technical failures), Client may request revision. If revisions cannot
  resolve issues, partial refund may be considered based on severity.
  {/if}
  
  {if incomplete_delivery}
  If deliverables are incomplete (missing photos, missing videos), refund
  shall be prorated: 0-25% complete (80% refund), 25-50% (50% refund), 
  50-75% (25% refund), 75%+ (no refund).
  {/if}
  ```

### 12.5 Late Delivery Penalty (Optional)
- **Field Name:** `late_delivery_penalty_enabled`
- **Type:** Yes/No

**If YES:**
- `late_penalty_percent_per_day` (Number, e.g., "0.5")
- `late_penalty_max_cap` (Number, e.g., "2")
- **Contract Clause:** "If delivery exceeds agreed date (excluding grace period), {late_penalty_percent_per_day}% per day penalty applies, capped at {late_penalty_max_cap}%."

### 12.6 Cancellation Policy (Shoot Cancellation)
- **Field Name:** `cancellation_policy`
- **Type:** Textarea
- **Required:** YES
- **Default:** "If Client cancels within 7 days of shoot date, 50% of payment is forfeited. If cancelled <48 hours before shoot, 100% payment is forfeited. If cancelled >7 days before, 25% cancellation fee applies."
- **Contract Clause:** "{cancellation_policy}"

### 12.7 Jurisdiction & Dispute Resolution
- **Field Name:** `jurisdiction_city`
- **Type:** Single Select + Autocomplete
- **Required:** YES
- **Default:** "Mumbai"
- **Contract Clause:** "Any disputes shall be governed by laws of {jurisdiction_city}, India."

---

# 📸 PART B: DELIVERY EVIDENCE FIELDS
**Submitted when marking service as delivered OR when dispute is raised**

### B.1 At Time of Delivery

#### B.1.1 Photo Delivery Proof
- **Field Name:** `delivery_photo_proof`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (if photography included)
- **Options:**
  - ✓ Google Drive folder link (with full photo set)
  - ✓ Proof screenshot showing total photo count
  - ✓ Download link to ZIP file (if platform supports)
  - ✓ Cloud storage link (Dropbox, OneDrive)
  - ✓ Hard drive/Pen drive shipping confirmation (physical media)

#### B.1.2 Sample Photo Screenshots
- **Field Name:** `delivery_sample_photos`
- **Type:** File Upload (Images)
- **Required:** YES (minimum 5-10 samples)
- **Placeholder:** "Upload 10-20 representative photos showing coverage and editing quality"

#### B.1.3 Raw Photos Delivery Proof (If Included)
- **Field Name:** `delivery_raw_files_proof`
- **Type:** File Upload or Textarea
- **Required:** Conditional (if raw files delivery)
- **Placeholder:** "Proof of raw file delivery (link, storage confirmation, drive screenshot showing raw files)"

#### B.1.4 Video Delivery Links
- **Field Name:** `delivery_video_links`
- **Type:** Repeatable URLs
- **Required:** Conditional (if video included)
- **Placeholder:** "YouTube/Vimeo links (unlisted) or Google Drive links for video files"
- **Examples:**
  - Cinematic highlight video
  - Full event documentary
  - Teaser/trailer video
  - Drone footage

#### B.1.5 Video Download/Access Proof
- **Field Name:** `delivery_video_access_proof`
- **Type:** File Upload (Screenshot)
- **Required:** Conditional (if video)
- **Placeholder:** "Screenshot showing video download available or access link shared"

#### B.1.6 Photo Count Summary
- **Field Name:** `delivery_photo_count_actual`
- **Type:** Number
- **Required:** YES (if photography)
- **Placeholder:** "Total edited photos delivered"
- **Validation:** System checks against `edited_photos_count` ± `photo_count_deviation_percent`

#### B.1.7 Editing Quality Proof
- **Field Name:** `delivery_editing_quality_proof`
- **Type:** Textarea
- **Required:** NO
- **Placeholder:** "Notes on editing done (e.g., 'Professional color grading applied to all 300 photos', 'Skin retouching on portraits')"

#### B.1.8 Deliverables Checklist
- **Field Name:** `delivery_checklist_complete`
- **Type:** Multi-Select Checkboxes (auto-populated)
- **Required:** YES
- **Validates against Section 3 & 4 requirements:**
  - ☑ 300 edited photos (auto-check against count)
  - ☑ Raw files delivered (if included)
  - ☑ 5-minute cinematic video (if included)
  - ☑ Full event documentary (if included)
  - ☑ Drone footage 30 seconds (if included)
  - ☑ Video color graded (if applicable)
  - ☑ 50 product photos (if product shoot)

#### B.1.9 Video Specifications Proof
- **Field Name:** `delivery_video_specs_proof`
- **Type:** Textarea
- **Required:** Conditional (if video)
- **Placeholder:** "Confirm video specs: Resolution (1080p/4K), Format (MP4), Duration, Frame rate, Color grading applied, Music included"

#### B.1.10 Delivery Notes
- **Field Name:** `delivery_notes`
- **Type:** Textarea (max 500 chars)
- **Required:** NO
- **Placeholder:** "Any notes about delivery, editing challenges overcome, special effects used, etc."

#### B.1.11 Storage/Media Delivery Proof
- **Field Name:** `delivery_storage_method_proof`
- **Type:** File Upload or Textarea
- **Required:** YES (at least 1 method)
- **Placeholder:** "Proof of how files were delivered (drive link, shipping confirmation for pen drive/hard disk, download link)"

#### B.1.12 Backup/Archive Proof (If Raw Files Delivered)
- **Field Name:** `delivery_backup_proof`
- **Type:** Textarea
- **Required:** Conditional (if raw files)
- **Placeholder:** "Photographer's confirmation that backup copies retained for agreed retention period"

#### B.1.13 Clearance & Copyright Proof
- **Field Name:** `delivery_copyright_clearance`
- **Type:** Checkbox
- **Required:** YES
- **Statement:** "I confirm all images/videos are original, not plagiarized, and all necessary clearances (music, locations) are in place"

---

# 🎯 PART C: DISPUTE EVIDENCE FIELDS

### C.1 When Raising a Dispute

#### C.1.1 Dispute Reason Category
- **Field Name:** `dispute_reason_category`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `photo_quality_issues` — Photo quality issues (blur, exposure, focus)
  - `incomplete_photo_delivery` — Incomplete photo delivery (fewer photos than agreed)
  - `video_quality_issues` — Video quality issues (bad color grading, stabilization, editing)
  - `incomplete_video_delivery` — Incomplete video delivery (missing scenes, shorter than agreed)
  - `missed_key_moments` — Missed key moments (important events not captured)
  - `editing_not_matching_agreement` — Editing doesn't match agreement (tone, style, level)
  - `late_delivery` — Late delivery (delivery after agreed deadline + grace period)
  - `technical_failures` — Technical failures (shaky footage, audio issues, corrupted files)
  - `watermark_issues` — Watermark not removed or wrongly applied
  - `copyright_infringement` — Copyright/licensing issues (music, backgrounds)
  - `missing_raw_files` — Missing promised raw files
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
  - `critical_unusable` — Critical (Content completely unusable)
  - `major_significant` — Major (Significant quality issues)
  - `minor_fixable` — Minor (Small issues, easily correctable)

#### C.1.4 Photo Quality Evidence (If Photo Complaint)
- **Field Name:** `dispute_photo_quality_evidence`
- **Type:** File Upload (Screenshots/Images)
- **Required:** Conditional (if photo quality issue)
- **Placeholder:** "Upload photos showing: blur, exposure issues, focus problems, etc."

#### C.1.5 Video Quality Evidence (If Video Complaint)
- **Field Name:** `dispute_video_quality_evidence`
- **Type:** File Upload (Screenshots/Screen Recording)
- **Required:** Conditional (if video quality issue)
- **Placeholder:** "Timestamped screen recording showing specific video quality issues (bad color, shaky footage, missing scenes)"

#### C.1.6 Missing Moments Evidence
- **Field Name:** `dispute_missing_moments_evidence`
- **Type:** Textarea
- **Required:** Conditional (if missed moments)
- **Placeholder:** "Specific moments not captured with timestamps (e.g., 'Bride entry video not delivered, was scheduled at 7:15 PM')"

#### C.1.7 Incomplete Delivery Evidence
- **Field Name:** `dispute_incomplete_delivery_proof`
- **Type:** Textarea
- **Required:** Conditional (if incomplete delivery)
- **Placeholder:** "Agreed count vs. actual count. Example: 'Agreed: 400 photos. Delivered: 220 photos.'"

#### C.1.8 Late Delivery Proof
- **Field Name:** `dispute_late_delivery_proof`
- **Type:** File Upload or Textarea
- **Required:** Conditional (if late delivery)
- **Placeholder:** "Timestamp showing delivery date vs. agreed date. Screenshot of email/message showing when files received."

#### C.1.9 Technical Failure Evidence
- **Field Name:** `dispute_technical_failure_evidence`
- **Type:** File Upload (Screenshots/Videos)
- **Required:** Conditional (if technical issue)
- **Placeholder:** "Proof of technical issues (corrupted file error message, audio sync problems, file won't open, etc.)"

#### C.1.10 Comparison: Expected vs. Actual
- **Field Name:** `dispute_comparison_evidence`
- **Type:** Textarea
- **Required:** YES
- **Placeholder:** "Compare what was agreed vs. what was delivered with specific examples"
- **Example:** "Agreed: 'Professional color grading with warm tones'. Actual: Raw colors, no color grading applied"

#### C.1.11 Editing Mismatch Examples
- **Field Name:** `dispute_editing_mismatch_examples`
- **Type:** File Upload or Textarea
- **Required:** Conditional (if editing issue)
- **Placeholder:** "Side-by-side comparison images showing agreed vs. actual editing style"

#### C.1.12 Requested Resolution
- **Field Name:** `dispute_requested_resolution`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_refund` — Full refund
  - `partial_refund` — Partial refund (specify %)
  - `reshooting` — Reshooting specific moments (photographer to retake)
  - `video_redo` — Redo video editing (apply agreed corrections)
  - `price_reduction` — Price reduction (specify amount)
  - `other` — Other (specify)
- **Amount Field:** `dispute_refund_or_reduction_amount` (Currency, if applicable)

#### C.1.13 Supporting Documentation
- **Field Name:** `dispute_supporting_docs`
- **Type:** File Upload
- **Required:** NO
- **Placeholder:** "Chat logs, emails (from platform), original contract scope, or other proof"

#### C.1.14 Evidence Quality Proof
- **Field Name:** `dispute_evidence_authenticity`
- **Type:** Checkbox
- **Required:** YES
- **Statement:** "I confirm all evidence provided is authentic, unaltered, and from the original delivery"

---

# 🗄️ PART D: DATABASE SCHEMA MAPPING

```sql
-- Section 1: Project Definition
shoot_type TEXT NOT NULL, -- enum
project_title TEXT NOT NULL,
shoot_date DATE NOT NULL,
shoot_locations TEXT[] NOT NULL,

-- Section 2: Coverage Requirements
coverage_hours_total NUMERIC NOT NULL,
coverage_start_time TIME NOT NULL,
coverage_end_time TIME NOT NULL,
coverage_break_policy TEXT,
shot_types_required TEXT[] NOT NULL,
photographer_count TEXT NOT NULL,
videographer_count TEXT,
backup_coverage_required BOOLEAN,
backup_photographer_available BOOLEAN,
backup_drone_operator_available BOOLEAN,

-- Section 3: Photo Deliverables
edited_photos_count INTEGER,
photo_count_deviation_percent INTEGER,
raw_photos_delivery BOOLEAN,
raw_photos_approximate_count TEXT,
raw_files_format TEXT,
raw_retention_period TEXT,
photo_resolution TEXT NOT NULL,
file_format TEXT NOT NULL,
editing_scope_photos TEXT NOT NULL,

-- Section 4: Video Deliverables
video_included BOOLEAN,
cinematic_video_required BOOLEAN,
cinematic_video_length TEXT,
cinematic_video_length_custom_seconds INTEGER,
full_event_documentary_required BOOLEAN,
documentary_video_length TEXT,
teaser_video_required BOOLEAN,
teaser_length TEXT,
drone_footage_included BOOLEAN,
drone_footage_duration TEXT,
drone_4k_available BOOLEAN,
voiceover_required BOOLEAN,
voiceover_details TEXT,
voiceover_provided_by TEXT,
music_licensing_responsibility TEXT NOT NULL,
music_licensing_details TEXT,
multi_camera_sync_required BOOLEAN,
video_editing_scope TEXT[] NOT NULL,
video_output_format TEXT NOT NULL,
video_delivery_method TEXT[] NOT NULL,

-- Section 5: Product Photography (If Applicable)
product_shoot_applicable BOOLEAN,
product_count INTEGER,
shots_per_product INTEGER,
product_angles_required TEXT[],
product_background_type TEXT,
background_specifications TEXT,
product_props_styling_required TEXT,
props_provided_by TEXT,

-- Section 6: Editing Standards
photo_editing_level TEXT NOT NULL,
retouching_scope TEXT[],
video_editing_standards TEXT,
video_color_grading_included BOOLEAN,
color_grading_style TEXT,
video_stabilization_included BOOLEAN,
stabilization_level TEXT,

-- Section 7: Timelines
raw_photos_delivery_date DATE,
edited_photos_delivery_date DATE,
video_first_draft_date DATE,
video_final_delivery_date DATE,
delivery_grace_period_days TEXT,
delivery_grace_period_custom_days INTEGER,

-- Section 8: Revisions
photo_edit_revisions_included TEXT,
photo_revisions_custom_number INTEGER,
photo_revision_scope_allowed TEXT[],
photo_revision_exclusions TEXT[],
video_edit_revisions_included TEXT,
video_revisions_custom_number INTEGER,
video_revision_scope_allowed TEXT[],
video_revision_exclusions TEXT[],
extra_revision_cost_enabled BOOLEAN,
extra_revision_cost_per_round NUMERIC,
change_request_process TEXT NOT NULL,

-- Section 9: Location & Logistics
travel_included BOOLEAN,
travel_cost_policy TEXT,
location_restrictions_noted BOOLEAN,
location_restrictions_details TEXT,
permits_required TEXT[],
permit_responsibility JSONB,

-- Section 10: Equipment & Backup
equipment_list_provided BOOLEAN,
equipment_details TEXT,
backup_equipment_guaranteed BOOLEAN,
raw_file_retention_period TEXT,

-- Section 11: Copyright & Usage
copyright_usage_model TEXT NOT NULL,
copyright_custom_details TEXT,
social_media_posting_allowed BOOLEAN,
social_media_posting_details TEXT,
portfolio_usage_allowed BOOLEAN,
portfolio_usage_details TEXT,
watermark_on_final_delivery BOOLEAN,

-- Section 12: Commercial Terms
total_project_price NUMERIC NOT NULL,
payment_structure TEXT NOT NULL,
payment_structure_details TEXT,
inspection_window_hours TEXT NOT NULL,
inspection_window_custom_days INTEGER,
refund_policy TEXT NOT NULL,
refund_policy_details TEXT,
late_delivery_penalty_enabled BOOLEAN,
late_penalty_percent_per_day NUMERIC,
late_penalty_max_cap NUMERIC,
cancellation_policy TEXT NOT NULL,
jurisdiction_city TEXT NOT NULL,

-- Part B: Delivery Evidence
delivery_photo_proof TEXT[],
delivery_sample_photos TEXT, -- file URLs
delivery_raw_files_proof TEXT,
delivery_video_links TEXT[],
delivery_video_access_proof TEXT,
delivery_photo_count_actual INTEGER,
delivery_editing_quality_proof TEXT,
delivery_checklist_complete TEXT[],
delivery_video_specs_proof TEXT,
delivery_notes TEXT,
delivery_storage_method_proof TEXT,
delivery_backup_proof TEXT,
delivery_copyright_clearance BOOLEAN,

-- Part C: Dispute Evidence
dispute_reason_category TEXT,
dispute_description TEXT,
dispute_severity TEXT,
dispute_photo_quality_evidence TEXT, -- file URLs
dispute_video_quality_evidence TEXT,
dispute_missing_moments_evidence TEXT,
dispute_incomplete_delivery_proof TEXT,
dispute_late_delivery_proof TEXT,
dispute_technical_failure_evidence TEXT,
dispute_comparison_evidence TEXT,
dispute_editing_mismatch_examples TEXT,
dispute_requested_resolution TEXT,
dispute_refund_or_reduction_amount NUMERIC,
dispute_supporting_docs TEXT,
dispute_evidence_authenticity BOOLEAN,
```

---

## 📝 SUMMARY

This SERVICE ANNEXURE D for Photography & Videography provides:

✅ **52 Contract Creation Fields** → Become binding contract clauses  
✅ **16 Delivery Evidence Fields** → Needed when marking complete  
✅ **14 Dispute Evidence Fields** → Required when raising disputes  
✅ **90+ Database Columns** → Schema mapping for storage  
✅ **Auto-Generated Contract** → Clauses populate from form inputs  
✅ **Legally Strong** → Protects against all common photo/video disputes  

**Key Dispute Protections:**
- Photo count verification (prevents "I paid for 400, got 200" disputes)
- Video delivery proof (links, access, format confirmation)
- Quality standards binding (editing level, color grading, stabilization defined)
- Missed moments evidence (timestamped, specific)
- Technical failure protection (backup equipment guaranteed)
- Late delivery verification with grace periods
- Copyright/usage rights transparency
- Revision scope limits (prevents endless "just one more edit" cycles)
- Specific dispute categories with required evidence for each

**Next Service Annexures Ready to Create:**
- E: Video Production & Animation Services
- F: Consulting & Advisory Services
- G: Digital Marketing & Social Media Services
- ... and more!

