import { Schema, Document } from 'mongoose';

export interface Product extends Document {
  title: string;
  unitPrice: number;
  description: string;
  imgUrl: string;
  qty: number;
}

export const ProductSchema = new Schema<Product>({
  title: String,
  unitPrice: Number,
  description: String,
  imgUrl: String,
  qty: Number,
});
