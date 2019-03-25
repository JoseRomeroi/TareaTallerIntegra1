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
  constructor(private rutaActiva: ActivatedRoute,
  private http: HttpClient) { }
  public selected_people = {};

  ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    this.getMainInfo();
  }

  async getMainInfo(){
    await this.getPeople('https://swapi.co/api/people');
    this.selected_people = this.findPeopleName(this.id);
    console.log(this.selected_people);
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
