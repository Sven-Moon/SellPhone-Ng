import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StaticDataActions } from 'src/app/actions/staticData.actions';
import { StaticData } from 'src/app/models/StaticData';
import * as fromStaticDataActions from 'src/app/stores/staticData/staticData.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    // private _staticDataActions: StaticDataActions,
    private _store: Store<StaticData>
  ) { }

  public ngOnInit(): void {
    // this._staticDataActions.getUsaStates();
    // this._staticDataActions.getPhoneTypes();
    // this._staticDataActions.getPhoneModelsByType();
    this._store.dispatch(fromStaticDataActions.loadStaticData())
  }

}
