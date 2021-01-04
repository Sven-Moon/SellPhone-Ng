import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/SearchResult';
import { SearchResults } from '../models/SearchResults';
import { searchResults } from '../stores/searchResults.store';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  

constructor(private http: HttpClient) {  }
  baseUrl: string = "http://localhost:3000/search/";

  // public getSearchResults() {
  //   return this.http.get('data/fakeDB.json')
  // };
  getSearchResultsDB(searchText: string): Observable<SearchResults> {
    return this.http.get<SearchResults>(this.baseUrl + searchText);
  }

  // public getSearchResults(inputText:string):SearchResults{
  //   // update searchText
  //   return this.searchResultsMockData;
  //   }
}
