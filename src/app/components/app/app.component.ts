import { Component } from '@angular/core';
import { EstimatorModelActions } from 'src/app/actions/estimatorModels.actions';
import { EstimatorTypeActions } from 'src/app/actions/estimatorTypes.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (
    private _estimatorTypeActions: EstimatorTypeActions,
    private _estimatorModelActions: EstimatorModelActions
  ) {}

  public ngOnInit():void {
    this._estimatorTypeActions.getPhoneTypes()
  }

}
