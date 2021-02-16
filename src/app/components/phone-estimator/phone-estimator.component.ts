import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PhoneModel } from '../../models/PhoneModel';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PhoneType } from 'src/app/models/PhoneType';
import {  selectPhoneModelsList, selectPhoneTypes } from 'src/app/stores/staticData/staticData.selectors';
import { Router } from '@angular/router';
import { updateSelectedPhoneModel } from 'src/app/stores/sale-calculator/sale-calculator.actions';
import { Helpers } from 'src/app/helpers/helpers';


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
    private _helper: Helpers
  ) {}

  ngOnInit() {
    this._title.setTitle('sellphone-ng');
    this.phoneTypes$ = this._store.pipe(select(selectPhoneTypes));
    this.phoneModelsList$ = this._store.pipe(select(selectPhoneModelsList));
  }

  public onSelectedPhoneTypeChange(e:any):void {
    let selectedPhoneType:PhoneType = {
      "typeId": e.target.selectedOptions[0].id,
      "name": e.target.selectedOptions[0].innerText
    }

    this._helper.storeUpdateOnTypeChange(selectedPhoneType);

  }

  public onSelectedPhoneModelChange(e):void {
    let selectedPhoneModel:PhoneModel = {
      modelId: e.target.selectedOptions[0].id,
      name: e.target.selectedOptions[0].innerText
    }
    this.phoneMaxValue = this.onPhoneModelSelect(
      selectedPhoneModel.modelId
    );
    // send selected phone model to  sale-calculator
    this._store.dispatch(updateSelectedPhoneModel(
      { selectedPhoneModel: selectedPhoneModel }))
  }

  private onPhoneModelSelect(id:number):string{
    if (id > 0 ) {
      this.isValueBoxVisible = true;}
    else { this.isValueBoxVisible = false;}
    return Math.round(id*50 + 50).toString();
  }
}
