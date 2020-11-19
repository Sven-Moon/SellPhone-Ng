import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { PhoneTypes } from '../models/PhoneTypes';
import { GET_PHONE_TYPES } from '../stores/estimatorTypes.store';

@Injectable()
export class EstimatorTypeActions {
  constructor (
    private _store: Store,
    private _http: HttpClient
  ) {}

  public getPhoneTypes():void {
    const url: string = 'api/estimator';
    const body: string = '';
    const httpOptions = {};

    this._http.post<PhoneTypes>(url,body,httpOptions)
    .subscribe((phoneTypes:PhoneTypes) =>
      this._store.dispatch({
        type: GET_PHONE_TYPES,
        payload: phoneTypes
      })
    )
    // const phoneTypes = this.getPhoneTypesMockData()
    // this._store.dispatch( {
    //   type: GET_PHONE_TYPES,
    //   payload: phoneTypes
    //  } )

  }

  // private getPhoneTypesMockData ():PhoneTypes {
  //   return {
  //     results: [
  //     {"id": 1, "name": "iPhone "},
  //     {"id": 2, "name": "Android "},
  //     {"id": 3, "name": "Other"},
  //    ]}
  // }

}
