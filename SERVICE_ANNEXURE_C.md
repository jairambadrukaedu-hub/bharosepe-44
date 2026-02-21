# ✍️ SERVICE INDUSTRY: CONTENT WRITING / COPYWRITING / BLOGS / SCRIPTS / SEO CONTENT
## COMPREHENSIVE CONTENT PROJECT DATA MODEL
**Date Created:** November 28, 2025  
**Annexure Code:** C (Service Industry - Content)  
**Industry:** Content Writing & Copywriting Services  
**Categories:** Blog Articles, Social Media, Copywriting, Scriptwriting, Email, SEO Content, Technical Writing, E-books, Press Releases

---

## 📋 TABLE OF CONTENTS

- **PART A: CONTRACT CREATION FIELDS** (48 fields)
- **PART B: DELIVERY EVIDENCE FIELDS** (14 fields)
- **PART C: DISPUTE EVIDENCE FIELDS** (12 fields)
- **PART D: DATABASE SCHEMA MAPPING**
- **PART E: SAMPLE CONTRACT CLAUSE GENERATION**

---

# ⚙️ PART A: CONTRACT CREATION FIELDS
**Filled before contract is generated & signed**  
**These fields become binding clauses in the contract**

---

## 🔷 SECTION 1: PROJECT DEFINITION
**Mandatory fields that set the content foundation**

### 1.1 Content Project Title
- **Field Name:** `project_title`
- **Type:** Text (max 150 chars)
- **Required:** YES
- **Example:** "E-Commerce Product Description Content Suite"
- **Contract Clause:** "This Agreement pertains to the following content project: **{project_title}**"

### 1.2 Content Type
- **Field Name:** `content_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `social_media_captions` — Social Media Captions & Posts
  - `blog_articles` — Blog Articles
  - `website_content` — Website Content (Pages)
  - `product_descriptions` — Product Descriptions
  - `ad_copy` — Ad Copy (Google Ads, Facebook, etc.)
  - `scriptwriting_video` — Scriptwriting (YouTube/Reels/Ads)
  - `technical_writing` — Technical Writing (Docs, Manuals)
  - `seo_content` — SEO Content (Optimized Articles)
  - `email_newsletter` — Email Newsletter / Email Sequences
  - `press_release` — Press Release
  - `ebook` — E-Book Writing
  - `academic_content` — Academic Content (Papers, Reports)
  - `ghostwriting` — Ghostwriting (Author will claim authorship)
  - `landing_page_copy` — Landing Page Copy
  - `custom` — Custom Content Type (Specify below)
- **Related Field:** `content_type_custom` (if "custom")
- **Contract Clause:** "The Scope of Work shall be for **{content_type}}** writing as defined in Section 2 below."

### 1.3 Industry / Domain
- **Field Name:** `industry_domain`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `technology` — Technology / SaaS
  - `finance` — Finance / Banking / Fintech
  - `health_wellness` — Healthcare / Wellness / Fitness
  - `education` — Education / E-Learning
  - `real_estate` — Real Estate
  - `fashion_apparel` — Fashion / Apparel
  - `food_beverage` — Food & Beverage
  - `travel_tourism` — Travel & Tourism
  - `ecommerce` — E-Commerce / Retail
  - `gaming` — Gaming / Entertainment
  - `crypto_blockchain` — Cryptocurrency / Blockchain
  - `automotive` — Automotive
  - `manufacturing` — Manufacturing / Industrial
  - `nonprofit` — Non-Profit / NGO
  - `custom` — Custom / Other (Specify below)
- **Related Field:** `industry_domain_custom` (if "custom")
- **Contract Clause:** "Content shall be tailored to the **{industry_domain}}** industry with appropriate terminology, tone, and audience expectations."

---

## 🔷 SECTION 2: DETAILED SCOPE OF WORK
**Extremely important — 90% of content disputes start here**

### 2.1 Word Count / Length Specification
- **Block Name:** `word_count_block`
- **Type:** Object

#### 2.1.1 Type of Content
- **Field Name:** `content_length_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `long_form` — Long-form (blogs, articles, e-books)
  - `medium_form` — Medium-form (landing pages, guides)
  - `short_form` — Short-form (captions, social posts)
  - `variable_length` — Variable length (mixed)

#### 2.1.2 Minimum Word Count (for long-form)
- **Field Name:** `minimum_word_count`
- **Type:** Number
- **Conditional:** If `content_length_type == 'long_form'`
- **Placeholder:** "e.g., 1500"
- **Example:** "Minimum 2000 words per blog article"
- **Contract Clause:** "Each content piece shall contain a minimum of **{minimum_word_count}} words**."

#### 2.1.3 Maximum Acceptable Deviation
- **Field Name:** `maximum_word_deviation_percent`
- **Type:** Number (0-20)
- **Placeholder:** "Acceptable ±% deviation (e.g., 10 = ±10%)"
- **Example:** 10 (means 1500-2000 words if min is 1667)
- **Contract Clause:** "Word count shall not deviate more than ±{maximum_word_deviation_percent}% from the specified minimum."

#### 2.1.4 Short-Form Specifications
- **Field Name:** `short_form_specs`
- **Type:** Textarea (max 300 chars)
- **Conditional:** If `content_length_type == 'short_form'`
- **Placeholder:** "e.g., 'Instagram captions: 100-150 words; Twitter posts: 50-70 characters'"

### 2.2 Number of Deliverables (Structure Scope Tightly)
- **Block Name:** `deliverable_count`
- **Type:** Object

#### 2.2.1 Number of Blog Articles
- **Field Name:** `blog_article_count`
- **Type:** Number
- **Required:** Conditional (if blog included)
- **Placeholder:** "e.g., 12 blogs"
- **Example:** 12 blog articles (monthly content calendar)

#### 2.2.2 Number of Social Media Captions
- **Field Name:** `social_caption_count`
- **Type:** Number
- **Required:** Conditional (if social content)
- **Placeholder:** "e.g., 30 captions"
- **Example:** 30 Instagram captions + 15 LinkedIn posts

#### 2.2.3 Number of Product Descriptions
- **Field Name:** `product_description_count`
- **Type:** Number
- **Required:** Conditional (if product descriptions)
- **Placeholder:** "e.g., 50 descriptions"

#### 2.2.4 Number of Ad Copies
- **Field Name:** `ad_copy_count`
- **Type:** Number
- **Required:** Conditional (if ad copy)
- **Placeholder:** "e.g., 20 ad variations"
- **Example:** 10 Google Ads + 10 Facebook Ad copies

#### 2.2.5 Number of Video Scripts
- **Field Name:** `video_script_count`
- **Type:** Number
- **Required:** Conditional (if scriptwriting)
- **Placeholder:** "e.g., 5 scripts"
- **Example:** 5 YouTube video scripts (5-10 min each)

#### 2.2.6 Number of Email Sequences
- **Field Name:** `email_sequence_count`
- **Type:** Number
- **Required:** Conditional (if email content)
- **Placeholder:** "e.g., 3 sequences"
- **Example:** 3 email sequences (5 emails each = 15 total emails)

#### 2.2.7 Number of Pages / Landing Pages
- **Field Name:** `page_count`
- **Type:** Number
- **Required:** Conditional (if website content)
- **Placeholder:** "e.g., 8 pages"
- **Example:** Homepage, About, Services, Blog, Contact, FAQ, Terms, Privacy = 8 pages

**Auto-Generated Clause:**
```
DELIVERABLE QUANTITY:

{if blog_article_count}
Number of blog articles: {blog_article_count}
{/if}

{if social_caption_count}
Social media captions: {social_caption_count}
{/if}

{if product_description_count}
Product descriptions: {product_description_count}
{/if}

{if ad_copy_count}
Ad copies (variations): {ad_copy_count}
{/if}

{if video_script_count}
Video scripts: {video_script_count}
{/if}

{if email_sequence_count}
Email sequences: {email_sequence_count}
{/if}

{if page_count}
Website pages: {page_count}
{/if}

Content is considered complete only when ALL specified deliverables are provided.
Incomplete delivery (missing articles, captions, or pages) is grounds for dispute.
```

---

### 2.3 Tone of Voice (Binding Reference)
- **Field Name:** `tone_of_voice`
- **Type:** Single Select or Custom
- **Required:** YES
- **Options:**
  - `professional` — Professional / Corporate
  - `friendly` — Friendly / Conversational
  - `informal_casual` — Informal / Casual / Trendy
  - `sales_persuasive` — Sales-oriented / Persuasive
  - `informative_educational` — Informative / Educational
  - `technical_expert` — Technical / Expert-level
  - `humorous_witty` — Humorous / Witty
  - `luxury_premium` — Luxury / Premium / High-end
  - `minimalist` — Minimalist / Direct
  - `storytelling` — Storytelling / Narrative
  - `custom` — Custom (User writes tone below)
- **Custom Field:** `tone_of_voice_custom_description` (Textarea, if "custom")
- **Contract Clause:** "Content shall adopt the following tone of voice: **{tone_of_voice}}**. {if custom}Custom tone: {tone_of_voice_custom_description}{/if} Writer shall maintain this tone consistently across all deliverables."
- **Purpose:** Makes tone disputes objective ("This doesn't match the agreed professional tone")

### 2.4 Target Audience Definition
- **Block Name:** `target_audience_block`
- **Type:** Object

#### 2.4.1 Demographic Description
- **Field Name:** `target_demographic`
- **Type:** Textarea (max 300 chars)
- **Required:** YES
- **Placeholder:** "Age, gender, location, income level, education, etc. (e.g., '25-40 year old tech professionals in urban India')"
- **Example:** "Female entrepreneurs aged 30-45, college-educated, based in tier-1 cities"

#### 2.4.2 Audience Persona
- **Field Name:** `audience_persona_description`
- **Type:** Textarea (max 500 chars)
- **Required:** NO
- **Placeholder:** "Detailed persona (name, challenges, goals, pain points, aspirations)"
- **Example:** "Sarah, 32, startup founder, struggles with work-life balance, wants flexible solutions"

#### 2.4.3 Intended Purpose
- **Field Name:** `content_purpose`
- **Type:** Multi-Select Checkboxes
- **Options:**
  - `awareness_education` — Awareness / Education
  - `engagement` — Engagement / Entertainment
  - `conversion_sales` — Conversion / Sales
  - `retention_loyalty` — Retention / Customer Loyalty
  - `brand_building` — Brand Building / Thought Leadership
  - `seo_traffic` — SEO / Organic Traffic
- **Contract Clause:** "Content purpose: {content_purpose}. Writer shall optimize content accordingly."

---

### 2.5 SEO Requirements (If Applicable)
- **Block Name:** `seo_requirements_block`
- **Type:** Object

#### 2.5.1 Is SEO Optimization Required?
- **Field Name:** `seo_optimization_required`
- **Type:** Yes/No
- **Required:** YES

#### 2.5.2 Primary Keyword(s)
- **Field Name:** `primary_keywords`
- **Type:** Repeatable Text (up to 5)
- **Conditional:** If `seo_optimization_required == true`
- **Required:** YES (if SEO required)
- **Placeholder:** "e.g., 'best laptop under 50000', 'digital marketing strategies'"
- **Example:** 
  - "cheap flight booking"
  - "budget hotels in Delhi"
  - "affordable gym memberships"

#### 2.5.3 Secondary Keywords
- **Field Name:** `secondary_keywords`
- **Type:** Repeatable Text (up to 10)
- **Conditional:** If `seo_optimization_required == true`
- **Placeholder:** "Related terms, long-tail variations (e.g., 'flights under budget', 'economy flight deals')"

#### 2.5.4 Keyword Density Rules
- **Field Name:** `keyword_density_rules`
- **Type:** Textarea (max 200 chars)
- **Conditional:** If `seo_optimization_required == true`
- **Placeholder:** "e.g., 'Primary keyword density: 1-2%, secondary keywords: 0.5-1%'"
- **Default:** "Primary keyword: 1-2% of content, natural placement"

#### 2.5.5 Meta Title & Description Required
- **Field Name:** `meta_tags_required`
- **Type:** Yes/No
- **Conditional:** If `seo_optimization_required == true`
- **Default:** Yes
- **Sub-fields (if Yes):**
  - `meta_title_max_length` (Text, default "60 chars")
  - `meta_description_max_length` (Text, default "160 chars")
- **Contract Clause:** "Meta title and meta description shall be optimized for search engines: Title (max {meta_title_max_length}), Description (max {meta_description_max_length})"

#### 2.5.6 Heading Structure (H1/H2/H3)
- **Field Name:** `heading_structure_required`
- **Type:** Yes/No
- **Conditional:** If `seo_optimization_required == true`
- **Default:** Yes
- **Sub-fields (if Yes):**
  - `h1_count` (Number, e.g., "1 H1 tag")
  - `h2_count` (Number, e.g., "3-5 H2 tags")
  - `h3_count` (Number, e.g., "Optional H3s")
- **Contract Clause:** "Content shall follow proper heading hierarchy: {h1_count}, {h2_count}, {h3_count}"

#### 2.5.7 Internal / External Links Required
- **Field Name:** `linking_strategy`
- **Type:** Multi-Select Checkboxes
- **Conditional:** If `seo_optimization_required == true`
- **Options:**
  - `internal_links` — Internal links (links to other site content)
  - `external_links` — External links (links to authoritative external sources)
  - `backlink_anchor_text` — Backlink anchor text optimization
- **Sub-field (if applicable):** `linking_rules_details` (Textarea)
- **Example:** "Include 3-5 internal links to relevant pages, 2-3 external links to authority sources"
- **Contract Clause:** "Linking strategy: {linking_strategy}. {linking_rules_details}"

#### 2.5.8 SEO Performance Expectations
- **Field Name:** `seo_performance_expectations`
- **Type:** Textarea (max 300 chars)
- **Conditional:** If `seo_optimization_required == true`
- **Placeholder:** "Expected results (e.g., 'Rank in top 10 Google results for primary keyword within 3 months')"
- **Note:** "Writer cannot guarantee rankings (Google algorithm outside writer's control), but can optimize content for best chance"

---

### 2.6 Required Research Depth
- **Field Name:** `research_depth`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `no_research` — No research (use existing knowledge)
  - `basic_research` — Basic research (Google search, general knowledge)
  - `moderate_research` — Moderate research (5-10 sources reviewed)
  - `deep_research` — Deep research (10+ sources, industry reports)
  - `expert_level` — Expert-level research (interviews, proprietary data, academic sources)
- **Contract Clause:** "Research depth: **{research_depth}}**. Writer shall use appropriate sources for this content level."
- **Impact on Price:** Expert-level research typically costs more

---

### 2.7 Data, References & Statistics
- **Block Name:** `research_references_block`
- **Type:** Object

#### 2.7.1 Statistics Required
- **Field Name:** `statistics_required`
- **Type:** Yes/No
- **Required:** YES (for informational content)
- **Default:** No (unless selected)

#### 2.7.2 Reference Sources (If Stats Required)
- **Field Name:** `allowed_source_types`
- **Type:** Multi-Select Checkboxes
- **Conditional:** If `statistics_required == true`
- **Options:**
  - `academic_papers` — Academic papers / journals
  - `industry_reports` — Industry reports (Gartner, McKinsey, etc.)
  - `government_data` — Government data / official sources
  - `news_articles` — News articles / reputable publications
  - `research_institutions` — Research institutions (universities, think tanks)
  - `company_data` — Company data / case studies
  - `user_generated` — User-generated content (Reddit, forums)
- **Contract Clause:** "References shall be sourced from: {allowed_source_types}"

#### 2.7.3 Avoid AI-Generated Citations
- **Field Name:** `avoid_ai_citations`
- **Type:** Checkbox (Yes/No)
- **Default:** No
- **Note:** "If checked, writer must verify all citations are from real, verifiable sources (not fabricated by AI)"
- **Contract Clause (if checked):** "Writer shall NOT use AI-generated or fabricated citations. All statistics must be from real, verifiable sources with proper attribution."

---

### 2.8 Plagiarism & Originality Requirements
- **Block Name:** `plagiarism_requirements_block`
- **Type:** Object

#### 2.8.1 Plagiarism Check Required
- **Field Name:** `plagiarism_check_required`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes

#### 2.8.2 Required Originality Percentage
- **Field Name:** `required_originality_percent`
- **Type:** Number (80-100)
- **Conditional:** If `plagiarism_check_required == true`
- **Default:** 95
- **Placeholder:** "e.g., 95 = 95% original, <5% similarity acceptable"
- **Example:** 98% original (only 2% acceptable similarity to web)
- **Contract Clause:** "Content shall be at least **{required_originality_percent}% original** as verified by plagiarism detection tools."

#### 2.8.3 Allowed Plagiarism Check Tools
- **Field Name:** `plagiarism_check_tools`
- **Type:** Multi-Select Checkboxes
- **Conditional:** If `plagiarism_check_required == true`
- **Default Options:**
  - ✓ Copyscape
  - ✓ Turnitin
  - Grammarly (Plagiarism detector)
  - Quetext
  - Plagscan
  - Custom tool (specify)
- **Contract Clause:** "Plagiarism verification shall be done using: {plagiarism_check_tools}. Results (screenshot/PDF) shall be provided with delivery."

#### 2.8.4 What if Plagiarism Exceeds Threshold
- **Field Name:** `plagiarism_violation_clause`
- **Type:** Auto-populated
- **Default:** "If delivered content exceeds the plagiarism tolerance ({required_originality_percent}% originality), it shall be treated as non-delivery. Client may request full refund or complete rewrite."

---

### 2.9 AI Usage Policy (Critical Protection)
- **Block Name:** `ai_usage_block`
- **Type:** Object

#### 2.9.1 AI-Generated Content Policy
- **Field Name:** `ai_content_policy`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `fully_prohibited` — NO AI content (100% human-written)
  - `ai_ideas_only` — AI allowed for ideation only (actual writing must be human)
  - `ai_with_heavy_editing` — AI allowed but must be heavily edited and human-rewritten
  - `ai_allowed` — AI-generated content fully allowed
  - `partially_allowed` — Partially allowed (specify which parts below)
- **Related Field:** `ai_partial_details` (Textarea, if "partially_allowed")
- **Contract Clause:**
  ```
  AI CONTENT POLICY:
  
  {if fully_prohibited}
  Content must be 100% human-written. NO AI generation, rewording, or assistance
  in writing allowed. Writer shall not use ChatGPT, Claude, Gemini, or similar
  AI tools for content generation.
  {/if}
  
  {if ai_ideas_only}
  Writer may use AI for brainstorming and ideation only. All actual writing,
  structure, and content creation must be done by the human writer.
  {/if}
  
  {if ai_with_heavy_editing}
  AI tools may be used but content must be heavily edited, rewritten, and
  modified by the human writer. Final content must be substantially different
  from any AI output and bear the writer's unique voice.
  {/if}
  
  {if ai_allowed}
  AI-generated content is permitted. Writer may use ChatGPT, Claude, or similar
  tools as part of content creation process.
  {/if}
  
  {if partially_allowed}
  AI usage allowed for: {ai_partial_details}
  {/if}
  ```

#### 2.9.2 AI Disclosure (If AI Used)
- **Field Name:** `ai_usage_disclosure_required`
- **Type:** Yes/No
- **Conditional:** If `ai_content_policy != 'fully_prohibited'`
- **Default:** Yes
- **Contract Clause (if Yes):** "Writer shall clearly indicate which sections (if any) were AI-generated or AI-assisted in the delivery documentation."

---

## 🔷 SECTION 3: DELIVERABLES (CONTRACT-BINDING)

### 3.1 File Formats & Delivery Methods
- **Block Name:** `deliverable_formats`
- **Type:** Object

#### 3.1.1 Preferred File Format
- **Field Name:** `file_format_preferred`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `docx` — DOCX (Microsoft Word)
  - `google_docs` — Google Docs link (shareable)
  - `pdf` — PDF (read-only format)
  - `txt` — TXT (plain text)
  - `markdown` — Markdown (for developers)
  - `custom` — Custom format (specify below)
- **Multiple Formats (if applicable):** `file_formats_multiple` (Multi-Select)
- **Contract Clause:** "Content shall be delivered in the following format(s): {file_format_preferred}"

#### 3.1.2 Editable Copy Provided
- **Field Name:** `editable_copy_provided`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes
- **Contract Clause:** "Editable source files shall be provided to allow Client to make future modifications."

#### 3.1.3 Subject Lines / Titles Included
- **Field Name:** `subject_lines_included`
- **Type:** Yes/No
- **Required:** Conditional (if emails, ads, or social media)
- **Contract Clause (if Yes):** "Subject lines / titles shall be provided for each email, ad, or social media post."

#### 3.1.4 Meta Descriptions Included
- **Field Name:** `meta_descriptions_included`
- **Type:** Yes/No
- **Required:** Conditional (if website content)
- **Contract Clause (if Yes):** "Meta descriptions (for SEO) shall be included with each blog article or page."

#### 3.1.5 Hashtags Included
- **Field Name:** `hashtags_included`
- **Type:** Yes/No
- **Required:** Conditional (if social media content)
- **Contract Clause (if Yes):** "Relevant hashtags shall be included with each social media caption (20-30 hashtags)."

#### 3.1.6 Call-to-Action (CTA) Required
- **Field Name:** `cta_required`
- **Type:** Yes/No
- **Required:** Conditional (if sales/marketing content)
- **Default:** Yes (for marketing content)
- **Sub-field (if Yes):** `cta_type` (Single Select)
  - "Sign up"
  - "Buy now"
  - "Learn more"
  - "Download"
  - "Subscribe"
  - "Custom (specify)"
- **Contract Clause (if Yes):** "Each piece of marketing content shall include a clear call-to-action: {cta_type}"

#### 3.1.7 Multiple Variations Required
- **Field Name:** `multiple_variations_required`
- **Type:** Yes/No
- **Required:** NO
- **Sub-field (if Yes):** `variation_count` (Number, e.g., "3 variations per social post")
- **Example:** "For each email subject line, provide 3 variations (A/B testing versions)"
- **Contract Clause (if Yes):** "Writer shall provide {variation_count} variations of each piece for A/B testing."

#### 3.1.8 Video Script Formatting
- **Field Name:** `video_script_format`
- **Type:** Single Select
- **Conditional:** If `content_type == 'scriptwriting_video'`
- **Options:**
  - `screenplay_format` — Screenplay format (industry standard)
  - `split_column_format` — Split-column format (video on left, narration on right)
  - `timecode_format` — Timecode format (including duration marks)
  - `simple_paragraphs` — Simple paragraph format
  - `custom` — Custom (specify below)
- **Contract Clause:** "Video scripts shall be formatted as: {video_script_format}"

---

### 3.2 Supporting Deliverables
- **Block Name:** `supporting_deliverables`
- **Type:** Object

#### 3.2.1 Outline / Structure Document Included
- **Field Name:** `outline_included`
- **Type:** Yes/No
- **Default:** Yes (recommended)
- **Contract Clause (if Yes):** "Content outline showing structure and main points shall be provided before full-length content."

#### 3.2.2 Keyword Usage Table / Report (SEO)
- **Field Name:** `keyword_usage_table_required`
- **Type:** Yes/No
- **Conditional:** If `seo_optimization_required == true`
- **Default:** Yes
- **Example:** "Table showing: Keywords used, frequency, density %, placement (title, H1, body, meta)"
- **Contract Clause (if Yes):** "Keyword usage report shall be provided showing keyword placement and density throughout content."

#### 3.2.3 Sources & References List
- **Field Name:** `sources_list_required`
- **Type:** Yes/No
- **Default:** Yes (if research-heavy)
- **Sub-field (if Yes):** `citation_format` (Single Select)
  - APA format
  - Chicago format
  - Harvard format
  - Simple (URL + title)
- **Contract Clause (if Yes):** "Full list of sources/references shall be provided in {citation_format} format."

#### 3.2.4 Plagiarism Report / Screenshot
- **Field Name:** `plagiarism_report_required`
- **Type:** Yes/No
- **Default:** Yes (if plagiarism check required)
- **Contract Clause (if Yes):** "Plagiarism check report/screenshot (from {plagiarism_check_tools}) shall be submitted with final content proving {required_originality_percent}% originality."

#### 3.2.5 Tone/Persona Alignment Proof
- **Field Name:** `tone_alignment_proof_required`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `tone_proof_format` (Text, e.g., "Document highlighting tone examples")
- **Contract Clause (if Yes):** "Writer shall provide proof/examples showing how content aligns with the agreed tone of voice."

---

## 🔷 SECTION 4: TIMELINES & MILESTONES

### 4.1 Overall Expected Completion Date
- **Field Name:** `expected_completion_date`
- **Type:** Date Picker
- **Required:** YES
- **Contract Clause:** "The expected completion and delivery of content is **{expected_completion_date}**."

### 4.2 Milestones (Repeatable Block)
- **Block Name:** `milestones[]`
- **Type:** Array of Objects
- **Min Items:** 1, **Max Items:** 10

**Per Milestone:**

#### 4.2.1 Milestone Name
- **Field Name:** `milestone_name`
- **Type:** Text
- **Required:** YES
- **Examples:** "Research & Outline", "First Draft (50%)", "Full Draft (100%)", "Revisions", "Final Delivery"

#### 4.2.2 Milestone Description
- **Field Name:** `milestone_description`
- **Type:** Textarea
- **Required:** YES
- **Placeholder:** "What content will be delivered in this milestone?"

#### 4.2.3 Milestone Due Date
- **Field Name:** `milestone_due_date`
- **Type:** Date Picker
- **Required:** YES

#### 4.2.4 Deliverables for This Milestone
- **Field Name:** `milestone_deliverables`
- **Type:** Textarea
- **Required:** YES
- **Example:** "Outlines for 5 blog articles, research notes, keyword list"

#### 4.2.5 Approval Required
- **Field Name:** `milestone_approval_required`
- **Type:** Yes/No
- **Default:** Yes
- **Contract Clause:** "Client shall review and approve milestone deliverables before proceeding to next phase."

### 4.3 Client Dependencies & Prerequisites
- **Field Name:** `client_dependencies`
- **Type:** Multi-Select Checkboxes (with details)
- **Options:**
  - `brand_guidelines` — Brand guidelines / brand voice document
  - `product_details` — Product/service details (specs, features)
  - `target_audience_info` — Target audience information
  - `company_background` — Company history / background info
  - `competitor_info` — Competitor information
  - `content_outline` — Content outline / structure (from client)
  - `images_assets` — Images/graphics/assets (for social/web)
  - `approval_process` — Clear approval timeline
  - `feedback_mechanism` — Feedback/revision process defined
- **Details Field:** `dependency_details_<name>` (Textarea, for each selected)

**Auto-Generated Delay Clause:**
```
TIMELINE EXTENSIONS:

If the Client fails to provide the following prerequisites on time:

{dependencies_prerequisites with details}

The Writer's timeline shall be extended by the same number of days of delay.
For example: If brand guidelines are provided 3 days late, all milestone dates
shall be extended by 3 days. Delays caused by Client shall not be subject to
late delivery penalties.
```

---

## 🔷 SECTION 5: REVISIONS, EDITING & CHANGES

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

### 5.2 What Revisions INCLUDE (Permitted Changes)
- **Field Name:** `revision_scope_allowed`
- **Type:** Multi-Select Checkboxes
- **Default Checked:**
  - ✓ Grammar / spelling / punctuation corrections
  - ✓ Tone adjustments (within agreed tone of voice)
  - ✓ Keyword placement optimizations (for SEO content)
  - ✓ Word count adjustments (within tolerance)
  - ✓ Minor wording / phrasing improvements
  - ✓ Breaking up long paragraphs
  - ✓ Adding subheadings (H2/H3)
  - ✓ CTA adjustments
  - ✓ Hashtag recommendations (for social)
- **Contract Clause:** "Revisions are limited to the following scope: {revision_scope_allowed}"

### 5.3 What Revisions EXCLUDE (Not Allowed)
- **Field Name:** `revision_scope_excluded`
- **Type:** Multi-Select Checkboxes
- **Default Checked:**
  - ✓ New topics / new sections
  - ✓ Adding new pages / articles
  - ✓ Complete tone rewrite (changing professional to casual, etc.)
  - ✓ Rewriting entire concept from scratch
  - ✓ Changing content purpose (e.g., educational → sales-focused)
  - ✓ Major structural changes
  - ✓ Adding new keywords / changing SEO focus
- **Contract Clause:** "The following are explicitly NOT included in revision rounds: {revision_scope_excluded}. Any such work shall require a Change Request and separate quote."

### 5.4 Revision Tolerance
- **Field Name:** `revision_tolerance_definition`
- **Type:** Textarea
- **Default:** "Revisions are for refinement only. If feedback requires rewriting >30% of content or changes the fundamental meaning, it shall be treated as a new project and charged separately."
- **Editable**
- **Contract Clause:** "{revision_tolerance_definition}"

### 5.5 Change Request Process
- **Field Name:** `change_request_process`
- **Type:** Textarea
- **Required:** YES
- **Default:** "Any work outside the revision scope shall be submitted in writing. Writer shall provide a separate quote within 48 hours. Work shall commence only after written approval and any required deposit."
- **Contract Clause:** "CHANGE REQUEST PROCESS: {change_request_process}"

---

## 🔷 SECTION 6: COPYRIGHT, USAGE RIGHTS & OWNERSHIP

### 6.1 IP Ownership Model
- **Field Name:** `ip_ownership_model`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `client_owns_all` — Client owns all content (full commercial rights)
  - `writer_retains` — Writer retains rights (Client gets limited license)
  - `ghostwriting` — Ghostwriting (Client will claim authorship, writer gets no credit)
  - `shared_rights` — Shared rights (specify terms below)
  - `custom` — Custom (specify below)

**Contract Clause (Auto-Generated):**
```
INTELLECTUAL PROPERTY OWNERSHIP:

{if client_owns_all}
All content, ideas, and intellectual property created under this project shall
become the exclusive property of the Client upon:
1. Full payment of the agreed project price
2. Acceptance of deliverables per Section 3 (Deliverables)

After IP transfer, the Writer retains no rights to reuse, republish, or claim
authorship of this content. Client may freely edit, republish, or distribute.
{/if}

{if writer_retains}
The Writer retains all intellectual property rights. Client receives a
non-exclusive, non-transferable license to use the content for their own
business use only.

Client may NOT:
- Resell or sublicense the content
- Claim original authorship
- Use for competing publications/websites

Writer may republish or repurpose content in portfolio/case studies.
{/if}

{if ghostwriting}
Client will be credited as the author. Writer will receive no public credit
or attribution. All IP transfers to Client upon payment. Writer may not use
this content in portfolio without Client permission.
{/if}

{if shared_rights}
Shared IP Terms: {shared_rights_details}
{/if}

{if custom}
Custom IP Terms: {ip_ownership_custom}
{/if}
```

### 6.2 Author Attribution
- **Field Name:** `author_credit_required`
- **Type:** Yes/No
- **Required:** YES
- **Default:** No (unless writer specifies)
- **Sub-field (if Yes):** `attribution_format` (Text, e.g., "By [Writer Name]", "Written by [Writer Name]")
- **Contract Clause (if Yes):** "Writer shall be credited as: {attribution_format}"

### 6.3 Content Rights After Escrow Release
- **Field Name:** `rights_transfer_trigger`
- **Type:** Auto-populated
- **Default:** "Upon Escrow Release, ALL intellectual property rights shall transfer to Client as per Section 6.1 above."

---

## 🔷 SECTION 7: COMMERCIAL TERMS

### 7.1 Total Project Price
- **Field Name:** `total_project_price`
- **Type:** Currency (INR)
- **Required:** YES
- **Placeholder:** "₹10,000"
- **Contract Clause:** "The total project price is **₹{total_project_price}}**."

### 7.2 Payment Structure
- **Field Name:** `payment_structure`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_upfront` — 100% Upfront
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
- **Contract Clause:** "The Client shall have **{inspection_window_hours}}** from delivery to inspect content and report issues within scope."

### 7.4 Refund Policy
- **Field Name:** `refund_policy`
- **Type:** Single Select
- **Options:**
  - `none` — No refund (delivered content is final)
  - `quality_issues` — Refund if quality issues within scope
  - `plagiarism_detected` — Refund if plagiarism detected
  - `incomplete_delivery` — Refund for incomplete deliverables
  - `custom` — Custom refund terms (specify below)
- **Details:** `refund_policy_details` (Textarea, if "custom")
- **Contract Clause:**
  ```
  REFUND POLICY:
  
  {if none}
  Once content is delivered and accepted by Client, all payments are final
  and non-refundable.
  {/if}
  
  {if quality_issues}
  If delivered content does not meet agreed standards (tone, structure, clarity),
  Client may request revisions within revision scope. If revisions cannot resolve
  issues, partial refund may be considered.
  {/if}
  
  {if plagiarism_detected}
  If plagiarism exceeds the agreed threshold ({required_originality_percent}% originality),
  Client shall receive a full refund and the Writer shall rewrite or fully reimburse.
  {/if}
  
  {if incomplete_delivery}
  If content deliverables are incomplete (missing articles, captions, pages),
  refund shall be prorated based on percentage delivered:
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
- **Contract Clause:** "If project is delivered after {expected_completion_date} (excluding Client delays or force majeure), a penalty of {late_penalty_percent_per_day}% per day shall apply, capped at {late_penalty_max_cap_percent}%."

### 7.6 Jurisdiction & Dispute Resolution
- **Field Name:** `jurisdiction_city`
- **Type:** Single Select + Autocomplete
- **Required:** YES
- **Default:** "Mumbai"
- **Contract Clause:** "Any disputes shall be governed by laws of {jurisdiction_city}, India, and subject to courts in {jurisdiction_city}."

---

# 📸 PART B: DELIVERY EVIDENCE FIELDS
**Submitted when marking content as delivered OR when dispute is raised**

### B.1 At Time of Delivery
When user clicks "Mark as Delivered", system should request:

#### B.1.1 Final Content Files
- **Field Name:** `delivery_content_files`
- **Type:** File Upload (DOCX/PDF/Google Docs link)
- **Required:** YES
- **Max Size:** 100 MB
- **Validation:** Must match agreed file format

#### B.1.2 Draft / Working Versions (Optional)
- **Field Name:** `delivery_draft_versions`
- **Type:** File Upload
- **Required:** NO
- **Placeholder:** "Optional: Include draft versions showing evolution of content"

#### B.1.3 Outline / Structure Document
- **Field Name:** `delivery_outline_document`
- **Type:** File Upload or Textarea
- **Required:** Conditional (if outline in scope)
- **Placeholder:** "Content structure/outline showing main sections and flow"

#### B.1.4 Plagiarism Check Report
- **Field Name:** `delivery_plagiarism_report`
- **Type:** File Upload (PDF/Screenshot)
- **Required:** Conditional (if plagiarism check required)
- **Placeholder:** "Screenshot or PDF from plagiarism tool showing {required_originality_percent}% originality"

#### B.1.5 Keyword Usage Table / Report
- **Field Name:** `delivery_keyword_usage_report`
- **Type:** File Upload (Excel/PDF/Spreadsheet link)
- **Required:** Conditional (if SEO content)
- **Placeholder:** "Table showing: Keywords, placement, frequency, density %"

#### B.1.6 Sources & References List
- **Field Name:** `delivery_sources_list`
- **Type:** File Upload or Textarea
- **Required:** Conditional (if research-heavy)
- **Placeholder:** "Full list of sources/references in {citation_format} format"

#### B.1.7 Metatags & SEO Details
- **Field Name:** `delivery_seo_details`
- **Type:** File Upload or Textarea
- **Required:** Conditional (if website content with SEO)
- **Placeholder:** "Meta titles, descriptions, focus keywords, word count for each page"

#### B.1.8 Deliverables Checklist
- **Field Name:** `delivery_checklist_complete`
- **Type:** Multi-Select Checkboxes (auto-populated)
- **Options:** Auto-populated from Section 2
  - ☑ 12 blog articles (if applicable)
  - ☑ 30 social media captions (if applicable)
  - ☑ 50 product descriptions (if applicable)
  - etc.

#### B.1.9 Version History / Track Changes
- **Field Name:** `delivery_version_history`
- **Type:** Textarea or File
- **Required:** NO
- **Placeholder:** "Optional: Document showing revisions made and changes between versions"

#### B.1.10 Reference Links Used
- **Field Name:** `delivery_reference_links`
- **Type:** Textarea (URL list)
- **Required:** Conditional (if research-heavy)
- **Placeholder:** "List all sources/websites referenced during research"

#### B.1.11 Delivery Notes
- **Field Name:** `delivery_notes`
- **Type:** Textarea (max 500 chars)
- **Required:** NO
- **Placeholder:** "Any notes about the delivery, tone used, key highlights, or special points"

#### B.1.12 Tone / Persona Alignment Examples
- **Field Name:** `delivery_tone_examples`
- **Type:** Textarea
- **Required:** NO
- **Placeholder:** "Examples showing how content aligns with agreed tone of voice"

#### B.1.13 AI Usage Disclosure (If Applicable)
- **Field Name:** `delivery_ai_usage_disclosure`
- **Type:** Textarea
- **Required:** Conditional (if AI usage allowed)
- **Placeholder:** "Disclose which sections (if any) were AI-generated or AI-assisted"

#### B.1.14 Editable Copy Link / Access
- **Field Name:** `delivery_editable_copy_access`
- **Type:** URL or File Upload
- **Required:** Conditional (if Google Docs delivery)
- **Placeholder:** "Google Docs sharing link or download link for editable version"

---

# 🎯 PART C: DISPUTE EVIDENCE FIELDS

### C.1 When Raising a Dispute

#### C.1.1 Dispute Reason Category
- **Field Name:** `dispute_reason_category`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `incomplete_delivery` — Incomplete delivery (fewer articles/captions than agreed)
  - `plagiarism_detected` — Plagiarism detected (exceeds acceptable threshold)
  - `tone_mismatch` — Tone/voice doesn't match agreement
  - `seo_not_working` — SEO not optimized as agreed
  - `quality_low` — Content quality is low / amateur
  - `scope_not_followed` — Content doesn't match scope / requirements
  - `ai_used_when_prohibited` — AI content used when prohibited
  - `missed_deadline` — Deadline missed without valid reason
  - `factual_errors` — Factual errors / misinformation
  - `research_lacking` — Research insufficient / sources missing
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
  - `critical_unusable` — Critical (Content completely unusable)
  - `major_significant` — Major (Significant issues affecting quality)
  - `minor_fixable` — Minor (Small issues, easily correctable)

#### C.1.4 Comparison Evidence: Expected vs. Actual
- **Field Name:** `dispute_comparison_evidence`
- **Type:** Textarea or File Upload
- **Required:** YES
- **Placeholder:** "Compare what was agreed vs. what was delivered. Provide specific examples."
- **Example:** "Agreed tone: Professional. Actual content: Casual/slang. Examples: [quote from content]"

#### C.1.5 Plagiarism Proof (If Plagiarism Claim)
- **Field Name:** `dispute_plagiarism_proof`
- **Type:** File Upload (Screenshot/PDF)
- **Required:** Conditional (if plagiarism claim)
- **Placeholder:** "Plagiarism tool results showing originality below {required_originality_percent}%"

#### C.1.6 Missing Deliverables Proof
- **Field Name:** `dispute_missing_deliverables`
- **Type:** Textarea
- **Required:** Conditional (if incomplete delivery)
- **Placeholder:** "List what was agreed vs. what was delivered. Example: 'Agreed: 12 blogs. Delivered: 8 blogs.'"

#### C.1.7 SEO Performance Issues
- **Field Name:** `dispute_seo_issues`
- **Type:** Textarea
- **Required:** Conditional (if SEO issue)
- **Placeholder:** "Specific SEO problems (e.g., 'Keyword not in content', 'Meta tags missing', 'No H1 tag')"

#### C.1.8 Tone Mismatch Examples
- **Field Name:** `dispute_tone_mismatch_examples`
- **Type:** Textarea
- **Required:** Conditional (if tone mismatch)
- **Placeholder:** "Quote specific examples from content that don't match agreed tone. Example: 'Agreed: Professional. Actual quotes: [casual language examples]'"

#### C.1.9 Factual Errors / Misinformation
- **Field Name:** `dispute_factual_errors`
- **Type:** Textarea
- **Required:** Conditional (if factual error)
- **Placeholder:** "Specific false/incorrect statements with corrections"
- **Example:** "Content says 'India's population is 500 million' but correct figure is 1.4 billion"

#### C.1.10 Evidence: Screenshots / Quotes
- **Field Name:** `dispute_screenshots_quotes`
- **Type:** File Upload (Images) or Textarea
- **Required:** YES (at least 1)
- **Placeholder:** "Screenshots from content or direct quotes showing the problem"

#### C.1.11 Requested Resolution
- **Field Name:** `dispute_requested_resolution`
- **Type:** Single Select or Text
- **Required:** YES
- **Options:**
  - `full_refund` — Full refund
  - `partial_refund` — Partial refund (specify amount)
  - `rewrite` — Rewrite problematic content
  - `price_reduction` — Price reduction (specify amount)
  - `completion` — Complete missing deliverables
  - `other` — Other (specify)
- **Amount Field:** `dispute_refund_amount` (Currency, if applicable)

#### C.1.12 Supporting Documentation
- **Field Name:** `dispute_supporting_docs`
- **Type:** File Upload
- **Required:** NO
- **Placeholder:** "Email exchanges, chat logs (from platform), original scope/brief, or other proof"

---

# 🗄️ PART D: DATABASE SCHEMA MAPPING

```sql
-- Section 1: Project Definition
project_title TEXT NOT NULL,
content_type TEXT NOT NULL, -- enum
content_type_custom TEXT,
industry_domain TEXT NOT NULL, -- enum
industry_domain_custom TEXT,

-- Section 2: Scope of Work
word_count_block JSONB, -- {content_length_type, minimum_word_count, maximum_word_deviation_percent, short_form_specs}
deliverable_count JSONB, -- {blog_article_count, social_caption_count, product_description_count, ad_copy_count, video_script_count, email_sequence_count, page_count}
tone_of_voice TEXT NOT NULL, -- enum
tone_of_voice_custom_description TEXT,
target_demographic TEXT NOT NULL,
audience_persona_description TEXT,
content_purpose TEXT[],
seo_optimization_required BOOLEAN,
primary_keywords TEXT[],
secondary_keywords TEXT[],
keyword_density_rules TEXT,
meta_tags_required BOOLEAN,
meta_title_max_length TEXT,
meta_description_max_length TEXT,
heading_structure_required BOOLEAN,
h1_count TEXT,
h2_count TEXT,
h3_count TEXT,
linking_strategy TEXT[],
linking_rules_details TEXT,
seo_performance_expectations TEXT,
research_depth TEXT NOT NULL, -- enum
statistics_required BOOLEAN,
allowed_source_types TEXT[],
avoid_ai_citations BOOLEAN,
plagiarism_check_required BOOLEAN,
required_originality_percent INTEGER,
plagiarism_check_tools TEXT[],
plagiarism_violation_clause TEXT,
ai_content_policy TEXT NOT NULL, -- enum
ai_partial_details TEXT,
ai_usage_disclosure_required BOOLEAN,

-- Section 3: Deliverables
file_format_preferred TEXT NOT NULL, -- enum
file_formats_multiple TEXT[],
editable_copy_provided BOOLEAN,
subject_lines_included BOOLEAN,
meta_descriptions_included BOOLEAN,
hashtags_included BOOLEAN,
cta_required BOOLEAN,
cta_type TEXT,
multiple_variations_required BOOLEAN,
variation_count INTEGER,
video_script_format TEXT, -- enum
outline_included BOOLEAN,
keyword_usage_table_required BOOLEAN,
sources_list_required BOOLEAN,
citation_format TEXT,
plagiarism_report_required BOOLEAN,
tone_alignment_proof_required BOOLEAN,
tone_proof_format TEXT,

-- Section 4: Timelines & Milestones
expected_completion_date DATE NOT NULL,
milestones JSONB, -- array of {name, description, due_date, deliverables, approval_required}
client_dependencies JSONB,

-- Section 5: Revisions
revisions_included TEXT NOT NULL, -- enum or number
revisions_custom_number INTEGER,
revision_scope_allowed TEXT[],
revision_scope_excluded TEXT[],
revision_tolerance_definition TEXT,
change_request_process TEXT NOT NULL,

-- Section 6: IP & Ownership
ip_ownership_model TEXT NOT NULL, -- enum
ip_ownership_custom TEXT,
shared_rights_details TEXT,
author_credit_required BOOLEAN,
attribution_format TEXT,
rights_transfer_trigger TEXT,

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
delivery_content_files TEXT, -- file URL/path
delivery_draft_versions TEXT, -- file URL/path
delivery_outline_document TEXT, -- file URL/path or text
delivery_plagiarism_report TEXT, -- file URL/path
delivery_keyword_usage_report TEXT, -- file URL/path
delivery_sources_list TEXT, -- file URL/path or text
delivery_seo_details TEXT, -- file URL/path or text
delivery_checklist_complete TEXT[],
delivery_version_history TEXT, -- file URL/path or text
delivery_reference_links TEXT[], -- array of URLs
delivery_notes TEXT,
delivery_tone_examples TEXT,
delivery_ai_usage_disclosure TEXT,
delivery_editable_copy_access TEXT, -- URL or file

-- Part C: Dispute Evidence
dispute_reason_category TEXT,
dispute_description TEXT,
dispute_severity TEXT,
dispute_comparison_evidence TEXT, -- file URL or text
dispute_plagiarism_proof TEXT, -- file URL
dispute_missing_deliverables TEXT,
dispute_seo_issues TEXT,
dispute_tone_mismatch_examples TEXT,
dispute_factual_errors TEXT,
dispute_screenshots_quotes TEXT, -- file URL or text
dispute_requested_resolution TEXT,
dispute_refund_amount NUMERIC,
dispute_supporting_docs TEXT, -- file URL
```

---

## 📝 SUMMARY

This SERVICE ANNEXURE C for Content Writing & Copywriting provides:

✅ **48 Contract Creation Fields** → Become binding contract clauses  
✅ **14 Delivery Evidence Fields** → Needed when marking complete  
✅ **12 Dispute Evidence Fields** → Required when raising disputes  
✅ **80+ Database Columns** → Schema mapping for storage  
✅ **Auto-Generated Contract** → Clauses populate from form inputs  
✅ **Legally Strong** → Protects against content disputes, plagiarism, AI usage, tone mismatches  

**Key Dispute Protections:**
- Word count / deliverable count verification
- Plagiarism threshold enforcement
- Tone of voice binding reference
- SEO requirements objective measurement
- AI usage policy clarity
- Revision scope limits to prevent endless edits
- IP ownership transparency

**Next Service Annexures Ready to Create:**
- D: Digital Marketing & SEO Services
- E: Video Production & Animation Services
- F: Photography Services
- G: Consulting & Advisory Services
- ... and more!

