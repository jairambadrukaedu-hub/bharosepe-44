# HOW TO RUN THE CONTRACT GENERATION TESTS

## QUICK START (EASIEST WAY)

### Step 1: Start Your Server
Open a terminal and run:
```bash
npm run dev
```

Wait for the server to start. You should see something like:
```
✅ Contract generation routes loaded
Server running on port 5000
```

### Step 2: Test the API
Open ANOTHER terminal and run:
```bash
test-api.bat
```

Or manually make a test request with actual data from your database:

```bash
curl -X POST http://localhost:5000/api/contracts/generate ^
  -H "Content-Type: application/json" ^
  -d "{\"transaction_id\": \"your_transaction_id\", \"buyer_uuid\": \"actual-buyer-uuid\", \"seller_uuid\": \"actual-seller-uuid\"}"
```

### Step 3: Check the Response
You should see something like:
```json
{
  "success": true,
  "contractId": "f47ac10b-58cc-4372-a567-0e02b2c3d481",
  "metadata": {
    "replacedCount": 50,
    "totalPlaceholders": 51,
    "successRate": "98.04"
  }
}
```

---

## FINDING YOUR ACTUAL TEST DATA

### Get a Transaction ID:
In Supabase console, run:
```sql
SELECT id, buyer_id, seller_id FROM transactions LIMIT 1;
```

Copy the values:
- `id` → transaction_id
- `buyer_id` → buyer_uuid
- `seller_id` → seller_uuid

### Get Profiles to Verify They Exist:
```sql
SELECT id FROM profiles LIMIT 2;
```

These IDs must match the buyer_id and seller_id from transactions.

---

## EXPECTED SUCCESS RESULTS

### ✅ SUCCESS (What You Want to See)
```
{
  "success": true,
  "metadata": {
    "successRate": "98.04"  ← Should be >= 99%
  }
}
```

### ❌ ERRORS YOU MIGHT SEE

**"Failed to fetch form submission data"**
- Solution: Ensure the transaction_id has a corresponding record in form_submissions table

**"Failed to fetch seller profile"**
- Solution: Verify seller_uuid exists in profiles table

**"Failed to fetch buyer profile"**
- Solution: Verify buyer_uuid exists in profiles table

**"Server is not running"**
- Solution: Run `npm run dev` in another terminal first

**"Cannot find package 'dotenv'"**
- Solution: Run `npm install --legacy-peer-deps` in the root directory

---

## MANUAL TESTING WITHOUT API

If you want to test the service directly (without HTTP):

### Method 1: Via Node Script
Create a file `test-manual.js`:
```javascript
import { createClient } from '@supabase/supabase-js';
import { generateContract } from './src/services/contractGenerationService.js';

const supabaseClient = createClient(
  'YOUR_URL',
  'YOUR_KEY'
);

const result = await generateContract(supabaseClient, {
  transaction_id: 'your-txn-id',
  buyer_uuid: 'your-buyer-uuid',
  seller_uuid: 'your-seller-uuid'
});

console.log('Success Rate:', result.metadata.successRate + '%');
```

Then run:
```bash
node test-manual.js
```

---

## WHAT TO DO AFTER TESTING

### If Success Rate >= 99% ✅
Congratulations! The contract generation is working perfectly.

**Next steps:**
1. Integrate contract generation into your React UI
2. Call `/api/contracts/generate` when user creates transaction
3. Display the generated contract for buyer/seller to review and sign

### If Success Rate < 99% ⚠️
Check which placeholders are missing:

1. Look for empty fields in the generated contract
2. Verify the field exists in form_submissions or profiles table
3. Update the placeholder mapping in contractGenerationService.js
4. Test again

---

## FILES CREATED

- `contractGenerationService.js` - Core service (550+ lines)
- `contractRoutes.js` - Express API endpoints (200+ lines)
- `test-contract-simple.js` - Node test script
- `test-api.bat` - Batch file for API testing (Windows)
- `test-contract.bat` - Alternative batch file

---

## TROUBLESHOOTING CHECKLIST

- [ ] Server is running (`npm run dev`)
- [ ] .env file has VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
- [ ] Transaction ID exists in form_submissions table
- [ ] Buyer UUID exists in profiles table
- [ ] Seller UUID exists in profiles table
- [ ] MASTER_CONTRACT_TEMPLATE.md file exists
- [ ] All npm dependencies installed (`npm install --legacy-peer-deps`)

---

## QUICK REFERENCE

**Start server:**
```bash
npm run dev
```

**Test API:**
```bash
test-api.bat
```

**Check transaction:**
```sql
SELECT id, buyer_id, seller_id FROM transactions LIMIT 1;
```

**View generated contracts:**
```sql
SELECT id, transaction_id, status FROM contracts LIMIT 10;
```

**View contract metadata:**
```sql
SELECT contract_id, populated_fields, total_placeholders FROM contract_templates LIMIT 5;
```

---

**Status: READY FOR TESTING** 🚀
