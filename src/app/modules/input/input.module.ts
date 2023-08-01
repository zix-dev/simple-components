import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    Components.BtnComponent,
    Components.BaseBoxComponent,
    Components.TextBoxComponent,
    Components.NumberBoxComponent,
  ],
  exports: [
    Components.BtnComponent,
    Components.TextBoxComponent,
    Components.NumberBoxComponent,
  ],
})
export class InputModule {}
