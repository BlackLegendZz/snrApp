import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../input-field/input-field.component';
import { NetworkService } from '../../services/network.service';
import { EventService, EventID } from '../../services/event.service';

@Component({
  selector: 'app-frame-box',
  standalone: true,
  imports: [CommonModule, InputFieldComponent],
  templateUrl: './frame-box.component.html',
  styleUrl: './frame-box.component.css',
})
export class FrameBoxComponent {
  data: { [k: string]: { [k: string]: Number } } = {
    'Light Frame': {},
    'Dark Frame': {},
    'Bias Frame': {},
    Camera: {},
  };

  constructor(
    private networkService: NetworkService,
    private eventService: EventService
  ) {}
  sendData() {
    this.networkService.sendData(this.data).subscribe({
      next: (response: any) => {
        this.eventService.emit(EventID.DrawGraph, response);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
