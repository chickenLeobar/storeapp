import { map } from 'rxjs/operators';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State, selectedWorkingBusiness } from '../reducers';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
@Injectable({
  providedIn: 'root'
})
export class SelectBusinessGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private router: Router,
    private modal: NzModalService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.store.select(selectedWorkingBusiness).pipe(
      map(businessid => {
        if (businessid) {
          console.log('blocked me');

          return true;
        } else {
          console.log('blocked me  dos');
          // FIXME: create amazing page for wait
          this.modal.error({
            nzTitle: 'Negocio no seleccionado',
            nzContent: 'No ha seleccionado un negocio'
          });
          return false;
          // return this.router.parseUrl('/app/business');
        }
      })
    );
  }
}
