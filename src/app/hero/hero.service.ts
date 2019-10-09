import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Hero } from './model/hero';
import { MessageService } from '../message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  heroes: Array<Hero> = [];
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  private createHeader(headers: HttpHeaders) {
    headers = headers || new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', this.heroesUrl);
    return headers;
  }
      getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>( this.heroesUrl + '/heroes')
          .pipe(
            tap(_ => this.log('fetched heroes')),
            catchError(this.handleError<Hero[]>('getHeroes', []))
          );
      }
      getHeroNo404<Data>(id: string): Observable<Hero>{
        const url = `${this.heroesUrl}/heroes/?id=${id}`;
        return this.http.get<Hero[]>(url)
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
        return this.http.get<Hero>(url).pipe(
          tap(_ => this.log(`fetched hero id=${id}`)),
          catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
      }
      addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl + "/heroes", hero, this.httpOptions).pipe(
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

        return this.http.delete<Hero>(url, this.httpOptions).pipe(
          tap(_ => this.log(`deleted hero id=${id}`)),
          catchError(this.handleError<Hero>('deleteHero'))
        );
      }
      searchHeroes(term: string): Observable<Hero[]> {
        if (!term.trim()) {
          return of([]);
        }
        return this.http.get<Hero[]>(`${this.heroesUrl}/heroes/?name=${term}`).pipe(
          tap(_ => this.log(`found heroes matching "${term}"`)),
          catchError(this.handleError<Hero[]>(`searchHeroes`, []))
        );
      }
      updateHero(hero: Hero): Observable<any> {
        return this.http.put(this.heroesUrl + `/heroes/${hero._id}`, hero, this.httpOptions).pipe(
          tap(_ => this.log(`updated hero id=${hero._id}`)),
          catchError(this.handleError<any>('updateHero'))
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
