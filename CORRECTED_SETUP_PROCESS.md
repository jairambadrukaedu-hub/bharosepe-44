# ✅ Photo Upload Setup - Corrected Process

## The Issue

You got error: `ERROR: 42501: must be owner of table objects`

**Why?** Supabase doesn't allow modifying storage policies via SQL - you must use the Dashboard UI.

## ✅ Correct Setup Process

### Step 1: Run SQL Migration (Can run via SQL)
✅ **This works - adds the database column**

1. Go to **Supabase Dashboard** > **SQL Editor** > **New Query**
2. Copy from: `migrations/add_photos_column.sql`
3. Click **Run**
4. Result: `uploaded_photos` column added to `form_submissions` table

### Step 2: Create Storage Bucket (via Dashboard UI)
✅ **Must use Dashboard UI**

1. Go to **Supabase Dashboard** > **Storage** > **Buckets**
2. Click **New bucket**
3. Name: `form-uploads`
4. Make it **Private** (uncheck "Public bucket")
5. Click **Create bucket**

### Step 3: Add RLS Policies (via Dashboard UI)
❌ **Cannot run via SQL - must use Dashboard UI**

1. Go to **Supabase Dashboard** > **Authentication** > **Policies**
2. Select table: **`storage.objects`**
3. Click **"New Policy"** > Select **"For INSERT"**

**Fill in Policy 1 - Upload:**
- Policy name: `Users can upload to form-uploads bucket`
- Allowed roles: Check **`authenticated`**
- Expression: 
```
bucket_id = 'form-uploads' 
AND (storage.foldername(name))[1] = auth.uid()::text
```
- Click **Review** > **Save policy**

**Repeat for 3 more policies:**

**Policy 2 - SELECT (Download):**
- Name: `Users can read form-uploads bucket`
- Expression: (same as above)

**Policy 3 - UPDATE (Modify):**
- Name: `Users can update form-uploads bucket`
- Expression: (same as above)

**Policy 4 - DELETE (Remove):**
- Name: `Users can delete form-uploads bucket`
- Expression: (same as above)

## 📊 Setup Checklist

- [ ] SQL migration run - Column added ✅
- [ ] Storage bucket `form-uploads` created
- [ ] Bucket is Private (not Public)
- [ ] 4 RLS policies added (INSERT, SELECT, UPDATE, DELETE)
- [ ] All policies have correct expression
- [ ] All policies have `authenticated` role

## 🧪 Test After Setup

1. Refresh browser: **Ctrl+Shift+R**
2. Select Fashion & Apparel
3. Upload a photo
4. ✅ Should work without "Bucket not found" error

## ⚠️ If Still Not Working

1. **Clear cache**: Ctrl+Shift+Delete
2. **Check policies**: Go to Dashboard > Authentication > Policies > search "form-uploads"
   - Should see 4 policies listed
3. **Check bucket**: Go to Dashboard > Storage > Buckets > "form-uploads"
   - Should be Private
   - Should show file size limit: 52428800
4. **Check authentication**: Are you logged in? (Check console: F12)

## 📝 Key Differences

| Task | Method | Status |
|------|--------|--------|
| Add column | SQL Migration | ✅ Works |
| Create bucket | Dashboard UI | ✅ Works |
| Add policies | Dashboard UI | ✅ Works |
| (NOT via SQL) | SQL Script | ❌ Fails |

---

**Summary**: Database changes via SQL work fine. Storage policies MUST be done via UI!

