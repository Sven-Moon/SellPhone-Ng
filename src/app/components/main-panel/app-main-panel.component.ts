import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { SearchResult } from 'src/app/models/SearchResult';
import { siteSearchResults } from 'src/app/stores/search/search.selectors';

@Component({
  selector: 'app-main-panel',
  templateUrl: './app-main-panel.component.html',
  styleUrls: ['./app-main-panel.component.scss']
})
export class AppMainPanelComponent {
  searchResults: SearchResult[] = [];

  searchResults$: Observable<SearchResult[]>;


  constructor(private _store: Store<any>) { }

  public ngOnInit(): void {
    this.loadSearchResults();
  }

  loadSearchResults() {
    this.searchResults$ = this._store.pipe(select(siteSearchResults));
    this.searchResults$.subscribe(data => this.searchResults = data);
  }
}
