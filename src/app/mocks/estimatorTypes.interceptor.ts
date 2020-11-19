import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { PhoneTypes } from '../models/PhoneTypes';

@Injectable()
export class MockEstimatorTypesInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url == 'api/estimator-types') {
      const phoneTypes = this.processTypesMock();
      const response = new HttpResponse({
        body: phoneTypes
      });
      return of(response);
    }
    return next.handle(req);
  }

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

}
