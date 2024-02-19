import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //for validation pipe
  //whitelist remove any other data that was not sppecified in dto
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })) 
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
