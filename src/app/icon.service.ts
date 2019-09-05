import { Injectable } from '@angular/core';

@Injectable()
export class IconService {

  constructor() { }

  getIcons(): Array<string> {
    return [
      'fas fa-camera-retro',
      'fa fa-anchor',
      'fa fa-pen-fancy',
      'fa fa-fingerprint',
      'fa fa-fire',
      'fa fa-fire-extinguisher',
      'fa fa-dungeon',
      'fa fa-dragon',
      'fa fa-dove',
      'fa fa-smile',
      'fa fa-smile-wink',
      'fa fa-dizzy',
      'fa fa-laugh',
      'fa fa-laugh-beam',
      'fa fa-dna',
      'fa fa-dice-d20',
      'fa fa-cubes',
      'fa fa-snowboarding',
      'fa fa-crown',
      'fa fa-compass',
      'fa fa-cookie-bite',
      'fa fa-chess-board',
      'fa fa-city',
      'fa fa-chess-knight',
      'fa fa-cat'
    ];
  }
}