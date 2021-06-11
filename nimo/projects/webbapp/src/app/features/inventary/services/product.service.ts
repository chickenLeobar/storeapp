import { IProduct } from './../models/index';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  private apiurl = environment.apiUrl.concat('api/category/');
  constructor(private http: HttpClient) {}
  // post product
  public createProduct(product: Partial<IProduct>): Observable<IProduct> {
    return this.http.post(this.apiurl, product).pipe(tap(console.log));
  }
  // put
  public updateProduct(product: IProduct): Observable<IProduct> {
    return this.http
      .put(this.apiurl.concat(`${product.id}/`), product)
      .pipe(tap(console.log));
  }
  // delete
  public deleteProduct(product: IProduct) {
    return this.http
      .delete(this.apiurl.concat(`${product.id}/`))
      .pipe(tap(console.log));
  }
  // get products
  public getProducts(): Observable<IProduct[]> {
    return this.http.get(this.apiurl).pipe(tap(console.log));
  }
}
