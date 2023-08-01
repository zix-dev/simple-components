import { Component, forwardRef } from '@angular/core';
import { BaseBoxComponent } from '../base-box/base-box.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./../../../styles/input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBoxComponent),
      multi: true,
    },
  ],
})
export class TextBoxComponent extends BaseBoxComponent {
  public override writeStringValue = (val: string) => {
    this.stringValue = val;
    this.writeValue(val);
  };
}
