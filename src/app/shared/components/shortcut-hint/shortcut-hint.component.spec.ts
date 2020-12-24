import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutHintComponent } from './shortcut-hint.component';

describe('ShortcutHintComponent', () => {
  let component: ShortcutHintComponent;
  let fixture: ComponentFixture<ShortcutHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortcutHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
