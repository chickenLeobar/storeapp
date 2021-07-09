import { IProduct } from './../models/index';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CURRENTBUSINESS } from '../libs/tokens';
@Injectable()
export class ProductService {
  private apiurl = environment.apiUrl.concat('api/products/');
  constructor(
    private http: HttpClient,
    @Inject(CURRENTBUSINESS) private business: number
  ) {}
  // post product
  public createProduct(product: Partial<IProduct>): Observable<IProduct> {
    product = {
      ...product,
      business: this.business
    };
    return this.http
      .post(this.apiurl, product)
      .pipe(tap(console.log)) as Observable<IProduct>;
  }
  // put
  public updateProduct(product: IProduct): Observable<IProduct> {
    product = {
      ...product,
      business: this.business
    };

    return this.http.put(
      this.apiurl.concat(`${product.id}/`),
      product
    ) as Observable<IProduct>;
  }
  // delete
  public deleteProduct(product: IProduct) {
    return this.http.delete(this.apiurl.concat(`${product.id}/`));
  }
  // get products
  public getProducts(): Observable<IProduct[]> {
    return this.http.get(this.apiurl) as Observable<IProduct[]>;
  }
}
