import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseCreateDialogComponent } from './exercise-create-dialog.component';

describe('ExerciseCreateDialogComponent', () => {
  let component: ExerciseCreateDialogComponent;
  let fixture: ComponentFixture<ExerciseCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
