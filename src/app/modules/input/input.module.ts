import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [Components.TextBoxComponent, Components.BtnComponent],
  exports: [Components.TextBoxComponent, Components.BtnComponent],
})
export class InputModule {}
