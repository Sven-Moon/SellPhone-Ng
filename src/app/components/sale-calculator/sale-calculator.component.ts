import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { OrderDetail } from 'src/app/models/OrderDetail';
import { selectOrderDetail } from 'src/app/stores/sale-calculator/sale-calculator.selectors';
import { selectPhoneModelsList, selectStaticData } from 'src/app/stores/staticData/staticData.selectors';
import {FormGroup, Validators,  FormControl } from '@angular/forms';
import { StaticData } from 'src/app/models/StaticData';
import { PhoneModel } from 'src/app/models/PhoneModel';
import { PhoneType } from 'src/app/models/PhoneType';
import { updateSelectedPhoneModel, updateSelectedPhoneType } from 'src/app/stores/sale-calculator/sale-calculator.actions';
import { updatePhoneModelsList } from 'src/app/stores/staticData/staticData.actions';

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.component.html',
  styleUrls: ['./sale-calculator.component.scss']
})
export class SaleCalculatorComponent implements OnInit {
  orderDetail: OrderDetail;
  conditionsList: Array<string>;
  phoneModelList: Array<PhoneModel>;
  phoneTypesList: Array<PhoneType>

  saleOrderForm = new FormGroup({
    phoneTypeControl: new FormControl(''),
    phoneModelControl: new FormControl(''),
    phoneConditionControl: new FormControl(''),
    quantity: new FormControl(''),
    subTotal: new FormControl('') ,
    lineId: new FormControl('')
});

  constructor(
    private _store: Store<OrderDetail>,
    private _storeSD: Store<StaticData>
  ) { }


  ngOnInit() {
  // subscribe to OrderDetail
    this._store.pipe(select(selectOrderDetail))
      .subscribe(oD => this.orderDetail = oD);
  // get conditions list
    this._store.pipe(select(selectStaticData))
      .subscribe(sD => {
        this.conditionsList = sD.conditions;
        this.phoneModelList = sD.phoneModelsList;
        this.phoneTypesList = sD.phoneTypes;
      });
  // subscribe to store
    this._storeSD.pipe(select(selectPhoneModelsList));
  //update dropdown values
    this.updateValues();
  }


  private updateValues() {
    this.saleOrderForm.patchValue({
      phoneTypeControl: this.orderDetail.selectedPhoneType,
      phoneModelControl:this.orderDetail.selectedPhoneModel
    });
  }

  public changeCondition(e) {
    this.saleOrderForm.patchValue({
      phoneConditionControl: e.target.value
      // { onlySelf: true}
    })
  }

  public onSelectedPhoneTypeChange(e:any):void {
    let selectedPhoneType:PhoneType = {
      "typeId": e.target.selectedOptions[0].id,
      "name": e.target.selectedOptions[0].innerText
    };
    // send phone type to sale-calculator
    this._store.dispatch(updateSelectedPhoneType(
      { phoneType: selectedPhoneType } ));
    // return array of models matching typeId
    this._store.dispatch(updatePhoneModelsList({
      typeId: selectedPhoneType.typeId
    }));
    this.updateValues();
  }

  public onSelectedPhoneModelChange(e):void {
    let selectedPhoneModel:PhoneModel = {
      modelId: e.target.selectedOptions[0].id,
      name: e.target.selectedOptions[0].innerText
    }
    // this.phoneMaxValue = this.onPhoneModelSelect(
    //   selectedPhoneModel.modelId
    // );
    this._store.dispatch(updateSelectedPhoneModel(
      { selectedPhoneModel: selectedPhoneModel }))
  }

}
