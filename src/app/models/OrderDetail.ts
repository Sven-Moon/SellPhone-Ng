import { PhoneType } from "./PhoneType";

export interface OrderDetail {
  lineId: number,
  selectedPhoneType: PhoneType,
  phoneModelId: number,
  phoneCondition: number,
  quantity: number,
  subTotal: number
}
