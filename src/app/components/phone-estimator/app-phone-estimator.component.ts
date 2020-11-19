import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PhoneModel } from '../../models/PhoneModel';
import { EstimatorService } from 'src/app/services/estimator.service';
import { Store } from '@ngrx/store';
import { PhoneTypes } from 'src/app/models/PhoneTypes';
import { EstimatorModelActions } from 'src/app/actions/estimatorModels.actions';


@Component({
  selector: 'app-phone-estimator',
  templateUrl: './app-phone-estimator.component.html',
  styleUrls: ['./app-phone-estimator.component.scss']
})
export class AppPhoneEstimatorComponent implements OnInit {
  private estimatorTypeSubscription;
  private estimatorModelSubscription;
  phoneTypes:PhoneTypes;
  selectedType: String = "--Choose Type--";
  selectedModel: String = "--Choose Model--";
  phoneModels:Array<PhoneModel> = [];
  phoneMaxValue: String = "";
  typeId:number;
  isValueBoxVisible: boolean = false;

  constructor(
    private _title: Title,
    private _estimatorService: EstimatorService,
    private _estimatorModelActions: EstimatorModelActions,
    private _store: Store<any>
    // if you miss the <any>, it won't recognize the selected Store function
    ) {}

  ngOnInit() {
    this._title.setTitle('sellphone-ng');

    this.estimatorTypeSubscription = this._store.select('estimatorTypes')
    .subscribe((obs:PhoneTypes) => {
      this.phoneTypes = obs;
    });

    this.estimatorModelSubscription = this._store.select('estimatorModels')
    .subscribe((obs:Array<PhoneModel>) => {
      this.phoneModels = obs;
    })
  }

  public onSelectedPhoneTypeChange(e:any):void {
    this.typeId = e.target.selectedOptions[0].id;
    // console.log("newly selected phoneType is: " + typeId);
    if (this.typeId > 0){
      this._estimatorModelActions.getPhoneModels(this.typeId);
    }
    // else {
    //   this._estimatorModelActions.clearPhoneModels();
    // }
    // this.onPhoneModelSelect(this.typeId);
  }

  public onSelectedPhoneModelChange(e):void {
    let modelId = e.target.selectedOptions[0].id;
    console.log("new phone Model ID is: " + modelId);
    this.phoneMaxValue = this.onPhoneModelSelect(modelId);
  }

  // Does not update value on initial type select
  private onPhoneModelSelect(id:number):string{
    if (id > 0 ) {
    this.isValueBoxVisible = true;}
    else { this.isValueBoxVisible = false;}
    return Math.round(id*50 + 50).toString();
  }

  ngOnDestory() {
    this.estimatorModelSubscription.unsubscribe();
    this.estimatorTypeSubscription.unsubscribe();
  }
}
