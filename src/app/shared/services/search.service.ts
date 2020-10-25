import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { nextTick } from 'process';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchText:string = '';
  searchTextObs = new Observable(data =>
    data.next(this.searchText));

  constructor(private http:HttpClient ) {  }


  public getSearchResults() {
     return this.http.get('data/fakeDB.json')
  };

  public getSearchText(inputText:string){
    // update searchText
    this.searchText= inputText;
    }
}
