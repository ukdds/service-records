import { Controller, Get, Redirect, Render, Res } from '@nestjs/common';
import { ConfigService } from '../services';
import { BaseController } from './base.controller';

@Controller()
export class StartController extends BaseController {
  services = ConfigService.SERVICE_BRANCHES ?? {};
  section = ConfigService.SECTION_SERVICE;

  @Get()
  @Render('start')
  index() {
    return {
      services: Object.keys(this.services).map((service) => {
        return {
          value: service,
          text: this.services[service],
        };
      }),
    };
  }

  @Get('cancel-application')
  @Redirect('/')
  reset(@Res() res) {
    res.clearCookie('session');
  }
}
