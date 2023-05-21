import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'date-box',
  templateUrl: './date-box.component.html',
  styleUrls: ['./date-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateBoxComponent),
      multi: true,
    },
  ],
  host: {
    class: 'input-box',
  },
})
export class DateBoxComponent implements ControlValueAccessor, AfterViewInit {
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
  public value: Date = new Date();
  /**
   * Flag to disable input
   */
  public disabled: boolean = false;
  /**
   * After view init focus component if has autofocus
   */
  public ngAfterViewInit(): void {
    if (this.autofocus) this.inputElement.nativeElement.focus();
  }
  /**
   * On touched event
   */
  private _onTouched?: () => void;
  /**
   * On change event
   */
  private _onChange?: (val: Date) => void;
  /**
   * Value setter
   */
  public writeValue(val: Date): void {
    if (val == this.value) return;
    this.value = val;
    if (this._onTouched != null) this._onTouched();
    if (this._onChange != null) this._onChange(this.value);
  }
  /**
   * On change setter
   */
  public registerOnChange(fn: (val: Date) => void): void {
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
