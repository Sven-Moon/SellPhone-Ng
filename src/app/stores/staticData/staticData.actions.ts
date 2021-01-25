import { createAction, props } from "@ngrx/store";
import { PhoneModels } from "src/app/models/PhoneModels";
import { PhoneTypes } from "src/app/models/PhoneTypes";
import { StaticData } from "src/app/models/StaticData";

export const loadStaticData = createAction(
  "[Main Panel Component] Load Static Data"
);

export const loadStaticDataSuccess = createAction(
  "[Estimator Effect] Load Static Data Success", 
  props<{ staticData: StaticData }>()
);

export const loadStaticDataFailure = createAction(
  "[Estimator Effect] Load Static Data Failure",
  props<{ error: any }>()
);

// export const updateUsaStates = createAction(
//   "[Some Component] Update USA States"
// );

// export const updatePhoneTypes = createAction(
//   '[Estimator Component] Update Phone Types',
//   props<{ phoneTypes: PhoneTypes[] }>()
// );

// export const updatePhoneModels = createAction(
//   '[Estimator Component] Update Phone Models'
// ); 