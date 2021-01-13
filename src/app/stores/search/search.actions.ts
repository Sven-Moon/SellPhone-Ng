import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { SearchResults } from "src/app/models/SearchResults";
import { SearchResult } from "src/app/models/SearchResult";

// COMPONENT ACTIONS ARE INTERCEPTED BY EFFECTS
// PRIOR TO PROCESSING BY THE REDUCER
// Component > Action > Effect > Reducer

// -- SUBMIT -- 
export const submitSearch = createAction(
  "[Search Component] Submit Search",
  props<{ searchText: string }>()
);
 
export const clearSearch = createAction(
  "[Search Component] Clear Search"
);

// -- RETURN FROM SERVER ---
export const returnSearchResultsSuccess = createAction(
  "[Search Effect] Return Search Results Success",
  props<{ resultsV2: SearchResult[] }>()
);
export const returnSearchResultsFailure = createAction(
  "[Search Effect] Return Search Results Failure",
  props<{ error: any }>()
);