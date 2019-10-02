import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IconService} from "../../service/icon.service";
import {NavigationStart, ActivatedRoute, ParamMap} from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {GameStateService} from '../../service/game.state.service';

@Component({
  selector: 'tac-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  readonly ICONS: Array<string>;
  size: number;

  constructor(private iconService: IconService, private route: ActivatedRoute, private stateService: GameStateService) {
    this.ICONS = this.iconService.getIcons();

    /**
     * Client component:
     *   <i class="fa fa-lrg fa-cog" routerLink="/settings" [queryParams]="{ boardSize : size }"></i>
     */
    route.queryParamMap.subscribe((params: ParamMap) => {
      this.size = parseInt(params.get('boardSize'));
    });
  }

  ngOnInit() {
  }

}
