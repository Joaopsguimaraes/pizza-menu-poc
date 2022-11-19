import { model, Schema } from 'mongoose';

export const Order = model(
  'Order',
  new Schema({
    table: {
      type: Schema.Types.String,
      required: true
    },
    status: {
      type: Schema.Types.String,
      enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
      default: 'WAITING',
      required: true
    },
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now
    },
    products: {
      required: true,
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
          },
          quantity: {
            type: Schema.Types.Number,
            default: 1
          }
        }
      ]
    }
  })
);
