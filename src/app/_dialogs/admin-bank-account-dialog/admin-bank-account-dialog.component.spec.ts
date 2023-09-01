import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBankAccountDialogComponent } from './admin-bank-account-dialog.component';

describe('AdminBankAccountDialogComponent', () => {
  let component: AdminBankAccountDialogComponent;
  let fixture: ComponentFixture<AdminBankAccountDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBankAccountDialogComponent]
    });
    fixture = TestBed.createComponent(AdminBankAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
