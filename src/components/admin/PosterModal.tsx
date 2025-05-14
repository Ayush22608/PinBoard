import React, { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import axios from 'axios';
import { Poster } from '../../types/poster';
import { UPLOAD_PRESET } from '../../config/cloudinary';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (poster: Partial<Poster>) => Promise<void>;
  poster?: Poster;
  categories: string[];
}

const PosterModal: React.FC<PosterModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  poster,
  categories
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    dimensions: '',
    tags: '',
    imageUrl: '',
    featured: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (poster) {
      setFormData({
        title: poster.title,
        description: poster.description,
        price: poster.price.toString(),
        category: poster.category,
        stock: poster.stock.toString(),
        dimensions: poster.dimensions,
        tags: poster.tags.join(', '),
        imageUrl: poster.imageUrl,
        featured: poster.featured
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        dimensions: '',
        tags: '',
        imageUrl: '',
        featured: false
      });
    }
    setImageFile(null);
    setError('');
  }, [poster, isOpen]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);
    setUploadProgress(0);

    try {
      // Create form data for Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      // Upload to Cloudinary
      setUploadProgress(25);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      setUploadProgress(75);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Upload failed');
      }

      setUploadProgress(100);
      setFormData(prev => ({ ...prev, imageUrl: data.secure_url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUploading(true);
    setUploadProgress(0);

    try {
      const posterData: Partial<Poster> = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        dimensions: formData.dimensions,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        imageUrl: formData.imageUrl,
        featured: formData.featured,
        updatedAt: new Date()
      };

      if (!poster) {
        posterData.createdAt = new Date();
      }

      await onSubmit(posterData);
      setUploadProgress(100);
      onClose();
    } catch (error) {
      console.error('Error saving poster:', error);
      setError('Failed to save poster. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">
            {poster ? 'Edit Poster' : 'Add Poster'}
          </h2>
          <button
            className="text-neutral-500 hover:text-neutral-700"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Title
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Category
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Price
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                required
                min="0"
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Dimensions
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 24x36 inches"
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                placeholder="Comma-separated tags"
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Description
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="image-upload"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 flex items-center justify-center"
                >
                  <Upload size={20} className="mr-2" />
                  {imageFile ? 'Change Image' : 'Upload Image'}
                </label>
              </div>
              {formData.imageUrl && !imageFile && (
                <img
                  src={formData.imageUrl}
                  alt="Poster preview"
                  className="h-20 w-20 object-cover rounded-lg"
                />
              )}
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Poster preview"
                  className="h-20 w-20 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-neutral-700">
              Featured Poster
            </label>
          </div>

          {/* Add progress indicator */}
          {uploading && (
            <div className="w-full bg-neutral-200 rounded-full h-2.5">
              <div
                className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <div className="text-sm text-neutral-600 mt-1">
                {uploadProgress < 25 && 'Preparing image...'}
                {uploadProgress >= 25 && uploadProgress < 50 && 'Uploading image...'}
                {uploadProgress >= 50 && uploadProgress < 75 && 'Processing...'}
                {uploadProgress >= 75 && 'Saving poster...'}
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
              onClick={onClose}
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Uploading...</span>
                </>
              ) : (
                <span>{poster ? 'Save Changes' : 'Add Poster'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PosterModal; 