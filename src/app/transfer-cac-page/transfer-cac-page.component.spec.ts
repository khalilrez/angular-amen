import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCacPageComponent } from './transfer-cac-page.component';

describe('TransferCacPageComponent', () => {
  let component: TransferCacPageComponent;
  let fixture: ComponentFixture<TransferCacPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferCacPageComponent]
    });
    fixture = TestBed.createComponent(TransferCacPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
