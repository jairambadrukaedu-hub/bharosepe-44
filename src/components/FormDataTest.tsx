/**
 * FORM DATA PERSISTENCE TEST COMPONENT
 * Test the form saving functionality
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface SavedFormData {
  id: string;
  transaction_id: string;
  product_category: string;
  annexure_code: string;
  product_name: string;
  created_at: string;
}

export const FormDataTest = () => {
  const [savedForms, setSavedForms] = useState<SavedFormData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSavedForms = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('❌ No authenticated user');
        return;
      }

      // Fetch from contracts table
      const { data: contracts, error: contractsError } = await supabase
        .from('contracts')
        .select('id, transaction_id, product_category, annexure_code, product_name, created_at')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (contractsError) {
        console.error('Error fetching contracts:', contractsError);
        return;
      }

      setSavedForms(contracts || []);
      console.log('📋 Found saved forms:', contracts);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTestForm = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('❌ No authenticated user');
        return;
      }

      const testData = {
        transaction_id: crypto.randomUUID(),
        seller_id: user.id,
        buyer_id: user.id,
        product_name: 'Test Product ' + Date.now(),
        amount: 100.00,
        status: 'draft',
        product_category: 'electronics',
        annexure_code: 'A'
      };

      const { data, error } = await supabase
        .from('contracts')
        .insert(testData)
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating test form:', error);
        return;
      }

      console.log('✅ Test form created:', data);
      fetchSavedForms(); // Refresh the list

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const testTableAccess = async () => {
    try {
      // Test contract_form_data table access
      const { data, error } = await supabase
        .from('contract_form_data')
        .select('*')
        .limit(1);

      if (error) {
        console.error('❌ contract_form_data table error:', error);
      } else {
        console.log('✅ contract_form_data table accessible:', data);
      }

      // Test contracts table access
      const { data: contractData, error: contractError } = await supabase
        .from('contracts')
        .select('*')
        .limit(1);

      if (contractError) {
        console.error('❌ contracts table error:', contractError);
      } else {
        console.log('✅ contracts table accessible:', contractData);
      }

    } catch (error) {
      console.error('Table access test failed:', error);
    }
  };

  React.useEffect(() => {
    fetchSavedForms();
    testTableAccess();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Form Data Persistence Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Button onClick={fetchSavedForms} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh Saved Forms'}
            </Button>
            <Button onClick={createTestForm} variant="secondary">
              Create Test Form
            </Button>
            <Button onClick={testTableAccess} variant="outline">
              Test Table Access
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Saved Forms ({savedForms.length})</h3>
            {savedForms.length === 0 ? (
              <p className="text-gray-500">No saved forms found</p>
            ) : (
              <div className="space-y-2">
                {savedForms.map((form) => (
                  <div key={form.id} className="p-3 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{form.product_name || 'Unnamed Product'}</p>
                        <p className="text-sm text-gray-600">
                          {form.product_category} - Annexure {form.annexure_code}
                        </p>
                        <p className="text-xs text-gray-500">
                          Transaction: {form.transaction_id}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(form.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormDataTest;