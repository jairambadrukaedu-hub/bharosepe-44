import React, { useState } from 'react';
import EscrowAdminDashboard from '../components/admin/EscrowAdminDashboard';

const TestEscrowAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demo' | 'component'>('demo');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            👨‍💼 Escrow Admin Dashboard Test
          </h1>
          <p className="text-gray-600">
            Test the manual escrow release approval system
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              activeTab === 'demo'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 shadow-lg'
            }`}
          >
            📋 Demo Info
          </button>
          <button
            onClick={() => setActiveTab('component')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              activeTab === 'component'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 shadow-lg'
            }`}
          >
            🖥️ Live Component
          </button>
        </div>

        {/* Demo Info Tab */}
        {activeTab === 'demo' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Features */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Dashboard Features</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-bold text-blue-900">3 Tabs</h3>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1">
                    <li>• Pending Releases - Queue of escrow awaiting approval</li>
                    <li>• Disputes - Open disputes requiring resolution</li>
                    <li>• Evidence - Evidence verification status</li>
                  </ul>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <h3 className="font-bold text-green-900">Manual Control</h3>
                  <ul className="text-sm text-green-800 mt-2 space-y-1">
                    <li>• No automation - all decisions manual</li>
                    <li>• Admin notes required for decision</li>
                    <li>• 3 action buttons: Approve / Reject / Hold</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                  <h3 className="font-bold text-purple-900">Smart Sorting</h3>
                  <ul className="text-sm text-purple-800 mt-2 space-y-1">
                    <li>• Priority levels: Urgent → High → Normal → Low</li>
                    <li>• Oldest first within priority</li>
                    <li>• Auto-refresh every 30 seconds</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Workflow */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Admin Workflow</h2>
              <div className="space-y-3">
                {[
                  { num: '1', title: 'Login as Admin', desc: 'Access admin dashboard' },
                  { num: '2', title: 'View Queue', desc: 'See pending releases sorted by priority' },
                  { num: '3', title: 'Review Details', desc: 'Check transaction & evidence status' },
                  { num: '4', title: 'Add Notes', desc: 'Document decision reasoning' },
                  { num: '5', title: 'Decide', desc: 'Approve/Reject/Hold for review' },
                  { num: '6', title: 'Log Entry', desc: 'Decision recorded with timestamp' },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {step.num}
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-gray-800">{step.title}</p>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Decision Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
                    <h3 className="font-bold text-green-900 mb-2">✅ APPROVE</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Release funds to seller</li>
                      <li>• Mark escrow as released</li>
                      <li>• Send confirmation</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border-2 border-red-300">
                    <h3 className="font-bold text-red-900 mb-2">❌ REJECT & REFUND</h3>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Refund to buyer</li>
                      <li>• Mark escrow refunded</li>
                      <li>• Send reason to buyer</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-300">
                    <h3 className="font-bold text-yellow-900 mb-2">⏸️ HOLD FOR REVIEW</h3>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Pending further investigation</li>
                      <li>• Re-assign to other admin</li>
                      <li>• Requires additional evidence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Component Tab */}
        {activeTab === 'component' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Live Dashboard Component</h2>
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
              <EscrowAdminDashboard />
            </div>
          </div>
        )}

        {/* Setup Instructions */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h3 className="font-bold text-blue-900 mb-2">🚀 How to Populate Dashboard</h3>
          <ol className="text-blue-800 text-sm space-y-2 ml-4">
            <li>1. Create mock transactions in your database</li>
            <li>2. Create escrow records with different statuses</li>
            <li>3. Queue them for release with different priorities</li>
            <li>4. Dashboard auto-fetches and displays pending items</li>
            <li>5. Test approve/reject/hold actions</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestEscrowAdmin;
