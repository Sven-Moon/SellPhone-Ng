import { PhoneModel } from './PhoneModel';
import { PhoneType } from './PhoneType';

export class SaleOrderDetail {
  constructor(
    public lineId: number,
    public selectedPhoneType: PhoneType,
    public selectedPhoneModel: PhoneModel,
    public phoneCondition: number,
    public quantity: number,
    public subTotal: number
  ) {}
}
