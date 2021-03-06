import { Component, OnInit, TemplateRef } from '@angular/core';
import { MigrateService } from '../../services/migrate.service';
import { FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-migrate',
  templateUrl: './migrate.component.html',
  styleUrls: ['./migrate.component.css']
})
export class MigrateComponent implements OnInit {

  accessCode = new FormControl();
  phoneNumber = new FormControl();
  storeCredit = new FormControl();
  remarks = new FormControl();
  firstName;
  email;
  userPhoneNumber;
  userAccessCode;
  ordersObject = {};
  Object = Object; // For looping through orders object
  updateStoreCreditModal: BsModalRef;
  customerEcommerceId;
  migrateRemarks = [];



  constructor(private migrateService: MigrateService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private notificationService: NotificationsService) { }

  ngOnInit() {
  }

  onEditStoreCredit(template: TemplateRef<any>) {
    if (this.remarks.value) {
      this.updateStoreCreditModal = this.modalService.show(template, { class: 'modal-sm' });
    } else {
      this.notificationService.error('Error', 'Please input some remarks', {
        timeOut: 5000,
        pauseOnHover: false,
        clickToClose: true
      });
    }
  }

  onConfirm(): void {
    console.log(this.storeCredit.value);
    console.log(this.customerEcommerceId);


    this.migrateService.getIpAddress().pipe(mergeMap(ipAddress => this.migrateService.updateStoreCredit({
      storeCredit: this.storeCredit.value,
      customerEcommerceId: this.customerEcommerceId,
      remarks: this.remarks.value,
      ipAddress: ipAddress.ip
    }))).subscribe(data => {
      console.log(data);
      this.updateStoreCreditModal.hide();
      if (data.success) {
        this.notificationService.success('Success', 'Store Credit has been updated', {
          timeOut: 5000,
          pauseOnHover: false,
          clickToClose: true
        });
      } else {
        this.notificationService.error('Error', 'Update Fail' + data.message, {
          timeOut: 5000,
          pauseOnHover: false,
          clickToClose: true
        });
      }
    });
    // this.migrateService.updateStoreCredit({
    //   storeCredit: this.storeCredit.value,
    //   customerEcommerceId: this.customerEcommerceId,
    //   remarks: this.remarks.value
    // }).subscribe(data => {
    //   console.log(data);
    //   this.updateStoreCreditModal.hide();
    //   if (data.success) {
    //     this.notificationService.success('Success', 'Store Credit has been updated', {
    //       timeOut: 5000,
    //       pauseOnHover: false,
    //       clickToClose: true
    //     });
    //   } else {
    //     this.notificationService.error('Error', 'Update Fail' + data.message, {
    //       timeOut: 5000,
    //       pauseOnHover: false,
    //       clickToClose: true
    //     });
    //   }
    // });
  }

  onDecline(): void {
    this.updateStoreCreditModal.hide();
  }

  onFind() {
    this.spinnerService.show();
    console.log(this.accessCode.value);
    console.log(this.phoneNumber.value);
    const credentials = {
      accessCode: this.accessCode.value,
      phoneNumber: this.phoneNumber.value
    };
    this.migrateService.retrieveUser(credentials).subscribe(data => {
      // firstName = data.first
      // console.log(data.result.orderInfo);
      // this.ordersArray.push(data.result.orderInfo);
      console.log(data);
      if (data.success) {
        this.ordersObject = data.result.orderInfo;
        this.migrateRemarks = data.result.migrateRemarks;

        // for (const key in data.result.orderInfo) {
        //   if (data.result.orderInfo.hasOwnProperty(key)) {
        //     this.ordersArray.push(data.result.orderInfo[key]);
        //     console.log(data.result.orderInfo[key]);
        //   }
        // }
        // console.log(this.ordersArray);

        this.firstName = data.result.userInfo.first_name;
        this.email = data.result.userInfo.email;
        this.userPhoneNumber = data.result.userInfo.phone;
        this.storeCredit.setValue(data.result.userInfo.store_credit);
        this.userAccessCode = data.result.userInfo.notes;
        this.customerEcommerceId = data.result.userInfo.id;
        this.spinnerService.hide();
        // this.orders = data.orderInfo;
      } else {
        this.spinnerService.hide();
        this.notificationService.error('Error', 'User not found', {
          timeOut: 5000,
          pauseOnHover: false,
          clickToClose: true
        });
      }
    });
  }

}

