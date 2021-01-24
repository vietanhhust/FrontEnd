import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSOrderIncurredComponent } from './cms-order-incurred.component';

describe('CMSOrderIncurredComponent', () => {
  let component: CMSOrderIncurredComponent;
  let fixture: ComponentFixture<CMSOrderIncurredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSOrderIncurredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSOrderIncurredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
