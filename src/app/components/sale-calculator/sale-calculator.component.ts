import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { selectSaleOrder } from 'src/app/stores/sale-calculator/sale-calculator.selectors'
import { selectPhoneModelsList, selectStaticData } from 'src/app/stores/staticData/staticData.selectors'
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms'
import { StaticData } from 'src/app/models/StaticData'
import { PhoneModel } from 'src/app/models/PhoneModel'
import { PhoneType } from 'src/app/models/PhoneType'
import { addFormSection, updateCondition, updateQuantity, updateSelectedPhoneModel } from 'src/app/stores/sale-calculator/sale-calculator.actions'
import { Condition } from 'src/app/models/Condition'
import { SaleOrder } from 'src/app/models/SaleOrder'
import { Helpers } from 'src/app/helpers/helpers'

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.component.html',
  styleUrls: ['./sale-calculator.component.scss']
})
export class SaleCalculatorComponent implements OnInit {
  saleOrder: SaleOrder;
  conditionsList: Array<Condition>;
  phoneModelList: Array<PhoneModel[]>;;
  phoneTypesList: Array<PhoneType>;
  saleOrderForm: FormGroup;

  get orderDetails () {
    return this.saleOrderForm.get('orderDetails') as FormArray
  }

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private _store: Store<SaleOrder>,
    private _storeSD: Store<StaticData>,
    private fb: FormBuilder,
    private _helper: Helpers
  ) { }

  ngOnInit () {
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
      .subscribe(formArray => this.phoneModelList = formArray)
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
            this.saleOrder.orderDetails[0].phoneType.typeId
          ), Validators.required],
          phoneModel: [Number(
            this.saleOrder.orderDetails[0].phoneModel.modelId
          ), Validators.required],
          phoneCondition: ['', Validators.required],
          quantity: [1, Validators.required],
          subTotal: [0, Validators.required],
          lineId: [1, Validators.required]
        })
      ])
    })
  } // ngOnInit

  public changeCondition (formIndex, id:string) {
    this._store.dispatch(updateCondition({ formIndex, id })
    )
  }

  public onQuantityChange (formIndex: number, quantity: number) {
    this._store.dispatch(updateQuantity({ formIndex, quantity }))
  }

  public onSelectedPhoneTypeChange (e: any): void {
    const selectedPhoneType: PhoneType = {
      typeId: Number(e.target.selectedOptions[0].id),
      name: e.target.selectedOptions[0].innerText.trim()
    }
    this.saleOrderForm.get('orderDetails').valueChanges.subscribe(out => {
      console.log(out)
    })
    // TODO find a better way of getting line value populated
    const formIndex = Number(e.path[2].attributes[1].nodeValue)

    // update store
    this._helper.storeUpdateOnTypeChange(formIndex, selectedPhoneType)
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

  public addOrderDetails (index) {
    this.orderDetails.push(this.fb.group({
      lineId: index + 1,
      phoneType: -1,
      phoneModel: -1,
      phoneCondition: 'Excellent',
      quantity: null,
      subTotal: null
    }))

    this._store.dispatch(addFormSection())
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
