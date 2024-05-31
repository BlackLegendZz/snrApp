import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FrameBoxComponent,
  FrameBox,
} from './components/frame-box/frame-box.component';
import { ResultBoxComponent } from './components/result-box/result-box.component';
import { EventID, EventService } from './services/event.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FrameBoxComponent, ResultBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  fbTypes = FrameBox;
  data: { [k: string]: { [k: string]: string } } = {};

  constructor(private eventService: EventService) {
    this.eventService.listen(EventID.UpdateInputValue, (val: any) => {
      let k_frame = Object.keys(val)[0];
      let k_measure = Object.keys(val[k_frame])[0];

      if (!Object.keys(this.data).includes(k_frame)) {
        this.data[k_frame] = val[k_frame];
      } else {
        this.data[k_frame][k_measure] = val[k_frame][k_measure];
      }
      console.log(this.data);
    });
  }
}
