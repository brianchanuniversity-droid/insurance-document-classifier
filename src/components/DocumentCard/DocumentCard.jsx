import { formatFileSize, formatDate, formatConfidence } from '../../utils/formatters';
import { DeleteOutlined } from '@ant-design/icons';

export const DocumentCard = ({ document, onDelete }) => {
  return (
    <div className="border border-blue-200 rounded p-3 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 mr-3">
          <h3 className="font-medium text-gray-900 truncate text-sm">
            {document.originalName || document.filename}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-xs text-gray-500">
              {formatFileSize(document.size || 0)}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(document.createdAt)}
            </p>
            <p className="text-xs text-gray-500">
              {document.classification}
            </p>
            <p className="text-xs text-gray-500">
              {formatConfidence(document.confidence)}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(document.id)}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600"
          aria-label="Delete document"
        >
          <DeleteOutlined className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

