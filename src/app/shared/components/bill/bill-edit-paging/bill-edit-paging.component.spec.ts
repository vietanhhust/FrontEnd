import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillEditPagingComponent } from './bill-edit-paging.component';

describe('BillEditPagingComponent', () => {
  let component: BillEditPagingComponent;
  let fixture: ComponentFixture<BillEditPagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillEditPagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillEditPagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
