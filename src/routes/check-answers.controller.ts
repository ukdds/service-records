import { Controller, Get, Render, Session } from '@nestjs/common';
import { ApplicationService, ConfigService } from '../services';

@Controller('check-answers')
export class CheckAnswersController {
  constructor(
    private readonly config: ConfigService,
    private readonly application: ApplicationService,
  ) {}

  @Get()
  @Render('check-answers/index')
  index(@Session() session): string {
    const responses = {};

    return <string>{};
  }
}
