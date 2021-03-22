import { Action, combineReducers, createReducer, on } from '@ngrx/store';
import { createFormGroupState, formGroupReducer, FormGroupState, onNgrxForms, updateGroup, validate, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { User } from 'src/app/models/User';
import * as ContactInfoActions from './contact-info.actions';
import { email, required, minLength, maxLength } from 'ngrx-forms/validation'


const validateMyForm = updateGroup<User>({
  firstName: validate(required),
  lastName: validate(required),
  email: validate(required, email),
  phone: validate(required, minLength(10), maxLength(10))
})

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
  return reducerValidated(s, a)
}

export const reducerValidated = wrapReducerWithFormStateUpdate(
  combinedReducer,
  s => s.formState,
  validateMyForm
)
