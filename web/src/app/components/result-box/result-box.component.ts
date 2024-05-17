import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-box',
  standalone: true,
  imports: [],
  templateUrl: './result-box.component.html',
  styleUrl: './result-box.component.css',
})
export class ResultBoxComponent {
  @Input() title = '';
}
