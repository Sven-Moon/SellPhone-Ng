import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PhoneModel } from '../../models/PhoneModel';
import { EstimatorService } from 'src/app/services/estimator.service';
import { Store } from '@ngrx/store';
import { PhoneTypes } from 'src/app/models/PhoneTypes';
import { EstimatorModelActions } from 'src/app/actions/estimatorModels.actions';
import { PhoneModels } from 'src/app/models/PhoneModels';
import { StaticData } from 'src/app/models/StaticData';
import { ControlContainer } from '@angular/forms';
import { staticDataReducer } from 'src/app/stores/staticData/staticData.reducer';
import { Observable } from 'rxjs';
import { loadPhoneModelsByType, updateSelectedPhoneType } from 'src/app/stores/estimator/estimator.actions';


@Component({
  selector: 'app-phone-estimator',
  templateUrl: './app-phone-estimator.component.html',
  styleUrls: ['./app-phone-estimator.component.scss']
})
export class AppPhoneEstimatorComponent implements OnInit {
  private estimatorTypeSubscription;
  private estimatorModelSubscription;
  private staticDataSubscription;
  phoneTypes:PhoneTypes;
  selectedType: String;
  selectedModel: String;
  phoneModels:PhoneModel[] = [{"modelId":-1,"name":""}];
  staticData:StaticData = {usaStates:[],phoneTypes:[],phoneModelsByType:[]};
  staticData$:Observable<StaticData>;
  phoneModelsByType$:Observable<PhoneModels>;
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
    this.staticData$ = this._store.select('staticData')
    this.phoneModelsByType$ = this._store.select('phoneModelsByType')


    this.estimatorTypeSubscription = this
    ._store.select('estimatorTypes')
    .subscribe((typesList:PhoneTypes) => {
      this.phoneTypes = typesList;
    });

    // this.estimatorModelSubscription = this
    // ._store.select('estimatorModels')
    // .subscribe((modelsByType:PhoneModels) => {
    //   const modelsList = modelsByType.phoneModels;
    //   this.phoneModels = modelsList;
    //   console.log('phone models from estimator store:');
    //   console.log(this.phoneModels);
    // });

    this.staticDataSubscription = this
    ._store.select('staticData')
    .subscribe((staticData: StaticData) => {
      // console.log('[estimator Component] Subscription successful')
      // console.log(staticData)
      this.staticData = staticData;
    });


  }
// typeId is selected from template, used to update PhoneModels list
// stays
  public onSelectedPhoneTypeChange(e:any):void {
    this.typeId = e.target.selectedOptions[0].id;
    this.updatePhoneModels();
  } 

// uses staticData (local)
// todo: use async + filter to come up with list in reducer
// create selector so dropdown can output on async 
  private updatePhoneModels() {

    this._store.dispatch(updateSelectedPhoneType({ selectedTypeId: this.typeId }))

    if (this.typeId > 0 && this.staticData) {
      console.log(this.staticData.phoneModelsByType);
      for (var i in this.staticData.phoneModelsByType) {
        if (this.staticData.phoneModelsByType[i].typeId == this.typeId) {
          this.phoneModels =
          this.staticData.phoneModelsByType[i].phoneModels;
          console.log(`Phone models:  ${this.phoneModels}`)
          return;
        }
      }
    } else {
      console.log('Congrats, no valid phoneModel values');
      console.log(this.typeId);
      console.log(this.staticData)
    }
  }
  
  public onSelectedPhoneModelChange(e):void {
    let modelId = e.target.selectedOptions[0].id;
    // console.log("new phone Model ID is: " + modelId);
    this.phoneMaxValue = this.onPhoneModelSelect(modelId);
  }

  // Does not update value on initial type select
  private onPhoneModelSelect(id:number):string{
    if (id > 0 ) {
    this.isValueBoxVisible = true;}
    else { this.isValueBoxVisible = false;}
    return Math.round(id*50 + 50).toString();
  }

  ngOnDestroy() {
    // this.estimatorModelSubscription.unsubscribe();
    this.estimatorTypeSubscription.unsubscribe();
  }
}
