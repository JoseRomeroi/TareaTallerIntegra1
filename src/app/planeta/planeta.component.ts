import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-planeta',
  templateUrl: './planeta.component.html',
  styleUrls: ['./planeta.component.css']
})
export class PlanetaComponent implements OnInit {
  public id;
  public planets = [];
  public selected_planets: any = {};
  constructor(private rutaActiva: ActivatedRoute,
  private http: HttpClient) { }

  ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    this.getPlanets('https://swapi.co/api/planets').then(()=>{
      // console.log(this.findPlanetName(this.id));
      this.selected_planets = this.findPlanetName(this.id);
      this.getFilms(this.selected_planets.films);
      this.getCharacters(this.selected_planets.residents);
    });
  }

  async getCharacters(url: Array<string>){
    const characters = [];
    for (let i = 0; i < url.length; i++) {
      characters.push(await this.http.get(url[i]).toPromise());
    }
    // console.log(characters);
    this.selected_planets.residents = characters;
    // console.log(this.selected_planets);
    return characters;
  }

  async getFilms(url: Array<string>){
    const films = [];
    for (let i = 0; i < url.length; i++) {
      films.push(await this.http.get(url[i]).toPromise());
    }
    // console.log(films);
    this.selected_planets.films = films;
    // console.log(this.selected_planets);
    return films;
  }

  findPlanetName(name){
    for (let i = 0; i < this.planets.length; i++) {
      if (this.planets[i].name === name) {
        return this.planets[i];
      };
    }
    return;
  }

  async getPlanets(nextLink) {
    const data: any = await this.http.get(nextLink).toPromise();
    for (let i = 0; i < data.results.length; i++) {
       this.planets.push(data.results[i]);
    }
    if(data.next){
      await this.getPlanets(data.next);
    } else {
      console.log(this.planets);
      return this.planets;
    }
  }
}
