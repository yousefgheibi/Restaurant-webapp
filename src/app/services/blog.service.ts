import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private _http: HttpClient) { }
    getBlogs(){
     return this._http.get<any>('http://localhost:3000/blog/').pipe(
       map((res: any) => {
         return res;
       })
     );
    }
}
