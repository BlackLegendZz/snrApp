import { Component, EventEmitter, Input, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
})
export class InputFieldComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) frame: string = '';
  @Output() onValueChange = new EventEmitter<string>();
  id: string = '';

  valueForm = new FormBuilder().nonNullable.control('', [
    Validators.required,
    Validators.pattern('\\d+\\.{0,1}\\d*'),
  ]);
  constructor() {
    this.id = uuidv4();
  }

  updateInputValue(e: any) {
    if (
      this.valueForm.getError('pattern') === null ||
      this.valueForm.getError('pattern') === undefined
    ) {
      this.onValueChange.emit(e.target.value);
    }
  }
}
