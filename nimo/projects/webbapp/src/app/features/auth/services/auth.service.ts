import { Observable } from 'rxjs';
import { IUser } from './../models/index';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { pluck } from 'rxjs/operators';
@Injectable()
export class AuthService {
  private url = environment.apiUrl.concat('api/auth');
  constructor(private http: HttpClient) {}

  // login
  public loguin(email: string, password: string) {
    let url = this.url.concat('/login');
    return this.http.post(url, { email, password }) as Observable<IUser>;
  }
  public register(user: Partial<IUser>) {
    let url = this.url.concat('/register');
    return this.http.post(url, user) as Observable<unknown>;
  }

  public confirmCode(email: string, code: string) {
    let url = this.url.concat('/verifycode');
    return this.http.post(url, { email, code });
  }

  public resendCode(email: string) {
    let url = this.url.concat('/newcode');
    return this.http.post(url, { email });
  }

  // resend code

  public getUser(id: number) {
    let url = this.url.concat(`/user/${id}/`);
    return this.http.get(url).pipe(pluck('user')) as Observable<IUser>;
  }
  // confirm code
}
