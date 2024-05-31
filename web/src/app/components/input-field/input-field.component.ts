import { Component, Input } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { EventID, EventService } from '../../services/event.service';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
})
export class InputFieldComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input({ required: true }) id: string = '';

  constructor(private eventService: EventService) {}

  validateInput(inp: string) {}

  updateInputValue(e: any) {
    this.eventService.emit(EventID.UpdateInputValue, {
      [this.id]: { [this.title]: e.target.value },
    });
  }
}
