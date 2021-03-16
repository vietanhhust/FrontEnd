import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsHistoryOrderComponent } from './cms-history-order.component';

describe('CmsHistoryOrderComponent', () => {
  let component: CmsHistoryOrderComponent;
  let fixture: ComponentFixture<CmsHistoryOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsHistoryOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsHistoryOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
