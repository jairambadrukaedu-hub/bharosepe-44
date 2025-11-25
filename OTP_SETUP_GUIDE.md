# 📱 OTP Verification Setup Guide

## ✅ Implementation Complete!

Your application now has a complete OTP verification system for phone numbers during signup. Here's what's been set up:

---

## 🎯 What's Been Implemented

### **Backend (Server)**
- ✅ Twilio SMS integration added
- ✅ 3 new OTP endpoints created:
  - `POST /api/otp/send` - Generate and send OTP
  - `POST /api/otp/verify` - Verify OTP code
  - `GET /api/otp/status/:phone_number` - Check OTP status
- ✅ OTP database table with:
  - Phone number (unique per signup)
  - OTP code (6-digit)
  - Expiry tracking (10 minutes)
  - Attempt counting (max 3 attempts)
  - Verification status

### **Frontend (React)**
- ✅ New `use-otp.tsx` hook for OTP state management
- ✅ OTP verification modal in AuthPage
- ✅ Phone number validation
- ✅ 6-digit input field with real-time validation
- ✅ Expiry countdown timer
- ✅ Attempt counter display
- ✅ Error handling with user feedback

### **Flow**
1. User enters phone number in signup form
2. User clicks "Create Account"
3. OTP modal appears asking for SMS code
4. User receives SMS with 6-digit code
5. User enters OTP
6. System verifies code within 10 minutes
7. If valid: Account created successfully
8. If invalid: Show error, allow 3 retry attempts

---

## 🚀 How to Test

### **Step 1: Start the Backend Server**
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

### **Step 2: Start the Frontend Dev Server**
```bash
# In another terminal
npm run dev
# App runs on http://localhost:8081
```

### **Step 3: Test the Sign-Up Flow**

1. Go to `http://localhost:8081`
2. Click on **Sign Up** tab
3. Fill in the form:
   - Email: test@example.com
   - Password: TestPass123!
   - Full Name: Test User
   - Phone: **+18288889146** (Your Twilio number for testing)
   - Address: Test Address
   - City: Test City
   - State: Test State
   - Pincode: 123456
   - PAN: ABCDE1234F
   - GST: (optional)
   - Business Type: Individual/Proprietor
   - Business Name: Test Business

4. Click "Create Account with All Details"

5. **OTP Modal appears** 📱
   - You'll receive an SMS to your phone with the OTP
   - Or check console logs for the OTP code during development

6. Enter the 6-digit code

7. Click "Verify OTP" ✓

8. Account created! 🎉

---

## 📞 Your Twilio Credentials

Your Twilio setup is configured with:
- **Account SID**: your_account_sid_here
- **Auth Token**: your_auth_token_here
- **Twilio Number**: +1234567890
- **Free Credits**: $15 (enough for ~100-200 OTPs)

---

## 🔍 Testing Tips

### **To See OTP in Console (Development)**
When you send an OTP, the server logs it:
```
✅ OTP sent to +18288889146: 123456
```

Check the server console to see the OTP code during testing.

### **Real SMS Testing**
Use your actual phone number (format: +countrycode + number)
Example: +919876543210 (for India)

### **Test Different Scenarios**

**Valid OTP:**
- Send OTP
- Wait for SMS
- Enter 6-digit code
- Click Verify → ✅ Success

**Invalid OTP:**
- Send OTP
- Enter wrong code
- System shows: "Invalid OTP code - 2 attempts remaining"
- Can retry 2 more times

**Expired OTP:**
- Send OTP
- Wait 10 minutes
- Try to enter code
- System shows: "OTP has expired. Request a new one."

**Max Attempts Exceeded:**
- Send OTP
- Enter 3 wrong codes
- System shows: "Maximum OTP attempts exceeded"
- Must request new OTP

---

## 🛠️ Configuration Details

### **Database Schema (SQLite)**
```sql
CREATE TABLE otp_verifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone_number TEXT NOT NULL UNIQUE,
  otp_code TEXT NOT NULL,
  attempts INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  verified BOOLEAN DEFAULT 0
)
```

### **Environment Variables**
File: `server/.env`
```
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### **OTP Rules**
- ✅ 6-digit code
- ✅ Valid for 10 minutes
- ✅ 3 retry attempts max
- ✅ 1 OTP per phone number (old one replaced)
- ✅ Can resend after expiry

---

## 📊 API Endpoints Reference

### **Send OTP**
```bash
POST /api/otp/send
Content-Type: application/json

{
  "phone_number": "+18288889146"
}

Response:
{
  "success": true,
  "message": "OTP sent successfully",
  "phone_number": "89146",
  "expiresIn": 600
}
```

### **Verify OTP**
```bash
POST /api/otp/verify
Content-Type: application/json

{
  "phone_number": "+18288889146",
  "otp_code": "123456"
}

Response:
{
  "success": true,
  "message": "Phone number verified successfully",
  "phone_number": "+18288889146",
  "verified": true
}
```

### **Check Status**
```bash
GET /api/otp/status/+18288889146

Response:
{
  "verified": true,
  "exists": true,
  "isExpired": false,
  "attemptsUsed": 1,
  "attemptsRemaining": 2
}
```

---

## ⚠️ Common Issues & Solutions

### **"OTP endpoint not found" error**
- Make sure server is running on port 5000
- Check `server/index.js` has OTP endpoints
- Restart server: `npm start` in server folder

### **"Cannot send OTP" error**
- Check Twilio credentials in `server/.env`
- Verify phone number format: must be `+countrycode + number`
- Check Twilio account has credits

### **SMS not received**
- Check phone number format (include country code)
- Check Twilio number (+18288889146) is active
- May take 30-60 seconds to arrive
- Check spam/message filters

### **"Phone number already verified" error**
- Twilio number has unique constraint
- For testing, delete from database first

---

## 🔄 Next Steps

### **Optional Enhancements**

1. **Email OTP instead of SMS**
   - Modify `/api/otp/send` to send email
   - Use nodemailer or SendGrid

2. **Resend OTP Button**
   - Add ability to request new OTP before expiry
   - Add cooldown (e.g., 30 seconds between resends)

3. **SMS Language Customization**
   - Make OTP message multilingual
   - Add company branding

4. **Analytics**
   - Track OTP success rates
   - Monitor failed attempts
   - Identify suspicious activity

5. **Switch to Cheaper SMS Provider**
   - When ready, replace Twilio with:
     - Fast2SMS (~₹0.50/SMS)
     - MSG91 (~₹0.75/SMS)
     - Exotel (~₹1/SMS)

---

## 📋 Files Modified/Created

### **Created:**
- ✅ `src/hooks/use-otp.tsx` - OTP state management hook

### **Modified:**
- ✅ `server/package.json` - Added Twilio dependency
- ✅ `server/.env` - Added Twilio credentials
- ✅ `server/.env.example` - Added Twilio config template
- ✅ `server/index.js` - Added OTP endpoints and database table
- ✅ `src/pages/AuthPage.tsx` - Added OTP verification modal and flow

---

## ✨ You're All Set!

Your OTP verification system is ready to use. Start both servers and test the signup flow. Users can now verify their phone numbers via SMS before creating an account.

**Questions?** Check console logs for detailed error messages.
**Having issues?** Verify Twilio credentials and phone number format.

Happy coding! 🎉
