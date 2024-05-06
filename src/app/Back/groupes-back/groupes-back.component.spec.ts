import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesBackComponent } from './groupes-back.component';

describe('GroupesBackComponent', () => {
  let component: GroupesBackComponent;
  let fixture: ComponentFixture<GroupesBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupesBackComponent]
    });
    fixture = TestBed.createComponent(GroupesBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
