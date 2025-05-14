import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  customId?: string;
}

const productSchema = new mongoose.Schema({
  customId: {
    type: String,
    index: true // Index this field for faster queries
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['movies', 'tv-shows', 'anime', 'abstract', 'nature', 'shows', 'music', 'sports', 'motivation', 'games']
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Product = mongoose.model<IProduct>('Product', productSchema); 