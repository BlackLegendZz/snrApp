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
  frames = [
    FrameBox.LightFrame,
    FrameBox.DarkFrame,
    FrameBox.BiasFrame,
    FrameBox.Camera,
  ];
  data: { [k: string]: { [k: string]: string } } = {};

  constructor(private eventService: EventService) {
    this.frames.forEach((element) => {
      this.data[element.toString()] = {};
    });

    this.eventService.listen(EventID.UpdateInputValue, (val: any) => {
      let k_frame = Object.keys(val)[0];
      let k_measure = Object.keys(val[k_frame])[0];

      if (!Object.keys(this.data).includes(k_frame)) {
        this.data[k_frame] = val[k_frame];
      } else {
        this.data[k_frame][k_measure] = val[k_frame][k_measure];
      }
      //send data
    });
  }
}
