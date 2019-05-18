import { Injectable } from '@angular/core';
import { of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  authSubject = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  login(email, password) {
    return this.http.post('https://reqres.in/api/login', {email, password})
    .pipe(
      tap(res => this.saveToken(res)),
      shareReplay()
    );
  }

  private saveToken(response) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('expires', (Date.now() + 120000) .toString());
    this._userIsAuthenticated = true;
    this.authSubject.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    this._userIsAuthenticated = false;
    this.authSubject.next(false);
  }

  tokenExpired() {
    if (localStorage.getItem('expires')) {
      return Date.now() > parseInt(localStorage.getItem('expires'), 10);
    } else {
      return false;
    }
  }

  checkIfTokenValid() {
    if (localStorage.getItem('token') && !this.tokenExpired()) {
      this.authSubject.next(true);
      return true;
    } else {
      this.authSubject.next(false);
      return false;
    }
  }

}
