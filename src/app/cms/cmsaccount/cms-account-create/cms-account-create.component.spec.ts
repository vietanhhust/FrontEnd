import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsAccountCreateComponent } from './cms-account-create.component';

describe('CmsAccountCreateComponent', () => {
  let component: CmsAccountCreateComponent;
  let fixture: ComponentFixture<CmsAccountCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsAccountCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsAccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
