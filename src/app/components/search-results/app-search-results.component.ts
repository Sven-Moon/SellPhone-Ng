import { Component, OnInit } from '@angular/core';
import { SearchResults } from 'src/app/models/SearchResults';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSearchResults } from 'src/app/stores/search/search.selectors';
import { SearchResult } from 'src/app/models/SearchResult';


@Component({
  selector: 'app-search-results',
  templateUrl: './app-search-results.component.html',
  styleUrls: ['./app-search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  // searchResults:SearchResults;
  // private searchResultsSubscription;
  // searchText:string='';
  searchResults$: Observable<SearchResult[]>;

  constructor(private _store: Store<any>) { }

  public ngOnInit(): void {

    // --- REACTIVATE FOR DATED METHOD ---
    // this.searchResultsSubscription = this._store.select('searchResults')
    //   .subscribe((sr: SearchResult[]) => {
    //   this.searchResults = sr;
    // })
    //  ---


  }

  loadSearchResults() {
    this.searchResults$ = this._store.pipe(select(selectSearchResults));
  }

  // ngOnDestory() {
  //   this.searchResultsSubscription.unsubscribe();
  // }

}
