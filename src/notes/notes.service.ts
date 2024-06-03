/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Notes } from "./schema/notes.schema";
import { Model } from "mongoose";
import { NotesDto } from "./dto/create-notes.dto";

@Injectable()
export class NoteService{
    constructor(@InjectModel(Notes.name) private readonly NotesModel: Model<Notes>){}

    async createPost(notesDto:NotesDto):Promise<NotesDto> {
        const createdPost = await this.NotesModel.create(notesDto);
        return createdPost;
    }
    async findAllNotes(user_name:string ): Promise<Notes[]> {
        return this.NotesModel.find().where({user_note:user_name}).exec();
      }
    async deleteNote(_id:string,user_id:string): Promise<void> {
        // console.log(_id,user_id)
        await this.NotesModel.findOneAndDelete({_id,user_id}).exec();
    };
}