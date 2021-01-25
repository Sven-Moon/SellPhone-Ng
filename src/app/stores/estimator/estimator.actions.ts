import { createAction, props } from "@ngrx/store";
import { PhoneModels } from "src/app/models/PhoneModels";

export const loadPhoneModelsByType = createAction(
  "[Estimator Component] Load PhoneModelsByType"
)

export const loadPhoneModelsByTypeSuccess = createAction(
  "[Estimator Effect] Load PhoneModelsByType Success", 
  props<{ phoneModelsByType: Array<PhoneModels> }>()
);

export const loadPhoneModelsByTypeFailure = createAction(
  "[Estimator Effect] Load PhoneModelsByType Failure",
  props<{ error: any }>()
);

export const updateSelectedPhoneType = createAction(
  "[Estimator Component] Update Selected Phone Type",
  props<{ selectedTypeId: number }>()
)