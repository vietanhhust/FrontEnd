import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSGroupClientComponent } from './cms-group-client.component';

describe('CMSGroupClientComponent', () => {
  let component: CMSGroupClientComponent;
  let fixture: ComponentFixture<CMSGroupClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSGroupClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSGroupClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
