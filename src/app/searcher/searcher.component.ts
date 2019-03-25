import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  public movies = [];
  public people = [];
  public planets = [];
  public starships = [];
  dataset = ['MDB', 'Angular', 'Bootstrap', 'Framework', 'SPA', 'React', 'Vue'];
  searchText = 'A';

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


  async getPlanets(nextLink){
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

  async getPeople(nextLink){
    const data: any = await this.http.get(nextLink).toPromise();
    for (let i = 0; i < data.results.length; i++) {
        this.people.push(data.results[i]);
    }
    if(data.next){
      await this.getPeople(data.next);
    } else {
      console.log(this.people);
    }
  }

  async getStarships(nextLink){
    const data: any = await this.http.get(nextLink).toPromise();
    // console.log(data);
    for (let i = 0; i < data.results.length; i++) {
      await this.starships.push(data.results[i]);
    }
    if(data.next){
      this.getStarships(data.next);
    } else {
      console.log(this.starships);
    }
  }
}
