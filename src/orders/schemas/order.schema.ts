import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  productId: string;
  @Prop({ required: true })
  product: string;
  @Prop({ required: true })
  qty: number;
  @Prop({ required: true })
  totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
