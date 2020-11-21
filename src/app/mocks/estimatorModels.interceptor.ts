import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { PhoneModels } from '../models/phoneModels';

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

  private processModelMock(typeId):PhoneModels {
    return this.getPhoneModelsByType(typeId);
  }

  private getPhoneModelsByType(typeId:number):PhoneModels {

    if (typeId == 1) {
      return {results:[
        { "id": 1, "name": "iPhone 7" },
        { "id": 2, "name": "iPhone 8" },
        { "id": 3, "name": "iPhone 9" },
        { "id": 4, "name": "iPhone X" }
      ]}
    } else if (typeId == 2) {
      return {results:[
        { "id": 5, "name": "Pixel 1" },
        { "id": 6, "name": "Pixel 2" },
      ]}
    } else if (typeId == 3) {
      return {results:[
        { "id": 5, "name": "Windows" },
        { "id": 6, "name": "Uport" },
      ]}
    } else {
      return {results:[{"id":-1,"name": ""}]};
    }
  }

}
