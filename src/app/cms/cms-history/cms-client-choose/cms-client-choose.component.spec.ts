import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSClientChooseComponent } from './cms-client-choose.component';

describe('CMSClientChooseComponent', () => {
  let component: CMSClientChooseComponent;
  let fixture: ComponentFixture<CMSClientChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSClientChooseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSClientChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
