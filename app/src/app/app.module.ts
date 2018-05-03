import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { ModalModule } from 'ngx-bootstrap';
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
import { VoucherComponent } from './voucher/voucher.component';
import { ViewComponent } from './components/view/view.component';
import { MigrateComponent } from './components/migrate/migrate.component';
import { MigrateService } from './services/migrate.service';
import { ExcelServiceService } from './services/excel-service.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoginRedirectGuard] },
  { path: 'generate', component: GenerateComponent, canActivate: [LoginRedirectGuard] },
  { path: 'home/voucher/:batchNo', component: VoucherComponent, canActivate: [LoginRedirectGuard] },
  { path: 'view', component: ViewComponent },
  { path: 'migrate', component: MigrateComponent },
  { path: '**', redirectTo: '/' }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GenerateComponent,
    NavbarComponent,
    VoucherComponent,
    ViewComponent,
    MigrateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpModule,
    SimpleNotificationsModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [AuthService, BatchService, LoginRedirectGuard, MigrateService, ExcelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
