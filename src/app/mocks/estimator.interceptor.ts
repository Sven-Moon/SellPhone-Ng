// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
// import { Injectable } from "@angular/core";
// import { Observable, of } from 'rxjs';
// import { PhoneModel } from '../models/PhoneModel';
// import { PhoneModels } from '../models/PhoneModels';
// import { PhoneTypes } from '../models/PhoneTypes';

// @Injectable()
// export class MockEstimatorInterceptor implements HttpInterceptor {

//   public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (req.method === 'POST' && req.url == 'api/estimator-types') {
//       const phoneTypes = this.getPhoneTypesMockData();
//       const response = new HttpResponse({
//         body: phoneTypes
//       });
//       return of(response);
//     }
//     return next.handle(req);
//   }

//   private getPhoneTypesMockData ():PhoneTypes {
//     return {
//       phoneTypes: [
//       {"typeId": 1, "name": "iPhone "},
//       {"typeId": 2, "name": "Android "},
//       {"typeId": 3, "name": "Other"},
//      ]}
//   }

// }
