import { Session, Provider } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export const RequestProvider: Provider = {
  provide: 'REQUEST',
  useFactory: (req: Request) => req,
  inject: [REQUEST],
};
