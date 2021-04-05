import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { selectPhoneModelsList, selectStaticData } from 'src/app/stores/staticData/staticData.selectors'
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms'
import { PhoneModel } from 'src/app/models/PhoneModel'
import { PhoneType } from 'src/app/models/PhoneType'
import { deleteOrderDetail, updateCondition, updateOrderItemQuantity, updateQuantity, updateSelectedPhoneModel } from 'src/app/stores/sale-calculator/sale-calculator.actions'
import { Condition } from 'src/app/models/Condition'
import { SaleOrder } from 'src/app/models/SaleOrder'
import { Helpers } from 'src/app/helpers/helpers'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail'
import { selectSaleOrder } from 'src/app/stores/sale-calculator/sale-calculator.selectors'
import { StaticData } from 'src/app/models/StaticData'

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.component.html',
  styleUrls: ['./sale-calculator.component.scss']
})
export class SaleCalculatorComponent implements OnInit {
  saleOrder: SaleOrder
  conditionsList: Array<Condition>
  phoneTypesList: Array<PhoneType>
  saleOrderForm: FormGroup
  phoneModelList: Array<PhoneModel[]>
  saleOrderDetail$: Observable<SaleOrderDetail[]>
  phoneType: number
  phoneModel: number
  saleOrder$: Observable<SaleOrder>
  staticData$: Observable<StaticData>

  constructor(
    private store: Store<SaleOrder>,
    private fb: FormBuilder,
    private helper: Helpers,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {

    // get sale order
    this.saleOrder$ = this.store.pipe(select(selectSaleOrder))
    this.saleOrder$.subscribe(sO => this.saleOrder = sO)

    // get conditions list
    this.store.pipe(select(selectStaticData)).subscribe(sD => {
      this.conditionsList = sD.conditions
      this.phoneTypesList = sD.phoneTypes
      this.phoneModelList = sD.phoneModelsList
    })

    this.saleOrderForm = this.fb.group({
      orderId: [null],
      total: [null],
      orderDate: [null],
      orderStatus: ['incomplete'],
      orderDetails: this.fb.array([
        this.fb.group({
          phoneType: [
            +this.saleOrder.orderDetails[0].phoneType.typeId,
            Validators.required
          ],
          phoneModel: [
            +this.saleOrder.orderDetails[0].phoneModel.modelId,
            Validators.required
          ],
          phoneCondition: ['', Validators.required],
          quantity: [null, [Validators.required, Validators.min(1)]],
          subTotal: [0],
          modelList: [this.phoneModelList[0]]
        })
      ])
    })

  } // ngOnInit

  get orderDetails(): FormArray {
    return this.saleOrderForm.get('orderDetails') as FormArray
  }

  public onSelectedPhoneTypeChange(e: any, formIndex): void {

    // convert event to PhoneType object
    const selectedPhoneType: PhoneType = {
      typeId: Number(e.target.selectedOptions[0].id),
      name: e.target.selectedOptions[0].label
    }
    // update type in store
    this.helper.storeUpdateOnTypeChange(formIndex, selectedPhoneType)

    // update store modelList value
    let list: Array<PhoneModel>
    this.store.pipe(select(selectPhoneModelsList))
      .subscribe((mL) => list = mL[formIndex])

    // update form: list, subtotal -> total
    this.helper.updateDetailsForm(this.saleOrderForm, formIndex, list)
  }

  public onSelectedPhoneModelChange(e: any, formIndex: number): void {
    // set modelId from event
    const modelId: number = e.target.selectedOptions[0].id
    // convert ID to model object
    const selectedPhoneModel: PhoneModel = this.phoneModelList[formIndex]
      .find((model: PhoneModel) => model.modelId == modelId)

    //send object to the store (staticData)
    this.store.dispatch(updateSelectedPhoneModel(
      { formIndex, selectedPhoneModel }
    ))

    // if (this.saleOrderForm.valid) { this.helper.calcSubtotal(formIndex) }

    // update form: subtotal -> total
    this.helper.updateDetailsForm(this.saleOrderForm, formIndex)
  }

  public changeCondition(formIndex, id: string) {
    const condition: Condition = this.conditionsList
      .find((condition: Condition) => condition.id == id)

    // update the store
    this.store.dispatch(updateCondition({ formIndex, condition })
    )

    // update form: subtotal -> total
    this.helper.updateDetailsForm(this.saleOrderForm, formIndex)
    // if (this.saleOrderForm.valid) { this.calcSubtotal(formIndex) }
  }

  public onQuantityChange(formIndex: number, quantity: number) {
    // update the store
    this.store.dispatch(updateQuantity({ formIndex, quantity }))

    // update form: subtotal -> total
    this.helper.updateDetailsForm(this.saleOrderForm, formIndex)
    // if (this.saleOrderForm.valid) {
    // this.calcSubtotal(formIndex)
    // }
  }

  public addOrderDetails(index: number) {
    this.helper.addOrderDetails(this.saleOrderForm, index)
    this.cd.detectChanges()
  }

  public deleteOrderDetails(index) {
    // remove the orderDetails item from the form
    this.orderDetails.removeAt(index)
    // remove the row from the store
    this.store.dispatch(deleteOrderDetail({ index }))

    this.saleOrderForm.updateValueAndValidity

    this.helper.calcTotalSale(this.saleOrderForm)
  }

  public onSubmit() {
    // TODO: use item count for something or axe it
    const items = this.saleOrder.orderDetails.length
    this.store.dispatch(updateOrderItemQuantity({ items }))
    this.router.navigate(['../order-summary'])
  }

}

