import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, FileText, Users, Settings, Download, Eye } from 'lucide-react';
import { ContractGenerationService, FormDataEntry, ContractParty } from '@/services/contractGenerationService';

const contractGenerationService = new ContractGenerationService();
import { toast } from 'sonner';

interface ContractGenerationDashboardProps {
  onClose?: () => void;
}

export const ContractGenerationDashboard: React.FC<ContractGenerationDashboardProps> = ({ onClose }) => {
  const [step, setStep] = useState<'select-form' | 'select-parties' | 'generate-contract' | 'view-contract'>('select-form');
  const [loading, setLoading] = useState(false);
  
  // Step 1: Form Data Selection
  const [savedForms, setSavedForms] = useState<FormDataEntry[]>([]);
  const [selectedFormData, setSelectedFormData] = useState<FormDataEntry | null>(null);
  const [industryFilter, setIndustryFilter] = useState<string>('');
  
  // Step 2: Party Selection
  const [availableContacts, setAvailableContacts] = useState<ContractParty[]>([]);
  const [buyer, setBuyer] = useState<ContractParty | null>(null);
  const [seller, setSeller] = useState<ContractParty | null>(null);
  const [customBuyer, setCustomBuyer] = useState({ name: '', email: '', phone: '', address: '' });
  const [customSeller, setCustomSeller] = useState({ name: '', email: '', phone: '', address: '' });
  const [useCustomBuyer, setUseCustomBuyer] = useState(false);
  const [useCustomSeller, setUseCustomSeller] = useState(false);
  
  // Step 3: Contract Generation
  const [contractTemplate, setContractTemplate] = useState<any>(null);
  const [generatedContract, setGeneratedContract] = useState<string>('');

  useEffect(() => {
    loadSavedForms();
    loadContacts();
  }, []);

  const loadSavedForms = async () => {
    try {
      setLoading(true);
      const forms = await contractGenerationService.getUserFormData(industryFilter || undefined);
      setSavedForms(forms);
    } catch (error) {
      console.error('Error loading saved forms:', error);
      toast.error('Failed to load saved forms');
    } finally {
      setLoading(false);
    }
  };

  const loadContacts = async () => {
    try {
      const contacts = await contractGenerationService.getUserContacts();
      setAvailableContacts(contacts);
    } catch (error) {
      console.error('Error loading contacts:', error);
      toast.error('Failed to load contacts');
    }
  };

  const handleFormSelection = (form: FormDataEntry) => {
    setSelectedFormData(form);
    setStep('select-parties');
  };

  const handleGenerateContract = async () => {
    if (!selectedFormData) return;

    try {
      setLoading(true);

      // Prepare buyer and seller data
      const buyerData: ContractParty = useCustomBuyer 
        ? {
            id: 'custom-buyer',
            full_name: customBuyer.name,
            email: customBuyer.email,
            phone: customBuyer.phone,
            address: customBuyer.address,
            role: 'buyer'
          }
        : buyer!;

      const sellerData: ContractParty = useCustomSeller
        ? {
            id: 'custom-seller', 
            full_name: customSeller.name,
            email: customSeller.email,
            phone: customSeller.phone,
            address: customSeller.address,
            role: 'seller'
          }
        : seller!;

      // Generate the contract
      const contract = await contractGenerationService.generateContract({
        formDataId: selectedFormData.id,
        buyer: buyerData,
        seller: sellerData
      });

      setGeneratedContract(contract);
      setStep('view-contract');
      toast.success('Contract generated successfully!');
    } catch (error: any) {
      console.error('Error generating contract:', error);
      toast.error(`Failed to generate contract: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const industries = Array.from(new Set(savedForms.map(form => form.industry)));

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contract Generation Dashboard</h1>
          <p className="text-gray-600 mt-1">Generate contracts from your saved form data</p>
        </div>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      {/* Progress Steps */}
      <div className="flex items-center space-x-4 mb-8">
        {[
          { key: 'select-form', title: 'Select Form Data', icon: FileText },
          { key: 'select-parties', title: 'Choose Parties', icon: Users },
          { key: 'generate-contract', title: 'Generate Contract', icon: Settings },
          { key: 'view-contract', title: 'View Contract', icon: Eye }
        ].map(({ key, title, icon: Icon }, index) => (
          <div key={key} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step === key ? 'bg-blue-600 text-white' : 
              ['select-parties', 'generate-contract', 'view-contract'].includes(step) && index < 
              ['select-form', 'select-parties', 'generate-contract', 'view-contract'].indexOf(step) 
                ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`ml-2 text-sm font-medium ${
              step === key ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {title}
            </span>
            {index < 3 && <div className="w-8 h-0.5 bg-gray-300 mx-4" />}
          </div>
        ))}
      </div>

      {/* Step 1: Select Form Data */}
      {step === 'select-form' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="industry-filter">Industry</Label>
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Industries</SelectItem>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>
                        {industry.charAt(0).toUpperCase() + industry.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={loadSavedForms} className="w-full">
                Apply Filters
              </Button>
            </CardContent>
          </Card>

          {/* Saved Forms List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Your Saved Form Data</CardTitle>
              <p className="text-sm text-gray-600">
                Select a form submission to generate a contract
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                  </div>
                ) : savedForms.length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No saved form data found</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Fill out some forms first to generate contracts
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedForms.map((form) => (
                      <div
                        key={form.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
                        onClick={() => handleFormSelection(form)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {form.product_name || 'Unnamed Product'}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {form.form_data.description || 'No description'}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="secondary">
                                {form.industry}
                              </Badge>
                              <Badge variant="outline">
                                Annexure {form.annexure_code}
                              </Badge>
                              {form.sale_price && (
                                <Badge variant="outline">
                                  ₹{form.sale_price}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              {new Date(form.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 2: Select Parties */}
      {step === 'select-parties' && selectedFormData && (
        <div className="space-y-6">
          {/* Selected Form Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Form Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{selectedFormData.product_name}</h3>
                  <p className="text-sm text-gray-600">{selectedFormData.industry} - Annexure {selectedFormData.annexure_code}</p>
                </div>
                <Button variant="outline" onClick={() => setStep('select-form')}>
                  Change Selection
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Party Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buyer Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Buyer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="custom-buyer"
                    checked={useCustomBuyer}
                    onChange={(e) => setUseCustomBuyer(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="custom-buyer">Enter custom buyer details</Label>
                </div>

                {useCustomBuyer ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="buyer-name">Full Name</Label>
                      <Input
                        id="buyer-name"
                        value={customBuyer.name}
                        onChange={(e) => setCustomBuyer(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter buyer's full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="buyer-email">Email</Label>
                      <Input
                        id="buyer-email"
                        type="email"
                        value={customBuyer.email}
                        onChange={(e) => setCustomBuyer(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="buyer@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="buyer-phone">Phone</Label>
                      <Input
                        id="buyer-phone"
                        value={customBuyer.phone}
                        onChange={(e) => setCustomBuyer(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="buyer-address">Address</Label>
                      <Textarea
                        id="buyer-address"
                        value={customBuyer.address}
                        onChange={(e) => setCustomBuyer(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Complete address"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="buyer-select">Select Buyer</Label>
                    <Select value={buyer?.id || ''} onValueChange={(value) => {
                      const contact = availableContacts.find(c => c.id === value);
                      setBuyer(contact || null);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose buyer from contacts" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableContacts.map((contact) => (
                          <SelectItem key={contact.id} value={contact.id}>
                            {contact.full_name} ({contact.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Seller Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="custom-seller"
                    checked={useCustomSeller}
                    onChange={(e) => setUseCustomSeller(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="custom-seller">Enter custom seller details</Label>
                </div>

                {useCustomSeller ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="seller-name">Full Name</Label>
                      <Input
                        id="seller-name"
                        value={customSeller.name}
                        onChange={(e) => setCustomSeller(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter seller's full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="seller-email">Email</Label>
                      <Input
                        id="seller-email"
                        type="email"
                        value={customSeller.email}
                        onChange={(e) => setCustomSeller(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="seller@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="seller-phone">Phone</Label>
                      <Input
                        id="seller-phone"
                        value={customSeller.phone}
                        onChange={(e) => setCustomSeller(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <Label htmlFor="seller-address">Address</Label>
                      <Textarea
                        id="seller-address"
                        value={customSeller.address}
                        onChange={(e) => setCustomSeller(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Complete address"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="seller-select">Select Seller</Label>
                    <Select value={seller?.id || ''} onValueChange={(value) => {
                      const contact = availableContacts.find(c => c.id === value);
                      setSeller(contact || null);
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose seller from contacts" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableContacts.map((contact) => (
                          <SelectItem key={contact.id} value={contact.id}>
                            {contact.full_name} ({contact.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep('select-form')}>
              Back
            </Button>
            <Button 
              onClick={() => setStep('generate-contract')}
              disabled={
                (!useCustomBuyer && !buyer) || 
                (!useCustomSeller && !seller) ||
                (useCustomBuyer && !customBuyer.name) ||
                (useCustomSeller && !customSeller.name)
              }
            >
              Continue to Generate Contract
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Generate Contract */}
      {step === 'generate-contract' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Generation</CardTitle>
              <p className="text-sm text-gray-600">
                Ready to generate contract for {selectedFormData?.product_name}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Buyer</h4>
                    <p className="text-sm text-gray-600">
                      {useCustomBuyer ? customBuyer.name : buyer?.full_name}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Seller</h4>
                    <p className="text-sm text-gray-600">
                      {useCustomSeller ? customSeller.name : seller?.full_name}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep('select-parties')}>
                    Back
                  </Button>
                  <Button onClick={handleGenerateContract} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Contract'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: View Generated Contract */}
      {step === 'view-contract' && generatedContract && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Contract</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" size="sm">
                  Send for Signature
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                  {generatedContract}
                </pre>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep('select-form')}>
              Generate Another Contract
            </Button>
            <Button onClick={() => toast.success('Contract workflow completed!')}>
              Complete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};