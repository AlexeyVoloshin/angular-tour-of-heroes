import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero/model/hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const heroes = [
    //   { id: 11, name: 'Dr Nice', gender: 'ml'},
    //   { id: 12, name: 'Narco', gender: 'ml'},
    //   { id: 13, name: 'Bombasto', gender: 'ml'},
    //   { id: 14, name: 'Celeritas', gender: 'ml'},
    //   { id: 15, name: 'Magneta', gender: 'female'},
    //   { id: 16, name: 'RubberMan', gender: 'ml'},
    //   { id: 17, name: 'Dynama', gender: 'female'},
    //   { id: 18, name: 'Dr IQ', gender: 'ml'},
    //   { id: 19, name: 'Magma', gender: 'female'},
    //   { id: 20, name: 'Tornado', gender: 'ml'},
    ];
    return {heroes};
  }
  // getId(heroes: Hero[]): number {
  //   return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  // }
}
