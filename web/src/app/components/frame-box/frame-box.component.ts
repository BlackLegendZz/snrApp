import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../input-field/input-field.component';
import { NetworkService } from '../../services/network.service';

export enum FrameBox {
  LightFrame = 'Light Frame',
  DarkFrame = 'Dark Frame',
  BiasFrame = 'Bias Frame',
  Camera = 'Camera',
}

@Component({
  selector: 'app-frame-box',
  standalone: true,
  imports: [CommonModule, InputFieldComponent],
  templateUrl: './frame-box.component.html',
  styleUrl: './frame-box.component.css',
})
export class FrameBoxComponent {
  data: { [k: string]: { [k: string]: string } } = {
    'Light Frame': {},
    'Dark Frame': {},
    'Bias Frame': {},
    Camera: {},
  };

  constructor(private networkService: NetworkService) {}
  sendData() {
    this.networkService.sendData(this.data).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
