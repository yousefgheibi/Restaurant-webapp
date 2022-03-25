import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private _http: HttpClient) {}

  send(data: any) {
    return this._http.post<any>('http://localhost:3000/contact-email/', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
