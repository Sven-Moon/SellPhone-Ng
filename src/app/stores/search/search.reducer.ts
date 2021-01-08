import { state } from "@angular/animations";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import { SearchResult } from "src/app/models/SearchResult";
import { SearchResults } from "src/app/models/SearchResults";
import { clearSearch, returnSearchResultsFailure, returnSearchResultsSuccess, submitSearch } from "./search.actions";

export const searchFeatureKey = "search";

export interface SearchState extends EntityState<SearchResults> {
  error: any;
  selectedSearchResult: SearchResult;
}

export const adapter: EntityAdapter<SearchResults> 
  = createEntityAdapter<SearchResults>();

export const initialState: SearchResults = adapter.getInitialState({
  error: undefined,
  results: null,
  selectedSearchResult: null
});

const searchReducer = createReducer(
  initialState,
  on(returnSearchResultsSuccess, (_,action) => 
    action.searchResults
  ),
  on(returnSearchResultsFailure, (state,action) => 
  ({...state, error: action.error })
  ),
  on(clearSearch, () => initialState)
)

export function reducer(state: SearchResults | null, action: Action) {
  return searchReducer(state,action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();