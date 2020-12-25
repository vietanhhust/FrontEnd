import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSAccountComponent } from './cmsaccount.component';

describe('CMSAccountComponent', () => {
  let component: CMSAccountComponent;
  let fixture: ComponentFixture<CMSAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
