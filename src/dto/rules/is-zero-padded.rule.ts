import { Matches } from 'class-validator';

export function IsZeroPadded() {
  return function (object: object, propertyName: string) {
    Matches(/^(0?[1-9]|1[0-2])$/, {
      message: `${propertyName} must be between 01 and 12 for month, and 1 and 31 for day`,
    })(object, propertyName);
  };
}
