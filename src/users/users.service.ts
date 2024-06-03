/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Users } from "./schema/users.schema";
import { Model } from "mongoose";
import { CreateUsersDto } from "./dto/create-users.dto";
import { HandleAuthResponse, HandleLoginRequest } from "./dto/auth-users.dto";
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private readonly UsersModel: Model<Users>) {}

  
  getHello(): string {
    return process.env.PRUEBA;
  }
  
  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const createdCat = await this.UsersModel.create(createUsersDto);
    return createdCat;
  }

  async delete(id: string) {
    const deleted = await this.UsersModel 
    await this.UsersModel.findOneAndDelete({_id:id}).exec();
    return deleted;
  }

  async login({email, password}:HandleLoginRequest):Promise<HandleAuthResponse> {
    const data = await this.UsersModel
                  .findOne()
                  .where({email, password})
                  .exec()
                  .then((e) => {
                    if (e){
                       return {
                        httpCode: 201,
                        message: 'Success',
                        user_id:e._id ,
                        user_name: e.name,
                        token: `${jwt.sign({email,password},
                          process.env.KEYTOKEN,
                          {expiresIn:'1800s'})}`
                       }  
                    }else{
                      return {
                        httpCode:404,
                        message:'User not found',
                        user_id:null,
                        user_name:null,
                        token:null
                      }
                    }
                  });
    // console.log(data)
    return data;              
}
}
