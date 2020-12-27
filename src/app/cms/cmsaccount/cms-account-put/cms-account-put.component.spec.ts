import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSAccountPutComponent } from './cms-account-put.component';

describe('CMSAccountPutComponent', () => {
  let component: CMSAccountPutComponent;
  let fixture: ComponentFixture<CMSAccountPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSAccountPutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSAccountPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
