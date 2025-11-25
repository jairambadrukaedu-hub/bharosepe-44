# Supabase Database Schema Analysis - Profile Save Error

## Problem Summary
Users are getting a "Database error saving new user" error during signup when trying to create a new profile. This is a 500 error from Supabase.

---

## Current Profiles Table Schema

### Table Structure
```sql
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  pan_number TEXT,
  gst_number TEXT,
  business_name TEXT,
  business_type TEXT CHECK (business_type IN ('individual', 'business', 'llc', 'pvt_ltd')),
  verified_phone BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### Column Analysis

| Column | Type | Constraints | Default | Nullable |
|--------|------|-------------|---------|----------|
| `id` | UUID | PRIMARY KEY | gen_random_uuid() | ❌ Required |
| `user_id` | UUID | UNIQUE, REFERENCES auth.users(id) | None | ❌ Required |
| `full_name` | TEXT | None | None | ✅ Optional |
| `phone` | TEXT | None | None | ✅ Optional |
| `avatar_url` | TEXT | None | None | ✅ Optional |
| `email` | TEXT | None | None | ✅ Optional |
| `address` | TEXT | None | None | ✅ Optional |
| `city` | TEXT | None | None | ✅ Optional |
| `state` | TEXT | None | None | ✅ Optional |
| `pincode` | TEXT | None | None | ✅ Optional |
| `pan_number` | TEXT | None | None | ✅ Optional |
| `gst_number` | TEXT | None | None | ✅ Optional |
| `business_name` | TEXT | None | None | ✅ Optional |
| `business_type` | TEXT | CHECK constraint | None | ✅ Optional |
| `verified_phone` | BOOLEAN | None | FALSE | ✅ Optional |
| `created_at` | TIMESTAMP WITH TIME ZONE | None | now() | ❌ Required |
| `updated_at` | TIMESTAMP WITH TIME ZONE | None | now() | ❌ Required |

---

## Triggers and Functions

### 1. `handle_new_user()` Trigger (CRITICAL ⚠️)
**Location**: Created after `auth.users` INSERT

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, phone, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    COALESCE(new.raw_user_meta_data->>'role', 'Buyer')
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

**🚨 PROBLEM IDENTIFIED**: The trigger is trying to insert a `role` column that **no longer exists** after migration `20251125_remove_role_from_profiles.sql` dropped it!

### 2. `update_updated_at_column()` Trigger
Automatically updates the `updated_at` timestamp when a profile is updated.

---

## Root Cause Analysis

### The Error Sequence
1. User signs up → `auth.users` record is created
2. Database trigger `on_auth_user_created` fires automatically
3. `handle_new_user()` function tries to INSERT into `profiles` table
4. **Trigger attempts to insert `role` column which no longer exists** ❌
5. PostgreSQL throws an error: "column 'role' does not exist"
6. The entire transaction fails
7. User sees: "Database error saving new user" (500 error)

### Why This Happens
- **Migration `20251125_remove_role_from_profiles.sql`** removed the `role` column
- **But `handle_new_user()` function was NOT updated** to match
- The function still references the deleted `role` column
- This causes all new user registrations to fail

---

## Current Signup Flow Issues

### In `use-auth.tsx`
The code has a workaround but it's insufficient:

```tsx
// After successful auth creation, try to update profile separately
if (authData.user) {
  setTimeout(async () => {
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: authData.user.id,
          email: email,
          full_name: userData?.full_name || '',
          phone: userData?.phone || '',
          address: userData?.address || '',
          city: userData?.city || '',
          state: userData?.state || '',
          pincode: userData?.pincode || '',
          pan_number: userData?.pan_number || '',
          gst_number: userData?.gst_number || '',
          business_name: userData?.business_name || '',
          business_type: userData?.business_type || ''
        });

      if (profileError) {
        console.warn('Profile update warning (non-critical):', profileError);
      }
    } catch (err) {
      console.warn('Error updating profile (non-critical):', err);
    }
  }, 1000);
}
```

**Issues with this approach:**
- ❌ Uses `id` instead of `user_id` (mismatch with profiles table)
- ❌ The trigger fails **before this code runs**, so no profile exists yet
- ❌ Upsert cannot work if the trigger already failed
- ❌ 1-second timeout is unreliable

---

## What's Required vs What Gets Provided

### Required Columns (Hard Constraints)
- `user_id` - ❌ Not being provided by trigger (auth.users.id is passed as part of trigger)
- `created_at` - ✅ Auto-generated
- `updated_at` - ✅ Auto-generated

### Provided by Trigger
- `user_id` (from `new.id`) - ✅ Correct
- `full_name` (from raw_user_meta_data) - ✅ Optional
- `phone` (from raw_user_meta_data) - ✅ Optional  
- `role` (from raw_user_meta_data or 'Buyer') - ❌ **COLUMN DOESN'T EXIST**

### All Other Fields
All other fields (email, address, city, state, etc.) are:
- Not being inserted by trigger
- Inserted later by `upsert` in signup code
- Completely optional

---

## RLS Policies Status

### Profiles Table Policies
```sql
-- View all profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);

-- Create own profile
CREATE POLICY "Users can create their own profile" ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Update own profile
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Additional transaction-based view policy
CREATE POLICY "Transaction participants can view counterpart profiles" ON public.profiles 
FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM transactions t
    WHERE (t.buyer_id = auth.uid() AND t.seller_id = profiles.user_id) OR
          (t.seller_id = auth.uid() AND t.buyer_id = profiles.user_id)
  )
);
```

---

## Constraints and Check Conditions

### Business Type Constraint
```sql
business_type TEXT CHECK (business_type IN ('individual', 'business', 'llc', 'pvt_ltd'))
```
- ✅ Not violated during signup (field is optional)
- ✅ Only enforced when business_type is explicitly provided

### Foreign Key Constraint
```sql
user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE
```
- ✅ Will fail if user doesn't exist in auth.users (but trigger fires AFTER insert, so user exists)
- ✅ UNIQUE constraint prevents duplicate profiles per user

---

## Summary of Issues

| Issue | Severity | Impact | Status |
|-------|----------|--------|--------|
| `handle_new_user()` references deleted `role` column | 🔴 Critical | **All signups fail** | **CAUSING ERROR** |
| `use-auth.tsx` uses `id` instead of `user_id` | 🔴 Critical | Profile upsert fails | Secondary issue |
| Signup code uses setTimeout instead of proper async | 🟡 Medium | Race conditions possible | Workaround fragile |
| No validation of business_type in UI | 🟡 Medium | Type mismatch with CHECK | Not currently hitting |
| Missing error logging | 🟡 Medium | Hard to debug | Makes troubleshooting difficult |

---

## Solution Needed

### URGENT FIX REQUIRED:
**Update the `handle_new_user()` function to NOT reference the `role` column:**

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, phone)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  );
  RETURN new;
END;
$$;
```

### SECONDARY FIX:
**Update `use-auth.tsx` signup code to use `user_id` instead of `id`**

---

## Fields Expected During Signup

Based on your signup form, users can provide:
```typescript
{
  email: string,              // ✅ Provided
  password: string,          // ✅ Auth only
  full_name: string,         // ✅ Optional
  phone: string,             // ✅ Optional
  address: string,           // ✅ Optional
  city: string,              // ✅ Optional
  state: string,             // ✅ Optional
  pincode: string,           // ✅ Optional
  pan_number: string,        // ✅ Optional
  gst_number: string,        // ✅ Optional
  business_name: string,     // ✅ Optional
  business_type: string,     // ✅ Optional (must be one of: 'individual', 'business', 'llc', 'pvt_ltd')
}
```

**None of these are causing the constraint error - the error is the missing `role` column in the trigger.**

---

## Next Steps

1. ✅ **Immediate**: Update `handle_new_user()` function to remove `role` reference
2. ✅ **Immediate**: Update `use-auth.tsx` to use correct column names
3. ✅ **Recommended**: Add better error logging to track issues
4. ✅ **Recommended**: Add database constraints documentation in README
