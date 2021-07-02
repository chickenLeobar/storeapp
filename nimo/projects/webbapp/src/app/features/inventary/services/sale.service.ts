import { IDetailSale, ISale } from './../models/index';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
interface ISaleRequest {
  business?: number;
  vendedor?: number;
  details: Partial<IDetailSale>[];
  fecha_venta: Date;
  cliente?: number;
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
    if (!sale?.business) {
      sale = {
        ...sale,
        business: 8
      };
    }
    if (!sale?.vendedor) {
      sale = {
        ...sale,
        vendedor: 60
      };
    }
    return this.http.post(url, sale).pipe(
      tap(d => {
        console.log('save sale');

        console.log(d);
      })
    );
  }
}
