import { Injectable } from '@angular/core';
import {Hero} from "./hero";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http"; 
import {catchError, map, tap} from "rxjs/operators";
import { HeroesComponent } from './heroes/heroes.component';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = "api/heroes";
  httpOptions = 
  {
      headers : new HttpHeaders({"Content-Type" : "application/json"})
  };
  getHeroes() : Observable<Hero[]>
  {
    this.log("Herois adicionados");
    return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(heroes => this.log("herois adicionados")),catchError(this.handleError("getHeroes", [])));
  }
  updateHero(hero: Hero): Observable<any>
  {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(tap(_=>this.log(`updated hero id = ${hero.id}`)), catchError(this.handleError<any>("updateHero")));
  }
  private handleError<T>(operation = "operation", result?:T)
  {
    return (error: any): Observable<T> => 
    {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
  constructor(private messageService :MessageService, private http: HttpClient) 
  { 

  }
  private log(message: string)
  {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHero(id:number): Observable<Hero>
  {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(tap(_=> this.log(`fetched hero id = ${id}`)),catchError(this.handleError<Hero>(`getHero id = ${id}`)));
  }
}
