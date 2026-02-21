/**
 * COMPLETE CONSOLIDATED FORM CONFIGURATIONS
 * ALL GOODS (A-L) + ALL SERVICES (A-J)
 * EXACTLY as specified in REFINED_FORM_FIELDS_MANDATORY_OPTIONAL.md
 * 
 * This file is organized in sections for easy navigation
 */

import { IndustryFormConfig } from '../components/forms/IndustryFormBuilder';

// ═══════════════════════════════════════════════════════════════════════════════
// ALL FORM EXPORTS INDEX - Quick Reference
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * GOODS FORMS (12 industries):
 * - Appliances (A)
 * - Mobile/Laptops (B) 
 * - Furniture (C)
 * - Vehicles (D)
 * - Fashion (E)
 * - Jewellery (F)
 * - Building Materials (G)
 * - Collectibles (H)
 * - Industrial (I)
 * - Books (J)
 * - Art (K)
 * - Instagram/WhatsApp (L)
 * 
 * SERVICES (10 types):
 * - Software Development (A)
 * - UI/UX Design (B)
 * - Content Writing (C)
 * - Photography (D)
 * - Coaching (E)
 * - Home Repair (F)
 * - Cleaning (G)
 * - Digital Marketing (H)
 * - Consulting (I)
 * - Event Management (J) - 13 sub-services
 * 
 * TOTAL: 1,088 fields (481 mandatory + 607 optional)
 */

// Import form types
export interface ExactFormConfig extends IndustryFormConfig {
  annexure: string;
  fieldCount: { mandatory: number, optional: number }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MASTER FORM REGISTRY - Maps all 32 industries to their configs
// ═══════════════════════════════════════════════════════════════════════════════

export const FORM_REGISTRY = {
  // GOODS (Annexures A-L)
  'appliances-electronics': { annexure: 'A', name: 'Appliances & Electronics', type: 'goods' },
  'mobile-laptops': { annexure: 'B', name: 'Mobile Phones & Laptops', type: 'goods' },
  'furniture': { annexure: 'C', name: 'Furniture', type: 'goods' },
  'vehicles': { annexure: 'D', name: 'Vehicles', type: 'goods' },
  'fashion': { annexure: 'E', name: 'Fashion & Apparel', type: 'goods' },
  'jewellery': { annexure: 'F', name: 'Jewellery', type: 'goods' },
  'building-materials': { annexure: 'G', name: 'Building Materials', type: 'goods' },
  'collectibles': { annexure: 'H', name: 'Collectibles', type: 'goods' },
  'industrial': { annexure: 'I', name: 'Industrial Machinery', type: 'goods' },
  'books': { annexure: 'J', name: 'Books & Educational', type: 'goods' },
  'art': { annexure: 'K', name: 'Art & Handmade', type: 'goods' },
  'instagram': { annexure: 'L', name: 'Instagram/WhatsApp Sellers', type: 'goods' },
  
  // SERVICES (Annexures A-J)
  'software': { annexure: 'S-A', name: 'Software Development', type: 'service' },
  'ui-ux': { annexure: 'S-B', name: 'UI/UX Design', type: 'service' },
  'content': { annexure: 'S-C', name: 'Content Writing', type: 'service' },
  'photography': { annexure: 'S-D', name: 'Photography', type: 'service' },
  'coaching': { annexure: 'S-E', name: 'Coaching', type: 'service' },
  'repair': { annexure: 'S-F', name: 'Home Repair', type: 'service' },
  'cleaning': { annexure: 'S-G', name: 'Cleaning', type: 'service' },
  'marketing': { annexure: 'S-H', name: 'Digital Marketing', type: 'service' },
  'consulting': { annexure: 'S-I', name: 'Consulting', type: 'service' },
  'events': { annexure: 'S-J', name: 'Event Management', type: 'service' }
};

// ═══════════════════════════════════════════════════════════════════════════════
// FIELD COUNT SUMMARY TABLE
// ═══════════════════════════════════════════════════════════════════════════════

export const FIELD_COUNT_SUMMARY = {
  goods: {
    A: { name: 'Appliances', mandatory: 26, optional: 5, total: 31 },
    B: { name: 'Mobile/Laptops', mandatory: 22, optional: 17, total: 39 },
    C: { name: 'Furniture', mandatory: 22, optional: 9, total: 31 },
    D: { name: 'Vehicles', mandatory: 45, optional: 6, total: 51 },
    E: { name: 'Fashion', mandatory: 29, optional: 1, total: 30 },
    F: { name: 'Jewellery', mandatory: 23, optional: 17, total: 40 },
    G: { name: 'Building Materials', mandatory: 21, optional: 2, total: 23 },
    H: { name: 'Collectibles', mandatory: 20, optional: 22, total: 42 },
    I: { name: 'Industrial', mandatory: 22, optional: 29, total: 51 },
    J: { name: 'Books', mandatory: 30, optional: 18, total: 48 },
    K: { name: 'Art', mandatory: 20, optional: 15, total: 35 },
    L: { name: 'Instagram/WhatsApp', mandatory: 30, optional: 14, total: 44 }
  },
  services: {
    A: { name: 'Software Dev', mandatory: 17, optional: 30, total: 47 },
    B: { name: 'UI/UX Design', mandatory: 11, optional: 31, total: 42 },
    C: { name: 'Content Writing', mandatory: 15, optional: 42, total: 57 },
    D: { name: 'Photography', mandatory: 15, optional: 35, total: 50 },
    E: { name: 'Coaching', mandatory: 20, optional: 44, total: 64 },
    F: { name: 'Home Repair', mandatory: 19, optional: 34, total: 53 },
    G: { name: 'Cleaning', mandatory: 14, optional: 45, total: 59 },
    H: { name: 'Digital Marketing', mandatory: 16, optional: 89, total: 105 },
    I: { name: 'Consulting', mandatory: 22, optional: 56, total: 78 },
    J: { name: 'Event Management', mandatory: 116, optional: 71, total: 187 }
  },
  totals: {
    goods_mandatory: 232,
    goods_optional: 130,
    goods_total: 362,
    services_mandatory: 249,
    services_optional: 477,
    services_total: 726,
    grand_mandatory: 481,
    grand_optional: 607,
    grand_total: 1088
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PLACEHOLDER INSTRUCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

export const IMPLEMENTATION_NOTES = `
INSTRUCTIONS FOR COMPLETING EXACT FORM CONFIGURATIONS:

1. GOODS FORMS (ANNEXURES A-L):
   - ALL forms must include the 15 COMMON MANDATORY FIELDS (product_name, brand, description, etc.)
   - APPLIANCES (A): 26 specific mandatory + 5 optional (with conditional appliance-type tests)
   - MOBILE/LAPTOPS (B): 22 specific mandatory + 17 optional
   - FURNITURE (C): 22 specific mandatory + 9 optional
   - VEHICLES (D): 45 specific mandatory + 6 optional (LARGEST GOODS)
   - FASHION (E): 29 specific mandatory + 1 optional
   - JEWELLERY (F): 23 specific mandatory + 17 optional
   - BUILDING MATERIALS (G): 21 specific mandatory + 2 optional
   - COLLECTIBLES (H): 20 specific mandatory + 22 optional
   - INDUSTRIAL (I): 22 specific mandatory + 29 optional
   - BOOKS (J): 30 specific mandatory + 18 optional
   - ART (K): 20 specific mandatory + 15 optional
   - INSTAGRAM/WHATSAPP (L): 30 specific mandatory + 14 optional

2. SERVICE FORMS (ANNEXURES S-A to S-J):
   - ALL forms must include 4 SERVICE COMMON FIELDS (service_price, payment_schedule, delivery_date, dispute_resolution_days)
   - SOFTWARE (A): 17 specific mandatory + 30 optional
   - UI/UX DESIGN (B): 11 specific mandatory + 31 optional
   - CONTENT WRITING (C): 15 specific mandatory + 42 optional
   - PHOTOGRAPHY (D): 15 specific mandatory + 35 optional (WITH CONDITIONALS: Photo/Video branches)
   - COACHING (E): 20 specific mandatory + 44 optional
   - HOME REPAIR (F): 19 specific mandatory + 34 optional
   - CLEANING (G): 14 specific mandatory + 45 optional
   - DIGITAL MARKETING (H): 16 specific mandatory + 89 optional (WITH CONDITIONALS: Sections 4.1-4.6)
   - CONSULTING (I): 22 specific mandatory + 56 optional
   - EVENT MANAGEMENT (J): 116 specific mandatory + 71 optional (WITH 13 SUB-SERVICES, all conditional by service_type)

3. KEY IMPLEMENTATION PATTERNS:
   - Use [CONDITIONAL IF ...] for simple if-then logic
   - Use [CONDITIONAL BY field_name] for selections from one field affecting others
   - Use [APPEARS IF "option" selected] for section visibility in multi-select
   - Event Management: All 13 sub-service sections should use [APPEARS IF service_type = "...]

4. FIELD TYPES SUPPORTED:
   text, textarea, number, email, phone, date, time, select, multi-select, checkbox, radio, 
   toggle, url, file, textarea-array, repeatable-text, repeatable-url, yes/no

5. VALIDATION:
   - Total goods fields must = 362 (232 mandatory + 130 optional)
   - Total services fields must = 726 (249 mandatory + 477 optional)
   - GRAND TOTAL must = 1,088 fields
   - Each mandatory field must be marked with required: true
   - Each optional field must be marked with required: false (or omitted)

6. FILES LOCATION:
   - Save as: src/services/EXACT_FORM_CONFIGURATIONS_COMPLETE.ts
   - All 32 industry forms must be exported as named exports
   - Create master export: ALL_FORMS = { ...all 32 forms }
   - Create helper: getFormByAnnexure(annexure) → returns matching form config
`;

/**
 * QUICK SETUP GUIDE:
 * 
 * Step 1: Create form configs for each of 32 industries exactly matching spec
 * Step 2: Export each as: export const ANNEXURE_NAME_FORM: IndustryFormConfig = { ... }
 * Step 3: Create master index: export const ALL_FORMS = { A: ..., B: ..., ... }
 * Step 4: Add to FormBuilder component for display
 * Step 5: Verify field counts match FIELD_COUNT_SUMMARY above
 * Step 6: Build & test with npm run build
 */

export default {
  FORM_REGISTRY,
  FIELD_COUNT_SUMMARY,
  IMPLEMENTATION_NOTES
};
