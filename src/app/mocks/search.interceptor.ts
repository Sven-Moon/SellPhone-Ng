import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { SearchResults } from '../models/SearchResults';

@Injectable()
export class MockSearchInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url == '/api/search') {
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
        "name": "iphone 7"
      },
      {
        "id": 2,
        "name": "iphone X"
      },
      {
        "id": 3,
        "name": "windows"
      },
      {
        "id": 4,
        "name": "pixel 2"
      },
      {
        "id": 5,
        "name": "pixel 3"
      },
      {
        "id": 6,
        "name": "pixel 32"
      },
      {
        "id": 7,
        "name": "pixel 82"
      }
    ]
  };
}
}
