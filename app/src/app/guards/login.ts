import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginRedirectGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService,
        private notificationService: NotificationsService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const token = { 'token': localStorage.getItem('token') };
        return this.authService.isUserLoggedIn(token).map(data => {
            console.log(data);

            if (!data.result) {
                this.notificationService.error(
                    'Error',
                    'Please login first',
                    {
                        timeOut: 3000,
                        pauseOnHover: false,
                        clickToClose: true
                    }
                );
                this.router.navigate(['/']);
            }
            return true;

        });
    }
}
