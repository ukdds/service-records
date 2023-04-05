import { Controller, Get, Render, Session } from '@nestjs/common';
import { ConfigService } from '../services/config.service';
import { BaseController } from './base.controller';
@Controller('serviceperson-details')
export class ServicepersonDetailsController extends BaseController {
  @Get()
  @Render('serviceperson-details/index')
  index(@Session() session) {
    const elementData = {};

    switch (session['responses']['service']) {
      case 'army':
        if (session['responses']['diedInService'] == ConfigService.YES) {
          elementData['dischargedDateLabel'] = 'Year of discharge';
          elementData['regimentHint'] = 'At time of death';
          elementData['showExtendedFields'] = false;
        } else {
          elementData['dischargedDateLabel'] = 'Year of death in service';
          elementData['regimentHint'] = 'At time of discharge';
          elementData['showExtendedFields'] = true;
        }

        const reasonForLeaving = [
          'Normal demobilisation after WW2',
          'Completion of regular engagement',
          'Medical discharge',
          'End of National Service',
          'Other',
        ];

        elementData['reasonForLeaving'] = [];
        for (let i = 0; i < reasonForLeaving.length; i++) {
          elementData['servicepersonReasonForLeaving'].push({
            value: `reasonForLeaving${i + 1}`,
            text: `${reasonForLeaving[i]}`,
            checked: session['reasonForLeaving'] == `reasonForLeaving${i + 1}`,
          });
        }

        // Extended fields
        const extendedFields = {
          reasonForLeaving: [
            'Normal demobilisation after WW2',
            'Completion of regular engagement',
            'Medical discharge',
            'End of National Service',
            'Other',
          ],
        };

        break;

      case 'home-guard':
        if (session['responses']['diedInService'] == ConfigService.YES) {
          elementData['dischargedDateLabel'] = 'Date of death in service';
          elementData['regimentHint'] = 'At time of death';
          elementData['showExtendedFields'] = false;
        } else {
          elementData['dischargedDateLabel'] = 'Date they left';
          elementData['regimentHint'] = 'At time of discharge';
          elementData['showExtendedFields'] = true;
        }
        break;

      case 'navy':
        if (session['responses']['diedInService'] == ConfigService.YES) {
          elementData['dischargedDateLabel'] = 'Date of death in service';
          elementData['regimentHint'] = 'At time of death';
          elementData['showExtendedFields'] = false;
        } else {
          elementData['dischargedDateLabel'] = 'Date they left';
          elementData['regimentHint'] = 'At time of discharge';
          elementData['showExtendedFields'] = true;
        }

        break;
      case 'raf':
        break;
    }

    console.log(session, elementData);

    return { elementData: elementData };
  }
}
