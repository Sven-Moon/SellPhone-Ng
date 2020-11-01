import { Component, OnInit } from '@angular/core';
import { SearchResults } from 'src/app/models/SearchResults';
import { SearchResult } from '../../models/SearchResult';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search-results',
  templateUrl: './app-search-results.component.html',
  styleUrls: ['./app-search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchResults$:Observable<SearchResults>;
  searchText:string='';

  constructor(private store: Store<SearchResults>) { }

  ngOnInit(): void {
  }

  public getSearchResults():void {
    this.store.select(store => store.results)
  }
}
