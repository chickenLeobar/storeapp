import { map, tap } from 'rxjs/operators';
import { IBrand } from './../models/index';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import { CURRENTBUSINESS } from '../libs/tokens';
@Injectable()
export class BrandService {
  private apiurl = environment.apiUrl.concat('api/brand/');
  constructor(
    private http: HttpClient,
    @Inject(CURRENTBUSINESS) private business: number
  ) {}
  //
  public createBrand(brand: IBrand): Observable<IBrand> {
    let url = this.apiurl;
    brand = {
      ...brand,
      business: this.business
    };
    return this.http.post(url, brand) as Observable<IBrand>;
  }
  public getBrands(query: string): Observable<IBrand[]> {
    let url = this.apiurl;
    let params = new HttpParams().set('keyword', query);
    return this.http.get(url, { params }).pipe(
      map(nodes => {
        return Object.assign([] as IBrand[], nodes);
      })
    );
  }
  public deleteBrand(id: number) {
    return this.http.delete(this.apiurl.concat('' + id + '/'));
  }

  public editBrand(brand: IBrand) {
    let url = this.apiurl.concat(String(brand.id)).concat('/');
    return this.http.put(url, brand);
  }
}
