import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User';


export const updateContactInfo = createAction(
  '[Order Summary] Submit Form',
  props<{ submittedValue: User }>()
)
