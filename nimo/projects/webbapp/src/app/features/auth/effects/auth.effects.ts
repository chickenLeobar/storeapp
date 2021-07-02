import { TokenService } from './../services/token.service';
import { IUser } from './../models/index';
import { Store } from '@ngrx/store';
import { switchMap, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import * as authActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { get } from 'lodash';
import * as pageActions from '../actions/page.action';
import { State } from '../reducers';
import { Router } from '@angular/router';
import { LoadingService } from '../../../core/ui/loading/loading.service';
import { authSelectors } from '../reducers';

@Injectable()
export class AuthEffects {
  $loguin = createEffect(
    () =>
      this.actions$
        .pipe(ofType(authActions.loguin))
        .pipe(switchMap(act => this.loguin(act))),
    { dispatch: false }
  );
  $register = createEffect(() =>
    this.actions$
      .pipe(ofType(authActions.register))
      .pipe(switchMap(act => this.register(act)))
  );

  $confirmScreen = createEffect(
    () =>
      this.actions$.pipe(
        ofType(pageActions.enterConfirmScreen, authActions.registerSuccess),
        tap(() => {
          this.loadingService.hide();
          this.router.navigateByUrl('/auth/confirm');
        })
      ),
    { dispatch: false }
  );

  // comprobate code
  $comprobateCode = createEffect(() =>
    this.actions$
      .pipe(ofType(authActions.comproateCode))
      .pipe(concatLatestFrom(() => this.store.select(authSelectors.getUser)))
      .pipe(switchMap(([action, user]) => this.comprobateCode([action, user!])))
  );

  // fetch user
  $fetchUser = createEffect(() =>
    this.actions$.pipe(ofType(authActions.fetchUser)).pipe(
      switchMap(({ id }) => {
        return this.authService.getUser(id).pipe(
          map(res => {
            if (res.validated) {
              this.store.dispatch(pageActions.enterDashboard());
            } else {
              this.router.navigate(['/auth', 'confirm']);
            }
            return authActions.fetchUserSuccess({ user: res });
          })
        );
      })
    )
  );

  $enterDahsboard = createEffect(
    () =>
      this.actions$.pipe(
        ofType(pageActions.enterDashboard),
        map(() => {
          this.loadingService.hide();
          // console.log('enter dashboard');
          // FIXME: redirect logic here
          this.router.navigateByUrl('/app/business');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private store: Store<State>,
    private tokenService: TokenService
  ) {}
  private loguin = (action: ReturnType<typeof authActions.loguin>) => {
    return this.authService.loguin(action.email, action.password).pipe(
      map(res => {
        const token = get(res, 'token');
        const user = get(res, 'user') as IUser;
        this.tokenService.saveToken(token);
        this.store.dispatch(authActions.loguinSuccess({ user: user }));
        this.store.dispatch(pageActions.enterDashboard());
      })
    );
  };

  private register = (action: ReturnType<typeof authActions.register>) => {
    return this.authService.register(action.user).pipe(
      map(res => {
        const user = get(res, 'user');
        const token = get(res, 'token');
        this.tokenService.saveToken(token);
        return authActions.registerSuccess({ user });
      })
    );
  };
  private comprobateCode([action, user]: [
    ReturnType<typeof authActions.comproateCode>,
    IUser
  ]) {
    return this.authService.confirmCode(user.email, action.code).pipe(
      map(res => {
        const token = get(res, 'token');
        const user = get(res, 'user');
        this.store.dispatch(authActions.fetchUserSuccess({ user }));
        this.tokenService.saveToken(token);
        return pageActions.enterDashboard();
      })
    );
  }
}
