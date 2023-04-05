import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// @Injectable()
// export class ErrorsInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle();
//   }
// }

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return undefined;
  }

  // intercept( context: ExecutionContext, next: CallHandler<any> ): Observable<any> | Promise<Observable<any>> {
  //   return undefined;
  // }

  // intercept(
  //   context: ExecutionContext,
  //   call$: Observable<any>,
  // ): Observable<any> {
  //   return call$.pipe(
  //     // Here you can map (or rethrow) errors
  //     catchError((err) => ({ errors: [err.message] })),
  //   );
  // }
}
