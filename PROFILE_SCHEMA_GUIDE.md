# Profile Table Schema - Complete Buyer/Seller Details

## Overview
The profiles table now stores comprehensive buyer and seller information needed for contract generation, identification, and transaction management.

## Required Database Columns

### Identity Fields
- **id** (UUID, PRIMARY KEY) - User ID from auth
- **full_name** (TEXT) - Complete name of the user
- **email** (TEXT, UNIQUE) - Email address
- **phone** (TEXT) - Contact phone number
- **verified_phone** (BOOLEAN) - Phone verification status

### Address Fields
- **address** (TEXT) - Street address
- **city** (TEXT) - City/Town
- **state** (TEXT) - State/Province
- **pincode** (TEXT) - Postal/ZIP code

### Business Information
- **business_name** (TEXT) - Business/Company name (if applicable)
- **business_type** (TEXT) - Type of business: 'individual', 'business', 'llc', 'pvt_ltd'

### Tax/Legal Information
- **pan_number** (TEXT) - PAN (Permanent Account Number) for India
- **gst_number** (TEXT) - GST number for India

### Metadata
- **created_at** (TIMESTAMP) - Profile creation date
- **updated_at** (TIMESTAMP) - Last update date

## How This Data is Used

### In Contract Generation
When a contract is generated, the system:
1. Fetches the current user's profile (buyer or seller)
2. Fetches the counterparty's profile using the transaction ID
3. Replaces template variables like:
   - `{{buyer_name}}` → from profiles.full_name
   - `{{buyer_email}}` → from profiles.email
   - `{{buyer_phone}}` → from profiles.phone
   - `{{buyer_address}}` → from address + city + state + pincode
   - `{{seller_name}}` → from profiles.full_name
   - `{{seller_email}}` → from profiles.email
   - etc.

### In Transaction Management
- Buyer and seller IDs are stored in transactions table
- Their complete profiles are fetched to display in contracts
- All communication and disputes reference this data

### In Verification
- Phone verification status is tracked
- PAN/GST numbers are used for business identification
- Business type determines contract terms

## Migration Applied
A migration file has been created: `20251125_add_profile_fields.sql`

This migration:
1. Adds all required columns to profiles table if they don't exist
2. Creates indexes on email and phone for faster lookups
3. Adds RLS policies to allow transaction participants to view each other's profiles

## Important Notes

✅ **All fields are now stored in the database**
✅ **ProfileService already handles mapping** (full_name ↔ name, etc.)
✅ **Contract generation fetches this data automatically**
✅ **RLS policies ensure data privacy** - users only see profiles relevant to their transactions

## Fields Summary Table

| Field | Type | Purpose | Contract Field |
|-------|------|---------|-----------------|
| full_name | TEXT | User's name | {{buyer_name}}, {{seller_name}} |
| email | TEXT | Contact email | {{buyer_email}}, {{seller_email}} |
| phone | TEXT | Contact number | {{buyer_phone}}, {{seller_phone}} |
| address | TEXT | Street address | {{buyer_address}}, {{seller_address}} |
| city | TEXT | City | {{buyer_address}}, {{seller_address}} |
| state | TEXT | State | {{buyer_address}}, {{seller_address}} |
| pincode | TEXT | Postal code | {{buyer_address}}, {{seller_address}} |
| pan_number | TEXT | Tax ID | Legal identification |
| gst_number | TEXT | GST ID | Business identification |
| business_name | TEXT | Company name | Verification |
| business_type | TEXT | Business type | Contract terms |
| verified_phone | BOOLEAN | Verification status | Contract verification |
