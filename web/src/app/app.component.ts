import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FrameBoxComponent,
  FrameBox,
} from './components/frame-box/frame-box.component';
import { ResultBoxComponent } from './components/result-box/result-box.component';
import { EventID, EventService } from './services/event.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FrameBoxComponent, ResultBoxComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {}
}
