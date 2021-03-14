import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { selectPhoneModelsList, selectStaticData } from 'src/app/stores/staticData/staticData.selectors'
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms'
import { PhoneModel } from 'src/app/models/PhoneModel'
import { PhoneType } from 'src/app/models/PhoneType'
import { addFormSection, updateCondition, updateQuantity } from 'src/app/stores/sale-calculator/sale-calculator.actions'
import { Condition } from 'src/app/models/Condition'
import { SaleOrder } from 'src/app/models/SaleOrder'
import { Helpers } from 'src/app/helpers/helpers'
import { ActivatedRoute,  Router } from '@angular/router'
import { Observable } from 'rxjs'
import { SaleOrderDetail } from 'src/app/models/SaleOrderDetail'


@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.component.html',
  styleUrls: ['./sale-calculator.component.scss']
})
export class SaleCalculatorComponent implements OnInit {
  saleOrder: SaleOrder;
  conditionsList: Array<Condition>;
  phoneTypesList: Array<PhoneType>;
  saleOrderForm: FormGroup;
  phoneModelList: Array<PhoneModel[]>
  saleOrderDetail$: Observable<SaleOrderDetail>
  phoneType: number;
  phoneModel: number;


  get orderDetails () {
    return this.saleOrderForm.get('orderDetails') as FormArray
  }

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private _store: Store<SaleOrder>,
    private fb: FormBuilder,
    private _helper: Helpers,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.route.paramMap.subscribe(params => {
      this.phoneType = +params.get('type'),
      this.phoneModel = +params.get('model')
    })

    // this._store.pipe(select(selectSaleOrder))
    //   // eslint-disable-next-line no-return-assign
    //   .subscribe(sO => this.saleOrder = sO)
    // get conditions list
    this._store.pipe(select(selectStaticData))
    .subscribe(sD => {
      this.conditionsList = sD.conditions
      this.phoneTypesList = sD.phoneTypes
      this.phoneModelList = sD.phoneModelsList
    })

    this.saleOrderForm = this.fb.group({
      orderId: [{ value: '001', disabled: true }, Validators.required],
      total: [null],
      orderDate: [null],
      orderStatus: ['incomplete'],
      orderDetails: this.fb.array([
        this.fb.group({
          phoneType: [this.phoneType, Validators.required],
          phoneModel: [this.phoneModel, Validators.required],
          phoneCondition: ['', Validators.required],
          quantity: [null, Validators.required],
          subTotal: [0],
          lineId: [1, Validators.required],
          modelList: [this.phoneModelList[0]]
          // modelsData: [ PhoneModel]
        })

      ])
    })
  } // ngOnInit

  public changeCondition (formIndex, id:string) {
    const condition:Condition = this.conditionsList.find((condition) =>
      condition.id == id)

    // update the store
    this._store.dispatch(updateCondition({ formIndex, condition })
    )

  }

  public onQuantityChange (formIndex: number, quantity: number) {
    // update the store
    this._store.dispatch(updateQuantity({ formIndex, quantity }))
  }

  public onOrderDetailsChange (formIndex: number) {
    // if formGroup is valid, calc subtotal

    if (this.orderDetails.controls[formIndex].valid) {
      // call calculate subtotal
      this.calcSubtotal(formIndex)
    }
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

    // // update the store
    this.saleOrderForm.get('orderDetails.'+formIndex+'.modelList')
      .patchValue(list)
  }

  public onSelectedPhoneModelChange (e, formIndex:number): void {
    const modelId: number = e.target.selectedOptions[0].id

    const selectedPhoneModel = this.phoneModelList[formIndex].find( (model) => model.modelId == modelId)


    // this._store.dispatch(updateSelectedPhoneModel(
      // { formIndex, selectedPhoneModel }))
  }

  public calcSubtotal (formIndex): void {

    const typeId: Number =
      this.saleOrderForm.get('orderDetails.' + formIndex + '.phoneType').value
    const modelId: Number =
      this.saleOrderForm.get('orderDetails.' + formIndex + '.phoneModel').value
    const conditionMod: string =
      this.saleOrderForm.get('orderDetails.' + formIndex + '.phoneCondition').value
    const quantity: Number =
      this.saleOrderForm.get('orderDetails.' + formIndex + '.quantity').value

    const subTotal = this._helper.calcSubTotal(typeId, modelId, conditionMod, quantity)

    // update form from store
    this.saleOrderForm.get('orderDetails.'+formIndex+'.subTotal').patchValue(subTotal)

    this.calcTotalSale()
  }

  calcTotalSale () {
    // TODO: add subtotals
    let total: number = 0;
    this.saleOrderForm.get('orderDetails').value
    .forEach(orderDetail => orderDetail.subTotal != null
      ? total += orderDetail.subTotal : null
    );

    this.saleOrderForm.get('total').setValue(total)

  }

  public addOrderDetails (index) {
    let orderDetailArray = this.saleOrderForm.controls.orderDetails as FormArray
    let arrayLen = orderDetailArray.length
    let orderDetailGroup: FormGroup = this.fb.group({
      lineId: index + 1,
      phoneType: '',
      phoneModel: '',
      phoneCondition: '',
      quantity: null,
      subTotal: null,
      modelList: []
    })

    orderDetailArray.insert(index + 1, orderDetailGroup)

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
