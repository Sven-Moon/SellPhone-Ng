import { Action, combineReducers, createReducer, on } from '@ngrx/store';
import { createFormGroupState, formGroupReducer, FormGroupState, onNgrxForms } from 'ngrx-forms';
import * as ContactInfoActions from './contact-info.actions';

export const contactInfoFeatureKey = 'contactInfo';

export interface ContactFormValue {
  firstName: string;
  lastName: string;
  phone: string;
  email: string
}

export interface State {
  contactForm: {
    formState: FormGroupState<ContactFormValue>;
    submittedValue: ContactFormValue | undefined;
  }
}

export const formId = 'contactForm'

export const initialState = createFormGroupState<ContactFormValue>(formId, {
  firstName: '',
  lastName: '',
  phone: '',
  email: ''
})

const combinedReducer = createReducer<State['contactForm']>(
  { formState: initialState, submittedValue: undefined },
  onNgrxForms(),
  on(ContactInfoActions.setSubmittedValue, (state, { submittedValue }) => ({
    ...state, submittedValue
  }))
)

export function reducer(s: State['contactForm'], a: Action) {
  return combinedReducer(s, a)
}

