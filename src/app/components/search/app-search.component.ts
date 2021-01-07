import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchActions } from 'src/app/actions/search.actions';
import { SearchResults } from 'src/app/models/SearchResults';
import * as fromSearchActions from 'src/app/stores/search/search.actions';

export interface SearchText {
  searchText: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss']
})
export class AppSearchComponent {
  searchText:string;
  // should store be called in the constructor to update
  // searchResults or can the action just go take care of that?
  constructor(
    private searchActions: SearchActions,
    private _store: Store<SearchResults>
  ) { }

  public onSearchRequested():void {

    if (!this.searchText) {
      this.searchActions.clearSearch();
    } else {
      // Why does it think the passed object is a string?
      this.searchActions.submitSearch(this.searchText);
    }

    if (!this.searchText) {
      this._store.dispatch(fromSearchActions.clearSearch());
    } else {
      this._store.dispatch(fromSearchActions.submitSearch({ searchText: this.searchText }));
    }
  }
}
