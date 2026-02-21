#!/usr/bin/env node

/**
 * SIMPLE CONTRACT GENERATION TEST SCRIPT
 * 
 * Run this with: node test-contract-simple.js
 * 
 * This will:
 * 1. Test the contract generation service
 * 2. Show you the success rate
 * 3. Tell you if everything works
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

// Import contract service
import contractService from './src/services/contractGenerationService.js';

// Initialize Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ ERROR: Missing Supabase credentials in .env file');
  console.error('   Add these to your .env file:');
  console.error('   VITE_SUPABASE_URL=your_url');
  console.error('   VITE_SUPABASE_ANON_KEY=your_key');
  process.exit(1);
}

const supabaseClient = createClient(supabaseUrl, supabaseKey);
async function findTestTransaction() {
  console.log('\n🔍 Looking for a test transaction...\n');

  // Get transactions
  const { data: transactions, error } = await supabaseClient
    .from('transactions')
    .select('id, buyer_id, seller_id')
    .limit(1);

  if (error || !transactions || transactions.length === 0) {
    console.error('❌ No transactions found in database');
    return null;
  }

  const transaction = transactions[0];
  console.log('✅ Found transaction:');
  console.log(`   ID: ${transaction.id}`);
  console.log(`   Buyer: ${transaction.buyer_id}`);
  console.log(`   Seller: ${transaction.seller_id}`);

  return transaction;
}

/**
 * Step 2: Generate the contract
 */
async function generateTestContract(transaction) {
  console.log('\n📋 Generating contract...\n');

  const result = await contractService.generateContract(supabaseClient, {
    transaction_id: transaction.id,
    buyer_uuid: transaction.buyer_id,
    seller_uuid: transaction.seller_id
  });

  return result;
}

/**
 * Step 3: Display results
 */
function displayResults(result) {
  console.log('\n' + '='.repeat(80));
  console.log('CONTRACT GENERATION TEST RESULTS');
  console.log('='.repeat(80) + '\n');

  if (!result.success) {
    console.error('❌ FAILED:', result.error);
    return false;
  }

  console.log('✅ SUCCESS!\n');
  console.log('📊 Statistics:');
  console.log(`   Contract ID: ${result.contractId}`);
  console.log(`   Transaction ID: ${result.transactionId}`);
  console.log(`   Seller ID: ${result.sellerId}`);
  console.log(`   Buyer ID: ${result.buyerId}`);

  console.log('\n📈 Placeholder Replacement:');
  console.log(`   Total Placeholders: ${result.metadata.totalPlaceholders}`);
  console.log(`   Replaced: ${result.metadata.replacedCount}`);
  console.log(`   Success Rate: ${result.metadata.successRate}%`);

  console.log('\n📄 Contract Content:');
  console.log(`   Length: ${result.content.length} characters`);
  console.log(`   First 200 chars: ${result.content.substring(0, 200)}...`);

  console.log('\n' + '='.repeat(80));

  if (parseFloat(result.metadata.successRate) >= 99) {
    console.log('🎉 EXCELLENT! >99% placeholder replacement achieved!');
  } else if (parseFloat(result.metadata.successRate) >= 90) {
    console.log('✨ GOOD! >90% placeholder replacement achieved!');
  } else {
    console.log('⚠️  WARNING: Low placeholder replacement rate');
  }

  console.log('='.repeat(80) + '\n');

  return true;
}

/**
 * Main test runner
 */
async function runTest() {
  try {
    console.log('\n╔════════════════════════════════════════════════════════════════════╗');
    console.log('║  CONTRACT GENERATION SERVICE - TEST                               ║');
    console.log('╚════════════════════════════════════════════════════════════════════╝\n');

    // Step 1: Find test transaction
    const transaction = await findTestTransaction();
    if (!transaction) {
      console.error('\n❌ Cannot proceed without a test transaction');
      process.exit(1);
    }

    // Step 2: Generate contract
    const result = await generateTestContract(transaction);

    // Step 3: Display results
    const success = displayResults(result);

    if (success) {
      console.log('✅ TEST PASSED - Contract generation is working!\n');
      process.exit(0);
    } else {
      console.log('❌ TEST FAILED - See error above\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ TEST ERROR:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the test
runTest();
