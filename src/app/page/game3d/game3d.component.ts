import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'tac-game3d',
  templateUrl: './game3d.component.html',
  styleUrls: ['./game3d.component.scss'],
//  encapsulation: ViewEncapsulation.None
})
export class Game3DComponent implements OnInit {
  isVR: boolean;

  constructor(route: ActivatedRoute) {
    this.isVR = !!route.snapshot.paramMap.get('VR');
  }

  ngOnInit() {
  }

}
