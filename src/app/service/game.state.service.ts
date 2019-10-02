import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  @Output() boardSize: EventEmitter<string> = new EventEmitter<string>();
  @Output() playerIcon: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}
