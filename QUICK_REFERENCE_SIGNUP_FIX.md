# Quick Reference: Signup Error Fix

## The Problem (In One Sentence)
Supabase trigger tries to insert into a deleted `role` column → signup fails with 500 error

## The Solution (In One Sentence)  
Updated trigger to remove deleted column reference + fixed signup code to use correct column name

## What Changed

### ✅ New File: Database Migration
```
supabase/migrations/20251125_fix_handle_new_user_trigger.sql
```
- Updates `handle_new_user()` function
- Removes `role` column from INSERT statement

### ✅ Updated: Signup Code
```
src/hooks/use-auth.tsx (lines 114-147)
```
- Fixed column name: `id` → `user_id`
- Removed setTimeout, using proper async
- Better error logging

## Deploy Instructions

```powershell
# 1. Push migration
supabase db push

# 2. Restart app
Get-Process -Name node | Stop-Process -Force
npm run dev

# 3. Test with new email
# → Should work without "Database error"
```

## Profile Schema Quick Facts

### Required (Hard Constraints)
- `id` (UUID, auto-generated)
- `user_id` (UUID, NOT NULL, UNIQUE)
- `created_at` (auto timestamp)
- `updated_at` (auto timestamp)

### Optional (Any/All Can Be Empty)
- `full_name`, `phone`, `email`, `address`, `city`, `state`, `pincode`
- `pan_number`, `gst_number`, `business_name`, `business_type`
- `avatar_url`, `verified_phone`

### Deleted (No Longer Exists)
- ❌ `role` (users are both buyer & seller - role is dynamic)

## The Root Cause

Timeline:
```
Sept 11  → role column created
Nov 25   → role column deleted ✅ (good decision)
Nov 25   → trigger NOT updated ❌ (bad - causes bug)
Now      → signup fails ← YOU ARE HERE
After    → signup works ← AFTER FIX
```

## Why Signup Was Failing

```
1. User signs up → auth.users created
2. Trigger fires → calls handle_new_user()
3. Function tries: INSERT ... role = 'Buyer'
4. Error: column role doesn't exist ❌
5. Transaction fails
6. 500 error to user
```

## After Fix

```
1. User signs up → auth.users created
2. Trigger fires → calls handle_new_user()
3. Function inserts: user_id, full_name, phone ✅
4. Success → profile created
5. Signup code enhances with: email, address, etc. ✅
6. User successfully registered
```

## Verification Checklist

- [ ] Migration applied to Supabase
- [ ] App restarted
- [ ] Can create new account with email
- [ ] No "Database error saving new user"
- [ ] Profile appears in database
- [ ] Can sign in with new account

## If Still Not Working

Check function definition:
```sql
SELECT pg_get_functiondef(oid) FROM pg_proc 
WHERE proname = 'handle_new_user';
```

Should show:
```
INSERT INTO public.profiles (user_id, full_name, phone)
-- NO role!
```

If it still has `role`, the migration didn't apply. Run it manually.

## Files With Full Details

- **COMPLETE_DIAGNOSIS.md** - Full technical analysis
- **DATABASE_SCHEMA_ANALYSIS.md** - Schema constraints & triggers  
- **SIGNUP_ERROR_FIX.md** - Detailed explanation
- **ERROR_DIAGNOSTIC_FLOWCHART.md** - Visual diagrams

---

**Status**: ✅ Fixed and ready to deploy
