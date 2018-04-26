import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  getIpAddress() {
    return this.http
      .get('http://api.ipstack.com/check?access_key=048b660a761a090c3672566714e43094&format=1')
      .map(res => res.json());
  }

  login(credentials) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/auth/login', credentials, { headers: headers })
      .map(res => res.json());
  }

  isUserLoggedIn(token) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/auth/isUserLoggedIn', token, { headers: headers })
      .map(res => res.json());
  }
}
