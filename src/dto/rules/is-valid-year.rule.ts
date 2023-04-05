import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidYear', async: false })
export class IsValidYear implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const year = Number(value);
    const date = new Date(year, 0, 1);
    return date.getFullYear() === year;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be a valid year`;
  }
}
