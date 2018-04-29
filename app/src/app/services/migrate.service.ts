import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';

@Injectable()
export class MigrateService {

  constructor(private http: Http) { }

  retrieveUser(credentials) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/migrate/retrieve-user', { userInfo: credentials }, { headers: headers })
      .map(res => res.json());
  }

  updateStoreCredit(userInfo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/migrate/update-store-credit', { userInfo: userInfo }, { headers: headers })
      .map(res => res.json());
  }

}
