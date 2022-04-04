import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  signUp(data: UserModel) {
    return this._http
      .post<UserModel>('http://localhost:3000/users/', data)
      .pipe(
        map((res: UserModel) => {
          return res;
        })
      );
  }

  getUsers() {
    return this._http.get<any>('http://localhost:3000/users/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateUser(data: any, id: number) {
    return this._http.put<any>('http://localhost:3000/users/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
}
