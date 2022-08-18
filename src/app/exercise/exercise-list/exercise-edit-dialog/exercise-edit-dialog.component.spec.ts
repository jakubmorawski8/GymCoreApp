import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseEditDialogComponent } from './exercise-edit-dialog.component';

describe('ExerciseEditDialogComponent', () => {
  let component: ExerciseEditDialogComponent;
  let fixture: ComponentFixture<ExerciseEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
