import { useState, useCallback } from 'react';
import { urlMetadataExtractor, ExtractedMetadata } from '@/services/urlMetadataExtractor';

interface UseURLExtractorOptions {
  onSuccess?: (metadata: ExtractedMetadata, mappedFields: Record<string, any>) => void;
  onError?: (error: Error) => void;
}

export const useURLExtractor = (options?: UseURLExtractorOptions) => {
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<ExtractedMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  const extractFromURL = useCallback(
    async (url: string) => {
      setLoading(true);
      setError(null);

      try {
        new URL(url);

        console.log(`🔗 Extracting from: ${url}`);
        const extractedMetadata = await urlMetadataExtractor.extractFromURL(url);

        setMetadata(extractedMetadata);

        const mappedFields = urlMetadataExtractor.mapToFormFields(extractedMetadata);

        console.log(`✅ Mapped fields:`, mappedFields);
        options?.onSuccess?.(extractedMetadata, mappedFields);

        return { metadata: extractedMetadata, mappedFields };
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
    extractFromURL,
    metadata,
    loading,
    error,
  };
};
