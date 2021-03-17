import { createAction, props } from '@ngrx/store';

export const loadContactInfos = createAction(
  '[ContactInfo] Load ContactInfos'
);

export const loadContactInfosSuccess = createAction(
  '[ContactInfo] Load ContactInfos Success',
  props<{ data: any }>()
);

export const loadContactInfosFailure = createAction(
  '[ContactInfo] Load ContactInfos Failure',
  props<{ error: any }>()
);
