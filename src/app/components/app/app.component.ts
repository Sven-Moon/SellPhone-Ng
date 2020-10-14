import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public searchResults:Array<string>=[]; // needed b/c at top level, passes value down

  public onSearchResults(searchResults:Array<string>): void {
    this.searchResults = searchResults;
  }
}