import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { PhoneModel } from '../models/phoneModel';
import { PhoneModels } from '../models/phoneModels';
import { PhoneTypes } from '../models/PhoneTypes';

@Injectable()
export class MockEstimatorInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url == 'api/estimator-types') {
      const phoneTypes = this.getPhoneTypesMockData();
      const response = new HttpResponse({
        body: phoneTypes
      });
      return of(response);
    }
    else if (req.method === 'POST' && req.url == '/api/estimator-models') {
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
      {"typeId": 1, "name": "iPhone "},
      {"typeId": 2, "name": "Android "},
      {"typeId": 3, "name": "Other"},
     ]}
  }

  private getPhoneModelsByType(typeId:number):PhoneModel[] {

    if (typeId == 1) {
      return [
        { "modelId": 1, "name": "iPhone 7" },
        { "modelId": 2, "name": "iPhone 8" },
        { "modelId": 3, "name": "iPhone 9" },
        { "modelId": 4, "name": "iPhone X" }
      ]
    } else if (typeId == 2) {
      return [
        { "modelId": 11, "name": "Pixel 1" },
        { "modelId": 12, "name": "Pixel 2" },
        { "modelId": 13, "name": "Pixel 3" },
        { "modelId": 14, "name": "Pixel 4" }
      ]
    } else if (typeId == 3) {
      return
        [
        { "modelId": 21, "name": "Windows" },
        { "modelId": 22, "name": "Uport" }
      ]
    } else {
      return [{"modelId":-1,"name": ""}];
    }
  }

}
