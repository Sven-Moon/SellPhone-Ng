import { createAction, props } from "@ngrx/store";
import { PhoneModels } from "src/app/models/PhoneModels";
import { PhoneType } from "src/app/models/PhoneType";
import { PhoneTypes } from "src/app/models/PhoneTypes";
import { StaticData } from "src/app/models/StaticData";
import { USA_States } from "src/app/models/USA_States";

// Load Static Data
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

export const updatePhoneModelsList = createAction(
  '[Estimator Component] Update Phone Models List',
  props<{typeId: number}>()
); 

// Load Phone Types
// export const loadStaticPhoneTypes = createAction(
//   "[Main Panel Component] Load Phone Types Success"
// );

// export const loadStaticPhoneTypesSuccess = createAction(
//   "[Estimator Effect] Load Phone Types Success", 
//   props<{ phoneTypes: Array<PhoneType> }>()
// );

// export const loadStaticPhoneTypesFailure = createAction(
//   "[Estimator Effect] Load Phone Types Failure",
//   props<{ error: any }>()
// );

// // Load Usa States
// export const loadStaticUsaStates = createAction(
//   "[Main Panel Component] Load usaStates"
// );

// export const loadStaticUsaStatesSuccess = createAction(
//   "[Estimator Effect] Load usaStates Success", 
//   props<{ usaStates: USA_States }>()
// );

// export const loadStaticUsaStatesFailure = createAction(
//   "[Estimator Effect] Load usaStates Failure",
//   props<{ error: any }>()
// );

// // Load ModelsByType
// export const loadStaticModelsByType = createAction(
//   "[Main Panel Component] Load ModelsByType"
// );

// export const loadStaticModelsByTypeSuccess = createAction(
//   "[Estimator Effect] Load ModelsByType Success", 
//   props<{ phoneModelsByType: Array<PhoneModels> }>()
// );

// export const loadStaticModelsByTypeFailure = createAction(
//   "[Estimator Effect] Load ModelsByType Failure",
//   props<{ error: any }>()
// );

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