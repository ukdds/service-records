import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidMonth', async: false })
export class IsValidMonth implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const month = Number(value);
    const date = new Date(month, 0, 1);
    return date.getFullYear() === month;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be a valid month`;
  }
}
