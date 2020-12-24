import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiaryViewComponent } from './subsidiary-view.component';

describe('SubsidiaryViewComponent', () => {
  let component: SubsidiaryViewComponent;
  let fixture: ComponentFixture<SubsidiaryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsidiaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidiaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
