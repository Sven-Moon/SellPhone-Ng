import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { SearchResult } from 'src/app/models/SearchResult';
import { SearchResults } from 'src/app/models/SearchResults';
import { selectSearchResults } from 'src/app/stores/search/search.selectors';

@Component({
  selector: 'app-main-panel',
  templateUrl: './app-main-panel.component.html',
  styleUrls: ['./app-main-panel.component.scss']
})
export class AppMainPanelComponent {
  searchResults:SearchResults;
  private searchResultsSubscription;

  searchResults$: Observable<SearchResult[]>;


  constructor(private _store: Store<any>) { }

  public ngOnInit(): void {
    //.select('searchResults') matches the name of the function in the store
    // this.searchResultsSubscription = this._store.select('searchResults').subscribe((sr: SearchResults) => {
    //   this.searchResults = sr;
    // })
  }

  
  loadSearchResults() {
    this.searchResults$ = this._store.pipe(select(selectSearchResults));
  }

  // ngOnDestory() {
  //   this.searchResultsSubscription.unsubscribe();
  // }
}
