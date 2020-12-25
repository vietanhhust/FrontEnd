import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSTableComponent } from './cms-table.component';

describe('CMSTableComponent', () => {
  let component: CMSTableComponent;
  let fixture: ComponentFixture<CMSTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMSTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
