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
  template:` 
  Condition: <input type="text" [(ngModel)]="phonecondition">
  `,
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
    // TO DO: Add phoneTypes & phoneModels 
    // probably move selected phoneType/Model to calculator store
    this._store.pipe(select(selectOrderDetail))
      .subscribe(oD => this.orderDetail = oD);
    // phoneModel$ = this._store.dispatch(select(selectedPhoneModel));
  // Reactive Method
    this.updateInitialValues()
  }

  updateInitialValues() {
    this.phoneTypeControl.setValue(this.orderDetail.phoneTypeId)
    this.phoneModelControl.setValue(this.orderDetail.phoneModelId)
  }

  // Template-driven Method
  phoneCondition = '';
}
