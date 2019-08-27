import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/post.service';


@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css']
})
export class ControlsComponent  {

  deletionError=null;
  addError=null;

  constructor(private http: HttpClient, private apiService: ApiService) {
  }

 addPhoto(collection_id:string,photo_id:string){
    this.apiService.onAddPhotosToCollection(collection_id,photo_id);
  }
 
  removePhoto(collection_id:string,photo_id:string){
    this.apiService.onDeletePhotosFromCollection(collection_id,photo_id).subscribe(
      success => {this.deletionError=false;},
      error => {this.deletionError=true;}
    );

  }
}

