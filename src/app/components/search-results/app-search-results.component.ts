import { Component, OnInit } from '@angular/core';
import { SearchResults } from 'src/app/models/SearchResults';
import { Store } from '@ngrx/store';


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
    //.select('searchResults') matches the name of the function in the store
    this.searchResultsSubscription = this._store.select('searchResults').subscribe((sr: SearchResults) => {
      this.searchResults = sr;
    })
  }

  ngOnDestory() {
    this.searchResultsSubscription.unsubscribe();
  }

}
