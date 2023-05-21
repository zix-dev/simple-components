import {
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
  selector: 'number-box',
  templateUrl: './number-box.component.html',
  styleUrls: ['./number-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberBoxComponent),
      multi: true,
    },
  ],
  host: {
    class: 'input-box',
  },
})
export class NumberBoxComponent implements ControlValueAccessor {
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
  public value?: number;
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
  private _onChange?: (val: number) => void;
  /**
   * Value setter
   */
  public writeValue(val: number): void {
    if (val == this.value) return;
    this.value = val;
    if (this._onTouched != null) this._onTouched();
    if (this._onChange != null) this._onChange(this.value);
  }
  /**
   * On change setter
   */
  public registerOnChange(fn: (val: number) => void): void {
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
  /**
   * On key down prevents that the input must be a number
   */
  public onKeyDown(e: KeyboardEvent): void {
    if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
  }
}
