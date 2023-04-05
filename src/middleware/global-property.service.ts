import { Injectable, NestMiddleware } from '@nestjs/common';
import { ApplicationService, ConfigService } from '../services';

@Injectable()
export class GlobalProperty implements NestMiddleware {
  constructor(
    private readonly application: ApplicationService,
    private readonly config: ConfigService,
  ) {}

  use(req: any, res: any, next: () => void) {
    let showCookie = true;
    const hideBackLink = req.originalUrl === '/';

    try {
      if (req.hasOwnProperty('cookies')) {
        showCookie = req.cookies.hasOwnProperty('cookie_preferences')
          ? !JSON.parse(req.cookies.cookie_preferences).seen
          : true;
      }
    } catch (error) {
      showCookie = true;
    }

    res.locals = {
      ...res.locals,
      showCookieBanner: showCookie,
      serviceName: "Apply for a deceased person's military record",
      hideBackLink: hideBackLink,
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXX',
      session: req.session,
      saveButtonLabel: ConfigService.SAVE_BUTTON_LABEL,
      old: req.session.responses,
    };

    if (req.method === 'GET') {
      res.locals.csrfToken = req.csrfToken();
    }

    if (req.session?.flash?.old) {
      for (const key of Object.keys(req.session?.flash?.old)) {
        if (key !== '_csrf') {
          res.locals['old'][key] = req.session?.flash?.old[key];
        }
      }
      //@todo: remove the comment to delete the old property flash data
      // delete req.session?.flash?.old;
    }

    if (req.session?.flash?.errors) {
      res.locals.errors = req.session?.flash?.errors;
      delete req.session?.flash?.errors;
    }

    if (req.session?.flash?.errorList) {
      res.locals.errorList = req.session?.flash?.errorList;
      delete req.session?.flash?.errorList;
    }

    // Establish if a service record is held by the MOD
    // res.locals.serviceRecordHeld = true;
    // switch (req.session?.old?.service) {
    //   case ConfigService.SERVICE_ARMY:
    //     if (
    //       req.session.old?.hasOwnProperty('dischargedDate-year') &&
    //       req.session.old['dischargedDate-year'] <= 1940
    //     ) {
    //       res.locals.serviceRecordHeld = false;
    //     }
    //     break;
    //   case ConfigService.SERVICE_NAVY:
    //     if (
    //       req.session.old?.hasOwnProperty('dateOfBirth-year') &&
    //       req.session.old['dateOfBirth-year'] <= 1890
    //     ) {
    //       res.locals.serviceRecordHeld = false;
    //     }
    //     break;
    //   case ConfigService.SERVICE_RAF:
    //     break;
    //   case ConfigService.SERVICE_HOMEGUARD:
    //     break;
    // }

    next();
  }
}
