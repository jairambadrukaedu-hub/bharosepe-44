# Quick Reference: Required Fields by Industry

## 🔴 Universal Required Fields (ALL Industries)
Every form requires these 6 fields to generate a contract:

| Field | Name in Form | Why Required |
|-------|--------------|-------------|
| Description | `itemDescription` | Describes what's being sold |
| Price | `totalPrice` | Transaction amount for escrow |
| Delivery Date | `deliveryDate` | When buyer receives item |
| Delivery Mode | `deliveryMode` | How it's delivered (courier/pickup/etc) |
| Return Policy | `returnPolicy` | When/how can buyer return |
| Inspection Window | `inspectionWindow` | Time to inspect before auto-release |

---

## 📱 Electronics & Mobile Phones

**Add these 4 fields to the 6 universal fields:**

| Field | Name in Form | Why Required |
|-------|--------------|-------------|
| Brand | `brand` | Model identification for authenticity |
| Condition | `condition` | Used/New/Refurbished affects warranty |
| Defects | `functionalIssues` | Full disclosure prevents fraud |
| Accessories | `accessories` | What's included in box |

**Total: 10 required fields**

**Example Asterisks Shown On:**
```
Product Name * (can be under itemDescription or product_name)
Brand *
Condition *
Any Defects *
Included Accessories *
Description *
Price *
Delivery Date *
Delivery Mode *
Return Policy *
```

---

## 🛋️ Furniture

**Add these 5 fields to the 6 universal fields:**

| Field | Name in Form | Why Required |
|-------|--------------|-------------|
| Dimensions | `dimensions` | Size affects fit in space |
| Materials | `materials` | Quality & durability indicator |
| Condition | `condition` | Used/New determines value |
| Damage | `damages` | Full disclosure of wear/stains |
| Assembly | `assembly` | Labor needed affects total cost |

**Total: 11 required fields**

**Example Missing Fields Error:**
```
"Required fields are missing: Dimensions, Materials, Condition, Damage/Wear, Assembly. 
Please fill all fields marked with * (red asterisk) before generating the contract."
```

---

## 🚗 Vehicles (Cars, Bikes, etc)

**Add these 3 fields to the 6 universal fields:**

| Field | Name in Form | Why Required |
|-------|--------------|-------------|
| Brand/Make | `brand` | Car model identification |
| Condition | `condition` | Mileage & usage status |
| Damage | `damages` | Accident/repair history |

**Total: 9 required fields**

---

## 📚 Books & Publications

**Add this 1 field to the 6 universal fields:**

| Field | Name in Form | Why Required |
|-------|--------------|-------------|
| Author | `author` | Book identification |

**Total: 7 required fields**

---

## 🎨 Art & Collectibles

**Add these 2 fields to the 6 universal fields:**

| Field | Name in Form | Why Required |
|-------|--------------|-------------|
| Artist | `artist` | Authenticity verification |
| Medium | `medium` | Material composition |

**Total: 8 required fields**

---

## 🏗️ Industrial Equipment

**Add these 2 fields to the 6 universal fields:**

| Field | Name in Form | Why Required |
|-------|--------------|-------------|
| Brand | `brand` | Equipment model & specs |
| Condition | `condition` | Usage status affects value |

**Total: 8 required fields**

---

## ✅ How to Use This Guide

### For Users Filling Forms:
1. Select your product category
2. Look at the table above for your category
3. Fill all fields marked with **\*** (red asterisk)
4. Other fields are helpful but not mandatory
5. When done, click "Generate Contract"

### For Testing:
- Try filling only the required fields for your category
- Try generating with one missing required field → Should show clear error
- Try with all required fields → Should generate contract successfully

### For Developers:
The `getEssentialFieldNames()` function in `ContractGenerationUI.tsx` returns the required fields for the current category. Add to the switch statement when adding new categories.

---

## 🐛 Troubleshooting

### Error: "Required fields are missing"
→ Check the error message for the list of missing fields  
→ Find those field labels in the form  
→ Fill each one  
→ Try generating again  

### Red asterisks not visible?
→ Scroll up to see the "Required Fields" banner  
→ Fields marked with **\*** are mandatory  
→ Orange/amber banner shows currently missing fields  

### Can't find a field?
→ Use Ctrl+F (or Cmd+F on Mac) to search for the field name  
→ Check category is correct (different categories have different fields)  
→ Some fields have multiple names (e.g., "Product Name" = "itemDescription")  

---

## 📋 Field Name Mapping

Some fields can appear under different names in the form:

| Standard Name | Alternative Names | Used In |
|---------------|-------------------|---------|
| `itemDescription` | product_name, product_description, item_title, description | ALL |
| `totalPrice` | price, sale_price | ALL |
| `deliveryDate` | expected_delivery_date | ALL |
| `deliveryMode` | delivery_method, delivery_mode | ALL |
| `brand` | make, manufacturer | Electronics, Vehicles, Industrial |
| `condition` | item_condition, status | ALL |
| `damages` | damage, wear_and_tear | Electronics, Furniture, Vehicles |
| `functionalIssues` | defects, issues, problems | Electronics |
| `accessories` | included_items, whats_included | Electronics |
| `author` | book_author, writer | Books |
| `artist` | creator, artwork_artist | Art |

If a field says it's required but you can't find it, try searching for any of the alternative names.
