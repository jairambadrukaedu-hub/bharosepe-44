# 🚀 OTP System - Quick Reference

## 🔥 Get Started in 5 Minutes

### **Terminal 1: Start Backend**
```bash
cd server
npm start
# Server ready on http://localhost:5000
```

### **Terminal 2: Start Frontend**
```bash
npm run dev
# App ready on http://localhost:8081
```

### **Test Sign Up with OTP**
1. Go to http://localhost:8081
2. Click "Sign Up"
3. Fill form (use phone: +18288889146)
4. Click "Create Account"
5. Check server console for OTP code
6. Enter code in modal
7. Done! 🎉

---

## 📱 Phone Number Format

**REQUIRED FORMAT**: `+countrycode + number`

**Examples**:
- India: `+919876543210`
- USA: `+12125551234`
- UK: `+442071838750`
- Twilio Test: `+18288889146` ✓

---

## 🔍 Server Console Output

When OTP is sent, you'll see:
```
✅ OTP sent to +18288889146: 123456
```

**During Testing**:
- Copy the 6-digit code
- Paste into OTP modal
- Click Verify

---

## 📊 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/otp/send` | POST | Generate & send OTP |
| `/api/otp/verify` | POST | Verify OTP code |
| `/api/otp/status/:phone` | GET | Check verification |

---

## ⚙️ Configuration

**File**: `server/.env`
```
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

**Update these** when changing Twilio account or phone number.

---

## 🎮 Test Scenarios

### ✅ Success Path
1. Send OTP → OTP appears in console
2. Enter OTP → Verification succeeds
3. Account created

### ❌ Error Path
1. Enter wrong OTP → Error message
2. After 3 wrong attempts → "Max attempts exceeded"
3. Request new OTP to retry

### ⏰ Timeout Path
1. Wait 10+ minutes
2. Try to verify
3. "OTP has expired" → Request new OTP

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Server won't start | Kill process on port 5000; `npm start` |
| OTP not sending | Check Twilio credentials; verify phone format |
| Database error | Delete `server/leads.db`; restart server |
| Front-end errors | Check console; verify imports; `npm install` |

---

## 📦 Dependencies Added

```json
{
  "dependencies": {
    "twilio": "^4.10.0"
  }
}
```

Installed in `server/package.json`

---

## 📋 Verification Checklist

- [ ] Backend server starts without errors
- [ ] Frontend dev server starts without errors
- [ ] Can navigate to sign up page
- [ ] OTP modal appears after form submission
- [ ] OTP code appears in server console
- [ ] Can enter 6-digit code in modal
- [ ] Verification succeeds with correct OTP
- [ ] Error shown with incorrect OTP
- [ ] Account created after verification

---

## 💡 Pro Tips

1. **See OTP in Console**: Check server terminal for 6-digit code
2. **Test Multiple Numbers**: Use different phone formats
3. **Monitor Twilio**: Check https://console.twilio.com balance
4. **Check Logs**: Both server and browser console show errors
5. **Reset Database**: Delete `server/leads.db` to start fresh

---

## 🎯 Next Milestones

- [ ] Test with real phone number
- [ ] Monitor SMS delivery time
- [ ] Add email OTP option
- [ ] Implement resend button
- [ ] Add rate limiting
- [ ] Switch to cheaper provider if scaling

---

**All Set!** Start your servers and test the OTP flow. 🚀
