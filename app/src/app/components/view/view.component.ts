import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BatchService } from '../../services/batch.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ViewComponent implements OnInit {


  startDate = new FormControl({ value: moment(), disabled: true });
  endDate = new FormControl({ value: moment(), disabled: true });
  accessCode = new FormControl();
  phoneNumber = new FormControl();
  transactionArray = [];

  constructor(private batchService: BatchService) { }

  ngOnInit() {
  }

  onFilter() {
    this.transactionArray = [];
    // const startDate = this.startDate.value.getFullYear() +
    //   '/' + (this.startDate.value.getMonth() + 1) + '/' + this.startDate.value.getDate();
    // const endDate = this.endDate.value.getFullYear() + '/' + (this.endDate.value.getMonth() + 1) + '/' + this.endDate.value.getDate();
    // this.startDate.value.format('YYYY-MM-DD');
    // tslint:disable-next-line:max-line-length
    const startDate = `${this.startDate.value._d.getFullYear()}-${this.startDate.value._d.getMonth() + 1}-${this.startDate.value._d.getDate()}`;
    const endDate = `${this.endDate.value._d.getFullYear()}-${this.endDate.value._d.getMonth() + 1}-${this.endDate.value._d.getDate()}`;
    // tslint:disable-next-line:max-line-length
    this.batchService.viewTransactions(startDate, endDate, this.accessCode.value ? this.accessCode.value : '', this.phoneNumber.value ? this.phoneNumber.value : '').subscribe(data => {
      console.log(data[0].sort((a, b) => {
        if (a.TRX_ID > b.TRX_ID) {
          return -1;
        } else {
          return 1;
        }
      }));

      this.transactionArray = data[0];
    });
  }
}

