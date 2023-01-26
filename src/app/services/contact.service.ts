import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  url = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  send(data: any) {
    return this._http.post<any>(this.url+'contact-email/', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
