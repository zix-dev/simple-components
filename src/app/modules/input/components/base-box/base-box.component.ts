import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'base-box',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseBoxComponent),
      multi: true,
    },
  ],
  host: { class: 'input-box' },
})
export class BaseBoxComponent<T = string>
  implements ControlValueAccessor, AfterViewInit
{
  /**
   * Input element ref
   */
  @ViewChild('input') public inputElement!: ElementRef<HTMLInputElement>;
  /**
   * Flag to focus on init
   */
  @Input() public autofocus: boolean = false;
  /**
   * On focus event emmiter
   */
  @Output() public readonly onFocus = new EventEmitter<FocusEvent>();
  /**
   * Value binded by ngModel
   */
  public stringValue: string = '';
  /**
   * Value binded by ngModel
   */
  public value?: T;
  /**
   * Flag to disable input
   */
  public disabled: boolean = false;
  /**
   * Listens to click events to focus inner input
   */
  @HostListener('click') public focus(): void {
    this.inputElement.nativeElement.focus();
  }
  /**
   * After view init focus component if has autofocus
   */
  public ngAfterViewInit(): void {
    if (this.autofocus) this.focus();
  }
  /**
   * On touched event
   */
  protected _onTouched?: () => void;
  /**
   * On change event
   */
  protected _onChange?: (val?: T) => void;
  /**
   * Value setter
   */
  public writeValue(val?: T): void {
    if (val == this.value) return;
    this.value = val;
    this.valueToString();
    if (this._onTouched != null) this._onTouched();
    if (this._onChange != null) this._onChange(this.value);
  }
  /**
   * String value setter (calls value setter)
   */
  public writeStringValue!: (val: string) => void;
  /**
   * Method to generate string value from value
   */
  public valueToString(): void {
    this.stringValue = this.value == null ? '' : `${this.value}`;
  }
  /**
   * On change setter
   */
  public registerOnChange(fn: (val?: T) => void): void {
    this._onChange = fn;
  }
  /**
   * On touched setter
   */
  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
  /**
   * Disabled setter
   */
  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
