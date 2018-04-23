import { Component, OnInit } from '@angular/core';
import { MigrateService } from '../../services/migrate.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-migrate',
  templateUrl: './migrate.component.html',
  styleUrls: ['./migrate.component.css']
})
export class MigrateComponent implements OnInit {

  accessCode = new FormControl();
  phoneNumber = new FormControl();
  firstName;
  email;
  userPhoneNumber;
  storeCredit;
  userAccessCode;
  ordersObject = {};
  Object = Object; // For looping through orders object



  constructor(private migrateService: MigrateService) { }

  ngOnInit() {
  }

  onFind() {
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
      this.ordersObject = data.result.orderInfo;
      console.log(this.ordersObject);
      if (data.success) {
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
        this.storeCredit = data.result.userInfo.store_credit;
        this.userAccessCode = data.result.userInfo.notes;
        // this.orders = data.orderInfo;
      }
    });
  }

}

