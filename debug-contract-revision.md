# Contract Revision Debug Guide

## Issues Fixed

### 1. Contract Selection for Revision
**Problem**: The system was selecting the wrong contract for revision (active instead of rejected).

**Fix**: Updated `TransactionStatus.tsx` to prioritize finding rejected contracts when loading contract data for revision.

### 2. Enhanced Logging and Validation
**Problem**: Insufficient error handling and debugging information.

**Fix**: Added comprehensive logging throughout the revision process to help identify issues.

### 3. Helper Functions
**Problem**: No easy way to identify which contracts can be revised.

**Fix**: Added `getRevisionableContracts()` and `getLatestRejectedContract()` helper functions.

## How to Test the Fix

### Step 1: Open Browser Developer Tools
1. Right-click in your browser and select "Inspect" or press F12
2. Go to the "Console" tab to see debug messages

### Step 2: Create a Test Scenario
1. Create a contract between two users
2. Have the recipient reject the contract with a reason
3. The sender should now see an "Edit & Resend" button

### Step 3: Look for Debug Messages
When you click "Edit & Resend", you should see console messages like:
```
🔄 Edit & Resend clicked
🧑 User ID: [user-id]
👨‍💼 Contract creator: [creator-id]
📋 Contract status: rejected
📝 ContractRevisionEditor mounted with: {...}
```

### Step 4: Check for Common Issues

#### Issue A: User ID Mismatch
If you see: "You can only revise contracts you created"
- The logged User ID and Contract creator should match
- If they don't match, there's an authentication or data sync issue

#### Issue B: Contract Status Issue
If you see: "Only rejected contracts can be revised"
- Check if the contract status in the database is actually "rejected"
- Verify the contract loading logic is finding the right contract

#### Issue C: Contract Not Found
If you see: "No contract found for revision"
- The `originalContract` is null or undefined
- Check the contract loading logic in `TransactionStatus.tsx`

## Database Check Queries

Run these in your Supabase SQL editor to debug:

### Check contract statuses
```sql
SELECT id, transaction_id, status, created_by, recipient_id, is_active, revision_number, created_at
FROM contracts 
WHERE transaction_id = '[your-transaction-id]'
ORDER BY created_at DESC;
```

### Check transaction status
```sql
SELECT id, title, status, buyer_id, seller_id 
FROM transactions 
WHERE id = '[your-transaction-id]';
```

### Find rejected contracts for a user
```sql
SELECT c.id, c.transaction_id, c.status, c.created_by, c.revision_number, t.title
FROM contracts c
JOIN transactions t ON c.transaction_id = t.id
WHERE c.created_by = '[user-id]' 
AND c.status = 'rejected'
AND (c.is_active IS NULL OR c.is_active = true);
```

## Manual Testing Steps

1. **Login as User A (Buyer)**
2. **Create a contract** and send to User B
3. **Login as User B (Seller)** 
4. **Reject the contract** with a message
5. **Login back as User A**
6. **Navigate to the transaction** - you should see "Contract Rejected" status
7. **Click "Edit & Resend Contract"** - the revision editor should open
8. **Make changes and submit** - a new contract should be created
9. **Login as User B** - you should see the new revised contract

## Common Fixes if Still Not Working

### Fix 1: Clear Browser Cache
- Hard refresh with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### Fix 2: Check Supabase RLS Policies
Ensure these policies exist:
```sql
-- Users can update contracts they created
CREATE POLICY "Users can update contracts they created" 
ON public.contracts 
FOR UPDATE 
USING (auth.uid() = created_by);
```

### Fix 3: Verify Contract Trigger Function
The revision trigger should mark previous contracts as inactive:
```sql
-- Check if trigger function exists
SELECT proname FROM pg_proc WHERE proname = 'handle_contract_revision';
```

If you're still having issues after these fixes, please share:
1. The console log messages when clicking "Edit & Resend"
2. The database query results from the debug queries above
3. Any error messages you see in the console