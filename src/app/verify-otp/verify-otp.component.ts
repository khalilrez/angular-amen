import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit{

  errorMessage:string;
  constructor(private authService:AuthService,private storageService:StorageService,private router:Router){}
  ngOnInit(): void {
    this.authService.generateOtp().subscribe(
      (response) => {
        console.log('OTP generated successfully', response);
      },
      (error) => {
        console.error('Error generating OTP', error);
      }
    );
  }

  verifyOtp() {
    this.authService.verifyOtp(this.otpInputs.join('')).subscribe(
      (response) => {
        console.log('OTP verified successfully', response);
        this.storageService.setIsVerifyingOTP();
        this.router.navigate(['/profile']);
        window.location.reload();
      },
      (error) => {
        console.error('Error verifying OTP', error);
        this.errorMessage = error.error.message;
      }
    );
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault(); // Prevent the default paste behavior
  
    const clipboardData = event.clipboardData;
    const pastedData = clipboardData.getData('text');
  
    // Validate and distribute the pasted characters across input fields
    for (let i = 0; i < this.otpInputs.length; i++) {
      if (i < pastedData.length) {
        this.otpInputs[i] = pastedData.charAt(i);
        this.onInputChange(this.otpInputs[i], i);
      } else {
        this.otpInputs[i] = '';
      }
    }
  }

  clearOtp(){
    this.otpInputs = ['', '', '', '', '', ''];
  }

  otpInputs: string[] = ['', '', '', '', '', ''];

  onInputChange(value: string, index: number) {
    this.otpInputs[index] = value;
    console.log(this.otpInputs);
    if (value && index < this.otpInputs.length - 1) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `.otp-container input:nth-child(${index + 1})`
      );
      if (nextInput) {
        nextInput.value = '';
        nextInput.focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && index > 0 && !this.otpInputs[index]) {
      const previousInput = document.querySelector<HTMLInputElement>(
        `.otp-container input:nth-child(${index})`
      );
      if (previousInput) {
        previousInput.value = '';
        previousInput.focus();
      }
    }
  }

}
