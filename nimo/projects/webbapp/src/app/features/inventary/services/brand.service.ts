import { tap } from 'rxjs/operators';
import { IBrand } from './../models/index';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable()
export class BrandService {
  private apiurl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  //
  public createBrand(brand: IBrand) {
    let url = this.apiurl.concat('api/brand/');

    return this.http.post(url, brand).pipe(tap(console.log));
  }
}
