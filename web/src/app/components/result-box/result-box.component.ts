import { Component } from '@angular/core';
import * as Plotly from 'plotly.js-basic-dist-min';
import { EventID, EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-result-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-box.component.html',
  styleUrl: './result-box.component.css',
})
export class ResultBoxComponent {
  layout: Partial<Plotly.Layout> = {
    paper_bgcolor: '#0000',
    plot_bgcolor: '#0000',
    font: {
      color: '#fff',
    },
    margin: {
      l: 50,
      r: 10,
      b: 20,
      t: 10,
    },
    modebar: {
      orientation: 'h',
    },
  };
  resultSNR: number = 1;
  constructor(private eventService: EventService) {
    eventService.listen(EventID.DrawGraph, (data: any) => this.drawPlots(data));
  }

  private drawPlots(data: any): void {
    this.resultSNR = data['snr'];
    this.drawPlot(data['stacking effect'], 'Stacking_plot');
    this.drawPlot(data['skyglow effect'], 'Skyglow_plot');
  }
  private drawPlot(values: number[][], plotID: string): void {
    let plotData: Plotly.Data = {
      x: values[1],
      y: values[0],
      type: 'scatter',
    };
    Plotly.newPlot(plotID, [plotData], this.layout, {
      responsive: true,
      displayModeBar: false,
    });
  }
}
