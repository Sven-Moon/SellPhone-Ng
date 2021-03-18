import { createAction, props } from '@ngrx/store';
import { ContactFormValue } from './contact-info.reducer';


export const setSubmittedValue = createAction(
  '[Order Summary] Submit Form',
  props<{ submittedValue: ContactFormValue }>()
)
