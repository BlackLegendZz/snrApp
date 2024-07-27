import { Component, Input, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as Plotly from 'plotly.js-dist';
@Component({
  selector: 'app-result-box',
  standalone: true,
  imports: [],
  templateUrl: './result-box.component.html',
  styleUrl: './result-box.component.css',
})
export class ResultBoxComponent implements OnInit {
  layout: Partial<Plotly.Layout> = {
    paper_bgcolor: '#cbd5e1',
    plot_bgcolor: '#cbd5e1',
    //height: 350,
    margin: {
      l: 20,
      r: 10,
      b: 20,
      t: 10,
    },
  };
  ngOnInit(): void {
    this.drawPlot('Result_plot');
    this.drawPlot('Stacking_plot');
    this.drawPlot('Skyglow_plot');
  }

  private drawPlot(plotID: string): void {
    let data: Plotly.Data = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'lines',
      type: 'scatter',
    };

    Plotly.newPlot(plotID, [data], this.layout, { responsive: true });
  }
}
