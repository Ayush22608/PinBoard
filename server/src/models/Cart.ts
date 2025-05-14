import mongoose, { Document, Schema } from 'mongoose';

export interface CartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface CartDocument extends Document {
  user: mongoose.Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
}

const cartSchema = new Schema<CartDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for total price
cartSchema.virtual('totalPrice').get(function (this: CartDocument) {
  return this.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

export const Cart = mongoose.model<CartDocument>('Cart', cartSchema); 