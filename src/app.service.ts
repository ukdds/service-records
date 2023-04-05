import { Injectable, Req, Session } from '@nestjs/common';
import { Request } from 'express';
import { validate } from 'class-validator';

@Injectable()
export class AppService {
  getCookiePreferences(req) {
    if (req.cookies.cookie_preferences) {
      return req.cookies.cookie_preferences;
    }

    return null;
  }

  async validateResponse(data: object, req): Promise<boolean> {
    try {
      const errors = await validate(data);

      if (errors.length > 0) {
        req.session['flash'] = {};
        req.session['flash']['errors'] = errors.reduce(
          (acc, { property, constraints }) => {
            acc[property] = {
              text: constraints[Object.keys(constraints)[0]],
              id: property,
            };
            return acc;
          },
          {},
        );

        req.session['flash']['errorList'] = errors.map(
          ({ property, constraints }) => {
            return {
              text: constraints[Object.keys(constraints)[0]],
              href: `#${property}`,
            };
          },
        );

        req.session['flash']['old'] = req.body;
        delete req.session['flash']['old']['_csrf'];

        return false;
      }

      if (!req.session['responses']) {
        req.session['responses'] = {};
      }

      for (const key of Object.keys(data)) {
        if (!key.startsWith('_')) {
          req.session['responses'][key] = data[key];
        }
      }

      return true;
    } catch (err) {
      console.log(err);
    }
  }
}
