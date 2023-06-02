import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutView } from './views/about/about.view';
import { HomeView } from './views/home/home.view'
import { NoteView } from './views/note/note.view';

@NgModule({
  declarations: [
    AppComponent,
    HomeView,
    NoteView,
    AboutView,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
