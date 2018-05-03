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
    return this.http.post(GlobalVariable.serverUrl + '/batch/generate-batch', credentials, { headers: headers })
      .map(res => res.json());
  }

  exportBatch(batchNo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/batch/export-batch', batchNo, { headers: headers })
      .map(res => res.json());
  }

  printBatch(batchNo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/batch/print-batch', batchNo, { headers: headers })
      .map(res => res.json());
  }

  listVoucher(batchNo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/batch/list-voucher', batchNo, { headers: headers })
      .map(res => res.json());
  }

  viewTransactions(startDate, endDate) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/batch/view-transactions', {
      startDate: startDate,
      endDate: endDate
    }, { headers: headers })
      .map(res => res.json());
  }
}
