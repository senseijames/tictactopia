import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IconService} from "../../service/icon.service";

@Component({
  selector: 'tac-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  readonly ICONS: Array<string>;
// TODO: retrieve in route param?
  size: number;

  @Output() boardSize: EventEmitter<string>;
  @Output() playerIcon: EventEmitter<string>;

  constructor(private iconService: IconService) {
    this.ICONS = this.iconService.getIcons();
  }

  ngOnInit() {

  }

}
