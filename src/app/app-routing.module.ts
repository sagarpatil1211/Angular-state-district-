import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictsComponent } from './districts/districts.component';
import { StatesComponent } from './states/states.component';
import { TalukasComponent } from './talukas/talukas.component';
import { TownsComponent } from './towns/towns.component';

const routes: Routes = [
  {path:"", component:StatesComponent},
  {path:"states", component:StatesComponent},
  {path: "districts/:stateid", component:DistrictsComponent},
  {path: "talukas/:districtid", component:TalukasComponent},
  {path: "towns/:talukaid", component:TownsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
