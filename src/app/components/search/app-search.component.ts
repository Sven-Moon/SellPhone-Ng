import { Component } from '@angular/core';
import { submitSearch } from 'src/app/actions/search.actions';
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
  constructor() { }

   public onSearchRequested() {
    console.log("value of searchText (may be): "
      +this.searchText);

    if (!this.searchText) {
      return;  // don't call the api unless there is a search
    } else {
      // Why does it think the passed object is a string?
      submitSearch({searchText:this.searchText})

    }
  }
}
