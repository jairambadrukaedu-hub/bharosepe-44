import { useState, useCallback } from 'react';
import { imageMetadataExtractor, ImageExtractedData } from '@/services/imageMetadataExtractor';

interface UseImageExtractorOptions {
  onSuccess?: (data: ImageExtractedData, mappedFields: Record<string, any>) => void;
  onError?: (error: Error) => void;
}

export const useImageExtractor = (options?: UseImageExtractorOptions) => {
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<ImageExtractedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const extractFromImage = useCallback(
    async (file: File) => {
      setLoading(true);
      setError(null);

      try {
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        console.log(`📸 Extracting from image: ${file.name}`);
        const data = await imageMetadataExtractor.extractTextFromImage(file);

        setExtractedData(data);

        const mappedFields = imageMetadataExtractor.mapToFormFields(data);

        console.log(`✅ Mapped fields:`, mappedFields);
        options?.onSuccess?.(data, mappedFields);

        return { data, mappedFields };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error(`❌ Extraction error:`, errorMessage);
        options?.onError?.(err instanceof Error ? err : new Error(errorMessage));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  return {
    extractFromImage,
    extractedData,
    preview,
    loading,
    error,
  };
};
