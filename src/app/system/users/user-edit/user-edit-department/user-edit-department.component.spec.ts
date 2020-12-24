import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditDepartmentComponent } from './user-edit-department.component';

describe('UserEditDepartmentComponent', () => {
  let component: UserEditDepartmentComponent;
  let fixture: ComponentFixture<UserEditDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
