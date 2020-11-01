import { createReducer, on } from '@ngrx/store';
import { SearchService } from 'src/app/services/search.service';
import { submitSearch } from '../actions/search.actions';


export const initialState = [];

const searchReducer = createReducer(
  initialState,
  on(submitSearch, (state) => {
    // how do I bring in searchService if I
    // don't have a constructor?
    const searchResults = this.searchService
        .getSearchResults();
      console.log(searchResults);
  })
)
