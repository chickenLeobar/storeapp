import { of, EMPTY, Observable } from 'rxjs';
import { State } from './../../../reducers';
import { Store } from '@ngrx/store';
import { IUser } from './../models/index';
import { Injectable, Provider, APP_INITIALIZER } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { get } from 'lodash';
import * as authActions from '../actions/auth.actions';
import { Router } from '@angular/router';
export function initializerUser(tokenService: TokenService) {
  return () => {
    return new Promise((res, re) => {
      // console.log('initializer');
      tokenService.fetchUser();
      res({});
    });
  };
}

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtHelperService,
    private store: Store<State>,
    private router: Router
  ) {}
  public saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  public readUser() {
    return this.jwtService.decodeToken() as IUser;
  }
  public tokenIsValid(): null | number {
    return !this.jwtService.isTokenExpired()
      ? get(this.jwtService.decodeToken(), 'user_id')
      : null;
  }

  public logout() {
    localStorage.removeItem('token');
    this.store.dispatch(authActions.logoutUser());
  }
  public fetchUser(): void {
    const respToken = this.tokenIsValid();
    if (typeof respToken == 'number') {
      this.store.dispatch(authActions.fetchUser({ id: respToken }));
    } else {
      localStorage.removeItem('token');
      this.router.navigateByUrl('auth/loguin');
    }
  }
}

export const authProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializerUser,
  deps: [TokenService],
  multi: true
};
