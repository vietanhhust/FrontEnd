import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSChangeGroupClientComponent } from './cms-change-group-client.component';

describe('CMSChangeGroupClientComponent', () => {
  let component: CMSChangeGroupClientComponent;
  let fixture: ComponentFixture<CMSChangeGroupClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSChangeGroupClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSChangeGroupClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
