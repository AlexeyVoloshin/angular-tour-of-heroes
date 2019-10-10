import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Hero} from './model/hero';
import {MessageService} from '../message.service';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ApiService} from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = environment.apiUrl;
  heroes: Array<Hero> = [];

  constructor(
    private _http: ApiService,
    private messageService: MessageService) {
  }

  getHeroes() {
    return this._http.get(this.heroesUrl + '/heroes', this.heroes)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHeroNo404<Data>(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/heroes/?id=${id}`;
    return this._http.get(url)
      .pipe(
        map(heroes => heroes[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/heroes/${id}`;
    return this._http.get(url, id).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/heroes`;
    return this._http.post(url, hero).pipe(
      tap((newHero: Hero) => {
        if (newHero && newHero._id) {
          this.log(`added hero w/ id=${newHero._id}`);
        } else {
          this.log('No data');
        }
      }),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero._id;
    const url = `${this.heroesUrl}/heroes/${id}`;
    return this._http.delete(url).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/heroes/${hero._id}`;
    return this._http.put(url, hero).pipe(
      tap(_ => this.log(`updated hero id=${hero._id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    const url = `${this.heroesUrl}/heroes/?name=${term}`;
    return this._http.get(url).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>(`searchHeroes`, []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
