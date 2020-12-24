import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDetailErrorComponent } from './popup-detail-error.component';

describe('PopupDetailErrorComponent', () => {
  let component: PopupDetailErrorComponent;
  let fixture: ComponentFixture<PopupDetailErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDetailErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDetailErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
