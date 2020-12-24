import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionmenuComponent } from './actionmenu.component';

describe('ActionmenuComponent', () => {
  let component: ActionmenuComponent;
  let fixture: ComponentFixture<ActionmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
