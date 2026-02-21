/**
 * EXACT SERVICE FORMS H-J - FROM REFINED_FORM_FIELDS_MANDATORY_OPTIONAL.md
 * Complex services with conditional logic: Digital Marketing, Consulting, Event Management
 */

import { IndustryFormConfig, FormField } from '../components/forms/IndustryFormBuilder';

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE H: DIGITAL MARKETING
// Mandatory: 16+ fields (4 Common + 12 Specific + conditional 4.1-4.6)
// Optional: 89 fields | Total: 105+ fields
// ═══════════════════════════════════════════════════════════════════════════════

export const DIGITAL_MARKETING_FORM: IndustryFormConfig = {
  id: 'digital_marketing',
  name: 'Digital Marketing',
  description: 'Complete digital marketing with conditional strategy sections',
  icon: '📱',
  estimatedTime: 90,
  riskLevel: 'medium',
  sections: [
    {
      id: 'service_common',
      title: 'Common Service Fields',
      fields: [
        {
          name: 'service_price',
          label: 'Total service cost in ₹',
          type: 'number',
          required: true
        },
        {
          name: 'payment_schedule',
          label: 'Payment Schedule',
          type: 'select',
          required: true,
          options: [
            { value: 'full_upfront', label: 'Full upfront' },
            { value: 'partial_upfront', label: 'Partial upfront' },
            { value: 'on_delivery', label: 'On delivery' },
            { value: 'milestone_based', label: 'Milestone-based' }
          ]
        },
        {
          name: 'delivery_date',
          label: 'Agreed completion date',
          type: 'date',
          required: true
        },
        {
          name: 'dispute_resolution_days',
          label: 'Days allowed for resolution (default: 30)',
          type: 'number',
          required: true
        }
      ]
    },
    {
      id: 'service_type_section',
      title: 'Service Type & Brand Information',
      fields: [
        { name: 'service_type', label: 'Service Type', type: 'select', required: true, options: [
          { value: 'brand_awareness', label: 'Brand Awareness' },
          { value: 'lead_generation', label: 'Lead Generation' },
          { value: 'sales_conversion', label: 'Sales Conversion' },
          { value: 'customer_retention', label: 'Customer Retention' }
        ]},
        { name: 'business_type', label: 'Business Type', type: 'select', required: true, options: [
          { value: 'b2b', label: 'B2B' },
          { value: 'b2c', label: 'B2C' },
          { value: 'b2b2c', label: 'B2B2C' }
        ]},
        { name: 'campaign_name', label: 'Campaign Name', type: 'text', required: true },
        { name: 'brand_name', label: 'Brand Name', type: 'text', required: true },
        { name: 'brand_description', label: 'Brand Description', type: 'textarea', required: true },
        { name: 'website_url', label: 'Website URL', type: 'text', required: true },
        { name: 'brand_voice_guidelines_provided', label: 'Brand Voice Guidelines Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'competitor_analysis_provided', label: 'Competitor Analysis Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'strategy_section',
      title: 'Marketing Strategy',
      fields: [
        { name: 'marketing_strategy_documented', label: 'Marketing Strategy Documented', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'strategy_duration_months', label: 'Strategy Duration (Months)', type: 'number', required: true },
        { name: 'primary_objective', label: 'Primary Objective', type: 'select', required: true, options: [
          { value: 'awareness', label: 'Awareness' },
          { value: 'engagement', label: 'Engagement' },
          { value: 'conversion', label: 'Conversion' },
          { value: 'retention', label: 'Retention' }
        ]},
        { name: 'aspirational_metrics_disclaimer', label: 'Aspirational Metrics Disclaimer', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'secondary_objectives', label: 'Secondary Objectives', type: 'select', required: false, multiple: true, options: [
          { value: 'brand_loyalty', label: 'Brand Loyalty' },
          { value: 'market_share', label: 'Market Share' },
          { value: 'customer_lifetime_value', label: 'Customer Lifetime Value' },
          { value: 'nps_improvement', label: 'NPS Improvement' }
        ]},
        { name: 'target_audience_detailed', label: 'Target Audience Details', type: 'textarea', required: false }
      ]
    },
    {
      id: 'content_section',
      title: 'Content Creation',
      fields: [
        { name: 'content_creation_included', label: 'Content Creation Included', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'any_promising_reach', label: 'Any Promising Reach', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'if_yes_mention', label: 'If Yes, Mention', type: 'text', required: false },
        { name: 'content_types', label: 'Content Types', type: 'select', required: true, multiple: true, options: [
          { value: 'social_media', label: 'Social Media' },
          { value: 'blog_content', label: 'Blog/Content' },
          { value: 'seo', label: 'SEO' },
          { value: 'paid_ads', label: 'Paid Ads' },
          { value: 'email_marketing', label: 'Email Marketing' },
          { value: 'influencer_marketing', label: 'Influencer Marketing' }
        ]}
      ]
    },
    {
      id: 'social_media_section',
      title: '[CONDITIONAL] Social Media Management',
      fields: [
        { name: 'social_media_included', label: 'Social Media Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'platforms_to_manage', label: 'Platforms to Manage', type: 'select', required: false, multiple: true, options: [
          { value: 'instagram', label: 'Instagram' },
          { value: 'facebook', label: 'Facebook' },
          { value: 'linkedin', label: 'LinkedIn' },
          { value: 'tiktok', label: 'TikTok' },
          { value: 'youtube', label: 'YouTube' },
          { value: 'twitter', label: 'Twitter' }
        ]},
        { name: 'instagram_included', label: 'Instagram Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'instagram_post_frequency', label: 'Instagram Post Frequency (per week)', type: 'number', required: false },
        { name: 'instagram_story_frequency', label: 'Instagram Story Frequency (per week)', type: 'number', required: false },
        { name: 'instagram_engagement_target', label: 'Instagram Engagement Target (%)', type: 'number', required: false },
        { name: 'facebook_included', label: 'Facebook Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'facebook_post_frequency', label: 'Facebook Post Frequency (per week)', type: 'number', required: false },
        { name: 'facebook_engagement_type', label: 'Facebook Engagement Type', type: 'select', required: false, options: [
          { value: 'comments', label: 'Comments' },
          { value: 'shares', label: 'Shares' },
          { value: 'reactions', label: 'Reactions' },
          { value: 'all', label: 'All' }
        ]},
        { name: 'linkedin_included', label: 'LinkedIn Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'linkedin_content_type', label: 'LinkedIn Content Type', type: 'select', required: false, multiple: true, options: [
          { value: 'industry_insights', label: 'Industry Insights' },
          { value: 'thought_leadership', label: 'Thought Leadership' },
          { value: 'company_updates', label: 'Company Updates' },
          { value: 'job_postings', label: 'Job Postings' }
        ]},
        { name: 'tiktok_included', label: 'TikTok Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'tiktok_video_count_monthly', label: 'TikTok Video Count (monthly)', type: 'number', required: false },
        { name: 'youtube_included', label: 'YouTube Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'youtube_video_frequency', label: 'YouTube Video Frequency (per month)', type: 'number', required: false },
        { name: 'youtube_video_length_minutes', label: 'YouTube Video Length (minutes)', type: 'text', required: false }
      ]
    },
    {
      id: 'blog_content_section',
      title: '[CONDITIONAL] Blog & Content Creation',
      fields: [
        { name: 'blog_posts_monthly', label: 'Blog Posts (monthly)', type: 'number', required: false },
        { name: 'graphics_per_month', label: 'Graphics (per month)', type: 'number', required: false },
        { name: 'video_content_monthly', label: 'Video Content (monthly)', type: 'number', required: false },
        { name: 'reels_shorts_monthly', label: 'Reels/Shorts (monthly)', type: 'number', required: false },
        { name: 'content_calendar_provided', label: 'Content Calendar Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'content_approval_process', label: 'Content Approval Process', type: 'select', required: false, options: [
          { value: 'client_approval', label: 'Client Approval' },
          { value: 'agency_approval', label: 'Agency Approval' },
          { value: 'both', label: 'Both' }
        ]},
        { name: 'content_revision_rounds', label: 'Content Revision Rounds', type: 'number', required: false },
        { name: 'content_sourcing', label: 'Content Sourcing', type: 'select', required: false, options: [
          { value: 'agency_created', label: 'Agency Created' },
          { value: 'client_provided', label: 'Client Provided' },
          { value: 'mixed', label: 'Mixed' }
        ]}
      ]
    },
    {
      id: 'seo_section',
      title: '[CONDITIONAL] SEO',
      fields: [
        { name: 'seo_included', label: 'SEO Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'keyword_research_included', label: 'Keyword Research Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'target_keywords_count', label: 'Target Keywords Count', type: 'number', required: false },
        { name: 'on_page_optimization', label: 'On-Page Optimization', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'technical_seo_audit', label: 'Technical SEO Audit', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'backlink_building_included', label: 'Backlink Building Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'target_domain_authority', label: 'Target Domain Authority', type: 'number', required: false },
        { name: 'ranking_target_months', label: 'Ranking Target (months)', type: 'number', required: false },
        { name: 'local_seo_included', label: 'Local SEO Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'monthly_seo_reports', label: 'Monthly SEO Reports', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'paid_ads_section',
      title: '[CONDITIONAL] Paid Advertising',
      fields: [
        { name: 'paid_ads_included', label: 'Paid Ads Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'google_ads_included', label: 'Google Ads Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'google_ads_monthly_budget', label: 'Google Ads Monthly Budget (₹)', type: 'number', required: false },
        { name: 'google_ads_campaign_type', label: 'Google Ads Campaign Type', type: 'select', required: false, multiple: true, options: [
          { value: 'search', label: 'Search' },
          { value: 'display', label: 'Display' },
          { value: 'shopping', label: 'Shopping' },
          { value: 'video', label: 'Video' }
        ]},
        { name: 'facebook_ads_included', label: 'Facebook Ads Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'facebook_ads_monthly_budget', label: 'Facebook Ads Monthly Budget (₹)', type: 'number', required: false },
        { name: 'facebook_ads_objective', label: 'Facebook Ads Objective', type: 'select', required: false, options: [
          { value: 'awareness', label: 'Awareness' },
          { value: 'consideration', label: 'Consideration' },
          { value: 'conversion', label: 'Conversion' }
        ]},
        { name: 'instagram_ads_included', label: 'Instagram Ads Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'instagram_ads_monthly_budget', label: 'Instagram Ads Monthly Budget (₹)', type: 'number', required: false },
        { name: 'ad_creative_design_included', label: 'Ad Creative Design Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'a_b_testing_included', label: 'A/B Testing Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'conversion_tracking_setup', label: 'Conversion Tracking Setup', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'roi_reporting_frequency', label: 'ROI Reporting Frequency', type: 'select', required: false, options: [
          { value: 'weekly', label: 'Weekly' },
          { value: 'bi_weekly', label: 'Bi-weekly' },
          { value: 'monthly', label: 'Monthly' }
        ]}
      ]
    },
    {
      id: 'email_marketing_section',
      title: '[CONDITIONAL] Email Marketing',
      fields: [
        { name: 'email_marketing_included', label: 'Email Marketing Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'email_list_size_current', label: 'Email List Size (current)', type: 'number', required: false },
        { name: 'email_campaign_frequency', label: 'Email Campaign Frequency', type: 'select', required: false, options: [
          { value: 'weekly', label: 'Weekly' },
          { value: 'bi_weekly', label: 'Bi-weekly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'as_needed', label: 'As needed' }
        ]},
        { name: 'email_design_included', label: 'Email Design Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'automation_setup_included', label: 'Automation Setup Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'influencer_marketing_section',
      title: '[CONDITIONAL] Influencer Marketing',
      fields: [
        { name: 'influencer_marketing_included', label: 'Influencer Marketing Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'influencer_tier_preference', label: 'Influencer Tier Preference', type: 'select', required: false, options: [
          { value: 'nano', label: 'Nano (10K-100K)' },
          { value: 'micro', label: 'Micro (100K-1M)' },
          { value: 'macro', label: 'Macro (1M-10M)' },
          { value: 'mega', label: 'Mega (10M+)' }
        ]},
        { name: 'influencer_count_target', label: 'Influencer Count (target)', type: 'number', required: false },
        { name: 'deliverables_per_influencer', label: 'Deliverables per Influencer', type: 'text', required: false },
        { name: 'influencer_vetting_included', label: 'Influencer Vetting Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'reporting_analytics_section',
      title: 'Reporting & Analytics',
      fields: [
        { name: 'reporting_frequency', label: 'Reporting Frequency', type: 'select', required: true, options: [
          { value: 'weekly', label: 'Weekly' },
          { value: 'bi_weekly', label: 'Bi-weekly' },
          { value: 'monthly', label: 'Monthly' }
        ]},
        { name: 'analytics_setup_included', label: 'Analytics Setup Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'key_metrics_tracked', label: 'Key Metrics Tracked', type: 'select', required: false, multiple: true, options: [
          { value: 'reach', label: 'Reach' },
          { value: 'impressions', label: 'Impressions' },
          { value: 'engagement', label: 'Engagement' },
          { value: 'conversions', label: 'Conversions' },
          { value: 'roi', label: 'ROI' },
          { value: 'ctr', label: 'CTR' }
        ]},
        { name: 'custom_dashboard_provided', label: 'Custom Dashboard Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'strategy_adjustments_included', label: 'Strategy Adjustments (count)', type: 'number', required: false },
        { name: 'performance_review_meetings', label: 'Performance Review Meetings (count)', type: 'number', required: false }
      ]
    },
    {
      id: 'terms_section',
      title: 'Campaign Terms',
      fields: [
        { name: 'campaign_duration_months', label: 'Campaign Duration (months)', type: 'number', required: true },
        { name: 'contract_renewal_terms', label: 'Contract Renewal Terms', type: 'textarea', required: false },
        { name: 'minimum_commitment_months', label: 'Minimum Commitment (months)', type: 'number', required: false },
        { name: 'exit_clause_terms', label: 'Exit Clause Terms', type: 'textarea', required: false }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE I: CONSULTING / CA / TAX / LEGAL / FINANCIAL ADVICE
// Mandatory: 22 fields (4 Common + 18 Specific) | Optional: 56 | Total: 78 fields
// ═══════════════════════════════════════════════════════════════════════════════

export const CONSULTING_FORM: IndustryFormConfig = {
  id: 'consulting',
  name: 'Consulting / CA / Tax / Legal / Financial',
  description: 'Professional consulting with comprehensive scope and liability disclaimers',
  icon: '⚖️',
  estimatedTime: 120,
  sections: [
    {
      id: 'service_common',
      title: 'Common Service Fields',
      fields: [
        {
          name: 'service_price',
          label: 'Total service cost in ₹',
          type: 'number',
          required: true
        },
        {
          name: 'payment_schedule',
          label: 'Payment Schedule',
          type: 'select',
          required: true,
          options: [
            { value: 'full_upfront', label: 'Full upfront' },
            { value: 'partial_upfront', label: 'Partial upfront' },
            { value: 'on_delivery', label: 'On delivery' },
            { value: 'milestone_based', label: 'Milestone-based' }
          ]
        },
        {
          name: 'delivery_date',
          label: 'Agreed completion date',
          type: 'date',
          required: true
        },
        {
          name: 'dispute_resolution_days',
          label: 'Days allowed for resolution (default: 30)',
          type: 'number',
          required: true
        }
      ]
    },
    {
      id: 'service_type_section',
      title: 'Service & Client Type',
      fields: [
        { name: 'service_type', label: 'Service Type', type: 'select', required: true, options: [
          { value: 'tax_consulting', label: 'Tax Consulting' },
          { value: 'financial_advisory', label: 'Financial Advisory' },
          { value: 'legal_advice', label: 'Legal Advice' },
          { value: 'business_consulting', label: 'Business Consulting' },
          { value: 'accounting', label: 'Accounting' }
        ]},
        { name: 'client_entity_type', label: 'Client Entity Type', type: 'select', required: true, options: [
          { value: 'individual', label: 'Individual' },
          { value: 'sole_proprietor', label: 'Sole Proprietor' },
          { value: 'partnership', label: 'Partnership' },
          { value: 'llp', label: 'LLP' },
          { value: 'pvt_ltd', label: 'Pvt Ltd' },
          { value: 'public_ltd', label: 'Public Ltd' },
          { value: 'ngo', label: 'NGO' }
        ]},
        { name: 'client_business_type', label: 'Client Business Type', type: 'select', required: true, options: [
          { value: 'manufacturing', label: 'Manufacturing' },
          { value: 'services', label: 'Services' },
          { value: 'trading', label: 'Trading' },
          { value: 'it_software', label: 'IT/Software' },
          { value: 'real_estate', label: 'Real Estate' },
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'education', label: 'Education' },
          { value: 'other', label: 'Other' }
        ]},
        { name: 'client_name', label: 'Client Name', type: 'text', required: true },
        { name: 'client_pan_number', label: 'Client PAN Number', type: 'text', required: true }
      ]
    },
    {
      id: 'documentation_section',
      title: 'Documentation Requirements',
      fields: [
        { name: 'documents_to_be_provided_by_client', label: 'Documents to be Provided by Client', type: 'textarea', required: false },
        { name: 'document_submission_timeline', label: 'Document Submission Timeline', type: 'text', required: false },
        { name: 'missing_documents_handling', label: 'Missing Documents Handling', type: 'select', required: false, options: [
          { value: 'delay_project', label: 'Delay Project' },
          { value: 'proceed_with_available', label: 'Proceed with Available' },
          { value: 'additional_charges', label: 'Additional Charges' }
        ]},
        { name: 'document_retention_policy', label: 'Document Retention Policy', type: 'text', required: false },
        { name: 'document_confidentiality_duration_years', label: 'Document Confidentiality Duration (years)', type: 'number', required: false }
      ]
    },
    {
      id: 'scope_section',
      title: 'Scope of Work & Deliverables',
      fields: [
        { name: 'deliverables_list', label: 'Deliverables List', type: 'textarea', required: true },
        { name: 'deliverables_count_total', label: 'Total Deliverables Count', type: 'number', required: true },
        { name: 'primary_deliverable', label: 'Primary Deliverable', type: 'textarea', required: true },
        { name: 'secondary_deliverables', label: 'Secondary Deliverables', type: 'textarea', required: false },
        { name: 'documentation_to_provide', label: 'Documentation to Provide', type: 'select', required: false, multiple: true, options: [
          { value: 'detailed_report', label: 'Detailed Report' },
          { value: 'summary_report', label: 'Summary Report' },
          { value: 'presentation', label: 'Presentation' },
          { value: 'spreadsheets', label: 'Spreadsheets' },
          { value: 'certificates', label: 'Certificates' }
        ]},
        { name: 'timeline_for_each_deliverable', label: 'Timeline for Each Deliverable', type: 'textarea', required: false },
        { name: 'milestone_based_delivery', label: 'Milestone-Based Delivery', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'milestone_count', label: 'Milestone Count', type: 'number', required: false },
        { name: 'final_delivery_deadline', label: 'Final Delivery Deadline', type: 'date', required: false },
        { name: 'deliverable_format', label: 'Deliverable Format', type: 'select', required: false, multiple: true, options: [
          { value: 'pdf', label: 'PDF' },
          { value: 'word', label: 'Word' },
          { value: 'excel', label: 'Excel' },
          { value: 'digital', label: 'Digital' },
          { value: 'physical', label: 'Physical' }
        ]},
        { name: 'revision_scope', label: 'Revision Scope', type: 'select', required: false, options: [
          { value: 'limited', label: 'Limited' },
          { value: 'comprehensive', label: 'Comprehensive' },
          { value: 'unlimited', label: 'Unlimited' }
        ]}
      ]
    },
    {
      id: 'compliance_section',
      title: 'Compliance & Regulatory',
      fields: [
        { name: 'regulatory_requirements_applicable', label: 'Regulatory Requirements Applicable', type: 'select', required: true, multiple: true, options: [
          { value: 'gst', label: 'GST' },
          { value: 'income_tax', label: 'Income Tax' },
          { value: 'corporate_tax', label: 'Corporate Tax' },
          { value: 'labour_laws', label: 'Labour Laws' },
          { value: 'company_law', label: 'Company Law' },
          { value: 'tds_tcs', label: 'TDS/TCS' }
        ]},
        { name: 'jurisdiction', label: 'Jurisdiction', type: 'select', required: true, options: [
          { value: 'india', label: 'India' },
          { value: 'international', label: 'International' },
          { value: 'multi_state', label: 'Multi-State' }
        ]},
        { name: 'compliance_calendar_provided', label: 'Compliance Calendar Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'compliance_deadline_reminders', label: 'Compliance Deadline Reminders', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'compliance_documentation_prepared', label: 'Compliance Documentation Prepared', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'regulatory_return_filings', label: 'Regulatory Return Filings', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'number_of_returns_to_file', label: 'Number of Returns to File', type: 'number', required: false }
      ]
    },
    {
      id: 'liability_section',
      title: 'Liability Disclaimers',
      fields: [
        { name: 'liability_cap_percentage', label: 'Liability Cap (%)', type: 'number', required: true },
        { name: 'advice_not_guaranteed', label: 'Advice Not Guaranteed', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'no_guarantee_refund_disclaimer', label: 'No Guarantee Refund Disclaimer', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'not_full_representation_disclaimer', label: 'Not Full Representation Disclaimer', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'not_investment_advice_disclaimer', label: 'Not Investment Advice Disclaimer', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'liability_cap_amount_if_fixed', label: 'Liability Cap Amount (if fixed)', type: 'number', required: false },
        { name: 'exclusion_of_consequential_damages', label: 'Exclusion of Consequential Damages', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'liability_period_days', label: 'Liability Period (days)', type: 'number', required: false },
        { name: 'scope_of_advice_documented', label: 'Scope of Advice Documented', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'out_of_scope_advice_cost', label: 'Out of Scope Advice Cost (₹)', type: 'number', required: false },
        { name: 'client_reliance_on_own_judgment', label: 'Client Reliance on Own Judgment', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'tax_filing_not_legal_advice_disclaimer', label: 'Tax Filing Not Legal Advice Disclaimer', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'no_guarantee_penalty_avoidance_disclaimer', label: 'No Guarantee Penalty Avoidance Disclaimer', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'not_attorney_client_relationship_disclaimer', label: 'Not Attorney-Client Relationship Disclaimer', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'independent_legal_counsel_recommended_disclaimer', label: 'Independent Legal Counsel Recommended', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'market_risks_disclosure', label: 'Market Risks Disclosure', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'past_performance_no_guarantee_disclaimer', label: 'Past Performance No Guarantee Disclaimer', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'tax_planning_included', label: 'Tax Planning Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'tax_saving_strategies', label: 'Tax Saving Strategies', type: 'textarea', required: false },
        { name: 'expected_tax_savings_estimate', label: 'Expected Tax Savings Estimate (₹)', type: 'number', required: false },
        { name: 'invoice_optimization_included', label: 'Invoice Optimization Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'gst_implications_analyzed', label: 'GST Implications Analyzed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'business_structure_recommendations', label: 'Business Structure Recommendations', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'communication_section',
      title: 'Communication',
      fields: [
        { name: 'communication_method', label: 'Communication Method', type: 'select', required: true, multiple: true, options: [
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone' },
          { value: 'whatsapp', label: 'WhatsApp' },
          { value: 'video_call', label: 'Video Call' },
          { value: 'in_person', label: 'In Person' }
        ]},
        { name: 'response_time_sla_hours', label: 'Response Time SLA (hours)', type: 'number', required: true },
        { name: 'support_availability', label: 'Support Availability', type: 'select', required: false, options: [
          { value: 'business_hours', label: 'Business Hours' },
          { value: '24_7', label: '24/7' },
          { value: 'weekdays_only', label: 'Weekdays Only' }
        ]},
        { name: 'escalation_procedure_documented', label: 'Escalation Procedure Documented', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'emergency_support_available', label: 'Emergency Support Available', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'revision_section',
      title: 'Revision & Rework',
      fields: [
        { name: 'revision_rounds_included', label: 'Revision Rounds Included', type: 'number', required: true },
        { name: 'revision_timeline_days', label: 'Revision Timeline (days)', type: 'number', required: false },
        { name: 'rework_due_to_error', label: 'Rework Due to Error', type: 'select', required: false, options: [
          { value: 'free', label: 'Free' },
          { value: 'chargeable', label: 'Chargeable' },
          { value: 'partial', label: 'Partial' }
        ]},
        { name: 'rework_response_time_days', label: 'Rework Response Time (days)', type: 'number', required: false }
      ]
    },
    {
      id: 'payment_section',
      title: 'Payment & Cancellation',
      fields: [
        { name: 'payment_structure', label: 'Payment Structure', type: 'select', required: true, options: [
          { value: 'fixed_fee', label: 'Fixed Fee' },
          { value: 'hourly_rate', label: 'Hourly Rate' },
          { value: 'milestone_based', label: 'Milestone-Based' },
          { value: 'retainer', label: 'Retainer' }
        ]},
        { name: 'cancellation_policy', label: 'Cancellation Policy', type: 'textarea', required: false },
        { name: 'refund_policy', label: 'Refund Policy', type: 'textarea', required: false }
      ]
    },
    {
      id: 'additional_services_section',
      title: 'Additional Services',
      fields: [
        { name: 'additional_services_possible', label: 'Additional Services Possible', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'additional_service_examples', label: 'Additional Service Examples', type: 'textarea', required: false },
        { name: 'additional_service_cost_structure', label: 'Additional Service Cost Structure', type: 'select', required: false, options: [
          { value: 'fixed', label: 'Fixed' },
          { value: 'hourly', label: 'Hourly' },
          { value: 'tbd', label: 'TBD' }
        ]},
        { name: 'hourly_rate_additional', label: 'Hourly Rate (additional)', type: 'number', required: false },
        { name: 'approval_required_for_additional', label: 'Approval Required for Additional', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'cost_estimate_upfront', label: 'Cost Estimate Upfront', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE J: EVENT MANAGEMENT
// 13 distinct sub-services with conditional visibility
// Mandatory: 116 fields (4 Common + 112 sub-service-specific) | Optional: 71 | Total: 187
// ═══════════════════════════════════════════════════════════════════════════════

export const EVENT_MANAGEMENT_FORM: IndustryFormConfig = {
  id: 'event_management',
  name: 'Event Management',
  description: 'Complete event management with 13 distinct sub-services',
  icon: '🎉',
  estimatedTime: 120,
  riskLevel: 'high',
  sections: [
    {
      id: 'service_common',
      title: 'Common Service Fields',
      fields: [
        {
          name: 'service_price',
          label: 'Total service cost in ₹',
          type: 'number',
          required: true
        },
        {
          name: 'payment_schedule',
          label: 'Payment Schedule',
          type: 'select',
          required: true,
          options: [
            { value: 'full_upfront', label: 'Full upfront' },
            { value: 'partial_upfront', label: 'Partial upfront' },
            { value: 'on_delivery', label: 'On delivery' },
            { value: 'milestone_based', label: 'Milestone-based' }
          ]
        },
        {
          name: 'delivery_date',
          label: 'Agreed completion date',
          type: 'date',
          required: true
        },
        {
          name: 'dispute_resolution_days',
          label: 'Days allowed for resolution (default: 30)',
          type: 'number',
          required: true
        }
      ]
    },
    {
      id: 'service_type_selector',
      title: 'Select Event Service Type(s)',
      fields: [
        {
          name: 'service_type',
          label: 'Service Type (Select Multiple)',
          type: 'select',
          required: true,
          multiple: true,
          options: [
            { value: 'event_planner', label: 'Event Planner' },
            { value: 'decoration_team', label: 'Decoration Team' },
            { value: 'catering_service', label: 'Catering Service' },
            { value: 'sound_dj', label: 'Sound & DJ Service' },
            { value: 'lighting_team', label: 'Lighting Team' },
            { value: 'makeup_artist', label: 'Makeup Artist' },
            { value: 'host_mc', label: 'Host / Anchor / MC' },
            { value: 'event_staffing', label: 'Event Staffing' },
            { value: 'logistics_transport', label: 'Logistics & Transport' },
            { value: 'hospitality_support', label: 'Hospitality & Guest Support' },
            { value: 'floral_service', label: 'Floral Service' },
            { value: 'stage_setup', label: 'Stage Setup Team' },
            { value: 'custom_service', label: 'Custom Service' }
          ]
        }
      ]
    },
    {
      id: 'event_planner_section',
      title: '[CONDITIONAL] Event Planner Fields',
      fields: [
        { name: 'event_type', label: 'Event Type', type: 'select', required: true, options: [
          { value: 'wedding', label: 'Wedding' },
          { value: 'corporate', label: 'Corporate' },
          { value: 'birthday', label: 'Birthday' },
          { value: 'anniversary', label: 'Anniversary' },
          { value: 'engagement', label: 'Engagement' },
          { value: 'mehendi', label: 'Mehendi' },
          { value: 'haldi', label: 'Haldi' },
          { value: 'reception', label: 'Reception' },
          { value: 'graduation', label: 'Graduation' },
          { value: 'social', label: 'Social' },
          { value: 'conference', label: 'Conference' },
          { value: 'other', label: 'Other' }
        ]},
        { name: 'event_date', label: 'Event Date', type: 'date', required: true },
        { name: 'event_start_time', label: 'Event Start Time', type: 'text', required: true },
        { name: 'event_end_time', label: 'Event End Time', type: 'text', required: true },
        { name: 'venue_address', label: 'Venue Address', type: 'textarea', required: true },
        { name: 'expected_guest_count', label: 'Expected Guest Count', type: 'number', required: true },
        { name: 'overall_event_scope', label: 'Overall Event Scope', type: 'textarea', required: true },
        { name: 'event_zones_managed', label: 'Event Zones Managed', type: 'select', required: true, multiple: true, options: [
          { value: 'entrance', label: 'Entrance' },
          { value: 'seating', label: 'Seating' },
          { value: 'bar', label: 'Bar' },
          { value: 'food_court', label: 'Food Court' },
          { value: 'dance_floor', label: 'Dance Floor' },
          { value: 'photo_booth', label: 'Photo Booth' },
          { value: 'lounge', label: 'Lounge' },
          { value: 'vip_area', label: 'VIP Area' },
          { value: 'prayer_ritual', label: 'Prayer/Ritual Area' },
          { value: 'kids_zone', label: 'Kids Zone' },
          { value: 'parking', label: 'Parking' },
          { value: 'other', label: 'Other' }
        ]},
        { name: 'planning_tasks_included', label: 'Planning Tasks Included', type: 'select', required: true, multiple: true, options: [
          { value: 'vendor_sourcing', label: 'Vendor sourcing' },
          { value: 'timeline_planning', label: 'Timeline planning' },
          { value: 'budget_management', label: 'Budget management' },
          { value: 'day_of_coordination', label: 'Day-of coordination' },
          { value: 'guest_management', label: 'Guest management' },
          { value: 'setup_coordination', label: 'Setup coordination' },
          { value: 'theme_finalization', label: 'Theme finalization' },
          { value: 'menu_planning', label: 'Menu planning' },
          { value: 'music_selection', label: 'Music selection' },
          { value: 'photography_direction', label: 'Photography direction' }
        ]},
        { name: 'exclusions', label: 'Exclusions', type: 'textarea', required: true },
        { name: 'vendors_to_be_managed', label: 'Vendors to be Managed', type: 'select', required: true, multiple: true, options: [
          { value: 'catering', label: 'Catering' },
          { value: 'decoration', label: 'Decoration' },
          { value: 'photography', label: 'Photography' },
          { value: 'videography', label: 'Videography' },
          { value: 'music_dj', label: 'Music/DJ' },
          { value: 'lighting', label: 'Lighting' },
          { value: 'floral', label: 'Floral' },
          { value: 'other', label: 'Other' }
        ]},
        { name: 'vendor_payments_managed_by', label: 'Vendor Payments Managed By', type: 'select', required: true, options: [
          { value: 'planner', label: 'Planner' },
          { value: 'client', label: 'Client' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'load_in_time', label: 'Load In Time', type: 'text', required: true },
        { name: 'load_out_time', label: 'Load Out Time', type: 'text', required: true },
        { name: 'crowd_management_responsibility', label: 'Crowd Management Responsibility', type: 'select', required: true, options: [
          { value: 'planner', label: 'Planner' },
          { value: 'security_team', label: 'Security team' },
          { value: 'client', label: 'Client' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'emergency_protocol_defined', label: 'Emergency Protocol Defined', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'manpower_required', label: 'Manpower Required', type: 'number', required: true },
        { name: 'approval_required_for_changes', label: 'Approval Required for Changes', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'rain_plan_required', label: 'Rain Plan Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'contingency_budget_percent', label: 'Contingency Budget (%)', type: 'number', required: false },
        { name: 'preferred_vendor_list', label: 'Preferred Vendor List', type: 'textarea', required: false },
        { name: 'client_contact_person', label: 'Client Contact Person', type: 'text', required: false },
        { name: 'backup_contact_person', label: 'Backup Contact Person', type: 'text', required: false },
        { name: 'event_brief_document', label: 'Event Brief Document (URL)', type: 'text', required: false },
        { name: 'post_event_debrief_required', label: 'Post Event Debrief Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'next_event_follow_up', label: 'Next Event Follow Up', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'event_photography_coordinator_included', label: 'Event Photography Coordinator Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'decoration_team_section',
      title: '[CONDITIONAL] Decoration Team Fields',
      fields: [
        { name: 'decor_style', label: 'Decor Style', type: 'text', required: true },
        { name: 'decor_theme_reference_images', label: 'Theme Reference Images (URL, Multi)', type: 'text', required: true },
        { name: 'floral_requirement', label: 'Floral Requirement', type: 'select', required: true, options: [
          { value: 'fresh', label: 'Fresh flowers' },
          { value: 'artificial', label: 'Artificial flowers' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'props_included', label: 'Props Included', type: 'textarea', required: true },
        { name: 'lighting_included_for_decor', label: 'Lighting Included for Decor', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'installation_time_required_hours', label: 'Installation Time (Hours)', type: 'number', required: true },
        { name: 'dismantling_time_required_hours', label: 'Dismantling Time (Hours)', type: 'number', required: true },
        { name: 'decor_variation_tolerance', label: 'Decor Variation Tolerance', type: 'text', required: true },
        { name: 'safety_rigging_required', label: 'Safety Rigging Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'height_clearance_requirement', label: 'Height Clearance Requirement (meters)', type: 'number', required: false },
        { name: 'backdrop_style', label: 'Backdrop Style', type: 'text', required: false },
        { name: 'seating_style', label: 'Seating Style', type: 'text', required: false },
        { name: 'centerpiece_items', label: 'Centerpiece Items', type: 'textarea', required: false },
        { name: 'decor_color_palette', label: 'Decor Color Palette', type: 'text', required: false },
        { name: 'wall_coverage_required', label: 'Wall Coverage Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'ceiling_decoration', label: 'Ceiling Decoration', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'floor_coverage_type', label: 'Floor Coverage Type', type: 'text', required: false },
        { name: 'entrance_arch_style', label: 'Entrance Arch Style', type: 'text', required: false },
        { name: 'stage_backdrop_details', label: 'Stage Backdrop Details', type: 'textarea', required: false },
        { name: 'post_event_decoration_removal', label: 'Post Event Decoration Removal', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'catering_service_section',
      title: '[CONDITIONAL] Catering Service Fields',
      fields: [
        { name: 'menu_items', label: 'Menu Items', type: 'textarea', required: true },
        { name: 'menu_type', label: 'Menu Type', type: 'select', required: true, options: [
          { value: 'vegetarian', label: 'Vegetarian' },
          { value: 'non_vegetarian', label: 'Non-vegetarian' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'pax_count', label: 'Pax Count', type: 'number', required: true },
        { name: 'food_service_type', label: 'Food Service Type', type: 'select', required: true, options: [
          { value: 'buffet', label: 'Buffet' },
          { value: 'plated', label: 'Plated' },
          { value: 'live_counter', label: 'Live counter' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'serving_duration_hours', label: 'Serving Duration (Hours)', type: 'number', required: true },
        { name: 'cutlery_provided', label: 'Cutlery Provided', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'server_staff_count', label: 'Server Staff Count', type: 'number', required: true },
        { name: 'food_wastage_policy', label: 'Food Wastage Policy', type: 'textarea', required: true },
        { name: 'cleanup_responsibility', label: 'Cleanup Responsibility', type: 'select', required: true, options: [
          { value: 'client', label: 'Client' },
          { value: 'caterer', label: 'Caterer' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'live_counter_required', label: 'Live Counter Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'live_counter_items', label: 'Live Counter Items', type: 'textarea', required: false },
        { name: 'food_tasting_session_included', label: 'Food Tasting Session Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'allergen_information_provided', label: 'Allergen Information Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'kitchen_setup_required', label: 'Kitchen Setup Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'electricity_load_required_kw', label: 'Electricity Load Required (KW)', type: 'number', required: false },
        { name: 'beverage_options', label: 'Beverage Options', type: 'textarea', required: false },
        { name: 'mocktail_menu', label: 'Mocktail Menu', type: 'textarea', required: false },
        { name: 'dessert_station_included', label: 'Dessert Station Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'dietary_restrictions_catered_for', label: 'Dietary Restrictions Catered For', type: 'textarea', required: false },
        { name: 'crockery_glassware_type', label: 'Crockery Glassware Type', type: 'text', required: false },
        { name: 'serving_temperature_maintained', label: 'Serving Temperature Maintained', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'leftover_food_policy', label: 'Leftover Food Policy', type: 'text', required: false },
        { name: 'catering_equipment_provided', label: 'Catering Equipment Provided', type: 'textarea', required: false },
        { name: 'bar_service_staff_included', label: 'Bar Service Staff Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'guest_dietary_form_required', label: 'Guest Dietary Form Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'sound_dj_section',
      title: '[CONDITIONAL] Sound & DJ Service Fields',
      fields: [
        { name: 'sound_system_type', label: 'Sound System Type', type: 'select', required: true, options: [
          { value: 'basic', label: 'Basic' },
          { value: 'professional', label: 'Professional' },
          { value: 'concert_grade', label: 'Concert-grade' }
        ]},
        { name: 'equipment_list', label: 'Equipment List', type: 'textarea', required: true },
        { name: 'dj_performance_duration_hours', label: 'DJ Performance Duration (Hours)', type: 'number', required: true },
        { name: 'noise_restriction_compliant', label: 'Noise Restriction Compliant', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'power_requirement_kw', label: 'Power Requirement (KW)', type: 'number', required: true },
        { name: 'sound_check_time_required', label: 'Sound Check Time Required', type: 'text', required: true },
        { name: 'playlist_preference', label: 'Playlist Preference', type: 'textarea', required: false },
        { name: 'genre_preferences', label: 'Genre Preferences', type: 'select', required: false, multiple: true, options: [
          { value: 'bollywood', label: 'Bollywood' },
          { value: 'bhangra', label: 'Bhangra' },
          { value: 'electronic', label: 'Electronic' },
          { value: 'pop', label: 'Pop' },
          { value: 'rock', label: 'Rock' },
          { value: 'classical', label: 'Classical' }
        ]},
        { name: 'backup_speaker_available', label: 'Backup Speaker Available', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'mc_or_announcer_included', label: 'MC or Announcer Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'dj_table_required', label: 'DJ Table Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'custom_mixing_available', label: 'Custom Mixing Available', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'mic_for_speeches_included', label: 'Mic for Speeches Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'wireless_microphone_count', label: 'Wireless Microphone Count', type: 'number', required: false },
        { name: 'sound_mixing_board_quality', label: 'Sound Mixing Board Quality', type: 'text', required: false },
        { name: 'cable_length_requirements', label: 'Cable Length Requirements', type: 'text', required: false },
        { name: 'backup_dj_available', label: 'Backup DJ Available', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'music_licensing_handled', label: 'Music Licensing Handled', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'sound_engineer_included', label: 'Sound Engineer Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'ambient_background_music_duration', label: 'Ambient Background Music Duration', type: 'text', required: false }
      ]
    },
    {
      id: 'lighting_team_section',
      title: '[CONDITIONAL] Lighting Team Fields',
      fields: [
        { name: 'lighting_types_required', label: 'Lighting Types Required', type: 'select', required: true, multiple: true, options: [
          { value: 'stage_lights', label: 'Stage lights' },
          { value: 'uplights', label: 'Uplights' },
          { value: 'fairy_lights', label: 'Fairy lights' },
          { value: 'spotlights', label: 'Spotlights' },
          { value: 'wash_lights', label: 'Wash lights' },
          { value: 'dmx_programmable', label: 'DMX programmable lights' }
        ]},
        { name: 'lighting_design_brief', label: 'Lighting Design Brief', type: 'textarea', required: true },
        { name: 'power_load_requirement_kw', label: 'Power Load Requirement (KW)', type: 'number', required: true },
        { name: 'installation_time_required_hours', label: 'Installation Time (Hours)', type: 'number', required: true },
        { name: 'lighting_rigging_requirements', label: 'Lighting Rigging Requirements', type: 'text', required: false },
        { name: 'dismantling_time_hours', label: 'Dismantling Time (Hours)', type: 'number', required: false },
        { name: 'light_operator_required', label: 'Light Operator Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'control_console_included', label: 'Control Console Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'generator_backup_required', label: 'Generator Backup Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'lighting_color_schemes', label: 'Lighting Color Schemes', type: 'select', required: false, multiple: true, options: [
          { value: 'warm', label: 'Warm' },
          { value: 'cool', label: 'Cool' },
          { value: 'multi_color', label: 'Multi-color' },
          { value: 'custom', label: 'Custom' }
        ]},
        { name: 'dynamic_lighting_changes', label: 'Dynamic Lighting Changes', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'backup_lights_available', label: 'Backup Lights Available', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'lighting_effect_preferences', label: 'Lighting Effect Preferences', type: 'textarea', required: false },
        { name: 'synchronized_with_music', label: 'Synchronized with Music', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'follow_spots_required', label: 'Follow Spots Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'laseshow_available', label: 'Laseshow Available', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'control_panel_location', label: 'Control Panel Location', type: 'text', required: false },
        { name: 'power_distribution_points', label: 'Power Distribution Points', type: 'number', required: false },
        { name: 'lighting_maintenance_during_event', label: 'Lighting Maintenance During Event', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'post_event_equipment_storage', label: 'Post Event Equipment Storage', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'makeup_artist_section',
      title: '[CONDITIONAL] Makeup Artist Fields',
      fields: [
        { name: 'makeup_style_required', label: 'Makeup Style Required', type: 'text', required: true },
        { name: 'trial_session_included', label: 'Trial Session Included', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'skin_allergy_disclaimer_accepted', label: 'Skin Allergy Disclaimer Accepted', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'products_used', label: 'Products Used', type: 'textarea', required: false },
        { name: 'hair_styling_included', label: 'Hair Styling Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'touchup_sessions_included', label: 'Touchup Sessions Included', type: 'number', required: false },
        { name: 'travel_charges_applicable', label: 'Travel Charges Applicable', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'before_after_photos_allowed', label: 'Before After Photos Allowed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'makeup_theme_coordination', label: 'Makeup Theme Coordination', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'bridal_trial_date', label: 'Bridal Trial Date', type: 'date', required: false },
        { name: 'trial_location_preference', label: 'Trial Location Preference', type: 'text', required: false },
        { name: 'product_substitution_allowed', label: 'Product Substitution Allowed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'on_site_setup_time_required', label: 'On-Site Setup Time Required (minutes)', type: 'number', required: false },
        { name: 'airbrush_makeup_available', label: 'Airbrush Makeup Available', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'makeup_removal_service_included', label: 'Makeup Removal Service Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'host_mc_section',
      title: '[CONDITIONAL] Host / Anchor / MC Fields',
      fields: [
        { name: 'host_language_preferences', label: 'Host Language Preferences', type: 'select', required: true, multiple: true, options: [
          { value: 'english', label: 'English' },
          { value: 'hindi', label: 'Hindi' },
          { value: 'regional', label: 'Regional languages' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'hosting_duration_hours', label: 'Hosting Duration (Hours)', type: 'number', required: true },
        { name: 'script_required', label: 'Script Required', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'script_provided_by', label: 'Script Provided By', type: 'select', required: true, options: [
          { value: 'client', label: 'Client' },
          { value: 'host', label: 'Host' }
        ]},
        { name: 'rehearsal_required', label: 'Rehearsal Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'rehearsal_duration_hours', label: 'Rehearsal Duration (Hours)', type: 'number', required: false },
        { name: 'dress_code', label: 'Dress Code', type: 'text', required: false },
        { name: 'crowd_interaction_level', label: 'Crowd Interaction Level', type: 'select', required: false, options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' }
        ]},
        { name: 'script_customization_allowed', label: 'Script Customization Allowed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'event_flow_documentation', label: 'Event Flow Documentation', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'guest_name_pronunciation_help', label: 'Guest Name Pronunciation Help', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'on_site_coordination_required', label: 'On-Site Coordination Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'backup_host_available', label: 'Backup Host Available', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'post_event_feedback_session', label: 'Post Event Feedback Session', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'event_staffing_section',
      title: '[CONDITIONAL] Event Staffing Fields',
      fields: [
        { name: 'staff_type', label: 'Staff Type', type: 'select', required: true, options: [
          { value: 'bouncers', label: 'Bouncers' },
          { value: 'ushers', label: 'Ushers' },
          { value: 'volunteers', label: 'Volunteers' },
          { value: 'helpers', label: 'Helpers' },
          { value: 'security', label: 'Security' }
        ]},
        { name: 'staff_count', label: 'Staff Count', type: 'number', required: true },
        { name: 'duty_hours', label: 'Duty Hours', type: 'text', required: true },
        { name: 'uniform_required', label: 'Uniform Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'food_arrangement_responsibility', label: 'Food Arrangement Responsibility', type: 'select', required: true, options: [
          { value: 'client', label: 'Client' },
          { value: 'service_provider', label: 'Service provider' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'entry_exit_management_required', label: 'Entry Exit Management Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'crowd_control_level', label: 'Crowd Control Level', type: 'select', required: false, options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' }
        ]},
        { name: 'staff_training_provided', label: 'Staff Training Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'briefing_document_required', label: 'Briefing Document Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'background_verification_done', label: 'Background Verification Done', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'communication_devices_provided', label: 'Communication Devices Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'emergency_response_training', label: 'Emergency Response Training', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'post_event_report_required', label: 'Post Event Report Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'logistics_transport_section',
      title: '[CONDITIONAL] Logistics & Transport Fields',
      fields: [
        { name: 'logistics_type', label: 'Logistics Type', type: 'select', required: true, options: [
          { value: 'guest_transport', label: 'Guest transport' },
          { value: 'vendor_transport', label: 'Vendor transport' },
          { value: 'equipment_transport', label: 'Equipment transport' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'vehicle_type', label: 'Vehicle Type', type: 'select', required: true, options: [
          { value: 'car', label: 'Car' },
          { value: 'tempo', label: 'Tempo' },
          { value: 'truck', label: 'Truck' },
          { value: 'bus', label: 'Bus' },
          { value: 'multiple', label: 'Multiple vehicles' }
        ]},
        { name: 'vehicle_count', label: 'Vehicle Count', type: 'number', required: true },
        { name: 'load_in_time', label: 'Load In Time', type: 'text', required: true },
        { name: 'load_out_time', label: 'Load Out Time', type: 'text', required: true },
        { name: 'kilometer_limit', label: 'Kilometer Limit', type: 'number', required: false },
        { name: 'driver_details_required', label: 'Driver Details Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'toll_parking_included', label: 'Toll Parking Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'pickup_drop_locations', label: 'Pickup Drop Locations', type: 'textarea', required: false },
        { name: 'fuel_charges_included', label: 'Fuel Charges Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'vehicle_decoration_required', label: 'Vehicle Decoration Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'insurance_coverage', label: 'Insurance Coverage', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'driver_uniform_required', label: 'Driver Uniform Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'vehicle_capacity_details', label: 'Vehicle Capacity Details', type: 'text', required: false },
        { name: 'waiting_time_charges', label: 'Waiting Time Charges (per hour)', type: 'number', required: false },
        { name: 'return_trip_included', label: 'Return Trip Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'hospitality_support_section',
      title: '[CONDITIONAL] Hospitality & Guest Support Fields',
      fields: [
        { name: 'hospitality_team_size', label: 'Hospitality Team Size', type: 'number', required: true },
        { name: 'guest_welcome_kit_included', label: 'Guest Welcome Kit Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'seating_management_required', label: 'Seating Management Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'vip_guest_handling_required', label: 'VIP Guest Handling Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'lost_and_found_management', label: 'Lost and Found Management', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'water_station_setup', label: 'Water Station Setup', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'queue_management', label: 'Queue Management', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'guest_feedback_collection', label: 'Guest Feedback Collection', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'guest_assistance_areas', label: 'Guest Assistance Areas', type: 'select', required: false, multiple: true, options: [
          { value: 'registration', label: 'Registration' },
          { value: 'information', label: 'Information' },
          { value: 'washroom', label: 'Washroom' },
          { value: 'parking', label: 'Parking' },
          { value: 'security', label: 'Security' }
        ]},
        { name: 'information_desk_required', label: 'Information Desk Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'guest_accommodation_assistance', label: 'Guest Accommodation Assistance', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'transportation_assistance_provided', label: 'Transportation Assistance Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'special_needs_accommodation', label: 'Special Needs Accommodation', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'complaint_resolution_protocol', label: 'Complaint Resolution Protocol', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'guest_comfort_items_provided', label: 'Guest Comfort Items Provided', type: 'textarea', required: false },
        { name: 'post_event_thank_you_coordination', label: 'Post Event Thank You Coordination', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'guest_database_management', label: 'Guest Database Management', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'vip_lounge_management', label: 'VIP Lounge Management', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'floral_service_section',
      title: '[CONDITIONAL] Floral Service Fields',
      fields: [
        { name: 'flower_type_preference', label: 'Flower Type Preference', type: 'text', required: true },
        { name: 'flower_quantity', label: 'Flower Quantity', type: 'text', required: true },
        { name: 'fresh_or_artificial', label: 'Fresh or Artificial', type: 'select', required: true, options: [
          { value: 'fresh', label: 'Fresh' },
          { value: 'artificial', label: 'Artificial' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'seasonal_flower_variation_accepted', label: 'Seasonal Flower Variation Accepted', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'bouquet_count', label: 'Bouquet Count', type: 'number', required: false },
        { name: 'floral_installation_required', label: 'Floral Installation Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'water_supply_required', label: 'Water Supply Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'replacement_frequency', label: 'Replacement Frequency', type: 'text', required: false },
        { name: 'flower_color_palette', label: 'Flower Color Palette', type: 'text', required: false },
        { name: 'floral_arrangement_style', label: 'Floral Arrangement Style', type: 'text', required: false },
        { name: 'fragrance_preference', label: 'Fragrance Preference', type: 'text', required: false },
        { name: 'allergenic_flowers_avoided', label: 'Allergenic Flowers Avoided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'floral_preservation_tips', label: 'Floral Preservation Tips', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'post_event_flower_disposal', label: 'Post Event Flower Disposal', type: 'text', required: false }
      ]
    },
    {
      id: 'stage_setup_section',
      title: '[CONDITIONAL] Stage Setup Team Fields',
      fields: [
        { name: 'stage_type', label: 'Stage Type', type: 'text', required: true },
        { name: 'stage_dimensions', label: 'Stage Dimensions', type: 'text', required: true },
        { name: 'stage_safety_certification', label: 'Stage Safety Certification', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'installation_time_hours', label: 'Installation Time (Hours)', type: 'number', required: true },
        { name: 'carpet_required', label: 'Carpet Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'steps_required', label: 'Steps Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'stage_load_capacity', label: 'Stage Load Capacity (kg)', type: 'number', required: false },
        { name: 'backdrop_attachment_points', label: 'Backdrop Attachment Points', type: 'number', required: false },
        { name: 'electrical_outlets_required', label: 'Electrical Outlets Required', type: 'number', required: false },
        { name: 'stage_height_adjustable', label: 'Stage Height Adjustable', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'microphone_stands_included', label: 'Microphone Stands Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'stage_railing_required', label: 'Stage Railing Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'stage_covering_material', label: 'Stage Covering Material', type: 'text', required: false },
        { name: 'post_event_dismantling_included', label: 'Post Event Dismantling Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'storage_of_stage_material', label: 'Storage of Stage Material', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'custom_service_section',
      title: '[CONDITIONAL] Custom Service Fields',
      fields: [
        { name: 'custom_service_title', label: 'Custom Service Title', type: 'text', required: true },
        { name: 'custom_service_description', label: 'Custom Service Description', type: 'textarea', required: true },
        { name: 'materials_required', label: 'Materials Required', type: 'textarea', required: false },
        { name: 'on_site_requirements', label: 'On-Site Requirements', type: 'textarea', required: false },
        { name: 'delivery_format', label: 'Delivery Format', type: 'textarea', required: false },
        { name: 'risk_factors', label: 'Risk Factors', type: 'textarea', required: false },
        { name: 'vendor_coordination_needed', label: 'Vendor Coordination Needed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'setup_time_required', label: 'Setup Time Required (hours)', type: 'number', required: false },
        { name: 'breakdown_time_required', label: 'Breakdown Time Required (hours)', type: 'number', required: false },
        { name: 'insurance_required', label: 'Insurance Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'additional_cost_factors', label: 'Additional Cost Factors', type: 'textarea', required: false }
      ]
    }
  ]
};

export default {
  DIGITAL_MARKETING_FORM,
  CONSULTING_FORM,
  EVENT_MANAGEMENT_FORM
};
