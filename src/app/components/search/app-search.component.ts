import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss']
})
export class AppSearchComponent {
  
  searchText:string = '';
  searchResults:Array<string>=[];
  @Output() onSearchResultsReceived: EventEmitter<any> = new EventEmitter();

  public onSearchRequested() {
    // debugger;    
    console.log("value of searchText (may be): "+this.searchText);

    if (!this.searchText) { // don't call the api unless there is actually a search 
      this.searchResults=[];
    } else {
      // to do: create search service that calls API 
      this.searchResults = this.getSearchResults(this.searchText);  
    }
    this.onSearchResultsReceived.emit(this.searchResults);
  }

  private getSearchResults(searchText:string):Array<string> {
    // mock API call
    let searchArray = [
      'android','iphone','windows','iphone 7', 'iphone 8','iphone 9', 'iphone X', 'pixel 1', 'pixel 2', 'pixel 3', 'pixel 4', 'pixel 3a', 'pixel 4a', 'LG curve', 'lg droid'
    ];
    return searchArray;
  }
}