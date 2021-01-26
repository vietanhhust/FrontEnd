import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSOrderPutComponent } from './cms-order-put.component';

describe('CMSOrderPutComponent', () => {
  let component: CMSOrderPutComponent;
  let fixture: ComponentFixture<CMSOrderPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSOrderPutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSOrderPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
