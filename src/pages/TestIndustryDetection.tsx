import React, { useState } from 'react';
import { detectIndustry } from '../services/industryDetectionService';

const TestIndustryDetection: React.FC = () => {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testDescriptions = [
    'iPhone 13 Pro Max original sealed box',
    'Custom tailored suit with embroidery',
    'House electrician to fix wiring',
    'Yoga online course video lessons',
    'Courier service Delhi to Mumbai',
    'Home cleaning and carpet washing',
  ];

  const handleDetect = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const detection = await detectIndustry(description);
      setResult(detection);
    } catch (error) {
      console.error('Detection error:', error);
      setResult({ error: String(error) });
    }
    setLoading(false);
  };

  const handleQuickTest = (desc: string) => {
    setDescription(desc);
    setTimeout(() => {
      // This will be clicked next
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏷️ Industry Detection Test
          </h1>
          <p className="text-gray-600">
            Test the AI-powered industry classification system
          </p>
        </div>

        {/* Main Test Area */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Transaction Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you're selling/buying..."
              className="w-full h-24 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleDetect}
            disabled={loading || !description.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {loading ? 'Detecting...' : 'Detect Industry'}
          </button>

          {/* Results */}
          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Detection Results:</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Industry:</span>
                  <span className="ml-2 text-lg font-bold text-blue-600">
                    {result.industry?.toUpperCase().replace(/_/g, ' ')}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Confidence:</span>
                  <span className="ml-2 text-lg font-bold text-green-600">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Risk Level:</span>
                  <span className={`ml-2 text-lg font-bold ${
                    result.riskLevel === 'high' ? 'text-red-600' :
                    result.riskLevel === 'medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {result.riskLevel?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Reasoning:</span>
                  <p className="ml-2 text-gray-600 mt-1">{result.reasoning}</p>
                </div>
                {result.error && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
                    <p className="text-red-700 font-semibold">Error:</p>
                    <p className="text-red-600">{result.error}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Tests */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Test Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testDescriptions.map((desc, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDescription(desc);
                  setTimeout(() => handleDetect(), 100);
                }}
                className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg hover:bg-blue-100 transition text-left"
              >
                <p className="text-sm text-gray-600 font-semibold mb-1">Example {idx + 1}</p>
                <p className="text-gray-800">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h3 className="font-bold text-blue-900 mb-2">ℹ️ How It Works</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Analyzes keywords in description</li>
            <li>• Calculates confidence score (0-1)</li>
            <li>• Assigns risk level (low/medium/high)</li>
            <li>• Returns industry classification from 6 categories</li>
            <li>• Results stored in Supabase</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestIndustryDetection;
