import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaticData } from '../models/StaticData';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  constructor(
    private http: HttpClient
  ) {}

  baseUrl = 'http://localhost:3000/';

  getStaticData(): Observable<StaticData> {
    const url = this.baseUrl + 'staticdata/';
    const body = '';
    let httpOptions: {};

    return this.http.get<any>(url);
  }
}
