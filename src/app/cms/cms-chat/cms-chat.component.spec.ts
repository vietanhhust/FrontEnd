import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CMSChatComponent } from './cms-chat.component';

describe('CMSChatComponent', () => {
  let component: CMSChatComponent;
  let fixture: ComponentFixture<CMSChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CMSChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CMSChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
