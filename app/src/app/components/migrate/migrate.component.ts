import { Component, OnInit, TemplateRef } from '@angular/core';
import { MigrateService } from '../../services/migrate.service';
import { FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-migrate',
  templateUrl: './migrate.component.html',
  styleUrls: ['./migrate.component.css']
})
export class MigrateComponent implements OnInit {

  accessCode = new FormControl();
  phoneNumber = new FormControl();
  storeCredit = new FormControl();
  firstName;
  email;
  userPhoneNumber;
  userAccessCode;
  ordersObject = {};
  Object = Object; // For looping through orders object
  updateStoreCreditModal: BsModalRef;
  customerEcommerceId;



  constructor(private migrateService: MigrateService,
    private spinnerService: Ng4LoadingSpinnerService,
    private modalService: BsModalService,
    private notificationService: NotificationsService) { }

  ngOnInit() {
  }

  onEditStoreCredit(template: TemplateRef<any>) {
    this.updateStoreCreditModal = this.modalService.show(template, { class: 'modal-sm' });
  }

  onConfirm(): void {
    console.log(this.storeCredit.value);
    console.log(this.customerEcommerceId);
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
      if (data.success) {
        this.ordersObject = data.result.orderInfo;

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

