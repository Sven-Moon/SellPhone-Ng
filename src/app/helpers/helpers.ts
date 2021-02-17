import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { PhoneModel } from "../models/PhoneModel";
import { PhoneModels } from "../models/PhoneModels";
import { PhoneType } from "../models/PhoneType";
import { updateSelectedPhoneType } from "../stores/sale-calculator/sale-calculator.actions";
import { SaleOrderDetailState } from "../stores/sale-calculator/sale-calculator.reducer";
import { selectSaleOrderDetailState } from "../stores/sale-calculator/sale-calculator.selectors";
import { updatePhoneModelsList } from "../stores/staticData/staticData.actions";
import { StaticDataState } from "../stores/staticData/staticData.reducer";
import { selectStaticData, selectStaticDataState } from "../stores/staticData/staticData.selectors";

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

  private onPhoneModelSelect(id:number):boolean{
    if (id > 0 ) {
      return true;}
    else { return false;}
  }

  public getMaxValue(modelId:number):number {
    let maxValue: number = null;
    let modelList: Array<PhoneModel> = [];

    this._store.pipe(select(selectStaticDataState))
    .subscribe(sD => modelList = sD.phoneModelsList);

    modelList.forEach(model => {
      model.modelId == modelId
      ? maxValue = model.maxValue : null
    })

    return maxValue;
  }

}
