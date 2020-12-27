import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSBalanceComponent } from './cms-balance.component';

describe('CMSBalanceComponent', () => {
  let component: CMSBalanceComponent;
  let fixture: ComponentFixture<CMSBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
