import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StaticData } from "src/app/models/StaticData";
import { selectAll } from "../staticData/staticData.reducer";
import { staticDataFeatureKey, StaticDataState } from "./staticData.reducer";

export const selectStaticDataState = 
  createFeatureSelector<StaticDataState>(staticDataFeatureKey);

export const selectStaticData = 
createSelector(selectStaticDataState, selectAll
);

// export const selectedPhoneType = createSelector(
//   selectStaticDataState,
//   (state: StaticDataState) => state
// )

// export const selectedPhoneModel = createSelector(
//   selectStaticData,
//   (state: StaticData) => state.phoneModelsByType
// )