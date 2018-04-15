import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BatchService } from '../../services/batch.service';
import { NotificationsService } from 'angular2-notifications';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css']
})
export class GenerateComponent implements OnInit {

  generateForm: FormGroup;
  // batchName;
  // header;
  // quantity;
  // amount;
  // expiryDate;


  constructor(private formBuilder: FormBuilder,
    private generateService: BatchService,
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
      expiryDate: ['', Validators.required],
    });
  }

  onGenerate() {
    if (this.generateForm.valid) {
      this.spinnerService.show();

      const generate = {
        batchName: this.generateForm.controls.batchName.value,
        header: this.generateForm.controls.header.value,
        quantity: this.generateForm.controls.quantity.value,
        amount: this.generateForm.controls.amount.value,
        expiryDate: this.generateForm.controls.expiryDate.value,
        token: localStorage.getItem('token')
      };
      this.generateService.generate(generate).subscribe(data => {
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

    } else {
      console.log(this.generateForm.controls.batchName.errors);
    }
  }
}
