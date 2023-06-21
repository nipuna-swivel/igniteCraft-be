import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true })
  password: string;
  @Prop({ required: true })
  email: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
