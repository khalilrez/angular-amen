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

@NgModule({
  declarations: [
    AppComponent,
    CreditCardComponentComponent,
    BankAccountPageComponent,
    TransferCacPageComponent,
    TransferBenefPageComponent,
    ChatPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ChatModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
