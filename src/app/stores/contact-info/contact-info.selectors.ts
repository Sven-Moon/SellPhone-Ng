import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContactInfo from './contact-info.reducer';

export const selectContactInfoState = createFeatureSelector<fromContactInfo.State>(
  fromContactInfo.contactInfoFeatureKey
);
