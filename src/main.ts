import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('NodeJS Challenge 20201030')
    .setDescription(
      'Serviço responsável pelo desafio NodeJS Challenge 20201030',
    )
    .setVersion('1.0')
    .build();

  app.enableCors();
  app.useGlobalPipes();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(+process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
