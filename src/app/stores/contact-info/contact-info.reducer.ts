import { Action, combineReducers, createReducer, on } from '@ngrx/store';
import { createFormGroupState, formGroupReducer, FormGroupState, onNgrxForms } from 'ngrx-forms';
import { User } from 'src/app/models/User';
import * as ContactInfoActions from './contact-info.actions';

export const contactInfoFeatureKey = 'contactInfo';

export interface State {
  contactForm: {
    formState: FormGroupState<User>;
    submittedValue: User | undefined;
  }
}

export const formId = 'contactForm'

export const initialState = createFormGroupState<User>(formId, {
  firstName: '',
  lastName: '',
  phone: '',
  email: ''
})

const combinedReducer = createReducer<State['contactForm']>(
  { formState: initialState, submittedValue: undefined },
  onNgrxForms(),
  on(ContactInfoActions.updateContactInfo, (state, { submittedValue }) => ({
    ...state, submittedValue
  }))
)

export function reducer(s: State['contactForm'], a: Action) {
  return combinedReducer(s, a)
}

