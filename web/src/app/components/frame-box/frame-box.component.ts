import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../input-field/input-field.component';

export enum FrameBox {
  LightFrame = 'Light Frame',
  DarkFrame = 'Dark Frame',
  BiasFrame = 'Bias Frame',
  Camera = 'Camera',
  SNR = 'SNR',
}

@Component({
  selector: 'app-frame-box',
  standalone: true,
  imports: [CommonModule, InputFieldComponent],
  templateUrl: './frame-box.component.html',
  styleUrl: './frame-box.component.css',
})
export class FrameBoxComponent {
  @Input({ required: true }) frame = FrameBox.LightFrame;
  frameType = FrameBox;
}
