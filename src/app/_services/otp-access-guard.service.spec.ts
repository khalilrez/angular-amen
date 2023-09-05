import { TestBed } from '@angular/core/testing';

import { OtpAccessGuard } from './otp-access-guard.service';

describe('OtpAccessGuardService', () => {
  let service: OtpAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpAccessGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
