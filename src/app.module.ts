/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [NotesModule,UsersModule,MongooseModule.forRoot('mongodb+srv://admin:admin@todoapi.zudveks.mongodb.net/test')],
  controllers: [],
  providers: [],
})
export class AppModule {}
