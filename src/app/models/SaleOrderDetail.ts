import { Condition } from './Condition'
import { PhoneModel } from './PhoneModel'
import { PhoneType } from './PhoneType'

export interface SaleOrderDetail {
  phoneType: PhoneType,
  phoneModel: PhoneModel,
  phoneCondition: Condition,
  quantity: number,
  subTotal: number
}
