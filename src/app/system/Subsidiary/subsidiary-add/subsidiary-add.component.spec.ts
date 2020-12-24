import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiaryAddComponent } from './subsidiary-add.component';

describe('SubsidiaryAddComponent', () => {
  let component: SubsidiaryAddComponent;
  let fixture: ComponentFixture<SubsidiaryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsidiaryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidiaryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
