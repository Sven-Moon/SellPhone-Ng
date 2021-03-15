import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SaleOrder } from 'src/app/models/SaleOrder';
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail';
import { selectOrderDetail, selectSaleOrder } from 'src/app/stores/sale-calculator/sale-calculator.selectors';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss']
})
export class OrderReviewComponent implements OnInit {
  orderDetails$: Observable<SaleOrderDetail[]>
  saleOrder$: Observable<SaleOrder>
  total: number
  contactForm: FormGroup

  constructor(
    private _store: Store<any>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.orderDetails$ = this._store.pipe(select(selectOrderDetail))
    this.saleOrder$ = this._store.pipe(select(selectSaleOrder))
    this.saleOrder$.subscribe(so => this.total = so.total)

    this.contactForm = this.fb.group({
      name: [null],
      lastName: [null],
      email: [null],
      phone: [null]
    })
  }

}
