import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DistrictsComponent } from './districts/districts.component';
import { StatesComponent } from './states/states.component';
import { TalukasComponent } from './talukas/talukas.component';
import { TownsComponent } from './towns/towns.component';

@NgModule({
  declarations: [
    AppComponent,
    DistrictsComponent,
    StatesComponent,
    TalukasComponent,
    TownsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
