import { Component, OnInit } from '@angular/core';
import { SearchResults } from 'src/app/models/SearchResults';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { siteSearchResults } from 'src/app/stores/search/search.selectors';
import { SearchResult } from 'src/app/models/SearchResult';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search-results',
  templateUrl: './app-search-results.component.html',
  styleUrls: ['./app-search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchResults: SearchResult[] = [];
  searchResults$: Observable<SearchResult[]>;

  constructor(
    private _store: Store<any>,
    private _router: Router
  ) { }

  public ngOnInit(): void {

    this.loadSearchResults();
  }

  loadSearchResults() {
    this.searchResults$ = this._store.pipe(select(siteSearchResults));
    this.searchResults$.subscribe(data => this.searchResults = data);
  }

}
