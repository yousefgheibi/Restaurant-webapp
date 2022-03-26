import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http : HttpClient ) {}

  getAllProduct() {
    return this._http.get<any>('http://localhost:3000/menu/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
