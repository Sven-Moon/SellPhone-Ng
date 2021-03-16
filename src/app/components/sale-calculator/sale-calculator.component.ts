import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { selectPhoneModelsList, selectStaticData } from 'src/app/stores/staticData/staticData.selectors'
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms'
import { PhoneModel } from 'src/app/models/PhoneModel'
import { PhoneType } from 'src/app/models/PhoneType'
import { addFormSection, updateCondition, updateQuantity, updateSelectedPhoneModel, updateTotal } from 'src/app/stores/sale-calculator/sale-calculator.actions'
import { Condition } from 'src/app/models/Condition'
import { SaleOrder } from 'src/app/models/SaleOrder'
import { Helpers } from 'src/app/helpers/helpers'
import { ActivatedRoute,  Router } from '@angular/router'
import { Observable } from 'rxjs'
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail'
import { selectOrderDetail, selectSaleOrder } from 'src/app/stores/sale-calculator/sale-calculator.selectors'
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

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private _store: Store<SaleOrder>,
    private fb: FormBuilder,
    private _helper: Helpers,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {

    // get sale order
    this.saleOrder$ = this._store.pipe(select(selectSaleOrder))
    this.saleOrder$.subscribe(sO => this.saleOrder = sO)

    // get conditions list
    this._store.pipe(select(selectStaticData)).subscribe(sD => {
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

  get orderDetails (): FormArray {
    return this.saleOrderForm.get('orderDetails') as FormArray
  }

  public onSelectedPhoneTypeChange (e: any, formIndex): void {
    const selectedPhoneType: PhoneType = {
      typeId: Number(e.target.selectedOptions[0].id),
      name: e.target.selectedOptions[0].label
    }
    // update store
    this._helper.storeUpdateOnTypeChange(formIndex, selectedPhoneType)

    // update form modelList value
    // TODO Move to helper
    let list: Array<PhoneModel>
    this._store.pipe(select(selectPhoneModelsList))
    .subscribe((mL) => list = mL[formIndex])

    //  update the store
    this.saleOrderForm.get('orderDetails.'+formIndex+'.modelList')
    .patchValue(list)
    if (this.orderDetails.valid) {
      this.calcSubtotal(formIndex)
    }
  }

  public onSelectedPhoneModelChange (e:any, formIndex:number): void {
    const modelId: number = e.target.selectedOptions[0].id

    const selectedPhoneModel:PhoneModel = this.phoneModelList[formIndex]
    .find( (model: PhoneModel) => model.modelId == modelId)


    this._store.dispatch(updateSelectedPhoneModel(
      { formIndex, selectedPhoneModel })
    )

    if (this.saleOrderForm.valid) { this.calcSubtotal(formIndex) }
  }

  public changeCondition (formIndex, id:string) {
    const condition:Condition = this.conditionsList
    .find((condition:Condition) => condition.id == id)

    // update the store
    this._store.dispatch(updateCondition({ formIndex, condition })
    )

    if (this.saleOrderForm.valid) { this.calcSubtotal(formIndex) }
  }

  public onQuantityChange (formIndex: number, quantity: number) {
    // update the store
    this._store.dispatch(updateQuantity({ formIndex, quantity }))

    if (this.saleOrderForm.valid) { this.calcSubtotal(formIndex) }
  }

  // public onOrderDetailsChange (formIndex: number) {
  //   // if formGroup is valid, calc subtotal

  //   if (this.orderDetails.controls[formIndex].valid) {
  //     // call calculate subtotal
  //     this.calcSubtotal(formIndex)
  //   }
  // }

  public calcSubtotal (formIndex): void {
    if (
      this.saleOrderForm
      .get('orderDetails.'+formIndex+'.phoneType').value != '' &&
      this.saleOrderForm
      .get('orderDetails.'+formIndex+'.phoneModel').value != '' &&
      this.saleOrderForm
      .get('orderDetails.'+formIndex+'.phoneCondition').value != null &&
      this.saleOrderForm
      .get('orderDetails.'+formIndex+'.quantity').value != null
    ) {
      const subTotal = this._helper.calcSubTotal(formIndex)
      // update form from store
      this.saleOrderForm.get('orderDetails.'+formIndex+'.subTotal')
      .patchValue((subTotal).toLocaleString())

      this.calcTotalSale()
    }
  }

  private calcTotalSale () {
    let total: number = 0
    this._store.pipe(select(selectOrderDetail)).subscribe(od =>
      od.forEach(line => total += line.subTotal)
    )
    this._store.dispatch(updateTotal({ total }))

    this.saleOrderForm.get('total').setValue((total))

  }

  public addOrderDetails (index) {
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

    this._store.dispatch(addFormSection())
  }

  public deleteOrderDetails (index) {
    this.orderDetails.removeAt(index)
    this.calcTotalSale()
  }

  public onSubmit () {
    // TODO: use event emitter with form value
    console.warn(this.saleOrderForm.value)

  }

  public goToOrderReview() {
    this.router.navigate(['../order-review'])
  }

}

