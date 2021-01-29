import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Estimator } from "src/app/models/EstimatorModel";
import { PhoneModels } from "src/app/models/PhoneModels";
import { selectAll, selectPhoneTypeId } from "../estimator/estimator.reducer";
import { estimatorFeatureKey, PhoneModelsState } from "./estimator.reducer";

export const selectPhoneModelsByTypeState = 
createFeatureSelector<PhoneModelsState>(estimatorFeatureKey)

export const selectPhoneModelsByType =
createSelector(selectPhoneModelsByTypeState,selectAll);

export const selectTypeId = (
  (state:PhoneModelsState) => state.selectedTypeId
)

// Creates selector for phoneModelsList$ in 
// app-phone-estimator.components
export const selectModelListState = 
createFeatureSelector<PhoneModels> //, Array<PhoneModels>>
("phoneModelsList");

// export const selectPhoneModelsList = 
// createSelector(
//   selectPhoneModelsByType,
//   selectModelListState,
//   (models: PhoneModelsState) => {
//     return models.entities.map((id) =>  
//         id == models.selectedTypeId) 
//   }
// );



// TODO: select the phones with id = typeID
// First: create action to update the phoneModelsList??