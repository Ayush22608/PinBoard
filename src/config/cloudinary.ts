import { Cloudinary } from '@cloudinary/url-gen';

// Initialize Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }
});

// Upload preset for unsigned uploads
export const UPLOAD_PRESET = 'poster_website';

// Default transformation options
export const defaultTransformation = {
  quality: 'auto',
  fetch_format: 'auto',
  width: 'auto',
  crop: 'scale'
}; 