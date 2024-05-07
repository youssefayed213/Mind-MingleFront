import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStatsComponent } from './registration-stats.component';

describe('RegistrationStatsComponent', () => {
  let component: RegistrationStatsComponent;
  let fixture: ComponentFixture<RegistrationStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationStatsComponent]
    });
    fixture = TestBed.createComponent(RegistrationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
