import { Action } from '@ngrx/store';
import { PhoneTypes } from '../models/PhoneTypes';

export type State = PhoneTypes;

const initialState = null;

export const GET_PHONE_TYPES = 'GET_PHONE_TYPES';

export class getPhoneTypesAction implements Action {
  readonly type = GET_PHONE_TYPES;
  payload: PhoneTypes;
}

export function estimatorTypes(state: State = initialState, action: getPhoneTypesAction):State {
  switch (action.type) {
    case GET_PHONE_TYPES:
      return action.payload;

    default:
      return state;
  }
}
