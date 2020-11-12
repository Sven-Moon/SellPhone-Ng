import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createAction, props, Store } from '@ngrx/store';
import { SearchResults } from '../models/SearchResults';
import { CLEAR_SEARCH_RESULTS, searchResults, UPDATE_SEARCH_RESULTS } from '../stores/searchResults.store';

@Injectable()
export class SearchActions {
  constructor (
    private _store: Store<any>,
    private _http: HttpClient // "member variable"
  ) { }

  public submitSearch(searchText:string): void {
    // const searchResults = this.getSearchResultsMockData(searchText);
    // this._store.dispatch({ type: UPDATE_SEARCH_RESULTS, payload:searchResults});
    const url: string = '/api/search';
    const body: string = searchText;
    const httpOptions = {};

    this._http.post<SearchResults>(url, body, httpOptions)
    .subscribe((searchResults:SearchResults) => {
      this._store.dispatch({ type: UPDATE_SEARCH_RESULTS, payload: searchResults });
    });
  }

  public clearSearch():void {
    this._store.dispatch({ type: CLEAR_SEARCH_RESULTS });
  }

  // private getSearchResultsMockData(searchText:string):SearchResults {
  //     return {
  //       results: [
  //       {
  //         "id": 1,
  //         "name": "iphone 7"
  //       },
  //       {
  //         "id": 2,
  //         "name": "iphone X"
  //       },
  //       {
  //         "id": 3,
  //         "name": "windows"
  //       },
  //       {
  //         "id": 4,
  //         "name": "pixel 2"
  //       },
  //       {
  //         "id": 5,
  //         "name": "pixel 3"
  //       },
  //       {
  //         "id": 6,
  //         "name": "pixel 32"
  //       },
  //       {
  //         "id": 7,
  //         "name": "pixel 82"
  //       }
  //     ]
  //   };
  // }

}
