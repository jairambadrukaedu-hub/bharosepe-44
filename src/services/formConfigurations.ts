/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FORM CONFIGURATIONS - Central Registry for All Industry Forms
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This file imports all EXACT form configurations and registers them in a central registry
 * so they are visible and accessible throughout the application.
 */

import { IndustryFormConfig } from '../components/forms/IndustryFormBuilder';

// ═══════════════════════════════════════════════════════════════════════════════
// IMPORT ALL EXACT GOODS FORMS (Annexures A-L)
// ═══════════════════════════════════════════════════════════════════════════════

// Goods Annexure A - Appliances & Home Electronics
import { APPLIANCES_ELECTRONICS_FORM } from './EXACT_GOODS_FORMS_A';

// Goods Annexures B, C, D
import { 
  MOBILE_PHONES_LAPTOPS_FORM,
  FURNITURE_FORM,
  VEHICLES_FORM
} from './EXACT_GOODS_FORMS_BCD';

// Goods Annexures E, F, G, H
import { 
  FASHION_APPAREL_FORM,
  JEWELLERY_FORM,
  BUILDING_MATERIALS_FORM,
  COLLECTIBLES_FORM
} from './EXACT_GOODS_FORMS_EL';

// Goods Annexures I, J, K, L
import { 
  INDUSTRIAL_MACHINERY_FORM,
  BOOKS_EDUCATIONAL_FORM,
  ART_HANDMADE_FORM,
  INSTAGRAM_WHATSAPP_FORM
} from './EXACT_GOODS_FORMS_IJKL';

// ═══════════════════════════════════════════════════════════════════════════════
// IMPORT ALL EXACT SERVICES FORMS (Annexures A-J)
// ═══════════════════════════════════════════════════════════════════════════════

// Services Annexures A-G
import { 
  SOFTWARE_DEVELOPMENT_FORM,
  UI_UX_DESIGN_FORM,
  CONTENT_WRITING_FORM,
  PHOTOGRAPHY_VIDEOGRAPHY_FORM,
  COACHING_TRAINING_FORM,
  HOME_REPAIR_FORM,
  CLEANING_HOUSEKEEPING_FORM
} from './EXACT_SERVICES_FORMS_ABCDEFG';

// Services Annexures H, I, J
import { 
  DIGITAL_MARKETING_FORM,
  CONSULTING_FORM,
  EVENT_MANAGEMENT_FORM
} from './EXACT_SERVICES_FORMS_HIJ';

// ═══════════════════════════════════════════════════════════════════════════════
// CENTRAL FORM REGISTRY
// ═══════════════════════════════════════════════════════════════════════════════

export const ALL_INDUSTRY_FORMS: Record<string, IndustryFormConfig> = {
  // GOODS FORMS (Annexures A-L)
  appliances_electronics: APPLIANCES_ELECTRONICS_FORM,
  mobile_phones_laptops: MOBILE_PHONES_LAPTOPS_FORM,
  furniture: FURNITURE_FORM,
  vehicles: VEHICLES_FORM,
  fashion_apparel: FASHION_APPAREL_FORM,
  jewellery: JEWELLERY_FORM,
  building_materials: BUILDING_MATERIALS_FORM,
  collectibles: COLLECTIBLES_FORM,
  industrial_machinery: INDUSTRIAL_MACHINERY_FORM,
  books_educational: BOOKS_EDUCATIONAL_FORM,
  art_handmade: ART_HANDMADE_FORM,
  instagram_whatsapp: INSTAGRAM_WHATSAPP_FORM,

  // SERVICES FORMS (Annexures A-J)
  software_development: SOFTWARE_DEVELOPMENT_FORM,
  ui_ux_design: UI_UX_DESIGN_FORM,
  content_writing: CONTENT_WRITING_FORM,
  photography_videography: PHOTOGRAPHY_VIDEOGRAPHY_FORM,
  coaching_training: COACHING_TRAINING_FORM,
  home_repair: HOME_REPAIR_FORM,
  cleaning_housekeeping: CLEANING_HOUSEKEEPING_FORM,
  digital_marketing: DIGITAL_MARKETING_FORM,
  consulting: CONSULTING_FORM,
  event_management: EVENT_MANAGEMENT_FORM,
};

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get form configuration by category ID
 */
export const getFormByCategory = (category: string): IndustryFormConfig | null => {
  return ALL_INDUSTRY_FORMS[category.toLowerCase()] || null;
};

/**
 * Get all available form categories with metadata
 */
export const getAllFormCategories = () => {
  return Object.entries(ALL_INDUSTRY_FORMS).map(([id, config]) => ({
    id,
    name: config.name,
    description: config.description,
    icon: config.icon,
    estimatedTime: config.estimatedTime,
    riskLevel: config.riskLevel,
  }));
};

/**
 * Get all goods forms (Annexures A-L)
 */
export const getGoodsForms = () => {
  const goodsIds = [
    'appliances_electronics',
    'mobile_phones_laptops',
    'furniture',
    'vehicles',
    'fashion_apparel',
    'jewellery',
    'building_materials',
    'collectibles',
    'industrial_machinery',
    'books_educational',
    'art_handmade',
    'instagram_whatsapp',
  ];
  return goodsIds.map(id => ({
    id,
    ...ALL_INDUSTRY_FORMS[id],
  }));
};

/**
 * Get all services forms (Annexures A-J)
 */
export const getServicesForms = () => {
  const servicesIds = [
    'software_development',
    'ui_ux_design',
    'content_writing',
    'photography_videography',
    'coaching_training',
    'home_repair',
    'cleaning_housekeeping',
    'digital_marketing',
    'consulting',
    'event_management',
  ];
  return servicesIds.map(id => ({
    id,
    ...ALL_INDUSTRY_FORMS[id],
  }));
};

/**
 * Search forms by keyword (searches name and description)
 */
export const searchForms = (keyword: string) => {
  const searchTerm = keyword.toLowerCase();
  return Object.entries(ALL_INDUSTRY_FORMS)
    .filter(([, config]) => 
      config.name.toLowerCase().includes(searchTerm) ||
      (config.description || '').toLowerCase().includes(searchTerm)
    )
    .map(([id, config]) => ({ id, ...config }));
};

/**
 * Get forms by type (goods or services)
 */
export const getFormsByType = (type: 'goods' | 'services') => {
  if (type === 'goods') {
    return getGoodsForms();
  } else {
    return getServicesForms();
  }
};

/**
 * Export default for backward compatibility
 */
export default {
  ALL_INDUSTRY_FORMS,
  getFormByCategory,
  getAllFormCategories,
  getGoodsForms,
  getServicesForms,
  searchForms,
  getFormsByType,
};
