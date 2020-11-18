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
    // const url: string = 'api/estimator';
    // const body: string = phoneTypeText;
    // const httpOptions = {};

    // this._http.post<PhoneModels>(url,body,httpOptions)
    //   .subscribe((phoneModels:PhoneModels) =>
    //   this._store.dispatch({
    //     type: UPDATE_PHONE_MODELS,
    //     payload: phoneModels
    //   }))
    const phoneModels = this.getPhoneModelsByType(typeId);
    this._store.dispatch({
      type: UPDATE_PHONE_MODELS,
      payload: phoneModels
    })
  }

  public clearPhoneModels():void {
    this._store.dispatch({ type: CLEAR_PHONE_MODELS })
  }

  public getPhoneModelsByType(typeId:number):Array<PhoneModel> {

    if (typeId == 1) {
      return [
        { "id": 1, "name": "iPhone 7" },
        { "id": 2, "name": "iPhone 8" },
        { "id": 3, "name": "iPhone 9" },
        { "id": 4, "name": "iPhone X" }
      ]
    } else if (typeId == 2) {
      return [
        { "id": 5, "name": "Pixel 1" },
        { "id": 6, "name": "Pixel 2" },
      ]
    } else if (typeId == 3) {
      return [
        { "id": 5, "name": "Windows" },
        { "id": 6, "name": "Uport" },
      ]
    } else {
      return [];
    }
  }
}
