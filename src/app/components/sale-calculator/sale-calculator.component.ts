import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { selectSaleOrder } from 'src/app/stores/sale-calculator/sale-calculator.selectors'
import { selectPhoneModelsList, selectStaticData } from 'src/app/stores/staticData/staticData.selectors'
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms'
import { StaticData } from 'src/app/models/StaticData'
import { PhoneModel } from 'src/app/models/PhoneModel'
import { PhoneType } from 'src/app/models/PhoneType'
import { updateSelectedPhoneModel } from 'src/app/stores/sale-calculator/sale-calculator.actions'
import { Condition } from 'src/app/models/Condition'
import { SaleOrder } from 'src/app/models/SaleOrder'

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.component.html',
  styleUrls: ['./sale-calculator.component.scss']
})
export class SaleCalculatorComponent implements OnInit {
  saleOrder: SaleOrder;
  conditionsList: Array<Condition>;
  phoneModelList$: Array<PhoneModel>;
  phoneTypesList: Array<PhoneType>;
  saleOrderForm: FormGroup;

  get orderDetails () {
    return this.saleOrderForm.get('orderDetails') as FormArray
  }

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private _store: Store<SaleOrder>,
    private _storeSD: Store<StaticData>,
    private fb: FormBuilder
  ) { }

  ngOnInit () {
  // subscribe to OrderDetail
    this._store.pipe(select(selectSaleOrder))
      // eslint-disable-next-line no-return-assign
      .subscribe(sO => this.saleOrder = sO)
    // get conditions list
    this._store.pipe(select(selectStaticData))
      .subscribe(sD => {
        this.conditionsList = sD.conditions
        this.phoneTypesList = sD.phoneTypes
      })
    // subscribe to store
    this._storeSD.pipe(select(selectPhoneModelsList))
      // eslint-disable-next-line no-return-assign
      .subscribe(formArray => this.phoneModelList$ = formArray[0])
    // update dropdown values
    // this.updateValues();

    this.saleOrderForm = this.fb.group({
      orderId: [{ value: '001', disabled: true }, Validators.required],
      total: [null],
      orderDate: [null],
      orderStatus: ['incomplete'],
      orderDetails: this.fb.array([
        this.fb.group({
          phoneType: [Number(
            // this.saleOrder.orderDetails[0].selectedPhoneType.typeId
          ), Validators.required],
          phoneModel: [Number(
            this.saleOrder.orderDetails[0].selectedPhoneModel.modelId
          ), Validators.required],
          phoneConditionControl: ['', Validators.required],
          quantity: [1, Validators.required],
          subTotal: [0, Validators.required],
          lineId: [1, Validators.required]
        })
      ])
    })
  } // ngOnInit

  private updateValues () {
    // this.saleOrderForm.get('orderDetails')
    //   .setValue(
    //     {phoneType: Number(this.orderDetail.selectedPhoneType.typeId)}
    // );

    // this.saleOrderForm.controls.orderDetails.controls.phoneModel
    //   .setValue(
    //     Number(this.orderDetail.selectedPhoneModel.modelId)
    // );

    console.log(this.saleOrderForm.value)
  }

  public changeCondition (e) {
    // this.saleOrderForm.patchValue({
    //   phoneConditionControl: e.target.value
    //   // { onlySelf: true}
    // })
  }

  public onSelectedPhoneTypeChange (e: any): void {
    // const selectedPhoneType: PhoneType = {
    //   typeId: Number(e.target.selectedOptions[0].id),
    //   name: e.target.selectedOptions[0].innerText.trim()
    // }
    // const formIndex = Number(e.path[2].attributes[1].nodeValue)

    // this._helper.storeUpdateOnTypeChange(formIndex, selectedPhoneType);
  }

  public onSelectedPhoneModelChange (e): void {
    const modelId: number = e.target.selectedOptions[0].id
    // const maxVal = this._helper.getMaxValue(modelId);
    const selectedPhoneModel: PhoneModel = {
      modelId,
      name: e.target.selectedOptions[0].label,
      maxValue: null// maxVal
    }

    const formIndex = Number(e.path[2].attributes[1].nodeValue)

    // this.phoneMaxValue = this.onPhoneModelSelect(
    //   selectedPhoneModel.modelId
    // );
    this._store.dispatch(updateSelectedPhoneModel(
      { formIndex, selectedPhoneModel }))
  }

  public calcSale (formIndex: number): number {
    const subTotal = 0
    // let maxValue; let conditionMod; let quantity: number = null
    // maxValue = this.orderDetails[formIndex].selectedPhoneModel.maxValue
    // conditionMod = this.orderDetails[formIndex].selectedPhoneModel.maxValue
    // quantity = this.orderDetails[formIndex].selectedPhoneModel.maxValue

    return subTotal
  }

  calcTotalSale () {
    // TODO: add subtotals
  }

  public addOrderDetails () {
    this.orderDetails.push(this.fb.group({
      lineId: null,
      selectedPhoneType: {},
      selectedPhoneModel: {},
      phoneCondition: null,
      quantity: null,
      subTotal: null
    }))
  }

  public deleteOrderDetails (index) {
    this.orderDetails.removeAt(index)
  }

  public onSubmit () {
    // TODO: use event emitter with form value
    console.warn(this.saleOrderForm.value)
  }

  public onOrderDetailsChange () {
    if (this.saleOrderForm.get('orderDetails').valid) {
      console.log(this.saleOrderForm.get('orderDetails').value)
    }
  }
}
