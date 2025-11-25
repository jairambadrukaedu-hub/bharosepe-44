# Signup Database Error - Root Cause & Fix

## 🔴 The Problem

Users see "Database error saving new user" (500 error) during signup. The issue is in your Supabase database triggers.

## 🔍 Root Cause

**The `handle_new_user()` trigger function was referencing a `role` column that was deleted.**

Timeline:
1. Migration `20251125_remove_role_from_profiles.sql` **dropped** the `role` column from the profiles table
2. The trigger function `handle_new_user()` **still tried to insert** into the deleted `role` column
3. When users signed up, the trigger executed and PostgreSQL threw: `"column 'role' does not exist"`
4. This caused the entire profile creation to fail → 500 error

## ✅ The Fixes Applied

### Fix #1: Updated Database Trigger
**File**: `supabase/migrations/20251125_fix_handle_new_user_trigger.sql`

Updated the `handle_new_user()` function to NOT reference the deleted `role` column:

**Before (Broken)**:
```sql
INSERT INTO public.profiles (user_id, full_name, phone, role)
VALUES (
  new.id,
  new.raw_user_meta_data->>'full_name',
  new.raw_user_meta_data->>'phone',
  COALESCE(new.raw_user_meta_data->>'role', 'Buyer')  -- ❌ role column doesn't exist
);
```

**After (Fixed)**:
```sql
INSERT INTO public.profiles (user_id, full_name, phone)
VALUES (
  new.id,
  new.raw_user_meta_data->>'full_name',
  new.raw_user_meta_data->>'phone'
  -- ✅ Removed role entirely
);
```

### Fix #2: Updated Signup Code
**File**: `src/hooks/use-auth.tsx`

- ✅ Changed `id` to `user_id` (correct column name for profiles table)
- ✅ Removed unreliable `setTimeout` and use proper async/await
- ✅ Added explicit `onConflict: 'user_id'` for upsert
- ✅ Improved error logging with clear messaging

**Key changes**:
```tsx
// Before: ❌ Wrong column name, timeout-based
.upsert({
  id: authData.user.id,  // WRONG - should be user_id
  ...
});
setTimeout(async () => { ... }, 1000);  // ❌ Unreliable

// After: ✅ Correct, async
const profileData = {
  user_id: authData.user.id,  // ✅ CORRECT
  ...
};
const { error } = await supabase
  .from('profiles')
  .upsert(profileData, { onConflict: 'user_id' });  // ✅ Explicit
```

## 📋 Profiles Table Current State

### Required Columns (Hard Constraints)
- `id` (UUID, auto-generated)
- `user_id` (UUID, NOT NULL, UNIQUE, references auth.users)
- `created_at` (auto-generated)
- `updated_at` (auto-generated)

### Optional Fields
- `full_name`
- `phone`
- `email`
- `address`
- `city`
- `state`
- `pincode`
- `pan_number`
- `gst_number`
- `business_name`
- `business_type` (values: 'individual', 'business', 'llc', 'pvt_ltd')
- `avatar_url`
- `verified_phone`

### No Longer Exists
- ❌ `role` (removed by design - role is dynamic, determined by transaction context)

## 🔄 How Signup Now Works

1. **User submits signup form** with email, password, and optional profile fields
2. **Auth user created** in `auth.users` table
3. **Trigger fires**: `on_auth_user_created` → calls `handle_new_user()`
4. **Trigger creates basic profile** with just `user_id`, `full_name`, `phone`
5. **Signup code updates profile** with additional fields (email, address, etc.)
6. **User successfully created** ✅

## ⚠️ What Was Causing the Error

| Step | Status |
|------|--------|
| User submits form | ✅ Works |
| Auth user created | ✅ Works |
| Trigger fires | ✅ Fires |
| Trigger tries to insert `role` | ❌ **FAILS** - column doesn't exist |
| Entire transaction rolls back | ❌ FAILS |
| User sees 500 error | ❌ ERROR |

## ✨ After the Fix

| Step | Status |
|------|--------|
| User submits form | ✅ Works |
| Auth user created | ✅ Works |
| Trigger fires | ✅ Fires |
| Trigger inserts profile (no role) | ✅ **WORKS** |
| Signup code updates profile | ✅ WORKS |
| User successfully created | ✅ SUCCESS |

## 🚀 Deployment Steps

1. **Apply migration** to update the trigger:
   ```bash
   # This happens automatically when Supabase syncs migrations
   # Or manually if using local Supabase:
   supabase db push
   ```

2. **Restart your application** to load the updated code

3. **Test signup** with a new email address - it should now work!

## 🧪 Testing

Try signing up with:
- Email: `testuser@example.com`
- Password: (any valid password)
- Leave other fields empty or fill them in

You should NOT see a "Database error saving new user" anymore. ✅

## 📚 Additional Context

### Why Role Was Removed
The `role` column was removed because:
- Users are **both buyers AND sellers** in transactions
- Role isn't a fixed property of the user
- Role is **determined by context** (who initiated the transaction)
- This prevents confusion and accidental permission issues

### Profile Schema Migration History
```
Sept 11: Initial profiles table with id, user_id, full_name, phone, role
Sept 13: Added transactions, contracts, user_roles tables
Oct 22: Added amount to contracts
Nov 24: Created evidence & escrow tables
Nov 25: 
  - Added missing profile fields (email, address, city, state, pincode, pan, gst, business)
  - Created contract notifications
  - Removed role column (no longer needed - role is transaction-context driven)
  - ❌ BUT trigger wasn't updated - CAUSED THE BUG
```

### Why This Bug Happened
The migration correctly removed the `role` column from the schema, but the **trigger function wasn't updated** to match. This is a common issue when:
- Multiple migrations happen in sequence
- Trigger updates aren't coordinated with schema changes
- Testing doesn't catch profile-creation failures immediately

---

## Questions?

See `DATABASE_SCHEMA_ANALYSIS.md` for complete technical details on:
- Table constraints
- RLS policies
- Foreign key relationships
- All field requirements
