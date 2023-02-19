import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  // 1. 因为在 app.module 的 exports 中没有添加 Logger（app的provider中添加了 Logger），所以需要手动添加到 providers 中
  // 2. 如果 app.module 的 exports 中添加了 Logger，那么我们需要在这个module的imports中导入
  // 2.1 直接在 app.module 使用 @Global 修饰 class，这样 providers 和 exports 导出的模块，就会在其他模块的 imports 自动添加
  providers: [
    UserService,
    // Logger
  ],
})
export class UserModule {}
