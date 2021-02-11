import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StaticData } from "src/app/models/StaticData";
import { staticDataFeatureKey, StaticDataState } from "./staticData.reducer";

export const selectStaticDataState =
createFeatureSelector<StaticDataState>(staticDataFeatureKey);

export const selectStaticData =
createSelector(
  selectStaticDataState,
  (state: StaticDataState) => state
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
