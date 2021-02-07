import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { OrderDetail } from 'src/app/models/OrderDetail';
import { OrderDetailState } from 'src/app/stores/sale-calculator/sale-calculator.reducer';
import { selectOrderDetail } from 'src/app/stores/sale-calculator/sale-calculator.selectors';

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.component.html',
  //Template-driven method
  // template:`
  // Condition: <input type="text" [(ngModel)]="phoneCondition">
  // `,
  styleUrls: ['./sale-calculator.component.scss']
})
export class SaleCalculatorComponent implements OnInit {
  orderDetail$:Observable<OrderDetailState>;
  orderDetail: OrderDetail;
  orderDetails: OrderDetail;


  phoneTypeControl = new FormControl('');
  phoneModelControl = new FormControl('');
  phoneConditionControl = new FormControl('');

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
  }

  updateInitialValues() {
    this.phoneTypeControl.setValue(this.orderDetail.selectedPhoneType.name);
    this.phoneModelControl.setValue(this.orderDetail.selectedPhoneModel.name)
  }

  // Template-driven Method
  phoneCondition = '';
}
