import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { PhoneModel } from '../models/phoneModel';

@Injectable()
export class MockEstimatorModelsInterceptor {

  public intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    if (req.method ==='POST' && req.url == '/api/estimator-models') {
      const phoneModels = this.processModelMock(req.body);
      const response = new HttpResponse ({
        body: phoneModels
      });
      return of(response);
    }
    return next.handle(req);
  }

  private processModelMock(typeId):Array<PhoneModel> {
    return this.getPhoneModelsByType(typeId);
  }

  private getPhoneModelsByType(typeId:number):Array<PhoneModel> {

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
