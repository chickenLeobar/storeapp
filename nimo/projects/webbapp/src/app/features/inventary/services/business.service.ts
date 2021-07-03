import { take, mergeMap } from 'rxjs/operators';
import { INegocio } from './../models/index';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadAll } from '../actions/router.actions';
import { CURRENTBUSINESS } from '../libs/tokens';
import { selectedWorkingBusiness } from '../actions/business.actions';
import { authSelectors } from '../../auth/reducers';
@Injectable()
export class NegocioService {
  private apiurl = environment.apiUrl.concat('api/negocio/');
  constructor(
    private http: HttpClient,
    private store: Store,
    @Inject(CURRENTBUSINESS) private business: number
  ) {}

  private $user = this.store.select(authSelectors.getUser).pipe(take(1));
  // post Negocio
  public createNegocio(negocio: Partial<INegocio>): Observable<INegocio> {
    return this.$user.pipe(
      mergeMap(user => {
        negocio = {
          ...negocio,
          user: user?.id
        };
        return this.http.post(this.apiurl, negocio) as Observable<INegocio>;
      })
    );
  }
  // put
  public updateNegocio(negocio: INegocio): Observable<INegocio> {
    return this.$user.pipe(
      mergeMap(user => {
        const params = new HttpParams().append('user_id', user?.id!);
        return this.http.put(this.apiurl.concat(`${negocio.id}/`), negocio, {
          params: params
        }) as Observable<INegocio>;
      })
    );
  }
  // delete
  public deleteNegocio(negocio: INegocio) {
    console.log('hey i  am delete this');

    return this.$user.pipe(
      mergeMap(user => {
        const params = new HttpParams().append('user_id', user?.id!);
        return this.http.delete(this.apiurl.concat(`${negocio.id}/`), {
          params
        }) as Observable<INegocio>;
      })
    );
  }
  // get Negocios
  public getNegocios(): Observable<INegocio[]> {
    return this.$user.pipe(
      mergeMap(user => {
        const params = new HttpParams().append('user_id', user?.id!);
        return this.http.get(this.apiurl, { params: params }) as Observable<
          INegocio[]
        >;
      })
    );
  }
  public prepareBusiness() {
    if (this.business != -1) {
      this.store.dispatch(selectedWorkingBusiness({ id: this.business }));
      this.store.dispatch(loadAll());
    }
  }
}
