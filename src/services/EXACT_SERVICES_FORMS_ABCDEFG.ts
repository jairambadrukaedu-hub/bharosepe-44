/**
 * EXACT SERVICE FORMS - FROM REFINED_FORM_FIELDS_MANDATORY_OPTIONAL.md (Lines 788-1700+)
 * All 10 Services with EXACT field names, types, and configurations
 * NO MODIFICATIONS - Fields copied directly from specification
 */

import { IndustryFormConfig, FormField } from '../components/forms/IndustryFormBuilder';

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE A: SOFTWARE / APP / WEBSITE DEVELOPMENT
// Mandatory: 17 (4 common + 13 specific) | Optional: 30 | Total: 47
// ═══════════════════════════════════════════════════════════════════════════════

export const SOFTWARE_DEVELOPMENT_FORM: IndustryFormConfig = {
  id: 'software',
  name: 'Software / App / Website Development',
  description: 'Custom software, web, and mobile application development services',
  icon: '💻',
  estimatedTime: 60,
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
      id: 'section_1',
      title: 'Section 1: Project Identity',
      fields: [
        { name: 'project_title', label: 'Project Title', type: 'text', required: true },
        { name: 'project_type', label: 'Project Type', type: 'select', required: true, options: [
          { value: 'web_app', label: 'Web Application' },
          { value: 'mobile_app', label: 'Mobile Application' },
          { value: 'website', label: 'Website' },
          { value: 'desktop_app', label: 'Desktop Application' }
        ]},
        { name: 'project_description', label: 'Project Description', type: 'textarea', required: false },
        { name: 'business_use_case', label: 'Business Use Case', type: 'textarea', required: true },
        { name: 'criticality_level', label: 'Criticality Level', type: 'select', required: true, options: [
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
          { value: 'critical', label: 'Critical' }
        ]},
        { name: 'team_size_allocation', label: 'Team Size Allocation', type: 'number', required: false },
        { name: 'project_methodology', label: 'Project Methodology', type: 'select', required: false, options: [
          { value: 'agile', label: 'Agile' },
          { value: 'waterfall', label: 'Waterfall' },
          { value: 'hybrid', label: 'Hybrid' }
        ]}
      ]
    },
    {
      id: 'section_2',
      title: 'Section 2: Scope of Work',
      fields: [
        { name: 'features', label: 'Features (Up to 50 features)', type: 'textarea', required: true },
        { name: 'user_roles', label: 'User Roles (Up to 20 roles)', type: 'textarea', required: true },
        { name: 'supported_devices', label: 'Supported Devices', type: 'text', required: true },
        { name: 'page_load_time_desktop', label: 'Page Load Time - Desktop', type: 'text', required: false },
        { name: 'page_load_time_mobile', label: 'Page Load Time - Mobile', type: 'text', required: false },
        { name: 'api_response_time', label: 'API Response Time', type: 'text', required: false },
        { name: 'concurrent_users_expected', label: 'Expected Concurrent Users', type: 'number', required: false },
        { name: 'supported_browsers', label: 'Supported Browsers', type: 'text', required: false },
        { name: 'integrations', label: 'Integrations', type: 'textarea', required: false }
      ]
    },
    {
      id: 'section_3',
      title: 'Section 3: Tech Stack',
      fields: [
        { name: 'frontend_technology', label: 'Frontend Technology', type: 'text', required: true },
        { name: 'backend_technology', label: 'Backend Technology', type: 'text', required: true },
        { name: 'database_type', label: 'Database Type', type: 'select', required: true, options: [
          { value: 'sql', label: 'SQL (Relational)' },
          { value: 'nosql', label: 'NoSQL' },
          { value: 'both', label: 'Both' }
        ]}
      ]
    },
    {
      id: 'section_4',
      title: 'Section 4: Design',
      fields: [
        { name: 'design_preference', label: 'Design Preference', type: 'text', required: false },
        { name: 'design_reference_links', label: 'Design Reference Links', type: 'textarea', required: false },
        { name: 'color_palette', label: 'Color Palette', type: 'text', required: false },
        { name: 'responsive_breakpoints', label: 'Responsive Breakpoints', type: 'text', required: false },
        { name: 'accessibility_requirements', label: 'Accessibility Requirements', type: 'text', required: false },
        { name: 'branding_guidelines_provided', label: 'Branding Guidelines Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'ui_framework_preference', label: 'UI Framework Preference', type: 'text', required: false }
      ]
    },
    {
      id: 'section_5',
      title: 'Section 5: Deployment',
      fields: [
        { name: 'deployment_environment', label: 'Deployment Environment', type: 'select', required: false, options: [
          { value: 'aws', label: 'AWS' },
          { value: 'azure', label: 'Azure' },
          { value: 'gcp', label: 'Google Cloud' }
        ]},
        { name: 'deployment_regions', label: 'Deployment Regions', type: 'text', required: false },
        { name: 'ssl_https_required', label: 'SSL/HTTPS Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'backup_recovery_plan', label: 'Backup & Recovery Plan', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_6',
      title: 'Section 6: Testing',
      fields: [
        { name: 'testing_scope', label: 'Testing Scope', type: 'select', required: false, options: [
          { value: 'unit', label: 'Unit Testing' },
          { value: 'integration', label: 'Integration Testing' },
          { value: 'e2e', label: 'End-to-End Testing' }
        ]},
        { name: 'browser_testing_required', label: 'Browser Testing Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'device_testing_required', label: 'Device Testing Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'load_testing_threshold', label: 'Load Testing Threshold', type: 'number', required: false }
      ]
    },
    {
      id: 'section_7',
      title: 'Section 7: Support',
      fields: [
        { name: 'post_launch_support_months', label: 'Post-Launch Support (Months)', type: 'number', required: false },
        { name: 'bug_fix_sla_response_hours', label: 'Bug Fix SLA Response (Hours)', type: 'number', required: false },
        { name: 'liability_cap_type', label: 'Liability Cap Type', type: 'select', required: false, options: [
          { value: 'percentage', label: 'Percentage' },
          { value: 'fixed', label: 'Fixed Amount' }
        ]},
        { name: 'ip_ownership', label: 'IP Ownership', type: 'select', required: false, options: [
          { value: 'client', label: 'Client' },
          { value: 'developer', label: 'Developer' },
          { value: 'shared', label: 'Shared' }
        ]}
      ]
    },
    {
      id: 'section_8',
      title: 'Section 8: Deliverables',
      fields: [
        { name: 'deliverable_format', label: 'Deliverable Format', type: 'text', required: true },
        { name: 'code_repository_access', label: 'Code Repository Access', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'milestone_based_delivery', label: 'Milestone-Based Delivery', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_9',
      title: 'Section 9: Timeline',
      fields: [
        { name: 'total_estimated_hours', label: 'Total Estimated Hours', type: 'number', required: true }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE B: UI/UX DESIGN & GRAPHIC DESIGN
// Mandatory: 11 (4 common + 7 specific) | Optional: 31 | Total: 42
// ═══════════════════════════════════════════════════════════════════════════════

export const UI_UX_DESIGN_FORM: IndustryFormConfig = {
  id: 'design',
  name: 'UI/UX Design & Graphic Design',
  description: 'Professional UI/UX and graphic design services',
  icon: '🎨',
  estimatedTime: 45,
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
      id: 'section_1',
      title: 'Section 1: Project Definition',
      fields: [
        { name: 'project_title', label: 'Project Title', type: 'text', required: true },
        { name: 'design_type', label: 'Design Type', type: 'select', required: true, options: [
          { value: 'ui_design', label: 'UI Design' },
          { value: 'ux_design', label: 'UX Design' },
          { value: 'graphic_design', label: 'Graphic Design' },
          { value: 'both', label: 'Both UI/UX' }
        ]},
        { name: 'business_use_case', label: 'Business Use Case', type: 'textarea', required: true },
        { name: 'industry_domain', label: 'Industry Domain', type: 'select', required: true, options: [
          { value: 'tech', label: 'Technology' },
          { value: 'retail', label: 'Retail' },
          { value: 'finance', label: 'Finance' },
          { value: 'healthcare', label: 'Healthcare' },
          { value: 'other', label: 'Other' }
        ]},
        { name: 'brand_guidelines_provided', label: 'Brand Guidelines Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'brand_logo_files', label: 'Brand Logo Files', type: 'text', required: false },
        { name: 'brand_colors_provided', label: 'Brand Colors Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_2',
      title: 'Section 2: Brand',
      fields: [
        { name: 'brand_voice_document_provided', label: 'Brand Voice Document Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'font_selection_preference', label: 'Font Selection Preference', type: 'text', required: false },
        { name: 'font_licenses_required', label: 'Font Licenses Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'font_fallback_support', label: 'Font Fallback Support', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'typography_guidelines', label: 'Typography Guidelines', type: 'textarea', required: false }
      ]
    },
    {
      id: 'section_3',
      title: 'Section 3: Deliverables',
      fields: [
        { name: 'screen_count', label: 'Screen Count', type: 'number', required: true },
        { name: 'design_style', label: 'Design Style', type: 'select', required: true, options: [
          { value: 'minimalist', label: 'Minimalist' },
          { value: 'modern', label: 'Modern' },
          { value: 'flat', label: 'Flat' },
          { value: 'custom', label: 'Custom' }
        ]},
        { name: 'color_palette_option', label: 'Color Palette Option', type: 'select', required: true, options: [
          { value: 'single', label: 'Single Color' },
          { value: 'dual', label: 'Dual Color' },
          { value: 'multi', label: 'Multi Color' }
        ]},
        { name: 'logo_concept_count', label: 'Logo Concept Count', type: 'number', required: false },
        { name: 'banner_variation_count', label: 'Banner Variation Count', type: 'number', required: false },
        { name: 'social_post_count', label: 'Social Post Count', type: 'number', required: false },
        { name: 'packaging_mockup_count', label: 'Packaging Mockup Count', type: 'number', required: false },
        { name: 'illustration_count', label: 'Illustration Count', type: 'number', required: false },
        { name: 'ux_flow_count', label: 'UX Flow Count', type: 'number', required: false },
        { name: 'design_style_description', label: 'Design Style Description', type: 'textarea', required: false },
        { name: 'reference_links', label: 'Reference Links', type: 'textarea', required: false },
        { name: 'competitor_analysis_links', label: 'Competitor Analysis Links', type: 'textarea', required: false },
        { name: 'inspiration_board_attached', label: 'Inspiration Board Attached', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'style_guidelines_provided', label: 'Style Guidelines Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'brand_color_codes', label: 'Brand Color Codes', type: 'textarea', required: false },
        { name: 'color_preference_description', label: 'Color Preference Description', type: 'textarea', required: false }
      ]
    },
    {
      id: 'section_4',
      title: 'Section 4: Files',
      fields: [
        { name: 'file_formats_required', label: 'File Formats Required', type: 'text', required: true },
        { name: 'source_files_included', label: 'Source Files Included', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'web_optimized_files', label: 'Web Optimized Files', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'print_optimized_files', label: 'Print Optimized Files', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_5',
      title: 'Section 5: Revisions',
      fields: [
        { name: 'revision_scope', label: 'Revision Scope', type: 'select', required: true, options: [
          { value: 'limited', label: 'Limited' },
          { value: 'comprehensive', label: 'Comprehensive' }
        ]},
        { name: 'revision_rounds_included', label: 'Revision Rounds Included', type: 'number', required: true },
        { name: 'revision_timeline_days', label: 'Revision Timeline (Days)', type: 'number', required: true }
      ]
    },
    {
      id: 'section_6',
      title: 'Section 6: Usage Rights',
      fields: [
        { name: 'exclusive_rights', label: 'Exclusive Rights', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'portfolio_usage_allowed', label: 'Portfolio Usage Allowed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'credit_attribution_required', label: 'Credit Attribution Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE C: CONTENT WRITING / COPYWRITING
// Mandatory: 15 (4 common + 11 specific) | Optional: 42 | Total: 57
// ═══════════════════════════════════════════════════════════════════════════════

export const CONTENT_WRITING_FORM: IndustryFormConfig = {
  id: 'content',
  name: 'Content Writing / Copywriting',
  description: 'Professional content writing and copywriting services',
  icon: '✍️',
  estimatedTime: 50,
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
      id: 'section_1',
      title: 'Section 1: Project Definition',
      fields: [
        { name: 'project_title', label: 'Project Title', type: 'text', required: true },
        { name: 'content_type', label: 'Content Type', type: 'select', required: true, options: [
          { value: 'blog', label: 'Blog Articles' },
          { value: 'social', label: 'Social Media' },
          { value: 'product', label: 'Product Descriptions' },
          { value: 'copywriting', label: 'Copywriting' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'industry_domain', label: 'Industry Domain', type: 'select', required: true, options: [
          { value: 'tech', label: 'Technology' },
          { value: 'finance', label: 'Finance' },
          { value: 'health', label: 'Health' },
          { value: 'ecommerce', label: 'E-commerce' },
          { value: 'other', label: 'Other' }
        ]}
      ]
    },
    {
      id: 'section_2',
      title: 'Section 2: Word Count',
      fields: [
        { name: 'content_length_type', label: 'Content Length Type', type: 'select', required: true, options: [
          { value: 'short', label: 'Short (< 500 words)' },
          { value: 'medium', label: 'Medium (500-1000 words)' },
          { value: 'long', label: 'Long (> 1000 words)' }
        ]},
        { name: 'minimum_word_count', label: 'Minimum Word Count', type: 'number', required: true },
        { name: 'maximum_word_deviation_percent', label: 'Maximum Word Deviation (%)', type: 'number', required: false },
        { name: 'short_form_specs', label: 'Short Form Specs', type: 'textarea', required: false },
        { name: 'reading_time_target', label: 'Reading Time Target (minutes)', type: 'number', required: false }
      ]
    },
    {
      id: 'section_3',
      title: 'Section 3: Deliverables',
      fields: [
        { name: 'blog_article_count', label: 'Blog Article Count', type: 'number', required: true },
        { name: 'social_caption_count', label: 'Social Caption Count', type: 'number', required: true },
        { name: 'product_description_count', label: 'Product Description Count', type: 'number', required: false },
        { name: 'ad_copy_count', label: 'Ad Copy Count', type: 'number', required: false },
        { name: 'video_script_count', label: 'Video Script Count', type: 'number', required: false },
        { name: 'email_sequence_count', label: 'Email Sequence Count', type: 'number', required: false },
        { name: 'page_count', label: 'Page Count', type: 'number', required: false }
      ]
    },
    {
      id: 'section_4',
      title: 'Section 4: Tone & Voice',
      fields: [
        { name: 'tone_of_voice', label: 'Tone of Voice', type: 'select', required: true, options: [
          { value: 'formal', label: 'Formal' },
          { value: 'casual', label: 'Casual' },
          { value: 'professional', label: 'Professional' },
          { value: 'creative', label: 'Creative' }
        ]},
        { name: 'target_demographic', label: 'Target Demographic', type: 'textarea', required: true },
        { name: 'tone_of_voice_custom_description', label: 'Custom Tone Description', type: 'textarea', required: false },
        { name: 'voice_consistency_required', label: 'Voice Consistency Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'brand_voice_guide_provided', label: 'Brand Voice Guide Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'personality_brand_traits', label: 'Personality & Brand Traits', type: 'textarea', required: false }
      ]
    },
    {
      id: 'section_5',
      title: 'Section 5: Target Audience',
      fields: [
        { name: 'audience_persona_description', label: 'Audience Persona Description', type: 'textarea', required: false },
        { name: 'content_purpose', label: 'Content Purpose', type: 'select', required: false, options: [
          { value: 'awareness', label: 'Awareness' },
          { value: 'conversion', label: 'Conversion' },
          { value: 'retention', label: 'Retention' },
          { value: 'education', label: 'Education' }
        ]},
        { name: 'primary_language', label: 'Primary Language', type: 'select', required: false, options: [
          { value: 'english', label: 'English' },
          { value: 'hindi', label: 'Hindi' },
          { value: 'other', label: 'Other' }
        ]},
        { name: 'language_proficiency_level', label: 'Language Proficiency Level', type: 'select', required: false, options: [
          { value: 'basic', label: 'Basic' },
          { value: 'intermediate', label: 'Intermediate' },
          { value: 'advanced', label: 'Advanced' }
        ]}
      ]
    },
    {
      id: 'section_6',
      title: 'Section 6: SEO',
      fields: [
        { name: 'seo_optimization_required', label: 'SEO Optimization Required', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'primary_keywords', label: 'Primary Keywords', type: 'textarea', required: false },
        { name: 'keyword_density_target', label: 'Keyword Density Target (%)', type: 'number', required: false },
        { name: 'meta_description_included', label: 'Meta Description Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'internal_linking_required', label: 'Internal Linking Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_7',
      title: 'Section 7: Research',
      fields: [
        { name: 'research_included', label: 'Research Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'fact_checking_required', label: 'Fact Checking Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'source_citations_required', label: 'Source Citations Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'expert_interviews_included', label: 'Expert Interviews Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_8',
      title: 'Section 8: Formatting',
      fields: [
        { name: 'heading_hierarchy_required', label: 'Heading Hierarchy Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'bullet_points_allowed', label: 'Bullet Points Allowed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'tables_infographics_included', label: 'Tables/Infographics Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'call_to_action_required', label: 'Call to Action Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_9',
      title: 'Section 9: Revisions',
      fields: [
        { name: 'revision_rounds_included', label: 'Revision Rounds Included', type: 'number', required: true },
        { name: 'revision_scope', label: 'Revision Scope', type: 'select', required: false, options: [
          { value: 'limited', label: 'Limited' },
          { value: 'comprehensive', label: 'Comprehensive' }
        ]},
        { name: 'revision_turnaround_days', label: 'Revision Turnaround (Days)', type: 'number', required: false }
      ]
    },
    {
      id: 'section_10',
      title: 'Section 10: Deliverables Format',
      fields: [
        { name: 'file_format_required', label: 'File Format Required', type: 'select', required: false, options: [
          { value: 'word', label: 'Word Document' },
          { value: 'google_doc', label: 'Google Doc' },
          { value: 'html', label: 'HTML' },
          { value: 'markdown', label: 'Markdown' }
        ]},
        { name: 'plagiarism_check_included', label: 'Plagiarism Check Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'plagiarism_threshold_percent', label: 'Plagiarism Threshold (%)', type: 'number', required: false }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE D: PHOTOGRAPHY & VIDEOGRAPHY
// Mandatory: 15+ (4 common + 11+ specific + conditionals) | Optional: 35 | Total: 50+
// ═══════════════════════════════════════════════════════════════════════════════

export const PHOTOGRAPHY_VIDEOGRAPHY_FORM: IndustryFormConfig = {
  id: 'photography',
  name: 'Photography & Videography',
  description: 'Professional photography and videography services',
  icon: '📷',
  estimatedTime: 55,
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
      id: 'section_1',
      title: 'Section 1: Shoot Type',
      fields: [
        { name: 'shoot_type', label: 'Shoot Type', type: 'select', required: true, options: [
          { value: 'photos_only', label: 'Photos Only' },
          { value: 'videos_only', label: 'Videos Only' },
          { value: 'both', label: 'Both' }
        ]},
        { name: 'project_title', label: 'Project Title', type: 'text', required: true },
        { name: 'shoot_date', label: 'Shoot Date(s)', type: 'date', required: true }
      ]
    },
    {
      id: 'section_2',
      title: 'Section 2: Coverage',
      fields: [
        { name: 'shoot_locations', label: 'Shoot Locations', type: 'textarea', required: true },
        { name: 'coverage_hours_total', label: 'Total Coverage Hours', type: 'number', required: true },
        { name: 'coverage_start_time', label: 'Coverage Start Time', type: 'text', required: false },
        { name: 'coverage_end_time', label: 'Coverage End Time', type: 'text', required: false },
        { name: 'coverage_break_policy', label: 'Coverage Break Policy', type: 'textarea', required: false },
        { name: 'photographer_count', label: 'Photographer Count', type: 'number', required: false },
        { name: 'videographer_count', label: 'Videographer Count', type: 'number', required: false },
        { name: 'backup_coverage_required', label: 'Backup Coverage Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'shot_types_required', label: 'Shot Types Required', type: 'textarea', required: false },
        { name: 'shot_priority_order', label: 'Shot Priority Order', type: 'textarea', required: false },
        { name: 'specialized_shots_required', label: 'Specialized Shots Required', type: 'textarea', required: false }
      ]
    },
    {
      id: 'section_3',
      title: 'Section 3: Photo Deliverables [CONDITIONAL: If Photos Only or Both]',
      fields: [
        { name: 'photo_resolution', label: 'Photo Resolution', type: 'select', required: false, options: [
          { value: '4k', label: '4K' },
          { value: '1080p', label: '1080p' },
          { value: 'standard', label: 'Standard' }
        ]},
        { name: 'edited_photos_count', label: 'Edited Photos Count', type: 'number', required: false },
        { name: 'raw_photos_delivery', label: 'Raw Photos Delivery', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'raw_retention_period', label: 'Raw Retention Period', type: 'select', required: false, options: [
          { value: '30_days', label: '30 Days' },
          { value: '90_days', label: '90 Days' },
          { value: '6_months', label: '6 Months' },
          { value: '1_year', label: '1 Year' }
        ]}
      ]
    },
    {
      id: 'section_4',
      title: 'Section 4: Video Deliverables [CONDITIONAL: If Videos Only or Both]',
      fields: [
        { name: 'video_resolution', label: 'Video Resolution', type: 'select', required: false, options: [
          { value: '4k', label: '4K' },
          { value: '1080p', label: '1080p' },
          { value: '720p', label: '720p' }
        ]},
        { name: 'cinematic_video_required', label: 'Cinematic Video Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'cinematic_video_length', label: 'Cinematic Video Length (minutes)', type: 'number', required: false },
        { name: 'edited_video_count', label: 'Edited Video Count', type: 'number', required: false },
        { name: 'raw_video_delivery', label: 'Raw Video Delivery', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'raw_retention_period_video', label: 'Raw Video Retention Period', type: 'select', required: false, options: [
          { value: '30_days', label: '30 Days' },
          { value: '90_days', label: '90 Days' },
          { value: '6_months', label: '6 Months' }
        ]}
      ]
    },
    {
      id: 'section_5',
      title: 'Section 5: Photo Albums [CONDITIONAL: If Photos Only or Both]',
      fields: [
        { name: 'physical_album_delivery', label: 'Physical Album Delivery', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'album_count', label: 'Album Count', type: 'number', required: false },
        { name: 'album_quality_grade', label: 'Album Quality Grade', type: 'select', required: false, options: [
          { value: 'standard', label: 'Standard' },
          { value: 'premium', label: 'Premium' },
          { value: 'luxury', label: 'Luxury' }
        ]}
      ]
    },
    {
      id: 'section_6',
      title: 'Section 6: Online Gallery [CONDITIONAL: If Videos Only or Both]',
      fields: [
        { name: 'online_gallery_provided', label: 'Online Gallery Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'password_protected_gallery', label: 'Password Protected Gallery', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'gallery_expiry_days', label: 'Gallery Expiry (Days)', type: 'number', required: false }
      ]
    },
    {
      id: 'section_7',
      title: 'Section 7: Usage Rights',
      fields: [
        { name: 'copyright_ownership', label: 'Copyright Ownership', type: 'select', required: true, options: [
          { value: 'client', label: 'Client' },
          { value: 'photographer', label: 'Photographer' },
          { value: 'shared', label: 'Shared' }
        ]},
        { name: 'commercial_usage_allowed', label: 'Commercial Usage Allowed', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'social_media_usage_allowed', label: 'Social Media Usage Allowed', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'print_usage_allowed', label: 'Print Usage Allowed', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE E: TUITION / COACHING / TRAINING
// Mandatory: 20 (4 common + 16 specific) | Optional: 44 | Total: 64
// ═══════════════════════════════════════════════════════════════════════════════

export const COACHING_TRAINING_FORM: IndustryFormConfig = {
  id: 'coaching',
  name: 'Tuition / Coaching / Training',
  description: 'Educational tutoring, coaching and training services',
  icon: '👨‍🏫',
  estimatedTime: 50,
  riskLevel: 'low',
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
      id: 'section_1',
      title: 'Section 1: Coaching Type',
      fields: [
        { name: 'coaching_type', label: 'Coaching Type', type: 'select', required: true, options: [
          { value: 'academic', label: 'Academic' },
          { value: 'professional', label: 'Professional' },
          { value: 'skill', label: 'Skill Development' },
          { value: 'exam_prep', label: 'Exam Preparation' }
        ]},
        { name: 'trainer_name', label: 'Trainer Name', type: 'text', required: true },
        { name: 'trainer_qualification_experience', label: 'Trainer Qualification & Experience', type: 'textarea', required: true },
        { name: 'student_name', label: 'Student Name', type: 'text', required: true },
        { name: 'student_grade_level', label: 'Student Grade Level', type: 'select', required: true, options: [
          { value: 'primary', label: 'Primary' },
          { value: 'secondary', label: 'Secondary' },
          { value: 'senior_secondary', label: 'Senior Secondary' },
          { value: 'college', label: 'College' },
          { value: 'professional', label: 'Professional' }
        ]},
        { name: 'subject_or_skill', label: 'Subject or Skill', type: 'text', required: true }
      ]
    },
    {
      id: 'section_2',
      title: 'Section 2: Teaching Format',
      fields: [
        { name: 'learning_format', label: 'Learning Format', type: 'select', required: true, options: [
          { value: 'one_on_one', label: 'One-on-One' },
          { value: 'group', label: 'Group' },
          { value: 'hybrid', label: 'Hybrid' }
        ]},
        { name: 'session_mode', label: 'Session Mode', type: 'select', required: true, options: [
          { value: 'online', label: 'Online' },
          { value: 'offline', label: 'Offline' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'group_size_max', label: 'Max Group Size', type: 'number', required: false }
      ]
    },
    {
      id: 'section_3',
      title: 'Section 3: Schedule',
      fields: [
        { name: 'session_frequency', label: 'Session Frequency', type: 'select', required: true, options: [
          { value: 'daily', label: 'Daily' },
          { value: 'thrice_weekly', label: 'Thrice Weekly' },
          { value: 'twice_weekly', label: 'Twice Weekly' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'flexible', label: 'Flexible' }
        ]},
        { name: 'session_duration_minutes', label: 'Session Duration (Minutes)', type: 'number', required: true },
        { name: 'total_sessions_planned', label: 'Total Sessions Planned', type: 'number', required: true },
        { name: 'class_timing_preference', label: 'Class Timing Preference', type: 'textarea', required: true },
        { name: 'flexible_rescheduling', label: 'Flexible Rescheduling', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'cancellation_policy', label: 'Cancellation Policy', type: 'textarea', required: false }
      ]
    },
    {
      id: 'section_4',
      title: 'Section 4: Curriculum',
      fields: [
        { name: 'curriculum_provided', label: 'Curriculum Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'modules_list', label: 'Modules List', type: 'textarea', required: false },
        { name: 'total_modules', label: 'Total Modules', type: 'number', required: false },
        { name: 'curriculum_document', label: 'Curriculum Document URL', type: 'text', required: false },
        { name: 'syllabus_provided', label: 'Syllabus Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'customization_allowed', label: 'Customization Allowed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'learning_outcomes_documented', label: 'Learning Outcomes Documented', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'learning_outcomes_list', label: 'Learning Outcomes List', type: 'textarea', required: false },
        { name: 'core_skills', label: 'Core Skills', type: 'textarea', required: false },
        { name: 'tools_software_required', label: 'Tools/Software Required', type: 'text', required: false },
        { name: 'cost_responsibility_for_tools', label: 'Cost Responsibility for Tools', type: 'select', required: false, options: [
          { value: 'trainer', label: 'Trainer' },
          { value: 'student', label: 'Student' },
          { value: 'shared', label: 'Shared' }
        ]}
      ]
    },
    {
      id: 'section_5',
      title: 'Section 5: Assessment',
      fields: [
        { name: 'assessment_method', label: 'Assessment Method', type: 'select', required: true, options: [
          { value: 'quiz', label: 'Quiz' },
          { value: 'exam', label: 'Exam' },
          { value: 'project', label: 'Project' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'assessment_frequency', label: 'Assessment Frequency', type: 'select', required: true, options: [
          { value: 'weekly', label: 'Weekly' },
          { value: 'bi_weekly', label: 'Bi-weekly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'as_needed', label: 'As Needed' }
        ]},
        { name: 'progress_tracking_included', label: 'Progress Tracking Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'feedback_frequency', label: 'Feedback Frequency', type: 'select', required: false, options: [
          { value: 'immediate', label: 'Immediate' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'monthly', label: 'Monthly' }
        ]},
        { name: 'performance_reports_provided', label: 'Performance Reports Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'report_frequency', label: 'Report Frequency', type: 'select', required: false, options: [
          { value: 'weekly', label: 'Weekly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' }
        ]}
      ]
    },
    {
      id: 'section_6',
      title: 'Section 6: Doubt Solving',
      fields: [
        { name: 'doubt_session_policy', label: 'Doubt Session Policy', type: 'textarea', required: false },
        { name: 'additional_doubt_sessions_included', label: 'Additional Doubt Sessions Included', type: 'number', required: false },
        { name: 'additional_session_cost', label: 'Additional Session Cost', type: 'number', required: false },
        { name: 'response_time_for_queries_hours', label: 'Response Time for Queries (Hours)', type: 'number', required: false }
      ]
    },
    {
      id: 'section_7',
      title: 'Section 7: Mock Tests',
      fields: [
        { name: 'mock_tests_included', label: 'Mock Tests Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'mock_test_count', label: 'Mock Test Count', type: 'number', required: false },
        { name: 'mock_test_review_included', label: 'Mock Test Review Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'practice_material_count', label: 'Practice Material Count', type: 'number', required: false }
      ]
    },
    {
      id: 'section_8',
      title: 'Section 8: Technology',
      fields: [
        { name: 'platform_used', label: 'Platform Used', type: 'select', required: false, options: [
          { value: 'zoom', label: 'Zoom' },
          { value: 'google_meet', label: 'Google Meet' },
          { value: 'skype', label: 'Skype' },
          { value: 'custom', label: 'Custom' }
        ]},
        { name: 'learning_management_system_used', label: 'Learning Management System Used', type: 'text', required: false },
        { name: 'screen_sharing_required', label: 'Screen Sharing Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'recording_of_sessions_allowed', label: 'Recording of Sessions Allowed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_9',
      title: 'Section 9: Performance',
      fields: [
        { name: 'performance_guarantee_offered', label: 'Performance Guarantee Offered', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'guarantee_metric', label: 'Guarantee Metric', type: 'select', required: false, options: [
          { value: 'score_improvement', label: 'Score Improvement' },
          { value: 'grade_upgrade', label: 'Grade Upgrade' },
          { value: 'skill_mastery', label: 'Skill Mastery' }
        ]},
        { name: 'guarantee_target_value', label: 'Guarantee Target Value', type: 'number', required: false },
        { name: 'guarantee_conditions', label: 'Guarantee Conditions', type: 'textarea', required: false }
      ]
    },
    {
      id: 'section_10',
      title: 'Section 10: Materials',
      fields: [
        { name: 'study_materials_provided', label: 'Study Materials Provided', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'material_format', label: 'Material Format', type: 'text', required: true },
        { name: 'access_to_materials_duration', label: 'Access to Materials Duration', type: 'text', required: false }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE F: HOME REPAIR & MAINTENANCE
// Mandatory: 19 (4 common + 15 specific) | Optional: 34 | Total: 53
// ═══════════════════════════════════════════════════════════════════════════════

export const HOME_REPAIR_FORM: IndustryFormConfig = {
  id: 'repair',
  name: 'Home Repair & Maintenance',
  description: 'Professional home repair and maintenance services',
  icon: '🔧',
  estimatedTime: 45,
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
      id: 'section_1',
      title: 'Section 1: Service Type',
      fields: [
        { name: 'service_type', label: 'Service Type', type: 'select', required: true },
        { name: 'service_job_title', label: 'Service Job Title', type: 'text', required: true },
        { name: 'property_type', label: 'Property Type', type: 'select', required: true, options: [
          { value: 'apartment', label: 'Apartment' },
          { value: 'house', label: 'House' },
          { value: 'office', label: 'Office' },
          { value: 'commercial', label: 'Commercial' }
        ]}
      ]
    },
    {
      id: 'section_2',
      title: 'Section 2: Location',
      fields: [
        { name: 'service_location_address', label: 'Service Location Address', type: 'textarea', required: true },
        { name: 'floor_number', label: 'Floor Number', type: 'text', required: true },
        { name: 'lift_available', label: 'Lift Available', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'working_hours_restrictions', label: 'Working Hours Restrictions', type: 'textarea', required: true },
        { name: 'working_days_preference', label: 'Working Days Preference', type: 'text', required: true },
        { name: 'access_availability_hours', label: 'Access Availability Hours', type: 'text', required: false },
        { name: 'additional_access_conditions', label: 'Additional Access Conditions', type: 'textarea', required: false }
      ]
    },
    {
      id: 'section_3',
      title: 'Section 3: Problem Description',
      fields: [
        { name: 'current_problem_description', label: 'Current Problem Description', type: 'textarea', required: true },
        { name: 'emergency_situation', label: 'Emergency Situation', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_4',
      title: 'Section 4: Scope of Work',
      fields: [
        { name: 'scope_of_work_tasks', label: 'Scope of Work Tasks (Up to 20)', type: 'textarea', required: true },
        { name: 'work_exclusions', label: 'Work Exclusions', type: 'textarea', required: true }
      ]
    },
    {
      id: 'section_5',
      title: 'Section 5: Materials',
      fields: [
        { name: 'materials_provided_by', label: 'Materials Provided By', type: 'select', required: true, options: [
          { value: 'service_provider', label: 'Service Provider' },
          { value: 'client', label: 'Client' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'quality_grade_materials', label: 'Quality Grade of Materials', type: 'select', required: true, options: [
          { value: 'standard', label: 'Standard' },
          { value: 'premium', label: 'Premium' },
          { value: 'luxury', label: 'Luxury' }
        ]}
      ]
    },
    {
      id: 'section_6',
      title: 'Section 6: Quality Standards',
      fields: [
        { name: 'workmanship_warranty_period', label: 'Workmanship Warranty Period (months)', type: 'number', required: true },
        { name: 'rework_policy', label: 'Rework Policy', type: 'textarea', required: true },
        { name: 'quality_standards_reference', label: 'Quality Standards Reference', type: 'textarea', required: false },
        { name: 'defect_definition', label: 'Defect Definition', type: 'textarea', required: false },
        { name: 'quality_inspection_by', label: 'Quality Inspection By', type: 'select', required: false, options: [
          { value: 'service_provider', label: 'Service Provider' },
          { value: 'client', label: 'Client' },
          { value: 'third_party', label: 'Third Party' }
        ]}
      ]
    },
    {
      id: 'section_7',
      title: 'Section 7: Timeline',
      fields: [
        { name: 'single_visit_or_multiple', label: 'Single Visit or Multiple', type: 'select', required: true, options: [
          { value: 'single', label: 'Single Visit' },
          { value: 'multiple', label: 'Multiple Visits' }
        ]},
        { name: 'number_of_visits_estimated', label: 'Number of Visits Estimated', type: 'number', required: false },
        { name: 'visit_schedule_flexibility', label: 'Visit Schedule Flexibility', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'estimated_completion_date', label: 'Estimated Completion Date', type: 'date', required: true },
        { name: 'estimated_total_hours', label: 'Estimated Total Hours', type: 'number', required: true }
      ]
    },
    {
      id: 'section_8',
      title: 'Section 8: Cleanup',
      fields: [
        { name: 'cleanup_included', label: 'Cleanup Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'waste_disposal_included', label: 'Waste Disposal Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'restoration_to_original_state', label: 'Restoration to Original State', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICE G: CLEANING & HOUSEKEEPING
// Mandatory: 14 (4 common + 10 specific) | Optional: 45 | Total: 59
// ═══════════════════════════════════════════════════════════════════════════════

export const CLEANING_HOUSEKEEPING_FORM: IndustryFormConfig = {
  id: 'cleaning',
  name: 'Cleaning & Housekeeping',
  description: 'Professional cleaning and housekeeping services',
  icon: '🧹',
  estimatedTime: 40,
  riskLevel: 'low',
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
      id: 'section_1',
      title: 'Section 1: Service Type',
      fields: [
        { name: 'service_type', label: 'Service Type', type: 'select', required: true, options: [
          { value: 'deep_clean', label: 'Deep Clean' },
          { value: 'regular_clean', label: 'Regular Clean' },
          { value: 'move_in_out', label: 'Move In/Out' },
          { value: 'post_event', label: 'Post-Event' }
        ]},
        { name: 'property_type', label: 'Property Type', type: 'select', required: true, options: [
          { value: 'apartment', label: 'Apartment' },
          { value: 'house', label: 'House' },
          { value: 'office', label: 'Office' },
          { value: 'commercial', label: 'Commercial' }
        ]},
        { name: 'property_size_sqft', label: 'Property Size (Sq Ft)', type: 'number', required: true },
        { name: 'property_condition_before', label: 'Property Condition Before', type: 'select', required: true, options: [
          { value: 'light_dust', label: 'Light Dust' },
          { value: 'moderate_dirt', label: 'Moderate Dirt' },
          { value: 'heavily_soiled', label: 'Heavily Soiled' }
        ]}
      ]
    },
    {
      id: 'section_2',
      title: 'Section 2: Property Details',
      fields: [
        { name: 'bedroom_count', label: 'Bedroom Count', type: 'number', required: true },
        { name: 'bathroom_count', label: 'Bathroom Count', type: 'number', required: true },
        { name: 'kitchen_present', label: 'Kitchen Present', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'living_area_present', label: 'Living Area Present', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'balcony_terrace_present', label: 'Balcony/Terrace Present', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'outdoor_area_present', label: 'Outdoor Area Present', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_3',
      title: 'Section 3: Scope',
      fields: [
        { name: 'bedroom_cleaning', label: 'Bedroom Cleaning', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'bedroom_cleaning_count', label: 'Bedroom Cleaning Count', type: 'number', required: false },
        { name: 'washroom_cleaning', label: 'Washroom Cleaning', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'washroom_cleaning_count', label: 'Washroom Cleaning Count', type: 'number', required: false },
        { name: 'kitchen_cleaning', label: 'Kitchen Cleaning', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'living_room_cleaning', label: 'Living Room Cleaning', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'hallway_staircase_cleaning', label: 'Hallway/Staircase Cleaning', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'carpet_cleaning', label: 'Carpet Cleaning', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'carpet_cleaning_count', label: 'Carpet Cleaning Count', type: 'number', required: false },
        { name: 'window_cleaning', label: 'Window Cleaning', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'window_cleaning_count', label: 'Window Cleaning Count', type: 'number', required: false }
      ]
    },
    {
      id: 'section_4',
      title: 'Section 4: Products',
      fields: [
        { name: 'eco_friendly_products_required', label: 'Eco Friendly Products Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'chemical_sensitivity_disclosure', label: 'Chemical Sensitivity Disclosure', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'allergy_information', label: 'Allergy Information', type: 'textarea', required: false },
        { name: 'pet_friendly_products', label: 'Pet Friendly Products', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'cleaning_supplies_provided_by', label: 'Cleaning Supplies Provided By', type: 'select', required: false, options: [
          { value: 'service_provider', label: 'Service Provider' },
          { value: 'client', label: 'Client' },
          { value: 'mixed', label: 'Mixed' }
        ]},
        { name: 'supply_cost_included', label: 'Supply Cost Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_5',
      title: 'Section 5: Schedule',
      fields: [
        { name: 'preferred_time', label: 'Preferred Time', type: 'text', required: true },
        { name: 'session_duration_hours', label: 'Session Duration (Hours)', type: 'number', required: true }
      ]
    },
    {
      id: 'section_6',
      title: 'Section 6: Pre-Cleaning',
      fields: [
        { name: 'property_preparation_required', label: 'Property Preparation Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'furniture_moving_included', label: 'Furniture Moving Included', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'client_availability_required', label: 'Client Availability Required', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]}
      ]
    },
    {
      id: 'section_7',
      title: 'Section 7: Quality',
      fields: [
        { name: 'cleanliness_level_expectation', label: 'Cleanliness Level Expectation', type: 'select', required: true, options: [
          { value: 'basic', label: 'Basic' },
          { value: 'standard', label: 'Standard' },
          { value: 'premium', label: 'Premium' }
        ]},
        { name: 'inspection_checklist_provided', label: 'Inspection Checklist Provided', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'photographic_proof_required', label: 'Photographic Proof Required', type: 'select', required: true, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'quality_guarantee_period_days', label: 'Quality Guarantee Period (Days)', type: 'number', required: false }
      ]
    },
    {
      id: 'section_8',
      title: 'Section 8: Special Conditions',
      fields: [
        { name: 'child_care_concurrent_needed', label: 'Child Care Concurrent Needed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'elderly_care_concurrent_needed', label: 'Elderly Care Concurrent Needed', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'work_from_home_considerations', label: 'Work From Home Considerations', type: 'select', required: false, options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]},
        { name: 'noise_level_restrictions', label: 'Noise Level Restrictions', type: 'textarea', required: false }
      ]
    }
  ]
};

export default {
  SOFTWARE_DEVELOPMENT_FORM,
  UI_UX_DESIGN_FORM,
  CONTENT_WRITING_FORM,
  PHOTOGRAPHY_VIDEOGRAPHY_FORM,
  COACHING_TRAINING_FORM,
  HOME_REPAIR_FORM,
  CLEANING_HOUSEKEEPING_FORM
};
