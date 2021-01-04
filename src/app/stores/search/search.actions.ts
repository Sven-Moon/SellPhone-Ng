import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { SearchResults } from "src/app/models/SearchResults";

// -- SUBMIT -- 
export const submitSearch = createAction(
  "[Search Component] Load Products",
  props<{ searchText: string }>()
);

// -- RETURN FROM SERVER
export const returnSearchResultsSuccess = createAction(
  "[Search Effect] Load Products Success",
  props<{ results: SearchResults[] }>()
);
export const returnSearchResultsFailure = createAction(
  "[Search Effect] Load Products Failure",
  props<{ error: any }>()
);