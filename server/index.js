const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

// Twilio Configuration
const twilio = require('twilio');
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || '+18288889146';

const app = express();
const PORT = process.env.PORT || 5000;

// Vapi Configuration
const VAPI_API_KEY = process.env.VAPI_API_KEY || 'd0b02cea-e204-4550-a834-ce48bfa3bf7c';

// Feedback AI Configuration
const FEEDBACK_ASSISTANT_ID = process.env.FEEDBACK_ASSISTANT_ID || 'a8a7a43b-ffeb-429d-b986-e156b6a40bdf';
const FEEDBACK_PHONE_NUMBER_ID = process.env.FEEDBACK_PHONE_NUMBER_ID || '720ecf1c-1434-4567-9e8f-ee59612843af';

// Marketing AI Configuration
const MARKETING_ASSISTANT_ID = process.env.MARKETING_ASSISTANT_ID || '40363700-b9e5-4dce-8ca9-a26feb460c1e';
const MARKETING_PHONE_NUMBER_ID = process.env.MARKETING_PHONE_NUMBER_ID || '720ecf1c-1434-4567-9e8f-ee59612843af';

// Authentication
const AUTH_PASSWORDS = {
  feedback: process.env.FEEDBACK_PASSWORD || 'feedback123',
  marketing: process.env.MARKETING_PASSWORD || 'marketing123'
};

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build (for production/ngrok)
const buildPath = path.join(__dirname, '../client/build');
if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));
}

// Initialize SQLite database
const db = new sqlite3.Database('./leads.db');

// Create leads table with call_id column and campaign_type
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    feedback TEXT,
    call_id TEXT,
    campaign_type TEXT DEFAULT 'feedback',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    called_at DATETIME
  )`);
  
  // Create OTP verification table
  db.run(`CREATE TABLE IF NOT EXISTS otp_verifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_number TEXT NOT NULL UNIQUE,
    otp_code TEXT NOT NULL,
    attempts INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    verified BOOLEAN DEFAULT 0
  )`);
  
  // Add call_id column if it doesn't exist (for existing databases)
  db.run(`ALTER TABLE leads ADD COLUMN call_id TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('Error adding call_id column:', err);
    }
  });
  
  // Add campaign_type column if it doesn't exist (for existing databases)
  db.run(`ALTER TABLE leads ADD COLUMN campaign_type TEXT DEFAULT 'feedback'`, (err) => {
    if (err && !err.message.includes('duplicate column')) {
      console.error('Error adding campaign_type column:', err);
    }
  });
});

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Authentication endpoints
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  
  if (password === AUTH_PASSWORDS.feedback) {
    res.json({ 
      success: true, 
      role: 'feedback',
      message: 'Logged in to Customer Feedback system' 
    });
  } else if (password === AUTH_PASSWORDS.marketing) {
    res.json({ 
      success: true, 
      role: 'marketing',
      message: 'Logged in to Marketing system' 
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid password' 
    });
  }
});

// ============= OTP VERIFICATION ENDPOINTS =============

// Generate and send OTP
app.post('/api/otp/send', async (req, res) => {
  try {
    let { phone_number } = req.body;
    
    if (!phone_number) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
    
    // Clean up phone number - remove spaces, dashes, parentheses
    phone_number = phone_number.replace(/[\s\-\(\)]/g, '');
    
    // If it doesn't start with +, add it
    if (!phone_number.startsWith('+')) {
      phone_number = '+' + phone_number;
    }
    
    // Validate phone format (should start with + and have at least 10 digits)
    const phoneRegex = /^\+\d{10,}$/;
    if (!phoneRegex.test(phone_number)) {
      return res.status(400).json({ 
        error: 'Invalid phone number format. Use format: +1234567890 (with country code)',
        received: phone_number
      });
    }
    
    console.log(`📱 Processing phone number: ${phone_number}`);
    
    // Generate 6-digit OTP
    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry to 10 minutes from now
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
    // Check if OTP already exists and delete it
    db.run('DELETE FROM otp_verifications WHERE phone_number = ?', [phone_number], (err) => {
      if (err) {
        console.error('Error deleting old OTP:', err);
      }
      
      // Insert new OTP
      db.run(
        'INSERT INTO otp_verifications (phone_number, otp_code, expires_at) VALUES (?, ?, ?)',
        [phone_number, otp_code, expiresAt.toISOString()],
        async (err) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to generate OTP' });
          }
          
          // Check if we're in development mode (try to send SMS, but don't fail if it doesn't work)
          const isDev = process.env.NODE_ENV !== 'production';
          
          if (isDev) {
            // Development mode: Log OTP and return it in response
            console.log(`📱 [DEV MODE] OTP generated for ${phone_number}: ${otp_code}`);
            console.log(`✅ OTP sent to ${phone_number}: ${otp_code}`);
            
            return res.json({
              success: true,
              message: 'OTP sent successfully (DEV MODE)',
              phone_number: phone_number.slice(-4),
              otp_code: otp_code, // Return OTP in dev mode for testing
              expiresIn: 600
            });
          }
          
          // Production mode: Try to send via Twilio
          try {
            console.log(`📱 Attempting to send OTP via Twilio...`);
            console.log(`   To: ${phone_number}`);
            console.log(`   From: ${TWILIO_PHONE_NUMBER}`);
            console.log(`   OTP: ${otp_code}`);
            
            await twilioClient.messages.create({
              body: `Your BharosePe OTP is: ${otp_code}. Valid for 10 minutes.`,
              from: TWILIO_PHONE_NUMBER,
              to: phone_number
            });
            
            console.log(`✅ OTP sent successfully to ${phone_number}`);
            
            res.json({
              success: true,
              message: 'OTP sent successfully',
              phone_number: phone_number.slice(-4),
              expiresIn: 600
            });
          } catch (twilioError) {
            console.error('❌ Twilio SMS error:', twilioError.message);
            console.error('   Code:', twilioError.code);
            console.error('   Status:', twilioError.status);
            
            res.status(500).json({ 
              error: 'Failed to send OTP via SMS',
              details: twilioError.message,
              code: twilioError.code 
            });
          }
        }
      );
    });
  } catch (error) {
    console.error('OTP send error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify OTP
app.post('/api/otp/verify', (req, res) => {
  try {
    const { phone_number, otp_code } = req.body;
    
    if (!phone_number || !otp_code) {
      return res.status(400).json({ error: 'Phone number and OTP code are required' });
    }
    
    // Query OTP from database
    db.get(
      'SELECT * FROM otp_verifications WHERE phone_number = ? ORDER BY created_at DESC LIMIT 1',
      [phone_number],
      (err, row) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
          return res.status(404).json({ error: 'No OTP found for this phone number. Request a new one.' });
        }
        
        // Check if OTP is expired
        if (new Date() > new Date(row.expires_at)) {
          return res.status(400).json({ error: 'OTP has expired. Request a new one.' });
        }
        
        // Check max attempts
        if (row.attempts >= 3) {
          return res.status(400).json({ error: 'Maximum OTP attempts exceeded. Request a new OTP.' });
        }
        
        // Verify OTP code
        if (row.otp_code !== otp_code.toString()) {
          // Increment attempts
          db.run(
            'UPDATE otp_verifications SET attempts = attempts + 1 WHERE id = ?',
            [row.id],
            (err) => {
              if (err) console.error('Error updating attempts:', err);
            }
          );
          return res.status(400).json({ 
            error: 'Invalid OTP code',
            attemptsRemaining: 3 - (row.attempts + 1)
          });
        }
        
        // Mark as verified
        db.run(
          'UPDATE otp_verifications SET verified = 1 WHERE id = ?',
          [row.id],
          (err) => {
            if (err) console.error('Error marking OTP as verified:', err);
          }
        );
        
        console.log(`✅ OTP verified for ${phone_number}`);
        
        res.json({
          success: true,
          message: 'Phone number verified successfully',
          phone_number: phone_number,
          verified: true
        });
      }
    );
  } catch (error) {
    console.error('OTP verify error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Check OTP status
app.get('/api/otp/status/:phone_number', (req, res) => {
  try {
    const { phone_number } = req.params;
    
    db.get(
      'SELECT verified, attempts, expires_at FROM otp_verifications WHERE phone_number = ? ORDER BY created_at DESC LIMIT 1',
      [phone_number],
      (err, row) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        if (!row) {
          return res.json({ verified: false, exists: false });
        }
        
        const isExpired = new Date() > new Date(row.expires_at);
        
        res.json({
          verified: row.verified,
          exists: true,
          isExpired: isExpired,
          attemptsUsed: row.attempts,
          attemptsRemaining: 3 - row.attempts
        });
      }
    );
  } catch (error) {
    console.error('OTP status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============= END OTP ENDPOINTS =============

// Get all leads (filtered by campaign type)
app.get('/api/leads', (req, res) => {
  const { campaign_type } = req.query;
  let query = 'SELECT * FROM leads';
  let params = [];
  
  if (campaign_type) {
    query += ' WHERE campaign_type = ?';
    params.push(campaign_type);
  }
  
  query += ' ORDER BY created_at DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    const pendingCount = rows.filter(lead => lead.status === 'pending').length;
    
    res.json({
      leads: rows,
      total: rows.length,
      pending: pendingCount
    });
  });
});

// Create a single lead
app.post('/api/leads', (req, res) => {
  const { name, phone, email, campaign_type = 'feedback' } = req.body;
  
  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'Name, phone, and email are required' });
  }

  const stmt = db.prepare('INSERT INTO leads (name, phone, email, campaign_type) VALUES (?, ?, ?, ?)');
  stmt.run([name, phone, email, campaign_type], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({
      message: 'Lead created successfully',
      id: this.lastID,
      campaign_type
    });
  });
  stmt.finalize();
});

// Delete a single lead
app.delete('/api/leads/:id', (req, res) => {
  const leadId = req.params.id;
  
  if (!leadId) {
    return res.status(400).json({ error: 'Lead ID is required' });
  }
  
  // Check if lead exists first
  db.get('SELECT * FROM leads WHERE id = ?', [leadId], (err, lead) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    // Delete the lead
    db.run('DELETE FROM leads WHERE id = ?', [leadId], function(err) {
      if (err) {
        console.error('Error deleting lead:', err);
        return res.status(500).json({ error: 'Failed to delete lead' });
      }
      
      console.log(`✅ Deleted lead: ${lead.name} (ID: ${leadId})`);
      res.json({
        message: 'Lead deleted successfully',
        deletedLead: {
          id: lead.id,
          name: lead.name,
          phone: lead.phone,
          email: lead.email
        }
      });
    });
  });
});

// Function to format phone number to E.164
function formatPhoneToE164(phone) {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // If it doesn't start with country code, assume India (+91)
  if (digitsOnly.length === 10) {
    return `+91${digitsOnly}`;
  } else if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    return `+${digitsOnly}`;
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
    return `+${digitsOnly}`;
  }
  
  // If it already looks like it has country code
  return `+${digitsOnly}`;
}

// Vapi call function
async function initiateVapiCall(lead) {
  try {
    console.log(`📞 Initiating Vapi call for ${lead.name} (${lead.phone}) - Campaign: ${lead.campaign_type}`);
    
    const formattedPhone = formatPhoneToE164(lead.phone);
    console.log(`📱 Formatted phone: ${formattedPhone}`);
    
    // Select AI assistant and phone number based on campaign type
    const isMarketingCampaign = lead.campaign_type === 'marketing';
    const assistantId = isMarketingCampaign ? MARKETING_ASSISTANT_ID : FEEDBACK_ASSISTANT_ID;
    const phoneNumberId = isMarketingCampaign ? MARKETING_PHONE_NUMBER_ID : FEEDBACK_PHONE_NUMBER_ID;
    
    console.log(`🤖 Using ${isMarketingCampaign ? 'Marketing' : 'Feedback'} AI: ${assistantId}`);
    
    const callData = {
      assistantId: assistantId,
      phoneNumberId: phoneNumberId,
      customer: {
        number: formattedPhone,
        name: lead.name
      },
      assistantOverrides: {
        variableValues: {
          customerName: lead.name,
          customerPhone: formattedPhone,
          customerEmail: lead.email,
          campaignType: lead.campaign_type
        }
      }
    };
    
    console.log('🚀 Vapi call payload:', JSON.stringify(callData, null, 2));
    
    const response = await axios.post('https://api.vapi.ai/call/phone', callData, {
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Vapi API Response:', JSON.stringify(response.data, null, 2));
    
    return {
      success: true,
      callId: response.data.id,
      status: response.data.status,
      data: response.data
    };
  } catch (error) {
    console.error('❌ Vapi API Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
}

// Call a single lead
app.post('/api/call/:id', async (req, res) => {
  const leadId = req.params.id;
  
  db.get('SELECT * FROM leads WHERE id = ?', [leadId], async (err, lead) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    const result = await initiateVapiCall(lead);
    
    if (result.success) {
      // Update lead status and call_id
      db.run(
        'UPDATE leads SET status = ?, called_at = CURRENT_TIMESTAMP, call_id = ? WHERE id = ?',
        ['calling', result.callId, leadId],
        function(err) {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
          }
          
          res.json({
            message: 'Call initiated successfully',
            callId: result.callId,
            status: result.status,
            leadId: leadId
          });
        }
      );
    } else {
      res.status(400).json({
        error: 'Failed to initiate call',
        details: result.error
      });
    }
  });
});

// Call all pending leads
app.post('/api/call/bulk', async (req, res) => {
  db.all('SELECT * FROM leads WHERE status = "pending"', [], async (err, leads) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (leads.length === 0) {
      return res.json({ message: 'No pending leads to call', called: 0 });
    }
    
    let successCount = 0;
    const results = [];
    
    for (const lead of leads) {
      const result = await initiateVapiCall(lead);
      
      if (result.success) {
        db.run(
          'UPDATE leads SET status = ?, called_at = CURRENT_TIMESTAMP, call_id = ? WHERE id = ?',
          ['calling', result.callId, lead.id]
        );
        successCount++;
        results.push({ leadId: lead.id, success: true, callId: result.callId });
      } else {
        results.push({ leadId: lead.id, success: false, error: result.error });
      }
      
      // Add small delay between calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    res.json({
      message: `Initiated calls for ${successCount} out of ${leads.length} leads`,
      called: successCount,
      total: leads.length,
      results
    });
  });
});

// Check call status and fetch feedback from Vapi
app.get('/api/call/status/:callId', async (req, res) => {
  const { callId } = req.params;
  
  try {
    console.log(`🔍 Checking call status for: ${callId}`);
    
    const response = await axios.get(`https://api.vapi.ai/call/${callId}`, {
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const callData = response.data;
    console.log(`📞 Call status: ${callData.status}`);
    
    if (callData.status === 'ended' && callData.analysis) {
      // Extract feedback and update database
      const feedback = {
        summary: callData.analysis.summary || '',
        transcript: callData.transcript || '',
        duration: callData.duration || 0,
        status: callData.status || '',
        analysis: callData.analysis,
        endedReason: callData.endedReason || ''
      };
      
      // Update the lead with feedback using call_id
      db.run(
        'UPDATE leads SET feedback = ?, status = ? WHERE call_id = ?',
        [JSON.stringify(feedback), 'completed', callId],
        function(err) {
          if (err) {
            console.error('❌ Error updating lead with feedback:', err);
            return res.status(500).json({ error: 'Database error' });
          }
          
          console.log('✅ Updated lead with feedback for call:', callId);
          res.json({ 
            success: true, 
            status: callData.status,
            feedback: feedback,
            message: 'Feedback retrieved and stored successfully' 
          });
        }
      );
    } else {
      res.json({ 
        success: true, 
        status: callData.status,
        message: `Call status: ${callData.status}` 
      });
    }
  } catch (error) {
    console.error('❌ Error checking call status:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error checking call status',
      details: error.response?.data || error.message
    });
  }
});

// Bulk check all pending calls for completion
app.post('/api/calls/check-status', async (req, res) => {
  try {
    console.log('🔍 Checking status of all pending calls...');
    
    // Get all leads with 'calling' status and call_id
    db.all(
      'SELECT * FROM leads WHERE status = "calling" AND call_id IS NOT NULL',
      [],
      async (err, leads) => {
        if (err) {
          console.error('❌ Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        console.log(`Found ${leads.length} pending calls to check`);
        let updatedCount = 0;
        
        for (const lead of leads) {
          try {
            const response = await axios.get(`https://api.vapi.ai/call/${lead.call_id}`, {
              headers: {
                'Authorization': `Bearer ${VAPI_API_KEY}`,
                'Content-Type': 'application/json'
              }
            });
            
            const callData = response.data;
            
            if (callData.status === 'ended') {
              // Determine the final status based on end reason and call quality
              let finalStatus = 'completed';
              const endReason = callData.endedReason || '';
              const hasConversation = callData.transcript && callData.transcript.length > 100;
              const hasAnalysis = callData.analysis && (callData.analysis.summary || callData.analysis.successEvaluation);
              
              // Check for rejection indicators
              if ((endReason.includes('customer-hung-up') || 
                   endReason.includes('customer-ended-call') || 
                   endReason.includes('rejected') ||
                   (callData.duration && callData.duration < 10)) && 
                  !hasConversation && !hasAnalysis) {
                finalStatus = 'rejected';
              }
              
              const feedback = {
                summary: finalStatus === 'rejected' 
                  ? 'Call was rejected or ended quickly'
                  : (callData.analysis?.summary || callData.summary || 'Call completed'),
                transcript: callData.transcript || '',
                duration: callData.duration || 0,
                status: callData.status || '',
                analysis: callData.analysis || (finalStatus === 'rejected' ? { summary: 'Call rejected by customer' } : {}),
                endedReason: endReason
              };
              
              // Update this specific lead
              await new Promise((resolve, reject) => {
                db.run(
                  'UPDATE leads SET feedback = ?, status = ? WHERE id = ?',
                  [JSON.stringify(feedback), finalStatus, lead.id],
                  function(err) {
                    if (err) reject(err);
                    else {
                      console.log(`✅ Updated ${finalStatus} status for lead ${lead.id} (${lead.name})`);
                      updatedCount++;
                      resolve();
                    }
                  }
                );
              });
            }
          } catch (error) {
            console.error(`❌ Error checking call ${lead.call_id}:`, error.message);
          }
          
          // Add small delay between API calls
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        res.json({
          success: true,
          message: `Checked ${leads.length} calls, updated ${updatedCount} with feedback`,
          updated: updatedCount,
          total: leads.length
        });
      }
    );
  } catch (error) {
    console.error('❌ Error in bulk status check:', error);
    res.status(500).json({ error: 'Error checking call statuses' });
  }
});

// Bulk upload leads from CSV
app.post('/api/leads/bulk', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { campaign_type = 'feedback' } = req.body;
  const leads = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      if (data.name && data.phone && data.email) {
        leads.push({
          name: data.name.trim(),
          phone: data.phone.trim(),
          email: data.email.trim(),
          campaign_type: campaign_type
        });
      }
    })
    .on('end', () => {
      // Clean up uploaded file
      fs.unlinkSync(filePath);
      
      if (leads.length === 0) {
        return res.status(400).json({ error: 'No valid leads found in file' });
      }

      insertBulkLeads(leads, res);
    })
    .on('error', (error) => {
      console.error('Error reading CSV:', error);
      fs.unlinkSync(filePath);
      res.status(500).json({ error: 'Error reading CSV file' });
    });
});

// Helper function to insert bulk leads
function insertBulkLeads(leads, res) {
  const stmt = db.prepare('INSERT INTO leads (name, phone, email, campaign_type) VALUES (?, ?, ?, ?)');
  
  db.serialize(() => {
    let successCount = 0;
    let errorCount = 0;
    let completed = 0;
    
    // Start transaction
    db.run('BEGIN TRANSACTION', (err) => {
      if (err) {
        console.error('Error beginning transaction:', err);
        stmt.finalize();
        return res.status(500).json({ error: 'Database transaction error' });
      }
      
      // Insert each lead
      leads.forEach((lead, index) => {
        stmt.run([lead.name, lead.phone, lead.email, lead.campaign_type], function(err) {
          completed++;
          
          if (err) {
            console.error('Error inserting lead:', err);
            errorCount++;
          } else {
            successCount++;
          }
          
          // Check if this is the last lead
          if (completed === leads.length) {
            if (errorCount > 0) {
              db.run('ROLLBACK', () => {
                stmt.finalize();
                res.status(500).json({
                  error: `Bulk upload failed. ${errorCount} errors occurred.`,
                  success: 0,
                  errors: errorCount,
                  total: leads.length
                });
              });
            } else {
              db.run('COMMIT', (commitErr) => {
                stmt.finalize();
                if (commitErr) {
                  console.error('Error committing transaction:', commitErr);
                  return res.status(500).json({ error: 'Database commit error' });
                }
                
                res.json({
                  message: `Bulk upload completed. ${successCount} customers created successfully.`,
                  success: successCount,
                  errors: errorCount,
                  total: leads.length
                });
              });
            }
          }
        });
      });
    });
  });
}

// Webhook endpoint for Vapi (still available if you find webhook settings)
app.post('/api/webhook/call-completed', (req, res) => {
  console.log('🎯 Webhook received from Vapi:', JSON.stringify(req.body, null, 2));
  
  try {
    const { call } = req.body;
    
    if (call && call.id) {
      const callId = call.id;
      const status = call.status;
      
      // Find the lead by call_id
      db.get('SELECT * FROM leads WHERE call_id = ?', [callId], (err, lead) => {
        if (err) {
          console.error('❌ Database error finding lead:', err);
          return;
        }
        
        if (lead) {
          console.log(`📞 Updating call status for lead ${lead.name} (${lead.phone})`);
          
          if (status === 'ended') {
            // Determine the final status based on end reason
            let finalStatus = 'completed';
            let feedbackData = null;
            
            // Check for rejection reasons
            const endReason = call.endedReason || '';
            if (endReason.includes('customer-hung-up') || 
                endReason.includes('customer-ended-call') || 
                endReason.includes('rejected') ||
                (call.duration && call.duration < 10)) { // Very short calls might be rejections
              
              // Check if there's any meaningful conversation
              const hasConversation = call.transcript && call.transcript.length > 100;
              const hasAnalysis = call.analysis && (call.analysis.summary || call.analysis.successEvaluation);
              
              if (!hasConversation && !hasAnalysis) {
                finalStatus = 'rejected';
                feedbackData = JSON.stringify({
                  summary: 'Call was rejected or ended quickly',
                  transcript: call.transcript || 'No meaningful conversation',
                  duration: call.duration || 0,
                  status: call.status || 'ended',
                  analysis: { summary: 'Call rejected by customer' },
                  endedReason: endReason
                });
              } else {
                // Even if hung up, if there was conversation, mark as completed
                finalStatus = 'completed';
              }
            }
            
            // Extract feedback from successful calls
            if (finalStatus === 'completed' && (call.transcript || call.summary || call.analysis)) {
              feedbackData = JSON.stringify({
                summary: call.summary || call.analysis?.summary || 'Call completed successfully',
                transcript: call.transcript || '',
                duration: call.duration || 0,
                status: call.status || 'ended',
                analysis: call.analysis || {},
                endedReason: endReason
              });
            }
            
            // Update lead status
            const updateQuery = feedbackData 
              ? 'UPDATE leads SET status = ?, feedback = ? WHERE call_id = ?'
              : 'UPDATE leads SET status = ? WHERE call_id = ?';
            
            const updateParams = feedbackData 
              ? [finalStatus, feedbackData, callId]
              : [finalStatus, callId];
            
            db.run(updateQuery, updateParams, function(updateErr) {
              if (updateErr) {
                console.error('❌ Error updating lead:', updateErr);
              } else {
                console.log(`✅ Successfully updated lead ${lead.name} to completed status`);
                if (feedbackData) {
                  console.log('📝 Feedback saved for lead:', lead.name);
                }
              }
            });
          }
        } else {
          console.log(`⚠️ No lead found with call_id: ${callId}`);
        }
      });
    }
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
  }
  
  res.json({ message: 'Webhook received successfully' });
});

// Test webhook endpoint  
app.get('/api/webhook/test', (req, res) => {
  console.log('🧪 Webhook test endpoint accessed via ngrok');
  res.json({ 
    message: 'ngrok tunnel is working perfectly!', 
    timestamp: new Date().toISOString(),
    tunnel_url: 'https://nora-unmental-keisha.ngrok-free.dev',
    status: 'connected'
  });
});

// Download sample CSV
app.get('/api/sample-csv', (req, res) => {
  const sampleData = `name,phone,email
John Doe,+1234567890,john@example.com
Jane Smith,+1987654321,jane@example.com
Bob Johnson,+1122334455,bob@example.com`;

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="sample-leads.csv"');
  res.send(sampleData);
});

// Catch-all handler: serve React app for any non-API routes
app.get('*', (req, res) => {
  // If it's an API route that doesn't exist, return 404
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // For all other routes, serve the React app
  const buildPath = path.join(__dirname, '../client/build');
  if (fs.existsSync(buildPath)) {
    res.sendFile(path.join(buildPath, 'index.html'));
  } else {
    // Development fallback - redirect to localhost:3000
    res.send(`
      <html>
        <head><title>Feedback Manager</title></head>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1>🚀 Feedback Manager</h1>
          <p>Development mode detected!</p>
          <p><strong>Frontend:</strong> <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>
          <p><strong>Backend API:</strong> <a href="/api/leads">/api/leads</a></p>
          <script>
            // Auto-redirect in development if accessing from ngrok
            if (window.location.hostname.includes('ngrok')) {
              setTimeout(() => {
                window.open('http://localhost:3000', '_blank');
              }, 2000);
            }
          </script>
        </body>
      </html>
    `);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('\n🌐 WEBHOOK URL FOR VAPI (Optional):');
  console.log('https://nora-unmental-keisha.ngrok-free.dev/api/webhook/call-completed');
  console.log('\n📞 NEW AUTO-REFRESH ENDPOINTS:');
  console.log('- GET  /api/call/status/:callId - Check single call status');
  console.log('- POST /api/calls/check-status - Check all pending calls');
  console.log(`\nAPI endpoints:`);
  console.log(`- GET    /api/leads - Get all leads`);
  console.log(`- POST   /api/leads - Create single lead`);
  console.log(`- DELETE /api/leads/:id - Delete single lead`);
  console.log(`- POST   /api/leads/bulk - Bulk upload leads`);
  console.log(`- POST   /api/call/:id - Call single lead`);
  console.log(`- POST   /api/call/bulk - Call all pending leads`);
  console.log(`- GET    /api/sample-csv - Download sample CSV`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});