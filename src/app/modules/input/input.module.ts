import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index';
import { FormsModule } from '@angular/forms';
const components = [
  Components.TextBoxComponent,
  Components.BtnComponent,
  Components.NumberBoxComponent,
  Components.DateBoxComponent,
];
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: components,
  exports: components,
})
export class InputModule {}
