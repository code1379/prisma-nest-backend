import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers() {
    return {
      code: 0,
      data: [],
      msg: 'success',
    };
  }

  addUser() {
    return {
      code: 0,
      data: {},
      msg: '添加用户成功',
    };
  }
}
