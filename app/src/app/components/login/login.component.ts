import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private notificationService: NotificationsService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router) { }

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
    if (this.loginForm.value.username === '' || this.loginForm.value.password === '') {
      this.notificationService.error(
        'Error',
        'Please Enter Credentials',
        {
          timeOut: 3000,
          pauseOnHover: false,
          clickToClose: true
        });
    } else {
      this.spinnerService.show();
      const credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        ipAddress: this.ipAddress
      };

      this.authService.login(credentials).subscribe(result => {
        console.log(result);
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
        } else {
          this.notificationService.success('Success', 'You have logged in', {
            timeOut: 3000,
            pauseOnHover: false,
            clickToClose: true
          });
          localStorage.setItem('token', result.token);
          this.router.navigate(['/home']);
        }
        this.spinnerService.hide();
      });
    }
  }


}
