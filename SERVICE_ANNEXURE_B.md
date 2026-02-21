# 🎨 SERVICE INDUSTRY: UI/UX DESIGN & GRAPHIC DESIGN
## LOGOS, BRANDING, UX FLOWS, SCREENS, POSTERS, SOCIAL MEDIA, ILLUSTRATIONS, PACKAGING
**Date Created:** November 28, 2025  
**Annexure Code:** B (Service Industry - Design)  
**Industry:** UI/UX Design & Graphic Design Services  
**Categories:** Logo Design, Branding, UI/UX, Social Media, Posters, Packaging, Illustrations, Presentations, Marketing Assets

---

## 📋 TABLE OF CONTENTS

- **PART A: CONTRACT CREATION FIELDS** (42 fields)
- **PART B: DELIVERY EVIDENCE FIELDS** (12 fields)
- **PART C: DISPUTE EVIDENCE FIELDS** (10 fields)
- **PART D: DATABASE SCHEMA MAPPING**
- **PART E: SAMPLE CONTRACT CLAUSE GENERATION**

---

# ⚙️ PART A: CONTRACT CREATION FIELDS
**Filled before contract is generated & signed**  
**These fields become binding clauses in the contract**

---

## 🔷 SECTION 1: PROJECT IDENTITY
**Mandatory fields that set the design foundation**

### 1.1 Project Title
- **Field Name:** `project_title`
- **Type:** Text (max 150 chars)
- **Required:** YES
- **Example:** "E-Commerce Platform Complete Branding"
- **Contract Clause:** "This Agreement pertains to the following design project: **{project_title}**"

### 1.2 Type of Design Work
- **Field Name:** `design_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `logo_design` — Logo Design
  - `branding_kit` — Branding Kit (Full Brand Identity)
  - `ui_ux_app` — UI/UX Design (Mobile App)
  - `ui_ux_website` — UI/UX Design (Website)
  - `social_media_creatives` — Social Media Creatives & Posts
  - `poster_flyer` — Posters & Flyers
  - `packaging_design` — Packaging Design
  - `illustration` — Illustration / Custom Graphics
  - `presentation_deck` — Presentation Deck / Slides
  - `marketing_assets` — Marketing Assets Bundle
  - `web_banners` — Web Banners & Ad Creatives
  - `icon_set` — Icon Set / Icon Library
  - `infographic` — Infographic Design
  - `custom` — Custom Design Work (Specify below)
- **Related Field:** `design_type_custom` (if "custom" selected)
- **Contract Clause:** "The Scope of Work shall be for **{design_type}}** design as defined in Section 2 below."

### 1.3 Business / Brand Use Case
- **Field Name:** `business_use_case`
- **Type:** Textarea (max 300 chars)
- **Required:** YES
- **Placeholder:** "What is this design for? (e.g., 'Mobile app for food delivery startup')"
- **Example:** "Rebranding for financial services company targeting millennials"
- **Contract Clause:** "Business Context: {business_use_case}"
- **Why Critical:** Use case defines design expectations and theme appropriateness

### 1.4 Industry / Domain
- **Field Name:** `industry_domain`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `fashion` — Fashion / Apparel
  - `food_beverage` — Food & Beverage / Restaurants
  - `tech_startup` — Tech / SaaS / Startup
  - `education` — Education / E-Learning
  - `healthcare` — Healthcare / Wellness
  - `finance` — Finance / Banking
  - `real_estate` — Real Estate
  - `entertainment` — Entertainment / Media
  - `travel_tourism` — Travel & Tourism
  - `ecommerce` — E-Commerce / Retail
  - `nonprofit` — Non-Profit / NGO
  - `manufacturing` — Manufacturing / Industrial
  - `custom` — Custom / Other (Specify below)
- **Related Field:** `industry_domain_custom` (if "custom")
- **Contract Clause:** "Design shall be tailored to the **{industry_domain}}** industry with appropriate aesthetics, tone, and user expectations."
- **Purpose:** Clarifies design theme, style guidelines, and industry standards

---

## 🔷 SECTION 2: DETAILED SCOPE OF WORK

### 2.1 Deliverable Count (Structure scope tightly)
- **Block Name:** `deliverable_count`
- **Type:** Object

#### 2.1.1 Number of Screens/Pages (for UI/UX)
- **Field Name:** `screen_count`
- **Type:** Number
- **Required:** Conditional (if `design_type` is UI/UX)
- **Placeholder:** "e.g., 25 screens"
- **Example:** 30 screens for mobile app
- **Contract Clause:** "UI/UX Deliverables: **{screen_count}} screens** as detailed in the Screen List (Schedule A)"
- **Purpose:** Avoids "I paid for 30 screens but got only 12" disputes

#### 2.1.2 Number of Logo Concepts
- **Field Name:** `logo_concept_count`
- **Type:** Number
- **Required:** Conditional (if `design_type` includes logo)
- **Placeholder:** "e.g., 3 concepts"
- **Example:** 5 different logo directions
- **Contract Clause:** "Logo Design: **{logo_concept_count}} distinct concepts** to be presented for client selection"

#### 2.1.3 Number of Banner Variations
- **Field Name:** `banner_variation_count`
- **Type:** Number
- **Required:** Conditional (if `design_type` is banners)
- **Placeholder:** "e.g., 10 banners"
- **Example:** 12 web banners for different ad placements

#### 2.1.4 Number of Social Media Posts
- **Field Name:** `social_post_count`
- **Type:** Number
- **Required:** Conditional (if `design_type` is social media)
- **Placeholder:** "e.g., 20 posts"
- **Example:** 30 Instagram posts + 15 LinkedIn posts

#### 2.1.5 Number of Packaging Mockups
- **Field Name:** `packaging_mockup_count`
- **Type:** Number
- **Required:** Conditional (if `design_type` is packaging)
- **Placeholder:** "e.g., Box front/back/side = 3 views"
- **Example:** 5 packaging designs (box, label, tag, etc.)

#### 2.1.6 Number of Illustration Pieces
- **Field Name:** `illustration_count`
- **Type:** Number
- **Required:** Conditional (if `design_type` is illustration)
- **Placeholder:** "e.g., 8 illustrations"
- **Example:** 12 custom character illustrations

#### 2.1.7 Number of UX Flows / User Journeys
- **Field Name:** `ux_flow_count`
- **Type:** Number
- **Required:** Conditional (if `design_type` is UI/UX)
- **Placeholder:** "e.g., 4 flows"
- **Example:** User login, checkout, payment, order confirmation flows

---

### 2.2 Design Style Preferences (Reference-Binding)
- **Block Name:** `style_preferences`
- **Type:** Object

#### 2.2.1 Design Style
- **Field Name:** `design_style`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `minimal` — Minimal / Clean
  - `modern` — Modern / Contemporary
  - `corporate` — Corporate / Professional
  - `playful` — Fun / Playful / Casual
  - `luxury` — Premium / Luxury / High-End
  - `retro` — Retro / Vintage
  - `dark_mode` — Dark Mode / Dark Theme
  - `light_mode` — Light Mode / Bright
  - `custom` — Custom (Describe below)
- **Contract Clause:** "Design aesthetic shall follow the **{design_style}}** style guidelines"

#### 2.2.2 Design Style Description
- **Field Name:** `design_style_description`
- **Type:** Textarea (max 300 chars)
- **Required:** NO
- **Placeholder:** "Further clarify the design direction (e.g., 'Minimalist with bold typography, monochromatic palette')"

#### 2.2.3 Reference / Inspiration Links
- **Field Name:** `reference_links`
- **Type:** Repeatable URLs (up to 5)
- **Required:** NO
- **Placeholder:** "https://dribbble.com/shots/xxxxx"
- **Instructions:** "Provide links to designs you love. Designer will study these as binding references for style direction."
- **Example References:**
  - Dribbble shots
  - Behance projects
  - Design websites
  - Competitor websites
- **Contract Clause (Auto-Generated):**
  ```
  DESIGN REFERENCES:
  
  The Designer shall study and adhere to the aesthetic and style demonstrated
  in the following reference materials. Deviation from these references without
  prior approval is grounds for revision or refund:
  
  {reference_links_list}
  
  Reference style adherence is binding for dispute resolution.
  ```
- **Purpose:** Makes style disputes objective ("design doesn't match the references we provided")

#### 2.2.4 Competitor / Inspiration Analysis
- **Field Name:** `competitor_analysis_links`
- **Type:** Repeatable URLs (up to 5)
- **Required:** NO
- **Placeholder:** "e.g., https://competitor-website.com or https://dribbble.com/shots/competitor-design"
- **Instructions:** "Provide links to competitor designs for market context (what NOT to copy, what style level to match)"

---

### 2.3 Color Palette Specification
- **Field Name:** `color_palette_block`
- **Type:** Object

#### 2.3.1 Color Palette Preference
- **Field Name:** `color_palette_option`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `designer_proposes` — Designer to propose palette (creative freedom)
  - `brand_colors_fixed` — Fixed colors (Brand guidelines already exist)
  - `preferences_given` — Preferences given (e.g., "warm tones")
  - `specific_codes` — Specific color codes provided

#### 2.3.2 Brand Color Codes (If Fixed)
- **Field Name:** `brand_color_codes`
- **Type:** Repeatable Block (up to 5 colors)
- **Conditional:** If `color_palette_option == 'brand_colors_fixed'`

**Per Color:**
- `color_name` (Text, e.g., "Primary Blue")
- `hex_code` (Text, e.g., "#0066FF")
- `rgb_value` (Text, e.g., "0, 102, 255")
- `usage` (Textarea, e.g., "Buttons, headers, primary actions")

#### 2.3.3 Color Preference Description
- **Field Name:** `color_preference_description`
- **Type:** Textarea (max 200 chars)
- **Conditional:** If `color_palette_option == 'preferences_given'`
- **Placeholder:** "e.g., 'Warm earth tones (browns, oranges), avoid bright neons'"

#### 2.3.4 Color Palette Contract Clause (Auto-Generated)
```
COLOR PALETTE:

{if designer_proposes}
The Designer shall propose a suitable color palette based on brand context and
design trends. Designer has creative freedom in palette selection.
{/if}

{if brand_colors_fixed}
The following brand colors are MANDATORY and shall be used throughout the design:
{color_codes_table}
{/if}

{if preferences_given}
Color preferences: {color_preference_description}
Designer shall adhere to these preferences while maintaining design cohesion.
{/if}

{if specific_codes}
Specific color codes provided: {brand_color_codes}
{/if}
```

---

### 2.4 Typography Specification
- **Field Name:** `typography_block`
- **Type:** Object

#### 2.4.1 Font Preference
- **Field Name:** `font_option`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `designer_selects` — Designer to select fonts (creative freedom)
  - `specific_fonts` — Specific fonts required (list below)
  - `system_fonts_only` — System fonts only (web-safe, no licensing issues)
  - `free_fonts` — Free fonts only (Google Fonts, etc.)
  - `premium_fonts_available` — Premium fonts (funding will be provided)

#### 2.4.2 Font List (If Specific)
- **Field Name:** `specific_fonts_list`
- **Type:** Repeatable Text (up to 5)
- **Conditional:** If `font_option == 'specific_fonts'`
- **Examples:** 
  - Montserrat
  - Poppins
  - Inter
  - Adobe Garamond Pro

#### 2.4.3 Existing Brand Fonts
- **Field Name:** `existing_brand_fonts`
- **Type:** Textarea
- **Required:** NO
- **Placeholder:** "List any existing brand fonts if already established"
- **Example:** "Montserrat (Headings), Open Sans (Body)"

#### 2.4.4 Font Licensing Responsibility
- **Field Name:** `font_licensing_responsibility`
- **Type:** Single Select
- **Required:** YES (if premium fonts)
- **Options:**
  - `designer_covers` — Designer covers font costs (included in price)
  - `client_covers` — Client covers font costs (separate)
  - `free_fonts_only` — Only free/open-source fonts
- **Contract Clause:** "Font licensing responsibility: {font_licensing_responsibility}. {if client_covers}Client shall be invoiced separately for premium font licenses.{/if}"

---

### 2.5 Layout Instructions & Creative Freedom
- **Field Name:** `layout_instructions_block`
- **Type:** Object

#### 2.5.1 Layout Constraints
- **Field Name:** `layout_constraints`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_creative_freedom` — Full creative freedom (designer decides layout)
  - `fixed_guidelines` — Fixed guidelines (brand layout standards exist)
  - `some_constraints` — Some constraints (specify below)
  - `strict_grid` — Strict grid system required

#### 2.5.2 Layout Guidelines (If Constraints)
- **Field Name:** `layout_guidelines_details`
- **Type:** Textarea (max 500 chars)
- **Conditional:** If `layout_constraints != 'full_creative_freedom'`
- **Placeholder:** "Describe layout rules (e.g., 'Header must have logo on left, menu on right')"

#### 2.5.3 Stock Image Policy
- **Field Name:** `stock_image_policy`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `no_stock_images` — NO stock images (only custom/original)
  - `stock_allowed_free` — Stock images allowed (free sources only: Unsplash, Pexels)
  - `stock_allowed_premium` — Stock images allowed (paid sources: Shutterstock, Getty)
  - `mixed_policy` — Mixed (custom + stock, specify)
- **Contract Clause:** "Stock image usage policy: {stock_image_policy}"
- **If Premium Stock:** "Client shall be provided with image licenses. Licensing cost: {amount} (separate invoice)"

#### 2.5.4 AI-Generated Assets Policy
- **Field Name:** `ai_assets_policy`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `no_ai_assets` — NO AI-generated assets (only human-designed)
  - `ai_allowed` — AI-generated assets allowed (e.g., backgrounds, textures)
  - `ai_allowed_with_disclosure` — AI allowed but must be disclosed in final files
  - `ai_for_draft_only` — AI only for draft/concept phase, not final
- **Contract Clause:** "AI asset usage: {ai_assets_policy}. {if ai_allowed_with_disclosure}All AI-generated elements shall be clearly noted in project documentation.{/if}"

---

### 2.6 Output Format Specifications
- **Block Name:** `output_format_block`
- **Type:** Object

#### 2.6.1 File Formats Required
- **Field Name:** `file_formats_required`
- **Type:** Multi-Select Checkboxes
- **Required:** YES (at least 1)
- **Options:**
  - `png` — PNG (With transparency)
  - `jpg` — JPG (Compressed)
  - `svg` — SVG (Scalable Vector)
  - `psd` — PSD (Photoshop - Layered)
  - `ai` — AI (Illustrator - Layered)
  - `pdf` — PDF (Print-ready)
  - `figma` — Figma (Cloud-based)
  - `xd` — Adobe XD (Cloud-based)
  - `motion_mp4` — Motion Graphics / MP4
  - `figma_link` — Figma Project Link (with access)
- **Contract Clause:** "Deliverables shall be provided in the following formats: {file_formats_required}"

#### 2.6.2 Layered Files Required
- **Field Name:** `layered_files_required`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes
- **Contract Clause:** "Deliverables shall include {if yes}EDITABLE layered source files (PSD/AI/Figma){/if}{if no}final flat files (no layers required){/if}. This enables future edits by Client."

#### 2.6.3 DPI / Resolution Specifications
- **Field Name:** `dpi_resolution`
- **Type:** Single Select
- **Required:** NO
- **Options:**
  - `web_72dpi` — Web (72 DPI)
  - `print_300dpi` — Print (300 DPI)
  - `universal_high_res` — High-resolution (both 72 and 300 DPI)
  - `custom` — Custom (specify below)
- **Custom Field:** `dpi_custom_specs` (Textarea, if "custom")
- **Contract Clause:** "Resolution specifications: {dpi_resolution}. {dpi_custom_specs}"

#### 2.6.4 Size / Aspect Ratio Requirements
- **Field Name:** `size_aspect_requirements`
- **Type:** Repeatable Block (up to 5)
- **Required:** NO

**Per Item:**
- `deliverable_name` (Text, e.g., "Instagram Post")
- `width` (Number, e.g., 1080)
- `height` (Number, e.g., 1080)
- `aspect_ratio` (Auto-calculated, e.g., "1:1")
- `file_format` (e.g., PNG, JPG)

#### 2.6.5 UI/UX Specific: Responsive Design
- **Field Name:** `responsive_design_required`
- **Type:** Yes/No
- **Required:** Conditional (if UI/UX design)
- **Default:** Yes
- **Sub-fields (if Yes):**
  - `breakpoints_required` (Multi-Select)
    - Desktop (1920px, 1440px, 1024px)
    - Tablet (768px, 1024px)
    - Mobile (375px, 414px, 320px)
  - `responsive_approach` (Single Select)
    - Mobile-first
    - Desktop-first
    - Both directions
- **Contract Clause:** "Responsive design required for breakpoints: {breakpoints_required}. Design shall function optimally at all specified sizes."

#### 2.6.6 UI/UX Specific: Dark Mode
- **Field Name:** `dark_mode_required`
- **Type:** Yes/No
- **Required:** Conditional (if UI/UX)
- **Default:** No
- **Contract Clause (if Yes):** "Dark mode variant shall be provided for all {screen_count} screens with optimized contrast and color adaptation."

---

## 🔷 SECTION 3: DELIVERABLES (CONTRACT-BINDING)

### 3.1 UI/UX Specific Deliverables
- **Block Name:** `uiux_deliverables`
- **Type:** Object
- **Conditional:** If `design_type` includes UI/UX

#### 3.1.1 Wireframes
- **Field Name:** `wireframes_included`
- **Type:** Single Select
- **Options:**
  - `yes_low_fidelity` — Yes (Low-fidelity wireframes)
  - `yes_high_fidelity` — Yes (High-fidelity wireframes)
  - `yes_both` — Yes (Both low & high fidelity)
  - `no` — No wireframes
- **Contract Clause:** "Wireframes: {wireframes_included}. Wireframes shall show page structure, content hierarchy, and user flow."

#### 3.1.2 UI Screens / Mockups
- **Field Name:** `ui_screens_deliverables`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `desktop_mockups` — Desktop Mockups
  - `mobile_mockups` — Mobile Mockups
  - `tablet_mockups` — Tablet Mockups
  - `interactive_prototype` — Interactive Prototype (clickable)
  - `animations_transitions` — Animations & Transitions (micro-interactions)
  - `mockups_exported_images` — Exported mockup images (PNG/JPG)
- **Contract Clause:** "UI Deliverables: {ui_screens_deliverables}"

#### 3.1.3 Prototype Link
- **Field Name:** `prototype_link_required`
- **Type:** Yes/No
- **Required:** NO
- **Placeholder (if Yes):** "Figma/Adobe XD/InVision link with view/comment access"
- **Contract Clause (if Yes):** "Interactive prototype shall be provided via Figma/Adobe XD link with client access for review and testing."

#### 3.1.4 Interactions & Micro-Animations
- **Field Name:** `interactions_included`
- **Type:** Yes/No
- **Required:** NO
- **Sub-fields (if Yes):**
  - `interaction_types` (Multi-Select)
    - Hover states
    - Click animations
    - Loading states
    - Error states
    - Success notifications
    - Transitions between screens
    - Form validations
  - `animation_tools` (Single Select)
    - Figma prototyping
    - Adobe XD prototyping
    - Framer
    - Custom specification
- **Contract Clause (if Yes):** "The following micro-interactions shall be designed: {interaction_types}. Specifications shall be provided in {animation_tools}."

#### 3.1.5 Design System Components
- **Field Name:** `design_system_included`
- **Type:** Yes/No
- **Required:** NO

**If Yes, sub-fields:**
- `component_types` (Multi-Select Checkboxes)
  - ☑ Color system / palette guide
  - ☑ Typography scale (font sizes, weights, line heights)
  - ☑ Button styles (primary, secondary, disabled, loading, etc.)
  - ☑ Form elements (inputs, selects, checkboxes, radio buttons)
  - ☑ Card components
  - ☑ Modal/dialog designs
  - ☑ Navigation patterns
  - ☑ Icon set
  - ☑ Spacing/grid tokens
  - ☑ Shadow & elevation system
  - ☑ Badge & status indicators
  - ☑ Tooltip styles
- **Deliverable Format:** "Design system shall be documented in Figma component library / style guide"
- **Contract Clause:** "Design system components to include: {component_types}. These shall be reusable across all screens and documented for developer handoff."

#### 3.1.6 UX Flow Diagrams
- **Field Name:** `ux_flows_included`
- **Type:** Yes/No
- **Required:** NO
- **Sub-fields (if Yes):**
  - `ux_flows_list` (Textarea)
  - **Placeholder:** "List the user journeys/flows to be documented (e.g., User login, Checkout process, Account recovery)"
  - **Example:** "5 flows: Login, Signup, Checkout, Payment, Order Tracking"
- **Format:** "User flow diagrams / journey maps"
- **Contract Clause:** "UX flow diagrams shall be provided for the following user journeys: {ux_flows_list}"

---

### 3.2 Graphic Design Specific Deliverables
- **Block Name:** `graphic_deliverables`
- **Type:** Object

#### 3.2.1 Master Source Files
- **Field Name:** `master_source_files_included`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes
- **Formats (Multi-Select):**
  - PSD (Photoshop)
  - AI (Illustrator)
  - XD (Adobe XD)
  - Figma
- **Contract Clause:** "Master source files (PSD/AI/Figma) shall be provided with all layers intact and organized."

#### 3.2.2 Editable Layers
- **Field Name:** `editable_layers_organized`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes
- **Contract Clause:** "All layers shall be organized, named, and editable for future modifications by Client."

#### 3.2.3 Print-Ready Files
- **Field Name:** `print_ready_files_required`
- **Type:** Yes/No
- **Required:** NO

**If Yes:**
- `print_file_format` (PDF CMYK)
- `print_specs` (Textarea)
  - **Placeholder:** "e.g., 'Bleed: 3mm, Color mode: CMYK, Resolution: 300 DPI, Format: A4'"
- **Contract Clause:** "Print-ready PDF files shall be provided with proper bleeds, CMYK color mode, and 300 DPI resolution."

#### 3.2.4 Mockups / Context Images
- **Field Name:** `mockups_included`
- **Type:** Yes/No
- **Required:** NO

**If Yes:**
- `mockup_type` (Multi-Select Checkboxes)
  - Logo on business card mockup
  - Logo on billboard mockup
  - Product packaging mockup
  - Social media post mockup
  - Website mockup
  - T-shirt/merchandise mockup
  - Other (specify)
- **Contract Clause:** "Mockups showing deliverables in real-world context shall be provided for visualization."

---

### 3.3 Branding Specific Deliverables
- **Block Name:** `branding_deliverables`
- **Type:** Object
- **Conditional:** If `design_type == 'branding_kit'`

#### 3.3.1 Logo Variations
- **Field Name:** `logo_variations_included`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `logo_horizontal` — Horizontal logo version
  - `logo_vertical` — Vertical logo version
  - `logo_icon_only` — Icon only (mark/symbol)
  - `logo_wordmark` — Wordmark only (text)
  - `logo_combined` — Combined logo (icon + text)
  - `logo_monochrome` — Monochrome version
  - `logo_color_variations` — Color variations (on white, on dark, inverted)
  - `logo_minimum_size` — Minimum size specifications
  - `logo_clear_space` — Clear space guidelines
  - `logo_misuse_examples` — Misuse examples (what NOT to do)
- **Contract Clause:** "Logo variations to include: {logo_variations_included}. All variations shall be provided in vector format (SVG/AI)."

#### 3.3.2 Brand Color Palette Guide
- **Field Name:** `color_palette_guide_included`
- **Type:** Yes/No
- **Required:** YES (for branding kits)
- **Sub-fields (if Yes):**
  - `palette_formats` (Multi-Select)
    - Hex codes
    - RGB values
    - CMYK values (for print)
    - Pantone references
  - `palette_examples` (Text)
    - **Placeholder:** "Show colors used in context (buttons, backgrounds, text, accents)"
- **Contract Clause:** "Color palette guide shall include: {palette_formats} with clear usage examples."

#### 3.3.3 Typography Guide
- **Field Name:** `typography_guide_included`
- **Type:** Yes/No
- **Required:** YES (for branding kits)
- **Sub-fields (if Yes):**
  - `typography_includes` (Multi-Select Checkboxes)
    - Font names & sources
    - Font weights & styles
    - Font sizes for headings (H1-H6)
    - Font sizes for body text
    - Line heights / leading
    - Letter spacing / tracking
    - Hierarchy examples
  - `typography_examples` (Text)
    - **Placeholder:** "Show typography in real-world usage (headlines, body copy, captions)"
- **Contract Clause:** "Typography guide shall demonstrate font usage across all hierarchy levels with clear size and spacing guidelines."

#### 3.3.4 Brand Usage Guide / Guidelines Document
- **Field Name:** `brand_guidelines_included`
- **Type:** Yes/No
- **Required:** YES (for branding kits)
- **Sub-fields (if Yes):**
  - `guidelines_content` (Multi-Select Checkboxes)
    - Logo usage rules (do's and don'ts)
    - Color palette & when to use each color
    - Typography rules
    - Tone of voice / brand personality
    - Photography style guidelines
    - Graphic elements / patterns
    - Clear space / minimum sizes
    - Restricted uses
  - `guidelines_format` (Single Select)
    - PDF document
    - Figma guide
    - Interactive HTML guide
    - Google Slides presentation
- **Contract Clause:** "Brand guidelines document shall be provided in {guidelines_format} format covering: {guidelines_content}"

#### 3.3.5 Social Media Kit
- **Field Name:** `social_media_kit_included`
- **Type:** Yes/No
- **Required:** NO

**If Yes:**
- `social_platforms` (Multi-Select Checkboxes)
  - Instagram
  - Facebook
  - LinkedIn
  - Twitter/X
  - TikTok
  - YouTube
  - Pinterest
- `kit_includes` (Multi-Select Checkboxes)
  - Profile graphics (cover images, avatars)
  - Post templates
  - Story templates (for Instagram/Facebook)
  - Hashtag recommendations
  - Content calendar template
  - Post sizing guide per platform
- **Contract Clause:** "Social media kit shall include platform-specific graphics and templates for: {social_platforms}"

---

## 🔷 SECTION 4: TIMELINES & MILESTONES

### 4.1 Overall Expected Completion Date
- **Field Name:** `expected_completion_date`
- **Type:** Date Picker
- **Required:** YES
- **Contract Clause:** "The expected completion and delivery of the design project is **{expected_completion_date}**."

### 4.2 Milestones (Repeatable Block)
- **Block Name:** `milestones[]`
- **Type:** Array of Objects
- **Min Items:** 1, **Max Items:** 10

**Per Milestone:**

#### 4.2.1 Milestone Name
- **Field Name:** `milestone_name`
- **Type:** Text
- **Required:** YES
- **Examples:** "Concept Presentations", "Initial Drafts", "First Round Revisions", "Final Designs"

#### 4.2.2 Milestone Description
- **Field Name:** `milestone_description`
- **Type:** Textarea
- **Required:** YES
- **Placeholder:** "What exactly will be delivered in this milestone?"

#### 4.2.3 Milestone Due Date
- **Field Name:** `milestone_due_date`
- **Type:** Date Picker
- **Required:** YES

#### 4.2.4 Deliverables for This Milestone
- **Field Name:** `milestone_deliverables`
- **Type:** Textarea
- **Required:** YES
- **Example:** "5 logo concept sketches + 2 color palette variations"

#### 4.2.5 Approval Required
- **Field Name:** `milestone_approval_required`
- **Type:** Yes/No
- **Default:** Yes
- **Contract Clause:** "Client approval required before proceeding to next milestone."

### 4.3 Dependencies & Prerequisites (Client to Provide)
- **Field Name:** `client_dependencies`
- **Type:** Multi-Select Checkboxes (with details)
- **Options:**
  - `brand_guidelines` — Existing Brand Guidelines (provide document)
  - `content_copy` — Content / Copy / Text (for design)
  - `product_images` — Product Images (for design)
  - `branding_direction` — Brand Direction / Brief (clarity on brand vision)
  - `target_audience_info` — Target Audience Information
  - `competitor_analysis` — Competitor Analysis (for context)
  - `logo_mark` — Logo / Mark (if already designed)
  - `approval_process` — Client approval process (timeline for reviews)
- **Details Field:** `dependency_details_<name>` (Textarea, for each selected)

**Auto-Generated Delay Clause:**
```
TIMELINE EXTENSIONS:

If the Client fails to provide the following prerequisites on time:

{dependencies_prerequisites with details}

The Designer's timeline shall be extended by the same number of days of delay.
For example: If branding guidelines are provided 5 days late, all milestone dates
shall be extended by 5 days.
```

---

## 🔷 SECTION 5: REVISIONS, CHANGES & SCOPE CREEP

### 5.1 Number of Revision Rounds Included
- **Field Name:** `revisions_included`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `1_round` — 1 Revision Round
  - `2_rounds` — 2 Revision Rounds
  - `3_rounds` — 3 Revision Rounds
  - `unlimited` — Unlimited Revisions
  - `custom` — Custom Number (specify below)
- **Custom Field:** `revisions_custom_number` (if "custom")
- **Contract Clause:** "The Client shall receive {revisions_included} revision rounds. Each revision round shall be completed within 5 business days of receiving feedback."

### 5.2 What CAN be Revised (Revision Scope)
- **Field Name:** `revision_scope_allowed`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `text_copy_changes` — Minor text / copy changes
  - `color_changes` — Color changes within palette
  - `alignment_position` — Alignment / positioning adjustments
  - `sizing_scaling` — Sizing / scaling elements
  - `font_weight_style` — Font weight or style adjustments
  - `icon_changes` — Icon swaps or modifications
  - `element_removal` — Remove elements or sections
  - `filter_effects` — Add/remove filters, effects, shadows
- **Contract Clause:** "Revisions are limited to the following scope: {revision_scope_allowed}"

### 5.3 What CANNOT be Revised (Explicitly Excluded)
- **Field Name:** `revision_scope_excluded`
- **Type:** Multi-Select Checkboxes (Pre-selected defaults)
- **Default Checked:**
  - ✓ `new_features` — New features or new pages/screens
  - ✓ `complete_redesign` — Complete redesign from scratch
  - ✓ `additional_deliverables` — Additional deliverables beyond scope
  - ✓ `new_concepts` — New design concepts or directions
  - ✓ `architecture_changes` — Major layout/architecture changes
  - ✓ `style_direction_change` — Complete style/direction change
  - ✓ `new_sections` — New sections or components
- **Contract Clause:** "The following are explicitly NOT included in revision rounds: {revision_scope_excluded}. Any such work shall require a Change Request and separate quote."

### 5.4 Change Request Process
- **Field Name:** `change_request_process`
- **Type:** Textarea
- **Required:** YES
- **Default:** "Any work outside the revision scope shall be submitted in writing with clear description. Designer shall provide a separate quote within 48 hours. Work shall commence only after written approval and any required deposit."
- **Contract Clause:** "CHANGE REQUEST PROCESS: {change_request_process}"

### 5.5 Extra Revision Pricing (Optional)
- **Field Name:** `extra_revision_pricing_enabled`
- **Type:** Yes/No
- **Required:** NO

**If Yes:**
- `extra_revision_cost` (Currency, e.g., "₹5,000 per additional round")
- **Contract Clause:** "Additional revisions beyond {revisions_included} shall be charged at ₹{extra_revision_cost} per round."

---

## 🔷 SECTION 6: LICENSING, COPYRIGHT & IP

### 6.1 IP Ownership Model
- **Field Name:** `ip_ownership_model`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `client_owns_all` — Client owns all designs (after payment)
  - `designer_retains` — Designer retains rights (Client gets license to use)
  - `joint_ownership` — Joint ownership (both can use, specify terms below)
  - `custom` — Custom arrangement (specify below)
- **Contract Clause (Auto-Generated):**
  ```
  INTELLECTUAL PROPERTY OWNERSHIP:
  
  {if client_owns_all}
  All design work, concepts, and deliverables created under this project shall
  become the exclusive property of the Client upon:
  1. Full payment of the agreed project price
  2. Acceptance of deliverables per Section 3 (Deliverables)
  
  After IP transfer, the Designer retains no rights to reuse, resell, or modify
  these designs.
  
  {/if}
  
  {if designer_retains}
  The Client receives a non-exclusive, non-transferable license to use the
  deliverables for their own business use only. The Designer retains all
  intellectual property rights.
  
  Client may NOT:
  - Resell or license the designs to third parties
  - Claim original authorship
  - Use designs for competing businesses
  - Sublicense to other parties
  
  Designer may reuse design patterns, components, and concepts in future projects.
  
  {/if}
  
  {if joint_ownership}
  Joint Ownership Terms: {joint_ownership_details}
  
  {/if}
  
  {if custom}
  IP Ownership Custom Terms: {ip_ownership_custom}
  
  {/if}
  ```

### 6.2 Stock Assets & Attribution
- **Field Name:** `stock_assets_included`
- **Type:** Yes/No
- **Required:** YES

**If Yes:**
- `stock_source` (Textarea)
  - **Placeholder:** "List all stock asset sources (e.g., 'Unsplash, Pexels, Shutterstock')"
- `client_attribution_required` (Text)
  - **Placeholder:** "Any attribution required in final deliverables? (e.g., 'Photo by John Smith on Unsplash')"
- **Contract Clause:** "Stock assets are sourced from: {stock_source}. Client shall provide required attribution as: {client_attribution_required}"

### 6.3 Paid Stock Assets Responsibility
- **Field Name:** `paid_stock_assets_required`
- **Type:** Yes/No

**If Yes:**
- `paid_stock_cost_responsibility` (Single Select)
  - `designer_covers` — Designer covers (included in project price)
  - `client_covers` — Client covers (separate invoice)
  - `split` — Split cost (specify %)
- `paid_stock_amount` (Currency, if applicable)
- `paid_stock_license_type` (Textarea)
  - **Placeholder:** "e.g., 'Single-use license', 'Extended commercial license', 'Transferable license'"
- **Contract Clause:** "Paid stock asset costs: {paid_stock_cost_responsibility}. Cost: ₹{paid_stock_amount}. License type: {paid_stock_license_type}"

### 6.4 Open-Source & Licensed Components
- **Field Name:** `opensource_components_used`
- **Type:** Yes/No

**If Yes:**
- `opensource_licenses` (Textarea)
  - **Placeholder:** "List components and their licenses (e.g., 'Icons from Font Awesome (MIT License), Illustrations from Open Peeps (Creative Commons)')"
- **Contract Clause:** "Open-source components used: {opensource_licenses}. Licenses reviewed and compliant with Client use case."

---

## 🔷 SECTION 7: COMMERCIAL TERMS

### 7.1 Total Project Price
- **Field Name:** `total_project_price`
- **Type:** Currency (INR)
- **Required:** YES
- **Placeholder:** "₹50,000"
- **Contract Clause:** "The total project price is **₹{total_project_price}}**."

### 7.2 Payment Structure
- **Field Name:** `payment_structure`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_upfront` — 100% Upfront (before work starts)
  - `50_50_split` — 50% Upfront, 50% on Delivery
  - `milestone_split` — Milestone-based splits (specify below)
  - `on_delivery` — Full payment on delivery
  - `custom` — Custom payment schedule (specify below)
- **Details (if applicable):** `payment_structure_details` (Textarea)
- **Contract Clause:** "Payment structure: {payment_structure}. {payment_structure_details}"

### 7.3 Inspection / Review Window
- **Field Name:** `inspection_window_hours`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `24_hours` — 24 Hours
  - `48_hours` — 48 Hours
  - `72_hours` — 72 Hours
  - `7_days` — 7 Days
  - `14_days` — 14 Days
  - `custom` — Custom (specify days below)
- **Custom Field:** `inspection_window_custom_days` (if "custom")
- **Contract Clause:** "The Client shall have **{inspection_window_hours}}** from delivery to inspect the designs and report any issues within scope."

### 7.4 Refund Policy (Design-Specific)
- **Field Name:** `refund_policy`
- **Type:** Single Select
- **Options:**
  - `none` — No refund (delivered designs are final)
  - `unsatisfactory_designs` — Refund if designs unsatisfactory after {inspection_window_hours}
  - `partial_refund` — Partial refund for incomplete deliverables
  - `custom` — Custom refund terms (specify below)
- **Details:** `refund_policy_details` (Textarea, if "custom" or "unsatisfactory")
- **Contract Clause:**
  ```
  REFUND POLICY:
  
  {if none}
  Once designs are delivered and accepted by Client, all payments are final
  and non-refundable.
  {/if}
  
  {if unsatisfactory_designs}
  If the Client finds designs unsatisfactory within the {inspection_window_hours}
  review window, and the designs deviate significantly from the agreed scope,
  the Client may request a full refund. Designer will make necessary corrections.
  
  Refund terms: {refund_policy_details}
  {/if}
  
  {if partial_refund}
  If the project is cancelled before completion, refund shall be calculated based
  on completed deliverables:
  - 0-25% complete: 80% refund
  - 25-50% complete: 50% refund
  - 50-75% complete: 25% refund
  - 75%+ complete: No refund
  
  {/if}
  ```

### 7.5 Late Delivery Penalty (Optional)
- **Field Name:** `late_delivery_penalty_enabled`
- **Type:** Yes/No
- **Required:** NO

**If Yes:**
- `late_penalty_percent_per_day` (Number, e.g., "0.5")
- `late_penalty_max_cap_percent` (Number, e.g., "2")
- **Contract Clause:** "If project is delivered after {expected_completion_date} (excluding force majeure or Client delays), a penalty of {late_penalty_percent_per_day}% of project price per day shall apply, capped at {late_penalty_max_cap_percent}% total."

### 7.6 Jurisdiction & Dispute Resolution
- **Field Name:** `jurisdiction_city`
- **Type:** Single Select + Autocomplete
- **Required:** YES
- **Default:** "Mumbai"
- **Contract Clause:** "Any disputes arising from this agreement shall be governed by the laws of {jurisdiction_city}, India, and subject to courts in {jurisdiction_city}."

---

# 📸 PART B: DELIVERY EVIDENCE FIELDS
**Submitted when marking design as delivered OR when dispute is raised**

### B.1 At Time of Delivery
When user clicks "Mark as Delivered", system should request:

#### B.1.1 All Design Files (ZIP or Individual)
- **Field Name:** `delivery_design_files`
- **Type:** File Upload (ZIP recommended)
- **Required:** YES
- **Max Size:** 2 GB
- **Formats:** ZIP, PSD, AI, Figma link, XD link
- **Validation:** System should extract and verify file types

#### B.1.2 Source Files (if included in scope)
- **Field Name:** `delivery_source_files`
- **Type:** File Upload
- **Required:** Conditional (if source code/files in scope)
- **Examples:** PSD, AI, Figma project link

#### B.1.3 Exported Formats
- **Field Name:** `delivery_exported_formats`
- **Type:** Multi-Select Checkboxes (what's included)
- **Options:**
  - PNG (transparent)
  - JPG (compressed)
  - SVG (vector)
  - PDF (print-ready)
  - Web-optimized versions
  - All formats specified in contract

#### B.1.4 Screenshots of All Designs
- **Field Name:** `delivery_screenshots_all`
- **Type:** File Upload (Multiple images)
- **Required:** YES
- **Max Files:** 50
- **Formats:** JPG, PNG
- **Per Screenshot:**
  - `screenshot_file`
  - `screenshot_label` (e.g., "Logo Concept 1", "Homepage Design", "Instagram Post Template")

#### B.1.5 Project Overview / Delivery Notes
- **Field Name:** `delivery_notes`
- **Type:** Textarea (max 1000 chars)
- **Required:** YES
- **Placeholder:** "Summary of delivered designs, any notes, color codes used, fonts included, etc."

#### B.1.6 Figma / XD / Prototype Link (If applicable)
- **Field Name:** `delivery_prototype_link`
- **Type:** URL
- **Required:** Conditional (if interactive prototype in scope)
- **Placeholder:** "https://www.figma.com/file/xxx"
- **Validation:** Link must be publicly accessible or shared with client email

#### B.1.7 Documentation Provided
- **Field Name:** `delivery_documentation_provided`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - ☑ Design system / component library
  - ☑ Brand guidelines document
  - ☑ Color palette guide (Hex, RGB, CMYK codes)
  - ☑ Typography guide
  - ☑ Usage guide
  - ☑ File organization guide
  - ☑ Redlines / specifications for developers

#### B.1.8 Deliverables Checklist (From Contract)
- **Field Name:** `delivery_checklist_complete`
- **Type:** Multi-Select Checkboxes (auto-populated from Section 3)
- **Options:** Auto-populated from scope
  - ☑ Logo concepts (if applicable)
  - ☑ UI screens (desktop + mobile)
  - ☑ Social media templates
  - ☑ Brand guidelines
  - etc.

#### B.1.9 Known Limitations / Notes
- **Field Name:** `delivery_known_limitations`
- **Type:** Textarea
- **Required:** NO
- **Placeholder:** "Any limitations, workarounds, or notes (e.g., 'Some animations designed conceptually, not built-in Figma')"

---

# 🎯 PART C: DISPUTE EVIDENCE FIELDS

### C.1 When Raising a Dispute

#### C.1.1 Dispute Reason Category
- **Field Name:** `dispute_reason_category`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `incomplete_delivery` — Incomplete delivery / Fewer deliverables than agreed
  - `design_mismatch_scope` — Design doesn't match agreed scope
  - `style_deviation` — Design style deviates from references/style guide
  - `source_files_missing` — Source files promised but not delivered
  - `plagiarism_copied` — Suspected plagiarism or copied design
  - `quality_issues` — Quality issues (poorly designed, amateur work)
  - `technical_issues` — Technical issues (files corrupted, can't open)
  - `missed_deadline` — Deadline missed without valid reason
  - `undisclosed_issues` — Undisclosed limitations (e.g., stock images used when not allowed)
  - `other` — Other (specify below)

#### C.1.2 Detailed Dispute Description
- **Field Name:** `dispute_description`
- **Type:** Textarea (max 1500 chars)
- **Required:** YES
- **Placeholder:** "Clearly describe what's wrong and why it violates the contract."

#### C.1.3 Dispute Severity
- **Field Name:** `dispute_severity`
- **Type:** Single Select
- **Options:**
  - `critical_unusable` — Critical (Design completely unusable)
  - `major_significant` — Major (Significant issues affecting usability)
  - `minor_fixable` — Minor (Small issues, easily fixable)

#### C.1.4 Visual Evidence: Screenshots
- **Field Name:** `dispute_screenshots`
- **Type:** File Upload (Multiple)
- **Required:** YES (at least 1)
- **Max Files:** 10
- **Per Screenshot:**
  - `screenshot_file` (JPG/PNG)
  - `screenshot_annotation` (Textarea, max 200 chars)
  - **Example Annotation:** "The logo colors don't match brand palette. Expected: #0066FF, Actual: #00CCFF"

#### C.1.5 Side-by-Side Comparison
- **Field Name:** `dispute_comparison_evidence`
- **Type:** File Upload or Textarea
- **Required:** NO
- **Placeholder:** "Comparison with reference / expected design"
- **Example:** "Upload image showing: [Expected Design] vs [Actual Design Delivered]"

#### C.1.6 Proof of Plagiarism (If Applicable)
- **Field Name:** `dispute_plagiarism_evidence`
- **Type:** URLs or File Upload
- **Required:** Conditional (if plagiarism claim)
- **Placeholder:** "Link to original source or screenshot of original design"
- **Tools to Reference:** Reverse image search (TinEye, Google Images)

#### C.1.7 File Integrity Issues (If Technical)
- **Field Name:** `dispute_technical_issues`
- **Type:** Textarea
- **Required:** Conditional (if technical issues)
- **Placeholder:** "Describe the technical problem (e.g., 'PSD file won't open', 'Figma link broken', 'Files corrupted')"

#### C.1.8 Scope Mismatch Evidence
- **Field Name:** `dispute_scope_mismatch`
- **Type:** Textarea
- **Required:** Conditional (if scope mismatch)
- **Placeholder:** "Which specific items from contract scope are missing?"
- **Example:** "Contract specified 5 logo concepts, only received 2"

#### C.1.9 Requested Resolution
- **Field Name:** `dispute_requested_resolution`
- **Type:** Single Select or Text
- **Required:** YES
- **Options:**
  - `full_refund` — Full refund
  - `partial_refund` — Partial refund (specify amount below)
  - `re_delivery` — Re-delivery of correct designs
  - `price_reduction` — Price reduction (specify amount)
  - `additional_work` — Additional work at no cost
  - `other` — Other (specify below)
- **Amount Field:** `dispute_refund_amount` (Currency, if applicable)

#### C.1.10 Supporting Documentation
- **Field Name:** `dispute_supporting_docs`
- **Type:** File Upload
- **Required:** NO
- **Placeholder:** "Any email exchanges, chat logs (from platform), invoices, or other supporting docs"
- **Note:** "Only platform-provided communications accepted as evidence; off-platform (WhatsApp, personal email) may not be admissible"

---

# 🗄️ PART D: DATABASE SCHEMA MAPPING
**How these fields map to `form_submissions` table columns**

```sql
-- Section 1: Project Identity
project_title TEXT NOT NULL,
design_type TEXT NOT NULL, -- enum
design_type_custom TEXT,
business_use_case TEXT NOT NULL,
industry_domain TEXT NOT NULL, -- enum
industry_domain_custom TEXT,

-- Section 2: Scope of Work
deliverable_count JSONB, -- {screen_count, logo_concept_count, banner_count, social_post_count, packaging_count, illustration_count, ux_flow_count}
design_style TEXT NOT NULL, -- enum
design_style_description TEXT,
reference_links TEXT[], -- array of URLs
competitor_analysis_links TEXT[],
color_palette_option TEXT NOT NULL, -- enum
brand_color_codes JSONB, -- array of {color_name, hex_code, rgb_value, usage}
color_preference_description TEXT,
font_option TEXT NOT NULL, -- enum
specific_fonts_list TEXT[],
existing_brand_fonts TEXT,
font_licensing_responsibility TEXT,
layout_constraints TEXT NOT NULL, -- enum
layout_guidelines_details TEXT,
stock_image_policy TEXT NOT NULL, -- enum
ai_assets_policy TEXT NOT NULL, -- enum
file_formats_required TEXT[],
layered_files_required BOOLEAN,
dpi_resolution TEXT,
dpi_custom_specs TEXT,
size_aspect_requirements JSONB, -- array of {deliverable_name, width, height, aspect_ratio, file_format}
responsive_design_required BOOLEAN,
dark_mode_required BOOLEAN,

-- Section 3: Deliverables
wireframes_included TEXT, -- enum
ui_screens_deliverables TEXT[],
prototype_link_required BOOLEAN,
interactions_included BOOLEAN,
interaction_types TEXT[],
animation_tools TEXT,
design_system_included BOOLEAN,
component_types TEXT[],
ux_flows_included BOOLEAN,
ux_flows_list TEXT,
master_source_files_included BOOLEAN,
editable_layers_organized BOOLEAN,
print_ready_files_required BOOLEAN,
print_specs TEXT,
mockups_included BOOLEAN,
mockup_types TEXT[],
logo_variations_included TEXT[],
color_palette_guide_included BOOLEAN,
palette_formats TEXT[],
typography_guide_included BOOLEAN,
typography_includes TEXT[],
brand_guidelines_included BOOLEAN,
guidelines_content TEXT[],
guidelines_format TEXT,
social_media_kit_included BOOLEAN,
social_platforms TEXT[],
kit_includes TEXT[],

-- Section 4: Timelines & Milestones
expected_completion_date DATE NOT NULL,
milestones JSONB, -- array of {name, description, due_date, deliverables, approval_required}
client_dependencies JSONB,

-- Section 5: Revisions
revisions_included TEXT NOT NULL, -- enum or number
revisions_custom_number INTEGER,
revision_scope_allowed TEXT[],
revision_scope_excluded TEXT[],
change_request_process TEXT,
extra_revision_pricing_enabled BOOLEAN,
extra_revision_cost NUMERIC,

-- Section 6: IP & Licensing
ip_ownership_model TEXT NOT NULL, -- enum
ip_ownership_custom TEXT,
stock_assets_included BOOLEAN,
stock_source TEXT,
client_attribution_required TEXT,
paid_stock_assets_required BOOLEAN,
paid_stock_cost_responsibility TEXT,
paid_stock_amount NUMERIC,
paid_stock_license_type TEXT,
opensource_components_used BOOLEAN,
opensource_licenses TEXT,

-- Section 7: Commercial Terms
total_project_price NUMERIC NOT NULL,
payment_structure TEXT NOT NULL, -- enum
payment_structure_details TEXT,
inspection_window_hours TEXT NOT NULL, -- enum
inspection_window_custom_days INTEGER,
refund_policy TEXT NOT NULL, -- enum
refund_policy_details TEXT,
late_delivery_penalty_enabled BOOLEAN,
late_penalty_percent_per_day NUMERIC,
late_penalty_max_cap_percent NUMERIC,
jurisdiction_city TEXT NOT NULL,

-- Part B: Delivery Evidence
delivery_design_files TEXT, -- file URL/path
delivery_source_files TEXT, -- file URL/path
delivery_exported_formats TEXT[],
delivery_screenshots_all JSONB, -- array of {file_url, label}
delivery_notes TEXT,
delivery_prototype_link TEXT, -- URL
delivery_documentation_provided TEXT[],
delivery_checklist_complete TEXT[],
delivery_known_limitations TEXT,

-- Part C: Dispute Evidence
dispute_reason_category TEXT,
dispute_description TEXT,
dispute_severity TEXT,
dispute_screenshots JSONB, -- array of {file_url, annotation}
dispute_comparison_evidence TEXT, -- file URL
dispute_plagiarism_evidence TEXT[], -- array of URLs
dispute_technical_issues TEXT,
dispute_scope_mismatch TEXT,
dispute_requested_resolution TEXT,
dispute_refund_amount NUMERIC,
dispute_supporting_docs TEXT, -- file URL
```

---

## 📝 SUMMARY

This SERVICE ANNEXURE B for UI/UX Design & Graphic Design provides:

✅ **42 Contract Creation Fields** → Become binding contract clauses  
✅ **12 Delivery Evidence Fields** → Needed when marking complete  
✅ **10 Dispute Evidence Fields** → Required when raising disputes  
✅ **70+ Database Columns** → Schema mapping for storage  
✅ **Auto-Generated Contract** → Clauses populate from form inputs  
✅ **Legally Strong** → Eliminates subjective design disputes  

**Key Distinctions from Software Development (Annexure A):**
- Focused on design deliverables & visual assets
- Reference-based dispute resolution (design matches references)
- Revision types specific to design (color, alignment, fonts)
- IP ownership split between Client/Designer
- Stock asset & licensing tracking
- Design file format specifications

**Next Service Annexures to Create:**
- C: Content Writing & Copywriting Services
- D: Digital Marketing & SEO Services
- E: Video Production & Animation Services
- F: Photography Services
- G: Consulting & Advisory Services
- ... and more!

