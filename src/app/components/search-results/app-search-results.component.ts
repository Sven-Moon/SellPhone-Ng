import { Component, OnInit } from '@angular/core';
import { SearchResults } from 'src/app/models/SearchResults';
import { SearchResult } from '../../models/SearchResult';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search-results',
  templateUrl: './app-search-results.component.html',
  styleUrls: ['./app-search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchResults:SearchResults;
  private searchResultsSubscription;
  searchText:string='';

  constructor(private _store: Store<any>) { }

  public ngOnInit(): void {
    //search results matches the name of the function in the store
    this.searchResultsSubscription = this._store.select('searchResults').subscribe((sr: SearchResults) => {
      debugger
      this.searchResults = sr;
    })
  }

  ngOnDestory() {
    this.searchResultsSubscription.unsubscribe();
  }

}
