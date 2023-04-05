import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  // intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  //   return next.handle();
  // }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // ** if you use normal HTTP module **
    // const ctx = context.switchToHttp();
    // const token = ctx.getRequest().headers['authorization'];
    //
    // if (ctx.token) {
    //   this.httpService.axiosRef.defaults.headers.common['authorization'] =
    //     token;
    // }
    return next.handle().pipe();
  }
}
