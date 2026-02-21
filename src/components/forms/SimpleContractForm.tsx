/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SIMPLE CONTRACT FORM COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Quick contract generation with minimal fields
 * No form submission required
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import { 
  SimpleContractData, 
  SimpleContractParty,
  generateSimpleContractHTML,
  generateSimpleContractText,
  saveSimpleContract
} from '../../services/simpleContractService';

// ═══════════════════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  color: 'white',
  padding: theme.spacing(4, 3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  boxShadow: theme.shadows[4],
}));

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface SimpleContractFormProps {
  category: 'goods' | 'services';
  onBack: () => void;
}

export const SimpleContractForm: React.FC<SimpleContractFormProps> = ({ category, onBack }) => {
  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState<SimpleContractData>({
    contractType: category,
    industryId: '',
    title: '',
    description: '',
    seller: { name: '', email: '', phone: '', address: '' },
    buyer: { name: '', email: '', phone: '', address: '' },
    price: 0,
    currency: 'INR',
    paymentTerms: '',
    deliveryDate: '',
    conditions: '',
    warranty: '',
    additionalTerms: '',
  });

  const [contractHTML, setContractHTML] = useState('');

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePartyChange = (party: 'seller' | 'buyer', field: keyof SimpleContractParty, value: string) => {
    setFormData(prev => ({
      ...prev,
      [party]: { ...prev[party], [field]: value }
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setSnackbarMessage('Product/Service name is required');
      setShowSnackbar(true);
      return false;
    }
    if (!formData.description.trim()) {
      setSnackbarMessage('Description is required');
      setShowSnackbar(true);
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setSnackbarMessage('Valid price is required');
      setShowSnackbar(true);
      return false;
    }
    if (!formData.paymentTerms.trim()) {
      setSnackbarMessage('Payment terms are required');
      setShowSnackbar(true);
      return false;
    }
    return true;
  };

  const handleGeneratePreview = () => {
    if (!validateForm()) return;
    
    const html = generateSimpleContractHTML(formData);
    setContractHTML(html);
    setStep('preview');
  };

  const handleDownloadContract = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(contractHTML));
    element.setAttribute('download', `${category}-contract-${Date.now()}.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setSnackbarMessage('Contract downloaded successfully!');
    setShowSnackbar(true);
  };

  const handlePrintContract = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(contractHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleSaveContract = async () => {
    setLoading(true);
    try {
      const text = generateSimpleContractText(formData);
      const result = await saveSimpleContract(formData, contractHTML, text);
      
      if (result) {
        setSnackbarMessage('Contract saved successfully!');
        setShowSnackbar(true);
      } else {
        setSnackbarMessage('Failed to save contract');
        setShowSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage('Error saving contract');
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'preview') {
    return (
      <Container maxWidth="lg">
        <Button startIcon={<span>←</span>} onClick={() => setStep('form')} sx={{ mb: 2 }}>
          Back to Form
        </Button>

          <Card sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
            📋 Contract Preview
          </Typography>

          <Box sx={{
            border: `2px solid #667eea`,
            borderRadius: 2,
            padding: 2,
            backgroundColor: '#f9fafb',
            maxHeight: '500px',
            overflowY: 'auto',
            marginTop: 2,
          }}>
            <div dangerouslySetInnerHTML={{ __html: contractHTML }} />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={handleDownloadContract}
            >
              Download
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={handlePrintContract}
            >
              Print
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveContract}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : 'Save Contract'}
            </Button>
          </Box>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Button startIcon={<span>←</span>} onClick={onBack} sx={{ mb: 2 }}>
        Back to Category
      </Button>

      <HeroSection>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          ⚡ Quick {category === 'goods' ? 'Goods' : 'Services'} Contract
        </Typography>
        <Typography variant="body1">
          Create a simple contract in minutes without a lengthy form
        </Typography>
      </HeroSection>

      <Card sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
            Fill in the essential details below to generate your contract
          </Typography>
        </Box>

        {/* Product/Service Name */}
        <TextField
          fullWidth
          label={category === 'goods' ? 'Product Name' : 'Service Name'}
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          margin="normal"
          size="small"
          placeholder={category === 'goods' ? 'e.g., iPhone 14 Pro Max' : 'e.g., Web Design Service'}
        />

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          margin="normal"
          multiline
          rows={3}
          size="small"
          placeholder={category === 'goods' ? 'Describe the product in detail' : 'Describe the service in detail'}
        />

        {/* Condition/Scope */}
        <TextField
          fullWidth
          label={category === 'goods' ? 'Condition' : 'Scope of Work'}
          value={formData.conditions}
          onChange={(e) => handleInputChange('conditions', e.target.value)}
          margin="normal"
          multiline
          rows={2}
          size="small"
          placeholder={category === 'goods' ? 'e.g., New, Used, Refurbished' : 'e.g., What will be delivered'}
        />

        {/* Price */}
        <TextField
          fullWidth
          label="Price (₹)"
          type="number"
          value={formData.price}
          onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
          margin="normal"
          size="small"
          placeholder="Enter amount in INR"
        />

        {/* Payment Terms */}
        <TextField
          fullWidth
          label="Payment Terms"
          value={formData.paymentTerms}
          onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
          margin="normal"
          multiline
          rows={2}
          size="small"
          placeholder="e.g., Full payment upfront, 50% on order, 50% on delivery"
        />

        {/* Delivery/Completion Date */}
        <TextField
          fullWidth
          label={category === 'goods' ? 'Delivery Date' : 'Completion Date'}
          type="date"
          value={formData.deliveryDate}
          onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          size="small"
        />

        {/* Delivery/Service Address */}
        <TextField
          fullWidth
          label="Delivery/Service Address"
          value={formData.seller.address}
          onChange={(e) => handlePartyChange('seller', 'address', e.target.value)}
          margin="normal"
          multiline
          rows={3}
          size="small"
          placeholder="Enter complete address with street, city, state, and postal code"
        />

        {/* Warranty/Guarantees */}
        <TextField
          fullWidth
          label={category === 'goods' ? 'Warranty Details' : 'Guarantees'}
          value={formData.warranty}
          onChange={(e) => handleInputChange('warranty', e.target.value)}
          margin="normal"
          multiline
          rows={2}
          size="small"
          placeholder={category === 'goods' ? 'e.g., 1 year manufacturer warranty' : 'e.g., 30-day money back guarantee'}
        />

        {/* Additional Terms */}
        <TextField
          fullWidth
          label="Additional Terms (Optional)"
          value={formData.additionalTerms}
          onChange={(e) => handleInputChange('additionalTerms', e.target.value)}
          margin="normal"
          multiline
          rows={2}
          size="small"
          placeholder="Add any custom terms or conditions"
        />
      </Card>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4, mb: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleGeneratePreview}
          sx={{ fontWeight: 'bold', px: 4 }}
        >
          Generate Contract
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={onBack}
          sx={{ fontWeight: 'bold', px: 4 }}
        >
          Cancel
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default SimpleContractForm;
