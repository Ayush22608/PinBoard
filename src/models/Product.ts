import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  customId: {
    type: String,
    index: true  // Index this field for faster queries
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
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['movies', 'shows', 'music', 'anime', 'sports', 'motivation', 'games']
  }
}, {
  timestamps: true
});

export const Product = mongoose.model('Product', productSchema); 