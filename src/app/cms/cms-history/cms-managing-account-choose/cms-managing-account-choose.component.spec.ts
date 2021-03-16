import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSManagingAccountChooseComponent } from './cms-managing-account-choose.component';

describe('CMSManagingAccountChooseComponent', () => {
  let component: CMSManagingAccountChooseComponent;
  let fixture: ComponentFixture<CMSManagingAccountChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSManagingAccountChooseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSManagingAccountChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
