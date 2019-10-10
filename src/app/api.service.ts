import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Hero} from './hero/model/hero';
import {environment} from '../environments/environment';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private heroesUrl = environment.apiUrl;
  heroes: Array<Hero> = [];

  constructor(private http: HttpClient) {
  }

  private createHeader(headers: HttpHeaders) {
    headers = headers || new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', this.heroesUrl);
    return headers;
  }

  private createAuthorizationHeader(headers: HttpHeaders) {
    headers = headers || new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  get(url: string, params?): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers,
      params
    });
  }

  post(url: string, data?): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers,
    });
  }

  delete(url: string, params?): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers,
      params
    });
  }

  put(url: string, data?): Observable<any> {
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers,
    });
  }
}
