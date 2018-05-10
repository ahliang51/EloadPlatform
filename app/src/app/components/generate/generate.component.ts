import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BatchService } from '../../services/batch.service';
import { NotificationsService } from 'angular2-notifications';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { mergeMap } from 'rxjs/operators';

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
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css'], providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class GenerateComponent implements OnInit {

  generateForm: FormGroup;
  expiryDate = new FormControl({ value: moment(), disabled: true });
  // batchName;
  // header;
  // quantity;
  // amount;
  // expiryDate;


  constructor(private formBuilder: FormBuilder,
    private batchService: BatchService,
    private notificationService: NotificationsService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router) { }

  ngOnInit() {

    // this.generateForm = new FormGroup({
    //   'batchName': new FormControl(this.batchName, [
    //     Validators.required,
    //     Validators.minLength(4),
    //   ]),
    //   'header': new FormControl(this.header, [
    //     Validators.required,
    //     Validators.minLength(4),
    //     Validators.maxLength(4),
    //   ]),
    //   'quantity': new FormControl(this.quantity, [
    //     Validators.required,
    //   ]),
    //   'amount': new FormControl(this.amount, [
    //     Validators.required,
    //   ]),
    //   'expiryDate': new FormControl(this.expiryDate, [
    //     Validators.required,
    //   ]),
    // });

    this.generateForm = this.formBuilder.group({
      batchName: ['', Validators.required],
      header: ['',
        [Validators.required, Validators.minLength(4),
        Validators.maxLength(4), Validators.pattern('[0-9]*')]],
      quantity: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  onGenerate() {
    if (this.generateForm.valid) {
      this.spinnerService.show();

      // tslint:disable-next-line:max-line-length
      const expiryDate = `${this.expiryDate.value._d.getFullYear()}-${this.expiryDate.value._d.getMonth() + 1}-${this.expiryDate.value._d.getDate()}`;
      console.log(expiryDate);


      this.batchService.getIpAddress().pipe(mergeMap(ipAddress => this.batchService.generate({
        batchName: this.generateForm.controls.batchName.value,
        header: this.generateForm.controls.header.value,
        quantity: this.generateForm.controls.quantity.value,
        amount: this.generateForm.controls.amount.value,
        expiryDate: expiryDate,
        token: localStorage.getItem('token'),
        ipAddress: ipAddress.ip
      }))).subscribe(data => {
        if (data.success) {
          this.notificationService.success('Success', 'Successfully Generated', {
            timeOut: 5000,
            pauseOnHover: false,
            clickToClose: true
          });
          this.router.navigate(['/home']);
          this.spinnerService.hide();
        }
      });

      // const generate = {
      //   batchName: this.generateForm.controls.batchName.value,
      //   header: this.generateForm.controls.header.value,
      //   quantity: this.generateForm.controls.quantity.value,
      //   amount: this.generateForm.controls.amount.value,
      //   expiryDate: expiryDate,
      //   token: localStorage.getItem('token')
      // };
      // this.generateService.generate(generate).subscribe(data => {
      //   if (data.success) {
      //     this.notificationService.success('Success', 'Successfully Generated', {
      //       timeOut: 5000,
      //       pauseOnHover: false,
      //       clickToClose: true
      //     });
      //     this.router.navigate(['/home']);
      //     this.spinnerService.hide();
      //   }
      // });

    } else {
      console.log(this.generateForm.controls.batchName.errors);
    }
  }
}
