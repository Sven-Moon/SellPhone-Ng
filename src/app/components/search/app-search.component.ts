import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss']
})
export class AppSearchComponent {
  constructor(private searchService: SearchService ) { }
    
  searchText:string = '';
  searchResults:any=[];

  public onSearchRequested() {
    // debugger;    
    console.log("value of searchText (may be): "+this.searchText);

    if (!this.searchText) { // don't call the api unless there is actually a search 
      this.searchResults=[];
    } else {
      this.searchService.getSearchResults(this.searchText).subscribe(
        data=>{
          this.searchResults=data;
          console.log(data); 
        }
      );  
    }
  }

  // private getSearchResults(searchText:string):Array<string> {
  //   // mock API call
  //   return searchArray;
  // }
}