import { Component } from '@angular/core';
import { SearchActions } from 'src/app/actions/search.actions';
import { SearchResults } from 'src/app/models/SearchResults';

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
    private searchActions: SearchActions
  ) { }

   public onSearchRequested():void {

    if (!this.searchText) {
      this.searchActions.clearSearch();
    } else {
      // Why does it think the passed object is a string?
      this.searchActions.submitSearch(this.searchText);
    }
  }

}
