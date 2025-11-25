# Quick Start: Test Contract Generation

## Current Status
✅ Code is complete and has **0 compilation errors**
⚠️ Needs testing to identify "failed to create contract" root cause

## What You Need to Do

### Before You Start
- Browser with Developer Tools support (Chrome, Firefox, Safari, Edge)
- Access to the Bharose PE application
- At least 2 test user accounts (one buyer, one seller)
- Both users should have complete profiles set up

---

## Testing Steps

### STEP 1: Open Browser Console (1 minute)

1. **Open the Bharose PE application in your browser**
2. **Press F12** on your keyboard
   - OR right-click anywhere on page → "Inspect" → "Console" tab
3. **You should see a black terminal-like area at bottom of screen**

### STEP 2: Clear Old Logs (30 seconds)

1. **In the console, click the 🚫 (circle with slash) icon** to clear any old logs
2. **You're now ready to test fresh**

### STEP 3: Start Transaction Flow (3-5 minutes)

1. **Click on buyer or seller** (whoever you're logged in as)
2. **Select contact person** (the other user)
   - **Confirm:** Search works and contact is found
3. **Select transaction type**
   - Choose "Goods" for now
   - Enter title: "Test Item"
   - Enter amount: "5000" (any number > 0)
   - **Confirm:** Can click "Next" without "valid amount required" error
4. **SmartContractBuilder should load**
   - **Check console:** Should see logs starting with:
     ```
     📥 Loading profiles for transaction: {...}
     ✅ Current profile loaded: [email]
     ```

### STEP 4: Select Industry & Fill Form (5-10 minutes)

1. **Select an industry:**
   - Try "Electronics" (simplest)
   - Click on it
   
2. **Fill out the form** (important - all fields with RED ASTERISK * are required)
   - **Item Title:** "Test Electronics Item"
   - **Condition:** Select "New"
   - **Price/Amount:** "5000"
   - **Delivery Mode:** Select any option (e.g., "Shipping")
   - **Payment Method:** Select any option (e.g., "Bank Transfer")
   - **Scroll down and fill ANY other red-starred fields**

3. **Before proceeding:** Make sure ALL red asterisk fields have values
   - Gray asterisks are optional (can leave blank)

### STEP 5: Generate Contract (2 minutes)

1. **Click the "✨ Generate Contract" button** at bottom right
2. **WATCH THE CONSOLE** - don't click anything else
3. **Look for one of these outcomes:**

#### ✅ SUCCESS (You'll see)
```
📋 Contract generation params: {...}
🔄 Generating contract with request: {...}
✅ Contract content built successfully
✅ Extracted clauses and laws
✅ Contract summary generated
✅ Contract generated successfully: {...}
💾 Saving contract to database...
✅ Contract saved to database
```
**Then:** Page shows "Professional Contract" preview with full contract text

#### ❌ FAILURE (You'll see)
```
❌ Error: [some error message]
```
**Then:** Error toast appears saying "Failed to generate contract: ..."

### STEP 6: If It Works ✅

1. **Congratulations! Contract generation is working**
2. **The contract appears in Step 4: Professional Contract**
3. **You can:**
   - 📥 **Download** the contract as a text file
   - 📝 **Edit Fields** to go back and change form inputs
   - ✓ **Accept & Save Contract** to finish

4. **Next test with a different industry** to confirm it works consistently

### STEP 7: If It Fails ❌

1. **Look at the console for error messages**
2. **Find the line that starts with ❌**
3. **Copy the error message** exactly
4. **Share the following information:**
   - Screenshot of console showing the ❌ error
   - Or type out the exact error message
   - Which industry you selected
   - What fields you filled
   - Whether you're buyer or seller
   - Any other details from the console

5. **Example error messages to look for:**
   - "Cannot read property of undefined"
   - "Network error"
   - "Profile not found"
   - "Transaction not found"
   - "Invalid form data"

---

## Expected Console Output (SUCCESS)

When you test successfully, your console should show something like:

```
📥 Loading profiles for transaction: {
  userId: "user-123",
  sellerId: "seller-456", 
  buyerId: "buyer-789"
}

✅ Current profile loaded: seller@example.com

📥 Loading other profile: buyer-789

✅ Other profile loaded: buyer@example.com

✅ Set seller as current, buyer as other

📋 Contract generation params: {
  selectedIndustry: "electronics",
  hasTemplate: true,
  hasBuyerProfile: true,
  hasSellerProfile: true,
  formDataKeys: [...list of form fields...]
}

🔄 Generating contract with request: {
  transactionTitle: "Test Item",
  industryType: "electronics",
  ...
}

✅ Contract content built successfully

✅ Extracted clauses and laws

✅ Contract summary generated

✅ Contract generated successfully: {
  contractId: "CONTRACT-1702345678...",
  title: "Test Item - Contract Agreement",
  ...
}

💾 Saving contract to database...

✅ Contract saved to database
```

**Then the contract preview shows** with the full contract text.

---

## Quick Checklist Before Testing

- [ ] I'm logged into Bharose PE
- [ ] I have F12 / Developer Tools open
- [ ] Console tab is visible
- [ ] I've cleared old logs (clicked 🚫)
- [ ] I have a contact selected (other user)
- [ ] Transaction type is selected (Goods)
- [ ] I'm in SmartContractBuilder (Step 3 - Industry Form)
- [ ] I've selected an industry (Electronics)
- [ ] All RED ASTERISK (*) fields are filled
- [ ] I have a valid price/amount entered
- [ ] I'm ready to click "Generate Contract"

---

## What to Do After

### If Contract Generation Works ✅
1. Test with 2-3 different industries (Electronics, Furniture, Vehicles)
2. Try with different buyer/seller pairs
3. Download and check a contract
4. Report success back
5. Then we move to: Services industries, contract signing, etc.

### If Contract Generation Fails ❌
1. **Copy the console error** (take screenshot or copy text)
2. **Try these troubleshooting steps:**
   - Log out and back in
   - Refresh the page (F5)
   - Try a different industry
   - Make sure all profile info is complete
   - Try with a different user pair
3. **Share the error details**
4. I'll fix it and you test again

---

## Support

If you get stuck at any step:
1. Check which step you're on (1-7 above)
2. Check if there's a console error
3. Share:
   - Screenshot of error (or console logs)
   - What step you're on
   - What you entered in the form
   - Any error messages

---

## Success Indicators

✅ Contract Generation Working:
- No red error messages in console
- Contract text appears in preview
- "Professional Contract" header shows
- Contract contains buyer/seller details
- Download button works

❌ Contract Generation Failing:
- Red error message in console
- Toast error saying "Failed to create contract"
- Page stays on form step
- No contract preview appears

---

**Status:** Ready for User Testing
**Last Updated:** 2024
**Estimated Test Time:** 10-15 minutes
**Outcome:** Either working ✅ or clear error for debugging ❌
