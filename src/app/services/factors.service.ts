import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FactorsService {
  constructor(private _http: HttpClient) {}

  getInvoices(userId : number) {
    return this._http.get<any>('http://localhost:3000/carts/').pipe(
     map(res => res.filter( (cart: { userId: number; }) => cart.userId === userId))
    );
  }

  postInvoice(data: any) {
    return this._http.post<any>('http://localhost:3000/carts/', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
