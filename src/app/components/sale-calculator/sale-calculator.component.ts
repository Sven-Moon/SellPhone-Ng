import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail';
import { selectSaleOrderDetail } from 'src/app/stores/sale-calculator/sale-calculator.selectors';
import { selectPhoneModelsList, selectStaticData } from 'src/app/stores/staticData/staticData.selectors';
import { Validators,  FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { StaticData } from 'src/app/models/StaticData';
import { PhoneModel } from 'src/app/models/PhoneModel';
import { PhoneType } from 'src/app/models/PhoneType';
import { updateSelectedPhoneModel } from 'src/app/stores/sale-calculator/sale-calculator.actions';
import { Observable } from 'rxjs';
import { Helpers } from 'src/app/helpers/helpers';
import { Condition } from 'src/app/models/Condition';

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.component.html',
  styleUrls: ['./sale-calculator.component.scss']
})
export class SaleCalculatorComponent implements OnInit {

  orderDetail: SaleOrderDetail;
  conditionsList: Array<Condition>;
  phoneModelList$: Observable<Array<PhoneModel>>;
  phoneTypesList: Array<PhoneType>;
  saleOrderForm: FormGroup;




get orderDetails() {
  return this.saleOrderForm.get('orderDetails') as FormArray;
}

  constructor(
    private _store: Store<SaleOrderDetail>,
    private _storeSD: Store<StaticData>,
    private fb: FormBuilder,
    private _helper: Helpers
  ) { }

  ngOnInit() {
  // subscribe to OrderDetail
    this._store.pipe(select(selectSaleOrderDetail))
      .subscribe(oD => this.orderDetail = oD);
  // get conditions list
    this._store.pipe(select(selectStaticData))
      .subscribe(sD => {
        this.conditionsList = sD.conditions;
        this.phoneTypesList = sD.phoneTypes;
      });
  // subscribe to store
    this.phoneModelList$ = this._storeSD.pipe(select(selectPhoneModelsList));
  // update dropdown values
    // this.updateValues();


    this.saleOrderForm = this.fb.group({
      orderId: [{value: '001', disabled: true}, Validators.required],
      total: [null, Validators.required],
      orderDate: [null, Validators.required],
      orderStatus: ['incomplete'],
      orderDetails: this.fb.array([
        this.fb.group({
          phoneTypeControl: [Number(this.orderDetail.selectedPhoneType.typeId), Validators.required],
          phoneModelControl: [Number(this.orderDetail.selectedPhoneModel.modelId), Validators.required],
          phoneConditionControl: ['', Validators.required],
          quantity: [1, Validators.required],
          subTotal:  [0, Validators.required],
          lineId: [1, Validators.required]
        })
      ])
    });

  } // ngOnInit


  private updateValues() {
    // this.saleOrderForm.get('orderDetails')
    //   .setValue(
    //     {phoneTypeControl: Number(this.orderDetail.selectedPhoneType.typeId)}
    // );

    // this.saleOrderForm.controls.orderDetails.controls.phoneModelControl
    //   .setValue(
    //     Number(this.orderDetail.selectedPhoneModel.modelId)
    // );

    console.log(this.saleOrderForm.value);
  }

  public changeCondition(e) {
    // this.saleOrderForm.patchValue({
    //   phoneConditionControl: e.target.value
    //   // { onlySelf: true}
    // })
  }

  public onSelectedPhoneTypeChange(e: any): void {

    const selectedPhoneType: PhoneType = {
      typeId: Number(e.target.selectedOptions[0].id),
      name: e.target.selectedOptions[0].innerText.trim()
    };

    this._helper.storeUpdateOnTypeChange(selectedPhoneType);
  }

  public onSelectedPhoneModelChange(e): void {

    const modelId: number = e.target.selectedOptions[0].id;
    const maxVal = this._helper.getMaxValue(modelId);
    const selectedPhoneModel: PhoneModel = {
      modelId,
      name: e.target.selectedOptions[0].label,
      maxValue: maxVal
    };
    // this.phoneMaxValue = this.onPhoneModelSelect(
    //   selectedPhoneModel.modelId
    // );
    this._store.dispatch(updateSelectedPhoneModel(
      { selectedPhoneModel }));
  }

  public calcSale(): number {
    const total = 0;
    let maxValue, conditionMod, quantity: number = null;
    maxValue = this.orderDetail.selectedPhoneModel.maxValue;
    conditionMod = this.orderDetail.selectedPhoneModel.maxValue;
    quantity = this.orderDetail.selectedPhoneModel.maxValue;

    return total;
  }

  public addOrderDetails() {
    this.orderDetails.push(this.fb.group({}));
  }

  public deleteOrderDetails(index) {
    this.orderDetails.removeAt(index);
  }

  public onSubmit() {
    // TODO: use event emitter with form value
    console.warn(this.saleOrderForm.value);
  }

  public onFormChange() {
    if (this.saleOrderForm.valid) {

    }

  }

}
