import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class OtpAccessGuard implements CanActivate {
  constructor(private router: Router,private storageService:StorageService) {}

  canActivate(): boolean {
    // Check if the user is in the OTP verification process
    const isVerifyingOTP =this.storageService.getIsVerifyingOTP();

    if (isVerifyingOTP) {
      return true;
    } else {
      this.router.parseUrl('/profile');
      return false; 
    }
  }
}