/*
  针对 http-exception 的 filter。
  相当于当我们抛出 HttpException 的时候，会被捕获到
*/
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as requestIp from 'request-ip';
import { HttpAdapterHost } from '@nestjs/core';
import { WinstonLogger } from 'nest-winston';
// 不添加参数的话，会捕获所有异常。包括 websocket 的
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private httpAdapterHost: HttpAdapterHost,
    private logger: WinstonLogger,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    // host 用于获取上下文（express 的）
    const ctx = host.switchToHttp();
    // 响应
    const response = ctx.getResponse<Response>();
    // 请求
    const request = ctx.getRequest<Request>();
    // 状态码
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // ip
    const ip = requestIp.getClientIp(request);

    const body = {
      headers: request.headers,
      query: request.query,
      params: request.params,
      body: request.body,
      timestamp: new Date().toISOString(),
      ip,
      exception: exception['name'],
      error: exception['response'] || 'INTERNAL_SERVER_ERROR',
    };
    this.logger.error(exception['message'], exception['stack']);
    httpAdapter.reply(response, body, statusCode);
  }
}
