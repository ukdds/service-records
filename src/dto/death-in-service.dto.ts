import { IsIn, IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

export class DeathInServiceDTO extends BaseDTO {
  @IsNotEmpty({ message: 'State if they died in service' })
  @IsIn(['Yes', 'No'], {
    message: 'State if they died in service',
  })
  diedInService: string;
}

export default DeathInServiceDTO;
