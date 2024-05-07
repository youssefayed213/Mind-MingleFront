import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedbackParRendezVousComponent } from './list-feedback-par-rendez-vous.component';

describe('ListFeedbackParRendezVousComponent', () => {
  let component: ListFeedbackParRendezVousComponent;
  let fixture: ComponentFixture<ListFeedbackParRendezVousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFeedbackParRendezVousComponent]
    });
    fixture = TestBed.createComponent(ListFeedbackParRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
