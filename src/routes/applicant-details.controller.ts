import { Controller, Get, Render, Req } from '@nestjs/common';
import { BaseController } from './base.controller';

@Controller('applicant-details')
export class ApplicantDetailsController extends BaseController {
  @Get()
  @Render('applicant-details/index')
  index(@Req() req) {
    return {};
  }
}
