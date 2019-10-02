import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from './settings.component';
import {IconService} from '../../service/icon.service';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
];

@NgModule({
  declarations: [ SettingsComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers : [ IconService]
})
export class SettingsModule { }


