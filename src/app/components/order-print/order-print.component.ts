import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { SaleOrder } from 'src/app/models/SaleOrder';
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail';
import { User } from 'src/app/models/User';
import { selectOrderDetail, selectSaleOrder } from 'src/app/stores/sale-calculator/sale-calculator.selectors';

@Component({
  selector: 'app-order-print',
  templateUrl: './order-print.component.html',
  styleUrls: ['./order-print.component.scss']
})
export class OrderPrintComponent implements OnInit {
  formState$: Observable<FormGroupState<User>>
  orderDetails$: Observable<SaleOrderDetail[]>
  saleOrder$: Observable<SaleOrder>
  // total: number = null

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.orderDetails$ = this.store.pipe(select(selectOrderDetail))
    this.saleOrder$ = this.store.pipe(select(selectSaleOrder))
    // this.saleOrder$.subscribe(so => this.total = so.total)
  }

  onSubmit() {

  }
}
