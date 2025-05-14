import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { cld } from '../../config/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { format, auto } from '@cloudinary/url-gen/qualifiers/format';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false
}) => {
  // Extract public ID from full URL if provided
  const imagePublicId = publicId.includes('cloudinary.com')
    ? publicId.split('/').slice(-1)[0].split('.')[0]
    : publicId;

  // Create image with transformations
  const image = cld.image(imagePublicId)
    .resize(fill().width(width).height(height))
    .delivery(quality('auto'))
    .delivery(format(auto()));

  return (
    <AdvancedImage
      cldImg={image}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};

export default CloudinaryImage; 