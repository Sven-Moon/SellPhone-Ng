import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { OrderDetail } from 'src/app/models/OrderDetail';
import { selectOrderDetail } from 'src/app/stores/sale-calculator/sale-calculator.selectors';
import { selectStaticData } from 'src/app/stores/staticData/staticData.selectors';
import {FormGroup, Validators,  FormControl } from '@angular/forms';

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.component.html',
  styleUrls: ['./sale-calculator.component.scss']
})
export class SaleCalculatorComponent implements OnInit {
  orderDetail: OrderDetail;
  conditionsList: Array<string>;

  //TO DO: Add form group
  saleOrderForm = new FormGroup({
  phoneTypeControl: new FormControl(''),
  phoneModelControl: new FormControl(''),
  phoneConditionControl: new FormControl('')
});

  constructor(
    private _store: Store<OrderDetail>
  ) { }

  ngOnInit() {
  // subscribe to selected Phone Type
    this._store.pipe(select(selectOrderDetail))
      .subscribe(oD => this.orderDetail = oD);
  // subscribe to selected Phone Model
    this._store.pipe(select(selectOrderDetail))
      .subscribe(oD => this.orderDetail = oD);
  // Reactive Method
    this.updateInitialValues()
  // get conditions list
    this._store.pipe(select(selectStaticData))
      .subscribe(sD => this.conditionsList = sD.conditions)
  }

  private updateInitialValues() {
    this.saleOrderForm.patchValue({
      phoneTypeControl: this.orderDetail.selectedPhoneType.name,
      phoneModelControl:this.orderDetail.selectedPhoneModel.name
    })
  }

  public changeCondition(e) {
    this.saleOrderForm.patchValue({
      phoneConditionControl: e.target.value
      // { onlySelf: true}
    })
  }

  // **** Form *****
  // registrationForm = this.fb.group({
  //   phoneTypeControl: [''],
  //   phoneModelControl: [''],
  //   phoneCondition: ['']
  // })
}
