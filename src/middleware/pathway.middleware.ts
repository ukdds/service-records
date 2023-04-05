import { Injectable, NestMiddleware } from '@nestjs/common';
import { ApplicationService, ConfigService } from '../services';

@Injectable()
export class Pathway implements NestMiddleware {
  constructor(
    private readonly config: ConfigService,
    private readonly application: ApplicationService,
  ) {}

  use(req: any, res: any, next: () => void) {
    const baseUrl = req.baseUrl.replace(/\/$/, '') || '/';
    const application = this.application;

    if (req.url.match(/(css|js|img|fonts|favicon|images)/)) {
      return next();
    }

    if (baseUrl !== '/') {
      const lastIncompleteSection = application.firstIncompleteSection();

      if (baseUrl !== lastIncompleteSection) {
        return res.redirect(lastIncompleteSection);
      }
    }

    next();
  }
}
