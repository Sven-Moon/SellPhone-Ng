import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Condition } from '../models/Condition';
import { PhoneModels } from '../models/PhoneModels';
import { PhoneType } from '../models/PhoneType';
import { PhoneTypes } from '../models/PhoneTypes';
import { StaticData } from '../models/StaticData';
import { USA_State } from '../models/USA_State';

@Injectable()
export class MockStaticDataInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    let baseUrl = environment.baseUrl
    if (req.method === 'GET' && req.url == baseUrl + 'api/staticdata/') {
      const staticData = this.getMockStaticData();
      const response = new HttpResponse({
        body: staticData
      });
      return of(response);
    }

    else if (req.method === 'POST' && req.url == baseUrl + 'api/usa-states') {
      const usaStates = this.getMockUsaStates();
      const response = new HttpResponse({
        body: usaStates
      });
      return of(response);
    }

    else if (req.method === 'POST' && req.url == baseUrl + 'api/phone-types') {
      const phoneTypes = this.getMockPhoneTypes();
      const response = new HttpResponse({
        body: phoneTypes
      });
      return of(response);
    }

    else if (req.method === 'POST' && req.url == baseUrl + 'api/phone-models-by-type') {
      const phoneModelsByType = this.getMockPhoneModelsByType();
      const response = new HttpResponse({
        body: phoneModelsByType
      });
      return of(response);
    }
    return next.handle(req);
  }

  private getMockStaticData(): StaticData {
    return {
      usaStates: this.getMockUsaStates(),
      phoneTypes: this.getMockPhoneTypes(),
      phoneModelsByType: this.getMockPhoneModelsByType(),
      conditions: this.getMockConditions(),
      orderStatus: this.getMockOrderStatus()
    }
  }

  private getMockUsaStates(): USA_State[] {
    return [
      {"name": "Alabama","id": "AL"},
      {"name": "Alaska","id": "AK"},
      {"name": "American Samoa","id": "AS"},
      {"name": "Arizona","id": "AZ"},
      {"name": "Arkansas","id": "AR"},
      {"name": "California","id": "CA"},
      {"name": "Colorado","id": "CO"},
      {"name": "Connecticut","id": "CT"},
      {"name": "Delaware","id": "DE"},
      {"name": "District Of Columbia","id": "DC"},
      {"name": "Federated States Of Micronesia","id": "FM"},
      {"name": "Florida","id": "FL"},
      {"name": "Georgia","id": "GA"},
      {"name": "Guam","id": "GU"},
      {"name": "Hawaii","id": "HI"},
      {"name": "Idaho","id": "ID"},
      {"name": "Illinois","id": "IL"},
      {"name": "Indiana","id": "IN"},
      {"name": "Iowa","id": "IA"},
      {"name": "Kansas","id": "KS"},
      {"name": "Kentucky","id": "KY"},
      {"name": "Louisiana","id": "LA"},
      {"name": "Maine","id": "ME"},
      {"name": "Marshall Islands","id": "MH"},
      {"name": "Maryland","id": "MD"},
      {"name": "Massachusetts","id": "MA"},
      {"name": "Michigan","id": "MI"},
      {"name": "Minnesota","id": "MN"},
      {"name": "Mississippi","id": "MS"},
      {"name": "Missouri","id": "MO"},
      {"name": "Montana","id": "MT"},
      {"name": "Nebraska","id": "NE"},
      {"name": "Nevada","id": "NV"},
      {"name": "New Hampshire","id": "NH"},
      {"name": "New Jersey","id": "NJ"},
      {"name": "New Mexico","id": "NM"},
      {"name": "New York","id": "NY"},
      {"name": "North Carolina","id": "NC"},
      {"name": "North Dakota","id": "ND"},
      {"name": "Northern Mariana Islands","id": "MP"},
      {"name": "Ohio","id": "OH"},
      {"name": "Oklahoma","id": "OK"},
      {"name": "Oregon","id": "OR"},
      {"name": "Palau","id": "PW"},
      {"name": "Pennsylvania","id": "PA"},
      {"name": "Puerto Rico","id": "PR"},
      {"name": "Rhode Island","id": "RI"},
      {"name": "South Carolina","id": "SC"},
      {"name": "South Dakota","id": "SD"},
      {"name": "Tennessee","id": "TN"},
      {"name": "Texas","id": "TX"},
      {"name": "Utah","id": "UT"},
      {"name": "Vermont","id": "VT"},
      {"name": "Virgin Islands","id": "VI"},
      {"name": "Virginia","id": "VA"},
      {"name": "Washington","id": "WA"},
      {"name": "West Virginia","id": "WV"},
      {"name": "Wisconsin","id": "WI"},
      {"name": "Wyoming","id": "WY"}
    ]
  }

  private getMockPhoneTypes(): PhoneType[] {
    return [
      {"typeId": 1, "name": "iPhone"},
      {"typeId": 2, "name": "Android"},
      {"typeId": 3, "name": "Other"}
    ]
  }

  private getMockPhoneModelsByType(): PhoneModels[] {
  return [
    {"typeId": 1,
      "phoneModels": [
        { "modelId": 1, "name": "iPhone 7", "maxValue": 200 },
        { "modelId": 2, "name": "iPhone 8", "maxValue": 300 },
        { "modelId": 3, "name": "iPhone 9", "maxValue": 500 },
        { "modelId": 4, "name": "iPhone X", "maxValue": 700 }
      ]
    },
    {"typeId": 2,
      "phoneModels": [
        { "modelId": 11, "name": "Pixel 1", "maxValue": 100 },
        { "modelId": 12, "name": "Pixel 2", "maxValue": 200 },
        { "modelId": 13, "name": "Pixel 3", "maxValue": 300 },
        { "modelId": 14, "name": "Pixel 4", "maxValue": 400 }
      ]
    },
    {"typeId": 3,
      "phoneModels": [
        { "modelId": 21, "name": "Windows", "maxValue": 20 },
        { "modelId": 22, "name": "Uport", "maxValue": 15 }
      ]
    }
  ]
  }

  private getMockConditions(): Condition[] {
    return [
      {"id":"Excellent", "priceMod": 1},
      {"id":"Very Good", "priceMod": 0.9},
      {"id":"Good", "priceMod": 0.7},
      {"id":"Poor", "priceMod": 0.4},
      {"id":"Inoperable", "priceMod": 0.2}]
   }

   private getMockOrderStatus(){
     return [
      "new",
      "incomplete",
      "pending",
      "cancelled",
      "complete"
    ]
   }
}
