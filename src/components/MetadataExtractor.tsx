import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Chip,
  Typography,
  Stack,
  Paper,
  LinearProgress,
} from '@mui/material';
import { useURLExtractor } from '@/hooks/use-url-extractor';
import { useImageExtractor } from '@/hooks/use-image-extractor';
import LinkIcon from '@mui/icons-material/Link';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ImageIcon from '@mui/icons-material/Image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface MetadataExtractorProps {
  onFieldsExtracted?: (fields: Record<string, any>) => void;
  onMetadataExtracted?: (metadata: any) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
  </div>
);

export const MetadataExtractor: React.FC<MetadataExtractorProps> = ({
  onFieldsExtracted,
  onMetadataExtracted,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [url, setUrl] = useState('');

  const { extractFromURL, loading: urlLoading, error: urlError, metadata } = useURLExtractor({
    onSuccess: (meta, mappedFields) => {
      onMetadataExtracted?.(meta);
      onFieldsExtracted?.(mappedFields);
    },
  });

  const { extractFromImage, loading: imageLoading, error: imageError, extractedData, preview } =
    useImageExtractor({
      onSuccess: (data, mappedFields) => {
        onMetadataExtracted?.(data);
        onFieldsExtracted?.(mappedFields);
      },
    });

  const handleExtractURL = async () => {
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }

    try {
      await extractFromURL(url);
    } catch (err) {
      // Error is already handled
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await extractFromImage(file);
    } catch (err) {
      // Error is already handled
    }
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Card sx={{ backgroundColor: '#f5f5f5', border: '2px dashed #2196F3' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            🔗📸 Auto-Fill from Link or Picture
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Paste a link OR upload a product picture to auto-fill form fields
          </Typography>

          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
            <Tab label="🔗 From URL/Link" icon={<LinkIcon />} iconPosition="start" />
            <Tab label="📸 From Picture" icon={<ImageIcon />} iconPosition="start" />
          </Tabs>

          {/* URL TAB */}
          <TabPanel value={tabValue} index={0}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                placeholder="https://instagram.com/... or https://amazon.in/... or any product link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={urlLoading}
                onKeyPress={(e) => e.key === 'Enter' && handleExtractURL()}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  },
                }}
              />

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleExtractURL}
                  disabled={urlLoading || !url.trim()}
                  startIcon={urlLoading ? <CircularProgress size={20} /> : <CloudDownloadIcon />}
                >
                  {urlLoading ? 'Extracting...' : 'Extract Details'}
                </Button>
              </Box>

              {urlError && <Alert severity="error">{urlError}</Alert>}

              {metadata && <ExtractedDataDisplay metadata={metadata} type="url" />}
            </Stack>
          </TabPanel>

          {/* IMAGE TAB */}
          <TabPanel value={tabValue} index={1}>
            <Stack spacing={2}>
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#f9f9f9',
                  border: '2px dashed #ccc',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
                component="label"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={imageLoading}
                  style={{ display: 'none' }}
                />
                <Stack alignItems="center" spacing={1}>
                  <ImageIcon sx={{ fontSize: 48, color: '#2196F3' }} />
                  <Typography variant="subtitle1">
                    {imageLoading ? 'Processing Image...' : 'Click to upload or drag image'}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Supports: JPG, PNG, GIF (Max 10MB)
                  </Typography>
                  {imageLoading && <LinearProgress sx={{ width: '100%', mt: 2 }} />}
                </Stack>
              </Paper>

              {preview && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxHeight: '300px',
                      maxWidth: '100%',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                    }}
                  />
                </Box>
              )}

              {imageError && <Alert severity="error">{imageError}</Alert>}

              {extractedData && (
                <ExtractedDataDisplay
                  metadata={extractedData}
                  type="image"
                  confidence={extractedData.confidence}
                />
              )}
            </Stack>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
};

// Helper component to display extracted data
interface ExtractedDataDisplayProps {
  metadata: any;
  type: 'url' | 'image';
  confidence?: number;
}

const ExtractedDataDisplay: React.FC<ExtractedDataDisplayProps> = ({
  metadata,
  type,
  confidence,
}) => (
  <Box sx={{ mt: 2, p: 2, backgroundColor: '#f0f7ff', borderRadius: 1 }}>
    <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center' }}>
      <CheckCircleIcon sx={{ color: '#4caf50' }} />
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
        ✅ Extracted Information ({type === 'image' ? 'OCR' : 'Web'}):
      </Typography>
      {confidence && (
        <Chip
          label={`Confidence: ${Math.round(confidence)}%`}
          size="small"
          color={confidence > 80 ? 'success' : confidence > 60 ? 'warning' : 'error'}
        />
      )}
    </Stack>

    <Grid container spacing={2}>
      {(metadata.title || metadata.productName) && (
        <Grid item xs={12}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Product Name:
            </Typography>
            <Typography variant="body2">{metadata.title || metadata.productName}</Typography>
          </Box>
        </Grid>
      )}

      {(metadata.description || metadata.text) && (
        <Grid item xs={12}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Description:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
              {(metadata.description || metadata.text || '').substring(0, 200)}
              {(metadata.description || metadata.text || '').length > 200 ? '...' : ''}
            </Typography>
          </Box>
        </Grid>
      )}

      {metadata.price && (
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Price:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              ₹{metadata.price}
            </Typography>
          </Box>
        </Grid>
      )}

      {metadata.brand && (
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Brand:
            </Typography>
            <Typography variant="body2">{metadata.brand}</Typography>
          </Box>
        </Grid>
      )}

      {metadata.color && (
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Color:
            </Typography>
            <Typography variant="body2">{metadata.color}</Typography>
          </Box>
        </Grid>
      )}

      {metadata.material && (
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Material:
            </Typography>
            <Typography variant="body2">{metadata.material}</Typography>
          </Box>
        </Grid>
      )}

      {metadata.dimensions && (
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Dimensions:
            </Typography>
            <Typography variant="body2">{metadata.dimensions}</Typography>
          </Box>
        </Grid>
      )}

      {metadata.weight && (
        <Grid item xs={6}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Weight:
            </Typography>
            <Typography variant="body2">{metadata.weight}</Typography>
          </Box>
        </Grid>
      )}

      {metadata.images && metadata.images.length > 0 && (
        <Grid item xs={12}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Images Found:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
              {metadata.images.slice(0, 3).map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Extracted ${idx}`}
                  style={{
                    maxHeight: '100px',
                    maxWidth: '100px',
                    borderRadius: '4px',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>
      )}

      {metadata.specifications && Object.keys(metadata.specifications).length > 0 && (
        <Grid item xs={12}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Specifications:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
              {Object.entries(metadata.specifications).map(([key, value]) => (
                <Chip key={key} label={`${key}: ${value}`} size="small" variant="outlined" />
              ))}
            </Stack>
          </Box>
        </Grid>
      )}

      {metadata.seller && (
        <Grid item xs={12}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Seller Info:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {metadata.seller.name && (
                <Chip label={`Seller: ${metadata.seller.name}`} size="small" />
              )}
              {metadata.seller.followers && (
                <Chip label={`Followers: ${metadata.seller.followers}`} size="small" />
              )}
            </Stack>
          </Box>
        </Grid>
      )}
    </Grid>

    <Alert severity="info" sx={{ mt: 2 }}>
      📋 Form fields have been auto-filled with extracted data. Please verify and edit as needed.
    </Alert>
  </Box>
);

export default MetadataExtractor;
