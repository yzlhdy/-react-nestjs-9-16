import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from './shared/validation.pipe';
import { ExceptionsFilter } from './shared/http-error.filter';
import { TransformInterceptor } from './shared/logging.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const port = process.env.PORT
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors();

  /**
   * 全局管道
   */
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe())

  /**
   * swagger 配置
   */
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle('公共的文档')
    .setDescription('一只灵活的羊')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);


  await app.listen(port || 8080);
  Logger.log(`Services is http://localhost:${port}/api`)
}
bootstrap();
