import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSDashboardTableComponent } from './cms-dashboard-table.component';

describe('CMSDashboardTableComponent', () => {
  let component: CMSDashboardTableComponent;
  let fixture: ComponentFixture<CMSDashboardTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMSDashboardTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSDashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
