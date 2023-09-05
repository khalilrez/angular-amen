import { TestBed } from '@angular/core/testing';

import { OtpVerificationGuard } from './otp-guard.service';

describe('OtpGuardService', () => {
  let service: OtpVerificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpVerificationGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
