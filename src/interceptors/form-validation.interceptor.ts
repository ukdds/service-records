import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FormValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const formData = context.switchToHttp().getRequest().body;

    // perform validation checks on each form field
    const isValid = this.validateForm(formData);

    // if the form is valid, pass it on to the next middleware
    // @ts-ignore
    if (!isValid) {
      throw new BadGatewayException('Form was invalid');
    } else {
      return next.handle();
    }

    // otherwise, throw an exception
  }

  validateForm(formData: any) {
    // perform validation checks on each form field here
    // return true or false based on the result of the checks
  }
}
