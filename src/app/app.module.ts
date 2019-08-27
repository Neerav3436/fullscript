import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {Routes, RouterModule}from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ControlsComponent } from './controls/controls.component';



const appRoutes:Routes=[
  {path:'',component: HomeComponent},
  {path:'controls',component: ControlsComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ControlsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
