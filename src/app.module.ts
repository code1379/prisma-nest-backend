import { Global, Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';
// 结合 cross-env 以及 ConfigModule 的 envFilePath 使用，但我觉得没必要。我们只用 .env 文件就行
// const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      // 不设置 isGlobal 的话，在别的模块的 providers 中添加 ConfigService
      isGlobal: true,
      // envFilePath,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}
