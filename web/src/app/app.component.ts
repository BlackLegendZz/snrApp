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

  constructor(private eventService: EventService) {
    this.eventService.listen(EventID.UpdateInputValue, (val: any) =>
      console.log(val)
    );
  }
}
