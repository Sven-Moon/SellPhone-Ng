import { Action, createReducer, on } from '@ngrx/store';
import { SearchResults } from '../models/SearchResults';

export type State = SearchResults;

 const initialState = null;

  // action types
  export const
    UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS',
    CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

export class UpdateSearchResultsAction implements Action {
  readonly type = UPDATE_SEARCH_RESULTS;
  payload: SearchResults;
}
export class ClearSearchResultsAction implements Action {
  readonly type = CLEAR_SEARCH_RESULTS;
}
 // | is union type: declares a type that's like OR of both
export type Actions = UpdateSearchResultsAction | ClearSearchResultsAction;

// sTORE/rEDUCER
export function searchResults(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case UPDATE_SEARCH_RESULTS:
      return action.payload;

      case CLEAR_SEARCH_RESULTS:
        return initialState;

      default:
        return state;
  }
}
