import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUnixDatePickerComponent } from './input-unix-date-picker.component';

describe('InputUnixDatePickerComponent', () => {
  let component: InputUnixDatePickerComponent;
  let fixture: ComponentFixture<InputUnixDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputUnixDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUnixDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
