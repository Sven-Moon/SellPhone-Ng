import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { SearchResult } from 'src/app/models/SearchResult';
import { SearchResults } from 'src/app/models/SearchResults';
import { siteSearchResults } from 'src/app/stores/search/search.selectors';

@Component({
  selector: 'app-main-panel',
  templateUrl: './app-main-panel.component.html',
  styleUrls: ['./app-main-panel.component.scss']
})
export class AppMainPanelComponent {
  searchResults:SearchResult[]=[];
  private searchResultsSubscription;

  searchResults$: Observable<SearchResult[]>;


  constructor(private _store: Store<any>) { }

  public ngOnInit(): void {
    //.select('searchResults') matches the name of the function in the store
    // this.searchResultsSubscription = this._store.select('searchResults').subscribe((sr: SearchResults) => {
    //   this.searchResults = sr;
    // })
    this.loadSearchResults();
  }


  loadSearchResults() {
    this.searchResults$ = this._store.pipe(select(siteSearchResults));
    this.searchResults$.subscribe(data => this.searchResults = data);
  }

  // ngOnDestory() {
  //   this.searchResultsSubscription.unsubscribe();
  // }
}
