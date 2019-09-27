import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroRoutingModule } from './hero-routing.module';
import { HeroComponent } from './hero.component';
import { HeroesComponent} from './heroes/heroes.component';
import { HeroDetailComponent} from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    HeroComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    HeroesComponent,
    FilterPipe
  ],
  exports: [
    HeroSearchComponent
  ],
  imports: [
    CommonModule,
    HeroRoutingModule,
    FormsModule
  ]
})
export class HeroModule { }
