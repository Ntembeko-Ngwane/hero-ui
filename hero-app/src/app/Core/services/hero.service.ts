import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../../Models/hero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  private apiUrl = 'http://localhost:5123/api/OurHero';

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl);
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.apiUrl}/${id}`);
  }

  addHero(hero: Hero): Observable<any> {
    return this.http.post(this.apiUrl, hero);
  }

  updateHero(id: number, hero: Hero): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, hero);
  }

  deleteHero(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
