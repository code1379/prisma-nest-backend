import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, utilities } from 'nest-winston';
import { LogEnum } from 'src/enum/config.enum';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp } = winston.format;
const { Console, DailyRotateFile } = winston.transports;

@Module({
  imports: [
    WinstonModule.forRootAsync({
      // 这样可以读取到 configService，用来控制logger的开启和关闭
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransports = new Console({
          level: 'info',
          // combine 进行字符串拼接
          format: combine(
            timestamp(),
            // 变成和 nest 相似的颜色
            utilities.format.nestLike(),
          ),
        });

        const warnRotateFileTransports = new DailyRotateFile({
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
        });

        const infoRotateFileTransports = new DailyRotateFile({
          level: configService.get(LogEnum.LOG_LEVEL),
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
        });
        return {
          transports: [
            consoleTransports,
            ...(configService.get(LogEnum.LOG_ON)
              ? [warnRotateFileTransports, infoRotateFileTransports]
              : []),
          ],
        };
      },
    }),
  ],
})
export class LogModule {}
