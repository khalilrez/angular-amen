import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { CreditCardComponentComponent } from './credit-card-component/credit-card-component.component';
import { BankAccountPageComponent } from './bank-account-page/bank-account-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransferCacPageComponent } from './transfer-cac-page/transfer-cac-page.component';
import { TransferBenefPageComponent } from './transfer-benef-page/transfer-benef-page.component';
import { ChatModule } from './chat/chat.module';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CreateUserComponent } from './_dialogs/create-user/create-user.component';
import { AdminUserInfoComponent } from './admin-user-info/admin-user-info.component';
import { AdminBankAccountDialogComponent } from './_dialogs/admin-bank-account-dialog/admin-bank-account-dialog.component';
import { AddDashPipe } from './_pipes/add-dash.pipe';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ActivationComponent } from './activation/activation.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardComponentComponent,
    BankAccountPageComponent,
    TransferCacPageComponent,
    TransferBenefPageComponent,
    ChatPageComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    BoardAdminComponent,
    ForbiddenComponent,
    CreateUserComponent,
    AdminUserInfoComponent,
    AdminBankAccountDialogComponent,
    AddDashPipe,
    VerifyOtpComponent,
    ActivationComponent  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ChatModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
