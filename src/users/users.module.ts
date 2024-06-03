/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { UserSchema, Users } from "./schema/users.schema";

@Module({
    imports: [MongooseModule.forFeature([{name:Users.name, schema:UserSchema}])],
    controllers: [UsersController],
    providers: [UserService],
  })
  export class UsersModule {}