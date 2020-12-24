import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingDataComponent } from './paging-data.component';

describe('PagingDataComponent', () => {
  let component: PagingDataComponent;
  let fixture: ComponentFixture<PagingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
