#!/usr/bin/env node

/**
 * Check if profile table has all required fields
 * Run: node check-profile-schema.js
 */

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  console.error("Please check your .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const REQUIRED_FIELDS = [
  "id",
  "full_name",
  "email",
  "phone",
  "address",
  "city",
  "state",
  "pincode",
  "pan_number",
  "gst_number",
  "business_name",
  "business_type",
  "verified_phone",
  "created_at",
  "updated_at",
];

async function checkProfileSchema() {
  console.log("🔍 Checking profile table schema...\n");

  try {
    // Get profile table information from information_schema
    const { data, error } = await supabase.rpc("check_profiles_columns");

    if (error && error.code === "PGRST204") {
      // Function doesn't exist, try direct query
      console.log("📊 Attempting direct schema inspection...\n");

      // Get a single profile to see what columns exist
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .limit(1);

      if (profileError) {
        console.error("❌ Error querying profiles:", profileError.message);
        process.exit(1);
      }

      if (profiles && profiles.length > 0) {
        const existingFields = Object.keys(profiles[0]);
        console.log("✅ Existing fields in profiles table:");
        console.log("━".repeat(50));
        existingFields.forEach((field) => {
          const status = REQUIRED_FIELDS.includes(field) ? "✅" : "⚠️";
          console.log(`  ${status} ${field}`);
        });

        console.log("\n🔍 Required fields check:");
        console.log("━".repeat(50));

        let missingCount = 0;
        REQUIRED_FIELDS.forEach((field) => {
          if (existingFields.includes(field)) {
            console.log(`  ✅ ${field}`);
          } else {
            console.log(`  ❌ ${field} - MISSING`);
            missingCount++;
          }
        });

        console.log("\n" + "━".repeat(50));
        if (missingCount === 0) {
          console.log("✅ ALL REQUIRED FIELDS ARE PRESENT!");
          console.log("   Migration has been successfully applied.");
        } else {
          console.log(
            `❌ MISSING ${missingCount} FIELD${missingCount > 1 ? "S" : ""}`
          );
          console.log("   Run migration: supabase db push");
        }
      } else {
        console.log(
          "⚠️  No profiles found in database. Creating test profile...\n"
        );

        // Create a test profile to check schema
        const { data: testData, error: createError } = await supabase
          .from("profiles")
          .insert({
            id: "test-" + Date.now(),
            full_name: "Test User",
            email: "test@example.com",
          })
          .select();

        if (createError) {
          console.error("❌ Error creating test profile:", createError.message);
          process.exit(1);
        }

        const existingFields = Object.keys(testData[0]);
        console.log("✅ Existing fields in profiles table:");
        console.log("━".repeat(50));
        existingFields.forEach((field) => {
          const status = REQUIRED_FIELDS.includes(field) ? "✅" : "⚠️";
          console.log(`  ${status} ${field}`);
        });

        console.log("\n🔍 Required fields check:");
        console.log("━".repeat(50));

        let missingCount = 0;
        REQUIRED_FIELDS.forEach((field) => {
          if (existingFields.includes(field)) {
            console.log(`  ✅ ${field}`);
          } else {
            console.log(`  ❌ ${field} - MISSING`);
            missingCount++;
          }
        });

        console.log("\n" + "━".repeat(50));
        if (missingCount === 0) {
          console.log("✅ ALL REQUIRED FIELDS ARE PRESENT!");
          console.log("   Migration has been successfully applied.");
        } else {
          console.log(
            `❌ MISSING ${missingCount} FIELD${missingCount > 1 ? "S" : ""}`
          );
          console.log("   Run migration: supabase db push");
        }

        // Clean up test profile
        await supabase.from("profiles").delete().eq("id", "test-" + Date.now());
      }
    } else {
      // Use RPC result if available
      console.log("📊 Existing columns:");
      console.log("━".repeat(50));
      if (data && Array.isArray(data)) {
        const existingFields = data.map((col) => col.column_name);
        existingFields.forEach((field) => {
          const status = REQUIRED_FIELDS.includes(field) ? "✅" : "⚠️";
          console.log(`  ${status} ${field}`);
        });

        console.log("\n🔍 Required fields check:");
        console.log("━".repeat(50));

        let missingCount = 0;
        REQUIRED_FIELDS.forEach((field) => {
          if (existingFields.includes(field)) {
            console.log(`  ✅ ${field}`);
          } else {
            console.log(`  ❌ ${field} - MISSING`);
            missingCount++;
          }
        });

        console.log("\n" + "━".repeat(50));
        if (missingCount === 0) {
          console.log("✅ ALL REQUIRED FIELDS ARE PRESENT!");
          console.log("   Migration has been successfully applied.");
        } else {
          console.log(
            `❌ MISSING ${missingCount} FIELD${missingCount > 1 ? "S" : ""}`
          );
          console.log("   Run migration: supabase db push");
        }
      }
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
    process.exit(1);
  }
}

checkProfileSchema();
