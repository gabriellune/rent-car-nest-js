import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')

  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Rent Car Api')
  .setVersion('1.0.0')
  .setDescription('Authorize with your token and try it on')
  .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('swagger', app, document)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(3000)
  Logger.debug('Listening on http://localhost:3000/')
}
bootstrap();
