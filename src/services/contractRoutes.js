/**
 * CONTRACT GENERATION API ENDPOINT
 * 
 * POST /api/contracts/generate
 * 
 * Request body:
 * {
 *   "transaction_id": "12345",
 *   "buyer_uuid": "uuid-xxxx",
 *   "seller_uuid": "uuid-yyyy"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "contractId": "uuid-xxxx",
 *   "transactionId": "12345",
 *   "metadata": {
 *     "replacedCount": 50,
 *     "totalPlaceholders": 51,
 *     "successRate": "98.04"
 *   }
 * }
 */

const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const contractGenerationService = require('../services/contractGenerationService');

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment variables');
}

const supabaseClient = createClient(supabaseUrl, supabaseKey);

/**
 * Generate Contract
 * POST /api/contracts/generate
 */
router.post('/generate', async (req, res) => {
  try {
    const { transaction_id, buyer_uuid, seller_uuid } = req.body;

    // Validate inputs
    if (!transaction_id || !buyer_uuid || !seller_uuid) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: transaction_id, buyer_uuid, seller_uuid'
      });
    }

    // Generate contract
    const result = await contractGenerationService.generateContract(supabaseClient, {
      transaction_id,
      buyer_uuid,
      seller_uuid
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }

    // Return success response
    res.json(result);
  } catch (error) {
    console.error('Contract generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get Contract by ID
 * GET /api/contracts/:contractId
 */
router.get('/:contractId', async (req, res) => {
  try {
    const { contractId } = req.params;

    const { data: contract, error } = await supabaseClient
      .from('contracts')
      .select('*')
      .eq('id', contractId)
      .single();

    if (error || !contract) {
      return res.status(404).json({
        success: false,
        error: 'Contract not found'
      });
    }

    res.json({
      success: true,
      contract
    });
  } catch (error) {
    console.error('Error fetching contract:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Get Contract Metadata
 * GET /api/contracts/:contractId/metadata
 */
router.get('/:contractId/metadata', async (req, res) => {
  try {
    const { contractId } = req.params;

    const { data: metadata, error } = await supabaseClient
      .from('contract_templates')
      .select('*')
      .eq('contract_id', contractId)
      .single();

    if (error || !metadata) {
      return res.status(404).json({
        success: false,
        error: 'Contract metadata not found'
      });
    }

    // Calculate success rate
    const successRate = (metadata.populated_fields / metadata.total_placeholders * 100).toFixed(2);

    res.json({
      success: true,
      metadata: {
        ...metadata,
        successRate: `${successRate}%`
      }
    });
  } catch (error) {
    console.error('Error fetching contract metadata:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Update Contract Status
 * PATCH /api/contracts/:contractId/status
 */
router.patch('/:contractId/status', async (req, res) => {
  try {
    const { contractId } = req.params;
    const { status, acceptedBy } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Status is required'
      });
    }

    // Prepare update data
    const updateData = {
      status,
      updated_at: new Date().toISOString()
    };

    // Track acceptance
    if (acceptedBy === 'seller' && status === 'signed') {
      updateData.seller_accepted_at = new Date().toISOString();
    } else if (acceptedBy === 'buyer' && status === 'signed') {
      updateData.buyer_accepted_at = new Date().toISOString();
    }

    const { data: contract, error } = await supabaseClient
      .from('contracts')
      .update(updateData)
      .eq('id', contractId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.json({
      success: true,
      contract
    });
  } catch (error) {
    console.error('Error updating contract status:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * List Contracts by Transaction
 * GET /api/contracts/transaction/:transactionId
 */
router.get('/transaction/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;

    const { data: contracts, error } = await supabaseClient
      .from('contracts')
      .select('*')
      .eq('transaction_id', transactionId);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.json({
      success: true,
      contracts,
      count: contracts.length
    });
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
