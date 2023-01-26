import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = environment.apiUrl;
  constructor(private _http : HttpClient ) {}

  getAllProduct() {
    return this._http.get<any>(this.url+'menu/').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
