import { IProduct } from './../models/index';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  // get product

  // post product
  public createProduct(product: IProduct) {
    return this.http.post('', product).pipe(tap(console.log));
  }
  // put

  // delete
}
