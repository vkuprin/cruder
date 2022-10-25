import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppModule } from './app/app.module';
import { appConfig } from './app/config/app.config';
import { KafkaService } from './app/shared-module/secondary-adapters/msk/kafka.service';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

dotenv.config();

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true, // allow conversion underneath
      },
    }),
  );

  await KafkaService.connect();

  let config = new DocumentBuilder();

  if (process.env.BASE_PATH) {
    config = config.addServer(process.env.BASE_PATH);
  }

  const builtConfig = config
    .setTitle('Account Service API')
    .setDescription('The Account Service API description')
    .setVersion('1.0')
    .addBearerAuth(
      { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'Bearer' },
      'BearerToken',
    )
    .addApiKey(
      { type: 'apiKey', name: appConfig.apiKeyHeader, in: 'header' },
      'ApiKey',
    )
    .build();
  const document = SwaggerModule.createDocument(app, builtConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
