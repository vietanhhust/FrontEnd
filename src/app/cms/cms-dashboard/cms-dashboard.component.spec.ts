import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSDashboardComponent } from './cms-dashboard.component';

describe('CMSDashboardComponent', () => {
  let component: CMSDashboardComponent;
  let fixture: ComponentFixture<CMSDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSDashboardComponent  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
