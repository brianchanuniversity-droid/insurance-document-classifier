import { useState } from 'react';
import { FileUploadArea } from './components/FileUploadArea';
import { DocumentGallery } from './components/DocumentGallery';
import { useDocuments } from './hooks/useDocuments';

function App() {
  const { documents, loading, error, deleteDocument, addDocument } = useDocuments();
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null);

  const onUploadSuccess = (response) => {
    addDocument(response);
    setUploadSuccessMessage('Document uploaded and classified successfully!');
    setTimeout(() => setUploadSuccessMessage(null), 3000);
  };

  const onDelete = async (documentId) => {
    return await deleteDocument(documentId);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-blue-200 bg-white">
        <div className="max-w-4xl mx-auto px-3 py-4">
          <h1 className="text-2xl font-medium text-blue-600 text-left">
            Insurance Document Uploader
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 py-8">
        {uploadSuccessMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
            {uploadSuccessMessage}
          </div>
        )}

        <section className="mb-8">
          <FileUploadArea onUploadSuccess={onUploadSuccess} />
        </section>

        <section>
          {documents.length > 0 && (
            <div className="mb-4 text-sm text-blue-700">
              {documents.length} {documents.length === 1 ? 'document' : 'documents'}
            </div>
          )}
          <DocumentGallery
            documents={documents}
            loading={loading}
            error={error}
            onDelete={onDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default App;

