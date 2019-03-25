import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PruebaComponent } from './prueba/prueba.component';
import { HttpClientModule } from '@angular/common/http';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { PersonaComponent } from './persona/persona.component';

@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    PeliculaComponent,
    PersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
