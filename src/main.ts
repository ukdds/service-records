import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as nunjucks from 'nunjucks';
import { NestExpressApplication } from '@nestjs/platform-express';
import { nestCsrf } from 'ncsrf';

import * as cookieSession from 'cookie-session';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import helmet from 'helmet';

import * as crypto from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const express = app.getHttpAdapter().getInstance();

  const assets = join(__dirname, '..', 'public');
  const views = join(__dirname, '..', 'src', 'views');

  nunjucks.configure(
    [join(__dirname, '..', 'node_modules', 'govuk-frontend'), views],
    { express },
    { watch: true },
  );

  app.useStaticAssets(assets);
  app.setBaseViewsDir(views);
  app.setViewEngine('njk');

  const cookieKey = '719fa761-69a0-4182-88f4-c6b4d5809a2a'.replace(/-/g, '');
  const csrfKey = 'ca9ea8f6-534e-44e7-bd68-924f212bb918'.replace(/-/g, '');

  app.use(
    cookieSession({
      name: 'session',
      keys: [process.env.SESSION_SECRET ?? 'secret'],
      maxAge: 24 * 60 * 60 * 1000,
      expires: false,
    }),
  );

  app.use([
    cookieParser(cookieKey),
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    }),
    nestCsrf({
      ttl: 6000,
    }),
  ]);

  app.use((req, res, next) => {
    // Create a NONCE for each request
    const nonce = Buffer.from(crypto.randomBytes(16)).toString('base64');
    res.locals.nonce = nonce;
    res.header(
      'Content-Security-Policy',
      "script-src 'nonce-" + nonce + "'; img-src www.googletagmanager.com",
    );
    next();
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
