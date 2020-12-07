import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { PhoneModel } from '../models/phoneModel';
import { CLEAR_PHONE_MODELS, UPDATE_PHONE_MODELS } from '../stores/estimatorModels.store';

@Injectable()
export class EstimatorModelActions {
  constructor (
    private _store: Store,
    private _http: HttpClient
  ) {}

  public getPhoneModels(typeId:number):void {

    const url = '/api/estimator-models';
    const body = typeId;
    const httpOptions = {};

    this._http.post(url,body,httpOptions)
      .subscribe((phoneModels) => {
        this._store.dispatch({
          type: UPDATE_PHONE_MODELS,
          payload: phoneModels
        })
      })
  }

  public clearPhoneModels():void {
    this._store.dispatch({ type: CLEAR_PHONE_MODELS })
  }

}
