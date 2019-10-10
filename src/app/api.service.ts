import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Hero} from './hero/model/hero';
import {environment} from '../environments/environment';
import {MessageService} from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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

  private createAuthorizationHeader(headers: HttpHeaders) {
    headers = headers || new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    // headers = headers.set('Authorization', this.token);
    return headers;
  }

  get(url: string, params?) {debugger;
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers,
      params: params
    });
  }


  // public get(url: string, params?): Observable<Hero[]> {
  //   return this.http.get<Hero[]>( url ).pipe(
  //     tap(_ => this.log('fetched heroes')),
  //     catchError(this.handleError<Hero[]>('getHeroes', []))
  //   );
  // }

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
