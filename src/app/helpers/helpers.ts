import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { PhoneModel } from "../models/PhoneModel";
import { PhoneType } from "../models/PhoneType";
import { updateSelectedPhoneType } from "../stores/sale-calculator/sale-calculator.actions";
import { updatePhoneModelsList } from "../stores/staticData/staticData.actions";
import { selectStaticData } from "../stores/staticData/staticData.selectors";

@Injectable()
export class Helpers {
  constructor (private _store: Store<any>) {}

  public storeUpdateOnTypeChange (selectedPhoneType:PhoneType):void {

    // send phone type to sale-calculator
    this._store.dispatch(updateSelectedPhoneType(
      { phoneType: selectedPhoneType } ));

    let phoneModelList = this.getPhoneModelsByPhoneType(selectedPhoneType.typeId)

    // return array of models matching typeId
    this._store.dispatch(updatePhoneModelsList({
      phoneModelList: phoneModelList
    }));
  }

  public getPhoneModelsByPhoneType (selectedPhoneTypeId:number):Array<PhoneModel> {
    let phoneModels: Array<PhoneModel> = [];
    // get current state of selectedPhoneTypes
    let state=null;

    this._store.pipe(select(selectStaticData))
    .subscribe(sD => {
      state = sD;
    });

    // build phoneModels array base on teh selectedPhoneType
    for (var i in state.phoneModelsByType) {
      if (state.phoneModelsByType[i].typeId == selectedPhoneTypeId) {
        phoneModels = state.phoneModelsByType[i].phoneModels
      }
    }

    // return the phoneModelsList
    return phoneModels;
  }

}
