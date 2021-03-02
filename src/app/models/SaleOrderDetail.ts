import { Condition } from './Condition'
import { PhoneModel } from './PhoneModel'
import { PhoneType } from './PhoneType'

export interface SaleOrderDetail {
  lineId: number,
  phoneType: PhoneType,
  phoneModel: PhoneModel,
  phoneCondition: Condition,
  quantity: number,
  subTotal: number
}
