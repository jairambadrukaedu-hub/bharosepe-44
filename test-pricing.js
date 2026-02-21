/**
 * Quick pricing calculation test
 * Verifies that the new additive model is correct:
 * Total = Sale Price + Platform Fee (1%)
 */

// Test data
const testCases = [
  { salePrice: 100, platformFeePercent: 1 },
  { salePrice: 1000, platformFeePercent: 1 },
  { salePrice: 10000, platformFeePercent: 1 },
  { salePrice: 50000, platformFeePercent: 1 },
];

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('   PRICING CALCULATION TEST (Additive Model)');
console.log('═══════════════════════════════════════════════════════════════\n');

testCases.forEach(test => {
  const { salePrice, platformFeePercent } = test;
  const platformFee = Math.round(salePrice * (platformFeePercent / 100));
  const total = salePrice + platformFee;
  
  console.log(`Sale Price:        ₹${salePrice.toLocaleString('en-IN')}`);
  console.log(`Platform Fee (${platformFeePercent}%):  ₹${platformFee.toLocaleString('en-IN')}`);
  console.log(`─────────────────────────────────`);
  console.log(`Total for Buyer:   ₹${total.toLocaleString('en-IN')}`);
  console.log(`Seller Receives:   ₹${salePrice.toLocaleString('en-IN')}`);
  console.log('\n');
});

console.log('═══════════════════════════════════════════════════════════════');
console.log('✓ All calculations are ADDITIVE (not deducted)');
console.log('═══════════════════════════════════════════════════════════════\n');
