import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActiveInfoComponent } from './user-active-info.component';

describe('UserActiveInfoComponent', () => {
  let component: UserActiveInfoComponent;
  let fixture: ComponentFixture<UserActiveInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActiveInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActiveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
