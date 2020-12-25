import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsCategoryItemComponent } from './cms-category-item.component';

describe('CmsCategoryItemComponent', () => {
  let component: CmsCategoryItemComponent;
  let fixture: ComponentFixture<CmsCategoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsCategoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
