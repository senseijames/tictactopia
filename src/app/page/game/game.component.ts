import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
import {GameStateService} from '../../service/game.state.service';

@Component({
  selector: 'tac-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
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

  constructor(private stateService: GameStateService) {
    this.setSize(this.DEFAULT_SIZE);
    this.totalMoves = 0;

    this.currLetter = 'x';

// LOH: find a way to persist the game state in the background.
    this.stateService.boardSize.subscribe((size:number)=>{
      this.setSize(size);
    });
    this.stateService.playerIcon.subscribe((iconClass:string)=>{
      this.icon[this.currLetter] = iconClass;
    })
    this.stateService.showSettings.subscribe((isShow:boolean)=> {
      this.showSettings = isShow;
    });
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
    ++this.score[letter];
    this.winner = letter;
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
  }
}