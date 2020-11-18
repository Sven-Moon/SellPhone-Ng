import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PhoneType } from '../../models/PhoneType';
import { PhoneModel } from '../../models/PhoneModel';
import { EstimatorService } from 'src/app/services/estimator.service';
import { EstimatorTypeActions } from 'src/app/actions/estimatorTypes.actions';
import { Store } from '@ngrx/store';
import { PhoneTypes } from 'src/app/models/PhoneTypes';


@Component({
  selector: 'app-phone-estimator',
  templateUrl: './app-phone-estimator.component.html',
  styleUrls: ['./app-phone-estimator.component.scss']
})
export class AppPhoneEstimatorComponent implements OnInit {
  private estimatorTypeSubscription;
  private estimatorModelSubscription;
  phoneTypes:PhoneTypes;

  constructor(
    private _title: Title,
    private _estimatorService: EstimatorService,
    private _estimatorTypeActions: EstimatorTypeActions,
    private _store: Store) {}

  ngOnInit() {
    this._title.setTitle('selphone-ng');
    this.estimatorModelSubscription =
      this._store.select('estimatorTypes')
      .subscribe(results => {
        this.phoneTypes = results;
      });
  }

  selectedType: String = "--Choose Type--";
  selectedModel: String = "--Choose Model--";

  // phoneTypes:Array<PhoneType> = [
  //   {"id": -1, "name": "-- Select Phone type -- "},
  //   {"id": 1, "name": "iPhone "},
  //   {"id": 2, "name": "Android "},
  //   {"id": 3, "name": "Other"},
  //  ];
   phoneModels:Array<PhoneModel> = [];
   phoneMaxValue: String = "";
  //  isValueBoxVisible: boolean = false;

  public onSelectedPhoneTypeChange(e:any):void {
    let typeId = e.target.selectedOptions[0].id;
    console.log("newly selected phoneType is: " + typeId);
    this.phoneModels = this._estimatorTypeActions.getPhoneTypes(typeId);
  }

  public onSelectedPhoneModelChange(e):void {
    let modelId = e.target.selectedOptions[0].id;
    console.log("new phone Model ID is: " + modelId);
    this.phoneMaxValue = this._estimatorService.onPhoneModelSelect(modelId);
  }

  // public getPhoneModelsByType(typeId:number):Array<PhoneModel> {
  //   console.log(typeId);
  //   if (typeId == 1) {
  //     return [
  //       { "id": 1, "name": "iPhone 7" },
  //       { "id": 2, "name": "iPhone 8" },
  //       { "id": 3, "name": "iPhone 9" },
  //       { "id": 4, "name": "iPhone X" }
  //     ]
  //   } else if (typeId == 2) {
  //     return [
  //       { "id": 5, "name": "Pixel 1" },
  //       { "id": 6, "name": "Pixel 2" },
  //     ]
  //   } else if (typeId == 3) {
  //     return [
  //       { "id": 5, "name": "Windows" },
  //       { "id": 6, "name": "Uport" },
  //     ]
  //   } else {
  //     return [];
  //   }
  // }

  private onPhoneModelSelect(id:number):string{
    if (id > 0 ) {
    this.isValueBoxVisible = true;}
    else { this.isValueBoxVisible = false;}
    return Math.round(id*50 + 50).toString();
  }
}
