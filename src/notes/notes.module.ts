/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './notes.controller';
import { NoteService } from './notes.service';
import { Notes, NoteSchema } from './schema/notes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Notes.name, schema: NoteSchema }])],
  controllers: [NotesController],
  providers: [NoteService],
})
export class NotesModule {}
