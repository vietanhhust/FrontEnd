import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSHistoryBalanceTableComponent } from './cms-history-balance-table.component';

describe('CMSHistoryBalanceTableComponent', () => {
  let component: CMSHistoryBalanceTableComponent;
  let fixture: ComponentFixture<CMSHistoryBalanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMSHistoryBalanceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSHistoryBalanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
