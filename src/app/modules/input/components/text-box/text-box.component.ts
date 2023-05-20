import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./../../input-styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBoxComponent),
      multi: true,
    },
  ],
})
export class TextBoxComponent implements ControlValueAccessor {
  public value: string = '';
  public disabled: boolean = false;
  private _onTouched?: (val: string) => void;
  private _onChange?: (val: string) => void;
  public writeValue(obj: string): void {
    if (obj == this.value) return;
    this.value = obj;
    if (this._onTouched != null) this._onTouched(this.value);
    if (this._onChange != null) this._onChange(this.value);
  }

  public registerOnChange(fn: (val: string) => void): void {
    this._onChange = fn;
  }
  public registerOnTouched(fn: (val: string) => void): void {
    this._onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
