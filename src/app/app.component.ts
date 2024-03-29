import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'simple-components';
  public date = new Date();
  public num = 10;
  public constructor(vcr: ViewContainerRef) {}
  public openPopup(): void {}
}
