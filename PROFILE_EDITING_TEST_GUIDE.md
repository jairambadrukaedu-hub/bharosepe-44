# Profile Editing - Quick Test Guide

## Testing the Complete Profile Editing Feature

### Environment Setup
```
Server: http://localhost:8081/
Status: ✅ Running (Dev Server)
Database: Supabase (Connected)
```

### Step-by-Step Testing

#### Test 1: View Profile Section
1. Navigate to **Profile** page
2. Click on **Personal** tab
3. Verify you see three sections:
   - ✅ Personal Information (Name, Phone, Email, Bio, Location, Hours)
   - ✅ Address Details (Street, City, State, Pincode)
   - ✅ Tax & Business (Business Name/Type, PAN, GST)
4. Verify optional empty fields show "Not provided"

#### Test 2: Edit Mode Toggle
1. Click **Edit** button (top right)
2. Verify:
   - ✅ All inputs become active/editable
   - ✅ Dropdowns become selectable
   - ✅ Button changes to "Cancel"
   - ✅ Blue info box appears at bottom
3. Click **Cancel**
4. Verify everything reverts to view mode

#### Test 3: Phone Number Validation
1. Click **Edit**
2. In Phone field, try typing:
   - Type "12345678901" (11 digits)
   - Verify only "1234567890" appears (10 max)
3. Try typing letters:
   - Type "abc123"
   - Verify only "123" appears (digits only)

#### Test 4: Pincode Validation
1. Click **Edit**
2. In Pincode field, try typing:
   - Type "1234567" (7 digits)
   - Verify only "123456" appears (6 max)
3. Try typing "12AB":
   - Verify only "12" appears (digits only)

#### Test 5: Fill All Fields
1. Click **Edit**
2. Fill in all fields:
   ```
   Name: "John Doe" *
   Phone: "9876543210"
   Email: "john@example.com"
   Bio: "Trusted trader"
   Location: "Mumbai, Maharashtra"
   Business Hours: "9 AM - 6 PM"
   
   Street: "123 Main Street"
   City: "Mumbai"
   State: "Maharashtra"
   Pincode: "400001"
   
   Business Name: "John's Trading Co"
   Business Type: "Individual"
   PAN: "ABCDE1234F"
   GST: "27AABCT1234A1Z0"
   ```

#### Test 6: Save Profile (Happy Path)
1. After filling all fields, click **Save Changes**
2. Verify:
   - ✅ Green success toast appears: "Profile updated successfully!"
   - ✅ Fields become read-only (disabled state)
   - ✅ Edit button reappears
3. Check browser console for logs:
   - ✅ "useProfile - Updating profile with data..."
   - ✅ "useProfile - Profile updated successfully..."

#### Test 7: Data Persistence (Refresh Test)
1. After saving (Test 6), refresh the page (F5)
2. Navigate back to Profile
3. Click **Personal** tab
4. Verify all entered data displays correctly:
   - ✅ Name, phone, email unchanged
   - ✅ Address fields intact
   - ✅ Business information saved
   - ✅ PAN/GST still in uppercase

#### Test 8: Name Required Validation
1. Click **Edit**
2. Clear the Name field
3. Click **Save Changes**
4. Verify error toast: "Name is required"
5. Name field remains highlighted

#### Test 9: Phone Format Validation
1. Click **Edit**
2. Enter phone: "98765" (only 5 digits)
3. Click **Save Changes**
4. Verify error: "Phone number must be exactly 10 digits"

#### Test 10: Pincode Format Validation
1. Click **Edit**
2. Enter pincode: "4000" (only 4 digits)
3. Click **Save Changes**
4. Verify error: "Pincode must be exactly 6 digits"

#### Test 11: PAN Format Validation
1. Click **Edit**
2. Enter PAN: "ABCDE123" (only 8 chars)
3. Click **Save Changes**
4. Verify error: "PAN number must be exactly 10 characters"

#### Test 12: GST Format Validation
1. Click **Edit**
2. Enter GST: "27AABCT1234A1Z" (only 14 chars)
3. Click **Save Changes**
4. Verify error: "GST number must be exactly 15 characters"

#### Test 13: Uppercase Conversion
1. Click **Edit**
2. In PAN field, type: "abcde1234f"
3. Verify: Text auto-converts to uppercase: "ABCDE1234F"
4. In GST field, type: "27aabct1234a1z0"
5. Verify: Text auto-converts to uppercase: "27AABCT1234A1Z0"

#### Test 14: Business Type Dropdown
1. Click **Edit**
2. Find Business Type field
3. Click the dropdown
4. Verify options appear:
   - Individual
   - Business
   - LLC
   - Pvt Ltd
5. Select "Business"
6. Verify selection displays
7. Click Save and refresh
8. Verify "Business" is saved

#### Test 15: Optional Fields (PAN/GST)
1. Click **Edit**
2. Leave PAN and GST empty
3. Fill other required fields
4. Click **Save Changes**
5. Verify save succeeds (no error)
6. Verify optional fields show "Not provided"

#### Test 16: Email Change Notification
1. Click **Edit**
2. Change email to a new one
3. Verify yellow info box appears:
   "Changing email will require verification of the new address"
4. Click **Save Changes**
5. Verify success toast
6. Verify info message shown

#### Test 17: Edit → Cancel → Edit
1. Click **Edit** button
2. Make some changes (change name)
3. Click **Cancel**
4. Verify form reverts to original data
5. Click **Edit** again
6. Verify the original data is still there

#### Test 18: Multiple Edits
1. Click **Edit**
2. Change: Name, Phone, City, Pincode
3. Click **Save Changes**
4. Wait for success toast
5. Click **Edit** again
6. Change: Business Name, Business Type
7. Click **Save Changes**
8. Verify both sets of changes are saved

#### Test 19: Privacy Notice
1. Click **Edit** button
2. Scroll to bottom
3. Verify blue info box appears:
   "Privacy: Your information is used for secure contract communications..."
4. Click **Cancel**
5. Verify privacy notice disappears

#### Test 20: Field Icons
1. Navigate to Personal tab
2. Verify icons appear for:
   - 👤 Full Name
   - ☎️ Phone Number
   - 📧 Email
   - 📍 Location
   - 🕐 Business Hours
   - 📍 Address Details (section header)
   - 🏢 Tax & Business (section header)

### Validation Summary Table

| Field | Min | Max | Format | Required | Notes |
|-------|-----|-----|--------|----------|-------|
| Name | 1 | ∞ | Text | ✅ Yes | Trimmed |
| Phone | 10 | 10 | Digits | ❌ No | Auto-formatted |
| Email | - | - | Email | ✅ Yes | Verified on change |
| Bio | 0 | ∞ | Text | ❌ No | - |
| Location | 0 | ∞ | Text | ❌ No | - |
| Business Hours | 0 | ∞ | Text | ❌ No | - |
| Address | 0 | ∞ | Text | ❌ No | - |
| City | 0 | ∞ | Text | ❌ No | - |
| State | 0 | ∞ | Text | ❌ No | - |
| Pincode | 6 | 6 | Digits | ❌ No | If filled: exactly 6 |
| Business Name | 0 | ∞ | Text | ❌ No | - |
| Business Type | - | - | Select | ❌ No | 4 options |
| PAN | 10 | 10 | Alphanumeric | ❌ No | If filled: exactly 10, uppercase |
| GST | 15 | 15 | Alphanumeric | ❌ No | If filled: exactly 15, uppercase |

### Console Logs to Verify

When saving profile, you should see in browser console:

```javascript
// Edit mode toggle
"ProfileSetup - Component mounted"
"useProfile - Fetching profile for user: [user-id]"

// Save action
"useProfile - Updating profile with data: {...}"
"useProfile - Profile updated successfully: {...}"

// Error scenarios
"useProfile - Error updating profile: [error message]"
```

### Success Indicators

✅ All tests passed when you see:
1. Success toast messages appear on save
2. Data persists after page refresh
3. Validation messages appear for invalid input
4. Fields properly enable/disable on edit toggle
5. Auto-formatting works (phone, pincode, PAN, GST)
6. All three sections render correctly
7. "Not provided" shows for empty optional fields
8. Icons display correctly
9. Dropdowns work for Business Type
10. Email change shows verification notice

### Common Issues & Fixes

**Issue**: Fields don't become editable
- **Fix**: Make sure you clicked "Edit" button and it shows "Cancel"

**Issue**: Save shows error "User not authenticated"
- **Fix**: Login/refresh page and ensure user session is active

**Issue**: Data doesn't persist after refresh
- **Fix**: Check browser console for database errors
- **Fix**: Verify Supabase connection in HealthCheck

**Issue**: Phone validation too strict
- **Fix**: This is intentional - exactly 10 digits required for Indian numbers

**Issue**: PAN/GST not auto-converting to uppercase
- **Fix**: Text should auto-convert as you type - if not, check console

### Performance Checklist

- ✅ Save completes in < 2 seconds
- ✅ No lag when typing in fields
- ✅ Dropdowns open instantly
- ✅ Page refresh loads data within 1 second
- ✅ No console errors
- ✅ Memory usage stays stable

---

## Test Report Template

```
Date: [Date]
Tester: [Your Name]
Browser: [Chrome/Firefox/Safari]
Server: http://localhost:8081/

Tests Passed: __/20
Issues Found: 

[ ] Test 1: View Profile Section ✅/❌
[ ] Test 2: Edit Mode Toggle ✅/❌
[ ] Test 3: Phone Number Validation ✅/❌
[ ] Test 4: Pincode Validation ✅/❌
[ ] Test 5: Fill All Fields ✅/❌
[ ] Test 6: Save Profile ✅/❌
[ ] Test 7: Data Persistence ✅/❌
[ ] Test 8: Name Required ✅/❌
[ ] Test 9: Phone Format ✅/❌
[ ] Test 10: Pincode Format ✅/❌
[ ] Test 11: PAN Format ✅/❌
[ ] Test 12: GST Format ✅/❌
[ ] Test 13: Uppercase Conversion ✅/❌
[ ] Test 14: Business Type Dropdown ✅/❌
[ ] Test 15: Optional Fields ✅/❌
[ ] Test 16: Email Change Notification ✅/❌
[ ] Test 17: Edit Cancel Edit ✅/❌
[ ] Test 18: Multiple Edits ✅/❌
[ ] Test 19: Privacy Notice ✅/❌
[ ] Test 20: Field Icons ✅/❌

Notes:
[Your observations]

Issues to Fix:
[Any problems found]
```

---

**Status**: Ready for Testing ✅
**Implementation Date**: November 25, 2025
**Test Environment**: Localhost 8081
