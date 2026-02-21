/**
 * URL METADATA EXTRACTOR SERVICE
 * Fetches product details from URLs and auto-fills form fields
 */

export interface ExtractedMetadata {
  title?: string;
  description?: string;
  images?: string[];
  price?: number;
  currency?: string;
  brand?: string;
  productType?: string;
  color?: string;
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
    unit?: string;
  };
  weight?: {
    value?: number;
    unit?: string;
  };
  rating?: number;
  reviews?: string;
  availability?: string;
  material?: string;
  condition?: string;
  seller?: {
    name?: string;
    rating?: number;
    followers?: number;
  };
  ogTags?: Record<string, string>;
  jsonLd?: Record<string, any>[];
}

class URLMetadataExtractor {
  private readonly TIMEOUT = 10000;
  private readonly USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

  /**
   * Extract metadata from any URL via backend API
   */
  async extractFromURL(url: string): Promise<ExtractedMetadata> {
    try {
      console.log(`🔗 Fetching metadata from: ${url}`);

      // Validate URL
      new URL(url);

      // Call backend API to extract (to avoid CORS issues)
      const response = await fetch('/api/extract-metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`Failed to extract: ${response.statusText}`);
      }

      const metadata = await response.json();
      console.log(`✅ Extracted metadata:`, metadata);
      return metadata;
    } catch (error) {
      console.error(`❌ Error extracting from URL:`, error);
      throw new Error(`Failed to extract metadata from ${url}: ${error.message}`);
    }
  }

  /**
   * Map extracted metadata to form fields
   */
  mapToFormFields(metadata: ExtractedMetadata): Record<string, any> {
    return {
      product_name: metadata.title,
      description: metadata.description,
      brand: metadata.brand,
      color: metadata.color,
      sale_price: metadata.price,
      product_material: metadata.material,
      weight_specified: metadata.weight?.value,
      product_dimensions: metadata.dimensions
        ? `${metadata.dimensions.height}x${metadata.dimensions.width}x${metadata.dimensions.depth} ${metadata.dimensions.unit}`
        : undefined,
      shown_photos: metadata.images?.join(', '),
      authenticity_claim: this.guessAuthenticityFromDescription(metadata.description || ''),
      condition_category: this.guessConditionFromDescription(metadata.description || ''),
    };
  }

  /**
   * Guess authenticity from description
   */
  private guessAuthenticityFromDescription(description: string): string {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes('original') || lowerDesc.includes('authentic')) return 'original';
    if (lowerDesc.includes('replica') || lowerDesc.includes('copy')) return 'replica';
    return 'not_applicable';
  }

  /**
   * Guess condition from description
   */
  private guessConditionFromDescription(description: string): string {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes('new') || lowerDesc.includes('sealed')) return 'like_new';
    if (lowerDesc.includes('excellent')) return 'excellent';
    if (lowerDesc.includes('good')) return 'good';
    if (lowerDesc.includes('fair')) return 'fair';
    if (lowerDesc.includes('poor') || lowerDesc.includes('damaged')) return 'poor';
    return 'good';
  }
}

export const urlMetadataExtractor = new URLMetadataExtractor();
export default urlMetadataExtractor;
