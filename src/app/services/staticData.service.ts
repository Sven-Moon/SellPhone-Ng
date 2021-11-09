import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StaticData } from '../models/StaticData';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  constructor(
    private http: HttpClient
  ) {}

  getStaticData(): Observable<StaticData> {
    const url = environment.baseUrl + 'api/staticdata/';
    const body = '';
    let httpOptions: {};

    return this.http.get<any>(url);
  }
}
