import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { PhoneModel } from '../models/PhoneModel'
import { PhoneType } from '../models/PhoneType'
import { updatePhoneModelsList } from '../stores/staticData/staticData.actions'
import { selectConditions, selectPhoneModelsByType, selectStaticData, selectStaticDataState } from '../stores/staticData/staticData.selectors'
import { updateSelectedPhoneType, updateSubtotal, updateTotal } from '../stores/sale-calculator/sale-calculator.actions'
import { selectOrderDetail } from '../stores/sale-calculator/sale-calculator.selectors'

@Injectable()
export class Helpers {
  constructor (private _store: Store<any>) {}

  public storeUpdateOnTypeChange (formIndex: number, selectedPhoneType: PhoneType): void {
    // send phone type to store
    this._store.dispatch(updateSelectedPhoneType(
      { formIndex, selectedPhoneType }))

    // find the list by typeId
    const phoneModelList: Array<PhoneModel[]> =
      this.getPhoneModelsByPhoneType(selectedPhoneType.typeId)

    // add that list to staticData.phoneModelList<Array<PhoneModel[]>>
    this._store.dispatch(updatePhoneModelsList(
      { formIndex, phoneModelList }
    ))
  }

  public getPhoneModelsByPhoneType (selectedPhoneTypeId: number): Array<PhoneModel[]> {
    // const phoneModelsList: Array<PhoneModel> = []
    // get current state of selectedPhoneTypes
    let state = null

    this._store.pipe(select(selectStaticData))
    .subscribe(sD => {state = sD})

    // return the model list matching the formIndex#
    for (const i in state.phoneModelsByType) {
      if (state.phoneModelsByType[i].typeId == selectedPhoneTypeId) {
        return state.phoneModelsByType[i].phoneModels
      }
    }
  }

  public getMaxValue (formIndex: number, modelId: number): number {
    let maxValue: number = null
    let modelListByFormIndex: Array<PhoneModel[]> = []

    this._store.pipe(select(selectStaticDataState))
      // eslint-disable-next-line no-return-assign
      .subscribe(sD => modelListByFormIndex = sD.phoneModelsList)

    modelListByFormIndex[formIndex].forEach(model => {
      // eslint-disable-next-line eqeqeq
      if (model.modelId == modelId) maxValue = model.maxValue
    })

    return maxValue
  }

  public calcSubTotal (formIndex): number {

    let maxValue, conditionMod, quantity: number

    const saleOrder$ = this._store.pipe(select(selectOrderDetail))
    saleOrder$.subscribe(sO => {
      maxValue = sO[formIndex].phoneModel.maxValue,
      conditionMod = sO[formIndex].phoneCondition.priceMod,
      quantity = sO[formIndex].quantity
    })

    let subTotal: number = maxValue * conditionMod * quantity

    this._store.dispatch(updateSubtotal(
      { formIndex, subTotal }))

    return  maxValue * conditionMod * quantity

  }

}
