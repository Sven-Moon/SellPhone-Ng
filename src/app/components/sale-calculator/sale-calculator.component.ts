import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { selectPhoneModelsList, selectStaticData } from 'src/app/stores/staticData/staticData.selectors'
import { Validators, FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms'
import { PhoneModel } from 'src/app/models/PhoneModel'
import { PhoneType } from 'src/app/models/PhoneType'
import { addOrderDetail, deleteOrderDetail, updateCondition, updateOrderItemQuantity, updateQuantity, updateSelectedPhoneModel, updateTotal } from 'src/app/stores/sale-calculator/sale-calculator.actions'
import { Condition } from 'src/app/models/Condition'
import { SaleOrder } from 'src/app/models/SaleOrder'
import { Helpers } from 'src/app/helpers/helpers'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail'
import { selectOrderDetail, selectSaleOrder } from 'src/app/stores/sale-calculator/sale-calculator.selectors'
import { StaticData } from 'src/app/models/StaticData'
import { validate } from 'ngrx-forms'

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
    private router: Router
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
          quantity: [null, Validators.required],
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

    // //  update the form model list
    // this.saleOrderForm.get('orderDetails.' + formIndex + '.modelList')
    //   .patchValue(list)
    // update the subtotal
    // if (this.orderDetails.valid) {
    //   this.calcSubTotal(formIndex)
    // }
    // this.saleOrderForm.updateValueAndValidity
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

  // public calcSubtotal(formIndex): void {

  //   if (this.saleOrderForm.get('orderDetails.' + formIndex).valid) {

  //     const subTotal = this.helper.calcSubTotal(formIndex)
  //     // update form from store
  //     this.saleOrderForm.get('orderDetails.' + formIndex + '.subTotal')
  //       .patchValue((subTotal).toLocaleString())

  //     this.calcTotalSale()
  //   } else {
  //     this.saleOrderForm.get('orderDetails.' + formIndex + '.subTotal')
  //       .setValue(0)
  //   }
  // }

  private calcTotalSale() {
    let total: number = 0
    this.store.pipe(select(selectOrderDetail)).subscribe(od =>
      od.forEach(line => total += line.subTotal)
    )
    this.store.dispatch(updateTotal({ total }))

    this.saleOrderForm.get('total').setValue((total))

  }

  public addOrderDetails(index: number) {
    let orderDetailArray = this.saleOrderForm.controls.orderDetails as FormArray
    let orderDetailGroup: FormGroup = this.fb.group({
      phoneType: '',
      phoneModel: '',
      phoneCondition: '',
      quantity: null,
      subTotal: null,
      modelList: []
    })

    orderDetailArray.insert(index + 1, orderDetailGroup)
    this.saleOrderForm.updateValueAndValidity
    this.store.dispatch(addOrderDetail({ index }))

  }

  public deleteOrderDetails(index) {
    // remove the orderDetails item from the form
    this.orderDetails.removeAt(index)
    this.store.dispatch(deleteOrderDetail({ index }))

    this.calcTotalSale()
  }

  public onSubmit() {
    const items = this.saleOrder.orderDetails.length
    this.store.dispatch(updateOrderItemQuantity({ items }))
  }

}

