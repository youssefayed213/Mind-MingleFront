import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeChatComponent } from './groupe-chat.component';

describe('GroupeChatComponent', () => {
  let component: GroupeChatComponent;
  let fixture: ComponentFixture<GroupeChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupeChatComponent]
    });
    fixture = TestBed.createComponent(GroupeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
