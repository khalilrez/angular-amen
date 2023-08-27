import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountPageComponent } from './bank-account-page/bank-account-page.component';
import { TransferCacPageComponent } from './transfer-cac-page/transfer-cac-page.component';
import { TransferBenefPageComponent } from './transfer-benef-page/transfer-benef-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';

const routes: Routes = [
  {path:"account",component:BankAccountPageComponent},
  {path:"virement-cac",component:TransferCacPageComponent},
  {path:"virement-benef",component:TransferBenefPageComponent},
  {path:"chatbot",component:ChatPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
