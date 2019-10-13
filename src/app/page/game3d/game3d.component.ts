import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'tac-game3d',
  templateUrl: './game3d.component.html',
  styleUrls: ['./game3d.component.scss']
})
export class Game3DComponent implements OnInit {
  isAR: boolean;

  constructor(route: ActivatedRoute) {
    this.isAR = !!route.snapshot.paramMap.get('AR');
  }

  ngOnInit() {
  }

}
