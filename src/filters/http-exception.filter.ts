/*
  针对 http-exception 的 filter。
  相当于当我们抛出 HttpException 的时候，会被捕获到
*/
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // host 用于获取上下文（express 的）
    const ctx = host.switchToHttp();
    // 响应
    const response = ctx.getResponse<Response>();
    // 请求
    const request = ctx.getRequest<Request>();
    // 状态码
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message || exception.name,
    });
  }
}
