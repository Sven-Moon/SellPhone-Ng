import { createAction, props } from '@ngrx/store';
import { PhoneModel } from 'src/app/models/PhoneModel';
import { PhoneType } from 'src/app/models/PhoneType';

// export const updateSelectedPhoneTypeId = createAction(
//   "[Estimator Component] Update Selected Phone Type ID",
//   props<{ selectedPhoneTypeId: number }>()
// )

export const updateSelectedPhoneType = createAction(
  '[Estimator Component] Update Selected Phone Type',
  props<{ phoneType: PhoneType }>()
);

export const updateSelectedPhoneModel = createAction(
  '[Estimator Component] Update Selected Phone Model ID',
  props<{ selectedPhoneModel: PhoneModel }>()
);

export const updateSelectedPhoneConditionId = createAction(
  '[Sale Calculator Component] Update Selected Phone Condition ID',
  props<{ selectedPhoneConditionId: number }>()
);
