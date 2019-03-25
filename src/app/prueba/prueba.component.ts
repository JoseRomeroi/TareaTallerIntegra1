import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  public movies = [];
  public people = [];
  public planets = [];
  public starships = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getFilms();
    this.getPeople('https://swapi.co/api/people');
    this.getStarships('https://swapi.co/api/starships');
    this.getPlanets('https://swapi.co/api/planets');

  }
  getFilms(){
    this.http.get('https://swapi.co/api/films').subscribe((data:any)=> {
      this.movies = data.results;
      console.log(this.movies)
    });
  }


  getPlanets(nextLink){
    this.http.get(nextLink).subscribe((data:any)=> {
      // console.log(data);
      for (let i = 0; i < data.results.length; i++) {
          this.planets.push(data.results[i]);
      }
      if(data.next){
        this.getPlanets(data.next);
      } else {
        console.log(this.planets);
      }
    });
  }

  getPeople(nextLink){
    this.http.get(nextLink).subscribe((data:any)=> {
      // console.log(data);
      for (let i = 0; i < data.results.length; i++) {
          this.people.push(data.results[i]);
      }
      if(data.next){
        this.getPeople(data.next);
      } else {
        console.log(this.people);
      }
    });
  }

  getStarships(nextLink){
    this.http.get(nextLink).subscribe((data:any)=> {
      // console.log(data);
      for (let i = 0; i < data.results.length; i++) {
          this.starships.push(data.results[i]);
      }
      if(data.next){
        this.getStarships(data.next);
      } else {
        console.log(this.starships);
      }
    });
  }

}
