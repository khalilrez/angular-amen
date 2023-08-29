import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountPageComponent } from './bank-account-page/bank-account-page.component';
import { TransferCacPageComponent } from './transfer-cac-page/transfer-cac-page.component';
import { TransferBenefPageComponent } from './transfer-benef-page/transfer-benef-page.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_services/auth-guard.service';
import { RoleGuard } from './_services/role-guard.service';

const routes: Routes = [
  {path:"account",component:BankAccountPageComponent,canActivate: [AuthGuard]},
  {path:"virement-cac",component:TransferCacPageComponent ,canActivate: [AuthGuard]},
  {path:"virement-benef",component:TransferBenefPageComponent ,canActivate: [AuthGuard]},
  {path:"chatbot",component:ChatPageComponent ,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard] },
  { path: 'admin', component: BoardAdminComponent ,canActivate: [AuthGuard,RoleGuard]},
  { path: 'notauthorized', component: ForbiddenComponent },
  {path:'',redirectTo:"login", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
