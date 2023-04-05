import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export const SessionProvider: Provider = {
  provide: 'SESSION',
  useFactory: (req: Request) => req.session,
  inject: [REQUEST],
};
