import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GET } from '../model/get.model'
import { Post } from '../model/post.model'
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
    baseUrl: string = 'https://api.unsplash.com';
    authToken = { 'Authorization': 'Client-ID ef435a412822ad02867c8fe130d28d00d41479b7d6139889c7369e25afa8c671' };
    bearerToken = { 'Authorization': 'Bearer 7fe4529350485ac6dac0861e2f23c3494e511a1579a121a365d02ba661504d57' };

    constructor(private http: HttpClient) { }

    onAddPhotosToCollection(collection_id: string, photo_id: string) {
        const postData:Post={collection_id:collection_id,photo_id:photo_id};
        let postParams = new HttpParams();
        postParams = postParams.append('collection_id', collection_id);
        postParams = postParams.append('photo_id', photo_id);
        return this.http.post<{ name: string }>(this.baseUrl + '/collections/8479571/add',postData, {
            headers: new HttpHeaders(this.bearerToken),
            params: postParams
        }).subscribe(respData => {
            console.log(respData);
        });
    }

    fetchApi(page: any, uri: string, pageSize: any) {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('per_page', pageSize);
        searchParams = searchParams.append('page', page);
        return this.http
            .get<{ [key: string]: GET }>(this.baseUrl + uri, {
                headers: new HttpHeaders(this.authToken),
                params: searchParams
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

    fetchRequestedObject(searchString: string, page: any) {
        if (searchString.length > 1) {
            console.log("service:" + searchString + "page:" + page);
            let searchParams = new HttpParams();
            searchParams = searchParams.append('per_page', '20');
            searchParams = searchParams.append('page', page);
            return this.http
                .get<{ [key: string]: GET }>(this.baseUrl + '/users/' + searchString + '/photos', {
                    headers: new HttpHeaders(this.authToken),
                    params: searchParams
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

    onDeletePhotosFromCollection(collection_id: string, photo_id: string){
        let postParams = new HttpParams();
        postParams = postParams.append('collection_id', collection_id);
        postParams = postParams.append('photo_id', photo_id);
        return this.http.delete<{ name: string }>(this.baseUrl + '/collections/8479571/remove' , {
            headers: new HttpHeaders(this.bearerToken),
            params: postParams
        });
    }
}