import { TestBed } from '@angular/core/testing';

import { bankAccountService } from './bank-account.service';

describe('BankAccountServiceService', () => {
  let service: bankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(bankAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
