/* eslint-disable eqeqeq */
/* eslint-disable no-useless-constructor */
import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { PhoneModel } from '../models/PhoneModel'
import { PhoneType } from '../models/PhoneType'
import { updateSelectedPhoneType } from '../stores/sale-calculator/sale-calculator.actions'
import { updatePhoneModelsList } from '../stores/staticData/staticData.actions'
import { selectStaticData, selectStaticDataState } from '../stores/staticData/staticData.selectors'

@Injectable()
export class Helpers {
  constructor (private _store: Store<any>) {}

  public storeUpdateOnTypeChange (formIndex: number, selectedPhoneType: PhoneType): void {
    // send phone type to sale-calculator
    this._store.dispatch(updateSelectedPhoneType(
      { formIndex, selectedPhoneType }))

    const phoneModelList: Array<PhoneModel[]> =
      this.getPhoneModelsByPhoneType(formIndex, selectedPhoneType.typeId)

    // return array of models matching typeId
    this._store.dispatch(updatePhoneModelsList(
      { phoneModelList }
    ))
  }

  public getPhoneModelsByPhoneType (formIndex: number, selectedPhoneTypeId: number): Array<PhoneModel[]> {
    const phoneModels: Array<PhoneModel[]> = []
    // get current state of selectedPhoneTypes
    let state = null

    this._store.pipe(select(selectStaticData))
      .subscribe(sD => {
        state = sD
      })

    // build phoneModels array base on the selectedPhoneType
    for (const i in state.phoneModelsByType) {
      if (state.phoneModelsByType[i].typeId == selectedPhoneTypeId) {
        phoneModels[formIndex] = state.phoneModelsByType[i].phoneModels
      }
    }

    // return the phoneModelsList
    return phoneModels
  }

  private onPhoneModelSelect (id: number): boolean {
    if (id > 0) {
      return true
    } else { return false }
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
}
