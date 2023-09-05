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
import { AdminUserInfoComponent } from './admin-user-info/admin-user-info.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { OtpVerificationGuard } from './_services/otp-guard.service';
import { OtpAccessGuard } from './_services/otp-access-guard.service';
import { ActivationComponent } from './activation/activation.component';

const routes: Routes = [
  {path:"account",component:BankAccountPageComponent,canActivate: [AuthGuard,OtpVerificationGuard]},
  {path:"virement-cac",component:TransferCacPageComponent ,canActivate: [AuthGuard,OtpVerificationGuard]},
  {path:"virement-benef",component:TransferBenefPageComponent ,canActivate: [AuthGuard,OtpVerificationGuard]},
  {path:"chatbot",component:ChatPageComponent ,canActivate: [AuthGuard,OtpVerificationGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'verify-otp', component: VerifyOtpComponent,canActivate: [AuthGuard,OtpAccessGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'activate/:code', component: ActivationComponent},
  { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard,OtpVerificationGuard] },
  { path: 'admin', component: BoardAdminComponent ,canActivate: [AuthGuard,RoleGuard]},
  { path: 'admin/user/details', component: AdminUserInfoComponent,canActivate: [AuthGuard,RoleGuard] },
  { path: 'notauthorized', component: ForbiddenComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
