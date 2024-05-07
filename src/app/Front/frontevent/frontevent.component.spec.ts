import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FronteventComponent } from './frontevent.component';

describe('FronteventComponent', () => {
  let component: FronteventComponent;
  let fixture: ComponentFixture<FronteventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FronteventComponent]
    });
    fixture = TestBed.createComponent(FronteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
