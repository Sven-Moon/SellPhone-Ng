import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { StaticData } from '../models/StaticData';

@Injectable()
export class MockStaticDataInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url == 'api/static-data') {
      const staticData = this.getMockStaticData();
      const response = new HttpResponse({
        body: staticData
      });
      return of(response);
    }
    return next.handle(req);
  }

  private getMockStaticData(): StaticData {
    return {
      usaStates: [
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
      ],
      phoneTypes: [
        {"typeId": 1, "name": "iPhone"},
        {"typeId": 2, "name": "Android"},
        {"typeId": 3, "name": "Other"},
       ],
       phoneModelsByType: [
        {"typeId": 1,
          phoneModels: [
            { "modelId": 1, "name": "iPhone 7" },
            { "modelId": 2, "name": "iPhone 8" },
            { "modelId": 3, "name": "iPhone 9" },
            { "modelId": 4, "name": "iPhone X" }
          ]
        },
        {"typeId": 2,
          phoneModels: [
            { "modelId": 11, "name": "Pixel 1" },
            { "modelId": 12, "name": "Pixel 2" },
            { "modelId": 13, "name": "Pixel 3" },
            { "modelId": 14, "name": "Pixel 4" }
          ]
        },
        {"typeId": 3,
          phoneModels: [
            { "modelId": 21, "name": "Windows" },
            { "modelId": 22, "name": "Uport" }
          ]
        }
      ]
    }
  }
}
