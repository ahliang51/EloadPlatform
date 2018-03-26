import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './Service/auth.service';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  // { path: 'brand', component: BrandHomeComponent, canActivate: [BrandLoginGuard] },
  // { path: 'brand/listing/:id', component: BrandHomeDetailComponent, canActivate: [BrandLoginGuard] },
  // { path: 'brand/add-listing', component: BrandAddListingComponent, canActivate: [BrandLoginGuard] },
  // { path: 'chimer', component: ChimerHomeComponent, canActivate: [ChimerLoginGuard] },
  // { path: 'chimer/jobs', component: ChimerJobComponent, canActivate: [ChimerLoginGuard] },
  // { path: 'payment', component: PaymentComponent },
  // { path: 'instagram', component: InstagramComponent },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
