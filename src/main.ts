/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from "dotenv"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials:true,
    origin:['http://localhost:3000','http://localhost'],
  });
  app.use(cookieParser());
  dotenv.config();
  await app.listen(8080);
}
bootstrap();
