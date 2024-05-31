import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private subject = new Subject();

  emit(eventID: EventID, payload: any) {
    this.subject.next({ eventID, payload });
  }

  listen(eventID: EventID, callback: (event: any) => void) {
    this.subject.asObservable().subscribe((nextObj: any) => {
      if (eventID === nextObj.eventID) {
        callback(nextObj.payload);
      }
    });
  }
}

export enum EventID {
  UpdateInputValue,
}
