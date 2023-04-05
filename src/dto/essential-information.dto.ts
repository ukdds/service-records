import { IsNotEmpty, IsNumber, IsOptional, Max } from 'class-validator';
import { BaseDTO } from './base.dto';

export class EssentialInformationDTO extends BaseDTO {
  @IsNotEmpty({ message: 'Enter a first name' })
  firstName: string;

  @IsOptional()
  middleName: string;

  @IsNotEmpty({ message: 'Enter a last name' })
  lastName: string;

  @Max(new Date().getFullYear() - 1, {
    message: 'Year joined service must be in the past',
  })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Enter a valid year' })
  @IsNotEmpty({ message: 'Enter a date of birth, even if it is an estimate' })
  'dateOfBirth-year': number;
}

export default EssentialInformationDTO;
