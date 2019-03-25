import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  public id;
  public people = [];
  public selected_people: any = {};
  constructor(private rutaActiva: ActivatedRoute,
  private http: HttpClient) { }

  ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    this.getPeople('https://swapi.co/api/people').then(()=>{
      console.log(this.findPeopleName(this.id));
      this.selected_people = this.findPeopleName(this.id);
      this.getFilms(this.selected_people.films);
      this.getStarships(this.selected_people.starships);
      this.getPlanets(this.selected_people.homeworld);
    });
  }

  async getFilms(url: Array<string>){
    const films = [];
    for (let i = 0; i < url.length; i++) {
      films.push(await this.http.get(url[i]).toPromise());
    }
    console.log(films);
    this.selected_people.films = films;
    console.log(this.selected_people);
    return films;
  }

  async getStarships(url: Array<string>){
    const starships = [];
    for (let i = 0; i < url.length; i++) {
      starships.push(await this.http.get(url[i]).toPromise());
    }
    console.log(starships);
    this.selected_people.starships = starships;
    console.log(this.selected_people);
    return starships;
  }

  async getPlanets(url: string){
    console.log(url);
    const data: any = await this.http.get(url).toPromise();
    this.selected_people.homeworld = data.name;
    console.log(data.name);
    console.log(data.results);
    console.log(this.selected_people);
    return this.selected_people.homeworld;
  }

  findPeopleName(name){
    for (let i = 0; i < this.people.length; i++) {
      if (this.people[i].name === name) {
        return this.people[i];
      };
    }
    return;
  }

  async getPeople(nextLink) {
    const data: any = await this.http.get(nextLink).toPromise();
    for (let i = 0; i < data.results.length; i++) {
       this.people.push(data.results[i]);
    }
    if(data.next){
      await this.getPeople(data.next);
    } else {
      console.log(this.people);
      return this.people;
    }
  }
}
