import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { StaticData } from '../models/StaticData';
import { LOAD_STATIC_DATA } from '../stores/staticData.store';

@Injectable()
export class StaticDataActions {
  constructor(
    private _store: Store,
    private _http: HttpClient
  ){}

  public getStaticData():void {
    const url: string = 'api/static-data';
    const body: string = '';
    const httpOptions = {};
    debugger;
    this._http.post<StaticData>(url,body,httpOptions)
    .subscribe((staticData) => {
      debugger;
      console.log('Dispatch:');
      console.log(staticData);
      this._store.dispatch({
        type: LOAD_STATIC_DATA,
        payload: staticData
      })
    })
  }
}
