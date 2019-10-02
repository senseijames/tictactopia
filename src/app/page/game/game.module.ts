import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {GameComponent} from './game.component';
import {ChartComponent} from '../../component/chart/chart.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent
  }
];

@NgModule({
  declarations: [GameComponent, ChartComponent ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
})
export class GameModule { }


