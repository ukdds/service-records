import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Validate,
} from 'class-validator';
import ServicepersonDTO from './serviceperson.dto';
import { IsZeroPadded } from '../rules/is-zero-padded.rule';
import { Session } from '@nestjs/common';

export class NavyDTO extends ServicepersonDTO {
  @IsOptional()
  @IsInt()
  'enlistedDate-year'?: number;

  @IsOptional()
  @Matches(/^(0?[1-9]|1[0-2])$/)
  @IsZeroPadded()
  'enlistedDate-month'?: string;

  @IsOptional()
  @Matches(/^(0?[1-9]|[12]\d|3[01])$/)
  @IsZeroPadded()
  'enlistedDate-day'?: string;

  @IsOptional()
  @IsInt()
  'dischargedDate-year'?: number;

  @IsOptional()
  @Matches(/^(0?[1-9]|1[0-2])$/)
  @IsZeroPadded()
  'dischargedDate-month'?: string;

  @IsOptional()
  @Matches(/^(0?[1-9]|[12]\d|3[01])$/)
  @IsZeroPadded()
  'dischargedDate-day'?: string;

  @IsOptional()
  @MaxLength(200, { message: 'Please enter a maximum of 200 characters' })
  dischargeInformation?: string;

  constructor(data: Partial<any>, @Session() session: Record<string, any>) {
    super(data, session);
  }
}

export default NavyDTO;

/*
$rules = [
                    'serviceperson-enlisted-date-day' => [
                        'nullable',
                        new Day(
                            request()->input('serviceperson-enlisted-date-month'),
                            request()->input('serviceperson-enlisted-date-year'),
                            'Enter a valid day they joined'
                        )],
                    'serviceperson-enlisted-date-month' => ['nullable',  new Month('Enter a valid month they joined')],

                    'serviceperson-enlisted-date-year'  => 'nullable|integer|max:' . date('Y'),

                    'serviceperson-discharged-date-year' => [
                        'nullable',
                        'integer',
                        'max:' . date('Y'),
                    ]
                ];
 */
