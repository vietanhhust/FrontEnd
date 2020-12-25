import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsCategoryitemAddComponent } from './cms-categoryitem-add.component';

describe('CmsCategoryitemAddComponent', () => {
  let component: CmsCategoryitemAddComponent;
  let fixture: ComponentFixture<CmsCategoryitemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsCategoryitemAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsCategoryitemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
