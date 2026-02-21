/**
 * IMAGE METADATA EXTRACTOR SERVICE
 * Extracts product details from uploaded images using OCR
 */

export interface ImageExtractedData {
  text: string;
  productName?: string;
  price?: number;
  brand?: string;
  description?: string;
  specifications?: Record<string, string>;
  dimensions?: string;
  weight?: string;
  color?: string;
  material?: string;
  confidence: number;
  rawOCR: string;
}

class ImageMetadataExtractor {
  /**
   * Extract text from image using OCR via backend API
   */
  async extractTextFromImage(file: File | Blob): Promise<ImageExtractedData> {
    try {
      console.log(`📸 Processing image: ${file instanceof File ? file.name : 'blob'}`);

      const formData = new FormData();
      formData.append('image', file);

      // Call backend API for OCR processing
      const response = await fetch('/api/extract-from-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to extract: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`✅ OCR Complete. Confidence: ${data.confidence}%`);
      console.log(`📄 Extracted text: ${data.text.substring(0, 200)}...`);

      return data;
    } catch (error) {
      console.error(`❌ Error extracting from image:`, error);
      throw new Error(`Failed to extract from image: ${error.message}`);
    }
  }

  /**
   * Analyze image for specific product type
   */
  async analyzeProductType(file: File | Blob): Promise<string> {
    try {
      const extracted = await this.extractTextFromImage(file);
      const text = extracted.text.toLowerCase();

      if (
        text.includes('book') ||
        text.includes('isbn') ||
        text.includes('author') ||
        text.includes('publisher')
      ) {
        return 'books';
      } else if (
        text.includes('machine') ||
        text.includes('industrial') ||
        text.includes('equipment')
      ) {
        return 'industrial';
      } else if (
        text.includes('art') ||
        text.includes('painting') ||
        text.includes('artist') ||
        text.includes('gallery')
      ) {
        return 'art';
      } else if (
        text.includes('instagram') ||
        text.includes('whatsapp') ||
        text.includes('@') ||
        text.includes('follow')
      ) {
        return 'instagram';
      }

      return 'general';
    } catch (error) {
      console.error('Error analyzing product type:', error);
      return 'general';
    }
  }

  /**
   * Map extracted image data to form fields
   */
  mapToFormFields(imageData: ImageExtractedData): Record<string, any> {
    return {
      product_name: imageData.productName,
      brand: imageData.brand,
      description: imageData.description || imageData.text?.substring(0, 500),
      sale_price: imageData.price,
      product_material: imageData.material,
      color: imageData.color,
      product_dimensions: imageData.dimensions,
      product_weight: imageData.weight,
      technical_specs: JSON.stringify(imageData.specifications || {}),
      extraction_confidence: imageData.confidence,
    };
  }
}

export const imageMetadataExtractor = new ImageMetadataExtractor();
export default imageMetadataExtractor;
