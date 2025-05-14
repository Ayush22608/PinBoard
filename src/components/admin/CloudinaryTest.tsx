import React, { useState } from 'react';
import { Upload, Loader2, CheckCircle, XCircle } from 'lucide-react';

const CloudinaryTest: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setUploadedUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Upload failed');
      }

      setUploadedUrl(data.secure_url);
      console.log('Upload successful:', data);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Cloudinary Upload Test</h2>
      
      <div className="space-y-4">
        <div className="border-2 border-dashed border-neutral-200 rounded-lg p-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="w-8 h-8 text-neutral-400 mb-2" />
            <span className="text-sm text-neutral-600">
              {file ? file.name : 'Click to select an image'}
            </span>
          </label>
        </div>

        {file && (
          <div className="flex items-center justify-between">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Image
                </>
              )}
            </button>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {uploadedUrl && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span>Upload successful!</span>
            </div>
            <div className="relative aspect-[3/4] w-full">
              <img
                src={uploadedUrl}
                alt="Uploaded preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="text-xs text-neutral-500 break-all">
              URL: {uploadedUrl}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CloudinaryTest; 