import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSHistoryBalanceComponent } from './cms-history-balance.component';

describe('CMSHistoryBalanceComponent', () => {
  let component: CMSHistoryBalanceComponent;
  let fixture: ComponentFixture<CMSHistoryBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSHistoryBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSHistoryBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
