import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { createLogger } from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

async function bootstrap() {
  // 参考 https://github.com/gremo/nest-winston#replacing-the-nest-logger-also-for-bootstrapping
  // winston logger 实例
  const winstonInstance = createLogger({
    // 对日志怎么输出
    transports: [
      new winston.transports.Console({
        level: 'info',
        // combine 进行字符串拼接
        format: winston.format.combine(
          winston.format.timestamp(),
          // 变成和 nest 相似的颜色
          utilities.format.nestLike(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'warn',
        dirname: 'logs',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        // combine 进行字符串拼接
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'info',
        dirname: 'logs',
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        // combine 进行字符串拼接
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    // 替换 nest 的 logger
    logger: WinstonModule.createLogger({
      instance: winstonInstance,
    }),
  });
  // app.setGlobalPrefix('/api/v1');
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapterHost));
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
