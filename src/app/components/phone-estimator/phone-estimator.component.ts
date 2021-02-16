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
  phoneMaxValue: number = null;
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
    let modelId:number = e.target.selectedOptions[0].id;
  // update selected store if model selected
    if (modelId > 0) {

      this.phoneMaxValue = this._helper.getMaxValue(modelId);

      let selectedPhoneModel:PhoneModel = {
        modelId: modelId,
        name: e.target.selectedOptions[0].label,
        maxValue: this.phoneMaxValue
      }

      // send selected phone model to  sale-calculator
      this._store.dispatch(updateSelectedPhoneModel(
        { selectedPhoneModel: selectedPhoneModel }))

    // show the max value box
      this.isValueBoxVisible = true;
    } else { this.isValueBoxVisible = false;}

  }

  // private onPhoneModelSelect(id:number):number {
  //   if (id > 0 ) {
  //     this.isValueBoxVisible = true;}
  //   else { this.isValueBoxVisible = false;}
  //   return this._helper.getMaxValue();
  // }
}
