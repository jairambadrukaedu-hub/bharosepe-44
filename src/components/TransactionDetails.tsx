import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Shield, Package, IndianRupee, Lightbulb, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { TransactionType } from '@/pages/TransactionSetup';
import { detectIndustry } from '@/services/industryDetectionService';

interface TransactionDetailsProps {
  transactionType: TransactionType | null;
  details: any;
  onDetailsUpdate: (details: any) => void;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transactionType,
  details,
  onDetailsUpdate
}) => {
  const [formData, setFormData] = useState(details);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    onDetailsUpdate(formData);
  }, [formData, onDetailsUpdate]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Generate AI suggestions with smarter recommendations
  const generateSuggestions = async () => {
    const description = transactionType === 'goods' 
      ? formData.productName || formData.specifications
      : formData.serviceDescription;
    
    if (!description || description.trim().length < 10) {
      alert('Please write at least 10 characters of description first');
      return;
    }

    setLoadingSuggestions(true);
    try {
      const detection = await detectIndustry(description);
      
      // Generate specific field suggestions based on industry
      const suggestions = generateFieldSuggestions(detection.industry, description);
      
      setAiSuggestions({
        ...detection,
        ...suggestions
      });
      setShowSuggestions(true);
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Generate smart suggestions based on industry and description
  const generateFieldSuggestions = (industry: string, description: string) => {
    if (transactionType === 'goods') {
      return {
        warrantyTip: getWarrantyTip(industry),
        returnPolicyTip: getReturnPolicyTip(industry),
        inspectionChecklist: getInspectionChecklist(industry, description),
        autoFillSuggestion: getAutoFillForGoods(industry)
      };
    } else {
      // Services
      return {
        policyPoints: getServicePolicyPoints(industry, description),
        revisionTip: getRevisionTip(industry),
        deliverablesTip: getDeliverablesTip(industry),
        autoFillSuggestion: getAutoFillForServices(industry)
      };
    }
  };

  const getWarrantyTip = (industry: string): { title: string; value: string; reason: string } => {
    const tips: Record<string, any> = {
      'physical_products': { 
        title: 'Manufacturing Warranty', 
        value: '6-months', 
        reason: 'Covers manufacturing defects for 6 months' 
      },
      'custom_made_order': { 
        title: 'No Warranty (Made-to-Order)', 
        value: 'none', 
        reason: 'Custom items cannot be returned, so no warranty' 
      },
      'home_services': { 
        title: 'Workmanship Guarantee', 
        value: '3-months', 
        reason: 'Work guaranteed for 3 months if issues arise' 
      }
    };
    return tips[industry] || { title: 'Standard Warranty', value: '3-months', reason: 'Basic manufacturing warranty' };
  };

  const getReturnPolicyTip = (industry: string): { title: string; value: string; reason: string } => {
    const tips: Record<string, any> = {
      'physical_products': { 
        title: '7-Day Return Window', 
        value: '7_days', 
        reason: 'Industry standard - allows buyer to inspect & test' 
      },
      'custom_made_order': { 
        title: 'No Returns (Custom Made)', 
        value: 'no_return', 
        reason: 'Custom items are non-returnable once made' 
      },
      'digital_goods': { 
        title: 'No Returns (Download = Purchase)', 
        value: 'no_return', 
        reason: 'Once downloaded, no refunds possible' 
      },
      'services': { 
        title: '7 Days Before Work Starts', 
        value: '7_days', 
        reason: 'Can cancel before work begins, no refund after' 
      }
    };
    return tips[industry] || { title: '7-Day Returns', value: '7_days', reason: 'Standard return policy' };
  };

  const getInspectionChecklist = (industry: string, description: string): string[] => {
    if (description.toLowerCase().includes('phone') || description.toLowerCase().includes('mobile')) {
      return [
        '✓ Check phone powers on and all buttons work',
        '✓ Verify IMEI number matches invoice',
        '✓ Check screen for dead pixels',
        '✓ Test speaker, mic, and camera',
        '✓ Verify battery health and charging'
      ];
    } else if (description.toLowerCase().includes('laptop') || description.toLowerCase().includes('computer')) {
      return [
        '✓ Check laptop powers on correctly',
        '✓ Test keyboard and trackpad',
        '✓ Run system diagnostics',
        '✓ Verify RAM and storage as claimed',
        '✓ Check battery health'
      ];
    } else if (description.toLowerCase().includes('clothes') || description.toLowerCase().includes('shirt')) {
      return [
        '✓ Check size and fit as advertised',
        '✓ Inspect for stains, tears, or damage',
        '✓ Verify color matches photos',
        '✓ Check all zippers, buttons work',
        '✓ Smell check (no odors)'
      ];
    }
    return [
      '✓ Check condition matches description',
      '✓ Verify all items included',
      '✓ Take photos for record',
      '✓ Test functionality',
      '✓ Document any defects'
    ];
  };

  const getAutoFillForGoods = (industry: string) => {
    return {
      recommendedReturn: industry === 'physical_products' ? '7_days' : 'no_return',
      recommendedWarranty: industry === 'physical_products' ? '6-months' : 'none'
    };
  };

  const getServicePolicyPoints = (industry: string, description: string): { title: string; points: string[] } => {
    if (description.toLowerCase().includes('website') || description.toLowerCase().includes('development') || description.toLowerCase().includes('app')) {
      return {
        title: 'Web/App Development Policy',
        points: [
          '🔄 Number of revision rounds: 3 rounds included',
          '⏰ Response time: 24-48 hours for feedback',
          '📊 Milestone-based payment: Design phase → Dev phase → Testing',
          '🚀 Hosting: Buyer to arrange or buyer pays extra',
          '🐛 Bug fixes: Free for 30 days after launch'
        ]
      };
    } else if (description.toLowerCase().includes('design') || description.toLowerCase().includes('ui') || description.toLowerCase().includes('ux')) {
      return {
        title: 'Design Project Policy',
        points: [
          '🎨 Design concepts: 2-3 concepts provided',
          '🔄 Revision rounds: 2 rounds included, extra at 50% rate',
          '📁 Files provided: Figma, PSD, PNG, SVG formats',
          '📜 Ownership: Files ownership with client after payment',
          '💼 Commercial use: Rights included in price'
        ]
      };
    } else if (description.toLowerCase().includes('writing') || description.toLowerCase().includes('content') || description.toLowerCase().includes('article')) {
      return {
        title: 'Content Writing Policy',
        points: [
          '📄 Word count: 1000 words per day capacity',
          '🔍 Research: Included, will cite sources',
          '🔄 Revision rounds: 2 rounds of edits',
          '🔒 Plagiarism check: Will provide plagiarism report',
          '📈 SEO optimization: Keyword research included'
        ]
      };
    } else if (description.toLowerCase().includes('teach') || description.toLowerCase().includes('tutor') || description.toLowerCase().includes('class')) {
      return {
        title: 'Tutoring/Classes Policy',
        points: [
          '⏱️ Session duration: 60 minutes per session standard',
          '📅 Frequency: Flexible scheduling available',
          '📚 Study materials: Will provide notes and resources',
          '❓ Doubt support: Available via chat between sessions',
          '✅ Progress tracking: Monthly assessment reports'
        ]
      };
    } else if (description.toLowerCase().includes('logo') || description.toLowerCase().includes('branding')) {
      return {
        title: 'Logo/Branding Policy',
        points: [
          '🎨 Logo concepts: 3-5 logo variations',
          '🔄 Revision rounds: 3 rounds of modifications',
          '📁 Deliverables: Vector files (EPS, AI, SVG)',
          '🎨 Color variants: Black & white + color versions',
          '💼 Commercial license: Full usage rights included'
        ]
      };
    }
    return {
      title: 'Service Policy',
      points: [
        '✓ Scope: Clearly define what\'s included',
        '✓ Timeline: Specific delivery/completion date',
        '✓ Revisions: Number of revision rounds',
        '✓ Support: Post-delivery support period',
        '✓ Refund: Only if work not started'
      ]
    };
  };

  const getRevisionTip = (industry: string): { title: string; value: string } => {
    const tips: Record<string, any> = {
      'services': { title: '2-3 Revision Rounds', value: '2-3 included, extra at 50% cost' },
      'custom_made_order': { title: '1 Revision Before Production', value: 'Changes free before production starts, costly after' }
    };
    return tips[industry] || { title: '2 Revision Rounds', value: '2 revisions standard' };
  };

  const getDeliverablesTip = (industry: string): { title: string; value: string } => {
    const tips: Record<string, any> = {
      'services': { title: 'Specify Exact Deliverables', value: 'List all files, documents, or work to be delivered' },
      'custom_made_order': { title: 'Physical Item Details', value: 'Dimensions, materials, colors, and exact specifications' }
    };
    return tips[industry] || { title: 'Clear Deliverables List', value: 'Exactly what will be handed over' };
  };

  const getAutoFillForServices = (industry: string) => {
    return {
      suggestedPolicy: 'See policy points above',
      suggestedDeliverables: 'Specify files, work output, or items to be delivered'
    };
  };

  if (transactionType === 'goods') {
    return (
      <div className="space-y-6">
        {/* AI SUGGESTIONS PANEL - BEAUTIFUL DESIGN */}
        {showSuggestions && aiSuggestions && (
          <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-5 space-y-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-blue-200 pb-4">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-lg">🎯 Smart Suggestions</h4>
                <p className="text-sm text-blue-700">
                  Detected: <span className="font-bold text-indigo-700">{aiSuggestions.industry?.replace(/_/g, ' ').toUpperCase()}</span> 
                  {aiSuggestions.confidence_score && <span className="ml-2 px-2 py-1 bg-green-200 text-green-800 rounded text-xs font-semibold">{(aiSuggestions.confidence_score * 100).toFixed(0)}% confident</span>}
                </p>
              </div>
            </div>

            {/* WARRANTY SUGGESTION */}
            {aiSuggestions.warrantyTip && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-amber-400">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700">🛡️ {aiSuggestions.warrantyTip.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{aiSuggestions.warrantyTip.reason}</p>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, warranty: aiSuggestions.warrantyTip.value }))}
                    className="ml-3 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded text-xs font-semibold"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {/* RETURN POLICY SUGGESTION */}
            {aiSuggestions.returnPolicyTip && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-400">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700">↩️ {aiSuggestions.returnPolicyTip.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{aiSuggestions.returnPolicyTip.reason}</p>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, returnPolicy: aiSuggestions.returnPolicyTip.value }))}
                    className="ml-3 px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded text-xs font-semibold"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {/* INSPECTION CHECKLIST */}
            {aiSuggestions.inspectionChecklist && aiSuggestions.inspectionChecklist.length > 0 && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
                <p className="text-sm font-bold text-gray-700 mb-3">📋 Buyer Inspection Checklist:</p>
                <ul className="space-y-2">
                  {aiSuggestions.inspectionChecklist.map((item: string, idx: number) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-blue-600 text-center mt-3">💡 Click "Apply" to auto-fill recommendations</p>
          </div>
        )}

        {/* PRODUCT INFORMATION SECTION */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500">
          <h3 className="font-bold text-blue-900 mb-2">📦 Product Information</h3>
          <p className="text-xs text-blue-700">Basic details about what you're selling</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Product Name/Title *</label>
          <input
            type="text"
            value={formData.productName || ''}
            onChange={(e) => handleChange('productName', e.target.value)}
            placeholder="e.g., iPhone 13 Pro, Vintage Leather Sofa, Brand New Laptop"
            className="bharose-input"
          />
          <p className="text-xs text-gray-500 mt-1">Be specific! Include brand, model, and key details</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Detailed Specifications *</label>
          <textarea
            value={formData.specifications || ''}
            onChange={(e) => handleChange('specifications', e.target.value)}
            placeholder="Color, size, condition, features, materials, manufacturing year, etc. The more details, the less disputes!"
            className="bharose-input min-h-[100px]"
          />
          <p className="text-xs text-gray-500 mt-1">This helps AI suggest the right warranty & return policy</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Quantity</label>
            <input
              type="number"
              value={formData.quantity || ''}
              onChange={(e) => handleChange('quantity', e.target.value)}
              placeholder="1"
              min="1"
              className="bharose-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Price (₹) *</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="number"
                value={formData.price || ''}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="5000"
                min="1"
                className="bharose-input pl-10"
              />
            </div>
          </div>
        </div>

        {/* DELIVERY & CONDITION SECTION */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500">
          <h3 className="font-bold text-green-900 mb-2">🚚 Delivery & Condition</h3>
          <p className="text-xs text-green-700">When and how you'll deliver</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <Calendar className="inline h-4 w-4 mr-1" />
            Delivery Date *
          </label>
          <input
            type="date"
            value={formData.deliveryDate || ''}
            onChange={(e) => handleChange('deliveryDate', e.target.value)}
            className="bharose-input"
          />
          <p className="text-xs text-gray-500 mt-1">When will the buyer receive the item?</p>
        </div>

        {/* PROTECTION & POLICIES SECTION */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border-l-4 border-purple-500">
          <h3 className="font-bold text-purple-900 mb-2">🛡️ Protection & Policies</h3>
          <p className="text-xs text-purple-700">Warranty and return terms</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Return/Exchange Policy *</label>
          <select
            value={formData.returnPolicy || ''}
            onChange={(e) => handleChange('returnPolicy', e.target.value)}
            className="bharose-input"
          >
            <option value="">-- Select return policy --</option>
            <option value="no-return">❌ No Return/Exchange (Final Sale)</option>
            <option value="7-days">↩️ 7 Days Return/Exchange</option>
            <option value="15-days">↩️ 15 Days Return/Exchange</option>
            <option value="30-days">↩️ 30 Days Return/Exchange</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            ⚠️ Stricter policy = less disputes but fewer buyers. More generous = more buyer confidence
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Warranty Period</label>
          <select
            value={formData.warranty || ''}
            onChange={(e) => handleChange('warranty', e.target.value)}
            className="bharose-input"
          >
            <option value="none">❌ No Warranty</option>
            <option value="3-months">3 Months Warranty</option>
            <option value="6-months">6 Months Warranty</option>
            <option value="1-year">1 Year Warranty</option>
            <option value="2-years">2 Years Warranty</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Covers manufacturing defects if they appear after delivery</p>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={generateSuggestions}
          disabled={loadingSuggestions}
          className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loadingSuggestions ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing your product...
            </>
          ) : (
            <>
              <Lightbulb className="h-4 w-4" />
              Get AI Suggestions
            </>
          )}
        </button>
      </div>
    );
  }

  if (transactionType === 'services') {
    return (
      <div className="space-y-6">
        {/* AI SUGGESTIONS PANEL - BEAUTIFUL DESIGN */}
        {showSuggestions && aiSuggestions && (
          <div className="bg-gradient-to-br from-green-50 via-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 space-y-4 shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-green-200 pb-4">
              <div className="bg-green-500 text-white p-2 rounded-lg">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-green-900 text-lg">🎯 Smart Suggestions</h4>
                <p className="text-sm text-green-700">
                  Detected: <span className="font-bold text-emerald-700">{aiSuggestions.industry?.replace(/_/g, ' ').toUpperCase()}</span>
                  {aiSuggestions.confidence_score && <span className="ml-2 px-2 py-1 bg-green-200 text-green-800 rounded text-xs font-semibold">{(aiSuggestions.confidence_score * 100).toFixed(0)}% confident</span>}
                </p>
              </div>
            </div>

            {/* SERVICE POLICY POINTS */}
            {aiSuggestions.policyPoints && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-400">
                <p className="text-sm font-bold text-gray-700 mb-3">📋 {aiSuggestions.policyPoints.title}</p>
                <ul className="space-y-2">
                  {aiSuggestions.policyPoints.points.map((point: string, idx: number) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* REVISION TIP */}
            {aiSuggestions.revisionTip && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700">🔄 {aiSuggestions.revisionTip.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{aiSuggestions.revisionTip.value}</p>
                  </div>
                </div>
              </div>
            )}

            {/* DELIVERABLES TIP */}
            {aiSuggestions.deliverablesTip && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-purple-400">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700">📦 {aiSuggestions.deliverablesTip.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{aiSuggestions.deliverablesTip.value}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3">
              <p className="text-xs text-green-800">
                <strong>💡 Tip:</strong> Use these suggestions as a guide when filling in Service Policy and Deliverables fields above.
              </p>
            </div>
          </div>
        )}

        {/* SERVICE OVERVIEW SECTION */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-l-4 border-green-500">
          <h3 className="font-bold text-green-900 mb-2">💼 Service Overview</h3>
          <p className="text-xs text-green-700">What service you're offering</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Service Title *</label>
          <input
            type="text"
            value={formData.serviceTitle || formData.serviceDescription?.split('\n')[0] || ''}
            onChange={(e) => handleChange('serviceTitle', e.target.value)}
            placeholder="e.g., React Website Development, Logo Design, Content Writing"
            className="bharose-input"
          />
          <p className="text-xs text-gray-500 mt-1">Make it catchy and clear!</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Service Description *</label>
          <textarea
            value={formData.serviceDescription || ''}
            onChange={(e) => handleChange('serviceDescription', e.target.value)}
            placeholder="Describe exactly what you'll do. Example: I will design 3 modern logo concepts, provide 2 rounds of revisions, and deliver in PNG, SVG, and AI formats."
            className="bharose-input min-h-[120px]"
          />
          <p className="text-xs text-gray-500 mt-1">Be specific! This helps AI suggest the right terms</p>
        </div>

        {/* PRICING & TIMELINE SECTION */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500">
          <h3 className="font-bold text-blue-900 mb-2">💰 Pricing & Timeline</h3>
          <p className="text-xs text-blue-700">How much and how long</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Price (₹) *</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="number"
              value={formData.price || ''}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="5000"
              min="1"
              className="bharose-input pl-10"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">The total price for this service</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <Calendar className="inline h-4 w-4 mr-1" />
            Completion Date *
          </label>
          <input
            type="date"
            value={formData.completionDate || ''}
            onChange={(e) => handleChange('completionDate', e.target.value)}
            className="bharose-input"
          />
          <p className="text-xs text-gray-500 mt-1">When will you finish and deliver?</p>
        </div>

        {/* SERVICE DETAILS SECTION */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border-l-4 border-purple-500">
          <h3 className="font-bold text-purple-900 mb-2">📋 Service Details</h3>
          <p className="text-xs text-purple-700">Important terms and conditions</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            <MapPin className="inline h-4 w-4 mr-1" />
            Service Location
          </label>
          <select
            value={formData.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="bharose-input"
          >
            <option value="">-- Select location --</option>
            <option value="remote">🌐 Remote/Online (Work from anywhere)</option>
            <option value="client-location">📍 At Client's Location (Visit their place)</option>
            <option value="provider-location">🏢 At My Location (They visit you)</option>
            <option value="custom">📌 Custom/Specific Location</option>
          </select>
        </div>

        {formData.location === 'custom' && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Specify Location</label>
            <input
              type="text"
              value={formData.customLocation || ''}
              onChange={(e) => handleChange('customLocation', e.target.value)}
              placeholder="e.g., Delhi NCR area, Online only, etc."
              className="bharose-input"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Service Policy *</label>
          <textarea
            value={formData.servicePolicy || ''}
            onChange={(e) => handleChange('servicePolicy', e.target.value)}
            placeholder="Include: Number of revisions, refund conditions, payment terms, support period, etc. Example: 2 revisions included, no refund after work starts, 30-day support included"
            className="bharose-input min-h-[100px]"
          />
          <p className="text-xs text-gray-500 mt-1">This protects both you and the buyer!</p>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Deliverables *</label>
          <textarea
            value={formData.deliverables || ''}
            onChange={(e) => handleChange('deliverables', e.target.value)}
            placeholder="What exactly will you deliver? Example: 3 logo concepts in PNG, SVG, and Figma formats; 2 revision rounds; high-resolution files (300 DPI); commercial usage rights"
            className="bharose-input min-h-[100px]"
          />
          <p className="text-xs text-gray-500 mt-1">Be very clear - this prevents disputes!</p>
        </div>

        {/* ACTION BUTTON */}
        <button
          onClick={generateSuggestions}
          disabled={loadingSuggestions}
          className="w-full mt-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loadingSuggestions ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing your service...
            </>
          ) : (
            <>
              <Lightbulb className="h-4 w-4" />
              Get AI Suggestions
            </>
          )}
        </button>
      </div>
    );
  }

  return null;
};

export default TransactionDetails;
