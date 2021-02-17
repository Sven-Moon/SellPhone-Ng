import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/SearchResult';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {  }
  baseUrl = 'http://localhost:3000/results';

  public getSearchResultsDB(inputText: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(this.baseUrl);
  }
}
