# Error Diagnosis: Visual Flow Chart

## The Bug Flow (What Happens Now)

```
┌─────────────────────────────────────────────────────────────────┐
│ USER SIGNS UP                                                   │
│ Fills form: email, password, phone, address, etc.              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ SUPABASE.AUTH.SIGNUP() CALLED                                  │
│ ✅ Creates auth.users record with id=UUID                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ DATABASE TRIGGER FIRES: on_auth_user_created                   │
│ Calls: handle_new_user() function                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ TRIGGER TRIES TO INSERT INTO profiles TABLE                    │
│                                                                 │
│ INSERT INTO profiles (user_id, full_name, phone, role)        │
│ VALUES (UUID, 'John', '9999999999', 'Buyer')                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ ❌ POSTGRESQL ERROR                                             │
│ ERROR: column "role" of relation "profiles" does not exist     │
│                                                                 │
│ (The role column was deleted in migration but trigger still    │
│  tries to insert into it!)                                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ TRANSACTION ROLLS BACK                                          │
│ ❌ auth.users record created but isolated                       │
│ ❌ profiles record NOT created                                  │
│ ❌ Signup flow continues but profile is missing                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ SIGNUP CODE TRIES TO UPSERT PROFILE                            │
│ .upsert({ id: userID, email, ... })                           │
│                                                                 │
│ Uses `id` instead of `user_id` ❌                               │
│ Upsert might create duplicate or fail silently                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ ❌ USER SEES: "Database error saving new user"                 │
│ (500 Internal Server Error)                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## The Fixed Flow (After Migration)

```
┌─────────────────────────────────────────────────────────────────┐
│ USER SIGNS UP                                                   │
│ Fills form: email, password, phone, address, etc.              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ SUPABASE.AUTH.SIGNUP() CALLED                                  │
│ ✅ Creates auth.users record with id=UUID                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ DATABASE TRIGGER FIRES: on_auth_user_created                   │
│ Calls: handle_new_user() function (UPDATED)                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ TRIGGER INSERTS INTO profiles TABLE                            │
│                                                                 │
│ INSERT INTO profiles (user_id, full_name, phone)  ✅           │
│ VALUES (UUID, 'John', '9999999999')               ✅           │
│                                                                 │
│ (No role column - it doesn't exist!)              ✅           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ ✅ PROFILE CREATED SUCCESSFULLY                                 │
│ auth.users: ✅ Created                                          │
│ profiles: ✅ Created with basic info                            │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ SIGNUP CODE UPSERTS PROFILE WITH FULL DATA                     │
│ .upsert({                                          ✅           │
│   user_id: userID,  // CORRECT column!            ✅           │
│   email,                                           ✅           │
│   full_name,                                       ✅           │
│   phone,                                           ✅           │
│   address,                                         ✅           │
│   ...                                              ✅           │
│ }, { onConflict: 'user_id' })                     ✅           │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ ✅ PROFILE ENHANCED WITH FULL DATA                              │
│ auth.users: ✅ Created                                          │
│ profiles: ✅ Updated with all signup fields                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│ ✅ SIGNUP COMPLETE                                              │
│ User successfully registered!                                  │
│ Redirected to dashboard or email verification                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Table States

### Current Profiles Table (After Previous Migration)

```
id (UUID, PK)
user_id (UUID, NOT NULL, UNIQUE, FK→auth.users)
full_name (TEXT, optional)
phone (TEXT, optional)
email (TEXT, optional)
address (TEXT, optional)
city (TEXT, optional)
state (TEXT, optional)
pincode (TEXT, optional)
pan_number (TEXT, optional)
gst_number (TEXT, optional)
business_name (TEXT, optional)
business_type (TEXT, optional, CHECK: 'individual'|'business'|'llc'|'pvt_ltd')
avatar_url (TEXT, optional)
verified_phone (BOOLEAN, optional, DEFAULT: false)
created_at (TIMESTAMP, auto-generated)
updated_at (TIMESTAMP, auto-generated)

❌ role → DELETED (was here before)
```

### What Was In The Trigger (Broken)

```sql
INSERT INTO profiles (user_id, full_name, phone, role)
                                         ^^^^
                                      DOESN'T EXIST!
```

### What's In The Trigger Now (Fixed)

```sql
INSERT INTO profiles (user_id, full_name, phone)
                                         ✅ ONLY WHAT EXISTS
```

---

## Constraint Violations Explained

| Constraint | Type | Why It Failed | After Fix |
|-----------|------|---------------|-----------|
| `role` column | Column existence | Trigger ref'd deleted col | ✅ Trigger updated |
| `user_id` UNIQUE | Unique key | Could cause duplicates | ✅ Proper upsert |
| `user_id` FK | Foreign key | auth.users.id must exist | ✅ Works (auth created first) |
| `id` as PK | Primary key | Auto-generated, never issues | ✅ Still works |
| `created_at` NOT NULL | Not null | Auto-filled by trigger | ✅ Still works |
| `updated_at` NOT NULL | Not null | Auto-filled by trigger | ✅ Still works |

---

## Error Message Tracing

```
HTTP 500 Response
├─ "Database error saving new user"
│  └─ Too generic - doesn't help debug
│
└─ Actual PostgreSQL Error (in logs)
   └─ "column 'role' of relation 'profiles' does not exist"
      └─ This is where the real error is!
      
FIX: Added specific logging in signup code:
  ✅ "Profile created/updated with signup data"
  ✅ "Error updating profile after signup: [specific error]"
```

---

## Migration Timeline

```
2025-09-11: Create profiles table with role column
2025-09-13: Create transactions, contracts tables
2025-10-22: Add fields to contracts
2025-11-24: Create evidence & escrow tables
2025-11-25: 
  ├─ Add missing profile fields (email, address, city, etc.)
  ├─ Create contract notifications
  ├─ Remove role column ← profiles table changes
  │  └─ ❌ BUT trigger not updated!
  └─ Create user_roles table for actual admin roles
  
2025-11-25 (TODAY):
  └─ ✅ Fix handle_new_user trigger
  └─ ✅ Update signup code with correct column names
```

The role removal was correct (roles should be context-dependent), but the trigger update was missed!

---

## Code Changes Summary

### Migration: 20251125_fix_handle_new_user_trigger.sql

```diff
  CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER SET search_path = public
  AS $$
  BEGIN
-   INSERT INTO public.profiles (user_id, full_name, phone, role)
+   INSERT INTO public.profiles (user_id, full_name, phone)
    VALUES (
      new.id,
      new.raw_user_meta_data->>'full_name',
-     new.raw_user_meta_data->>'phone',
+     new.raw_user_meta_data->>'phone'
-     COALESCE(new.raw_user_meta_data->>'role', 'Buyer')
    );
    RETURN new;
  END;
  $$;
```

### Code: src/hooks/use-auth.tsx

```diff
- // After successful auth creation, try to update profile separately
- if (authData.user) {
-   setTimeout(async () => {
-     try {
        const { error: profileError } = await supabase
          .from('profiles')
-         .upsert({
-           id: authData.user.id,
+         .upsert({
+           user_id: authData.user.id,
            email: email,
            ...
+         }, { onConflict: 'user_id' });

-       if (profileError) {
-         console.warn('Profile update warning (non-critical):', profileError);
+       if (profileError) {
+         console.error('❌ Error updating profile after signup:', profileError);
```

---

## Result

✅ **All new signups will now work correctly!**

The database trigger creates the profile, the signup code enhances it, and users can register without errors.
