import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { Http, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HomeComponent } from './components/home/home.component';
import { LoginRedirectGuard } from './guards/login';
import { GenerateComponent } from './components/generate/generate.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BatchService } from './services/batch.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoginRedirectGuard] },
  { path: 'generate', component: GenerateComponent, canActivate: [LoginRedirectGuard] },
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
    LoginComponent,
    HomeComponent,
    GenerateComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  providers: [AuthService, BatchService, LoginRedirectGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
