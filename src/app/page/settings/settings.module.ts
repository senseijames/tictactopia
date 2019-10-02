import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from './settings.component';
import {IconService} from '../../service/icon.service';
import { Routes, RouterModule } from '@angular/router';


/*
  Deprecated: unless you decide to show this as its own page.
 */
// const routes: Routes = [
//   {
//     path: '',
//     component: SettingsComponent
//   }
// ];

@NgModule({
  declarations: [ SettingsComponent ],
  imports: [
    CommonModule
    // RouterModule.forChild(routes)
  ],
  providers : [ IconService]
})
export class SettingsModule { }


