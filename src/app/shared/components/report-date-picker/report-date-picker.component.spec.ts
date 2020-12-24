import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDatePickerComponent } from './report-date-picker.component';

describe('ReportDatePickerComponent', () => {
  let component: ReportDatePickerComponent;
  let fixture: ComponentFixture<ReportDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
