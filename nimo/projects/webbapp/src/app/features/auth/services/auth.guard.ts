import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { State, authSelectors } from '../reducers';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private store: Store<State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(authSelectors.isUserLoggedIn).pipe(
      map(authed => {
        if (!authed) {
          this.router.navigateByUrl('/auth/loguin');
          return false;
        }
        return true;
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.canActivate(childRoute, state);
  }
}
