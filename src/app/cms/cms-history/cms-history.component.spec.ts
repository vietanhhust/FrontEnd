import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsHistoryComponent } from './cms-history.component';

describe('CmsHistoryComponent', () => {
  let component: CmsHistoryComponent;
  let fixture: ComponentFixture<CmsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
