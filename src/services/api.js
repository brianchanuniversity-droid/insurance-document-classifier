import axios from 'axios';
import { API_KEY } from '../utils/constants';

const apiClient = axios.create({
  baseURL: 'https://interview-classification-api.onrender.com',
  headers: {
    'X-API-Key': API_KEY,
  },
});

class DocumentAPI {
  async classifyDocument(file, onUploadProgress) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/v1/documents/classify', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress(percentCompleted);
        }
      },
    });

    return response.data;
  }

  async getDocuments(params = {}) {
    const { page = 1, limit = 50 } = params;
    const response = await apiClient.get('/v1/documents', {
      params: { page, limit },
    });

    return response.data;
  }

  async deleteDocument(documentId) {
    const response = await apiClient.delete(
      `/v1/documents/${documentId}`
    );

    return response.data;
  }

  async healthCheck() {
    const response = await apiClient.get('/health');
    
    return response.data;
  }
}

export const documentAPI = new DocumentAPI();
export default documentAPI;

