import { Component, HostListener, Input, forwardRef } from '@angular/core';
import { BaseBoxComponent } from '../base-box/base-box.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  horizontalArrowKeys,
  numberSignKeys,
  numbersKeys,
  removalKeys,
  verticalArrowKeys,
} from 'src/app/modules/input/models/key.models';

@Component({
  selector: 'number-box',
  templateUrl: './number-box.component.html',
  styleUrls: ['./../../styles/input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberBoxComponent),
      multi: true,
    },
  ],
})
export class NumberBoxComponent extends BaseBoxComponent<number> {
  /**
   * Max value
   */
  @Input() public max?: number;
  /**
   * Min value
   */
  @Input() public min?: number;
  /**
   * Handles key events
   */
  @HostListener('keydown', ['$event']) public onKeyDown(e: KeyboardEvent) {
    if (
      numbersKeys.includes(e.key) ||
      removalKeys.includes(e.key) ||
      horizontalArrowKeys.includes(e.key)
    )
      return;
    e.preventDefault();
    e.stopPropagation();
    if (verticalArrowKeys.includes(e.key)) {
      let amount = e.ctrlKey ? 100 : e.shiftKey ? 10 : 1;
      if (e.key == 'ArrowDown') amount = amount * -1;
      this.value = this.value == null ? amount : this.value + amount;
    } else if (numberSignKeys.includes(e.key)) {
      if (
        this.value != null &&
        ((e.key == '+' && this.value < 0) || (e.key == '-' && this.value > 0))
      )
        this.value = this.value * -1;
    } else if (e.key == 'Enter') this.validateLimits();
  }
  /**
   * Writes string value
   */
  public override writeStringValue = (val: string) => {
    this.stringValue = val;
    if (val.trim() == '') this.value = undefined;
    else {
      this.value = parseInt(val);
    }
  };
  /**
   * On focus out validates max and min limits
   */
  @HostListener('focusout')
  public validateLimits() {
    if (this.value != null) {
      if (this.max != null && this.value > this.max) this.value = this.max;
      if (this.min != null && this.value < this.min) this.value = this.min;
      this.stringValue = this.value.toString();
    }
  }
}
