import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-result-box',
  standalone: true,
  imports: [],
  templateUrl: './result-box.component.html',
  styleUrl: './result-box.component.css',
})
export class ResultBoxComponent implements OnInit {
  @Input() title = '';
  private svg: any;

  //Define the component with tag "chart" as the container
  @ViewChild('chart', { static: true })
  private chartContainer?: ElementRef;

  // Declare the chart dimensions and margins.
  private height = 400;
  private margin: { top: number; bottom: number; left: number; right: number } =
    { top: 10, bottom: 30, left: 30, right: 0 };
  private scale: {
    x: d3.ScaleTime<number, number, never>;
    y: d3.ScaleLinear<number, number, never>;
  } = { x: d3.scaleUtc(), y: d3.scaleLinear() };
  private axis: { x: any; y: any } = { x: null, y: null };

  ngOnInit(): void {
    this.createSvg();
    this.createPlot();
  }

  //Update the xScale when the window size changes
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any): void {
    console.log('sdfds');
    this.scale.x.range([this.margin.left, this.innerWidth()]);
    this.axis.x
      .transition()
      .ease(d3.easeLinear)
      .duration(0)
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.scale.x));
  }

  //Calculate with of the graph by subtracting the with of the container by the margins.
  private innerWidth(): number {
    return (
      this.chartContainer?.nativeElement.clientWidth -
      this.margin.left -
      this.margin.right
    );
  }

  private createSvg(): void {
    // Create the SVG container.
    this.svg = d3
      .select(this.chartContainer?.nativeElement)
      .attr('height', this.height);
  }

  private createPlot(): void {
    // Declare the x (horizontal position) scale.
    this.scale.x
      .domain([new Date('2023-01-01'), new Date('2024-01-01')])
      .range([this.margin.left, this.innerWidth()]);

    // Declare the y (vertical position) scale.
    this.scale.y
      .domain([0, 100])
      .range([this.height - this.margin.bottom, this.margin.top]);

    // Add the x-axis.
    this.axis.x = this.svg
      .append('g')
      .attr('transform', `translate(0,${this.height - this.margin.bottom})`)
      .call(d3.axisBottom(this.scale.x));

    // Add the y-axis.
    this.axis.y = this.svg
      .append('g')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(this.scale.y));
  }
}
