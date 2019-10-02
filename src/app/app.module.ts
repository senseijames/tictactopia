import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from './app.component';

const routes: Routes = [
  { path : 'settings', loadChildren : ()=> import('./page/settings/settings.module').then(m => m.SettingsModule) },
  { path : 'play', loadChildren : ()=> import('./page/main/main.module').then(m => m.MainModule) },
  { path : '', redirectTo : 'play', pathMatch : 'full' }
];

@NgModule({
 imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}


/* AppRoutingModule alternative:

@NgModule({
  imports : [ RouterModule.forRoot(routes) ],
  exports : [ RouterModule ]
})
class AppRoutingModule {}

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
 })
 class AppModule {}
*/
