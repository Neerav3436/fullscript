import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GET} from './model/get.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient) { }

  loadedPosts:GET[]=[];

  ngOnInit(){
    this.fetchPosts();
  }

  private fetchPosts(){
 
  }

}
