import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./../../btn-styles.scss'],
})
export class BtnComponent {
  @Input() public text?: string;
  @Input() public icon?: string;
  @Input() public disabled: boolean = false;
  @Output() public onClick = new EventEmitter<void>();
}
