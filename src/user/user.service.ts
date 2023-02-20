import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { createUserDto, updateUserDto } from './create-user.dto';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
  // 引入prisma
  constructor(private prisma: PrismaService) {}
  // 校验密码
  async verifyPassword(pass: string, dbPass: string) {
    return await argon2.verify(dbPass, pass);
  }
  // 根据id获取用户
  async getUserById(id: number) {
    const result = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return result;
  }
  // 根据 username 查询用户
  async getUserByUsername(username: string) {
    const result = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    return result;
  }
  // 获取所有用户
  async getUsers() {
    const result = await this.prisma.user.findMany();
    return result;
  }
  // 添加用户
  async addUser({ username, password }: createUserDto) {
    // 先校验数据库中 username 对应的用户是否存在
    const existedUser = await this.getUserByUsername(username);

    if (existedUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    // 对密码进行加密
    const hashedPassword = await argon2.hash(password);
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    return user;
  }

  // 用户登录校验密码
  async login({ username, password }: createUserDto) {
    const user = await this.getUserByUsername(username);
    const isValid = await this.verifyPassword(password, user.password);
    // 校验失败
    if (!isValid) {
      throw new HttpException('用户名或者密码错误', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  // 根据用户 id 删除用户
  async deleteUserById(id: number) {
    const result = await this.prisma.user.delete({
      where: { id },
    });

    return result;
  }

  // 更新用户
  async updateUserById(dto: updateUserDto) {
    // eslint-disable-next-line prefer-const
    let { id, username, password } = dto;
    if (password) {
      password = await argon2.hash(password);
    }

    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        // unique 不能被改动
        username,
        password,
      },
    });

    return result;
  }
}
