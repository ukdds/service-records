import { Session } from '@nestjs/common';

export class BaseDTO {
  session: Record<string, any>;

  constructor(data: Partial<any>, @Session() session: Record<string, any>) {
    this.session = session;

    Object.assign(this, data);
    Object.keys(this).forEach((key) => {
      if (
        key.endsWith('-day') ||
        key.endsWith('-month') ||
        key.endsWith('-year')
      ) {
        console.log(typeof this[key], this[key]);
        if (this[key].trim() == '') {
          this[key] = null;
        } else {
          this[key] = Number(this[key]);
        }
      }
    });
  }
}
