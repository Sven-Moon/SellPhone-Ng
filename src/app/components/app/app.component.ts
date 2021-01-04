import { Component } from '@angular/core';
import { StaticDataActions } from 'src/app/actions/staticData.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private _staticDataActions: StaticDataActions,
  ) { }

  public ngOnInit(): void {
    this._staticDataActions.getUsaStates();
    this._staticDataActions.getPhoneTypes();
    this._staticDataActions.getPhoneModelsByType();
  }

}
