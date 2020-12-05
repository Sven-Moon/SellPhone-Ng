import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { PhoneTypes } from '../models/PhoneTypes';
import { UPDATE_PHONE_TYPES } from '../stores/estimatorTypes.store';

@Injectable()
export class EstimatorTypeActions {
  constructor (
    private _store: Store,
    private _http: HttpClient
  ) {}

  public getPhoneTypes():void {
    const url: string = 'api/estimator-types';
    const body: string = '';
    const httpOptions = {};
    this._http.post<PhoneTypes>(url,body,httpOptions)
    .subscribe((phoneTypes:PhoneTypes) => {
      this._store.dispatch({
        type: UPDATE_PHONE_TYPES,
        payload: phoneTypes})
      }
    )
  }

}
