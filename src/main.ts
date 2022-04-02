import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Environment } from 'roit-environment';
import { AppModule } from './AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/v1')
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(Environment.getProperty('port'))
  Logger.debug(`Listening on http://localhost:${Environment.getProperty('port')}/`)
}
bootstrap();
