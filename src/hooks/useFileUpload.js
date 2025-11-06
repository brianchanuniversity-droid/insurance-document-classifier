import { useState } from 'react';
import { documentAPI } from '../services/api';
import { MAX_FILE_SIZE } from '../utils/constants';
import { isValidFileType } from '../utils/formatters';

export const useFileUpload = (onSuccess) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    if (!file) {
      return { valid: false, error: 'No file selected' };
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
      };
    }

    if (!isValidFileType(file)) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload PDF files only',
      };
    }

    return { valid: true };
  };

  const uploadFile = async (file) => {
    const validation = validateFile(file);

    if (!validation.valid) {
      setError(validation.error);
      return { success: false, error: validation.error };
    }

    setUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const response = await documentAPI.classifyDocument(file, (progress) => {
        setUploadProgress(progress);
      });

      setUploadProgress(100);
      onSuccess?.(response);
      
      return { success: true, data: response };
    } catch (err) {
      let errorMessage = 'Failed to upload document';
      
      if (err.response) {
        const status = err.response.status;
        
        if (status === 400) {
          errorMessage = err.response.data?.message || 'No file uploaded';
        } else if (status === 401) {
          errorMessage = 'Invalid API key';
        } else if (status === 429) {
          errorMessage = 'Rate limit exceeded. Please try again later.';
        } else if (status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = err.response.data?.message || errorMessage;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  return {
    uploading,
    uploadProgress,
    error,
    uploadFile,
  };
};

