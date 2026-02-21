# Quick Reference: Canonical Column Names

## 📌 When to Use Which Column

Use this as your reference guide when writing code that accesses form_submissions table.

---

## ✅ CONDITION FIELDS (Damage Assessment)

| What You're Recording | Use This Column | NOT These | Example Value |
|---|---|---|---|
| Scratches on device | `scratches_present` | scratches | "yes" / "no" |
| Dents on device | `dents_present` | dents, back_dents | "yes" / "no" |
| Battery health % | `battery_health_percent` | battery_health_percentage, battery_health_iphone | 87 (integer) |
| Water marks | `water_marks` | — | "yes" / "no" |
| Screen damage | `screen_ok` | screen_condition (if yes/no) | "yes" / "no" |
| Touch damage | `touchscreen` | touch_ok, touch_issues | "yes" / "no" |
| Camera damage | `camera_ok` | front_back_camera | "yes" / "no" |
| Stone missing | `missing_stone` | — | "yes" / "no" |
| Overall defects | `known_defects` | known_issues, other_damages | "Cracked screen on corner" |

---

## ⚡ FUNCTIONALITY FIELDS (Does It Work?)

| What You're Testing | Use This Column | NOT These | Example Value |
|---|---|---|---|
| Powers on | `power_on_working` | power_on, turns_on | "yes" / "no" |
| Charges | `charging_working` | charges | "yes" / "no" |
| Screen works | `screen_ok` | screen_condition (if yes/no) | "yes" / "no" |
| Touch works | `touchscreen` | touch_ok | "yes" / "no" |
| Buttons work | `buttons_ok` | buttons | "yes" / "no" |
| Speakers work | `speakers_ok` | — | "yes" / "no" |
| Camera works | `camera_ok` | front_back_camera | "yes" / "no" |
| Wifi/BT works | `wifi_bluetooth_ok` | wifi_bluetooth | "yes" / "no" |
| Ports work | `ports_ok` | — | "yes" / "no" |
| Thermal issues | `heating_issues` | overheating | "yes" / "no" |

---

## 🆔 IDENTIFICATION FIELDS (Serial Numbers)

| What You're Recording | Use This Column | NOT These | Example Value |
|---|---|---|---|
| Mobile IMEI | `imei` | imei_1, imei1, imei_2, imei2 | "123456789012345" |
| Secondary IMEI (dual-SIM) | `imei_2` | imei_2 only if dual-SIM | "987654321098765" |
| Serial number | `serial_number` | — | "KMQR3TH..." |
| Engine number | `engine_number` | — | "ABC1234567" |
| Registration | `registration_number` | — | "UP 15 AB 1234" |
| Batch number | `batch_number` | — | "B2021001" |
| Edition | `edition_number` | — | "1st Edition" |

---

## 📦 ACCESSORIES (Included Items)

| What You're Recording | Use This Column | NOT These | Example Value |
|---|---|---|---|
| Box included | `original_box` | box, original_box_included | "yes" / "no" |
| Charger included | `original_charger` | charger, original_charger_included | "yes" / "no" |
| Charging cable | `cable` | — | "yes" / "no" |
| Earphones | `earphones` | — | "yes" / "no" |
| Manual/Documentation | `manual` | — | "yes" / "no" |
| Remote control | `remote` | — | "yes" / "no" |
| Stand/Base | `stand_base` | — | "yes" / "no" |
| Other items | `other_accessories` | others | "Screen protector..." |

---

## 📋 WARRANTY & LEGAL (Important Status)

| What You're Recording | Use This Column | NOT These | Example Value |
|---|---|---|---|
| Warranty status | `warranty_status` | warranty_info | "valid", "expired" |
| Warranty valid until | `warranty_valid_until` | warranty_valid_till | "2025-12-31" |
| Device locked | `icloud_lock_status` | — | "yes" / "no" |
| FRP lock status | `google_frp_lock` | — | "yes" / "no" |
| MI account lock | `mi_account_lock` | — | "yes" / "no" |
| Authenticity | `authenticity_guaranteed` | — | "yes" / "no" |
| Receipt available | `purchase_receipt_available` | — | "yes" / "no" |
| RC status | `rc_status` | — | "valid", "expired" |

---

## 🔧 REPAIRS & REPLACEMENTS (Hardware History)

| What You're Recording | Use This Column | NOT These | Example Value |
|---|---|---|---|
| Screen replaced | `screen_replaced` | — | "yes" / "no" |
| Battery replaced | `battery_replaced` | — | "yes" / "no" |
| Back glass replaced | `back_glass_replaced` | — | "yes" / "no" |
| Charging port replaced | `charging_port_replaced` | — | "yes" / "no" |
| Motherboard replaced | `motherboard_replaced` | — | "yes" / "no" |
| Speaker replaced | `speaker_replaced` | — | "yes" / "no" |
| RAM/SSD upgraded | `ssd_ram_replaced` | ram_ssd_upgraded | "yes" / "no" |
| Service history | `previous_repairs` | authorized_service_repair | "Text description..." |

---

## 📐 DIMENSIONS (Sizes & Measurements)

| What You're Recording | Use This Column | NOT These | Example Value |
|---|---|---|---|
| Length | `length_cm` | — | 15.3 |
| Width | `width_cm` | breadth_cm | 7.2 |
| Depth | `depth_cm` | height_cm (context dependent) | 0.8 |
| Height | `height_cm` | — | 10.5 |
| Thickness | `thickness_mm` | — | 8.5 |

---

## 📝 DESCRIPTION FIELDS (Text Information)

| What You're Recording | Use This Column | NOT These | Example Value |
|---|---|---|---|
| Product name | `product_name` | item_name, item_title | "iPhone 15 Pro" |
| Brand | `brand` | — | "Apple" |
| Model | `model` | model_name, model_number | "MU5H3LL/A" |
| Category | `category` | jewellery_category (if jewelry) | "Smartphones" |
| Description | `description` | — | "Used daily, excellent condition" |
| Known defects | `known_defects` | known_issues, other_damages | "Slight chip on corner" |

---

## 🎬 MEDIA FILES (Photo/Video URLs)

| Media Type | Use This Column | Store As | Example |
|---|---|---|---|
| Condition photos | `condition_photos` | Comma-separated URLs | "photo1.jpg, photo2.jpg" |
| Working demo video | `working_demonstration_video` | URL | "video1.mp4" |
| 360-degree view | `360_video` | URL | "video2.mp4" |
| Serial number photo | `serial_number_closeup` | URL | "serial.jpg" |
| Defect closeup | `defect_closeup_photos` | URL | "defect.jpg" |
| All media stored in JSONB | `media_files` | JSONB object | `{...}` |

---

## 🟡 STATUS & METADATA FIELDS

| What You're Recording | Use This Column | Type | Example Value |
|---|---|---|---|
| Form completion % | `completion_percentage` | INTEGER 0-100 | 85 |
| Form status | `form_status` | VARCHAR | "draft" / "completed" |
| Total fields filled | `total_fields_filled` | INTEGER | 42 |
| Required fields done | `required_fields_completed` | INTEGER | 35 |
| Created timestamp | `created_at` | TIMESTAMPTZ | NOW() |
| Updated timestamp | `updated_at` | TIMESTAMPTZ | NOW() |
| Submitted timestamp | `submitted_at` | TIMESTAMPTZ | NOW() |

---

## 🔴 DEPRECATED (Do NOT Use These)

These columns are consolidated into canonical columns. Data stored here will NOT be used.

```
scratches              → Use: scratches_present
dents                  → Use: dents_present
battery_health_percentage → Use: battery_health_percent
power_on               → Use: power_on_working
turns_on               → Use: power_on_working
charges                → Use: charging_working
screen_condition (for yes/no) → Use: screen_ok
touch_ok               → Use: touchscreen
touch_issues           → Use: touchscreen
front_back_camera      → Use: camera_ok
box                    → Use: original_box
original_box_included  → Use: original_box
charger                → Use: original_charger
original_charger_included → Use: original_charger
warranty_valid_till    → Use: warranty_valid_until
others                 → Use: other_accessories
known_issues           → Use: known_defects
other_damages          → Use: known_defects
imei_1, imei1          → Use: imei
imei_2 (unless dual-SIM) → Use: imei
imei2                  → Use: imei_2 (if needed)
ram_ssd_upgraded       → Use: ssd_ram_replaced
```

---

## 📌 Using in Code

### In TypeScript (formDataMapper.ts):
```typescript
// ✅ CORRECT - Maps to canonical column
const mapped = {
  scratches: formData.scratches → 'scratches_present',
  power_on: formData.power_on → 'power_on_working',
  battery_health_percentage: formData.battery_health_percentage → 'battery_health_percent',
};

// ❌ WRONG - Creates non-canonical columns
const mapped = {
  scratches: formData.scratches → 'scratches',  // Should map to scratches_present
};
```

### In SQL (Direct queries):
```sql
-- ✅ CORRECT - Uses canonical columns
SELECT scratches_present, dents_present, battery_health_percent, power_on_working
FROM form_submissions WHERE transaction_id = 'xyz';

-- ❌ WRONG - Uses deprecated columns
SELECT scratches, dents, battery_health_percentage, power_on
FROM form_submissions WHERE transaction_id = 'xyz';
```

### In Contract Templates:
```html
<!-- ✅ CORRECT - Uses canonical placeholder names -->
<p>Scratches: {{scratches_present}}</p>
<p>Dents: {{dents_present}}</p>
<p>Battery: {{battery_health_percent}}%</p>

<!-- ❌ WRONG - Uses deprecated names -->
<p>Scratches: {{scratches}}</p>
<p>Dents: {{dents}}</p>
```

---

## ✨ Quick Lookup (Alphabetical)

| If you need... | Use this column |
|---|---|
| Accessories | `original_box`, `original_charger`, `cable`, `earphones` |
| Battery info | `battery_health_percent`, `battery_replaced` |
| Brand | `brand` |
| Buttons | `buttons_ok` |
| Camera | `camera_ok` |
| Category | `category` |
| Charging | `charging_working`, `charging_port_replaced` |
| Dents | `dents_present` |
| Description | `description`, `known_defects` |
| Engine number | `engine_number` |
| Fingerprint | `fingerprint_faceid` |
| Heating | `heating_issues` |
| IMEI | `imei` (or `imei_2` for secondary) |
| Manual | `manual` |
| Model | `model` |
| Network | `network_issues` |
| Original box | `original_box` |
| Original charger | `original_charger` |
| Other items | `other_accessories` |
| Ports | `ports_ok` |
| Power on | `power_on_working` |
| Previous repairs | `previous_repairs` |
| Receipt | `purchase_receipt_available` |
| Remote | `remote` |
| Scratches | `scratches_present` |
| Screen | `screen_ok` |
| Speaker | `speakers_ok` |
| Stand | `stand_base` |
| Touch | `touchscreen` |
| Warranty | `warranty_status`, `warranty_valid_until` |
| WiFi/Bluetooth | `wifi_bluetooth_ok` |

---

## 🔗 Related Documentation

- **DUPLICATE_COLUMNS_ANALYSIS.md** - Why consolidation was needed
- **CONSOLIDATION_IMPLEMENTATION_GUIDE.md** - How to implement consolidation
- **20251127_consolidate_duplicate_columns.sql** - Migration to run in Supabase

---

**Last Updated**: November 27, 2025  
**Print this page**: Use as office reference for developers
**Questions?**: Check CONSOLIDATION_IMPLEMENTATION_GUIDE.md
