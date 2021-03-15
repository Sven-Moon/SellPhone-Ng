/* eslint-disable no-useless-constructor */
import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { PhoneModel } from '../../models/PhoneModel'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { PhoneType } from 'src/app/models/PhoneType'
import { selectPhoneModelsList, selectPhoneTypes } from 'src/app/stores/staticData/staticData.selectors'
import { updateSelectedPhoneModel } from 'src/app/stores/sale-calculator/sale-calculator.actions'
import { Helpers } from 'src/app/helpers/helpers'
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-phone-estimator',
  templateUrl: './phone-estimator.component.html',
  styleUrls: ['./phone-estimator.component.scss']
})
export class PhoneEstimatorComponent implements OnInit {
  phoneTypes$: Observable<Array<PhoneType>>;
  phoneModelsList$: Array<PhoneModel>;
  selectedPhoneType: PhoneType;
  selectedPhoneModel: PhoneModel;
  phoneMaxValue: number = null;
  isValueBoxVisible = false;
  estimatorForm = this._fb.group({
    phoneType: [-1],
    phoneModel: [-1]
  });

  constructor (
    private _title: Title,
    private _store: Store<any>,
    private _helper: Helpers,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit () {
    this._title.setTitle('sellphone-ng')
    this.phoneTypes$ = this._store.pipe(select(selectPhoneTypes))
    this._store.pipe(select(selectPhoneModelsList))
      // eslint-disable-next-line no-return-assign
      .subscribe(formArray => this.phoneModelsList$ = formArray[0])
  }

  public onSelectedPhoneTypeChange (e: any): void {
    this.selectedPhoneType = {
      typeId: e.target.selectedOptions[0].id,
      name: e.target.selectedOptions[0].innerText
    }

    // 0 is always the form index when coming from estimator
    this._helper.storeUpdateOnTypeChange(0, this.selectedPhoneType)

    this.estimatorForm.controls.phoneModel
      .patchValue(-1)
  }

  public onSelectedPhoneModelChange (e): void {
    const modelId: number = e.target.selectedOptions[0].id
    // update selected store if model selected
    if (modelId > 0) {
      // 0 is always the form index when coming from estimator
      this.phoneMaxValue = this._helper.getMaxValue(0, modelId)

      this.selectedPhoneModel = {
        modelId,
        name: e.target.selectedOptions[0].label,
        maxValue: this.phoneMaxValue
      }

      // send selected phone model to sale-calculator
      // initial form index = 0
      const formIndex = 0
      this._store.dispatch(updateSelectedPhoneModel(
        { formIndex, selectedPhoneModel: this.selectedPhoneModel }))

      // show the max value box
      this.isValueBoxVisible = true
    } else { this.isValueBoxVisible = false }
  }

  public goToSaleCalc (): void {
    this._router.navigate(['/sellmyphone'
    // , {type: this.selectedPhoneType.typeId, model: this.selectedPhoneModel.modelId }
  ])
  }

}
