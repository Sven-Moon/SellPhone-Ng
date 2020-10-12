import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss']
})
export class AppSearchComponent {
  title = 'angular-text-search-highlight';
  searchText = '';
  searchArray = [
    'android','iphone','windows','iphone 7', 'iphone 8','iphone 9', 'iphone X', 'pixel 1', 'pixel 2', 'pixel 3', 'pixel 4', 'pixel 3a', 'pixel 4a', 'LG curve', 'lg droid'
  ]

  getSearchResults() {
    // TO DO figure out how to send to child component
    // this.searchText.filter 
  }
}