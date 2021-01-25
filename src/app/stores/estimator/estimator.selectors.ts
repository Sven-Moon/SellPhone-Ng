import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Estimator } from "src/app/models/EstimatorModel";
import { selectAll } from "../estimator/estimator.reducer";
import { estimatorFeatureKey, PhoneModelsState } from "./estimator.reducer";

export const selectEstimatorState = 
createFeatureSelector<PhoneModelsState>(estimatorFeatureKey)

export const selectEstimator =
createSelector(selectEstimatorState,selectAll);

export const selectPhoneModelsByType = 
(state:Estimator) => state.phoneModelsByType



// TODO: select the phones with id = typeID
// First: create action to update the phoneModelsList??