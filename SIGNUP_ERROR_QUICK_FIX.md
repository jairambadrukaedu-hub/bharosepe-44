# Signup Error - Quick Fix & Deployment Guide

## 🎯 TL;DR

**The Problem**: Trigger tries to insert into deleted `role` column → all signups fail with 500 error

**The Solution**: 
1. ✅ Migration created: `20251125_fix_handle_new_user_trigger.sql` (fixes trigger)
2. ✅ Code updated: `src/hooks/use-auth.tsx` (uses correct column, better error handling)

**What You Need To Do**:
- Push the migration to Supabase
- Restart your app
- Test signup - should work now!

---

## 📋 Files Changed

### 1. New Migration (Auto-applies)
```
supabase/migrations/20251125_fix_handle_new_user_trigger.sql
```
- Updates `handle_new_user()` function
- Removes reference to deleted `role` column

### 2. Updated Code
```
src/hooks/use-auth.tsx
```
- Line 114-147: Fixed profile upsert logic
- Uses correct `user_id` column name
- Removed unreliable setTimeout
- Better error logging

---

## 🚀 Deployment Steps

### Step 1: Push Migrations to Supabase
```powershell
# If using Supabase CLI
supabase db push

# If using local Supabase
supabase start
```

### Step 2: Verify Migration Applied
Go to Supabase Dashboard → SQL Editor → Run:
```sql
-- Check if trigger function exists
SELECT pg_get_functiondef(oid) FROM pg_proc WHERE proname = 'handle_new_user';
```

You should see the function WITHOUT the `role` column reference.

### Step 3: Restart Your App
```powershell
# Stop any running servers
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Restart dev server
npm run dev
# OR for production
npm run build
npm start
```

### Step 4: Test Signup
1. Go to signup page
2. Enter test credentials (any email not used before)
3. Click "Sign up"
4. You should NOT see "Database error saving new user" ✅

---

## ⚡ What Actually Changed

### Before (Broken)
```sql
-- TRIGGER FUNCTION ❌
INSERT INTO public.profiles (user_id, full_name, phone, role)
VALUES (
  new.id,
  new.raw_user_meta_data->>'full_name',
  new.raw_user_meta_data->>'phone',
  COALESCE(new.raw_user_meta_data->>'role', 'Buyer')  -- DOESN'T EXIST!
);
```

```typescript
// SIGNUP CODE ❌
.upsert({
  id: authData.user.id,  // WRONG COLUMN NAME
  email: email,
  ...
});
setTimeout(async () => { ... }, 1000);  // UNRELIABLE
```

### After (Fixed)
```sql
-- TRIGGER FUNCTION ✅
INSERT INTO public.profiles (user_id, full_name, phone)
VALUES (
  new.id,
  new.raw_user_meta_data->>'full_name',
  new.raw_user_meta_data->>'phone'
  -- NO MORE ROLE!
);
```

```typescript
// SIGNUP CODE ✅
const profileData = {
  user_id: authData.user.id,  // CORRECT COLUMN NAME
  email: email,
  ...
};
const { error } = await supabase
  .from('profiles')
  .upsert(profileData, { onConflict: 'user_id' });  // PROPER ASYNC
```

---

## 🔍 Why This Happened

A previous migration removed the `role` column because users have **dynamic roles** (buyer/seller determined by transaction context, not stored in profile).

However, the database trigger function wasn't updated to match. When users signed up:

```
Sign up → Auth user created → Trigger fires → Tries to insert role (doesn't exist) → ERROR 500
```

This fix removes the stale `role` reference from the trigger.

---

## ✅ Testing Checklist

- [ ] Migration applied to Supabase
- [ ] App restarted
- [ ] Can sign up with new email
- [ ] No "Database error saving new user" message
- [ ] Profile data saved (check Supabase profiles table)
- [ ] User can sign in after signup
- [ ] Profile setup page loads correctly

---

## 🆘 If It Still Doesn't Work

### Check Supabase Logs
```sql
-- View recent errors in Supabase
SELECT * FROM pg_stat_statements 
WHERE query LIKE '%handle_new_user%' 
ORDER BY created DESC LIMIT 10;
```

### Check Function Definition
```sql
-- Get current function definition
SELECT pg_get_functiondef(
  (SELECT oid FROM pg_proc WHERE proname = 'handle_new_user')
);
```

Should show:
```sql
INSERT INTO public.profiles (user_id, full_name, phone)
VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone');
```

NOT:
```sql
INSERT INTO public.profiles (user_id, full_name, phone, role)
VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone', ...);
```

### Check App Logs
```powershell
# Look for error messages in console
# Should show: "✅ Profile created/updated with signup data"
# OR: "❌ Error updating profile after signup:" (non-critical)
```

---

## 📚 Related Documentation

- `DATABASE_SCHEMA_ANALYSIS.md` - Complete technical analysis
- `SIGNUP_ERROR_FIX.md` - Detailed explanation of the fix

---

## 🎓 Lessons Learned

1. **Triggers need coordination**: When dropping columns, update triggers that reference them
2. **Use proper async/await**: setTimeout is unreliable for database operations
3. **Log errors clearly**: "Database error saving new user" is too generic - we added specific logs
4. **Test schema changes**: A simple signup test would have caught this immediately
5. **Version control migrations**: Having migration history made this much easier to debug

---

**You're all set! The signup error should be fixed now.** ✨
