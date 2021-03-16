import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSCaptureComponent } from './cms-capture.component';

describe('CMSCaptureComponent', () => {
  let component: CMSCaptureComponent;
  let fixture: ComponentFixture<CMSCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSCaptureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
