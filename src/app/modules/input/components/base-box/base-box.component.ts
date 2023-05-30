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
  templateUrl: './base-box.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseBoxComponent),
      multi: true,
    },
  ],
})
export class BaseBoxComponent implements ControlValueAccessor, AfterViewInit {
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
  public value: string = '';
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
  protected _onChange?: (val: string) => void;
  /**
   * Value setter
   */
  public writeValue(val: string): void {
    if (val == this.value) return;
    this.value = val;
    if (this._onTouched != null) this._onTouched();
    if (this._onChange != null) this._onChange(this.value);
  }
  /**
   * On change setter
   */
  public registerOnChange(fn: (val: string) => void): void {
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
  public setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }
}
