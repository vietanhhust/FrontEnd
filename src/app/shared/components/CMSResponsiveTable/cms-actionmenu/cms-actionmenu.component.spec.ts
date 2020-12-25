import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSActionmenuComponent } from './cms-actionmenu.component';

describe('CMSActionmenuComponent', () => {
  let component: CMSActionmenuComponent;
  let fixture: ComponentFixture<CMSActionmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMSActionmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSActionmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
