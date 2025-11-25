import React from 'react';
import { Link } from 'react-router-dom';

const TestHub: React.FC = () => {
  const tests = [
    {
      path: '/test/industry-detection',
      title: 'Industry Detection',
      emoji: '🏷️',
      description: 'Test AI-powered industry classification from transaction descriptions',
      features: ['6 categories', 'Confidence scoring', 'Risk assessment'],
      color: 'blue',
    },
    {
      path: '/test/contract-generation',
      title: 'Contract Generation',
      emoji: '📄',
      description: 'Generate industry-specific legal contracts with mandatory clauses',
      features: ['6 templates', '15+ acts', 'HTML export'],
      color: 'purple',
    },
    {
      path: '/test/otp-system',
      title: 'OTP System',
      emoji: '🔐',
      description: 'Test OTP generation, verification, and multi-channel delivery',
      features: ['6-digit OTP', '10 min expiry', '3 attempt max'],
      color: 'green',
    },
    {
      path: '/test/escrow-admin',
      title: 'Escrow Admin Dashboard',
      emoji: '👨‍💼',
      description: 'Manual escrow release approval queue with priority sorting',
      features: ['3 tabs', 'Priority queue', 'Manual control'],
      color: 'orange',
    },
    {
      path: '/test/end-to-end',
      title: 'End-to-End Flow',
      emoji: '🔄',
      description: 'Complete transaction flow from creation to settlement',
      features: ['10 steps', 'Full journey', 'Fee calculation'],
      color: 'indigo',
    },
  ];

  const getGradient = (color: string) => {
    const gradients: { [key: string]: string } = {
      blue: 'from-blue-50 to-blue-100 border-blue-300',
      purple: 'from-purple-50 to-purple-100 border-purple-300',
      green: 'from-green-50 to-green-100 border-green-300',
      orange: 'from-orange-50 to-orange-100 border-orange-300',
      indigo: 'from-indigo-50 to-indigo-100 border-indigo-300',
    };
    return gradients[color] || 'from-gray-50 to-gray-100 border-gray-300';
  };

  const getButtonColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-600 hover:bg-blue-700',
      purple: 'bg-purple-600 hover:bg-purple-700',
      green: 'bg-green-600 hover:bg-green-700',
      orange: 'bg-orange-600 hover:bg-orange-700',
      indigo: 'bg-indigo-600 hover:bg-indigo-700',
    };
    return colors[color] || 'bg-gray-600 hover:bg-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🧪 Bharose Pe - Test Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive local testing environment for the AI-powered escrow and contract system
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {[
            { label: 'Test Pages', value: '5' },
            { label: 'Industries', value: '6' },
            { label: 'Indian Acts', value: '15+' },
            { label: 'Tables', value: '8' },
            { label: 'Services', value: '4' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tests.map((test, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${getGradient(
                test.color
              )} rounded-lg shadow-lg border-2 overflow-hidden hover:shadow-xl transition`}
            >
              <div className="p-6">
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{test.emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-800">{test.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 text-sm">{test.description}</p>

                {/* Features */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {test.features.map((feature, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-3 py-1 bg-white bg-opacity-70 text-gray-800 text-xs rounded-full font-semibold"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <Link
                  to={test.path}
                  className={`block w-full text-center ${getButtonColor(
                    test.color
                  )} text-white font-bold py-3 px-4 rounded-lg transition`}
                >
                  Start Testing →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* How to Use */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 How to Use This Test Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">1️⃣</span> Test Individual Services
              </h3>
              <p className="text-gray-600 text-sm">
                Click on any test card to access individual test pages for each service component.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">2️⃣</span> Validate Data Flow
              </h3>
              <p className="text-gray-600 text-sm">
                Each test page shows how data flows through the system and integrates with Supabase.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">3️⃣</span> Check Console Logs
              </h3>
              <p className="text-gray-600 text-sm">
                Open browser DevTools (F12) to see detailed logs and API responses from each service.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">4️⃣</span> Verify Database
              </h3>
              <p className="text-gray-600 text-sm">
                Check Supabase dashboard to confirm data is being stored correctly in all 8 tables.
              </p>
            </div>
          </div>
        </div>

        {/* Testing Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Services Checklist */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">✅ Services to Test</h3>
            <div className="space-y-3">
              {[
                'Industry Detection (AI classification)',
                'Contract Templates (6 industries)',
                'OTP Generation & Verification',
                'Escrow Management (1% fee)',
                'Admin Dashboard (manual approval)',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-gray-400 rounded cursor-pointer hover:border-blue-600"></div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Database Checklist */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">✅ Database Tables to Verify</h3>
            <div className="space-y-3">
              {[
                'industry_classification',
                'evidence_collection',
                'escrow_records',
                'otp_records',
                'dispute_evidence_log',
                'industry_rules',
                'escrow_release_queue',
                'platform_liability_tracking',
              ].map((table, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-gray-400 rounded cursor-pointer hover:border-blue-600"></div>
                  <span className="text-gray-700 font-mono text-sm">{table}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-green-50 border-l-4 border-green-600 p-8 rounded-lg">
          <h3 className="font-bold text-green-900 mb-3">🚀 Next Steps After Testing</h3>
          <ol className="text-green-800 space-y-2 ml-4">
            <li>1. Complete all 5 test pages locally</li>
            <li>2. Verify all Supabase tables have data</li>
            <li>3. Check browser console for any errors</li>
            <li>4. Test each admin decision (Approve/Reject/Hold)</li>
            <li>5. When satisfied: Push to production website</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestHub;
