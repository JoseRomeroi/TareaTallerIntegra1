import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {
  public id;
  public movies = [];
  public selected_movie: any = {};
  constructor(private rutaActiva: ActivatedRoute,
  private http: HttpClient) { }

  ngOnInit() {
    console.log(this.rutaActiva.snapshot.params.id);
    this.id = this.rutaActiva.snapshot.params.id;
    // this.id = 'The Phantom Menace';
    this.getFilms('https://swapi.co/api/films').then(() => {
      console.log(this.findFilmName(this.id));
      this.selected_movie = this.findFilmName(this.id);
      this.getCharacters(this.selected_movie.characters);
      this.getStarships(this.selected_movie.starships);
      this.getPlantes(this.selected_movie.planets);

    });
  }

  async getCharacters(url: Array<string>){
    const characters = [];
    for (let i = 0; i < url.length; i++) {
      characters.push(await this.http.get(url[i]).toPromise());
    }
    console.log(characters);
    this.selected_movie.characters = characters;
    console.log(this.selected_movie);
    return characters;
  }

  async getStarships(url: Array<string>){
    const starships = [];
    for (let i = 0; i < url.length; i++) {
      starships.push(await this.http.get(url[i]).toPromise());
    }
    console.log(starships);
    this.selected_movie.starships = starships;
    console.log(this.selected_movie);
    return starships;
  }

  async getPlantes(url: Array<string>){
    const planets = [];
    for (let i = 0; i < url.length; i++) {
      planets.push(await this.http.get(url[i]).toPromise());
    }
    console.log(planets);
    this.selected_movie.planets = planets;
    console.log(this.selected_movie);
    return planets;
  }

  findFilmName(name){
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].title === name) {
        return this.movies[i];
      };
    }
  }

  getFilms(nextLink){
   return new Promise((resolve) => {
     this.http.get(nextLink).subscribe((data:any)=> {
       // console.log(data);
       for (let i = 0; i < data.results.length; i++) {
           this.movies.push(data.results[i]);
       }
       if(data.next){
         this.getFilms(data.next);
       } else {
         console.log(this.movies);
         return resolve();
       }
     });
   });
  }
}
