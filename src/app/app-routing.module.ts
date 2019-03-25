import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PruebaComponent} from './prueba/prueba.component';
import {PeliculaComponent} from './pelicula/pelicula.component';
import {PersonaComponent} from './persona/persona.component';
import { NaveComponent } from './nave/nave.component';
import { PlanetaComponent } from './planeta/planeta.component';

const routes: Routes = [
  {
    path: 'pelicula/:id',
    component: PeliculaComponent
  },
  {
    path: 'main',
    component: PruebaComponent
  },
  {
    path: 'persona/:id',
    component: PersonaComponent
  },

  {
    path: 'nave/:id',
    component: NaveComponent
  },
  {
    path: 'planeta/:id',
    component: PlanetaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
