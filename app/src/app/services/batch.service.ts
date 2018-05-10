import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalVariable } from '../global';
import 'rxjs/add/operator/map';

@Injectable()
export class BatchService {

  constructor(private http: Http) { }

  getIpAddress() {
    return this.http
      .get('http://api.ipstack.com/check?access_key=048b660a761a090c3672566714e43094&format=1')
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

  activateBatch(batchNo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/batch/activate-batch', batchNo, { headers: headers })
      .map(res => res.json());
  }

  listVoucher(batchNo) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/batch/list-voucher', batchNo, { headers: headers })
      .map(res => res.json());
  }

  viewTransactions(startDate, endDate, accessCode, phoneNumber, pinNumber) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/batch/view-transactions', {
      startDate: startDate,
      endDate: endDate,
      accessCode,
      phoneNumber,
      pinNumber
    }, { headers: headers })
      .map(res => res.json());
  }

  viewPinDetails(pinNumber) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/batch/view-pin-detail', {
      pinNumber: pinNumber
    }, { headers: headers })
      .map(res => res.json());
  }

  viewSerialDetails(serialNumber) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/batch/view-serial-detail', {
      serialNumber: serialNumber
    }, { headers: headers })
      .map(res => res.json());
  }
}
