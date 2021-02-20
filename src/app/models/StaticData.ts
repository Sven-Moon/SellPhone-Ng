import { Condition } from './Condition'
import { PhoneModels } from './PhoneModels'
import { PhoneType } from './PhoneType'
import { USA_State } from './USA_State'

export class StaticData {
  usaStates: Array<USA_State>;
  phoneTypes: Array<PhoneType>;
  phoneModelsByType: Array<PhoneModels>;
  conditions: Array<Condition>;
  orderStatus: Array<string>
}
