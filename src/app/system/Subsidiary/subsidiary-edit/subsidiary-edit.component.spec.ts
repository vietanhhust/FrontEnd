import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiaryEditComponent } from './subsidiary-edit.component';

describe('SubsidiaryEditComponent', () => {
  let component: SubsidiaryEditComponent;
  let fixture: ComponentFixture<SubsidiaryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsidiaryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidiaryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
