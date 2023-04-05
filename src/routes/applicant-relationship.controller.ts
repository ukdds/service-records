import { Controller, Get, Render } from '@nestjs/common';
import { BaseController } from './base.controller';

@Controller('applicant-relationship')
export class ApplicantRelationshipController extends BaseController {
  @Get()
  @Render('applicant-relationship/index')
  index(): string {
    return <string>{};
  }
}
