import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game.component';
import {ChartComponent} from '../../component/chart/chart.component';
import {SettingsComponent} from '../settings/settings.component';
import {IconService} from '../../service/icon.service';

const routes: Routes = [
  {
    path: '',
    component: GameComponent
  }
];

@NgModule({
  declarations: [GameComponent, ChartComponent, SettingsComponent ],
  imports: [
    CommonModule, /* SettingsModule, */ RouterModule.forChild(routes)
  ],
  providers: [ IconService ]
})
export class GameModule { }


