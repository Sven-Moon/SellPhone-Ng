import { createAction, props } from "@ngrx/store";
import { PhoneModel } from "src/app/models/PhoneModel";
import { PhoneType } from "src/app/models/PhoneType";
import { USA_States } from "src/app/models/USA_States";

export const loadStaticData = createAction(
  "[Main Panel Component] Load Static Data"
);

export const loadStaticDataSuccess = createAction(
  "[Estimator Effect] Load Static Data Success", props<{
    phoneModels:Array<PhoneModel>,
    phoneTypes: Array<PhoneType>,
    usaStates: USA_States
  }>()
);

export const loadStaticDataFailure = createAction(
  "[Estimator Effect] Load Static Data Failure",
  props<{ error: any }>()
);

export const UpdateUsaStates = createAction(
  "[Some Component] Update USA States"
);

export const updatePhoneTypes = createAction(
  '[Estimator Component] Update Phone Types'
);

export const updatePhoneModels = createAction(
  '[Estimator Component] Update Phone Models'
); 