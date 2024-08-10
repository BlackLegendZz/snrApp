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
  @Output() onValueChange = new EventEmitter<{
    val: number;
    err: string;
    status: string;
  }>();
  id: string = '';

  valueForm = new FormBuilder().nonNullable.control('', [
    Validators.required,
    Validators.pattern('\\d+\\.{0,1}\\d*'),
  ]);
  constructor() {
    this.id = uuidv4();
  }

  updateInputValue(e: any) {
    let err: string = '';
    let status: string = '';
    if (
      this.valueForm.getError('pattern') === null ||
      this.valueForm.getError('pattern') === undefined
    ) {
      //if this field used to have an error which now got corrected
      //update the style
      if (e.target.style.length > 0) {
        status = 'resolved';
        e.target.style = '';
      }
    } else {
      //if this field already has thrown an error, dont do anything
      if (e.target.style.length === 0) {
        e.target.style = 'border-color: red';
        err = 'Only numbers are allowed.';
        status = 'error';
      }
    }
    this.onValueChange.emit({
      val: parseFloat(e.target.value),
      err: err,
      status: status,
    });
  }
}
