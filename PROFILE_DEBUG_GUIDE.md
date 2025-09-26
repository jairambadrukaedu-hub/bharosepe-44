# Profile Issues Debug & Fix Guide

## Issue Summary
The bharosepe application is having issues with profile creation and loading on Render deployment.

## Root Causes Identified

### 1. Supabase Configuration Mismatch
- **Problem**: The Supabase client was hardcoded to use wrong URL
- **Fixed**: Updated client to use environment variables
- **Before**: `https://thscwfnlxiwdzubgrqgf.supabase.co`
- **After**: Uses `VITE_SUPABASE_URL` from environment

### 2. TypeScript Type Issues
- **Problem**: Empty/incomplete Supabase types causing compilation errors
- **Fixed**: Removed strict typing from Supabase client temporarily

### 3. Error Handling & Debugging
- **Problem**: Limited error visibility and debugging
- **Fixed**: Added comprehensive logging and error handling

## Files Modified

### 1. `/src/integrations/supabase/client.ts`
- Updated to use environment variables
- Removed strict typing to prevent compilation errors

### 2. `/src/hooks/use-profile.tsx`
- Enhanced error handling and logging
- Better validation for profile data
- Improved createProfile and updateProfile functions

### 3. `/src/pages/ProfileSetup.tsx`
- Added comprehensive debugging logs
- Better form validation
- Enhanced error handling

### 4. `/src/components/ErrorBoundary.tsx` (New)
- Catches runtime errors
- Provides user-friendly error messages
- Shows detailed errors in development

### 5. `/src/debug/supabase-test.ts` (New)
- Tests Supabase connection
- Validates database access
- Auto-runs in development mode

### 6. `/src/App.tsx`
- Added ErrorBoundary wrapper

## Environment Variables Check

Ensure these environment variables are set in Render:

```
VITE_SUPABASE_URL=https://izyhokrfpnyynohmrtvq.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6eWhva3JmcG55eW5vaG1ydHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMzExNDgsImV4cCI6MjA3MjkwNzE0OH0.i9VDuui-PQ82leMcZPcMtCRNTwU6x4f-_bGCWbibOjc
VITE_SUPABASE_PROJECT_ID=izyhokrfpnyynohmrtvq
```

## Deployment Steps

### 1. Build and Deploy
```bash
npm install --legacy-peer-deps
npm run build
```

### 2. Test Locally First
```bash
npm run dev
```
- Check browser console for debug logs
- Test profile creation/loading
- Verify Supabase connection

### 3. Database Schema Verification
Ensure the profiles table exists with correct structure:
```sql
-- Expected profiles table structure
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'Buyer' CHECK (role IN ('Buyer', 'Seller')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Debug Information

### Console Logs to Watch For
- `🔍 Testing Supabase connection...`
- `ProfileSetup - Component mounted`
- `useProfile - Fetching profile for user:`
- `useProfile - Profile created successfully:`

### Common Error Messages
- "Database connection error" → Check Supabase URL/credentials
- "Profile error" → Check database permissions
- "User not authenticated" → Check auth flow

## Testing Checklist

### Local Testing
- [ ] Application starts without errors
- [ ] Can authenticate with email/password
- [ ] Profile setup form loads correctly
- [ ] Can create new profile
- [ ] Can update existing profile
- [ ] Console shows successful Supabase connection

### Production Testing (Render)
- [ ] Environment variables are set correctly
- [ ] Build completes successfully
- [ ] Application loads on Render URL
- [ ] Profile creation works
- [ ] Profile loading works
- [ ] No console errors

## Next Steps if Issues Persist

1. **Check Supabase Dashboard**
   - Verify database is accessible
   - Check RLS policies
   - Verify API keys are active

2. **Check Render Logs**
   - Look for build errors
   - Check runtime errors
   - Verify environment variables

3. **Network Issues**
   - Test Supabase connectivity from server
   - Check for firewall/proxy issues

4. **Database Permissions**
   - Verify RLS policies allow profile creation
   - Check user authentication flow

## Rollback Plan
If issues persist, revert these files:
- `src/integrations/supabase/client.ts`
- `src/hooks/use-profile.tsx`
- `src/pages/ProfileSetup.tsx`

Use git to revert to previous working state:
```bash
git checkout HEAD~1 -- src/integrations/supabase/client.ts
git checkout HEAD~1 -- src/hooks/use-profile.tsx
git checkout HEAD~1 -- src/pages/ProfileSetup.tsx
```