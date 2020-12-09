import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EstimatorModelActions } from 'src/app/actions/estimatorModels.actions';
import { EstimatorTypeActions } from 'src/app/actions/estimatorTypes.actions';
import { StaticDataActions } from 'src/app/actions/staticData.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _estimatorTypeActions: EstimatorTypeActions,
    private _staticDataActions: StaticDataActions,
  ) { }

  public ngOnInit(): void {
    this._estimatorTypeActions.getPhoneTypes();
    this._staticDataActions.getStaticData();
  }

}
