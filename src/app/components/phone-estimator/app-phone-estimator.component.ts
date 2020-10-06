import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-phone-estimator',
  templateUrl: './app-phone-estimator.component.html',
  styleUrls: ['./app-phone-estimator.component.scss']
})
export class AppPhoneEstimatorComponent implements OnInit {

  constructor(private title: Title) {}

  ngOnInit() {    
    this.title.setTitle('selphone-ng');
  }

  selectedType: String = "--Choose Type--";
  selectedModel: String = "--Choose Model--";

  phoneTypes = [
    {"id": -1, "name": "-- Select Phone type -- "},
    {"id": 1, "name": "iPhone "},
    {"id": 2, "name": "Android "},
    {"id": 3, "name": "Other"},
   ];
   phoneModels = [];
   phoneValue: String = "";
   isPhoneValuePanelVisible: boolean = false;

  public onSelectedPhoneTypeChange(e) {
    console.log(e);
    let typeId = e.target.selectedOptions[0].id;
    console.log("newly selected phoneType is: " + typeId);    
    this.phoneModels = this.getPhoneModelsByType(typeId);
  }

  public onSelectedPhoneModelChange(e) {
    let modelId = e.target.selectedOptions[0].id;
    console.log("new phone Model ID is: " + modelId);
  }

  private getPhoneModelsByType(typeId) {
    console.log(typeId);
    if (typeId == 1) {
      return [
        { "id": 1, "name": "iPhone 7" },
        { "id": 2, "name": "iPhone 8" }
      ]
    } else if (typeId == 2) {
      return [
        { "id": 5, "name": "Pixel 1" },
        { "id": 5, "name": "Pixel 2" },
      ]
    } else {
      return [];
    }
  }
}