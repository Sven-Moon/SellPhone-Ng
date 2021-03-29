import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { StaticData } from 'src/app/models/StaticData';
import * as fromStaticDataActions from 'src/app/stores/staticData/staticData.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private store: Store<StaticData>
  ) { }

  public ngOnInit(): void {
    this.store.dispatch(fromStaticDataActions.loadStaticData());
  }

}
