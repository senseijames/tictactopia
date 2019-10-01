import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IconService } from './service/icon.service';
import { SettingsComponent } from './page/settings/settings.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, SettingsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ IconService ]
})
export class AppModule { }
