import { Component, Input, forwardRef } from '@angular/core';
import { TextBoxComponent } from '../text-box/text-box.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./../../styles/input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
})
export class TextAreaComponent extends TextBoxComponent {}
