import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSPopupDetailOrderComponent } from './cmspopup-detail-order.component';

describe('CMSPopupDetailOrderComponent', () => {
  let component: CMSPopupDetailOrderComponent;
  let fixture: ComponentFixture<CMSPopupDetailOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSPopupDetailOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSPopupDetailOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
