import { IDetailSale, ISale } from './../models/index';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
interface ISaleRequest {
  bussiness?: number;
  vendedor?: number;
  details: Partial<IDetailSale>[];
}

@Injectable()
export class SaleService {
  private readonly apiUrl = environment.apiUrl.concat('api/sale/');
  constructor(private http: HttpClient) {}
  // save sale
  public saveSale(sale: ISaleRequest): Observable<unknown> {
    let url = this.apiUrl;
    /**
     * FIXME:
     *  pass correct business id and seller
     */
    if (!sale?.bussiness) {
      sale = {
        ...sale,
        bussiness: 1
      };
    }
    if (!sale?.vendedor) {
      sale = {
        ...sale,
        vendedor: 1
      };
    }
    return this.http.post(url, sale).pipe(tap(console.log));
  }
}
