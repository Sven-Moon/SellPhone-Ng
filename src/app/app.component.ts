import { Component } from '@angular/core';
import { NGB_DATEPICKER_18N_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sellphone-ng';
  phoneModels = [
    {"id":-1,"name": "--Select Phone Model--"},
    {"id":1,"name": "iPhone"},
    {"id":2,"name": "Android"},
    {"id":3,"name": "Other"}
   ];

  phoneTypes = [
    {"id":-1,"name": "Select Phone Model--"},
    {"id":1,"name": "iPhone 7"},
    {"id":2,"name": "iPhone 8"},
    {"id":3,"name": "iPhone 9"},
    {"id":4,"name": "iPhone X"},
    {"id":5,"name": "Pixel 1"},
    {"id":6,"name": "Pixel 2"},
  ]

  public  onSelectedPhoneModelIdChange(id) {
    console.log(id)
  }
  public onSelectedPhoneModelIdSelect(id) {
    console.log(id)
  }
}