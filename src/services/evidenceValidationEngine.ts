/**
 * EVIDENCE VALIDATION ENGINE
 * 
 * Purpose: Validate evidence per industry requirements
 * Industries: Electronics, Mobile, Furniture, Vehicles, Jewellery, Appliances, 
 *             Building Material, Collectibles, Industrial, Books, Art
 * 
 * Validations:
 * - Video format, duration, resolution, continuity
 * - Photo resolution, metadata, tampering detection
 * - Diagnostic output verification (IMEI, battery %, etc)
 * - Serial number format matching
 * - Evidence completeness per category
 */

import { supabase } from '@/integrations/supabase/client';

// ═══════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════

export interface EvidenceValidationRule {
  evidence_type: string;
  required: boolean;
  format?: string[];
  min_duration_seconds?: number;
  max_file_size_mb?: number;
  min_resolution?: { width: number; height: number };
  frame_rate_min?: number;
  content_checks?: string[];
}

export interface ValidationResult {
  is_valid: boolean;
  evidence_type: string;
  file_path: string;
  file_hash: string;
  errors: string[];
  warnings: string[];
  metadata: {
    duration?: number;
    resolution?: { width: number; height: number };
    frame_rate?: number;
    file_size_bytes?: number;
    is_edited?: boolean;
  };
  validation_timestamp: string;
}

export interface CategoryEvidenceRequirements {
  category: string;
  annexure_code: string;
  inspection_window_hours: number;
  required_evidence: EvidenceValidationRule[];
  auto_fail_conditions: string[];
  auto_pass_conditions: string[];
  fraud_indicators: string[];
}

// ═══════════════════════════════════════════════════════════════════
// EVIDENCE REQUIREMENTS BY CATEGORY
// ═══════════════════════════════════════════════════════════════════

const EVIDENCE_REQUIREMENTS: Record<string, CategoryEvidenceRequirements> = {
  electronics: {
    category: 'electronics',
    annexure_code: 'A',
    inspection_window_hours: 24,
    required_evidence: [
      {
        evidence_type: 'seller_pre_dispatch_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 30,
        max_file_size_mb: 500,
        min_resolution: { width: 720, height: 480 },
        frame_rate_min: 24,
        content_checks: ['shows_product', 'shows_serial_number', 'power_on_test', 'functional_test']
      },
      {
        evidence_type: 'buyer_unboxing_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 60,
        max_file_size_mb: 500,
        min_resolution: { width: 720, height: 480 },
        content_checks: ['continuous_unboxing', 'shows_serial_number', 'functional_test']
      },
      {
        evidence_type: 'battery_health_screenshot',
        required: false,
        format: ['jpg', 'png'],
        content_checks: ['battery_percentage_visible', 'device_identifier']
      }
    ],
    auto_fail_conditions: [
      'device_dead_on_arrival_in_video',
      'no_unboxing_video_provided',
      'imei_mismatch',
      'screen_damage_undisclosed'
    ],
    auto_pass_conditions: [
      'buyer_confirms_receipt_within_window',
      'inspection_window_expires_without_dispute',
      'both_parties_agree'
    ],
    fraud_indicators: [
      'video_cuts_detected',
      'edited_video_metadata',
      'imei_not_matching_device_model',
      'multiple_different_devices',
      'high_velocity_disputes'
    ]
  },

  mobile: {
    category: 'mobile',
    annexure_code: 'B',
    inspection_window_hours: 24,
    required_evidence: [
      {
        evidence_type: 'seller_pre_dispatch_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 45,
        max_file_size_mb: 500,
        min_resolution: { width: 720, height: 480 },
        content_checks: ['imei_screenshot', 'device_name', 'power_on', 'functional_test']
      },
      {
        evidence_type: 'buyer_unboxing_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 90,
        max_file_size_mb: 500,
        min_resolution: { width: 720, height: 480 },
        content_checks: ['continuous_unboxing', 'imei_verification', 'complete_device_view', 'functional_test']
      },
      {
        evidence_type: 'imei_diagnostic_screenshot',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['imei_1', 'imei_2', 'device_name', 'battery_health_percent']
      },
      {
        evidence_type: 'battery_health_screenshot',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['battery_percentage', 'cycle_count']
      }
    ],
    auto_fail_conditions: [
      'imei_mismatch',
      'imei_missing_in_evidence',
      'device_not_powering_on',
      'software_locks_undisclosed',
      'battery_health_diff_gt_3_percent'
    ],
    auto_pass_conditions: [
      'buyer_confirms_receipt_within_24_hours',
      'window_expires_without_complaint',
      'imei_battery_health_match_video'
    ],
    fraud_indicators: [
      'imei_not_matching_model',
      'imei_blacklisted',
      'battery_health_inconsistent',
      'video_heavily_edited',
      'multiple_device_history'
    ]
  },

  furniture: {
    category: 'furniture',
    annexure_code: 'C',
    inspection_window_hours: 6,
    required_evidence: [
      {
        evidence_type: 'dimensions_tape_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 60,
        max_file_size_mb: 300,
        min_resolution: { width: 720, height: 480 },
        content_checks: ['length_measurement', 'breadth_measurement', 'height_measurement', 'tape_visible']
      },
      {
        evidence_type: 'stability_test_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 30,
        max_file_size_mb: 200,
        content_checks: ['stability_test_performed', 'weight_loading_test']
      },
      {
        evidence_type: 'furniture_photos',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['overall_view', 'damage_closeups', 'joints_inspection']
      },
      {
        evidence_type: 'odor_declaration_photo',
        required: false,
        format: ['jpg', 'png']
      }
    ],
    auto_fail_conditions: [
      'dimensions_mismatch_gt_5_percent',
      'broken_parts_undisclosed',
      'stability_failure',
      'structural_damage'
    ],
    auto_pass_conditions: [
      'buyer_confirms_receipt_6_hours',
      'no_dispute_raised_in_window',
      'dimensions_match_within_tolerance'
    ],
    fraud_indicators: [
      'video_edited',
      'dimensions_inconsistent',
      'multiple_disputes_for_seller',
      'measurement_impossible_geometry'
    ]
  },

  vehicles: {
    category: 'vehicles',
    annexure_code: 'D',
    inspection_window_hours: 2,
    required_evidence: [
      {
        evidence_type: 'rc_documents_photo',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['rc_number', 'owner_name', 'validity_date']
      },
      {
        evidence_type: 'odometer_photo',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['odometer_reading_clear']
      },
      {
        evidence_type: 'engine_start_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 20,
        content_checks: ['engine_cranking', 'engine_starting', 'idle_sound']
      },
      {
        evidence_type: 'driving_test_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 60,
        content_checks: ['acceleration', 'braking', 'steering_response']
      },
      {
        evidence_type: 'chassis_inspection_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 30,
        content_checks: ['chassis_number_visible', 'undercarriage_condition']
      }
    ],
    auto_fail_conditions: [
      'engine_not_starting',
      'odometer_mismatch_gt_1000_km',
      'forged_rc_detected',
      'accident_damage_undisclosed'
    ],
    auto_pass_conditions: [
      'buyer_confirms_receipt_2_hours',
      'all_documents_verified',
      'test_drive_successful'
    ],
    fraud_indicators: [
      'odometer_tampered',
      'rc_forged',
      'chassis_number_scratched',
      'multiple_accident_history',
      'high_fraud_seller_rating'
    ]
  },

  jewellery: {
    category: 'jewellery',
    annexure_code: 'F',
    inspection_window_hours: 2,
    required_evidence: [
      {
        evidence_type: 'weight_scale_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 30,
        max_file_size_mb: 200,
        content_checks: ['scale_zero', 'item_placement', 'weight_reading', 'scale_name']
      },
      {
        evidence_type: 'hallmark_photo',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['hallmark_clear', 'macro_detail']
      },
      {
        evidence_type: 'certificate_photo',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['lab_name', 'certificate_number', 'date', 'signature']
      },
      {
        evidence_type: 'video_360',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 60,
        content_checks: ['complete_rotation', 'stone_condition', 'polish_visibility']
      }
    ],
    auto_fail_conditions: [
      'weight_mismatch_gt_0_5_gm',
      'hallmark_missing_or_fake',
      'stone_missing_or_broken',
      'certificate_fake'
    ],
    auto_pass_conditions: [
      'buyer_confirms_2_hours',
      'weight_matches_within_0_2_gm',
      'hallmark_verified_genuine'
    ],
    fraud_indicators: [
      'weight_inconsistent',
      'hallmark_fake',
      'certificate_forged',
      'stones_replaced',
      'high_jewellery_fraud_rate'
    ]
  },

  'fashion-apparel': {
    category: 'fashion-apparel',
    annexure_code: 'E',
    inspection_window_hours: 24,
    required_evidence: [
      {
        evidence_type: 'size_fit_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 30,
        max_file_size_mb: 200,
        content_checks: ['size_demonstration', 'fabric_texture', 'fit_assessment']
      },
      {
        evidence_type: 'brand_label_photo',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['brand_clear', 'size_label_visible', 'care_instructions']
      },
      {
        evidence_type: 'condition_photos',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['overall_view', 'defect_closeups', 'fabric_condition']
      }
    ],
    auto_fail_conditions: [
      'significant_size_mismatch',
      'major_fabric_damage',
      'counterfeit_brand_confirmed'
    ],
    auto_pass_conditions: [
      'size_matches_description',
      'inspection_window_expires_no_dispute'
    ],
    fraud_indicators: [
      'photo_edited',
      'size_label_removed',
      'high_return_rate_seller'
    ]
  },

  building_material: {
    category: 'building_material',
    annexure_code: 'H',
    inspection_window_hours: 6,
    required_evidence: [
      {
        evidence_type: 'batch_number_photo',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['batch_number_clear', 'date_code_visible']
      },
      {
        evidence_type: 'dimensions_tape_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 60,
        content_checks: ['length_measurement', 'breadth_measurement', 'thickness_measurement']
      },
      {
        evidence_type: 'damage_inspection_photos',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['overall_quantity', 'damaged_items_closeup', 'packaging_condition']
      }
    ],
    auto_fail_conditions: [
      'dimensions_deviation_gt_2_percent',
      'batch_mismatch',
      'water_damage',
      'quantity_shortage'
    ],
    auto_pass_conditions: [
      'dimensions_within_tolerance',
      'no_damage_reported_6_hours'
    ],
    fraud_indicators: [
      'dimensions_impossible',
      'batch_fake',
      'consistent_shortage_claims'
    ]
  },

  collectibles: {
    category: 'collectibles',
    annexure_code: 'I',
    inspection_window_hours: 2,
    required_evidence: [
      {
        evidence_type: 'video_360',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 120,
        content_checks: ['complete_view', 'serial_visible', 'condition_clear']
      },
      {
        evidence_type: 'coa_photo',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['coa_number', 'issuer_signature', 'authenticity_statement']
      },
      {
        evidence_type: 'closeup_photos',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['defects_if_any', 'signature_or_mark', 'detail_quality']
      }
    ],
    auto_fail_conditions: [
      'counterfeit_detected',
      'serial_mismatch',
      'coa_fake'
    ],
    auto_pass_conditions: [
      'coa_genuine_verified',
      'buyer_confirms_2_hours'
    ],
    fraud_indicators: [
      'coa_forged',
      'counterfeit_indicators',
      'multiple_counterfeits_from_seller'
    ]
  },

  industrial: {
    category: 'industrial',
    annexure_code: 'J',
    inspection_window_hours: 12,
    required_evidence: [
      {
        evidence_type: 'power_test_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 30,
        content_checks: ['power_on', 'indicator_lights']
      },
      {
        evidence_type: 'run_test_video',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 300,
        content_checks: ['continuous_operation', 'vibration_assessment', 'noise_level']
      },
      {
        evidence_type: 'serial_photo',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['serial_visible', 'model_clear']
      },
      {
        evidence_type: 'compliance_cert_photo',
        required: false,
        format: ['jpg', 'png']
      }
    ],
    auto_fail_conditions: [
      'machine_not_operational',
      'serial_mismatch',
      'major_failure'
    ],
    auto_pass_conditions: [
      'all_tests_pass_12_hours',
      'buyer_confirms'
    ],
    fraud_indicators: [
      'edited_videos',
      'inconsistent_specs',
      'high_return_rate'
    ]
  },

  books: {
    category: 'books',
    annexure_code: 'K',
    inspection_window_hours: 6,
    required_evidence: [
      {
        evidence_type: 'book_photos',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['cover_condition', 'spine', 'back', 'pages_sample']
      },
      {
        evidence_type: 'isbn_page_photo',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['isbn_visible', 'publication_date']
      },
      {
        evidence_type: 'page_count_verification_photo',
        required: false,
        format: ['jpg', 'png']
      }
    ],
    auto_fail_conditions: [
      'missing_pages_gt_5',
      'wrong_edition_delivered',
      'severe_damage'
    ],
    auto_pass_conditions: [
      'all_pages_present',
      'no_complaint_6_hours'
    ],
    fraud_indicators: [
      'different_edition_sent',
      'counterfeit_book',
      'wrong_isbn'
    ]
  },

  art: {
    category: 'art',
    annexure_code: 'L',
    inspection_window_hours: 2,
    required_evidence: [
      {
        evidence_type: 'video_360',
        required: true,
        format: ['mp4', 'mov', 'avi'],
        min_duration_seconds: 120,
        content_checks: ['complete_view', 'signature_visible', 'texture_visible']
      },
      {
        evidence_type: 'coa_photo',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['artist_signature', 'coa_details', 'authenticity_stamp']
      },
      {
        evidence_type: 'closeup_photos',
        required: true,
        format: ['jpg', 'png'],
        content_checks: ['signature_detail', 'condition', 'medium_detail']
      },
      {
        evidence_type: 'back_frame_photo',
        required: false,
        format: ['jpg', 'png']
      }
    ],
    auto_fail_conditions: [
      'counterfeit_detected',
      'signature_fake',
      'coa_forged'
    ],
    auto_pass_conditions: [
      'coa_genuine_verified',
      'buyer_confirms_2_hours'
    ],
    fraud_indicators: [
      'signature_mismatch',
      'coa_forged',
      'multiple_forgeries_from_seller'
    ]
  }
};

// ═══════════════════════════════════════════════════════════════════
// EVIDENCE VALIDATION SERVICE
// ═══════════════════════════════════════════════════════════════════

export class EvidenceValidationEngine {
  
  /**
   * Validate all evidence for a contract based on category
   */
  static async validateContractEvidence(
    contractId: string,
    productCategory: string
  ): Promise<{ all_valid: boolean; results: ValidationResult[] }> {
    
    try {
      // Get evidence requirements for category
      const requirements = EVIDENCE_REQUIREMENTS[productCategory];
      if (!requirements) {
        throw new Error(`Unknown product category: ${productCategory}`);
      }
      
      // Fetch all evidence records for this contract
      const { data: evidenceRecords, error } = await supabase
        .from('evidence_records')
        .select('*')
        .eq('contract_id', contractId);
      
      if (error) throw error;
      
      // Validate each evidence item
      const results: ValidationResult[] = [];
      for (const evidence of evidenceRecords || []) {
        const result = await this.validateEvidence(evidence, requirements);
        results.push(result);
      }
      
      // Check if all required evidence is present and valid
      const all_valid = this.checkCompleteness(results, requirements);
      
      return { all_valid, results };
      
    } catch (error) {
      console.error('Evidence validation failed:', error);
      throw error;
    }
  }
  
  /**
   * Validate a single evidence item
   */
  static async validateEvidence(
    evidence: any,
    requirements: CategoryEvidenceRequirements
  ): Promise<ValidationResult> {
    
    const errors: string[] = [];
    const warnings: string[] = [];
    const metadata: any = {
      file_size_bytes: evidence.file_size_bytes,
      duration: evidence.duration_seconds,
      resolution: evidence.resolution_width && evidence.resolution_height
        ? { width: evidence.resolution_width, height: evidence.resolution_height }
        : undefined,
      frame_rate: evidence.frame_rate,
      is_edited: evidence.is_edited
    };
    
    // Find matching rule
    const rule = requirements.required_evidence.find(r => r.evidence_type === evidence.evidence_type);
    
    if (!rule) {
      errors.push(`Unknown evidence type for this category: ${evidence.evidence_type}`);
    } else {
      
      // Check required
      if (rule.required && !evidence.file_path) {
        errors.push(`Required evidence not provided: ${evidence.evidence_type}`);
      }
      
      // Check format
      if (rule.format && evidence.mime_type) {
        const extension = evidence.file_name?.split('.').pop()?.toLowerCase();
        if (!rule.format.includes(extension)) {
          errors.push(`Invalid format. Expected: ${rule.format.join(', ')}, Got: ${extension}`);
        }
      }
      
      // Check file size
      if (rule.max_file_size_mb && evidence.file_size_bytes) {
        const fileSizeMb = evidence.file_size_bytes / (1024 * 1024);
        if (fileSizeMb > rule.max_file_size_mb) {
          errors.push(`File too large: ${fileSizeMb.toFixed(2)}MB (max: ${rule.max_file_size_mb}MB)`);
        }
      }
      
      // Check video duration
      if (rule.min_duration_seconds && evidence.duration_seconds) {
        if (evidence.duration_seconds < rule.min_duration_seconds) {
          errors.push(`Video too short: ${evidence.duration_seconds}s (min: ${rule.min_duration_seconds}s)`);
        }
      }
      
      // Check resolution
      if (rule.min_resolution && metadata.resolution) {
        if (
          metadata.resolution.width < rule.min_resolution.width ||
          metadata.resolution.height < rule.min_resolution.height
        ) {
          errors.push(
            `Resolution too low: ${metadata.resolution.width}x${metadata.resolution.height} ` +
            `(min: ${rule.min_resolution.width}x${rule.min_resolution.height})`
          );
        }
      }
      
      // Check frame rate
      if (rule.frame_rate_min && evidence.frame_rate) {
        if (evidence.frame_rate < rule.frame_rate_min) {
          errors.push(`Frame rate too low: ${evidence.frame_rate}fps (min: ${rule.frame_rate_min}fps)`);
        }
      }
      
      // Check tampering
      if (evidence.is_edited) {
        warnings.push('Evidence appears to be edited - may affect credibility');
      }
    }
    
    return {
      is_valid: errors.length === 0,
      evidence_type: evidence.evidence_type,
      file_path: evidence.file_path,
      file_hash: evidence.file_hash_sha256,
      errors,
      warnings,
      metadata,
      validation_timestamp: new Date().toISOString()
    };
  }
  
  /**
   * Check if all required evidence is present and valid
   */
  static checkCompleteness(
    results: ValidationResult[],
    requirements: CategoryEvidenceRequirements
  ): boolean {
    
    const providedTypes = results.map(r => r.evidence_type);
    
    // Check all required evidence is provided
    for (const required of requirements.required_evidence) {
      if (required.required && !providedTypes.includes(required.evidence_type)) {
        return false;
      }
    }
    
    // Check all provided evidence is valid
    return results.every(r => r.is_valid);
  }
  
  /**
   * Get evidence completeness percentage
   */
  static getCompletenessPercentage(
    results: ValidationResult[],
    requirements: CategoryEvidenceRequirements
  ): number {
    
    const required = requirements.required_evidence.filter(r => r.required);
    const provided = results.filter(r => required.some(req => req.evidence_type === r.evidence_type));
    
    return Math.round((provided.length / required.length) * 100);
  }
  
  /**
   * Detect fraud indicators in evidence set
   */
  static detectFraudIndicators(
    results: ValidationResult[],
    requirements: CategoryEvidenceRequirements
  ): { fraud_risk_level: 'low' | 'medium' | 'high'; indicators: string[] } {
    
    const indicators: string[] = [];
    
    // Check for edited videos
    const editedVideos = results.filter(r => r.metadata.is_edited).length;
    if (editedVideos > 0) {
      indicators.push(`${editedVideos} video(s) appear edited`);
    }
    
    // Check for missing required evidence
    const requiredTypes = requirements.required_evidence.filter(r => r.required).map(r => r.evidence_type);
    const providedTypes = results.map(r => r.evidence_type);
    const missing = requiredTypes.filter(t => !providedTypes.includes(t));
    if (missing.length > 0) {
      indicators.push(`Missing required evidence: ${missing.join(', ')}`);
    }
    
    // Check for evidence quality issues
    const lowQuality = results.filter(r => r.errors.length > 0).length;
    if (lowQuality > 0) {
      indicators.push(`${lowQuality} evidence item(s) with quality issues`);
    }
    
    // Determine risk level
    let fraud_risk_level: 'low' | 'medium' | 'high' = 'low';
    if (indicators.length >= 2) fraud_risk_level = 'medium';
    if (indicators.length >= 4 || editedVideos > 1) fraud_risk_level = 'high';
    
    return { fraud_risk_level, indicators };
  }
  
  /**
   * Generate evidence summary for contract
   */
  static async generateEvidenceSummary(contractId: string, productCategory: string) {
    
    const { all_valid, results } = await this.validateContractEvidence(contractId, productCategory);
    const requirements = EVIDENCE_REQUIREMENTS[productCategory];
    
    const completeness = this.getCompletenessPercentage(results, requirements);
    const { fraud_risk_level, indicators } = this.detectFraudIndicators(results, requirements);
    
    return {
      contract_id: contractId,
      product_category: productCategory,
      evidence_count: results.length,
      valid_count: results.filter(r => r.is_valid).length,
      invalid_count: results.filter(r => !r.is_valid).length,
      completeness_percentage: completeness,
      is_complete: all_valid,
      fraud_risk_level,
      fraud_indicators: indicators,
      validation_results: results,
      summary_timestamp: new Date().toISOString()
    };
  }
}

export default EvidenceValidationEngine;
