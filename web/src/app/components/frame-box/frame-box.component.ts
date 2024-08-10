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
  errorMsg: string = '';
  errorCount: number = 0;
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

  handleValueChange(
    origin: string,
    event: { val: number; err: string; status: string }
  ) {
    let err = event['err'];
    let val = event['val'];

    if (event['status'] === 'error') {
      this.errorCount++;
      this.errorMsg = err;
      return;
    }
    if (event['status'] === 'resolved') {
      this.errorCount = Math.max(0, this.errorCount - 1);
    }

    if (this.errorCount === 0) {
      this.errorMsg = '';
    }

    switch (origin) {
      case 'LFB':
        this.data['Light Frame']['Background'] = val;
        break;
      case 'LFT':
        this.data['Light Frame']['Target'] = val;
        break;
      case 'DFB':
        this.data['Dark Frame']['Background'] = val;
        break;
      case 'BFB':
        this.data['Bias Frame']['Background'] = val;
        break;
      case 'CRN':
        this.data['Camera']['Read Noise'] = val;
        break;
      case 'CGA':
        this.data['Camera']['Gain'] = val;
        break;
      case 'CEX':
        this.data['Camera']['Exposure'] = val;
        break;
      case 'CFR':
        this.data['Camera']['Frames'] = val;
    }
  }

  sendData() {
    this.networkService.sendData(this.data).subscribe({
      next: (response: any) => {
        this.eventService.emit(EventID.DrawGraph, response);
      },
      error: (err: any) => {
        alert(err);
      },
    });
  }
}
