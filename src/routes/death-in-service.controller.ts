import { Controller, Get, Render } from '@nestjs/common';
import { BaseController } from './base.controller';

@Controller('death-in-service')
export class DeathInServiceController extends BaseController {
  @Get()
  @Render('death-in-service/index')
  index() {
    return {};
  }
}
