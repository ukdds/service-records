import { IsIn, IsNotEmpty } from 'class-validator';
import { ConfigService } from '../services';
import { BaseDTO } from './base.dto';

export class StartDTO extends BaseDTO {
  @IsNotEmpty({ message: 'Select a service' })
  @IsIn(ConfigService.SERVICE_CODES, {
    message: 'Select a service',
  })
  service: string;
}

export default StartDTO;
