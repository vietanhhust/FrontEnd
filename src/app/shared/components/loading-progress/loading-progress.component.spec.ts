import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingProgressComponent } from './loading-progress.component';

describe('LoadingProgressComponent', () => {
  let component: LoadingProgressComponent;
  let fixture: ComponentFixture<LoadingProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
