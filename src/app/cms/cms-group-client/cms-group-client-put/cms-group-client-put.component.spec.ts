import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSGroupClientPutComponent } from './cms-group-client-put.component';

describe('CMSGroupClientPutComponent', () => {
  let component: CMSGroupClientPutComponent;
  let fixture: ComponentFixture<CMSGroupClientPutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSGroupClientPutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSGroupClientPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
