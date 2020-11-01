import { createAction, props } from '@ngrx/store';
import { SearchText } from 'src/app/components/search/app-search.component';

export const submitSearch = createAction('[Search] Submit Search',
  props<{searchText:SearchText}>())
