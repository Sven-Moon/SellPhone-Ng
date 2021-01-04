import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { SearchResults } from "src/app/models/SearchResults";

// -- SUBMIT -- 
export const submitSearch = createAction(
  "[Search Component] Submit Search",
  props<{ searchText: string }>()
);

// -- RETURN FROM SERVER
export const returnSearchResultsSuccess = createAction(
  "[Search Effect] Return Search Results Success",
  props<{ searchResults: SearchResults }>()
);
export const returnSearchResultsFailure = createAction(
  "[Search Effect] Return Search Results Failure",
  props<{ error: any }>()
);