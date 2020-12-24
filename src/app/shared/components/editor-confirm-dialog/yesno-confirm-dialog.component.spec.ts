import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoConfirmDialogComponent } from './yesno-confirm-dialog.component';

describe('YesNoConfirmDialogComponent', () => {
  let component: YesNoConfirmDialogComponent;
  let fixture: ComponentFixture<YesNoConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesNoConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
