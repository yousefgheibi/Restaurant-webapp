import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  signUp(data: UserModel) {
    return this._http
      .post<UserModel>(this.url+'users/', data)
      .pipe(
        map((res: UserModel) => {
          return res;
        })
      );
  }

  getUsers() {
    return this._http.get<any>(this.url+'users/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateUser(data: any, id: number) {
    return this._http.put<any>(this.url+'users/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
