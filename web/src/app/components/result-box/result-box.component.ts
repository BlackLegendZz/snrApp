import { Component, Input, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js-dist';
@Component({
  selector: 'app-result-box',
  standalone: true,
  imports: [],
  templateUrl: './result-box.component.html',
  styleUrl: './result-box.component.css',
})
export class ResultBoxComponent implements OnInit {
  @Input() title = '';

  ngOnInit(): void {
    this.drawPlot();
  }

  private drawPlot(): void {
    let trace1: Plotly.Data = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers',
      type: 'scatter',
    };

    let trace2: Plotly.Data = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      type: 'scatter',
    };

    let trace3: Plotly.Data = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers',
      type: 'scatter',
    };

    let data: Plotly.Data[] = [trace1, trace2, trace3];

    let layout: Partial<Plotly.Layout> = {
      height: 300,
      margin: {
        l: 20,
        r: 10,
        b: 20,
        t: 10,
      },
    };

    Plotly.newPlot('plot', data, layout, { responsive: true });
  }
}
