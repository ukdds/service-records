import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsConcatenatedDate(
  yearOptions: ValidationOptions,
  monthOptions: ValidationOptions,
  dayOptions: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isConcatenatedDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [yearOptions, monthOptions],
      options: dayOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const year = args.object[args.constraints[0].propertyName];
          const month = args.object[args.constraints[1].propertyName];
          const day = args.object[args.property];
          try {
            const date = new Date(`${year}-${month}-${day}`);
            return !isNaN(date.getTime());
          } catch (error) {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          const yearProperty = args.constraints[0].propertyName;
          const monthProperty = args.constraints[1].propertyName;
          const dayProperty = args.property;
          return `${yearProperty}, ${monthProperty}, and ${dayProperty} must be valid parts of a date`;
        },
      },
    });
  };
}
