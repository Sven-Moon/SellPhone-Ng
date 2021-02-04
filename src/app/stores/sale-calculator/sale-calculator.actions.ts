import { createAction, props } from "@ngrx/store";

export const updateSelectedPhoneTypeId = createAction(
  "[Estimator Component] Update Selected Phone Type ID",
  props<{ selectedPhoneTypeId: number }>()
)

export const updateSelectedPhoneModelId = createAction(
  "[Estimator Component] Update Selected Phone Model ID",
  props<{ selectedPhoneModelId: number }>()
)

export const updateSelectedPhoneConditionId = createAction(
  "[Sale Calculator Component] Update Selected Phone Condition ID",
  props<{ selectedPhoneConditionId: number }>()
)