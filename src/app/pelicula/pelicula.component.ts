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
  public selected_movie = {};
  constructor(private rutaActiva: ActivatedRoute,
  private http: HttpClient) { }

  ngOnInit() {
    console.log(this.rutaActiva.snapshot.params.id);
    this.id = this.rutaActiva.snapshot.params.id;
    // this.id = 'The Phantom Menace';
    this.getFilms('https://swapi.co/api/films').then(() => {
      console.log(this.findFilmName(this.id));
      this.selected_movie = this.findFilmName(this.id);
    });

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
