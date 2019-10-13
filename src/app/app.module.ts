import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from './app.component';
import { MainMenuComponent } from './page/main-menu/main-menu.component';

const routes: Routes = [
  // { path : 'settings', loadChildren : ()=> import('./page/settings/settings.module').then(m => m.SettingsModule) },
  { path : 'play', loadChildren : ()=> import('./page/game/game.module').then(m => m.GameModule) },
  { path : 'play3D', loadChildren : ()=> import('./page/game3d/game3d.module').then(m => m.Game3DModule) },
  { path : 'play3D/:AR', loadChildren : ()=> import('./page/game3d/game3d.module').then(m => m.Game3DModule) },
  { path : 'menu', loadChildren : ()=> import('./page/main-menu/main-menu.module').then(m => m.MainMenuModule )},
  { path : '', redirectTo : 'menu', pathMatch : 'full' }
];

@NgModule({
 imports:      [ BrowserModule, FormsModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, /* , MainMenuComponent */],  // Lazy loading the main menu may be a silly optimization, but
  bootstrap:    [ AppComponent ]                            // it is possible to start in the play state, so it feels right.
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
