import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {GameStateServiceBus} from '../../service/game-state.service-bus';

@Component({
  selector: 'tac-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() score: any;
  @Input() icons: any;

  constructor(private gameStateBus: GameStateServiceBus) { }

  ngOnInit() {
    this.drawChart();
  }
// TODO: it might have to wait until here.

  ngAfterContentInit() {
    // To show the chart on bootstrap, it would have to wait until here.
    // this.drawChart();
  }

  drawChart() {
    // Clear any previous values.
    d3.selectAll('div.chart > div').remove();

    const chartData = Object.entries(this.score);
    const totalPoints = chartData.reduce((acc, d) => acc + (d[1] as any), 0);

    // Add a 'row' div for each label and chart, and...
    d3.select('div.chart')
      .selectAll('div')
      .data(chartData)
      .enter()
      .append('div')
      // ... add the label.
      .append('i')
      .attr('class', (d) => this.icons[d[0]] || 'tie'); // 'x', 'o' or 'tie'

    // Add the bar chart itself, scaled to the display width.
    d3.selectAll('div.chart > div')
      // .data(chartData) // TODO: why not necessary?
      .append('span')
      .style("width", (d) => 'calc(calc(100% - 48px) * ' + d[1] / totalPoints + ')')  // 48 = CHART_LABEL_WIDTH (21px) + max value width ("000" is 24px wide) + bar-value margin (3px)
      .transition()
      .duration(700)
      .style("background-color", "steelblue");

    // Add the value label (the number of wins) next to the chart.
    d3.selectAll('div.chart > div')
      .append('span')
      .text((d) => d[1] || ''); // Hide "0" values.

    d3.selectAll('div.chart > div').exit().remove();
  }
}
