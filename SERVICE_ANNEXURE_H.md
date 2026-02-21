# 📱 SERVICE INDUSTRY: DIGITAL MARKETING / SEO / SOCIAL MEDIA / ADS / BRANDING
## COMPREHENSIVE DIGITAL MARKETING PROJECT DATA MODEL
**Date Created:** November 28, 2025  
**Annexure Code:** H (Service Industry - Digital Marketing)  
**Industry:** Digital Marketing, SEO, Social Media, PPC, Content Creation, Influencer Marketing, Branding  
**Categories:** Social Media Management, SEO, Performance Marketing, Content Creation, PPC, E-commerce Growth, YouTube Growth, Influencer Marketing, Branding Strategy, Email Marketing, Marketing Automation, Lead Generation, Copywriting, Website Conversion

---

## 📋 TABLE OF CONTENTS

- **PART A: CONTRACT CREATION FIELDS** (72 fields) ← CURRENT SECTION
- **PART B: DELIVERY EVIDENCE FIELDS** (TBD - to be added)
- **PART C: DISPUTE EVIDENCE FIELDS** (TBD - to be added)
- **PART D: DATABASE SCHEMA MAPPING** (TBD - to be added)
- **PART E: SAMPLE CONTRACT CLAUSE GENERATION** (TBD - to be added)

---

# ⚙️ PART A: CONTRACT CREATION FIELDS
**Filled before contract is generated & signed**  
**These fields become binding clauses in the contract**  
**⚠️ MOST DETAILED AMONG ALL SERVICE INDUSTRIES - Designed to prevent 90% of disputes**

---

## 🔷 SECTION 1: SERVICE TYPE & PLATFORM DEFINITION
**Mandatory fields that define the exact service scope**

### 1.1 Digital Marketing Service Type (Primary Category)
- **Field Name:** `digital_marketing_service_type`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `social_media_management` — Social Media Management (posts, engagement, community)
  - `social_media_growth` — Social Media Growth (follower growth, reach expansion)
  - `performance_marketing` — Performance Marketing (Facebook/Google Ads, ROI-focused)
  - `seo_service` — SEO (On-page, Off-page, Technical, Ranking improvement)
  - `content_creation` — Content Creation (videos, reels, static posts, animations)
  - `ppc_campaign_management` — PPC Campaign Management (Google Ads, Bing Ads)
  - `ecommerce_growth` — E-commerce Growth (product listings, conversion optimization)
  - `youtube_channel_growth` — YouTube Channel Growth (subscribers, views, engagement)
  - `influencer_marketing` — Influencer Marketing (partnerships, sponsored posts)
  - `branding_strategy` — Branding Strategy (brand positioning, messaging, guidelines)
  - `email_marketing` — Email Marketing (campaigns, automation, list building)
  - `marketing_automation` — Marketing Automation (flows, nurturing sequences)
  - `lead_generation` — Lead Generation (landing pages, forms, funnel building)
  - `funnel_building` — Sales Funnel Building (awareness → consideration → conversion)
  - `copywriting_service` — Copywriting (ad copy, website copy, email sequences)
  - `marketing_consultation` — Marketing Consultation (strategy, planning, optimization)
  - `website_conversion_optimization` — Website Conversion Optimization (CRO, A/B testing)
- **Contract Clause:** "This Agreement pertains to the following service: **{digital_marketing_service_type}}**"

### 1.2 Service Job Title
- **Field Name:** `digital_marketing_job_title`
- **Type:** Text (max 150 chars)
- **Required:** YES
- **Example:** "Instagram Growth Campaign - 6 months", "Google Ads Management for E-commerce", "SEO Optimization - 20 Pages"
- **Contract Clause:** "Service: **{digital_marketing_job_title}}**"

### 1.3 Platforms to Be Covered
- **Field Name:** `platforms_covered_dm`
- **Type:** Multi-Select Checkboxes (select all applicable)
- **Required:** YES (select at least 1)
- **Options:**
  - ✓ Instagram
  - ✓ Facebook
  - ✓ YouTube
  - ✓ Google Search (SEO)
  - ✓ Google Display Network (GDN)
  - ✓ LinkedIn
  - ✓ Twitter/X
  - ✓ Pinterest
  - ✓ Website/Blog
  - ✓ Email
  - ✓ TikTok
  - ✓ Custom Platform (specify below)
- **Custom Field:** `custom_platform_dm` (Text, if "Custom Platform" selected)
- **Contract Clause:** "Platforms covered: {platforms_covered_dm}"

### 1.4 Brand/Business Information
- **Block Name:** `brand_info_block_dm`
- **Type:** Object

#### 1.4.1 Brand/Business Name
- **Field Name:** `brand_name_dm`
- **Type:** Text
- **Required:** YES
- **Placeholder:** "e.g., 'ABC E-commerce Store', 'XYZ Consulting'"

#### 1.4.2 Industry Type (CRITICAL FOR AD COMPLIANCE)
- **Field Name:** `industry_type_dm`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `retail_ecommerce` — Retail / E-commerce
  - `saas_software` — SaaS / Software
  - `services_professional` — Professional Services (law, accounting, consulting)
  - `beauty_cosmetics` — Beauty / Cosmetics
  - `food_beverage` — Food & Beverage / Restaurants
  - `health_fitness` — Health & Fitness / Wellness
  - `real_estate` — Real Estate
  - `finance_banking` — Finance / Banking / Insurance
  - `education_training` — Education / Training / Courses
  - `automotive` — Automotive / Vehicles
  - `travel_tourism` — Travel / Tourism / Hospitality
  - `media_entertainment` — Media / Entertainment / Gaming
  - `nonprofit_charity` — Nonprofit / Charity
  - `other` — Other (specify)
- **Custom Field:** `industry_type_custom_dm` (Text, if "other")
- **Impact:** Determines ad policy restrictions (no crypto, health claims, gambling, etc.)
- **Contract Clause:** "Industry: **{industry_type_dm}}** (Subject to Meta/Google ad policies)"

#### 1.4.3 Business Website (If Applicable)
- **Field Name:** `business_website_url_dm`
- **Type:** URL
- **Required:** NO
- **Placeholder:** "e.g., https://www.businessname.com"

#### 1.4.4 Business Stage
- **Field Name:** `business_stage_dm`
- **Type:** Single Select
- **Options:**
  - `startup_launch` — Startup / Just launching
  - `scaling_growing` — Scaling / Growing business
  - `established` — Established business
  - `rebranding` — Rebranding / Pivoting
- **Impact:** Affects strategy recommendations

---

## 🔷 SECTION 2: STRATEGIC APPROACH & GOALS

### 2.1 Marketing Strategy Approach
- **Field Name:** `strategy_approach_dm`
- **Type:** Single Select (Primary strategy)
- **Required:** YES
- **Options:**
  - `organic_growth` — Organic Growth (no paid ads, natural reach)
  - `paid_growth` — Paid Growth (ads-focused, budget-driven)
  - `hybrid_organic_paid` — Hybrid (combination of organic + paid)
  - `awareness_campaign` — Awareness Campaign (brand visibility)
  - `lead_funnel` — Lead Funnel Building (awareness → interest → conversion)
  - `sales_driven` — Sales-Driven (direct conversions, revenue focus)
  - `brand_positioning` — Brand Positioning (strategy & messaging)
- **Contract Clause:** "Primary strategy: **{strategy_approach_dm}}**"

### 2.2 Campaign Goals (Optional but Recommended)
- **Field Name:** `campaign_goals_dm`
- **Type:** Multi-Select Checkboxes (aspirational metrics - NOT guaranteed)
- **Required:** NO
- **Options:**
  - ☐ Traffic increase (target: __% or __k visits)
  - ☐ Engagement rate target (target: __%/month)
  - ☐ Lead generation target (target: __ leads/month)
  - ☐ ROAS expectation (Return on Ad Spend: target: __x)
  - ☐ Follower growth (target: __ followers/month)
  - ☐ Search ranking improvement (target: __ keywords to page 1)
  - ☐ Email subscriber growth (target: __ new subscribers/month)
  - ☐ Brand awareness (measured by impressions/reach)
  - ☐ Customer acquisition (cost per customer: ₹___)
  - ☐ Revenue target (target: ₹___/month)

**Auto-Generated Disclaimer Clause:**
```
ASPIRATIONAL METRICS DISCLAIMER:

The above goals are aspirational targets based on market conditions, 
platform algorithms, audience behavior, and current industry benchmarks. 
They are NOT guaranteed outcomes. Platform algorithms (Instagram, Facebook, 
Google, YouTube) are controlled by third parties and may change without notice.

Service Provider commits to EFFORT-BASED DELIVERABLES (outlined in Scope of Work), 
not OUTCOME-BASED RESULTS. No refund is provided if these metrics are not achieved, 
provided all effort-based deliverables are completed as per contract.
```

---

## 🔷 SECTION 3: SCOPE OF WORK - SOCIAL MEDIA MANAGEMENT
**Conditional: Only if `digital_marketing_service_type` includes "social_media_management" or "social_media_growth"**

### 3.1 Social Media Management Deliverables
- **Block Name:** `social_media_deliverables_block`
- **Type:** Object
- **Conditional:** If social media service selected

#### 3.1.1 Monthly Post Count
- **Field Name:** `posts_per_month_dm`
- **Type:** Number
- **Required:** YES
- **Placeholder:** "e.g., 4, 8, 12, 16, 20"
- **Contract Clause:** "Monthly posts: exactly **{posts_per_month_dm}} per month**"

#### 3.1.2 Monthly Reels/Video Content
- **Field Name:** `reels_per_month_dm`
- **Type:** Number
- **Required:** YES
- **Placeholder:** "e.g., 2, 4, 8 (depends on platform)"
- **Contract Clause:** "Monthly reels/videos: exactly **{reels_per_month_dm}} per month**"

#### 3.1.3 Stories Per Week
- **Field Name:** `stories_per_week_dm`
- **Type:** Number
- **Required:** NO
- **Placeholder:** "e.g., 0, 2, 5, 7"
- **Note:** "Stories are temporary (24-hour) content. Frequency affects visibility."

#### 3.1.4 Static Creatives (Carousel, Infographics, etc.)
- **Field Name:** `static_creatives_per_month_dm`
- **Type:** Number
- **Placeholder:** "e.g., 2, 4, 6 (carousel posts, infographics, quote graphics)"

#### 3.1.5 Caption Writing
- **Field Name:** `caption_writing_included_dm`
- **Type:** Yes/No
- **Default:** Yes
- **Sub-field (if Yes):** `caption_style_guidelines` (Textarea, e.g., "Professional but friendly tone, include CTA, max 150 words")

#### 3.1.6 Hashtag Research & Application
- **Field Name:** `hashtag_research_included_dm`
- **Type:** Yes/No
- **Default:** Yes
- **Sub-field (if Yes):** `hashtag_research_frequency` (Single Select: Per post / Weekly / Monthly)

#### 3.1.7 Community Management (Engagement)
- **Field Name:** `community_management_included_dm`
- **Type:** Yes/No
- **Default:** Yes
- **Sub-fields (if Yes):**
  - `comment_response_time_dm` (Single Select: Same day / 24 hours / 48 hours)
  - `dm_response_time_dm` (Single Select: Same day / 24 hours / 48 hours / Not included)
  - `engagement_activities_dm` (Multi-Select: Like/comment on follower posts / Reply to comments / Follow relevant accounts / Respond to DMs)

#### 3.1.8 Post Scheduling Frequency
- **Field Name:** `post_scheduling_frequency_dm`
- **Type:** Single Select
- **Options:**
  - `daily_scheduling` — Daily
  - `3_per_week_scheduling` — 3 per week
  - `2_per_week_scheduling` — 2 per week
  - `weekly_scheduling` — Weekly
  - `as_agreed` — As agreed by parties

#### 3.1.9 Revisions Per Creative
- **Field Name:** `revisions_per_creative_dm`
- **Type:** Number
- **Default:** 2
- **Placeholder:** "Number of revision rounds per post (e.g., 1, 2, 3)"
- **Sub-field:** `revision_definition_dm` (Textarea, e.g., "Changes to text, colors, design layout. Does NOT include complete redesign.")

#### 3.1.10 Content Calendar
- **Field Name:** `content_calendar_provided_dm`
- **Type:** Yes/No
- **Default:** Yes
- **Sub-field (if Yes):** `calendar_format_dm` (Single Select: Google Sheet / Notion / Excel / Other)

---

## 🔷 SECTION 4: SCOPE OF WORK - SEO
**Conditional: Only if `digital_marketing_service_type` includes "seo_service"**

### 4.1 SEO Project Scope
- **Block Name:** `seo_scope_block`
- **Type:** Object
- **Conditional:** If SEO service selected

#### 4.1.1 SEO Type
- **Field Name:** `seo_type_dm`
- **Type:** Single Select
- **Required:** YES (if SEO)
- **Options:**
  - `on_page_seo` — On-page SEO (keywords, meta tags, H1/H2/H3, content)
  - `off_page_seo` — Off-page SEO (backlinks, citations, authority building)
  - `technical_seo` — Technical SEO (site speed, mobile, indexing, sitemap)
  - `comprehensive_seo` — Comprehensive SEO (all three: on-page + off-page + technical)
- **Contract Clause:** "SEO type: **{seo_type_dm}}**"

#### 4.1.2 Keyword Research Deliverable
- **Field Name:** `keywords_research_count_dm`
- **Type:** Number
- **Required:** YES (if SEO)
- **Placeholder:** "e.g., 20, 50, 100 (number of keywords to target)"
- **Contract Clause:** "Keywords researched & optimized: exactly **{keywords_research_count_dm}} keywords**"

#### 4.1.3 Web Pages to Be Optimized
- **Field Name:** `web_pages_optimized_count_dm`
- **Type:** Number
- **Required:** YES (if SEO)
- **Placeholder:** "e.g., 5, 10, 20 pages"
- **Contract Clause:** "Web pages optimized: exactly **{web_pages_optimized_count_dm}} pages**"

#### 4.1.4 Backlinks to Be Created
- **Field Name:** `backlinks_target_count_dm`
- **Type:** Number
- **Placeholder:** "e.g., 10, 20, 50 (number of backlinks to create)"
- **Sub-field:** `backlink_quality_dm` (Single Select: Guest posts / Directory listings / Infographic backlinks / High-authority / Mixed quality)
- **Contract Clause:** "Backlinks to be created: approximately **{backlinks_target_count_dm}} backlinks** (quality: {backlink_quality_dm})"

#### 4.1.5 Domain Authority / Domain Rating (If Promised)
- **Field Name:** `da_dr_improvement_promised_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-fields (if Yes):**
  - `target_domain_authority_dm` (Number, e.g., "35", "50")
  - `target_domain_rating_dm` (Number, e.g., "35", "45")
- **Disclaimer Auto-Added:** "DA/DR improvements depend on third-party tools (MOZ, Ahrefs) and platform algorithms. While efforts shall be made, exact DA/DR targets cannot be guaranteed."

#### 4.1.6 On-Page Optimization Included?
- **Field Name:** `on_page_optimization_included_dm`
- **Type:** Yes/No
- **Default:** Yes
- **Sub-options (if Yes):**
  - ✓ Meta title & description optimization
  - ✓ H1/H2/H3 tag optimization
  - ✓ Keyword placement in content
  - ✓ Internal linking strategy
  - ✓ Image alt tag optimization
  - ✓ URL structure optimization

#### 4.1.7 Technical SEO Audit Included?
- **Field Name:** `technical_seo_audit_included_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-options (if Yes):**
  - ✓ Site speed audit
  - ✓ Mobile responsiveness check
  - ✓ SSL/HTTPS verification
  - ✓ Crawl errors identification
  - ✓ XML sitemap audit
  - ✓ Robots.txt audit

#### 4.1.8 Schema Markup Implementation
- **Field Name:** `schema_markup_included_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `schema_types_dm` (Multi-Select: Organization / Product / Article / Local Business / Event / FAQ / Other)

#### 4.1.9 Page Speed Optimization
- **Field Name:** `page_speed_optimization_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `target_page_speed_dm` (Single Select: Good (90+) / Fast (75+) / Acceptable (60+) / Best effort)

#### 4.1.10 Content Writing Included?
- **Field Name:** `content_writing_included_seo_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-fields (if Yes):**
  - `content_word_count_dm` (Number, e.g., "500 words per page", total per month)
  - `content_types_seo_dm` (Multi-Select: Blog posts / Landing pages / Product descriptions / Guides / Other)

**Critical Auto-Generated Clause:**
```
SEO TIMELINE & RESULTS DISCLAIMER:

SEO is a long-term strategy. Keyword rankings typically take 3-6 months 
to improve, depending on competition, domain age, and search intent.

Service Provider commits to:
✓ Completing all technical deliverables (keywords researched, pages optimized, backlinks created)
✓ Following Google's guidelines and best practices
✓ Providing monthly reports on activities completed

Service Provider DOES NOT guarantee:
✗ Specific keyword rankings or positions
✗ Traffic increase % or volume
✗ First-page rankings
✗ Timeline for ranking improvements

Refunds are based on EFFORT-BASED DELIVERABLES (technical work), 
NOT OUTCOME-BASED RESULTS (rankings achieved).
```

---

## 🔷 SECTION 5: SCOPE OF WORK - PAID ADS MANAGEMENT
**Conditional: Only if service includes paid ads (Performance Marketing, PPC, etc.)**

### 5.1 Ad Account & Platform Details
- **Block Name:** `ads_account_details_block`
- **Type:** Object
- **Conditional:** If paid ads service selected

#### 5.1.1 Ad Platform
- **Field Name:** `ad_platform_dm`
- **Type:** Multi-Select (select all platforms to manage)
- **Options:**
  - ✓ Facebook Ads
  - ✓ Instagram Ads
  - ✓ Google Search Ads
  - ✓ Google Display Network (GDN)
  - ✓ YouTube Ads
  - ✓ LinkedIn Ads
  - ✓ Pinterest Ads
  - ✓ Other (specify)

#### 5.1.2 Who Pays for Ad Spend? (CRITICAL LEGAL FIELD)
- **Field Name:** `ad_spend_payer_dm`
- **Type:** Single Select
- **Required:** YES (if ads service)
- **Options:**
  - `client_pays_direct` — Client pays directly (directly to Facebook/Google)
  - `service_provider_pays_client_reimburses` — Service provider pays, client reimburses + service fee
  - `agency_account` — Service provider's agency account (with transparent tracking)
  - `client_provides_card` — Client provides card to service provider
  - `other_payment_model` — Other (specify)
- **Custom Field:** `ad_spend_payment_details_dm` (Textarea, e.g., "Client provides card, max spend ₹50,000/month, Service provider charges 15% management fee")

**Auto-Generated Critical Clause:**
```
AD ACCOUNT OWNERSHIP & DATA ACCESS:

1. If client pays directly: Client owns all account data. Service provider has 
   Admin/Editor access to manage campaigns only.

2. If service provider pays: All ad account data & pixels are under 
   Service Provider's account for protection. Client has read-only dashboard access 
   via custom reports (exported monthly/weekly).

3. Ad account shall NOT be closed or deleted without mutual consent.

4. At contract end, all data shall be provided to client in export format (CSV).
```

#### 5.1.3 Estimated Monthly Ad Spend
- **Field Name:** `estimated_monthly_ad_spend_dm`
- **Type:** Currency (INR)
- **Required:** YES (if ads)
- **Placeholder:** "e.g., ₹10,000, ₹50,000, ₹1,00,000"
- **Contract Clause:** "Estimated monthly ad spend: ₹{estimated_monthly_ad_spend_dm}} (±10% variance acceptable)"

#### 5.1.4 Daily Budget Cap
- **Field Name:** `daily_budget_cap_dm`
- **Type:** Currency (INR)
- **Required:** NO
- **Placeholder:** "e.g., ₹2,000 per day max (prevents overspending)"

#### 5.1.5 Number of Campaigns to Run
- **Field Name:** `campaigns_count_dm`
- **Type:** Number
- **Placeholder:** "e.g., 1, 2, 4 (campaigns running simultaneously)"

#### 5.1.6 Dashboard Access Sharing
- **Field Name:** `dashboard_access_sharing_dm`
- **Type:** Single Select
- **Required:** YES (if ads)
- **Options:**
  - `full_admin_access` — Full admin access (client can see everything)
  - `read_only_access` — Read-only dashboard access (client sees data, cannot change)
  - `monthly_report_only` — Monthly report only (no dashboard access)
  - `real_time_spreadsheet` — Real-time Google Sheet updates (daily spend, clicks, conversions)
- **Contract Clause:** "Dashboard access: {dashboard_access_sharing_dm}"

#### 5.1.7 Reporting Frequency
- **Field Name:** `ads_reporting_frequency_dm`
- **Type:** Single Select
- **Required:** YES (if ads)
- **Options:**
  - `daily_reporting` — Daily report
  - `weekly_reporting` — Weekly report
  - `bi_weekly_reporting` — Bi-weekly report
  - `monthly_reporting` — Monthly report
- **Report Content (Auto-included):**
  - Total ad spend
  - Impressions, clicks, conversions
  - Cost per click (CPC)
  - Cost per conversion (CPA)
  - Return on Ad Spend (ROAS)
  - Campaign performance comparison
  - Insights & next steps
  - Screenshots from ad manager

#### 5.1.8 Number of Ad Creatives
- **Field Name:** `ad_creatives_count_dm`
- **Type:** Number
- **Placeholder:** "e.g., 3, 5, 10 (different ad designs to test)"
- **Contract Clause:** "Number of ad creatives: **{ad_creatives_count_dm}} creatives per campaign**"

#### 5.1.9 Landing Page Included?
- **Field Name:** `landing_page_included_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-fields (if Yes):**
  - `landing_page_count_dm` (Number, e.g., "1", "3")
  - `landing_page_details_dm` (Textarea, e.g., "Single lead capture page with form")

#### 5.1.10 Conversion Tracking Setup
- **Field Name:** `conversion_tracking_setup_dm`
- **Type:** Yes/No
- **Required:** YES (if ads)
- **Default:** Yes
- **Sub-fields (if Yes):**
  - `pixel_setup_included_dm` (Yes/No, default: Yes) — Facebook Pixel / Google Analytics 4
  - `event_tracking_dm` (Multi-Select: Page views / Form submissions / Add to cart / Purchases / Custom events)

#### 5.1.11 A/B Testing
- **Field Name:** `ab_testing_included_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `ab_testing_frequency_dm` (Single Select: Weekly / Bi-weekly / Monthly / As needed)

**Auto-Generated Critical Clause - Ad Performance Disclaimer:**
```
AD PERFORMANCE & RESULTS DISCLAIMER:

Platform does NOT guarantee:
✗ Sales or leads from ad spend
✗ Specific Return on Ad Spend (ROAS)
✗ Click-through rates (CTR)
✗ Conversion rates
✗ Minimum impressions or reach

Factors beyond Service Provider's control:
- Facebook/Google algorithm changes
- Ad account restrictions or bans
- Audience fatigue
- Market competition
- Client's product quality
- Client's landing page performance

Service Provider commits to:
✓ Proper campaign setup & optimization
✓ Regular bid & budget adjustments
✓ Testing & iteration based on data
✓ Transparent reporting of all metrics
✓ Following platform guidelines

Refunds are based on SERVICE DELIVERY (campaigns created & managed), 
NOT RESULTS ACHIEVED (sales generated).
```

---

## 🔷 SECTION 6: SCOPE OF WORK - CONTENT CREATION
**Conditional: Only if service includes "content_creation"**

### 6.1 Content Specifications
- **Block Name:** `content_creation_specs_block`
- **Type:** Object
- **Conditional:** If content creation service selected

#### 6.1.1 Content Type
- **Field Name:** `content_type_dm`
- **Type:** Single Select
- **Required:** YES (if content creation)
- **Options:**
  - `video_content` — Video Content (YouTube-style videos)
  - `reel_content` — Reel/Short-form Video (15-60 seconds)
  - `static_design` — Static Design (graphics, infographics, posters)
  - `animation_content` — Animation (explainer videos, motion graphics)
  - `podcast_content` — Podcast Content (audio + editing)
  - `mixed_content` — Mixed (combination of above)

#### 6.1.2 Script Writing Included?
- **Field Name:** `script_writing_included_dm`
- **Type:** Yes/No
- **Default:** No

#### 6.1.3 Voiceover Included?
- **Field Name:** `voiceover_included_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `voiceover_language_dm` (Single Select: English / Hindi / Regional language)

#### 6.1.4 Model/Talent Required?
- **Field Name:** `model_talent_required_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `talent_source_dm` (Single Select: Client provides / Service provider arranges (extra cost) / Stock footage used)

#### 6.1.5 Number of Videos/Content Pieces
- **Field Name:** `content_pieces_count_dm`
- **Type:** Number
- **Required:** YES (if content creation)
- **Placeholder:** "e.g., 4, 8, 12 (per month)"
- **Contract Clause:** "Content pieces to be created: exactly **{content_pieces_count_dm}} per {timeframe}}**"

#### 6.1.6 Length of Each Video
- **Field Name:** `video_length_dm`
- **Type:** Text
- **Placeholder:** "e.g., '30 seconds', '2 minutes', '5-10 minutes'"

#### 6.1.7 Raw Footage Provided?
- **Field Name:** `raw_footage_included_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `raw_footage_format_dm` (Text, e.g., "Unedited MP4 files, before color grading")

#### 6.1.8 Editing Rounds
- **Field Name:** `editing_rounds_dm`
- **Type:** Number
- **Default:** 2
- **Placeholder:** "Number of revision rounds per content piece"

#### 6.1.9 File Formats Delivered
- **Field Name:** `file_formats_delivered_dm`
- **Type:** Multi-Select
- **Required:** YES (if content creation)
- **Options:**
  - ✓ MP4 (web standard)
  - ✓ MOV (Apple format)
  - ✓ AVI (backup format)
  - ✓ WebM (streaming)
  - ✓ JPG/PNG (static)
  - ✓ PSD (Photoshop source)
  - ✓ AI (Illustrator source)
  - ✓ Other (specify)

#### 6.1.10 Source Files Included?
- **Field Name:** `source_files_included_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `source_file_types_dm` (Multi-Select: PSD / AI / AE / Figma / Original video files)
- **Sub-field (if No):** `source_files_exclusion_reason_dm` (Textarea, e.g., "Source files retained as intellectual property")

---

## 🔷 SECTION 7: SCOPE OF WORK - INFLUENCER MARKETING
**Conditional: Only if service is "influencer_marketing"**

### 7.1 Influencer Campaign Details
- **Block Name:** `influencer_campaign_block`
- **Type:** Object
- **Conditional:** If influencer marketing service selected

#### 7.1.1 Number of Influencers
- **Field Name:** `influencer_count_dm`
- **Type:** Number
- **Required:** YES (if influencer marketing)
- **Placeholder:** "e.g., 3, 5, 10"
- **Contract Clause:** "Number of influencers to partner with: exactly **{influencer_count_dm}} influencers**"

#### 7.1.2 Influencer Tier
- **Field Name:** `influencer_tier_dm`
- **Type:** Single Select
- **Required:** YES (if influencer marketing)
- **Options:**
  - `nano_influencer` — Nano (1k-10k followers)
  - `micro_influencer` — Micro (10k-100k followers)
  - `macro_influencer` — Macro (100k-1M followers)
  - `mega_influencer` — Mega (1M+ followers)
  - `celebrity` — Celebrity
  - `mixed_tiers` — Mixed tiers
- **Contract Clause:** "Influencer tier: {influencer_tier_dm}"

#### 7.1.3 Deliverables Per Influencer
- **Field Name:** `deliverables_per_influencer_dm`
- **Type:** Multi-Select
- **Required:** YES (if influencer marketing)
- **Options:**
  - ✓ Static post (with caption mentioning brand)
  - ✓ Reel/video content
  - ✓ Stories (temporary 24-hour content)
  - ✓ Live session (Instagram/Facebook Live)
  - ✓ Unboxing/review video
  - ✓ Testimonial video
  - ✓ Blog post (guest article)
  - ✓ Custom content (specify)

#### 7.1.4 Tracking Method
- **Field Name:** `influencer_tracking_method_dm`
- **Type:** Single Select
- **Options:**
  - `unique_promo_code` — Unique promo code per influencer
  - `affiliate_link` — Affiliate/tracking links
  - `utm_parameters` — UTM parameters in links
  - `discount_code` — Discount code tracking
  - `engagement_tracking` — Engagement tracking (likes, comments)
  - `no_tracking` — No tracking (brand awareness only)

#### 7.1.5 Influencer Contract Provided?
- **Field Name:** `influencer_contract_provided_dm`
- **Type:** Yes/No
- **Required:** YES (if influencer marketing)
- **Sub-field (if Yes):** `contract_details_dm` (Textarea, e.g., "Service provider handles all influencer contracts & negotiations")
- **Sub-field (if No):** `client_to_contact_influencers_dm` (Yes/No, default: No)

**Auto-Generated Clause:**
```
INFLUENCER DELIVERABLE COMPLIANCE:

Service Provider shall ensure each influencer delivers agreed content within timeline.
If influencer fails to deliver or violates brand guidelines, Service Provider shall:
1. Contact influencer for correction/replacement
2. If not resolved within 7 days, escalate to platform
3. Provide substitute influencer if needed

Service Provider is NOT liable for influencer's conduct, opinions, 
or content that violates platform guidelines post-delivery.
```

---

## 🔷 SECTION 8: TIMELINE & MILESTONES

### 8.1 Project Timeline
- **Block Name:** `timeline_block_dm`
- **Type:** Object

#### 8.1.1 Project Start Date
- **Field Name:** `project_start_date_dm`
- **Type:** Date Picker
- **Required:** YES
- **Contract Clause:** "Project start date: **{project_start_date_dm}}**"

#### 8.1.2 Project End Date
- **Field Name:** `project_end_date_dm`
- **Type:** Date Picker
- **Required:** YES
- **Placeholder:** "Last day of contract (e.g., 3 months from start)"
- **Contract Clause:** "Project end date: **{project_end_date_dm}}**"

#### 8.1.3 Draft Approval Timeline
- **Field Name:** `draft_approval_time_dm`
- **Type:** Single Select
- **Default:** "48_hours"
- **Options:**
  - `24_hours` — 24 hours
  - `48_hours` — 48 hours
  - `72_hours` — 72 hours
  - `5_business_days` — 5 business days
  - `custom_approval_time` — Custom (specify)
- **Custom Field:** `custom_approval_time_days_dm` (Number, if custom)

**Auto-Generated Clause:**
```
APPROVAL TIMELINE:

Client shall review drafts/creatives within {draft_approval_time_dm}.
If no response within this timeframe, draft is deemed APPROVED and 
work shall proceed. Failure to approve delays project timeline, 
and deadlines shall be extended by delay duration without penalty.
```

#### 8.1.4 Content Delivery Schedule
- **Field Name:** `content_delivery_schedule_dm`
- **Type:** Textarea
- **Placeholder:** "e.g., 'Week 1: Strategy kickoff & brand assets collection. Week 2: First batch of 4 posts. Week 3: SEO audit report. etc.'"

#### 8.1.5 Milestone Dates (If Multiple Phases)
- **Field Name:** `milestone_dates_dm`
- **Type:** Textarea
- **Placeholder:** "e.g., 'Month 1: Setup & strategy. Month 2: Campaign launch. Month 3: Optimization & reporting'"

---

## 🔷 SECTION 9: ACCESS, CREDENTIALS & BRAND ASSETS

### 9.1 Account Access Required
- **Field Name:** `account_access_required_dm`
- **Type:** Yes/No
- **Required:** YES
- **Default:** Yes

**If YES:**

#### 9.1.1 Required Permission Levels
- **Field Name:** `required_permissions_dm`
- **Type:** Multi-Select
- **Options:**
  - ✓ Editor (can edit, but not manage admin)
  - ✓ Admin (full account access)
  - ✓ Advertiser (manage ads only, not personal settings)
  - ✓ Analytics Read-only (view data only)
  - ✓ Custom limited access

#### 9.1.2 Access Details
- **Field Name:** `access_credentials_method_dm`
- **Type:** Single Select
- **Options:**
  - `direct_login` — Direct login credentials provided
  - `business_suite_invite` — Invited via Facebook Business Suite
  - `google_account_delegation` — Delegated via Google account
  - `platform_api_integration` — Platform API integration
  - `screenshots_reports_only` — Access not granted (reports only)

#### 9.1.3 Service Provider Can Add Own Pixels/Tracking?
- **Field Name:** `service_provider_pixels_allowed_dm`
- **Type:** Yes/No
- **Required:** YES (if ads service)
- **Default:** Yes
- **Sub-field (if Yes):** `pixel_types_allowed_dm` (Multi-Select: Facebook Pixel / Google Analytics 4 / Conversion pixels / Custom events)

### 9.2 Brand Assets & Previous Data
- **Block Name:** `brand_assets_block`
- **Type:** Object

#### 9.2.1 Brand Assets Required
- **Field Name:** `brand_assets_needed_dm`
- **Type:** Multi-Select
- **Options:**
  - ☐ Logo files (PNG, SVG, JPEG)
  - ☐ Brand guide (colors, fonts, tone guidelines)
  - ☐ Previous creatives/designs
  - ☐ Product catalog or images
  - ☐ Website content or existing copy
  - ☐ Competitor analysis data
  - ☐ Audience insights or demographics
  - ☐ Social media handles

#### 9.2.2 Previous Performance Data Required?
- **Field Name:** `previous_performance_data_needed_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `data_to_provide_dm` (Textarea, e.g., "Google Analytics reports, Facebook Insights export, previous ad performance data")

#### 9.2.3 Asset Upload Link
- **Field Name:** `brand_assets_upload_link_dm`
- **Type:** URL or File Upload
- **Placeholder:** "Link to Google Drive/Dropbox folder with all brand assets"

---

## 🔷 SECTION 10: REVISIONS, APPROVALS & CHANGE MANAGEMENT

### 10.1 Revisions Policy
- **Field Name:** `revisions_policy_dm`
- **Type:** Object

#### 10.1.1 Number of Revision Rounds Per Creative
- **Field Name:** `revisions_per_creative_rounds_dm`
- **Type:** Number
- **Default:** 2
- **Placeholder:** "e.g., 1, 2, 3 (rounds of feedback)"

#### 10.1.2 What Counts as a Revision
- **Field Name:** `revision_definition_dm`
- **Type:** Textarea
- **Default:**
  ```
  A revision is:
  ✓ Text/copy changes
  ✓ Color adjustments
  ✓ Layout modifications
  ✓ Filter/effect changes
  
  Not counted as revision:
  ✗ Complete redesign (charged separately)
  ✗ Adding new elements/pages (scope change)
  ✗ Format change (e.g., video to static)
  ```

#### 10.1.3 What Counts as New Creative (Separate Charge)
- **Field Name:** `new_creative_definition_dm`
- **Type:** Textarea
- **Default:**
  ```
  A new creative (chargeable separately) is:
  ✗ Completely different design/layout
  ✗ Change in content type (video → static)
  ✗ Additional topics/deliverables beyond scope
  ✗ Concepts beyond original brief
  
  Pricing for new creative: ₹___ per creative
  ```
- **New Creative Price Field:** `new_creative_additional_charge_dm` (Currency)

### 10.2 Change Request Process
- **Field Name:** `change_request_process_dm`
- **Type:** Textarea
- **Default:**
  ```
  CHANGE REQUEST PROCESS:
  
  1. Client submits change request with details
  2. Service provider reviews scope impact
  3. If within scope: Implemented in next round
  4. If outside scope: Quoted as additional work
  5. Client approves price & timeline before proceeding
  ```

---

## 🔷 SECTION 11: RESTRICTIONS, EXCLUSIONS & LEGAL COMPLIANCE

### 11.1 What is NOT Included (Critical Legal Field)
- **Field Name:** `exclusions_not_included_dm`
- **Type:** Multi-Select Checkboxes
- **Required:** YES
- **Default:** Pre-checked items below
- **Pre-checked Options:**
  - ✓ Website development/design (separate service)
  - ✓ Sales closing/customer support (your responsibility)
  - ✓ Guaranteed follower count
  - ✓ Guaranteed search rankings
  - ✓ Guaranteed ROAS or sales
  - ✓ Viral content guarantee
  - ✓ Customer relationship management (CRM setup)
  - ✓ Influencer payment (client pays influencers)
  - ✓ Third-party tool subscriptions (Hootsuite, Later, etc.)
  - ✓ Custom software development
  - ✓ Platform algorithm changes (not controllable)
  - ✓ Server/hosting issues (not provider's responsibility)
  - ✓ Other (specify): _____

**Auto-Generated Clause:**
```
EXCLUSIONS & DISCLAIMERS:

The following are EXPLICITLY NOT included in this agreement:

{for each selected exclusion}
✗ {exclusion}
{/for}

Service Provider is NOT responsible for third-party platform 
decisions, algorithm changes, or factors beyond their control.
```

### 11.2 Industry Compliance & Ad Policies
- **Block Name:** `compliance_block_dm`
- **Type:** Object

#### 11.2.1 Industry Type (For Ad Policy Compliance)
- **Field Name:** `compliance_industry_type_dm`
- **Type:** Single Select
- **Options:** [Same as 1.4.2 above]

#### 11.2.2 Prohibited Ad Categories
- **Field Name:** `prohibited_content_declaration_dm`
- **Type:** Multi-Select Checkboxes (AUTO-POPULATED based on industry)
- **Options (examples):**
  - ☐ No gambling ads (unless licensed)
  - ☐ No health claims (unless verified)
  - ☐ No cryptocurrency/MLM ads
  - ☐ No misleading claims
  - ☐ No get-rich-quick schemes
  - ☐ No fake testimonials
  - ☐ No violating data privacy laws
  - ☐ Other compliance requirements

#### 11.2.3 Client Declaration (Mandatory Checkbox)
- **Field Name:** `compliance_client_declaration_dm`
- **Type:** Checkbox (Required)
- **Statement:** "I declare that all content provided is original, I have rights to use it, and it complies with Meta/Google ad policies. I assume responsibility for any policy violations."

#### 11.2.4 Ads Policy Violation Clause
- **Field Name:** `ads_violation_clause_dm`
- **Type:** Checkbox (Required)
- **Auto-Populated Statement:**
  ```
  If ads are rejected or account is disabled due to policy violations:
  ✓ Service Provider shall immediately notify client
  ✓ Service Provider shall attempt to get account reinstated
  ✓ If reinstatable: No charge; client changes content to comply
  ✓ If not reinstatable: Service Provider refunds ad spend + service fee
  ✓ Service Provider is NOT liable for unforeseeable platform bans
  ```

---

## 🔷 SECTION 12: REPORTING & TRANSPARENCY REQUIREMENTS

### 12.1 Reporting Schedule
- **Field Name:** `reporting_schedule_dm`
- **Type:** Single Select
- **Default:** "monthly_reporting"
- **Options:**
  - `daily_reporting` — Daily reporting
  - `weekly_reporting` — Weekly reporting
  - `bi_weekly_reporting` — Bi-weekly reporting
  - `monthly_reporting` — Monthly reporting
- **Contract Clause:** "Reports frequency: **{reporting_schedule_dm}}**"

### 12.2 Report Format
- **Field Name:** `report_format_dm`
- **Type:** Single Select
- **Default:** "pdf_report"
- **Options:**
  - `pdf_report` — PDF report (downloadable)
  - `google_sheet` — Google Sheet (shared document)
  - `powerpoint_presentation` — PowerPoint presentation
  - `loom_video` — Loom video walkthrough
  - `spreadsheet_plus_video` — Spreadsheet + video explanation

### 12.3 Report Content (Auto-Included)
- **Field Name:** `report_content_included_dm`
- **Type:** Multi-Select Checkboxes
- **Default:** All checked
- **Options:**
  - ✓ Key metrics (views, clicks, conversions, engagement)
  - ✓ Performance vs. previous period (comparison)
  - ✓ Campaign insights & analysis
  - ✓ Next steps & recommendations
  - ✓ Screenshots from platforms (proof of work)
  - ✓ Ad spend breakdown (if ads service)
  - ✓ Content calendar updates
  - ✓ Audience demographics & insights (if available)

### 12.4 Dashboard/Real-time Access
- **Field Name:** `realtime_dashboard_access_dm`
- **Type:** Yes/No
- **Default:** No
- **Sub-field (if Yes):** `dashboard_type_dm` (Single Select: Google Sheet / ClickUp / Monday.com / Whatagraph / Other)

---

## 🔷 SECTION 13: COMMERCIAL TERMS

### 13.1 Total Service Fee
- **Field Name:** `total_service_fee_dm`
- **Type:** Currency (INR)
- **Required:** YES
- **Placeholder:** "₹_____ (monthly/project)"
- **Contract Clause:** "Total service fee: **₹{total_service_fee_dm}}**"

### 13.2 Service Fee Timeframe
- **Field Name:** `service_fee_timeframe_dm`
- **Type:** Single Select
- **Options:**
  - `monthly_fee` — Monthly fee (recurring)
  - `quarterly_fee` — Quarterly fee (every 3 months)
  - `project_fee` — Project-based (one-time)
  - `hourly_rate` — Hourly rate (₹___ per hour)

### 13.3 Ad Spend (If Separate)
- **Field Name:** `ad_spend_separate_dm`
- **Type:** Yes/No
- **Default:** Yes (if ads service)
- **Sub-field (if Yes):** `ad_spend_note_dm` (Textarea, e.g., "Ad spend: ₹X,XXX-₹YY,YYY per month (separate from service fee)")

### 13.4 Management Fee (If Applicable)
- **Field Name:** `management_fee_percentage_dm`
- **Type:** Number (percentage)
- **Placeholder:** "e.g., 10%, 15%, 20% (if service provider manages client's ad budget)"
- **Sub-field:** `management_fee_cap_dm` (Currency, e.g., "Capped at ₹10,000/month")

### 13.5 GST Applicable?
- **Field Name:** `gst_applicable_dm`
- **Type:** Yes/No
- **Default:** Yes
- **Sub-field (if Yes):** `gst_rate_dm` (Single Select: 5% / 12% / 18%)
- **Sub-field (if Yes):** `gst_included_or_additional_dm` (Single Select: Included in price / Additional 18%)

### 13.6 Payment Schedule
- **Field Name:** `payment_schedule_dm`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_upfront` — 100% Upfront (before work starts)
  - `50_50_split` — 50% upfront, 50% after 30 days
  - `monthly_on_date` — Monthly on [date] (e.g., 5th of each month)
  - `on_completion_only` — Full payment on project completion
  - `custom_schedule` — Custom (specify)
- **Details:** `payment_schedule_details_dm` (Textarea, if custom)

### 13.7 Payment Methods
- **Field Name:** `payment_methods_dm`
- **Type:** Multi-Select
- **Options:**
  - ✓ Bank transfer/NEFT
  - ✓ UPI (Google Pay, PhonePe, PayTM)
  - ✓ Card payment
  - ✓ Cheque
  - ✓ Invoice via accounting software

### 13.8 Inspection Window
- **Field Name:** `inspection_window_dm`
- **Type:** Single Select
- **Default:** "7_days"
- **Options:**
  - `immediate` — Immediate (day of delivery)
  - `3_days` — 3 days
  - `7_days` — 7 days
  - `14_days` — 14 days
  - `30_days` — 30 days
- **Contract Clause:** "Client shall inspect & report issues within **{inspection_window_dm}}**"

### 13.9 Refund Policy
- **Field Name:** `refund_policy_dm`
- **Type:** Single Select
- **Options:**
  - `no_refund_after_start` — No refund once work starts (unless service provider breach)
  - `partial_refund_poor_quality` — Partial refund (50%) if quality falls short of contract
  - `full_refund_non_delivery` — Full refund only if deliverables not completed
  - `pro_rata_early_termination` — Pro-rata refund if terminated early
  - `custom_refund_policy` — Custom (specify)
- **Details:** `refund_policy_details_dm` (Textarea, if custom)

### 13.10 Jurisdiction & Dispute Resolution
- **Field Name:** `jurisdiction_city_dm`
- **Type:** Single Select + Autocomplete
- **Required:** YES
- **Default:** "Mumbai"
- **Contract Clause:** "This agreement governed by laws of **{jurisdiction_city_dm}}, India**"

---

**END OF PART A: CONTRACT CREATION FIELDS**

**Status:** ✅ Complete (72 fields)

**Next Steps:** Add PART B (Delivery Evidence), PART C (Dispute Evidence), PART D (Database Schema), PART E (Sample Clauses)

---

# 📸 PART B: DELIVERY EVIDENCE FIELDS
**Submitted after work completion OR when dispute arises**  
**Service provider must upload proof of work delivered**

---

## 🔸 B.1 SOCIAL MEDIA MANAGEMENT DELIVERY EVIDENCE
**If service includes social media management**

### B.1.1 Creatives Delivered
- **Field Name:** `social_media_creatives_delivered`
- **Type:** File Upload (Images/Videos)
- **Required:** YES
- **Placeholder:** "Upload all social media creatives (posts, reels, stories)"
- **Mandatory Count:** Must match {posts_per_month_dm} + {reels_per_month_dm} from contract
- **Proof of Delivery:** Files with timestamps

### B.1.2 Posted Content Proof Screenshots
- **Field Name:** `posted_content_screenshots`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Placeholder:** "Screenshots showing each post live on social media account"
- **What to include:** Post URL, date posted, platform, like/comment counts visible

### B.1.3 Content Calendar Screenshot
- **Field Name:** `content_calendar_screenshot`
- **Type:** File Upload (Screenshot)
- **Required:** YES (if calendar agreed in contract)
- **Placeholder:** "Screenshot of scheduled content calendar showing posts queued"

### B.1.4 Account Growth Screenshot
- **Field Name:** `account_growth_screenshot`
- **Type:** File Upload (Screenshot)
- **Required:** YES
- **Placeholder:** "Screenshot of follower count at start vs. end of period"
- **Proof of work:** Shows organic growth from posted content

### B.1.5 Engagement Metrics Screenshot
- **Field Name:** `engagement_metrics_screenshot`
- **Type:** File Upload (Screenshot)
- **Required:** NO (recommended)
- **Placeholder:** "Screenshots showing likes, comments, shares on posts"

### B.1.6 Community Management Proof
- **Field Name:** `community_management_proof`
- **Type:** File Upload (Screenshots)
- **Required:** Conditional (if community management agreed)
- **Placeholder:** "Screenshots showing responses to DMs/comments with timestamps"

---

## 🔸 B.2 SEO DELIVERY EVIDENCE
**If service includes SEO**

### B.2.1 Keyword Research Report
- **Field Name:** `keyword_research_report_seo`
- **Type:** File Upload (PDF/Sheet)
- **Required:** YES (if SEO)
- **Content:** List of {keywords_research_count_dm} keywords with search volume, competition, difficulty

### B.2.2 On-Page Optimization Report
- **Field Name:** `on_page_optimization_report`
- **Type:** File Upload (PDF/Sheet)
- **Required:** YES (if on-page SEO included)
- **Content per page:**
  - Page URL
  - Meta title (optimized)
  - Meta description (optimized)
  - H1, H2, H3 tags
  - Keyword placement
  - Internal links added
  - Image alt tags

### B.2.3 Technical SEO Audit Report
- **Field Name:** `technical_seo_audit_report`
- **Type:** File Upload (PDF)
- **Required:** Conditional (if technical SEO audit included)
- **Content:**
  - Site speed scores (before/after)
  - Mobile responsiveness test
  - Crawl errors identified
  - XML sitemap verification
  - Robots.txt audit
  - SSL/HTTPS verification

### B.2.4 Backlink Report with URLs
- **Field Name:** `backlink_report_urls_seo`
- **Type:** File Upload (PDF/Sheet)
- **Required:** YES (if backlinks agreed)
- **Content:** List of {backlinks_target_count_dm} backlinks with:
  - Website URL linking back
  - Anchor text used
  - Link type (dofollow/nofollow)
  - Date acquired
  - Domain authority of linking site

### B.2.5 Current Ranking Screenshot
- **Field Name:** `current_ranking_screenshot_seo`
- **Type:** File Upload (Screenshots)
- **Required:** YES (if ranking improvement promised)
- **Content:** Screenshots from Google Search or SEO tool (SEMrush, Ahrefs, MOZ) showing keyword rankings

### B.2.6 Page Speed Results
- **Field Name:** `page_speed_results_seo`
- **Type:** File Upload (Screenshots)
- **Required:** Conditional (if page speed optimization included)
- **Content:** Google PageSpeed Insights screenshots showing mobile & desktop scores

### B.2.7 Content Writing Deliverables (If Included)
- **Field Name:** `content_writing_deliverables_seo`
- **Type:** File Upload (Word/PDF)
- **Required:** Conditional (if content writing included)
- **Content:** All written content with keyword placement highlighted

---

## 🔸 B.3 PAID ADS DELIVERY EVIDENCE
**If service includes performance marketing/PPC/Facebook Ads/Google Ads**

### B.3.1 Campaign Setup Screenshots
- **Field Name:** `campaign_setup_screenshots_ads`
- **Type:** File Upload (Screenshots)
- **Required:** YES (if ads service)
- **Content:** Screenshots showing:
  - Campaign created & active
  - Audience targeting set
  - Budget configured
  - Ad creatives uploaded
  - Tracking pixels installed

### B.3.2 Ad Manager Dashboard Export
- **Field Name:** `ad_manager_dashboard_export`
- **Type:** File Upload (Screenshot/PDF)
- **Required:** YES (if ads service)
- **Content:** Full dashboard screenshot showing all campaigns, spend, performance

### B.3.3 Daily Spend Evidence
- **Field Name:** `daily_spend_evidence_ads`
- **Type:** File Upload (Screenshot/CSV)
- **Required:** YES (if ads service)
- **Content:** Daily spend breakdown matching total from contract
- **Verification:** Must show spend ≈ {estimated_monthly_ad_spend_dm}

### B.3.4 Conversion Tracking Setup Proof
- **Field Name:** `conversion_tracking_setup_proof`
- **Type:** File Upload (Screenshots)
- **Required:** YES (if conversion tracking agreed)
- **Content:** Screenshots showing:
  - Facebook Pixel installed on website
  - Google Analytics 4 connected
  - Events tracking configured (page views, form submissions, purchases)

### B.3.5 Pixel Event Firing Proof
- **Field Name:** `pixel_event_firing_proof`
- **Type:** File Upload (Screenshots)
- **Required:** NO (recommended)
- **Content:** Screenshots from Facebook Events Manager showing pixel events firing (Page View, Lead, Purchase, etc.)

### B.3.6 Monthly Performance Report
- **Field Name:** `monthly_performance_report_ads`
- **Type:** File Upload (PDF/Sheet)
- **Required:** YES (if ads service)
- **Content per campaign:**
  - Campaign name & dates
  - Total spend
  - Impressions
  - Clicks
  - Cost per click (CPC)
  - Conversions
  - Cost per conversion (CPA)
  - Return on Ad Spend (ROAS)
  - Screenshots of performance
  - Insights & observations

### B.3.7 Ad Creatives Delivered
- **Field Name:** `ad_creatives_delivered_ads`
- **Type:** File Upload (Images/Videos)
- **Required:** YES (if ads service)
- **Count:** Must match {ad_creatives_count_dm} from contract
- **Content:** All ad creative files in formats specified

### B.3.8 A/B Test Results (If Testing Agreed)
- **Field Name:** `ab_test_results_ads`
- **Type:** File Upload (Screenshots/Report)
- **Required:** Conditional (if A/B testing included)
- **Content:** Screenshots showing variant performance comparison

### B.3.9 Landing Page Screenshots (If Included)
- **Field Name:** `landing_page_screenshots_ads`
- **Type:** File Upload (Screenshots)
- **Required:** Conditional (if landing pages created)
- **Content:** Screenshots of live landing pages with URLs

### B.3.10 Ads Account Access Proof
- **Field Name:** `ads_account_access_proof`
- **Type:** File Upload (Screenshots)
- **Required:** Conditional (if client dashboard access provided)
- **Content:** Screenshots showing client can access ad account & data

---

## 🔸 B.4 CONTENT CREATION DELIVERY EVIDENCE
**If service includes content creation (videos, reels, designs)**

### B.4.1 Final Content Files
- **Field Name:** `final_content_files_delivered`
- **Type:** File Upload (Videos/Images)
- **Required:** YES (if content creation)
- **Count:** Must match {content_pieces_count_dm} from contract
- **Formats:** In agreed formats (MP4, MOV, JPG, PNG, PSD, AI)

### B.4.2 Raw Footage (If Agreed)
- **Field Name:** `raw_footage_delivered`
- **Type:** File Upload (Videos)
- **Required:** Conditional (if raw footage promised)
- **Content:** Unedited footage before color grading/effects

### B.4.3 Script Document
- **Field Name:** `script_document_delivered`
- **Type:** File Upload (Word/PDF)
- **Required:** Conditional (if script writing included)
- **Content:** Full written script used for content

### B.4.4 Voiceover Files (If Included)
- **Field Name:** `voiceover_files_delivered`
- **Type:** File Upload (MP3/WAV)
- **Required:** Conditional (if voiceover included)
- **Content:** Professional voiceover recordings

### B.4.5 Source Files (If Included)
- **Field Name:** `source_files_delivered`
- **Type:** File Upload (PSD/AI/AE)
- **Required:** Conditional (if source files promised)
- **Content:** Editable project files in agreed formats

### B.4.6 Content Delivery Schedule Proof
- **Field Name:** `content_delivery_schedule_proof`
- **Type:** File Upload (Screenshot)
- **Required:** YES (if content creation)
- **Content:** Proof of content delivered on agreed dates (file timestamps, delivery receipts)

---

## 🔸 B.5 INFLUENCER MARKETING DELIVERY EVIDENCE
**If service includes influencer marketing**

### B.5.1 Influencer Posts Screenshots
- **Field Name:** `influencer_posts_screenshots`
- **Type:** File Upload (Screenshots)
- **Required:** YES (if influencer marketing)
- **Count:** One screenshot per agreed deliverable per influencer
- **Content:** Screenshots of live posts on influencer accounts

### B.5.2 Engagement Proof
- **Field Name:** `influencer_engagement_proof`
- **Type:** File Upload (Screenshots)
- **Required:** YES (if influencer marketing)
- **Content:** Screenshots showing likes, comments, shares on influencer posts
- **Proof:** Shows post reached audience & generated engagement

### B.5.3 Hashtag/Mention Verification
- **Field Name:** `hashtag_mention_verification`
- **Type:** File Upload (Screenshots)
- **Required:** YES (if influencer marketing)
- **Content:** Screenshots showing hashtags used, brand mentions in post caption

### B.5.4 Live Content Links
- **Field Name:** `influencer_content_links`
- **Type:** URL or Text
- **Required:** YES (if influencer marketing)
- **Content:** Direct links to all influencer posts/videos on their profiles

### B.5.5 Influencer Contracts/Agreements
- **Field Name:** `influencer_contracts_copies`
- **Type:** File Upload (PDF)
- **Required:** Conditional (if service provider manages influencers)
- **Content:** Copies of contracts with influencers showing deliverables agreed

### B.5.6 Promo Code Tracking (If Applicable)
- **Field Name:** `promo_code_tracking_results`
- **Type:** File Upload (Screenshot/Report)
- **Required:** Conditional (if promo code tracking used)
- **Content:** Tracking results showing traffic/sales from each influencer code

---

## 🔸 B.6 BRANDING STRATEGY DELIVERY EVIDENCE
**If service includes branding strategy**

### B.6.1 Brand Strategy Document
- **Field Name:** `brand_strategy_document`
- **Type:** File Upload (PDF/Word)
- **Required:** YES (if branding service)
- **Content:**
  - Brand positioning
  - Target audience definition
  - Brand messaging framework
  - Brand personality
  - Competitive analysis
  - Brand guidelines (colors, fonts, tone)

### B.6.2 Brand Guidelines Document
- **Field Name:** `brand_guidelines_document`
- **Type:** File Upload (PDF)
- **Required:** YES (if branding service)
- **Content:**
  - Logo usage rules
  - Color palette (HEX codes)
  - Typography (fonts, sizes)
  - Tone of voice guidelines
  - Do's and Don'ts
  - Applications examples

### B.6.3 Brand Assets Delivered
- **Field Name:** `brand_assets_files`
- **Type:** File Upload (All files)
- **Required:** YES (if branding service)
- **Content:**
  - Logo files (PNG, SVG, JPG)
  - Color palettes
  - Font files or specifications
  - Mood boards
  - Design templates

---

## 🔸 B.7 GENERAL DELIVERY EVIDENCE

### B.7.1 Completion Proof with Timestamp
- **Field Name:** `completion_proof_timestamp`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Screenshots showing work completion date/time (file properties or platform timestamps)

### B.7.2 Work Completion Certification
- **Field Name:** `work_completion_certification`
- **Type:** Checkbox
- **Required:** YES
- **Statement:** "I certify that all deliverables as per contract have been completed and uploaded. I am ready for client inspection and acceptance."

### B.7.3 Supporting Documentation
- **Field Name:** `supporting_documentation_delivery`
- **Type:** File Upload
- **Required:** NO
- **Placeholder:** "Any additional proof of work (emails, messages, collaboration links, etc.)"

---

**END OF PART B: DELIVERY EVIDENCE FIELDS**

**Status:** ✅ Complete (40+ fields across all service types)

---

# 🎯 PART C: DISPUTE EVIDENCE FIELDS

### C.1 When Raising a Dispute

#### C.1.1 Dispute Reason Category
- **Field Name:** `dispute_reason_category_dm`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `incomplete_deliverables` — Incomplete deliverables (tasks not completed)
  - `poor_quality_work` — Poor quality work (doesn't meet standards)
  - `missed_deadline` — Missed deadline (late delivery)
  - `no_results_achieved` — No results achieved (aspirational metrics not met)
  - `fake_metrics` — Fake/inflated metrics (false engagement, fake followers)
  - `ads_spend_misused` — Ad spend misused or not properly managed
  - `account_access_denied` — Account access not provided/restricted
  - `no_reports_shared` — No reports or data shared
  - `lack_communication` — Poor communication or unresponsive
  - `source_files_not_provided` — Source files not provided (despite agreement)
  - `policy_violation` — Content/ads violated platform policies
  - `charging_extra` — Unexpected extra charges imposed
  - `plagiarism_detected` — Plagiarism or copied content
  - `other_dispute` — Other issue (specify)
- **Custom Field:** `dispute_reason_other_dm` (Textarea, if "other_dispute")

#### C.1.2 Detailed Dispute Description
- **Field Name:** `dispute_description_dm`
- **Type:** Textarea (max 2000 chars)
- **Required:** YES
- **Placeholder:** "Clearly describe the issue with specific examples"

#### C.1.3 Dispute Severity
- **Field Name:** `dispute_severity_dm`
- **Type:** Single Select
- **Options:**
  - `critical_major` — Critical/Major (severe impact, major breach)
  - `significant` — Significant (noticeable issue, affects deliverable)
  - `minor` — Minor (small issue, mostly acceptable)

---

## 🔴 C.2 INCOMPLETE DELIVERABLES DISPUTE EVIDENCE

**If dispute reason: Incomplete deliverables**

### C.2.1 Deliverables Count Mismatch Proof
- **Field Name:** `deliverables_count_mismatch_proof`
- **Type:** Textarea + File Upload
- **Required:** YES
- **Content:** Specify:
  - Agreed count (from contract): X
  - Actually received: Y
  - Missing items: (list them)
  - Example:** "Contract: 12 posts/month. Received: 8 posts. Missing: 4 posts"

### C.2.2 Contract Screenshot
- **Field Name:** `contract_screenshot_deliverables_dm`
- **Type:** File Upload (Screenshot)
- **Required:** YES
- **Content:** Screenshot of contract showing agreed deliverable count

### C.2.3 Received Deliverables Documentation
- **Field Name:** `received_deliverables_list_dm`
- **Type:** File Upload (List/Screenshots)
- **Required:** YES
- **Content:** Evidence of what was actually delivered (file list, screenshots, delivery receipts)

---

## 🔴 C.3 POOR QUALITY DISPUTE EVIDENCE

**If dispute reason: Poor quality work**

### C.3.1 Quality Standards Not Met Proof
- **Field Name:** `quality_standards_mismatch_proof`
- **Type:** File Upload (Screenshots/Comparisons)
- **Required:** YES
- **Content:** Side-by-side comparison showing:
  - What was promised (from contract or samples)
  - What was delivered
  - Quality gaps (pixelated images, unfinished video, poor grammar, etc.)

### C.3.2 Professional Standards Reference
- **Field Name:** `professional_standards_reference_dm`
- **Type:** File Upload (Industry examples/benchmarks)
- **Required:** NO (recommended)
- **Content:** Industry standard examples showing what professional quality looks like

### C.3.3 Expert Assessment (Optional)
- **Field Name:** `expert_quality_assessment_dm`
- **Type:** File Upload (Report)
- **Required:** NO
- **Content:** Third-party professional assessment of quality issues

---

## 🔴 C.4 NO RESULTS / ASPIRATIONAL METRICS NOT MET DISPUTE EVIDENCE

**If dispute reason: No results achieved**

### C.4.1 Aspirational Metrics Claim
- **Field Name:** `aspirational_metrics_claim_dm`
- **Type:** Textarea
- **Required:** YES
- **Important:** Remind user: These are NOT guaranteed outcomes
- **Content:** State: "I expected X result but got Y"
- **Example:** "Expected 100 leads/month but got 5 leads"

### C.4.2 Service Provider's Effort Evidence
- **Field Name:** `effort_based_deliverables_proof_dm`
- **Type:** File Upload (Reports/Screenshots)
- **Required:** YES
- **Content:** Service provider demonstrates EFFORT was made:
  - For SEO: Keywords researched, pages optimized, backlinks created (proof of effort, not rankings)
  - For Ads: Campaigns created, budget spent, optimization done (proof of campaigns ran)
  - For Social Media: Posts created, content calendar, engagement activities (proof of content)

### C.4.3 Platform/External Factors Documentation
- **Field Name:** `external_factors_documentation_dm`
- **Type:** Textarea + Files
- **Required:** NO
- **Content:** Document external factors that affected results:
  - "Algorithm changes on Instagram reduced organic reach"
  - "Competitor increased ad spend during same period"
  - "Market conditions (seasonality, economic factors)"
  - "Client's product quality issues affecting conversions"

### C.4.4 Before/After Metrics Comparison
- **Field Name:** `before_after_metrics_comparison_dm`
- **Type:** File Upload (Sheet/Screenshot)
- **Required:** YES
- **Content:** Side-by-side comparison:
  - Metric name
  - Before value (start of campaign)
  - After value (end of campaign)
  - Example: "Traffic: 1,000 → 2,500 (150% increase)"

**Important Note:** ⚠️ If agreement explicitly said "results NOT guaranteed" (aspirational metrics), dispute likely invalid unless EFFORT-BASED deliverables not met.

---

## 🔴 C.5 FAKE/INFLATED METRICS DISPUTE EVIDENCE

**If dispute reason: Fake metrics or false engagement**

### C.5.1 Metrics Audit Report
- **Field Name:** `metrics_audit_report_dm`
- **Type:** File Upload (Report/Screenshots)
- **Required:** YES
- **Content:** Third-party audit using tools like:
  - Social Blade (for fake followers)
  - HypeAuditor (for Instagram fake engagement)
  - Botometer (for bot engagement)

### C.5.2 Engagement Pattern Anomalies
- **Field Name:** `engagement_anomalies_proof_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Evidence showing unnatural engagement:
  - Sudden follower spike with no content
  - Engagement rate doesn't match follower count
  - Comments from suspicious bot accounts
  - All engagement from same geographic region (unlikely)

### C.5.3 Fake Follower Analysis
- **Field Name:** `fake_followers_analysis_dm`
- **Type:** File Upload (Report)
- **Required:** YES
- **Content:** Report from Social Blade or similar showing:
  - % of fake followers
  - Bot accounts
  - Real vs. bot engagement split

### C.5.4 Influencer Authenticity Check (If Influencer Marketing)
- **Field Name:** `influencer_authenticity_check_dm`
- **Type:** File Upload (Report)
- **Required:** Conditional (if influencer dispute)
- **Content:** HypeAuditor/Infludb report showing influencer's real vs. fake followers

---

## 🔴 C.6 AD SPEND MISUSED DISPUTE EVIDENCE

**If dispute reason: Ad spend misused**

### C.6.1 Ad Spend Discrepancy
- **Field Name:** `ad_spend_discrepancy_proof_dm`
- **Type:** File Upload (Billing/Dashboard Screenshots)
- **Required:** YES
- **Content:** Proof showing:
  - Amount claimed to be spent: ₹X
  - Actual spend per platform: ₹Y
  - Mismatch: ₹(X-Y)
  - Example: "Claimed ₹1,00,000 spent, actual: ₹60,000 shown in dashboard"

### C.6.2 Ad Account Dashboard Screenshots
- **Field Name:** `ad_account_dashboard_screenshots_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Screenshots from Meta Ads Manager / Google Ads showing:
  - Daily spend breakdown
  - Total spend for period
  - Campaign details
  - CPC/ROAS data

### C.6.3 Card Billing Records (If Applicable)
- **Field Name:** `card_billing_records_dm`
- **Type:** File Upload (Bank/Card Statements)
- **Required:** NO
- **Content:** Bank/card statements showing charges from Facebook/Google

### C.6.4 Campaign Performance vs. Spend
- **Field Name:** `campaign_performance_vs_spend_dm`
- **Type:** Textarea + File Upload
- **Required:** YES
- **Content:** Analysis showing if spend was actually used for campaigns:
  - Expected clicks/impressions for spend amount
  - Actual clicks/impressions received
  - Mismatch indicates possible misuse

---

## 🔴 C.7 ACCOUNT ACCESS DENIED DISPUTE EVIDENCE

**If dispute reason: Account access not provided**

### C.7.1 Access Request History
- **Field Name:** `access_request_history_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Screenshots of:
  - Messages requesting access
  - Service provider's excuses/delays
  - Dates of requests vs. denial

### C.7.2 Promised Access Not Delivered
- **Field Name:** `promised_access_contract_screenshot_dm`
- **Type:** File Upload (Screenshot)
- **Required:** YES
- **Content:** Screenshot of contract showing access was promised

### C.7.3 Impact Documentation
- **Field Name:** `access_denial_impact_dm`
- **Type:** Textarea
- **Required:** YES
- **Content:** Explain impact of denied access:
  - "Cannot verify if campaigns are running"
  - "Cannot see real dashboard data"
  - "Cannot monitor ad spend"

---

## 🔴 C.8 NO REPORTS SHARED DISPUTE EVIDENCE

**If dispute reason: No reports or data shared**

### C.8.1 Report Request History
- **Field Name:** `report_request_history_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Screenshots showing:
  - When reports were requested
  - Service provider's responses/delays
  - No reports delivered

### C.8.2 Contract Report Requirements
- **Field Name:** `contract_report_requirements_screenshot_dm`
- **Type:** File Upload (Screenshot)
- **Required:** YES
- **Content:** Screenshot from contract showing reporting frequency promised
- **Example:** "Weekly reports required" or "Monthly PDF reports"

### C.8.3 Communication Trail
- **Field Name:** `report_communication_evidence_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Full message thread showing requests for reports & lack of response

---

## 🔴 C.9 SOURCE FILES NOT PROVIDED DISPUTE EVIDENCE

**If dispute reason: Source files not provided**

### C.9.1 Source Files Request Evidence
- **Field Name:** `source_files_request_evidence_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Messages/requests for source files with dates

### C.9.2 Contract Promise of Source Files
- **Field Name:** `contract_source_files_promise_dm`
- **Type:** File Upload (Screenshot)
- **Required:** YES
- **Content:** Screenshot from contract: "Source files (PSD, AI, AE) to be provided"

### C.9.3 Service Provider's Excuse Documentation
- **Field Name:** `source_files_excuse_documentation_dm`
- **Type:** File Upload (Screenshots)
- **Required:** NO
- **Content:** Screenshots of excuses (e.g., "files lost", "will send later", etc.)

---

## 🔴 C.10 COMMUNICATION/RESPONSIVENESS DISPUTE EVIDENCE

**If dispute reason: Poor communication**

### C.10.1 Response Time Documentation
- **Field Name:** `response_time_documentation_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Screenshots showing:
  - Message sent on [date & time]
  - Response received on [date & time] or NO response
  - Pattern of delays/non-response

### C.10.2 Communication Channel Evidence
- **Field Name:** `communication_channel_screenshots_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Message threads from:
  - Platform chat (WhatsApp, Telegram)
  - Email
  - Project management tool
  - Showing lack of communication

### C.10.3 Missed Deadlines Due to Communication
- **Field Name:** `missed_deadlines_communication_dm`
- **Type:** Textarea + Files
- **Required:** YES
- **Content:** Document how poor communication caused missed deadlines:
  - "Requested feedback on [date], no response until [date], now behind schedule"

---

## 🔴 C.11 EXTRA CHARGES DISPUTE EVIDENCE

**If dispute reason: Unexpected charges**

### C.11.1 Original Quote/Contract
- **Field Name:** `original_quote_contract_dm`
- **Type:** File Upload (Screenshot)
- **Required:** YES
- **Content:** Screenshot showing original agreed price: ₹X

### C.11.2 Extra Charges Invoice
- **Field Name:** `extra_charges_invoice_dm`
- **Type:** File Upload (Invoice/Screenshot)
- **Required:** YES
- **Content:** New invoice/bill showing extra charges: ₹Y
- **Total now:** ₹X + ₹Y = ₹Z

### C.11.3 Extra Charges Request Proof
- **Field Name:** `extra_charges_request_proof_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Messages where service provider asked for extra money
- **Proof of dispute:** "Not agreed in contract", "Surprise charge", "Asked after work started"

### C.11.4 Scope Change Verification
- **Field Name:** `extra_charges_scope_change_dm`
- **Type:** Textarea
- **Required:** YES
- **Content:** Claim if extra charges are justified:
  - "Yes, scope expanded (specify how)" — May lose dispute
  - "No, was always in original scope" — Dispute valid
  - "Partial scope addition" — Partial refund may apply

---

## 🔴 C.12 PLAGIARISM/COPYRIGHT DISPUTE EVIDENCE

**If dispute reason: Plagiarism or copied content**

### C.12.1 Plagiarism Scan Report
- **Field Name:** `plagiarism_scan_report_dm`
- **Type:** File Upload (Report)
- **Required:** YES
- **Tools:** Copyscape, Turnitin, Grammarly, Plagscan
- **Content:** Report showing:
  - % plagiarism detected
  - Sources content was copied from
  - Highlighted matching text

### C.12.2 Side-by-Side Comparison
- **Field Name:** `plagiarism_side_by_side_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Comparison of:
  - Delivered content (left side)
  - Original source (right side)
  - Matching text highlighted

### C.12.3 Original Source Documentation
- **Field Name:** `original_source_links_dm`
- **Type:** URL/Text
- **Required:** YES
- **Content:** Links to original sources where content was copied from

---

## 🔴 C.13 GENERAL DISPUTE EVIDENCE

### C.13.1 Communication Trail
- **Field Name:** `dispute_communication_trail_dm`
- **Type:** File Upload (Screenshots)
- **Required:** YES
- **Content:** Complete message history showing:
  - Issue raised by client
  - Service provider's response (or lack thereof)
  - Attempts to resolve

### C.13.2 Supporting Documentation
- **Field Name:** `dispute_supporting_docs_dm`
- **Type:** File Upload (Any relevant files)
- **Required:** NO
- **Content:** Any additional proof (emails, contracts, invoices, etc.)

### C.13.3 Requested Resolution
- **Field Name:** `dispute_requested_resolution_dm`
- **Type:** Single Select
- **Required:** YES
- **Options:**
  - `full_refund` — Full refund
  - `partial_refund_percentage` — Partial refund (specify %)
  - `redo_work_free` — Redo the work for free
  - `partial_redo` — Redo specific deliverables
  - `credit_future_work` — Credit toward future work
  - `other_resolution` — Other (specify)
- **Amount/Details:** `dispute_resolution_amount_dm` (Currency/Textarea, if applicable)

### C.13.4 Evidence Authenticity Declaration
- **Field Name:** `dispute_evidence_authenticity_dm`
- **Type:** Checkbox (Required)
- **Statement:** "I confirm all evidence provided is authentic, unaltered, and accurately represents the issue. I understand that subjective complaints without objective evidence shall not be considered valid."

---

**END OF PART C: DISPUTE EVIDENCE FIELDS**

**Status:** ✅ Complete (50+ fields across 12 dispute categories)

**Key Dispute Protections:**
- ✅ "Incomplete deliverables" → Must provide count mismatch proof
- ✅ "Poor quality" → Must provide side-by-side quality comparison
- ✅ "No results" → Distinguishes effort-based vs. outcome-based
- ✅ "Fake metrics" → Requires third-party audit tools
- ✅ "Ad spend misused" → Requires billing verification
- ✅ "No access" → Must show contract promise & request history
- ✅ "No reports" → Must show request history & contract requirements
- ✅ "Extra charges" → Must provide original quote vs. new invoice
- ✅ "Plagiarism" → Requires plagiarism detection report
- ✅ "Communication issues" → Must provide message trails with timestamps
- ✅ "Source files not provided" → Contract promise required
- ✅ All disputes require objective evidence (not subjective complaints)

---

# 🗄️ PART D: DATABASE SCHEMA MAPPING

```sql
-- ============================================
-- SECTION 1: SERVICE DEFINITION & BASICS
-- ============================================
digital_marketing_service_type TEXT NOT NULL, -- enum
digital_marketing_job_title TEXT NOT NULL,
platforms_covered_dm TEXT[] NOT NULL, -- array
custom_platform_dm TEXT,
brand_name_dm TEXT NOT NULL,
industry_type_dm TEXT NOT NULL,
industry_type_custom_dm TEXT,
business_website_url_dm VARCHAR(255),
business_stage_dm TEXT,

-- ============================================
-- SECTION 2: STRATEGY & GOALS
-- ============================================
strategy_approach_dm TEXT NOT NULL,
campaign_goals_dm JSONB, -- {goal_type, target_value}

-- ============================================
-- SECTION 3: SOCIAL MEDIA MANAGEMENT
-- ============================================
posts_per_month_dm INTEGER,
reels_per_month_dm INTEGER,
stories_per_week_dm INTEGER,
static_creatives_per_month_dm INTEGER,
caption_writing_included_dm BOOLEAN,
caption_style_guidelines TEXT,
hashtag_research_included_dm BOOLEAN,
hashtag_research_frequency TEXT,
community_management_included_dm BOOLEAN,
comment_response_time_dm TEXT,
dm_response_time_dm TEXT,
engagement_activities_dm TEXT[],
post_scheduling_frequency_dm TEXT,
revisions_per_creative_dm INTEGER,
revision_definition_dm TEXT,
content_calendar_provided_dm BOOLEAN,
calendar_format_dm TEXT,

-- ============================================
-- SECTION 4: SEO
-- ============================================
seo_type_dm TEXT,
keywords_research_count_dm INTEGER,
web_pages_optimized_count_dm INTEGER,
backlinks_target_count_dm INTEGER,
backlink_quality_dm TEXT,
da_dr_improvement_promised_dm BOOLEAN,
target_domain_authority_dm INTEGER,
target_domain_rating_dm INTEGER,
on_page_optimization_included_dm BOOLEAN,
on_page_optimization_sub_options TEXT[],
technical_seo_audit_included_dm BOOLEAN,
technical_seo_audit_sub_options TEXT[],
schema_markup_included_dm BOOLEAN,
schema_types_dm TEXT[],
page_speed_optimization_dm BOOLEAN,
target_page_speed_dm TEXT,
content_writing_included_seo_dm BOOLEAN,
content_word_count_dm INTEGER,
content_types_seo_dm TEXT[],

-- ============================================
-- SECTION 5: PAID ADS MANAGEMENT
-- ============================================
ad_platform_dm TEXT[],
ad_spend_payer_dm TEXT NOT NULL,
ad_spend_payment_details_dm TEXT,
estimated_monthly_ad_spend_dm NUMERIC,
daily_budget_cap_dm NUMERIC,
campaigns_count_dm INTEGER,
dashboard_access_sharing_dm TEXT,
ads_reporting_frequency_dm TEXT,
ad_creatives_count_dm INTEGER,
landing_page_included_dm BOOLEAN,
landing_page_count_dm INTEGER,
landing_page_details_dm TEXT,
conversion_tracking_setup_dm BOOLEAN,
pixel_setup_included_dm BOOLEAN,
event_tracking_dm TEXT[],
ab_testing_included_dm BOOLEAN,
ab_testing_frequency_dm TEXT,

-- ============================================
-- SECTION 6: CONTENT CREATION
-- ============================================
content_type_dm TEXT,
script_writing_included_dm BOOLEAN,
voiceover_included_dm BOOLEAN,
voiceover_language_dm TEXT,
model_talent_required_dm BOOLEAN,
talent_source_dm TEXT,
content_pieces_count_dm INTEGER,
video_length_dm VARCHAR(100),
raw_footage_included_dm BOOLEAN,
raw_footage_format_dm TEXT,
editing_rounds_dm INTEGER,
file_formats_delivered_dm TEXT[],
source_files_included_dm BOOLEAN,
source_file_types_dm TEXT[],
source_files_exclusion_reason_dm TEXT,

-- ============================================
-- SECTION 7: INFLUENCER MARKETING
-- ============================================
influencer_count_dm INTEGER,
influencer_tier_dm TEXT,
deliverables_per_influencer_dm TEXT[],
influencer_tracking_method_dm TEXT,
influencer_contract_provided_dm BOOLEAN,
contract_details_dm TEXT,
client_to_contact_influencers_dm BOOLEAN,

-- ============================================
-- SECTION 8: TIMELINE & MILESTONES
-- ============================================
project_start_date_dm DATE NOT NULL,
project_end_date_dm DATE NOT NULL,
draft_approval_time_dm TEXT,
custom_approval_time_days_dm INTEGER,
content_delivery_schedule_dm TEXT,
milestone_dates_dm TEXT,

-- ============================================
-- SECTION 9: ACCESS & CREDENTIALS
-- ============================================
account_access_required_dm BOOLEAN,
required_permissions_dm TEXT[],
access_credentials_method_dm TEXT,
service_provider_pixels_allowed_dm BOOLEAN,
pixel_types_allowed_dm TEXT[],
brand_assets_needed_dm TEXT[],
previous_performance_data_needed_dm BOOLEAN,
data_to_provide_dm TEXT,
brand_assets_upload_link_dm VARCHAR(255),

-- ============================================
-- SECTION 10: REVISIONS & CHANGE MANAGEMENT
-- ============================================
revisions_per_creative_rounds_dm INTEGER,
revision_definition_dm TEXT,
new_creative_definition_dm TEXT,
new_creative_additional_charge_dm NUMERIC,
change_request_process_dm TEXT,

-- ============================================
-- SECTION 11: RESTRICTIONS & COMPLIANCE
-- ============================================
exclusions_not_included_dm TEXT[],
compliance_industry_type_dm TEXT,
prohibited_content_declaration_dm TEXT[],
compliance_client_declaration_dm BOOLEAN,
ads_violation_clause_dm BOOLEAN,

-- ============================================
-- SECTION 12: REPORTING
-- ============================================
reporting_schedule_dm TEXT,
report_format_dm TEXT,
report_content_included_dm TEXT[],
realtime_dashboard_access_dm BOOLEAN,
dashboard_type_dm TEXT,

-- ============================================
-- SECTION 13: COMMERCIAL TERMS
-- ============================================
total_service_fee_dm NUMERIC NOT NULL,
service_fee_timeframe_dm TEXT,
ad_spend_separate_dm BOOLEAN,
ad_spend_note_dm TEXT,
management_fee_percentage_dm NUMERIC,
management_fee_cap_dm NUMERIC,
gst_applicable_dm BOOLEAN,
gst_rate_dm NUMERIC,
gst_included_or_additional_dm TEXT,
payment_schedule_dm TEXT,
payment_schedule_details_dm TEXT,
payment_methods_dm TEXT[],
inspection_window_dm TEXT,
refund_policy_dm TEXT,
refund_policy_details_dm TEXT,
jurisdiction_city_dm TEXT NOT NULL,

-- ============================================
-- PART B: DELIVERY EVIDENCE
-- ============================================
social_media_creatives_delivered TEXT, -- file URLs
posted_content_screenshots TEXT,
content_calendar_screenshot TEXT,
account_growth_screenshot TEXT,
engagement_metrics_screenshot TEXT,
community_management_proof TEXT,

keyword_research_report_seo TEXT,
on_page_optimization_report TEXT,
technical_seo_audit_report TEXT,
backlink_report_urls_seo TEXT,
current_ranking_screenshot_seo TEXT,
page_speed_results_seo TEXT,
content_writing_deliverables_seo TEXT,

campaign_setup_screenshots_ads TEXT,
ad_manager_dashboard_export TEXT,
daily_spend_evidence_ads TEXT,
conversion_tracking_setup_proof TEXT,
pixel_event_firing_proof TEXT,
monthly_performance_report_ads TEXT,
ad_creatives_delivered_ads TEXT,
ab_test_results_ads TEXT,
landing_page_screenshots_ads TEXT,
ads_account_access_proof TEXT,

final_content_files_delivered TEXT,
raw_footage_delivered TEXT,
script_document_delivered TEXT,
voiceover_files_delivered TEXT,
source_files_delivered TEXT,
content_delivery_schedule_proof TEXT,

influencer_posts_screenshots TEXT,
influencer_engagement_proof TEXT,
hashtag_mention_verification TEXT,
influencer_content_links TEXT,
influencer_contracts_copies TEXT,
promo_code_tracking_results TEXT,

brand_strategy_document TEXT,
brand_guidelines_document TEXT,
brand_assets_files TEXT,

completion_proof_timestamp TEXT,
work_completion_certification BOOLEAN,
supporting_documentation_delivery TEXT,

-- ============================================
-- PART C: DISPUTE EVIDENCE
-- ============================================
dispute_reason_category_dm TEXT,
dispute_reason_other_dm TEXT,
dispute_description_dm TEXT,
dispute_severity_dm TEXT,

deliverables_count_mismatch_proof TEXT,
contract_screenshot_deliverables_dm TEXT,
received_deliverables_list_dm TEXT,

quality_standards_mismatch_proof TEXT,
professional_standards_reference_dm TEXT,
expert_quality_assessment_dm TEXT,

aspirational_metrics_claim_dm TEXT,
effort_based_deliverables_proof_dm TEXT,
external_factors_documentation_dm TEXT,
before_after_metrics_comparison_dm TEXT,

metrics_audit_report_dm TEXT,
engagement_anomalies_proof_dm TEXT,
fake_followers_analysis_dm TEXT,
influencer_authenticity_check_dm TEXT,

ad_spend_discrepancy_proof_dm TEXT,
ad_account_dashboard_screenshots_dm TEXT,
card_billing_records_dm TEXT,
campaign_performance_vs_spend_dm TEXT,

access_request_history_dm TEXT,
promised_access_contract_screenshot_dm TEXT,
access_denial_impact_dm TEXT,

report_request_history_dm TEXT,
contract_report_requirements_screenshot_dm TEXT,
report_communication_evidence_dm TEXT,

source_files_request_evidence_dm TEXT,
contract_source_files_promise_dm TEXT,
source_files_excuse_documentation_dm TEXT,

response_time_documentation_dm TEXT,
communication_channel_screenshots_dm TEXT,
missed_deadlines_communication_dm TEXT,

original_quote_contract_dm TEXT,
extra_charges_invoice_dm TEXT,
extra_charges_request_proof_dm TEXT,
extra_charges_scope_change_dm TEXT,

plagiarism_scan_report_dm TEXT,
plagiarism_side_by_side_dm TEXT,
original_source_links_dm TEXT,

dispute_communication_trail_dm TEXT,
dispute_supporting_docs_dm TEXT,
dispute_requested_resolution_dm TEXT,
dispute_resolution_amount_dm NUMERIC,
dispute_evidence_authenticity_dm BOOLEAN,
```

---

# 📝 PART E: SAMPLE CONTRACT CLAUSE GENERATION

## How Form Fields → Contract Clauses

**Example 1: Social Media Management Service**

```
SERVICE DEFINITION:
This Agreement pertains to: Social Media Management - Instagram Growth Campaign

Platforms: Instagram, TikTok

DELIVERABLES:
✓ Monthly posts: 8 per month (exactly)
✓ Monthly reels: 4 per month (exactly)
✓ Stories per week: 2 per week
✓ Static creatives: 2 per month
✓ Caption writing: Included (professional tone, CTA included)
✓ Hashtag research: Included (applied to each post)
✓ Community management: Yes (response time: same day for comments, 24hrs for DMs)
✓ Revisions: 2 rounds per creative

QUALITY LEVEL:
Professional Instagram management with industry-standard content quality.

TIMELINE:
Start: January 1, 2025
End: June 30, 2025 (6-month contract)
Draft approval time: 48 hours

FEES:
Service fee: ₹15,000/month
GST: 18% additional
Total: ₹17,700/month
Payment: Monthly on 5th of each month (via bank transfer)

REPORTS:
Weekly reports in PDF format including:
- Metrics (followers, engagement rate, reach)
- Post performance comparison
- Insights & recommendations
- Screenshots from Instagram

DELIVERY PROOF:
Service provider shall submit:
✓ All creatives created (files with timestamps)
✓ Posted content screenshots (URL, date, engagement visible)
✓ Content calendar screenshot (scheduled posts)
✓ Account growth screenshot (follower count start vs. end)
✓ Engagement metrics (likes, comments, shares)
✓ Community management proof (DM/comment responses with timestamps)

INSPECTION WINDOW:
Client shall inspect deliverables within 7 days and report any issues.
```

---

**Example 2: Performance Marketing (Google Ads)**

```
SERVICE: Performance Marketing - Google Search Ads Management

DELIVERABLES:
✓ Ad platform: Google Search Ads
✓ Ad spend payer: Service provider's agency account (client reimburses)
✓ Monthly ad budget: ₹50,000 (client reimburses 100%)
✓ Daily budget cap: ₹2,000
✓ Number of campaigns: 3
✓ Ad creatives: 5 different ads (for testing)
✓ Conversion tracking: Yes (Google Analytics 4 + conversion pixels)
✓ Dashboard access: Read-only (client can view real-time Google Ads dashboard)
✓ Reporting: Weekly reports (Google Sheet)

CRITICAL DISCLAIMERS:

❌ NOT GUARANTEED:
- Specific sales volume or leads
- Minimum ROAS or CPA
- Click-through rates (CTR)
- Keyword rankings
- Conversion rates

✅ GUARANTEED (Effort-Based):
- Campaigns set up properly within 48 hours
- Budget spent as agreed (±10% variance acceptable)
- Ad optimization performed weekly
- Conversion tracking implemented & active
- Weekly performance reports provided

AD ACCOUNT MANAGEMENT:
✓ Service provider owns ad account for protection
✓ Client has read-only dashboard access at all times
✓ Daily spend transparent in shared Google Sheet
✓ At contract end: All account data exported to client in CSV format
✓ Ad account does NOT close; client can manage independently after

FEES:
✓ Management fee: 15% of ad spend
✓ If ad spend: ₹50,000/month → Management fee: ₹7,500/month
✓ Client reimburses: ₹50,000 ad spend + ₹7,500 management = ₹57,500/month
✓ GST: 18% on management fee (₹1,350)
✓ Total: ₹58,850/month

APPROVAL & TIMELINE:
✓ Draft approval time: 24 hours
✓ If client delays approval beyond 48 hours: Timeline auto-extends by delay duration
✓ If campaign paused for policy violations: Service provider notifies immediately
  & attempts reinstatement within 24 hours

DELIVERY PROOF:
✓ Campaign setup screenshots
✓ Ad manager dashboard export
✓ Daily spend evidence (matching ₹50,000 budget)
✓ Conversion tracking proof (pixels firing)
✓ Monthly performance report (clicks, conversions, CPC, ROAS attempts)
✓ Ad creatives (5 different designs)

DISPUTE RESOLUTION:
- "No sales from ads" → NOT a valid dispute (outcomes not guaranteed)
- "Budget not spent" → Valid dispute (effort-based deliverable not met)
- "No reports shared" → Valid dispute (data transparency promised)
- "Fake engagement" → Valid dispute (requires third-party audit proof)
```

---

**Example 3: SEO Service**

```
SERVICE: SEO Optimization - 20-Page Website

DELIVERABLES:
✓ SEO type: Comprehensive (on-page + off-page + technical)
✓ Keywords researched & optimized: 50 keywords
✓ Web pages optimized: 20 pages
✓ Backlinks to be created: 40 high-authority backlinks
✓ On-page optimization: Yes (meta tags, H1/H2/H3, internal linking, image alts)
✓ Technical SEO audit: Yes (site speed, mobile, crawl errors, XML sitemap)
✓ Schema markup: Yes (Organization + Article schemas)
✓ Page speed optimization: Yes (target: 75+/100 on PageSpeed Insights)
✓ Content writing: Yes (1000 words/month SEO optimized content)

CRITICAL DISCLAIMERS:

⚠️ SEO TIMELINE:
SEO is a long-term strategy. Keyword rankings typically take 3-6 months 
to improve depending on competition, domain age, and search intent.

❌ NOT GUARANTEED:
- Specific keyword rankings or position (#1, top 5, etc.)
- Traffic increase % or exact volume
- First-page rankings for all keywords
- Timeline for ranking improvements
- Google algorithm changes (not controllable)

✅ GUARANTEED (Effort-Based):
- 50 keywords researched & documented
- 20 pages optimized with on-page best practices
- 40 backlinks created from quality sites
- Technical audit completed & fixes implemented
- Schema markup added
- Page speed optimized
- Monthly reports showing activities completed

EFFORT-BASED PROOF (Not Outcomes):
Service Provider provides monthly reports showing:
✓ Keyword research document (50 keywords with search volume)
✓ On-page optimization report (per-page changes made)
✓ Backlink report (40 links with URLs, domain authority, anchor text)
✓ Technical audit report (fixes applied)
✓ Page speed results (before/after screenshots)
✓ Ranking snapshots (current positions, not guarantees)

FEES:
✓ Total service fee: ₹40,000/month (6-month minimum)
✓ Payment: Monthly in advance
✓ GST: 18% additional
✓ Total: ₹47,200/month

REFUND POLICY:
✓ If effort-based deliverables NOT met: Full refund
✓ If deliverables met but rankings don't improve: No refund (SEO not outcome-based)
✓ Example: "You provided 40 backlinks (deliverable met) but rankings didn't improve 
  → No refund. You did not provide 40 backlinks → Full refund."

INSPECTION WINDOW: 7 days (client reviews monthly reports)
```

---

## Summary of Contract Generation Pattern

**Every contract auto-generates:**

1. **Service Definition** (from fields 1.1-1.4)
2. **Deliverables** (from sections 3-7, with exact quantities)
3. **Quality Standards** (from section 6)
4. **Timeline** (from section 8)
5. **Fees & Payment** (from section 13)
6. **Delivery Proof Requirements** (from part B fields)
7. **Critical Disclaimers** (auto-added based on service type)
   - For ads: "Sales not guaranteed, only effort-based deliverables"
   - For SEO: "Ranking improvements take time, not guaranteed"
   - For social media: "Viral content not guaranteed"
8. **Dispute Resolution Rules** (from part C framework)
9. **Jurisdiction & Terms** (from section 13)

---

**END OF PART E: SAMPLE CONTRACT CLAUSE GENERATION**

**Status:** ✅ Complete

---

## 📊 FINAL SUMMARY

**SERVICE_ANNEXURE_H: DIGITAL MARKETING / SEO / SOCIAL MEDIA / ADS / BRANDING**

✅ **72 Contract Creation Fields** (PART A)
✅ **40+ Delivery Evidence Fields** (PART B)
✅ **50+ Dispute Evidence Fields** (PART C)
✅ **140+ Database Columns** (PART D)
✅ **Sample Clause Generation Framework** (PART E)

**Total Fields: 210+**

**Dispute Protections Built-In:**
- ✅ Against "I didn't get results" → Aspirational metrics disclaimer
- ✅ Against "Ran ads from own account" → Dashboard access & data export binding
- ✅ Against "Followers were fake" → Tracking methods & audit requirements
- ✅ Against "No reports shared" → Reporting frequency binding & proof required
- ✅ Against "Source files not provided" → Explicit yes/no commitment
- ✅ Against "Extra charges" → Additional charges pre-defined
- ✅ Against "Plagiarism" → Requires third-party scan proof
- ✅ Against "Poor communication" → Requires message trails with timestamps
- ✅ Against "Incomplete deliverables" → Exact counts binding in contract
- ✅ Against "Ad policy violations" → Immediate notification & refund if unrecoverable

**Now you have 8 comprehensive service annexures:**
1. ✅ SERVICE_ANNEXURE_A (Software Development) - 86 fields
2. ✅ SERVICE_ANNEXURE_B (UI/UX Design & Graphic Design) - 64 fields
3. ✅ SERVICE_ANNEXURE_C (Content Writing & Copywriting) - 80 fields
4. ✅ SERVICE_ANNEXURE_D (Photography & Videography) - 82 fields
5. ✅ SERVICE_ANNEXURE_E (Tuition & Coaching) - 91 fields
6. ✅ SERVICE_ANNEXURE_F (Home Repair & Maintenance) - 98 fields
7. ✅ SERVICE_ANNEXURE_G (Cleaning & Housekeeping) - 98 fields
8. ✅ SERVICE_ANNEXURE_H (Digital Marketing & SEO) - 210+ fields

**Total: 809+ contract creation fields across 8 service industries**

Ready for SERVICE_ANNEXURE_I (Beauty & Salon), J (Transportation), K (Legal/Consulting), or other services?

