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
  selectedPhoneModelId = -1;

  public  onSelectedPhoneModelIdChange(id) {
    console.log(id)
  }
}
