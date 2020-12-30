import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSRoleComponent } from './cms-role.component';

describe('CMSRoleComponent', () => {
  let component: CMSRoleComponent;
  let fixture: ComponentFixture<CMSRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
