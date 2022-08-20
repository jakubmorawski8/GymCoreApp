import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDeleteDialogComponent } from './confirm-dialog.component';

describe('ExerciseDeleteDialogComponent', () => {
  let component: ExerciseDeleteDialogComponent;
  let fixture: ComponentFixture<ExerciseDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
