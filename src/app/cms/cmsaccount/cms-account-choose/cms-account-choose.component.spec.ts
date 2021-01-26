import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSAccountChooseComponent } from './cms-account-choose.component';

describe('CMSAccountChooseComponent', () => {
  let component: CMSAccountChooseComponent;
  let fixture: ComponentFixture<CMSAccountChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSAccountChooseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSAccountChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
