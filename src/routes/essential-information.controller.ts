import { Controller, Get, Render } from '@nestjs/common';
import { BaseController } from './base.controller';

@Controller('essential-information')
export class EssentialInformationController extends BaseController {
  @Get()
  @Render('essential-information')
  index(): string {
    return <string>{};
  }
}
