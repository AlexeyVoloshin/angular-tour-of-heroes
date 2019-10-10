import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero/model/hero';
import { HeroService} from '../hero/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Array<Hero> = [];

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {

        this.heroes = Object.values(heroes).slice(1, 5);
        // return this.heroes;
      });
  }
}
