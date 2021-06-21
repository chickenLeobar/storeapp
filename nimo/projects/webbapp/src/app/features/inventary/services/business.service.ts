import { INegocio } from './../models/index';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class NegocioService {
  private apiurl = environment.apiUrl.concat('api/negocio/');
  constructor(private http: HttpClient) {}
  // post Negocio
  public createNegocio(negocio: Partial<INegocio>): Observable<INegocio> {
    return this.http.post(this.apiurl, negocio) as Observable<INegocio>;
  }
  // put
  public updateNegocio(negocio: INegocio): Observable<INegocio> {
    return this.http.put(
      this.apiurl.concat(`${negocio.id}/`),
      negocio
    ) as Observable<INegocio>;
  }
  // delete
  public deleteNegocio(negocio: INegocio) {
    return this.http.delete(this.apiurl.concat(`${negocio.id}/`));
  }
  // get Negocios
  public getNegocios(): Observable<INegocio[]> {
    return this.http.get(this.apiurl).pipe(tap(console.log));
  }
}
