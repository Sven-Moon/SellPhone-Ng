import { Action, createReducer, on } from '@ngrx/store';
import * as ContactInfoActions from './contact-info.actions';

export const contactInfoFeatureKey = 'contactInfo';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(ContactInfoActions.loadContactInfos, state => state),
  on(ContactInfoActions.loadContactInfosSuccess, (state, action) => state),
  on(ContactInfoActions.loadContactInfosFailure, (state, action) => state),

);

