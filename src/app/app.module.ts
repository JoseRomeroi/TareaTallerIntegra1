import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PruebaComponent } from './prueba/prueba.component';
import { HttpClientModule } from '@angular/common/http';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { PersonaComponent } from './persona/persona.component';
import { SearcherComponent } from './searcher/searcher.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FilterPipe } from './filter.pipe';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    PeliculaComponent,
    PersonaComponent,
    SearcherComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
