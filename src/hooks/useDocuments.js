import { useState, useEffect } from 'react';
import { documentAPI } from '../services/api';

export const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDocuments = async (page = 1, limit = 50) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await documentAPI.getDocuments({ page, limit });
      setDocuments(response.results || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch documents');
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (documentId) => {
    try {
      await documentAPI.deleteDocument(documentId);
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete document';
      return { success: false, error: errorMessage };
    }
  };

  const addDocument = (newDocument) => {
    setDocuments((prev) => [newDocument, ...prev]);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    deleteDocument,
    addDocument,
  };
};

