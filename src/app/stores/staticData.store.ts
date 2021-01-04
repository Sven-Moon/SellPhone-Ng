import { Action } from '@ngrx/store';
import { PhoneModels } from '../models/PhoneModels';
import { PhoneType } from '../models/PhoneType';
import { StaticData } from '../models/StaticData';
import { USA_State } from '../models/USA_State';

export type StaticDataState = StaticData;

const initialState = {
  usaStates: [],
  phoneTypes: [],
  phoneModelsByType: []
};

export const
  LOAD_STATIC_DATA = 'LOAD_STATIC_DATA',
  UPDATE_USA_STATES = 'UPDATE_USA_STATES',
  UPDATE_PHONE_TYPES = 'UPDATE_PHONE_TYPES',
  UPDATE_PHONE_MODELS = 'UPDATE_PHONE_MODELS';

export class LoadStaticDataAction implements Action {
  readonly type = LOAD_STATIC_DATA;
  payload: StaticData;
}

export class UpdateUsaStates implements Action {
  readonly type = UPDATE_USA_STATES;
  payload: USA_State[];
}

export class UpdatePhoneTypes implements Action {
  readonly type = UPDATE_PHONE_TYPES;
  payload: PhoneType[];
}

export class UpdatePhoneModels implements Action {
  readonly type = UPDATE_PHONE_MODELS;
  payload: Array<PhoneModels>;
}

export type Actions = LoadStaticDataAction | UpdateUsaStates | UpdatePhoneTypes | UpdatePhoneModels;


// Reducer
export function staticData(state:StaticDataState = initialState,action:Actions): StaticDataState {
  switch (action.type) {

    case UPDATE_USA_STATES:
      let newState1: StaticDataState = Object.assign({},state);
      newState1.usaStates = action.payload;
      return newState1;

    case UPDATE_PHONE_TYPES:
      let newState2: StaticDataState = Object.assign({},state);
      newState2.phoneTypes = action.payload;
      return newState2;

    case UPDATE_PHONE_MODELS:
      let newState3: StaticDataState = Object.assign({},state);
      newState3.phoneModelsByType = action.payload;
      return newState3;

    default:
      return state;
  }
}
