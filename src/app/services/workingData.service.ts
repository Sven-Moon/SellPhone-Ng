import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { PhoneModels } from "../models/PhoneModels";
import { selectPhoneModelsByType, selectStaticData } from "../stores/staticData/staticData.selectors";

@Injectable()
export class WorkingDataEffects {
  constructor(
    private store: Store<any>
  ) { }

  updatePhoneModelsList(modelsByType: Array<PhoneModels>, typeId: number) {
    for (var i in modelsByType) {
      if (modelsByType[i].typeId == typeId) {
        return {
          phoneModelsList: modelsByType[i].phoneModels
        }
      }
    }
  }

}
