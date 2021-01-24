import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSOrderComponent } from './cms-order.component';

describe('CMSOrderComponent', () => {
  let component: CMSOrderComponent;
  let fixture: ComponentFixture<CMSOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
