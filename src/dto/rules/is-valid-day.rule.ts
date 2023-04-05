import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidDay', async: false })
export class IsValidDay implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const day = Number(value);
    const date = new Date(1984, 0, day);
    return date.getDate() === day;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be a valid day`;
  }
}
