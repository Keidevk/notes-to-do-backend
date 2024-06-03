/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotesDocument = HydratedDocument<Notes>;

@Schema()
export class Notes {
  @Prop()
  name_note: string;

  @Prop()
  text_note: string;

  @Prop()
  user_note: string;

  @Prop()
  user_id: Types.ObjectId;

  @Prop()
  finish: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Notes);