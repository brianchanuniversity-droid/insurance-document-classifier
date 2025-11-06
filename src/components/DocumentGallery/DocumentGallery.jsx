import { DocumentCard } from '../DocumentCard';
import { DeleteModal } from '../DeleteModal';
import { useState, useMemo } from 'react';

export const DocumentGallery = ({ documents, loading, error, onDelete }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = useMemo(() => {
    if (!searchQuery) return documents;
    const query = searchQuery.toLowerCase();

    return documents.filter(doc => 
      (doc.originalName || doc.filename || '').toLowerCase().includes(query)
    );
  }, [documents, searchQuery]);

  const onDeleteClick = (documentId) => {
    setDocumentToDelete(documentId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!documentToDelete) return;

    setDeleting(true);
    const result = await onDelete(documentToDelete);
    setDeleting(false);

    if (result.success) {
      setDeleteModalOpen(false);
      setDocumentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  if (loading && documents.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error && documents.length === 0) {
    return (
      <div className="border border-red-200 rounded p-4 text-center bg-white">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="border border-blue-200 rounded-lg p-8 text-center bg-white">
        <p className="text-blue-600">No documents yet</p>
      </div>
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
      />

      {filteredDocuments.length === 0 ? (
        <div className="border border-blue-200 rounded-lg p-8 text-center bg-white">
          <p className="text-blue-600">No documents found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onDelete={onDeleteClick}
            />
          ))}
        </div>
      )}

      <DeleteModal
        isOpen={deleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        deleting={deleting}
      />
    </>
  );
};

