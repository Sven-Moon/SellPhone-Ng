import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { PhoneModel } from '../models/phoneModel';
import { PhoneTypes } from '../models/PhoneTypes';
import { getPhoneTypesAction } from '../stores/estimatorTypes.store';

@Injectable()
export class MockEstimatorInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url == 'api/estimator') {
      const phoneTypes = this.processTypesMock();
      const response = new HttpResponse({
        body: phoneTypes
      });
      return of(response);
    }
    return next.handle(req);
  }

  // public intercept(){};

  private processTypesMock(): PhoneTypes {
    return this.getPhoneTypesMockData();
  }

  private getPhoneTypesMockData ():PhoneTypes {
    return {
      results: [
      {"id": -1, "name": "-- Select Phone type -- "},
      {"id": 1, "name": "iPhone "},
      {"id": 2, "name": "Android "},
      {"id": 3, "name": "Other"},
     ]}
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
