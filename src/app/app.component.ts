import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import { IconService } from './service/icon.service';
import * as d3 from 'd3';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit{
  readonly DEFAULT_SIZE: number = 4;
  size: number;
  dims: Array<number>;
  currLetter: string;
  currMoves: number;
  squares: any = [];
  winner: string; 
  score: any = { 'x' : 0, 'o' : 0, 'tie' : 0 };
  totalMoves: number;  // FUTURE: show total moves and/or average moves per game
  icon: any = { 'x' : 'x', 'o' : 'o' };
  showSettings: boolean;

  readonly ICONS: Array<string>;

  constructor(private iconService: IconService) {
    this.setSize(this.DEFAULT_SIZE);
    this.totalMoves = 0;
    this.ICONS = this.iconService.getIcons();

    this.currLetter = 'x';
  }

  ngAfterContentInit() {
    // To show the chart on bootstrap, it would have to wait until here.
    // this.drawChart();
  }

  onSelectIcon(iconClass) {
    this.icon[this.currLetter] = iconClass;
  }

  drawAt(x: number, y: number) {    
    if (this.winner || this.squares[x][y]) return;

    this.squares[x][y] = this.currLetter;
    
    if (this.isWin()) {
      this.declareWinner(this.currLetter);
    }
    else if (++this.currMoves === this.size * this.size) {
      this.declareWinner('tie');
    }

    this.currLetter = (this.currLetter === 'x') ? 'o' : 'x';
  }

  isWin(): boolean {
    const letter = this.currLetter;
    const size = this.size;

    let diagdown = 0, diagup = 0, rowCounts = Array(size).fill(0);

    // Check rows, columns, and diagonal down ("\") and up ("/") in one mega loop.
    for (let i = 0; i < size; ++i) {
      let colCount = 0;
      for (let j = 0; j < size; ++j) {
        if (this.squares[j][i] === letter){
          if (++colCount === size) return true;   // Columns ("|")
          if (++rowCounts[j] === size) return true;  // Rows ("-")
        }

        if (i === j && this.squares[j][i] === letter){ // "\"
          if (++diagdown === size) return true;
        }

        if (i + j === size - 1 && this.squares[j][i] === letter){ // "/"
          if (++diagup === size) return true;
        }
      }
    }

    return false;
  }

  declareWinner(letter: string) {
    this.winner = letter;
    ++this.score[letter];
    this.drawChart();
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
      .attr('class', (d) => this.icon[d[0]] || 'tie'); // 'x', 'o' or 'tie'

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


  reset() {
    this.squares = Array(this.size);

    for (let i = 0; i < this.size; ++i) {
      this.squares[i] = Array(this.size).fill('');
    }

    this.winner = null;
    this.currMoves = 0;
  }

  setSize(newSize?: any) {
    if (isNaN(newSize) || newSize === 0) {
      newSize = window.prompt('Sorry - what would you like the new size to be?');
      this.setSize(newSize);  // (Re)curses!
      return;
    }
    else if (newSize === null) return;  // If they canceled the above prompt, just NOP.

    this.size = +newSize;
    this.dims = Array(this.size).fill(0).map((elem, i) => i);

    this.reset();

    this.showSettings = false;
  }
}