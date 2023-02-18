import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

// 结合 cross-env 以及 ConfigModule 的 envFilePath 使用，但我觉得没必要。我们只用 .env 文件就行
// const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      // 不设置 isGlobal 的话，在别的模块的 providers 中添加 ConfigService
      isGlobal: true,
      // envFilePath,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
