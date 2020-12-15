import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { PhoneType } from '../models/PhoneType';
import { PhoneTypes } from '../models/PhoneTypes';
import { StaticData } from '../models/StaticData';
import { LOAD_STATIC_DATA, UPDATE_PHONE_MODELS, UPDATE_PHONE_TYPES, UPDATE_USA_STATES } from '../stores/staticData.store';

@Injectable()
export class StaticDataActions {
  constructor (
    private _store: Store,
    private _http: HttpClient
  ) {}

  public getStaticData():void {
    const url: string = 'api/static-data';
    const body: string = '';
    const httpOptions = {};
    this._http.post<StaticData>(url,body,httpOptions)
    .subscribe((staticData) => {
      this._store.dispatch({
        type: LOAD_STATIC_DATA,
        payload: staticData
      })
    })
  }

  public getUsaStates():void {
    const url: string = 'api/usa-states';
    const body: string = '';
    const httpOptions = {};
    this._http.post<StaticData>(url,body,httpOptions)
    .subscribe((usaStates) => {
      this._store.dispatch({
        type: UPDATE_USA_STATES,
        payload: usaStates
      })
    })
  }

  public getPhoneTypes():void {
    const url: string = 'api/phone-types';
    const body: string = '';
    const httpOptions = {};
    this._http.post<StaticData>(url,body,httpOptions)
    .subscribe((phoneTypes) => {
      this._store.dispatch({
        type: UPDATE_PHONE_TYPES,
        payload: phoneTypes
      })
    })
  }

  public getPhoneModelsByType():void {
    const url: string = 'api/phone-models-by-type';
    const body: string = '';
    const httpOptions = {};
    this._http.post<StaticData>(url,body,httpOptions)
    .subscribe((phoneModelsByType) => {
      this._store.dispatch({
        type: UPDATE_PHONE_MODELS,
        payload: phoneModelsByType
      })
    })    
  }
}
