import React, { useState } from 'react';
import { getContractTemplate, generateContractHTML } from '../services/industryContractTemplates';
import { IndustryType } from '../services/industryDetectionService';

const TestContractGeneration: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('physical_products');
  const [contractHTML, setContractHTML] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const industries = [
    { id: 'physical_products' as IndustryType, name: '📦 Physical Products', desc: 'Electronics, clothing, furniture' },
    { id: 'services' as IndustryType, name: '🔧 Services', desc: 'Repair, tutoring, freelance' },
    { id: 'digital_goods' as IndustryType, name: '💻 Digital Goods', desc: 'Ebooks, templates, software' },
    { id: 'custom_made_order' as IndustryType, name: '🎨 Custom Orders', desc: 'Tailoring, art, printing' },
    { id: 'logistics' as IndustryType, name: '📮 Logistics', desc: 'Courier, shipping, delivery' },
    { id: 'home_services' as IndustryType, name: '🏠 Home Services', desc: 'Electrician, cleaning, plumber' },
  ];

  const handleGenerateContract = async () => {
    try {
      const template = getContractTemplate(selectedIndustry);
      const mockData = {
        buyerName: 'Test Buyer',
        sellerName: 'Test Seller',
        itemDescription: 'Test Item',
        amount: 50000,
        date: new Date().toLocaleDateString('en-IN'),
      };
      
      const html = generateContractHTML(selectedIndustry, mockData);
      setContractHTML(html);
      setShowPreview(true);
    } catch (error) {
      console.error('Contract generation error:', error);
      alert('Error generating contract: ' + String(error));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📄 Contract Generation Test
          </h1>
          <p className="text-gray-600">
            Generate industry-specific legal contracts with mandatory clauses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Industry Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Industry</h2>
              
              <div className="space-y-3">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedIndustry(ind.id)}
                    className={`w-full p-4 rounded-lg text-left transition ${
                      selectedIndustry === ind.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <p className="font-bold">{ind.name}</p>
                    <p className="text-sm opacity-75">{ind.desc}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={handleGenerateContract}
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition"
              >
                Generate Contract
              </button>
            </div>
          </div>

          {/* Right Panel - Contract Preview */}
          <div className="lg:col-span-2">
            {showPreview && contractHTML ? (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Contract Preview</h2>
                  <button
                    onClick={() => {
                      const element = document.createElement('a');
                      element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(contractHTML));
                      element.setAttribute('download', `contract-${selectedIndustry}.html`);
                      element.style.display = 'none';
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                  >
                    📥 Download
                  </button>
                </div>

                <div 
                  className="border-2 border-gray-200 rounded-lg p-6 bg-gray-50 max-h-96 overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: contractHTML }}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-xl text-gray-600 font-semibold">
                  Select an industry and click "Generate Contract" to preview
                </p>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 bg-purple-50 border-l-4 border-purple-600 p-6 rounded">
              <h3 className="font-bold text-purple-900 mb-2">ℹ️ Features</h3>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>✓ 6 industry-specific templates</li>
                <li>✓ 15+ Indian acts compliance</li>
                <li>✓ Mandatory clauses per industry</li>
                <li>✓ Return/warranty policies</li>
                <li>✓ Evidence requirements matrix</li>
                <li>✓ Escrow conditions included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestContractGeneration;
