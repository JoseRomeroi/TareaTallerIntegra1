import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-nave',
  templateUrl: './nave.component.html',
  styleUrls: ['./nave.component.css']
})
export class NaveComponent implements OnInit {
  public id;
  public starships = [];
  public selected_starships: any = {}
  constructor(private rutaActiva: ActivatedRoute,
  private http: HttpClient) { }

  ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    this.getStarships('https://swapi.co/api/starships').then(()=>{
      // console.log(this.findStarshipsName(this.id));
      this.selected_starships = this.findStarshipsName(this.id);
      this.getFilms(this.selected_starships.films);
      this.getCharacters(this.selected_starships.pilots);
    });
  }

  async getCharacters(url: Array<string>){
    const characters = [];
    for (let i = 0; i < url.length; i++) {
      characters.push(await this.http.get(url[i]).toPromise());
    }
    // console.log(characters);
    this.selected_starships.pilots = characters;
    // console.log(this.selected_starships);
    return characters;
  }

  async getFilms(url: Array<string>){
    const films = [];
    for (let i = 0; i < url.length; i++) {
      films.push(await this.http.get(url[i]).toPromise());
    }
    // console.log(films);
    this.selected_starships.films = films;
    // console.log(this.selected_starships);
    return films;
  }

  async getStarships(nextLink) {
    const data: any = await this.http.get(nextLink).toPromise();
    for (let i = 0; i < data.results.length; i++) {
       this.starships.push(data.results[i]);
    }
    if(data.next){
      await this.getStarships(data.next);
    } else {
      // console.log(this.starships);
      return this.starships;
    }
  }
  findStarshipsName(name){
    for (let i = 0; i < this.starships.length; i++) {
      if (this.starships[i].name === name) {
        return this.starships[i];
      };
    }
    return;
  }

}
