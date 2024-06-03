/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common"
import { NotesDto } from "./dto/create-notes.dto"
import { NoteService } from "./notes.service"
import { Notes } from "./schema/notes.schema";
import { Request } from "express";

@Controller('/api')
export class NotesController{
    constructor(private readonly noteService: NoteService){}
 
@Get('/notes')
async FindAllUsers(@Req() req: Request):Promise<Notes[]> {
  // console.log()
  const data = this.noteService.findAllNotes(req.cookies.user_name); 
  console.log(data);
  return data; 
  
}
@Post('/notes/create')
async createNotes(@Body() notesDto: NotesDto){
  console.log(NotesDto)
  const data = await this.noteService.createPost(notesDto)
  console.log(data)
}
@Delete('/notes/:notes')
async deleteNote(@Req() req: Request, @Param('notes') id:string) {
  this.noteService.deleteNote(id, req.cookies.user_id);
}
}