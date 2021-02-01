import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PhoneModel } from '../../models/PhoneModel';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updatePhoneModelsList } from 'src/app/stores/staticData/staticData.actions';
import { PhoneType } from 'src/app/models/PhoneType';
import {  selectPhoneModelsList, selectPhoneTypes } from 'src/app/stores/staticData/staticData.selectors';
import { Router } from '@angular/router';


@Component({
  selector: 'app-phone-estimator',
  templateUrl: './phone-estimator.component.html',
  styleUrls: ['./phone-estimator.component.scss']
})
export class PhoneEstimatorComponent implements OnInit {
  phoneTypes$: Observable<Array<PhoneType>>;
  phoneModelsList$: Observable<Array<PhoneModel>>;
  phoneMaxValue: string = "";
  isValueBoxVisible: boolean = false;

  constructor(
    private _title: Title,
    private _store: Store<any>,
    private _router: Router
  ) {}

  ngOnInit() {
    this._title.setTitle('sellphone-ng');
    this.phoneTypes$ = this._store.pipe(select(selectPhoneTypes));
    this.phoneModelsList$ = this._store.pipe(select(selectPhoneModelsList));
  }

  public onSelectedPhoneTypeChange(e:any):void {
    let typeId:number = e.target.selectedOptions[0].id;
    this._store.dispatch(updatePhoneModelsList({ typeId: typeId }))
  } 
  
  public onSelectedPhoneModelChange(e):void {
    let modelId: number = e.target.selectedOptions[0].id;
    this.phoneMaxValue = this.onPhoneModelSelect(modelId);
  }

  private onPhoneModelSelect(id:number):string{
    if (id > 0 ) {
      this.isValueBoxVisible = true;}
    else { this.isValueBoxVisible = false;}
    return Math.round(id*50 + 50).toString();
  }
}
