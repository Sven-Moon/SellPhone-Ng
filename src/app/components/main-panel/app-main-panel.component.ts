import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-panel',
  templateUrl: './app-main-panel.component.html',
  styleUrls: ['./app-main-panel.component.scss']
})
export class AppMainPanelComponent {
  @Input() searchResults:Array<string>=[];
}