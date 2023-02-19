import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config.enum';
@Controller('user')
export class UserController {
  // 使用 service 需要在 constructor 中定义一个变量
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.logger.log('UserController init success');
  }

  @Get(':id')
  // @Query => /user?id=1&age=2
  // @Param => /user/1
  getUsers(@Query() query: any, @Param() param: any): any {
    console.log(
      '🚀 ~ file: user.controller.ts:11 ~ UserController ~ getUsers ~ query',
      query,
    );
    console.log(
      '🚀 ~ file: user.controller.ts:13 ~ UserController ~ getUsers ~ param',
      param,
    );
    const db = this.configService.get(ConfigEnum.DB);
    const host = this.configService.get(ConfigEnum.DB_HOST);
    console.log(
      '🚀 ~ file: user.controller.ts:26 ~ UserController ~ getUsers ~ db',
      db,
    );
    console.log(
      '🚀 ~ file: user.controller.ts:27 ~ UserController ~ getUsers ~ host',
      host,
    );
    // const user = {
    //   isAdmin: false,
    // };
    // if (!user.isAdmin) {
    //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // }
    this.logger.log('请求用户成功了');
    this.logger.warn('请求用户成功了');
    this.logger.error('请求用户成功了');
    return this.userService.getUsers();
  }

  @Post()
  addUser(@Body() dto: any): any {
    console.log('dto', dto);
    return this.userService.addUser();
  }
}
