import { Component } from '@angular/core';
import { Observable, observable, fromEvent } from 'rxjs';
import { SearchService } from '../../shared/services/search.service';

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
    console.log("value of searchText (may be): "+this.searchText);

    if (!this.searchText) {
      // don't call the api unless there is a search
      return;
      // update the searchText value in the search service
    } else {this.searchService.getSearchText(this.searchText)

      // this.searchService.getSearchResults(this.searchText).subscribe(
      //   data=>{
      //     this.searchResults=data;
      //     console.log(data);
      //   }
      // );
    }
  }

  // private getSearchResults(searchText:string):Array<string> {
  //   // mock API call
  //   return searchArray;
  // }
}
