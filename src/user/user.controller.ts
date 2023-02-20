import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config.enum';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { createUserDto, updateUserDto } from './create-user.dto';
@Controller('user')
export class UserController {
  // 使用 service 需要在 constructor 中定义一个变量
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    // private readonly logger: Logger,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('UserController init success');
  }

  @Get(':id')
  // 参数内置管道
  getUserById(@Param('id', ParseIntPipe) id: number): any {
    return this.userService.getUserById(id);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  // 通过管道的类验证器对参数进行验证
  addUser(@Body() dto: createUserDto): any {
    return this.userService.addUser(dto);
  }

  @Post('login')
  login(@Body() dto: createUserDto): any {
    return this.userService.login(dto);
  }

  @Delete()
  deleteUserById(@Body('id', ParseIntPipe) id): any {
    return this.userService.deleteUserById(id);
  }

  @Patch()
  updateUserById(@Body() dto: updateUserDto) {
    return this.userService.updateUserById(dto);
  }
}
