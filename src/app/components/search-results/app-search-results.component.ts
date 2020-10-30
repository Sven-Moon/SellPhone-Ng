import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { SearchResult } from '../../models/SearchResult';

@Component({
  selector: 'app-search-results',
  templateUrl: './app-search-results.component.html',
  styleUrls: ['./app-search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchResults:any=[];
  searchText:string='';

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  // public getSearchResults():void {
  //   this.searchService.getSearchResults().subscribe(data =>
  //     {this.searchResults = data;
  //     console.log(this.searchResults);}
  //   )
  // }
}
