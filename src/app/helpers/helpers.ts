import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { PhoneModel } from '../models/PhoneModel'
import { PhoneType } from '../models/PhoneType'
import { updatePhoneModelsList } from '../stores/staticData/staticData.actions'
import { selectStaticData, selectStaticDataState } from '../stores/staticData/staticData.selectors'
import { updateSelectedPhoneType, updateSubtotal, updateTotal } from '../stores/sale-calculator/sale-calculator.actions'
import { selectOrderDetail } from '../stores/sale-calculator/sale-calculator.selectors'
import { SaleOrderDetail } from '../models/SaleOrderDetail'
import { FormGroup } from '@angular/forms'

@Injectable()
export class Helpers {
  details: SaleOrderDetail[]
  constructor(private store: Store<any>) { }

  public storeUpdateOnTypeChange(formIndex: number, selectedPhoneType: PhoneType): void {
    // send phone type to store
    this.store.dispatch(updateSelectedPhoneType(
      { formIndex, selectedPhoneType }))

    // find the list by typeId
    const phoneModelList: Array<PhoneModel[]> =
      this.getPhoneModelsByPhoneType(selectedPhoneType.typeId)

    // add that list to staticData.phoneModelList<Array<PhoneModel[]>>
    this.store.dispatch(updatePhoneModelsList(
      { formIndex, phoneModelList }
    ))
  }

  public getPhoneModelsByPhoneType(selectedPhoneTypeId: number): Array<PhoneModel[]> {
    // get current state of selectedPhoneTypes
    let state = null
    this.store.pipe(select(selectStaticData))
      .subscribe(sD => { state = sD })

    // return the model list matching the formIndex#
    for (const i in state.phoneModelsByType) {
      if (state.phoneModelsByType[i].typeId == selectedPhoneTypeId) {
        return state.phoneModelsByType[i].phoneModels
      }
    }
  }

  public getMaxValue(formIndex: number, modelId: number): number {
    let maxValue: number = null
    let modelListByFormIndex: Array<PhoneModel[]> = []
    this.store.pipe(select(selectStaticDataState))
      .subscribe(sD => modelListByFormIndex = sD.phoneModelsList)
    modelListByFormIndex[formIndex].forEach(model => {
      if (model.modelId == modelId) maxValue = model.maxValue
    })
    return maxValue
  }

  updateDetailsForm(
    saleForm: FormGroup, index: number, modelsList?: PhoneModel[]) {
    // update the phone model and list at the index
    if (modelsList) {
      // the available model list is kept on the form (not the store)
      saleForm.get('orderDetails.' + index + '.phoneModel').patchValue(null)
      saleForm.get('orderDetails.' + index + '.modelList').patchValue(modelsList)
    }

    saleForm.updateValueAndValidity

    this.calcSubTotal(saleForm, index)
  }

  public calcSubTotal(saleForm: FormGroup, formIndex: number): void {

    let subTotal: number
    if (!saleForm.get('orderDetails.' + formIndex).valid) {
      subTotal = 0
    } else {

      // find subform[index] subtotal from values in store
      let maxValue, conditionMod, quantity: number | null
      const orderDetails$ = this.store.pipe(select(selectOrderDetail))
      orderDetails$.subscribe(oD => {
        if (oD[formIndex]) {
          maxValue = oD[formIndex].phoneModel.maxValue,
            conditionMod = oD[formIndex].phoneCondition.priceMod,
            quantity = oD[formIndex].quantity
        }
      })
      subTotal = maxValue * conditionMod * quantity
    }

    // update the store subtotal
    this.store.dispatch(updateSubtotal(
      { formIndex, subTotal }))

    // update the form subtotal
    saleForm.get('orderDetails.' + formIndex + '.subTotal')
      .patchValue(subTotal)

    // update total
    this.calcTotalSale(saleForm)
  }

  public calcTotalSale(saleForm: FormGroup): void {
    let total: number = 0
    // sum subtotals
    this.store.pipe(select(selectOrderDetail)).subscribe(od =>
      od.forEach(line => total += line.subTotal)
    )

    // update store
    this.store.dispatch(updateTotal({ total }))

    // update form
    saleForm.get('total').setValue((total))

  }
}
