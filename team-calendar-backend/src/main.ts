import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Сконфигурировать документ открытого API
  const config = new DocumentBuilder().setTitle('Calendar').build();
  // Создать документ
  const document = SwaggerModule.createDocument(app, config);
  // хостинг документа
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'chrome-extension://jcmfnmkpolncpgmjlhlknajklonbkcdc',
    ],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
