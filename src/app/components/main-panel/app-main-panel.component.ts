import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchResults } from 'src/app/models/SearchResults';

@Component({
  selector: 'app-main-panel',
  templateUrl: './app-main-panel.component.html',
  styleUrls: ['./app-main-panel.component.scss']
})
export class AppMainPanelComponent {
  searchResults:SearchResults;
  private searchResultsSubscription;

  constructor(private _store: Store<any>) { }

  public ngOnInit(): void {
    //.select('searchResults') matches the name of the function in the store
    this.searchResultsSubscription = this._store.select('searchResults').subscribe((sr: SearchResults) => {
      this.searchResults = sr;
    })
  }

  ngOnDestory() {
    this.searchResultsSubscription.unsubscribe();
  }
}
