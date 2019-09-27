import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeroComponent} from './hero.component';
import { HeroesComponent } from './heroes/heroes.component';

const routes: Routes = [
  {
    path: '', component: HeroesComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule { }
