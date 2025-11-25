/**
 * Profile Schema Inspector Component
 * Add to your page temporarily to check what fields exist
 * 
 * Usage:
 * import { ProfileSchemaInspector } from '@/components/debug/ProfileSchemaInspector';
 * 
 * <ProfileSchemaInspector />
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const REQUIRED_FIELDS = [
  'id',
  'full_name',
  'email',
  'phone',
  'address',
  'city',
  'state',
  'pincode',
  'pan_number',
  'gst_number',
  'business_name',
  'business_type',
  'verified_phone',
  'created_at',
  'updated_at',
];

export function ProfileSchemaInspector() {
  const [fields, setFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkSchema();
  }, []);

  const checkSchema = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);

      if (err) {
        setError(err.message);
        return;
      }

      if (data && data.length > 0) {
        const detectedFields = Object.keys(data[0]).sort();
        setFields(detectedFields);
      } else {
        setError('No profiles in database');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const missingFields = REQUIRED_FIELDS.filter((f) => !fields.includes(f));
  const allPresent = missingFields.length === 0;

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 overflow-auto z-50">
      <Card className="border-2 border-orange-500 bg-orange-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            🔍 Profile Schema Check
            <Button
              size="sm"
              variant="outline"
              onClick={checkSchema}
              disabled={loading}
            >
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs space-y-2">
          {loading && <p>⏳ Checking schema...</p>}

          {error && (
            <p className="text-red-600">
              <strong>Error:</strong> {error}
            </p>
          )}

          {!loading && !error && (
            <>
              <div>
                <p className="font-semibold mb-2">
                  {allPresent ? '✅ All Required Fields Present' : '❌ Missing Fields'}
                </p>

                <div className="space-y-1 max-h-60 overflow-auto">
                  {REQUIRED_FIELDS.map((field) => {
                    const exists = fields.includes(field);
                    return (
                      <div key={field} className="flex items-center gap-2">
                        <span className="w-4">{exists ? '✅' : '❌'}</span>
                        <code className="text-xs">{field}</code>
                      </div>
                    );
                  })}
                </div>

                {!allPresent && (
                  <div className="mt-3 p-2 bg-red-100 rounded border border-red-300">
                    <p className="font-semibold text-red-900">Missing:</p>
                    <code className="text-xs text-red-800">
                      {missingFields.join(', ')}
                    </code>
                    <p className="text-xs text-red-700 mt-1">
                      Run: <code>supabase db push</code>
                    </p>
                  </div>
                )}

                {allPresent && (
                  <div className="mt-3 p-2 bg-green-100 rounded border border-green-300">
                    <p className="text-xs text-green-800">
                      ✅ Migration successfully applied!
                    </p>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-600 mt-4">
                <strong>Debug Info:</strong>
                <br />
                Found {fields.length} fields
                <br />
                Required {REQUIRED_FIELDS.length} fields
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
