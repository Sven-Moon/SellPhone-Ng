import { Action } from '@ngrx/store';
import { PhoneModels } from '../models/phoneModels';

export type State = PhoneModels;
const initialState = null;

export const
  UPDATE_PHONE_MODELS = 'UPDATE_PHONE_MODELS',
  CLEAR_PHONE_MODELS ='CLEAR_PHONE_MODELS';

export class updatePhoneModelsAction implements Action {
  readonly type = UPDATE_PHONE_MODELS;
  payload: PhoneModels;
}

export class clearPhoneModelsAction implements Action {
  readonly type = CLEAR_PHONE_MODELS;
}

export type Actions = updatePhoneModelsAction | clearPhoneModelsAction;

export function estimatorModels(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case UPDATE_PHONE_MODELS:
      return action.payload;

    case CLEAR_PHONE_MODELS:
      return initialState;

    default:
      return state;
  }
}
