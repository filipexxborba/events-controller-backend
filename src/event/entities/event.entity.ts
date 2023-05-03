import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  isActive: boolean;

  @Prop()
  imageUrlList: string[];

  @Prop()
  thumbnailImageUrl: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
