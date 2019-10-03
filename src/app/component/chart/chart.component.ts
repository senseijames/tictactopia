import {Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {GameStateServiceBus} from '../../service/game-state.service-bus';

@Component({
  selector: 'tac-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit
{
  @Input() score: any;
  @Input() icons: any;
  @Input() type: string;

  constructor(private gameStateBus: GameStateServiceBus) { }

  ngOnInit() {
    switch (this.type) {
      case 'pie':
        this.drawPieChart();
        break;
      case 'bar':
      default:
        this.drawBarChart();
    }
  }

  ngAfterContentInit() {
    // To show the chart on bootstrap (on its own page) it would have to wait until here.
    // this.drawChart();
  }

  /**
   * Lightly adapted from:
   * REF: https://www.d3-graph-gallery.com/graph/pie_annotation.html
   */
  drawPieChart()
  {
    this.clear();

    const diameter = Math.min(0.5 * window.innerHeight, window.innerWidth);
    const radius = 0.5 * diameter;
    const border = 2;   // Looks nicer without a border, IMHO.

    // Append the SVG object to our pie chart div.
    var svg = d3.select("#pie-chart")
                .append("svg")
                .attr("width", diameter)
                .attr("height", diameter)
                .append("g")
                .attr("transform", "translate(" + radius + "," + radius + ")");

    const data = this.score;

    const totalWins = Object.values(data).reduce((acc: number, curr: number) => acc + curr);
    const isLoneWinner = (totalWins === data.x || totalWins === data.o || totalWins === data.tie);
    var color = d3.scaleOrdinal()
                  .domain(data)
                  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

    // Compute the position of each group on the pie:
    const pie = d3.pie()
                  .value(function(d) {return d.value; });
    const data_ready = pie(d3.entries(data));
    // Now I know that group A goes from 0 degrees to x degrees and so on.
    // The Arc Generator (shape helper to build arcs)
    const arcGenerator = d3.arc()
                           .innerRadius(0)
                           .outerRadius(radius - 2 * border);
    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg.selectAll('whatever')
       .data(data_ready)
       .enter()
       .append('path')
       .attr('d', arcGenerator)
       .attr('fill', function(d){ return(color(d.data.key)) })
       // We can comment out the stroke drawing code, as it's unused.
       // .attr("stroke", "black")
       // .style("stroke-width", border + 'px')
       .style("opacity", 0.7);

    // Add the annotation, using the centroid method to get the best coordinates.
    svg.selectAll('whatelse')
       .data(data_ready)
       .enter()
       .append('text')
       .text((d)=> (d.data.value) ? d.data.key + ' (' + d.data.value + ')' : '')
       // If there is only one winner, draw the icon at radius 0, angle 0 (the center).
       .attr("transform", (d)=> "translate(" + ((isLoneWinner) ? [0,0] : arcGenerator.centroid(d)) + ")")
       .style("text-anchor", "middle")
       .style("font-size", 17)
  }

  drawBarChart()
  {
    this.clear();

    const chartData = Object.entries(this.score);
    const totalPoints = chartData.reduce((acc, d) => acc + (d[1] as any), 0);

    // Add a 'row' div for each label and chart, and...
    d3.select('div#bar-chart')
      .selectAll('div')
      .data(chartData)
      .enter()
      .append('div')
      // ... add the label.
      .append('i')
      .attr('class', (d) => this.icons[d[0]] || 'tie'); // 'x', 'o' or 'tie'

    // Add the bar chart itself, scaled to the display width.
    d3.selectAll('div#bar-chart > div')
      // .data(chartData) // TODO: why not necessary?
      .append('span')
      .style("width", (d) => 'calc(calc(100% - 48px) * ' + d[1] / totalPoints + ')')  // 48 = CHART_LABEL_WIDTH (21px) + max value width ("000" is 24px wide) + bar-value margin (3px)
      .transition()
      .duration(700)
      .style("background-color", "steelblue");

    // Add the value label (the number of wins) next to the chart.
    d3.selectAll('div#bar-chart > div')
      .append('span')
      .text((d) => d[1] || ''); // Hide "0" values.

    d3.selectAll('div#bar-chart > div').exit().remove();
  }

  clear()
  {
    d3.selectAll('div#bar-chart > div').remove();

    d3.select("#pie-chart > svg").remove();
  }

  cycleChartType()
  {
    this.gameStateBus.chartType.emit('');

    setTimeout(()=> {
      this.ngOnInit();
    });
  }
}
