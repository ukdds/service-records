import { IsNotEmpty, Max } from 'class-validator';
import ServicepersonDTO from './serviceperson.dto';
import { ConfigService } from '../../services';

export class ArmyDTO extends ServicepersonDTO {
  @IsNotEmpty({ message: 'Enter a valid year' })
  @Max(new Date().getFullYear(), {
    message: (session: Record<string, any>) =>
      session.responses.diedInService === ConfigService.YES
        ? 'Year of death must be in the past'
        : 'Year of discharge must be in the past',
  })
  'dischargedDate-year': number;
}

export default ArmyDTO;

/**
 *  switch (session('service', ServiceBranch::ARMY)) {

 *
 *             case ServiceBranch::NAVY:
 *                 $rules = [
 *                     'serviceperson-enlisted-date-day' => [
 *                         'nullable',
 *                         new Day(
 *                             request()->input('serviceperson-enlisted-date-month'),
 *                             request()->input('serviceperson-enlisted-date-year'),
 *                             'Enter a valid day they joined'
 *                         )],
 *                     'serviceperson-enlisted-date-month' => ['nullable',  new Month('Enter a valid month they joined')],
 *                     'serviceperson-enlisted-date-year'  => 'nullable|integer|max:' . date('Y'),
 *                     'serviceperson-discharged-date-day' => ['nullable',
 *                         new Day(
 *                             request()->input('serviceperson-discharged-date-month'),
 *                             request()->input('serviceperson-discharged-date-year'),
 *                             session('serviceperson-died-in-service', Constant::YES) === Constant::YES ?
 *                                 'Enter a valid day they died in service' :
 *                                 'Enter a valid day they left service'
 *                         )],
 *                     'serviceperson-discharged-date-month' => ['nullable', new Month(
 *                         session('serviceperson-died-in-service', Constant::YES) === Constant::YES ?
 *                             'Enter a valid month they died in service' :
 *                             'Enter a valid month they left service'
 *                     )],
 *                     'serviceperson-discharged-date-year' => [
 *                         'nullable',
 *                         'integer',
 *                         'max:' . date('Y'),
 *                     ]
 *                 ];
 *                 break;
 *
 *             case ServiceBranch::RAF:
 *                 $rules = [
 *                     'serviceperson-enlisted-date-day' => [
 *                         'nullable',
 *                         new Day(
 *                             request()->input('serviceperson-enlisted-date-month'),
 *                             request()->input('serviceperson-enlisted-date-year'),
 *                             'Enter a valid day they joined'
 *                         )],
 *                     'serviceperson-enlisted-date-month' => ['nullable',  new Month('Enter a valid month they joined')],
 *                     'serviceperson-enlisted-date-year'  => 'nullable|integer|max:' . date('Y'),
 *                     'serviceperson-discharged-date-day' => ['nullable',
 *                         new Day(
 *                             request()->input('serviceperson-discharged-date-month'),
 *                             request()->input('serviceperson-discharged-date-year'),
 *                             session('serviceperson-died-in-service', Constant::YES) === Constant::YES ?
 *                                 'Enter a valid day they died in service' :
 *                                 'Enter a valid day they left service'
 *                         )],
 *                     'serviceperson-discharged-date-month' => ['nullable', new Month(
 *                         session('serviceperson-died-in-service', Constant::YES) === Constant::YES ?
 *                             'Enter a valid month they died in service' :
 *                             'Enter a valid month they left service'
 *                     )],
 *                     'serviceperson-discharged-date-year' => [
 *                         'nullable',
 *                         'integer',
 *                         'max:' . date('Y'),
 *                         'min:1920',
 *                     ]
 *                 ];
 *                 break;
 *         }
 */
