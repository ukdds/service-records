import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import ServicepersonDTO from './serviceperson.dto';

export class HomeGuardDTO extends ServicepersonDTO {
  enlistedDate?: string;

  dischargedDate?: string;

  countyServed?: string;

  addressWhenJoined: string;

  battalion?: string;
}

export default HomeGuardDTO;
