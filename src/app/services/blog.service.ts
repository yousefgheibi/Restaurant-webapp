import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  url = environment.apiUrl;
  constructor(private _http: HttpClient) {}
  getBlogs() {
    return this._http.get<any>(this.url+'blog/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getSingleBlog(id: number) {
    return this._http.get<any>(this.url+`blog/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
