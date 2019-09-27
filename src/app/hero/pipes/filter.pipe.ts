import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../model/hero';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(heroes: Hero[], select: string = ''): Hero[] {

    if (!select.trim()) {
      console.log('heroes', heroes);
      return heroes;
    }
    return heroes.filter( hero => {
      console.log('select', select);
      console.log('hero.gender', hero.gender);
      return hero.gender.toLowerCase().includes(select.toLowerCase());
    });
  }

}
