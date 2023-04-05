import { Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export const RequestSessionProvider: Provider = {
  provide: 'REQUEST_SESSION',
  useFactory: (req: Request) => ({ request: req, session: req.session }),
  inject: [REQUEST],
};
