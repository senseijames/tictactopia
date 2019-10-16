import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare const AFRAME;

@Component({
  selector: 'tac-game3d',
  templateUrl: './game3d.component.html',
  styleUrls: ['./game3d.component.scss'],
//  encapsulation: ViewEncapsulation.None
})
export class Game3DComponent implements OnInit, AfterViewInit {
  isVR: boolean;

  START_X: number;
  START_Y: number;
  START_Z: number = -3;
  dims: Array<number>;
  size: number;
  LENGTH: number;
  HALF_LENGTH: number;

  squares: Array<any>;
  currTurn: string;

  @ViewChild('scene', { static : true }) scene;
  @ViewChild('cameraParent', { static : true }) cameraParent;
  @ViewChild('camera', { static : true }) camera;
  @ViewChild('board', { static : true }) board;
  @ViewChild('smallTurn', { static : true }) smallTurn;
  @ViewChild('largeTurn', { static : true }) largeTurn;

  constructor(route: ActivatedRoute) {
    this.isVR = !!route.snapshot.paramMap.get('VR');

    this.currTurn = 'black';
    this.setSize(3);
  }

  setSize(dims: number)
  {
    this.dims = new Array(dims).fill(0).map((elem, i) => i);
    this.START_X = -0.25 * (dims - 1);
    this.START_Y = -0.25 * (dims - 1);
    this.size = dims;
    this.LENGTH = 0.5 * (this.size - 1) + 0.3;
    this.HALF_LENGTH = 0.5 * this.LENGTH;

    this.reset();
  }

  reset(resetBoard: boolean = false)
  {
    this.squares = Array(this.size);

    for (let i = 0; i < this.size; ++i) {
      this.squares[i] = Array(this.size);

      for (let j = 0; j < this.size; ++j) {
        this.squares[i][j] = Array(this.size).fill('');
      }
    }

    if (resetBoard){
      Array.from(document.querySelectorAll('.clickable.piece')).forEach((elem) => {
        elem.setAttribute('color', 'green');
      });
    }
  }

  ngOnInit() {
    // TODO: Consider resetting the camera here in case the user is holding their phone improperly.
    //this.resetCamera();
  }

  ngAfterViewInit() {
    // Reset the camera orientation (so the scene will be in front of the user) when they go into VR mode.
    this.scene.nativeElement.addEventListener('enter-vr', ()=> {
      const camera = this.camera.nativeElement;
      const cameraParent = this.cameraParent.nativeElement;
      cameraParent.object3D.rotation.x = -camera.object3D.rotation.x;
      cameraParent.object3D.rotation.y = -camera.object3D.rotation.y;
      cameraParent.object3D.rotation.z = -camera.object3D.rotation.z;
    });

    AFRAME.registerComponent('player-move', {
      gameComponent: this,

      init: function () {
        let data = this.data;
        let el = this.el;  // <a-box>

        el.addEventListener('click', (event)=> {
          const [x, y, z] = data.split(',');
          if (this.gameComponent.squares[x][y][z]) return;

          this.gameComponent.squares[x][y][z] = this.gameComponent.currTurn;
          el.setAttribute('color', this.gameComponent.currTurn);

          if (this.gameComponent.isWin()){
            const winner = this.gameComponent.currTurn;
            setTimeout(()=> {
              this.gameComponent.reset(true);
            }, 5000);

            setTimeout(()=> {
              alert(winner + ' is the WINNER!!\n\nThe game will reset in 5 seconds...');
            });
          }

          this.gameComponent.currTurn = (this.gameComponent.currTurn === 'black') ? 'red' : 'black';
        });
      }
    }).bind(this);

    this.addRotateOnLookListeners();
  }

  /**
   * Rotate the gameboard if the player looks past it.
   * TODO: Clean this up (register as AFRAME.component)
   */
  addRotateOnLookListeners()
  {
    let smallTurnInterval;
    this.smallTurn.nativeElement.addEventListener('mouseenter', (e)=> {
      const point = e.detail && e.detail.intersection && e.detail.intersection.point;
      if (!point) return;

      const board = this.board.nativeElement;
      smallTurnInterval = setInterval(()=> {
        if (Math.abs(point.x) > Math.abs(point.y)){
          if (point.x > 0) {
            board.object3D.rotation.y += 0.02;
          }
          else {
            board.object3D.rotation.y -= 0.02;
          }
        }
        else {
          if (point.y > 0) {
            board.object3D.rotation.x -= 0.02;
          }
          else {
            board.object3D.rotation.x += 0.02;
          }
        }
      }, 33);
    });
    this.smallTurn.nativeElement.addEventListener('mouseleave', ()=> {
      clearInterval(smallTurnInterval);
    });

    let largeTurnInterval;
    this.largeTurn.nativeElement.addEventListener('mouseenter', (e)=> {
      const point = e.detail && e.detail.intersection && e.detail.intersection.point;
      if (!point) return;

      const board = this.board.nativeElement;
      largeTurnInterval = setInterval(()=> {
        if (Math.abs(point.x) > Math.abs(point.y)){
          if (point.x > 0) {
            board.object3D.rotation.y += 0.1;
          }
          else {
            board.object3D.rotation.y -= 0.1;
          }
        }
        else {
          if (point.y > 0) {
            board.object3D.rotation.x -= 0.1;
          }
          else {
            board.object3D.rotation.x += 0.1;
          }
        }
      }, 33);
    });
    this.largeTurn.nativeElement.addEventListener('mouseleave', ()=> {
      clearInterval(largeTurnInterval);
    });
  }

  isWin(): boolean {
    const letter = this.currTurn;
    const size = this.size;
console.warn('SQUARES:', this.squares);

    // Check rows, columns, and diagonal down ("\") and up ("/") in one mega loop.
    for (let i = 0; i < size; ++i) {
      let colCount = 0;
      let diagdown = 0, diagup = 0;
      for (let j = 0; j < size; ++j) {
        let rowCount = 0;
        for (let k = 0; k < size; ++k) {
          if (this.squares[k][j][i] === letter){
            if (++colCount === size) return true;   // Columns ("|")
            if (++rowCount === size) return true;  // Rows ("-")
          }

          if (i === j && this.squares[k][j][i] === letter){ // "\"
            if (++diagdown === size) return true;
          }

          if (i + j === size - 1 && this.squares[k][j][i] === letter){ // "/"
            if (++diagup === size) return true;
          }
        }
      }
    }

    return false;
  }
}
