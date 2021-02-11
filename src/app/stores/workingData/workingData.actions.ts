import { createAction, props } from "@ngrx/store";

export const updatePhoneModelsList = createAction(
  '[Estimator Component] Update Phone Models List',
  props<{typeId: number}>()
);
