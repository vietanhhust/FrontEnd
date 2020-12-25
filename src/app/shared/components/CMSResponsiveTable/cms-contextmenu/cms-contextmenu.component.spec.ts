import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSContextmenuComponent } from './cms-contextmenu.component';

describe('CMSContextmenuComponent', () => {
  let component: CMSContextmenuComponent;
  let fixture: ComponentFixture<CMSContextmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CMSContextmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSContextmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
