/* eslint-disable prettier/prettier */
import * as jwt from 'jsonwebtoken';
import { Body, Controller, Delete, Get, Next, Param, Post, Req, Res } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CreateUsersDto } from "./dto/create-users.dto";
// import { Users } from "./schema/users.schema";
import { HandleLoginRequest } from "./dto/auth-users.dto";
import { UserService } from "./users.service";

@Controller('/api')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() createUsersDto: CreateUsersDto) {
    await this.userService.create(createUsersDto);
    console.log(createUsersDto)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    console.log("deleted")
    return this.userService.delete(id);
  }

  @Post("/login")
  async loginUser(@Body() handleLoginRequest: HandleLoginRequest, @Res() response: Response) : Promise<Response> {
    
    const data = await this.userService.login(handleLoginRequest);

    if(data.httpCode === 201){
      response.cookie('Authorization',`${data.token}`,{
        expires:new Date(Date.now() + 1800000),
        sameSite:"none",
        secure:true,
        httpOnly:true
      })
      response.cookie('Logged_In','yes',{
        expires:new Date(Date.now() + 1800000),
        sameSite:"none",
        secure:true,
      })
      response.cookie('user_id',`${data.user_id}`,{
        expires:new Date(Date.now() + 1800000),
        sameSite:"none",
        secure:true,
      })
      response.cookie('user_name',`${data.user_name}`,{
        expires:new Date(Date.now() + 1800000),
        sameSite:"none",
        secure:true,
      });
      return response.send()
    }else{
      response.status(404).json({
        httpCode:data.httpCode,
        message:data.message
      }).send();
    }
    
  }
  
  @Get('/auth/token')
  async auth(@Req() req: Request, @Res() res : Response, @Next() next: NextFunction){
    const token = req.cookies.Authorization

    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.KEYTOKEN as string, (err: any, user: any) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      console.log(user)
      res.sendStatus(200)
  
      next()
    })

  }
  @Get('/logout')
  logout(@Res() res : Response){
    res.clearCookie('user_name')
    res.clearCookie('user_id')
    res.clearCookie('Logged_In')
    res.clearCookie('Authorization')
    res.end();
  }
}