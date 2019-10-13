import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {Game3DComponent} from './game3d.component';


const routes: Routes = [
  { path : '', component : Game3DComponent }
];

@NgModule({
  declarations: [ Game3DComponent ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class Game3DModule { }
