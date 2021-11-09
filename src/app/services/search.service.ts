import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchResult } from '../models/SearchResult';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {  }
  url = environment.baseUrl+ 'api/results';

  public getSearchResultsDB(inputText: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(this.url);
  }
}
