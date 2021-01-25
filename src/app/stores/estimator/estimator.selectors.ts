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

export const selectModelListState = 
createFeatureSelector<PhoneModelsState, Array<PhoneModels>>
("phoneModelsList");

export const selectPhoneModelsList = 
createSelector(
  selectPhoneModelsByType,
  selectModelListState,
  (models: PhoneModelsState, list: Array<PhoneModels>) => {
    return models.ids.map((id) =>  
        id == models.selectedTypeId) 
  }
);



// TODO: select the phones with id = typeID
// First: create action to update the phoneModelsList??