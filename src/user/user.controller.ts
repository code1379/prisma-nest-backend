import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  // 使用 service 需要在 constructor 中定义一个变量
  constructor(private userService: UserService) {}

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

    return this.userService.getUsers();
  }

  @Post()
  addUser(@Body() dto: any): any {
    console.log('dto', dto);
    return this.userService.addUser();
  }
}
