import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/SearchResult';
import { SearchResults } from '../models/SearchResults';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // searchTextObs = new Observable(data =>
  //   data.next(this.searchText));

  private searchResultsMockData:SearchResults = {
    results: [
    {
      "id": 1,
      "name": "iphone 7"
    },
    {
      "id": 2,
      "name": "iphone X"
    },
    {
      "id": 3,
      "name": "windows"
    },
    {
      "id": 4,
      "name": "pixel 2"
    },
    {
      "id": 5,
      "name": "pixel 3"
    },
    {
      "id": 6,
      "name": "pixel 32"
    },
    {
      "id": 7,
      "name": "pixel 82"
    }
  ]};

constructor( ) {  }

  // public getSearchResults() {
  //   return this.http.get('data/fakeDB.json')
  // };

  public getSearchResults(inputText:string):SearchResults{
    // update searchText
    return this.searchResultsMockData;
    }
}
