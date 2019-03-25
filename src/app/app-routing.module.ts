import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PruebaComponent} from './prueba/prueba.component';
import {PeliculaComponent} from './pelicula/pelicula.component';
import {PersonaComponent} from './persona/persona.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
