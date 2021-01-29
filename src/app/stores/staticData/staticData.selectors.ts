import { state } from "@angular/animations";
import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { PhoneModel } from "src/app/models/PhoneModel";
import { PhoneModels } from "src/app/models/PhoneModels";
import { PhoneType } from "src/app/models/PhoneType";
import { StaticData } from "src/app/models/StaticData";
import { staticData } from "../staticData.store";
import { staticDataFeatureKey, StaticDataState } from "./staticData.reducer";

export const selectStaticDataState = 
createFeatureSelector<StaticDataState>(staticDataFeatureKey);

export const selectStaticData = 
createSelector(
  selectStaticDataState,
  (state: StaticData) => state
);

export const selectPhoneTypes = 
createSelector(
  selectStaticDataState,
  (state: StaticData) => state.phoneTypes
);

export const selectPhoneModelsByType = 
createSelector(
  selectStaticDataState,
  (state: StaticData) => state.phoneModelsByType
);

export const selectStaticUsaStates = 
createSelector(
  selectStaticDataState,
  (state: StaticData) => state.usaStates
);

export const selectPhoneModelsList =
createSelector(
  selectStaticDataState,
  (state:StaticDataState) => state.phoneModelsList
)


// export const selectPhoneModelList = 
// createSelector(
//   selectPhoneModelsByType,
//   selectStaticData, // returns type staticData[] ??? 
//   (phoneModelsByType:Array<PhoneModels>, selectedTypeId:number) => {
//     if (selectedTypeId && phoneModelsByType) {
//       return phoneModelsByType.filter((phoneType:PhoneType) => phoneType.typeId === selectedTypeId)
//     } else {
//       return [{modelId: -1, name: "you missed"}]
//     }
//   }
  
// )

// export const selectedPhoneType = createSelector(
//   selectStaticData,
//   (state: StaticData[]) => state.
// )

// export const selectedPhoneModel = createSelector(
//   selectStaticData,
//   (state: StaticData) => state.phoneModelsByType
// )