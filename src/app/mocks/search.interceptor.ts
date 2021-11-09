import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchResults } from '../models/SearchResults';

@Injectable()
export class MockSearchInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = environment.baseUrl + 'api/search'
    if (req.method === 'POST' && req.url === url) {
      const searchResponse = this.processSearchMock(req.body);
      const response = new HttpResponse({
        body: searchResponse
      });
      return of(response);
    }
    return next.handle(req);
  }

  // probably processes the bulk data returned... maybe
  private processSearchMock(searchRequest: string): SearchResults {
    return this.getSearchResultsMockData(searchRequest);
  }

  private getSearchResultsMockData(searchText:string):SearchResults {
    return {
      results: [
      {
        "id": 1,
        "name": "iPhone 7"
      },
      {
        "id": 2,
        "name": "iPhone X"
      },
      {
        "id": 3,
        "name": "Windows"
      },
      {
        "id": 4,
        "name": "Pixel 2"
      },
      {
        "id": 5,
        "name": "Pixel 3"
      },
      {
        "id": 6,
        "name": "Pixel 2"
      },
      {
        "id": 7,
        "name": "Pixel 1"
      }
    ]
  };
}
}
