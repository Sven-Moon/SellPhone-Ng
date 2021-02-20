import { PhoneModel } from './PhoneModel'
import { PhoneType } from './PhoneType'

export interface SaleOrderDetail {
  lineId: number,
  phoneType: PhoneType,
  phoneModel: PhoneModel,
  phoneCondition: number,
  quantity: number,
  subTotal: number
}
