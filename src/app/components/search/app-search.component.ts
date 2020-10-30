import { Component } from '@angular/core';
import { Observable, observable, fromEvent } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss']
})
export class AppSearchComponent {
  constructor(private searchService: SearchService ) { }

  searchText:string;
  searchTextObs:Observable<string>;


   public onSearchRequested() {
    // debugger;
    console.log("value of searchText (may be): "
      +this.searchText);

    if (!this.searchText) {
      // don't call the api unless there is a search
      return;
      // update the searchText value in the search service
    } else {
      const searchResults = this.searchService
        .getSearchResults(this.searchText);
      console.log(searchResults);
    }
  }

  // private getSearchResults(searchText:string):Array<string> {
  //   // mock API call
  //   return searchArray;
  // }
}
