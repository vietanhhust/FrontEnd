import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideShowComponent } from './guide-show.component';

describe('GuideShowComponent', () => {
  let component: GuideShowComponent;
  let fixture: ComponentFixture<GuideShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuideShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
