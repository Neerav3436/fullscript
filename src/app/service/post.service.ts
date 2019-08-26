import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Post } from '../model/post.model'
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
    baseUrl:string='https://api.unsplash.com';
    authToken={'Authorization':'Client-ID ef435a412822ad02867c8fe130d28d00d41479b7d6139889c7369e25afa8c671'};
   
    constructor(private http: HttpClient) { }

    fetchApi(page:any,uri:string,pageSize:any) {
        let searchParams=new HttpParams();
        searchParams=searchParams.append('per_page',pageSize);
        searchParams=searchParams.append('page',page);
        return this.http
            .get<{ [key: string]: Post }>(this.baseUrl+uri,{
                headers:new HttpHeaders(this.authToken),
                params:searchParams
            })
            .pipe(map(respData => {
                const postArray = [];
                for (const key in respData) {
                    if (respData.hasOwnProperty(key)) {
                        postArray.push({ ...respData[key], id: key })
                    }
                }
                return postArray;
            }))
    }

    fetchRequestedObject(searchString:string,page:any){
        if(searchString.length>1){
        console.log("service:"+searchString+ "page:"+page);
        let searchParams=new HttpParams();
        searchParams=searchParams.append('per_page','20');
        searchParams=searchParams.append('page',page);
        return this.http
            .get<{ [key: string]: Post }>(this.baseUrl+'/users/'+searchString+'/photos',{
                headers:new HttpHeaders(this.authToken),
                params:searchParams
            })
            .pipe(map(respData => {
                const postArray = [];
                for (const key in respData) {
                    if (respData.hasOwnProperty(key)) {
                        postArray.push({ ...respData[key], id: key })
                    }
                }
                return postArray;
            }))
    }
    }
}