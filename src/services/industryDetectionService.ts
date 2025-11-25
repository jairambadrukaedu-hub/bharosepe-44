import { supabase } from '@/integrations/supabase/client';

/**
 * INDUSTRY CLASSIFICATION SERVICE
 * AI-powered detection of transaction industry from description
 * Maps to 6 main categories based on product/service characteristics
 */

export type IndustryType = 
  | 'physical_products'
  | 'services'
  | 'digital_goods'
  | 'custom_made_order'
  | 'logistics'
  | 'home_services';

export interface IndustryDetectionResult {
  industry: IndustryType;
  subCategory?: string;
  confidenceScore: number;
  reasoning: string;
  riskLevel: 'low' | 'medium' | 'high';
}

/**
 * Keyword mappings for each industry type
 * Used for initial classification before scoring
 */
const INDUSTRY_KEYWORDS = {
  physical_products: {
    keywords: [
      'electronics', 'phone', 'laptop', 'computer', 'tablet', 'smartwatch',
      'headphones', 'speaker', 'camera', 'gaming', 'console', 'game',
      'clothing', 'dress', 'shirt', 'pants', 'shoes', 'jacket', 'saree',
      'furniture', 'chair', 'table', 'sofa', 'bed', 'cabinet',
      'appliance', 'microwave', 'fridge', 'washing machine', 'cooker',
      'book', 'novel', 'textbook', 'magazine',
      'cosmetics', 'makeup', 'skincare', 'cream', 'perfume', 'shampoo',
      'jewelry', 'pendant', 'ring', 'bracelet', 'necklace',
      'battery', 'charger', 'cable', 'adapter', 'accessories',
      'watch', 'clock', 'timer',
      'kitchen', 'utensils', 'pots', 'pans', 'dishes',
      'decor', 'poster', 'frame', 'wallpaper'
    ],
    indicators: ['buy', 'sell', 'product', 'item', 'goods', 'piece', 'unit', 'brand new', 'refurbished', 'used'],
    excludeKeywords: ['custom', 'made to order', 'service', 'delivery', 'courier', 'digital', 'ebook', 'online']
  },

  services: {
    keywords: [
      'repair', 'fix', 'maintenance', 'installation',
      'tutor', 'teaching', 'coaching', 'lesson', 'training', 'course',
      'design', 'graphic design', 'logo', 'branding', 'ui', 'ux',
      'writing', 'content creation', 'blog', 'article', 'copy',
      'photography', 'photo', 'photoshoot', 'video production',
      'consulting', 'consultation', 'advice', 'expert',
      'electrician', 'plumber', 'carpenter', 'contractor',
      'cleaning', 'housekeeping', 'maid', 'janitorial',
      'beauty', 'salon', 'haircut', 'massage', 'spa',
      'fitness', 'gym', 'yoga', 'exercise',
      'accounting', 'bookkeeping', 'audit', 'tax',
      'legal', 'lawyer', 'attorney', 'document',
      'development', 'coding', 'programming', 'software',
      'freelance', 'project', 'work', 'job', 'task',
      'hours', 'hourly', 'per day', 'consultation fee'
    ],
    indicators: ['service', 'work', 'labor', 'professional', 'expert', 'skilled', 'hours', 'day rate', 'consultation'],
    excludeKeywords: ['product', 'goods', 'physical', 'shipped', 'delivery']
  },

  digital_goods: {
    keywords: [
      'ebook', 'e-book', 'pdf', 'digital book',
      'template', 'mockup', 'psd', 'figma',
      'code', 'script', 'plugin', 'addon', 'extension',
      'software', 'app', 'application',
      'course', 'training', 'video course', 'tutorial', 'workshop',
      'music', 'audio', 'sound', 'track', 'beat',
      'design file', 'vector', 'graphic', 'illustration',
      'license', 'subscription', 'membership',
      'download', 'instant access', 'email delivery',
      'digital asset', 'online resource'
    ],
    indicators: ['digital', 'download', 'instant access', 'email', 'license', 'subscription', 'online only'],
    excludeKeywords: ['physical copy', 'shipped', 'delivery', 'courier', 'in-person']
  },

  custom_made_order: {
    keywords: [
      'custom', 'made to order', 'customized', 'personalized',
      'bespoke', 'tailored', 'personalization',
      'embroidery', 'engraving', 'printing', 'printed',
      'furniture design', 'artwork', 'painting', 'sculpture',
      'jewelry custom', 'ring design', 'necklace design',
      'cake', 'pastry', 'custom cake', 'themed cake',
      'garment', 'tailoring', 'alteration', 'stitching',
      'cards', 'invitation', 'card printing',
      'website design', 'app development', 'custom software',
      'special order', 'unique', 'one of a kind',
      'design approval', 'sample photo', 'revisions'
    ],
    indicators: ['custom', 'made to order', 'personalized', 'design approval', 'revisions', 'sample', 'approval before production'],
    excludeKeywords: ['standard', 'stock', 'ready made', 'in stock']
  },

  logistics: {
    keywords: [
      'delivery', 'courier', 'shipping', 'freight',
      'transport', 'logistics', 'moving service',
      'parcel', 'package', 'shipment',
      'pickup', 'drop off', 'drop-off',
      'cargo', 'goods transport', 'vehicle rental',
      'bike', 'truck', 'van', 'car rental',
      'courier service', 'express delivery', 'same day'
    ],
    indicators: ['delivery', 'shipping', 'courier', 'transport', 'logistics', 'pickup', 'drop off'],
    excludeKeywords: ['repair', 'service at home', 'installation']
  },

  home_services: {
    keywords: [
      'electrician', 'plumber', 'carpenter', 'painter',
      'ac repair', 'appliance repair', 'water heater',
      'cleaning', 'deep clean', 'house cleaning', 'office cleaning',
      'pest control', 'termite', 'mosquito',
      'beauty at home', 'home spa', 'salon at home',
      'pet grooming', 'pet care',
      'garden', 'lawn care', 'landscaping',
      'home maintenance', 'inspection',
      'locksmith', 'door repair', 'window repair',
      'home', 'house', 'apartment', 'residential', 'office',
      'visit', 'at your place', 'on-site', 'on site'
    ],
    indicators: ['at home', 'home service', 'on-site', 'visit', 'residential', 'office'],
    excludeKeywords: ['online', 'digital', 'remote', 'download']
  }
};

/**
 * Calculate confidence score based on keyword matching and presence of indicators
 */
function calculateConfidenceScore(text: string, industry: IndustryType): number {
  const lowerText = text.toLowerCase();
  const industryData = INDUSTRY_KEYWORDS[industry];
  
  let score = 0;
  let maxScore = 0;

  // Check keyword matches (40% weight)
  const keywordMatches = industryData.keywords.filter(keyword => 
    lowerText.includes(keyword.toLowerCase())
  ).length;
  const keywordScore = (keywordMatches / industryData.keywords.length) * 40;
  score += keywordScore;
  maxScore += 40;

  // Check indicator presence (30% weight)
  const indicatorMatches = industryData.indicators.filter(indicator =>
    lowerText.includes(indicator.toLowerCase())
  ).length;
  const indicatorScore = (indicatorMatches / industryData.indicators.length) * 30;
  score += indicatorScore;
  maxScore += 30;

  // Check for exclusion keywords (30% negative weight)
  const exclusionMatches = industryData.excludeKeywords.filter(keyword =>
    lowerText.includes(keyword.toLowerCase())
  ).length;
  const exclusionPenalty = (exclusionMatches / industryData.excludeKeywords.length) * 30;
  score = Math.max(0, score - exclusionPenalty);

  // Normalize to 0-1
  return Math.min(1, score / maxScore);
}

/**
 * Detect industry from product/service description
 * Returns top match with confidence score
 */
export function detectIndustry(description: string): IndustryDetectionResult {
  const industries: Array<[IndustryType, number]> = [];

  // Calculate confidence for each industry
  Object.keys(INDUSTRY_KEYWORDS).forEach((industry) => {
    const confidence = calculateConfidenceScore(description, industry as IndustryType);
    industries.push([industry as IndustryType, confidence]);
  });

  // Sort by confidence descending
  industries.sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

  const [topIndustry, confidenceScore] = industries[0];
  const secondaryIndustry = industries[1];

  // Generate reasoning
  const reasoning = generateReasoning(description, topIndustry, confidenceScore);

  // Determine risk level based on industry
  const riskLevel = determineRiskLevel(topIndustry, confidenceScore);

  return {
    industry: topIndustry,
    confidenceScore: Number(confidenceScore.toFixed(2)),
    reasoning,
    riskLevel
  };
}

/**
 * Generate human-readable reasoning for classification
 */
function generateReasoning(description: string, industry: IndustryType, confidence: number): string {
  const industryNames: Record<IndustryType, string> = {
    physical_products: 'Physical Products',
    services: 'Services',
    digital_goods: 'Digital Goods',
    custom_made_order: 'Custom/Made-to-Order',
    logistics: 'Logistics/Delivery',
    home_services: 'Home Services'
  };

  if (confidence >= 0.8) {
    return `Strong match for ${industryNames[industry]} category (${(confidence * 100).toFixed(0)}% confidence)`;
  } else if (confidence >= 0.6) {
    return `Moderate match for ${industryNames[industry]} category (${(confidence * 100).toFixed(0)}% confidence)`;
  } else {
    return `Weak match for ${industryNames[industry]} category (${(confidence * 100).toFixed(0)}% confidence) - may need manual review`;
  }
}

/**
 * Determine risk level based on industry and confidence
 */
function determineRiskLevel(industry: IndustryType, confidence: number): 'low' | 'medium' | 'high' {
  // Industries ranked by dispute risk
  const riskMap: Record<IndustryType, 'low' | 'medium' | 'high'> = {
    physical_products: 'high',    // High return/damage claims
    services: 'medium',            // Quality disputes
    digital_goods: 'low',          // Low dispute risk
    custom_made_order: 'high',     // Design/approval disputes
    logistics: 'medium',           // Delivery/damage risks
    home_services: 'medium'        // Quality & property damage risks
  };

  // Reduce risk if high confidence
  const baseRisk = riskMap[industry];
  if (confidence < 0.5) return 'high'; // Low confidence = higher risk
  return baseRisk;
}

/**
 * Get industry-specific rules from Supabase
 */
export async function getIndustryRules(industry: IndustryType) {
  try {
    const { data, error } = await supabase
      .from('industry_rules')
      .select('*')
      .eq('industry', industry)
      .single();

    if (error) {
      console.warn(`Industry rules not found for ${industry}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching industry rules:', error);
    return null;
  }
}

/**
 * Save industry classification to Supabase
 */
export async function saveIndustryClassification(
  transactionId: string,
  description: string,
  detection: IndustryDetectionResult
) {
  try {
    const { data, error } = await supabase
      .from('industry_classification')
      .insert({
        transaction_id: transactionId,
        description,
        detected_industry: detection.industry,
        confidence_score: detection.confidenceScore,
        detected_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving industry classification:', error);
    throw error;
  }
}

/**
 * Manually override industry classification (admin only)
 */
export async function overrideIndustryClassification(
  classificationId: string,
  newIndustry: IndustryType,
  reason: string
) {
  try {
    const { data, error } = await supabase
      .from('industry_classification')
      .update({
        manually_overridden: true,
        override_industry: newIndustry,
        override_reason: reason,
        updated_at: new Date().toISOString()
      })
      .eq('id', classificationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error overriding industry classification:', error);
    throw error;
  }
}

/**
 * Get effective industry (override if exists, else detected)
 */
export function getEffectiveIndustry(classification: any): IndustryType {
  if (classification.manually_overridden && classification.override_industry) {
    return classification.override_industry;
  }
  return classification.detected_industry;
}

/**
 * Test the detection system
 */
export function testIndustryDetection() {
  const testCases = [
    "Brand new iPhone 15 Pro Max, 256GB, sealed box with warranty",
    "Professional plumbing repair service - pipe fixing and installation",
    "Digital marketing course - video training with lifetime access",
    "Custom designed wedding invitation card - personalized with photos",
    "Same-day courier delivery service for parcels and packages",
    "Home cleaning service - deep clean for apartment, 3 BHK"
  ];

  console.log('=== Industry Detection Tests ===\n');
  testCases.forEach((testCase, index) => {
    const result = detectIndustry(testCase);
    console.log(`Test ${index + 1}: "${testCase}"`);
    console.log(`Result: ${result.industry} (${result.confidenceScore})`);
    console.log(`Risk: ${result.riskLevel}`);
    console.log(`Reasoning: ${result.reasoning}\n`);
  });
}
