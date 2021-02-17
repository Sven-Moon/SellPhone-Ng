import { createFeatureSelector, createSelector } from '@ngrx/store';
import { searchFeatureKey, SearchState, selectAll } from './search.reducer';


export const selectSearchState =
  createFeatureSelector<SearchState>(searchFeatureKey);

export const siteSearchResults = createSelector(
  selectSearchState,
  selectAll
);

export const selectedSearchResult = createSelector(
  selectSearchState,
  (state: SearchState) => state.selectedSearchResult
);
