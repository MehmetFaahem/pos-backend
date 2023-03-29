import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OwnerDocument = Owner & Document;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  collection: 'owners',
})
export class Owner {
  @Prop({
    required: [true, 'full_name should not be empty'],
    type: String,
    trim: true,
  })
  name: string;

  @Prop({
    required: [true, 'email should not be empty'],
    type: String,
    trim: true,
  })
  email: string;

  @Prop({
    required: [true, 'phone_no should not be empty'],
    type: String,
    trim: true,
  })
  phone: string;

  @Prop({
    required: [true, 'contact_mode should not be empty'],
    type: String,
    trim: true,
  })
  location: string;
}

export const OwnersSchema = SchemaFactory.createForClass(Owner);
