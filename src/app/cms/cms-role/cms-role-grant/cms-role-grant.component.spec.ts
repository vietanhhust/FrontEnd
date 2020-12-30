import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSRoleGrantComponent } from './cms-role-grant.component';

describe('CMSRoleGrantComponent', () => {
  let component: CMSRoleGrantComponent;
  let fixture: ComponentFixture<CMSRoleGrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSRoleGrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSRoleGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
