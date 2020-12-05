import { Action } from '@ngrx/store';
import { PhoneTypes } from '../models/PhoneTypes';

export type State = PhoneTypes;

const initialState = null;
// todo: what to do to make an array work properly throughout the application
// const initialState = [];

export const UPDATE_PHONE_TYPES = 'UPDATE_PHONE_TYPES';

export class getPhoneTypesAction implements Action {
  readonly type = UPDATE_PHONE_TYPES;
  payload: PhoneTypes;
}

export function estimatorTypes(state: State = initialState, action: getPhoneTypesAction):State {
  switch (action.type) {
    case UPDATE_PHONE_TYPES:
      return action.payload;

    default:
      return state;
  }
}
