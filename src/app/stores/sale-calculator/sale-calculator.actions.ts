import { createAction, props } from "@ngrx/store";
import { PhoneType } from "src/app/models/PhoneType";

// export const updateSelectedPhoneTypeId = createAction(
//   "[Estimator Component] Update Selected Phone Type ID",
//   props<{ selectedPhoneTypeId: number }>()
// )

export const updateSelectedPhoneType = createAction(
  "[Estimator Component] Update Selected Phone Type",
  props<{ phoneType: PhoneType }>()
)

export const updateSelectedPhoneModelId = createAction(
  "[Estimator Component] Update Selected Phone Model ID",
  props<{ selectedPhoneModelId: number }>()
)

export const updateSelectedPhoneConditionId = createAction(
  "[Sale Calculator Component] Update Selected Phone Condition ID",
  props<{ selectedPhoneConditionId: number }>()
)
