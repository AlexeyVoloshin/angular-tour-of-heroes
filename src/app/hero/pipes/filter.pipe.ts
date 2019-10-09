import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../model/hero';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(heroes: Hero[], select: string = ''): Hero[] {

    if (!select.trim()) {
      return heroes;
    }
    return heroes.filter( hero => {
      return hero.gender.toLowerCase().includes(select.toLowerCase());
    });
  }

}
