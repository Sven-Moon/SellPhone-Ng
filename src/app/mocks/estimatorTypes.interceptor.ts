import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { PhoneModels } from '../models/phoneModels';
import { PhoneTypes } from '../models/PhoneTypes';

@Injectable()
export class MockEstimatorTypesInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url == 'api/estimator-types') {
      const phoneTypes = this.getPhoneTypesMockData();
      const response = new HttpResponse({
        body: phoneTypes
      });
      return of(response);
    }
    else if (req.method ==='POST' && req.url == '/api/estimator-models') {
      const phoneModels = this.getPhoneModelsByType(req.body);
      const response = new HttpResponse ({
        body: phoneModels
      });
      return of(response);
    }
    return next.handle(req);
  }

  private getPhoneTypesMockData ():PhoneTypes {
    return {
      results: [
      {"id": 1, "name": "iPhone "},
      {"id": 2, "name": "Android "},
      {"id": 3, "name": "Other"},
     ]}
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
