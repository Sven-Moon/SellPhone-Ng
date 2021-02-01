import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sale-calculator',
  templateUrl: './sale-calculator.component.html',
  //Template-driven method
  template:` 
  Condition: <input type="text" [(ngModel)]="phonecondition">
  `,
  styleUrls: ['./sale-calculator.component.scss']
})
export class SaleCalculatorComponent implements OnInit {

  constructor(
    private _router: Router,
    private _store: Store<any>
  ) { }

  ngOnInit(): void {
    // TO DO: Add phoneTypes & phoneModels 
    // probably move selected phoneType/Model to calculator store
    // phoneType$ = this._store.dispatch(select(selectedPhoneType));
    // phoneModel$ = this._store.dispatch(select(selectedPhoneModel));
  }

  // Reactive Method
  phoneTypeControl = new FormControl('');
  phoneModelControl = new FormControl('');
  phoneConditionControl = new FormControl('');


  // Template-driven Method
  phoneCondition = '';
}
