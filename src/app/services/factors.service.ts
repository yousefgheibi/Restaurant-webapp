import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FactorsService {
  url = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  getInvoices(userId : number) {
    return this._http.get<any>(this.url+'carts/').pipe(
     map(res => res.filter( (cart: { userId: number; }) => cart.userId === userId))
    );
  }

  postInvoice(data: any) {
    return this._http.post<any>(this.url+'carts/', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
