/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SIMPLE CONTRACT FORM COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Quick contract generation with minimal fields.
 * Auto-fills buyer/seller from the selected contact + logged-in user.
 * On confirm, calls onQuickContractSubmit which creates the DB transaction.
 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Divider,
  Collapse,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import {
  SimpleContractData,
  SimpleContractParty,
  generateSimpleContractHTML,
  generateSimpleContractText,
  saveSimpleContract,
} from '../../services/simpleContractService';

// ─── Styled ───────────────────────────────────────────────────────────────────

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  color: 'white',
  padding: theme.spacing(4, 3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  boxShadow: theme.shadows[4],
}));

const PartyCard = styled(Box)(({ theme }) => ({
  background: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

// ─── Types ────────────────────────────────────────────────────────────────────

interface SimpleContractFormProps {
  category: 'goods' | 'services';
  onBack: () => void;
  /** The contact the current user searched for */
  contactInfo?: { id: string; name: string; phone: string } | null;
  /** Supabase auth user object */
  currentUser?: any;
  /** 'Seller' | 'Buyer' from UserModeContext */
  userMode?: string;
  /** Called with final form data — parent creates tx + sends contract */
  onQuickContractSubmit?: (data: SimpleContractData) => Promise<void>;
  /** Called when user saves draft — parent creates tx + draft contract (no notification) */
  onSaveDraftQuickContract?: (data: SimpleContractData) => Promise<void>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const SimpleContractForm: React.FC<SimpleContractFormProps> = ({
  category,
  onBack,
  contactInfo,
  currentUser,
  userMode,
  onQuickContractSubmit,
  onSaveDraftQuickContract,
}) => {
  const isSeller = userMode !== 'Buyer';

  // Derive party info from context
  const currentUserParty: SimpleContractParty = {
    name:
      currentUser?.user_metadata?.full_name ||
      currentUser?.user_metadata?.name ||
      currentUser?.email ||
      '',
    phone:
      currentUser?.user_metadata?.phone ||
      currentUser?.phone ||
      '',
    email: currentUser?.email || '',
    address: '',
  };

  const contactParty: SimpleContractParty = {
    name: contactInfo?.name || '',
    phone: contactInfo?.phone || '',
    email: '',
    address: '',
  };

  const initialSeller = isSeller ? currentUserParty : contactParty;
  const initialBuyer = isSeller ? contactParty : currentUserParty;

  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [snackbar, setSnackbar] = useState('');

  const [formData, setFormData] = useState<SimpleContractData>({
    contractType: category,
    industryId: 'quick',
    title: '',
    description: '',
    seller: initialSeller,
    buyer: initialBuyer,
    price: 0,
    currency: 'INR',
    paymentTerms: '',
    deliveryDate: '',
    conditions: '',
    warranty: '',
    additionalTerms: '',
  });

  const [contractHTML, setContractHTML] = useState('');

  const set = (field: keyof SimpleContractData, value: any) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const setParty = (
    party: 'seller' | 'buyer',
    field: keyof SimpleContractParty,
    value: string,
  ) =>
    setFormData(prev => ({
      ...prev,
      [party]: { ...prev[party], [field]: value },
    }));

  const validate = () => {
    if (!formData.title.trim()) { setSnackbar('Product/Service name is required'); return false; }
    if (!formData.description.trim()) { setSnackbar('Description is required'); return false; }
    if (!formData.price || formData.price <= 0) { setSnackbar('Valid price is required'); return false; }
    if (!formData.paymentTerms.trim()) { setSnackbar('Payment terms are required'); return false; }
    return true;
  };

  const handleGenerate = () => {
    if (!validate()) return;
    setContractHTML(generateSimpleContractHTML(formData));
    setStep('preview');
  };

  const handleSendContract = async () => {
    setLoading(true);
    try {
      if (onQuickContractSubmit) {
        await onQuickContractSubmit(formData);
      } else {
        const text = generateSimpleContractText(formData);
        await saveSimpleContract(formData, contractHTML, text);
        setSnackbar('Contract sent!');
      }
    } catch (err: any) {
      setSnackbar(err?.message || 'Failed to send contract');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      if (onSaveDraftQuickContract) {
        await onSaveDraftQuickContract(formData);
      } else {
        const text = generateSimpleContractText(formData);
        await saveSimpleContract(formData, contractHTML, text);
        setSnackbar('Draft saved!');
      }
    } catch (err: any) {
      setSnackbar(err?.message || 'Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(contractHTML);
    a.download = `${category}-contract-${Date.now()}.html`;
    a.click();
    setSnackbar('Contract downloaded!');
  };

  const handlePrint = () => {
    const w = window.open('', '', 'height=600,width=800');
    if (w) { w.document.write(contractHTML); w.document.close(); w.print(); }
  };

  // ── Preview screen ──────────────────────────────────────────────────────────
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

          <Box
            sx={{
              border: '2px solid #10b981',
              borderRadius: 2,
              p: 2,
              backgroundColor: '#f9fafb',
              maxHeight: 500,
              overflowY: 'auto',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: contractHTML }} />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Primary actions */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={saving ? <CircularProgress size={18} /> : <SaveIcon />}
              onClick={handleSaveDraft}
              disabled={saving || loading}
              fullWidth
              sx={{ fontWeight: 'bold', py: 1.5 }}
            >
              {saving ? 'Saving…' : 'Save Draft'}
            </Button>

            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
              onClick={handleSendContract}
              disabled={loading || saving}
              fullWidth
              sx={{ fontWeight: 'bold', py: 1.5 }}
            >
              {loading ? 'Sending…' : 'Send Contract to Other Party'}
            </Button>
          </Box>

          {/* Tertiary actions */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="text"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={handleDownload}
            >
              Download
            </Button>
            <Button
              variant="text"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Box>
        </Card>

        <Snackbar
          open={!!snackbar}
          autoHideDuration={4000}
          onClose={() => setSnackbar('')}
          message={snackbar}
        />
      </Container>
    );
  }

  // ── Form screen ─────────────────────────────────────────────────────────────
  return (
    <Container maxWidth="sm">
      <Button startIcon={<span>←</span>} onClick={onBack} sx={{ mb: 2 }}>
        Back
      </Button>

      <HeroSection>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          ⚡ Quick {category === 'goods' ? 'Goods' : 'Services'} Contract
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Fill in a few details and get your contract in seconds
        </Typography>
      </HeroSection>

      {/* ── Parties (auto-filled, editable) ── */}
      <PartyCard>
        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#059669', display: 'block', mb: 1 }}>
          {isSeller ? '🧑‍💼 You (Seller)' : '🧑‍💼 You (Buyer)'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label="Name"
            size="small"
            fullWidth
            value={isSeller ? formData.seller.name : formData.buyer.name}
            onChange={e => setParty(isSeller ? 'seller' : 'buyer', 'name', e.target.value)}
          />
          <TextField
            label="Phone"
            size="small"
            fullWidth
            value={isSeller ? formData.seller.phone : formData.buyer.phone}
            onChange={e => setParty(isSeller ? 'seller' : 'buyer', 'phone', e.target.value)}
          />
        </Box>
      </PartyCard>

      <PartyCard>
        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#059669', display: 'block', mb: 1 }}>
          {isSeller ? '🛒 Buyer' : '🛒 Seller'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label="Name"
            size="small"
            fullWidth
            value={isSeller ? formData.buyer.name : formData.seller.name}
            onChange={e => setParty(isSeller ? 'buyer' : 'seller', 'name', e.target.value)}
          />
          <TextField
            label="Phone"
            size="small"
            fullWidth
            value={isSeller ? formData.buyer.phone : formData.seller.phone}
            onChange={e => setParty(isSeller ? 'buyer' : 'seller', 'phone', e.target.value)}
          />
        </Box>
      </PartyCard>

      {/* ── Core fields ── */}
      <Card sx={{ p: 3, mb: 2 }}>
        <TextField
          fullWidth
          label={category === 'goods' ? 'Product Name *' : 'Service Name *'}
          value={formData.title}
          onChange={e => set('title', e.target.value)}
          margin="dense"
          size="small"
          placeholder={category === 'goods' ? 'e.g., iPhone 14 Pro Max' : 'e.g., Website Redesign'}
        />

        <TextField
          fullWidth
          label="Description *"
          value={formData.description}
          onChange={e => set('description', e.target.value)}
          margin="dense"
          size="small"
          multiline
          rows={3}
          placeholder={category === 'goods' ? 'Describe the product in detail' : 'Describe what will be delivered'}
        />

        <TextField
          fullWidth
          label="Price (₹) *"
          type="number"
          value={formData.price || ''}
          onChange={e => set('price', parseFloat(e.target.value) || 0)}
          margin="dense"
          size="small"
          placeholder="Enter amount in INR"
        />

        <TextField
          fullWidth
          label="Payment Terms *"
          value={formData.paymentTerms}
          onChange={e => set('paymentTerms', e.target.value)}
          margin="dense"
          size="small"
          placeholder="e.g., Full payment upfront / 50% advance, 50% on delivery"
        />

        <TextField
          fullWidth
          label={category === 'goods' ? 'Delivery Date' : 'Completion Date'}
          type="date"
          value={formData.deliveryDate}
          onChange={e => set('deliveryDate', e.target.value)}
          margin="dense"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </Card>

      {/* ── Optional fields ── */}
      <Button
        onClick={() => setShowOptional(v => !v)}
        endIcon={<ExpandMoreIcon sx={{ transform: showOptional ? 'rotate(180deg)' : 'none' }} />}
        sx={{ mb: 1, color: '#059669', fontWeight: 'bold' }}
        size="small"
      >
        {showOptional ? 'Hide' : 'Add'} optional details
      </Button>

      <Collapse in={showOptional}>
        <Card sx={{ p: 3, mb: 2 }}>
          <TextField
            fullWidth
            label={category === 'goods' ? 'Condition' : 'Scope of Work'}
            value={formData.conditions}
            onChange={e => set('conditions', e.target.value)}
            margin="dense"
            size="small"
            placeholder={category === 'goods' ? 'e.g., New, Used, Refurbished' : 'e.g., What is included/excluded'}
          />
          <TextField
            fullWidth
            label={category === 'goods' ? 'Warranty' : 'Guarantees'}
            value={formData.warranty}
            onChange={e => set('warranty', e.target.value)}
            margin="dense"
            size="small"
            placeholder={category === 'goods' ? 'e.g., 1-year manufacturer warranty' : 'e.g., 30-day money-back'}
          />
          <TextField
            fullWidth
            label="Additional Terms"
            value={formData.additionalTerms}
            onChange={e => set('additionalTerms', e.target.value)}
            margin="dense"
            size="small"
            multiline
            rows={2}
            placeholder="Any custom terms or conditions"
          />
        </Card>
      </Collapse>

      {/* ── Action ── */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button
          fullWidth
          variant="contained"
          color="success"
          size="large"
          onClick={handleGenerate}
          sx={{ fontWeight: 'bold', py: 1.5 }}
        >
          Generate Contract →
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={onBack}
          sx={{ px: 3 }}
        >
          Cancel
        </Button>
      </Box>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar('')}
        message={snackbar}
      />
    </Container>
  );
};

export default SimpleContractForm;
