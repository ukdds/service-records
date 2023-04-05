import { IsOptional } from 'class-validator';
import { BaseDTO } from '../base.dto';

export class ServicepersonDTO extends BaseDTO {
  @IsOptional()
  serviceNumber?: string;

  @IsOptional()
  rank?: string;
}

export default ServicepersonDTO;
