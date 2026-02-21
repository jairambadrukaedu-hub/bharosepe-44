/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * FORM FLOW: User Selected → Select Category (Goods/Services) → Select Industry → Fill Form
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This component integrates with the existing TransactionSetup flow
 * Step Flow:
 * 1. ✅ Select User (Seller/Buyer) - Already done in TransactionSetup
 * 2. ✅ Select Other User (Contact) - Already done in TransactionSetup  
 * 3. → Select Category (Goods/Services) - THIS COMPONENT
 * 4. → Select Industry - THIS COMPONENT
 * 5. → Fill Form - THIS COMPONENT
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
  Button,
  Stack,
  Breadcrumbs,
  Link as MuiLink,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IndustryFormBuilder } from './IndustryFormBuilder';
import { SimpleContractForm } from './SimpleContractForm';
import { getAllFormCategories, getFormByCategory, getGoodsForms, getServicesForms } from '../../services/formConfigurations';
import { 
  saveFormAsDraft, 
  submitFormAndGenerateContract,
  generateFormId,
  getUserDraftForms,
  getFormSubmissionData
} from '../../services/formDatabaseIntegration';
import { useAuth } from '@/hooks/use-auth';

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
  padding: theme.spacing(6, 3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
}));

const StepHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${theme.palette.primary.main}`,
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
}));

const IndustryGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

const CATEGORIES = [
  {
    id: 'goods',
    name: 'Goods',
    icon: '📦',
    description: 'Physical items like electronics, furniture, fashion, jewelry, etc.',
    color: '#667eea',
  },
  {
    id: 'services',
    name: 'Services',
    icon: '🛠️',
    description: 'Professional services like repairs, design, consulting, tutoring, etc.',
    color: '#764ba2',
  },
];

// Map categories to industries
const INDUSTRIES_BY_CATEGORY: Record<string, any[]> = {
  goods: [
    { id: 'appliances_electronics', name: 'Appliances & Electronics', icon: '📱', description: 'Home appliances, mobiles, laptops' },
    { id: 'mobile_phones_laptops', name: 'Mobile Phones & Laptops', icon: '💻', description: 'Phones, tablets, laptops, devices' },
    { id: 'furniture', name: 'Furniture & Home Decor', icon: '🛋️', description: 'Sofas, beds, tables, chairs' },
    { id: 'vehicles', name: 'Vehicles', icon: '🚗', description: 'Cars, bikes, scooters' },
    { id: 'fashion_apparel', name: 'Fashion & Apparel', icon: '👗', description: 'Clothing, shoes, accessories' },
    { id: 'jewellery', name: 'Jewellery', icon: '💎', description: 'Gold, silver, diamonds, precious stones' },
    { id: 'building_materials', name: 'Building Materials', icon: '🏗️', description: 'Construction materials, fixtures' },
    { id: 'collectibles', name: 'Collectibles & Luxury', icon: '🎨', description: 'Antiques, art, luxury items' },
    { id: 'industrial_machinery', name: 'Industrial Machinery', icon: '⚙️', description: 'Machines, equipment, tools' },
    { id: 'books_educational', name: 'Books & Educational', icon: '📚', description: 'Textbooks, study materials' },
    { id: 'art_handmade', name: 'Art & Handmade', icon: '🖼️', description: 'Art, crafts, handmade items' },
    { id: 'instagram_whatsapp', name: 'Instagram & WhatsApp', icon: '📲', description: 'Social media & digital services' },
  ],
  services: [
    { id: 'software_development', name: 'Software Development', icon: '💻', description: 'Web, mobile, custom software' },
    { id: 'ui_ux_design', name: 'UI/UX Design', icon: '🎨', description: 'Interface and user experience design' },
    { id: 'content_writing', name: 'Content Writing', icon: '✍️', description: 'Content creation and copywriting' },
    { id: 'photography_videography', name: 'Photography & Videography', icon: '📷', description: 'Photography, video production' },
    { id: 'coaching_training', name: 'Coaching & Training', icon: '📖', description: 'Online coaching and training' },
    { id: 'home_repair', name: 'Home Repair', icon: '🔧', description: 'Plumbing, electrical, carpentry' },
    { id: 'cleaning_housekeeping', name: 'Cleaning & Housekeeping', icon: '🧹', description: 'House and office cleaning' },
    { id: 'digital_marketing', name: 'Digital Marketing', icon: '📱', description: 'SEO, social media, digital ads' },
    { id: 'consulting', name: 'Consulting', icon: '💼', description: 'Business, tech, finance consulting' },
    { id: 'event_management', name: 'Event Management', icon: '🎉', description: 'Parties, weddings, events' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

interface CategorySelectorProps {
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory }) => {
  const { user } = useAuth();
  const [existingForms, setExistingForms] = useState<any[]>([]);
  const [loadingForms, setLoadingForms] = useState(false);

  React.useEffect(() => {
    if (user?.id) {
      fetchExistingForms();
    }
  }, [user?.id]);

  const fetchExistingForms = async () => {
    if (!user?.id) return;
    setLoadingForms(true);
    try {
      const drafts = await getUserDraftForms(user.id);
      
      // Fetch full form data for each draft
      const formsWithData = await Promise.all(
        drafts.map(async (draft) => {
          const formData = await getFormSubmissionData(draft.formId);
          return {
            ...draft,
            formData: formData || {}
          };
        })
      );
      
      setExistingForms(formsWithData);
    } catch (error) {
      console.error('Error fetching existing forms:', error);
    } finally {
      setLoadingForms(false);
    }
  };

  const handleResumeForm = (formId: string) => {
    console.log('Resume form:', formId);
    // TODO: Navigate to form with existing data
  };

  return (
    <Container maxWidth="md">
      {/* Quick Contract Section */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            padding: 4,
            borderRadius: 2,
            textAlign: 'center',
            mb: 3,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            ⚡ Need a Quick Contract?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
            Create a simple contract in minutes without filling a lengthy form
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="inherit"
              size="large"
              sx={{ fontWeight: 'bold', backgroundColor: 'white', color: '#059669', '&:hover': { backgroundColor: '#f0fdf4' } }}
              onClick={() => onSelectCategory('quick-goods')}
            >
              📦 Goods Contract
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="large"
              sx={{ fontWeight: 'bold', backgroundColor: 'white', color: '#059669', '&:hover': { backgroundColor: '#f0fdf4' } }}
              onClick={() => onSelectCategory('quick-services')}
            >
              🛠️ Services Contract
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Or Divider */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box sx={{ flex: 1, height: '2px', backgroundColor: '#e0e0e0' }} />
        <Typography variant="body2" sx={{ color: '#999', fontWeight: 'bold' }}>
          OR
        </Typography>
        <Box sx={{ flex: 1, height: '2px', backgroundColor: '#e0e0e0' }} />
      </Box>

      <HeroSection>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          📋 What are you selling or offering?
        </Typography>
        <Typography variant="body1">
          Select whether you have goods to sell or services to offer
        </Typography>
      </HeroSection>

      <Grid container spacing={4}>
        {CATEGORIES.map((category) => (
          <Grid item xs={12} sm={6} key={category.id}>
            <OptionCard onClick={() => onSelectCategory(category.id)}>
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                    {category.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {category.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </OptionCard>
          </Grid>
        ))}
      </Grid>

      {/* Existing Forms Section */}
      {existingForms.length > 0 && (
        <Box sx={{ mt: 6, pt: 4, borderTop: '2px solid #e0e0e0' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            📂 Your Existing Forms ({existingForms.length})
          </Typography>
          <Grid container spacing={2}>
            {existingForms.map((form) => (
              <Grid item xs={12} key={form.formId}>
                <Card
                  sx={{
                    p: 2.5,
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#fff',
                      boxShadow: 3,
                      borderColor: '#667eea',
                    },
                  }}
                  onClick={() => handleResumeForm(form.formId)}
                >
                  <Grid container spacing={2} alignItems="flex-start">
                    {/* Form Info */}
                    <Grid item xs={12} sm={4}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                          {form.industry}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Form ID: {form.formId}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                          Last saved: {new Date(form.savedAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Completion Progress */}
                    <Grid item xs={12} sm={3}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                          Completion: {form.completionPercentage}%
                        </Typography>
                        <Box
                          sx={{
                            width: '100%',
                            height: 8,
                            backgroundColor: '#e0e0e0',
                            borderRadius: 4,
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              height: '100%',
                              width: `${form.completionPercentage}%`,
                              backgroundColor: form.completionPercentage === 100 ? '#4caf50' : '#667eea',
                              transition: 'width 0.3s ease',
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>

                    {/* Form Data Preview */}
                    <Grid item xs={12} sm={5}>
                      <Box sx={{ maxHeight: 80, overflowY: 'auto' }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                          📋 Data:
                        </Typography>
                        {Object.entries(form.formData)
                          .filter(([key]) => !key.startsWith('_') && key !== 'form_id' && key !== 'user_id')
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <Typography
                              key={key}
                              variant="caption"
                              sx={{
                                display: 'block',
                                mb: 0.3,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              <strong>{key}:</strong> {String(value).substring(0, 30)}
                              {String(value).length > 30 ? '...' : ''}
                            </Typography>
                          ))}
                        {Object.keys(form.formData).length > 3 && (
                          <Typography variant="caption" color="primary">
                            +{Object.keys(form.formData).length - 3} more fields
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

interface IndustrySelectorProps {
  category: string;
  onSelectIndustry: (industryId: string) => void;
  onBack: () => void;
}

const IndustrySelector: React.FC<IndustrySelectorProps> = ({
  category,
  onSelectIndustry,
  onBack,
}) => {
  const categoryName = CATEGORIES.find((c) => c.id === category)?.name || 'Category';
  const industries = INDUSTRIES_BY_CATEGORY[category] || [];

  return (
    <Container maxWidth="lg">
      <BackButton
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        variant="outlined"
      >
        Back to Category
      </BackButton>

      <HeroSection>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Select an Industry
        </Typography>
        <Typography variant="body1">
          Choose the specific type of {categoryName.toLowerCase()} you're dealing with
        </Typography>
      </HeroSection>

      <Grid container spacing={3}>
        {industries.map((industry) => (
          <Grid item xs={12} sm={6} md={4} key={industry.id}>
            <OptionCard onClick={() => onSelectIndustry(industry.id)}>
              <CardActionArea>
                <CardContent>
                  <Typography sx={{ fontSize: '2.5rem', mb: 1 }}>
                    {industry.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {industry.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {industry.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => onSelectIndustry(industry.id)}
                  sx={{ fontWeight: 'bold' }}
                >
                  Full Form
                </Button>
              </Box>
            </OptionCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

interface FormPageProps {
  industryId: string;
  category: string;
  onBack: () => void;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  onSaveDraft?: (data: Record<string, any>) => Promise<void>;
  isLoading?: boolean;
}

const FormPage: React.FC<FormPageProps> = ({
  industryId,
  category,
  onBack,
  onSubmit,
  onSaveDraft,
  isLoading = false,
}) => {
  const config = getFormByCategory(industryId);
  const categoryName = CATEGORIES.find((c) => c.id === category)?.name || '';

  if (!config) {
    return (
      <Container>
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error">
            Form configuration not found
          </Typography>
          <Button onClick={onBack} sx={{ mt: 2 }} startIcon={<ArrowBackIcon />}>
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <Box sx={{ p: 2, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          variant="outlined"
          size="small"
        >
          Back
        </Button>
        <Breadcrumbs>
          <Typography variant="body2">{categoryName}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {config.name}
          </Typography>
        </Breadcrumbs>
      </Box>

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
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

interface FormFlowProps {
  onSubmit?: (industryId: string, formData: Record<string, any>) => Promise<void>;
  onSaveDraft?: (industryId: string, formData: Record<string, any>) => Promise<void>;
  onClose?: () => void;
  categoryFilter?: 'goods' | 'services' | null;
  formId?: string; // Accept formId from parent (TransactionSetup)
}

export const FormFlow: React.FC<FormFlowProps> = ({
  onSubmit = async () => {},
  onSaveDraft = async () => {},
  onClose = () => {},
  categoryFilter = null,
  formId: parentFormId,
}) => {
  // If categoryFilter is provided, start directly with industry selection
  const initialStep = categoryFilter ? 'industry' : 'category';
  const [step, setStep] = useState<'category' | 'industry' | 'form' | 'simple-contract'>(initialStep);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFilter);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // Use formId from parent if provided, otherwise generate one
  const [formId] = useState<string>(() => parentFormId || generateFormId());

  const handleSelectCategory = (categoryId: string) => {
    if (categoryId === 'quick-goods') {
      setSelectedCategory('goods');
      setStep('simple-contract');
    } else if (categoryId === 'quick-services') {
      setSelectedCategory('services');
      setStep('simple-contract');
    } else {
      setSelectedCategory(categoryId);
      setStep('industry');
    }
  };

  const handleSelectIndustry = (industryId: string) => {
    setSelectedIndustry(industryId);
    setStep('form');
  };

  const handleBackFromIndustry = () => {
    setSelectedCategory(null);
    setStep('category');
  };

  const handleBackFromForm = () => {
    setSelectedIndustry(null);
    setStep('industry');
  };

  const handleBackFromSimpleContract = () => {
    setSelectedCategory(null);
    setStep('category');
  };

  const handleFormSubmit = async (formData: Record<string, any>) => {
    setIsLoading(true);
    try {
      if (selectedIndustry && formId) {
        // Save to database and trigger contract generation
        const result = await submitFormAndGenerateContract(
          formData,
          selectedIndustry,
          { formId }
        );

        if (result.success) {
          // Call parent onSubmit callback if provided
          await onSubmit(selectedIndustry, formData);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSaveDraft = async (formData: Record<string, any>) => {
    try {
      if (selectedIndustry) {
        // Just call parent onSaveDraft callback - parent will handle database save
        // This avoids duplicate saves when parent is TransactionSetup
        await onSaveDraft(selectedIndustry, formData);
      }
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  if (step === 'category') {
    return <CategorySelector onSelectCategory={handleSelectCategory} />;
  }

  if (step === 'simple-contract' && selectedCategory) {
    return (
      <SimpleContractForm
        category={selectedCategory as 'goods' | 'services'}
        onBack={handleBackFromSimpleContract}
      />
    );
  }

  if (step === 'industry' && selectedCategory) {
    return (
      <IndustrySelector
        category={selectedCategory}
        onSelectIndustry={handleSelectIndustry}
        onBack={handleBackFromIndustry}
      />
    );
  }

  if (step === 'form' && selectedIndustry && selectedCategory) {
    return (
      <FormPage
        industryId={selectedIndustry}
        category={selectedCategory}
        onBack={handleBackFromForm}
        onSubmit={handleFormSubmit}
        onSaveDraft={handleFormSaveDraft}
        isLoading={isLoading}
      />
    );
  }

  return null;
};

export default FormFlow;
