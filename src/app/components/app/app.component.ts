import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StaticDataActions } from 'src/app/actions/staticData.actions';
import { Estimator } from 'src/app/models/EstimatorModel';
import { StaticData } from 'src/app/models/StaticData';
import { loadPhoneModelsByType } from 'src/app/stores/estimator/estimator.actions';
import * as fromStaticDataActions from 'src/app/stores/staticData/staticData.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    // private _staticDataActions: StaticDataActions,
    private _store: Store<StaticData>,
    private store: Store<Estimator>
  ) { }

  public ngOnInit(): void {
    // this._staticDataActions.getUsaStates();
    // this._staticDataActions.getPhoneTypes();
    // this._staticDataActions.getPhoneModelsByType();
    this._store.dispatch(fromStaticDataActions.loadStaticData())
    this._store.dispatch(loadPhoneModelsByType())
  }

}
