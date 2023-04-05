import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsDate(
  yearProp: string,
  monthProp: string,
  dayProp: string,
  errorMessage?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const year = args.object[yearProp];
          const month =
            args.object[monthProp]?.toString().padStart(2, '0') || '01';
          const day = args.object[dayProp]?.toString().padStart(2, '0') || '01';
          try {
            const date = new Date(`${year}-${month}-${day}`);
            return !isNaN(date.getTime());
          } catch (error) {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return (
            errorMessage ||
            `${yearProp}, ${monthProp}, and ${dayProp} must form a valid date`
          );
        },
      },
    });
  };
}
