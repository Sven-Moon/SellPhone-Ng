import { Component, OnInit } from '@angular/core';
import { SearchResults } from 'src/app/models/SearchResults';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSearchResults } from 'src/app/stores/search/search.selectors';


@Component({
  selector: 'app-search-results',
  templateUrl: './app-search-results.component.html',
  styleUrls: ['./app-search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchResults:SearchResults;
  private searchResultsSubscription;
  searchText:string='';
  searchResults$: Observable<SearchResults[]>;

  constructor(private _store: Store<any>) { }

  public ngOnInit(): void {
    //.select('searchResults') matches the name of the function in the store
    this.searchResultsSubscription = this._store.select('searchResults').subscribe((sr: SearchResults) => {
      this.searchResults = sr;
    })


  }

  loadSearchResults() {
    // todo: make selector (necessary here?)
    this.searchResults$ = this._store.pipe(select(selectSearchResults));
  }

  ngOnDestory() {
    this.searchResultsSubscription.unsubscribe();
  }

}
