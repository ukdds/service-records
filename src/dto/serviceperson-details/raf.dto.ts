import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import ServicepersonDTO from './serviceperson.dto';

export class RafDTO extends ServicepersonDTO {
  enlistedDate?: string;

  diedInService?: boolean;

  furtherInformation?: string;
}

export default RafDTO;
