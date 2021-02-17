import { createAction, props } from '@ngrx/store';
import { PhoneModel } from 'src/app/models/PhoneModel';
import { StaticData } from 'src/app/models/StaticData';

// Load Static Data
export const loadStaticData = createAction(
  '[Main Panel Component] Load Static Data'
);

export const loadStaticDataSuccess = createAction(
  '[Estimator Effect] Load Static Data Success',
  props<{ staticData: StaticData }>()
);

export const loadStaticDataFailure = createAction(
  '[Estimator Effect] Load Static Data Failure',
  props<{ error: any }>()
);

export const updatePhoneModelsList = createAction(
  '[Estimator Component] Update Phone Models List',
  props<{phoneModelList: Array<PhoneModel>}>()
);
