import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';

@Injectable()
export class BatchService {

  constructor(private http: Http) { }

  getIpAddress() {
    return this.http
      .get('http://freegeoip.net/json/?callback')
      .map(res => res.json());
  }

  listBatch() {
    return this.http.get(GlobalVariable.serverUrl + '/batch/list-batch')
      .map(res => res.json());
  }

  generate(credentials) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/generate/generate-batch', credentials, { headers: headers })
      .map(res => res.json());
  }
}
