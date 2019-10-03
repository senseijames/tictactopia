import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateServiceBus
{
  @Output() boardSize: EventEmitter<string> = new EventEmitter<string>();
  @Output() playerIcon: EventEmitter<string> = new EventEmitter<string>();
  @Output() showSettings: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() chartType: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}
