import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import { AuthService } from './auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private authService:AuthService,private router:Router,private route: ActivatedRoute) {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isAdmin(): boolean{
    const userString = window.sessionStorage.getItem(USER_KEY);
    const user = JSON.parse(userString);
    if(user.roles.includes('ROLE_ADMIN')){
      return true
    }else{
      return false
    }
  }

  public isUserActive(): boolean{
    const userString = window.sessionStorage.getItem(USER_KEY);
    const user = JSON.parse(userString);
    if(user.isActive){
      return true
    }else{
      return false
    }
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  private selectedUser = new BehaviorSubject(null);
  getSelectedUser = this.selectedUser.asObservable();
  setSelectedUser(user:any){
    localStorage.setItem("selectedUser",JSON.stringify(user));
  } 

  private isVerifyingOTP = false;

  setIsVerifyingOTP() {
   this.authService.changeStatus().subscribe((res)=>{
    console.log(res);
   },
   (err)=>{
    console.log(err)
   })
   return;
  }

  getIsVerifyingOTP(): boolean {
    this.authService.checkStatus().subscribe(async (res)=>{
      this.isVerifyingOTP = res.isVerifyingOtp
      console.log(res);
      if(res.getIsVerifyingOTP){
        const targetPath = '/verify-otp';

        // Get the current URL segments
        const currentUrlSegments = this.route.snapshot.url.map(segment => segment.path).join('/');
      
        // Check if there is an ongoing navigation
        if (this.router.navigated && currentUrlSegments !== targetPath) {
          // Cancel the ongoing navigation and navigate to the desired path immediately
          const extras: NavigationExtras = {
            skipLocationChange: true, // This prevents the URL from being updated in the browser's address bar
          };
      
          this.router.navigateByUrl(targetPath, extras);
      }
    }
      return this.isVerifyingOTP;
    })
     return this.isVerifyingOTP;
  }
  
}