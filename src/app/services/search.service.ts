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

  // public getSearchResultsDB() {
  //   return this.http.get('server/database.json')
  // };

  // don't submit search text for now
  // getSearchResultsDB(searchText: string): Observable<SearchResults> {
  //   return this.http.get<SearchResults>(this.baseUrl + searchText);
  // }
  baseUrl: string = "http://localhost:3000/results";

  public getSearchResultsDB(): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(this.baseUrl);
  }

  // public getSearchResults(inputText:string):SearchResults{
  //   // update searchText
  //   return this.searchResultsMockData;
  //   }
}
