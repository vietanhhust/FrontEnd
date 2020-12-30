import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSRoleEditComponent } from './cms-role-edit.component';

describe('CMSRoleEditComponent', () => {
  let component: CMSRoleEditComponent;
  let fixture: ComponentFixture<CMSRoleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSRoleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSRoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
