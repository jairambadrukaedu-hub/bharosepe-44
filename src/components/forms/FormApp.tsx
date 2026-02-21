/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * MULTI-STEP FORM FLOW: User Type → Category → Industry → Form
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Step 1: Select User Type (Seller/Buyer)
 * Step 2: Select Category (Goods/Services)
 * Step 3: Select Industry
 * Step 4: Fill Form
 */

import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Chip,
  Stack,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IndustryFormBuilder } from './IndustryFormBuilder';
import { getAllFormCategories, getFormByCategory } from '../services/formConfigurations';

// ═══════════════════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

const OptionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(8, 3),
  marginBottom: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  display: 'flex',
  justifyContent: 'center',
}));

const StepIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.primary.main}`,
}));

const StepBadge = styled(Box)(({ theme, isActive }: { isActive?: boolean }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.grey[300],
  color: isActive ? 'white' : theme.palette.text.primary,
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// ═══════════════════════════════════════════════════════════════════════════════
// INDUSTRY SELECTOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface IndustrySelectorProps {
  onSelectIndustry: (industryId: string) => void;
}

export const IndustrySelector: React.FC<IndustrySelectorProps> = ({ onSelectIndustry }) => {
  const [searchText, setSearchText] = useState('');
  const categories = getAllFormCategories();

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchText.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          📋 Create Your Transaction Form
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto' }}>
          Select your industry to fill out a customized form for your dispute resolution contract
        </Typography>
      </HeroSection>

      {/* Search Bar */}
      <SearchContainer>
        <TextField
          placeholder="Search industries..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            width: '100%',
            maxWidth: 400,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
        />
      </SearchContainer>

      {/* Industry Grid */}
      <Grid container spacing={3}>
        {filteredCategories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <IndustryCard onClick={() => onSelectIndustry(category.id)}>
              <CardActionArea sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ fontSize: '3rem', mb: 1 }}>{category.icon}</Box>
                  <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </IndustryCard>
          </Grid>
        ))}
      </Grid>

      {filteredCategories.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="textSecondary">
            No industries found matching "{searchText}"
          </Typography>
        </Box>
      )}
    </Container>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// FORM PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface FormPageProps {
  industryId: string;
  onBack: () => void;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onSaveDraft?: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

export const FormPage: React.FC<FormPageProps> = ({
  industryId,
  onBack,
  onSubmit,
  onSaveDraft,
  isLoading = false,
}) => {
  const config = getFormByCategory(industryId);

  if (!config) {
    return (
      <Container>
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Industry configuration not found
          </Typography>
          <Button onClick={onBack} sx={{ mt: 2 }}>
            ← Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      {/* Back Button */}
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Button onClick={onBack}>← Back to Industry Selection</Button>
      </Box>

      {/* Form */}
      <IndustryFormBuilder
        config={config}
        onSubmit={onSubmit}
        onSaveDraft={onSaveDraft}
        isLoading={isLoading}
      />
    </Box>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface FormAppProps {
  onSubmit?: (industryId: string, formData: Record<string, any>) => Promise<void>;
  onSaveDraft?: (industryId: string, formData: Record<string, any>) => Promise<void>;
}

export const FormApp: React.FC<FormAppProps> = ({
  onSubmit = async () => {},
  onSaveDraft = async () => {},
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: Record<string, any>) => {
    setIsLoading(true);
    try {
      if (selectedIndustry) {
        await onSubmit(selectedIndustry, formData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async (formData: Record<string, any>) => {
    if (selectedIndustry) {
      await onSaveDraft(selectedIndustry, formData);
    }
  };

  if (selectedIndustry) {
    return (
      <FormPage
        industryId={selectedIndustry}
        onBack={() => setSelectedIndustry(null)}
        onSubmit={handleSubmit}
        onSaveDraft={handleSaveDraft}
        isLoading={isLoading}
      />
    );
  }

  return <IndustrySelector onSelectIndustry={setSelectedIndustry} />;
};

export default FormApp;
