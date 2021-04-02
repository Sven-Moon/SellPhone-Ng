import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { SaleOrder } from 'src/app/models/SaleOrder';
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail';
import { User } from 'src/app/models/User';
import { selectContactInfoForm, selectContactInfoState } from 'src/app/stores/contact-info/contact-info.selectors';
import { selectOrderDetail, selectSaleOrder } from 'src/app/stores/sale-calculator/sale-calculator.selectors';
import * as fromContactInfo from '../../stores/contact-info/contact-info.reducer'
import { State } from '../../stores/contact-info/contact-info.reducer';

@Component({
  selector: 'app-order-print',
  templateUrl: './order-print.component.html',
  styleUrls: ['./order-print.component.scss']
})
export class OrderPrintComponent implements OnInit {
  contactInfo$: Observable<FormGroupState<User>>
  orderDetails$: Observable<SaleOrderDetail[]>
  saleOrder$: Observable<SaleOrder>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.contactInfo$ = this.store.pipe(select(selectContactInfoForm))
    this.orderDetails$ = this.store.pipe(select(selectOrderDetail))
    this.saleOrder$ = this.store.pipe(select(selectSaleOrder))
  }

  printPage() {
    window.print();
  }
}
