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

  selectedType: String = "--Choose Phone Type--";

  phones = [
    {type: "--Select Phone Type--"},
    {type: "iPhone", models: [ "iPhone 7", "iPhone 8", "iPhone 9", "iPhone X"]},
    {type: "Android", models: [ "Pixel 2", "Pixel 3", "Pixel 3a", "Pixel 4"]},
    {type: "Other", models: [ "Windows", "UPort", "Nokia"]}
   ];

   models: Array<any>;

  public  changeType(type) {
    this.models = this.phones.find(model => model.type = type).models
  }
  public onSelectedPhoneModelIdSelect(id) {
    console.log(id)
  }
}