import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  ipAddress;
  options = {
    position: ['bottom', 'left'],
    timeOut: 5000,
    lastOnBottom: true
  };


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationsService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });

    this.authService.getIpAddress().subscribe(address => {
      this.ipAddress = address.ip;
    });
  }

  onLogin() {
    console.log(this.loginForm.value.username);
    console.log(this.loginForm.value.password);
    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      ipAddress: this.ipAddress
    };

    this.authService.login(credentials).subscribe(result => {
      console.log(result);
      console.log(result['STATUS']);
      if (!result.success) {
        this.notificationService.error(
          'Error',
          'No such user has been found',
          {
            timeOut: 3000,
            pauseOnHover: false,
            clickToClose: true
          }
        );
      }
    });
  }

}
