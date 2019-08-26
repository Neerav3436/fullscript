import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/post.model';
import { ApiService } from '../service/post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private apiService: ApiService) {

  }

  @ViewChild('locref', { static: true }) search: NgForm;
  loadedPosts: Post[] = [];
  isFetching = false;
  pageSize = 10;
  error = null;
  page: any = 1;
  myCollectionId: string = '8479571';

  ngOnInit() {
    this.isFetching = true;
    this.apiService.fetchApi(this.page, '/photos', this.pageSize).subscribe(posts => {
      this.isFetching = false;
      console.log(posts);
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
    });
  }

  getMyCollection() {
    this.isFetching = true;
    this.apiService.fetchApi(this.page, '/collections/' + this.myCollectionId + '/photos', this.pageSize).subscribe(posts => {
      this.isFetching = false;
      console.log(posts);
      this.loadedPosts = posts;
    }, error => {
      this.error = error.message;
    });
  }

  onSearch() {
    if (this.search.value.searchText.length > 1) {
      this.isFetching = true;
      this.apiService.fetchRequestedObject(this.search.value.searchText, this.page).subscribe(posts => {
        this.isFetching = false;
        console.log(posts);
        this.loadedPosts = posts;
      }, error => {
        this.error = error.message;
      });
    } else {
      this.ngOnInit();
    }
  }
}