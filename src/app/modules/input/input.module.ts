import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index';
import { FormsModule } from '@angular/forms';
const components = [
  Components.BtnComponent,
  Components.BaseBoxComponent,
  Components.TextBoxComponent,
  Components.NumberBoxComponent,
];
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: components,
  exports: components,
})
export class InputModule {}
