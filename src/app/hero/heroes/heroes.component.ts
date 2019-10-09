import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/hero';
import { HeroService} from '../hero.service';
import { FilterHeroesModel } from '../model/filter.heroes.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  filtersHero: FilterHeroesModel[] = [
    { id: 1, name: 'ml' },
    { id: 2, name: 'female' },
  ];
  select: string;
  heroes: Hero[];
  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        return this.heroes;
      });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
