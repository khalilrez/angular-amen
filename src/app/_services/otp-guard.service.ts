import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class OtpVerificationGuard implements CanActivate {
  constructor(private router: Router,private storageService:StorageService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storageService.getIsVerifyingOTP()) {
      return this.router.parseUrl('/verify-otp');
    } else {
      return true; 
    }
  }
}