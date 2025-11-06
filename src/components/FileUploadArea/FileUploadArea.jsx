import { useRef, useState } from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';

export const FileUploadArea = ({ onUploadSuccess }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const { uploading, uploadProgress, error, uploadFile } = useFileUpload(onUploadSuccess);

  const onSelect = async (files) => {
    if (files?.[0]) {
      await uploadFile(files[0]);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    await onSelect(e.dataTransfer.files);
  };

  const onInputChange = async (e) => {
    await onSelect(e.target.files);
    fileInputRef.current.value = '';
  };

  const onClick = () => fileInputRef.current?.click();

  return (
    <div className="w-full">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          border-2 border-dashed rounded-lg p-6
          ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-blue-300 bg-white'}
          ${uploading ? 'opacity-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={onInputChange}
          className="hidden"
          disabled={uploading}
        />

        <div className="flex items-center justify-between">
          <div className="flex-1">
            {uploading ? (
              <div className="space-y-2">
                <p className="text-sm text-blue-600">
                  Uploading... {uploadProgress}%
                </p>
                <div className="w-full bg-blue-100 rounded-full h-1">
                  <div
                    className="bg-blue-500 h-1 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">
                Drag & drop files here
              </p>
            )}
          </div>
          <button
            onClick={onClick}
            disabled={uploading}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Browse Files
          </button>
        </div>

        {error && (
          <div className="mt-4 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

