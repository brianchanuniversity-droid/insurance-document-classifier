export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatConfidence = (confidence) => `${Math.round(confidence * 100)}%`;

export const getFileExtension = (filename) => filename.split('.').pop().toLowerCase();

export const isValidFileType = (file) => {
  const extension = getFileExtension(file.name);
  const validExtensions = ['pdf', 'png', 'jpg', 'jpeg'];
  return validExtensions.includes(extension);
};

