import { PhoneModel } from './PhoneModel';
import { PhoneType } from './PhoneType';

export interface SaleOrderDetail {
  lineId: number;
  selectedPhoneType: PhoneType;
  selectedPhoneModel: PhoneModel;
  phoneCondition: number;
  quantity: number;
  subTotal: number;
}
