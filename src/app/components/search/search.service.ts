import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient ) {  }


  public getSearchResults(searchText:string):any{
    return this.http.get('data/fakeDB.json')
  };

}
