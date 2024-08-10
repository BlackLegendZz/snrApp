import { Component } from '@angular/core';
import { FrameBoxComponent } from './components/frame-box/frame-box.component';
import { ResultBoxComponent } from './components/result-box/result-box.component';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FrameBoxComponent, ResultBoxComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {}
}
