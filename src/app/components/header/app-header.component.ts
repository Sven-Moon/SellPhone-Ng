import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  @Output() onSearchResultsReceived: EventEmitter<any> = new EventEmitter();

  public onSearchResults(searchResults:Array<string>): void {
    this.onSearchResultsReceived.emit(searchResults); // reemit data
  }
}