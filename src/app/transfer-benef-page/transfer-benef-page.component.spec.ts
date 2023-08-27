import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferBenefPageComponent } from './transfer-benef-page.component';

describe('TransferBenefPageComponent', () => {
  let component: TransferBenefPageComponent;
  let fixture: ComponentFixture<TransferBenefPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferBenefPageComponent]
    });
    fixture = TestBed.createComponent(TransferBenefPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
